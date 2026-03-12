import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EXTRACTION_SCHEMA = {
  type: "object",
  properties: {
    opportunities: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          organisation: { type: "string" },
          type: {
            type: "string",
            enum: ["internship", "competition", "program", "volunteering", "scholarship", "workshop"],
          },
          description: { type: "string", description: "2-4 sentence summary" },
          deadline: { type: "string", nullable: true, description: "ISO date string (YYYY-MM-DD) or null if unknown" },
          application_url: { type: "string", description: "direct link to apply or learn more" },
          workshop_url: { type: "string", nullable: true },
          is_free: { type: "boolean" },
          is_remote: { type: "boolean" },
          is_international: { type: "boolean" },
          country_code: { type: "string", nullable: true },
          duration: { type: "string", nullable: true },
          min_age: { type: "number", nullable: true },
          max_age: { type: "number", nullable: true },
          min_grade: { type: "number", nullable: true },
          max_grade: { type: "number", nullable: true },
          scholarship_amount: { type: "string", nullable: true },
          scholarship_coverage: { type: "string", enum: ["full", "partial", "varies"], nullable: true },
          certificate_awarded: { type: "boolean" },
          certificate_name: { type: "string", nullable: true },
          platform: { type: "string", nullable: true },
          career_family_ids: {
            type: "array",
            items: { type: "string" },
            description: "Which career families suit this? Use only these values: technology, design, science, business, engineering, health, law, media, education, environment, finance, arts, social-work, architecture, sports, agriculture, hospitality. Use empty array if open to all.",
          },
        },
        required: ["title", "organisation", "type", "description", "application_url"],
      },
    },
  },
};

const SCRAPE_PROMPT =
  "Extract opportunity details from this page. If multiple opportunities are listed, return all of them as separate objects in the opportunities array.";

const CRAWL_PROMPT =
  "Extract all youth opportunity listings from this page as separate objects. Only extract real specific opportunities, not navigation links or category headings.";

const VALID_TYPES = new Set(["internship", "competition", "program", "volunteering", "scholarship", "workshop"]);

function parseDeadline(raw: any): string | null {
  if (!raw || typeof raw !== "string") return null;
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const d = new Date(match[0]);
  if (isNaN(d.getTime())) return null;
  return match[0];
}

async function scrapeUrl(firecrawlKey: string, url: string): Promise<any[]> {
  const resp = await fetch("https://api.firecrawl.dev/v1/scrape", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${firecrawlKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      formats: ["extract"],
      timeout: 45000,
      extract: {
        schema: EXTRACTION_SCHEMA,
        systemPrompt: SCRAPE_PROMPT,
      },
    }),
  });

  const data = await resp.json();
  if (!resp.ok) {
    console.error(`Firecrawl scrape error for ${url}:`, JSON.stringify(data).slice(0, 300));
    throw new Error(`Firecrawl scrape failed: ${resp.status}`);
  }

  return data?.data?.extract?.opportunities || [];
}

async function crawlUrl(firecrawlKey: string, url: string): Promise<any[]> {
  const resp = await fetch("https://api.firecrawl.dev/v1/crawl", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${firecrawlKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      limit: 20,
      scrapeOptions: {
        formats: ["extract"],
        extract: {
          schema: EXTRACTION_SCHEMA,
          systemPrompt: CRAWL_PROMPT,
        },
      },
    }),
  });

  const data = await resp.json();
  if (!resp.ok) {
    console.error(`Firecrawl crawl error for ${url}:`, JSON.stringify(data).slice(0, 300));
    throw new Error(`Firecrawl crawl failed: ${resp.status}`);
  }

  // Crawl returns pages with extract data; aggregate all opportunities
  const allOpps: any[] = [];
  const pages = data?.data || [];
  for (const page of pages) {
    const opps = page?.extract?.opportunities || [];
    allOpps.push(...opps);
  }
  return allOpps;
}

/**
 * Modes:
 * 1. POST { source_id: "uuid" } — scrape a single source
 * 2. POST { mode: "list" }      — return list of active source IDs
 * 3. POST {} or no body         — scrape ALL sources sequentially
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!firecrawlKey) {
    return new Response(JSON.stringify({ error: "FIRECRAWL_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey);

  let body: any = {};
  try { body = await req.json(); } catch { /* empty body is fine */ }

  try {
    // Mode: list active source IDs
    if (body?.mode === "list") {
      const { data: sources, error } = await supabase
        .from("opportunity_sources")
        .select("id, name")
        .eq("is_active", true);
      if (error) throw error;
      return new Response(JSON.stringify({ sources: sources || [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Mode: scrape a single source
    if (body?.source_id) {
      const { data: source, error: srcErr } = await supabase
        .from("opportunity_sources")
        .select("*")
        .eq("id", body.source_id)
        .single();
      if (srcErr || !source) {
        return new Response(JSON.stringify({ error: "Source not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.log(`Processing source: ${source.name} (strategy: ${source.scrape_strategy})`);

      // Get existing URLs for dedup
      const { data: existing } = await supabase.from("admin_opportunities").select("application_url");
      const existingUrls = new Set((existing || []).map((e: any) => e.application_url));

      let opportunities: any[];
      try {
        if (source.scrape_strategy === "crawl") {
          opportunities = await crawlUrl(firecrawlKey, source.url);
        } else {
          opportunities = await scrapeUrl(firecrawlKey, source.url);
        }
      } catch (err: any) {
        console.error(`Firecrawl failed for ${source.name}:`, err.message);
        // Increment consecutive_failures
        await supabase
          .from("opportunity_sources")
          .update({
            consecutive_failures: (source.consecutive_failures || 0) + 1,
          })
          .eq("id", source.id);
        return new Response(
          JSON.stringify({ success: false, source: source.name, error: err.message, new_listings: 0 }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      let newCount = 0;

      for (const opp of opportunities) {
        if (!opp.application_url || existingUrls.has(opp.application_url)) continue;

        const row = {
          title: opp.title || "Untitled",
          organisation: opp.organisation || source.name,
          type: VALID_TYPES.has(opp.type) ? opp.type : source.default_type,
          description: opp.description || "",
          application_url: opp.application_url,
          workshop_url: opp.workshop_url || "",
          deadline: parseDeadline(opp.deadline),
          is_remote: opp.is_remote || false,
          country: opp.country_code || "",
          location: opp.is_international ? "Global" : opp.country_code || "Global",
          duration: opp.duration || "",
          min_age: opp.min_age || null,
          max_age: opp.max_age || null,
          min_grade: opp.min_grade || 9,
          max_grade: opp.max_grade || 12,
          scholarship_amount: opp.scholarship_amount || "",
          scholarship_coverage: opp.scholarship_coverage || null,
          career_family_ids: opp.career_family_ids || [],
          source: "firecrawl",
          is_active: true,
          flagged: false,
          is_archived: false,
          is_link_dead: false,
        };

        const { error: insertErr } = await supabase.from("admin_opportunities").insert(row);
        if (insertErr) {
          console.error(`Insert error for "${opp.title}":`, insertErr.message);
          continue;
        }
        existingUrls.add(opp.application_url);
        newCount++;
      }

      // Update source stats — reset consecutive_failures on success
      await supabase
        .from("opportunity_sources")
        .update({
          last_scraped_at: new Date().toISOString(),
          last_scraped_count: newCount,
          consecutive_failures: 0,
        })
        .eq("id", source.id);

      console.log(`${source.name}: ${newCount} new opportunities`);

      return new Response(
        JSON.stringify({ success: true, source: source.name, new_listings: newCount }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fallback mode: scrape ALL (used by cron)
    const { data: sources, error: srcErr } = await supabase
      .from("opportunity_sources")
      .select("id")
      .eq("is_active", true);
    if (srcErr) throw srcErr;

    let totalNew = 0;
    let processed = 0;
    const failed: string[] = [];
    const startTime = Date.now();

    for (const s of (sources || [])) {
      if (Date.now() - startTime > 45000) {
        console.log(`Stopping early: timeout approaching after ${processed} sources`);
        break;
      }

      try {
        const resp = await fetch(`${supabaseUrl}/functions/v1/scrape-opportunities`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${serviceKey}`,
          },
          body: JSON.stringify({ source_id: s.id }),
        });
        const result = await resp.json();
        if (!result.success) {
          failed.push(result.source || s.id);
        } else {
          totalNew += result?.new_listings || 0;
        }
        processed++;
      } catch (e: any) {
        failed.push(s.id);
        processed++;
      }
    }

    await supabase.from("scrape_log").insert({
      sources_processed: processed,
      total_new_listings: totalNew,
      failed_sources: failed,
    });

    return new Response(
      JSON.stringify({ success: true, sources_processed: processed, total_new_listings: totalNew, failed_sources: failed }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Scrape run failed:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
