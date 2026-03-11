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
          workshop_url: { type: "string", nullable: true, description: "for workshops: the learning page URL" },
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
          scholarship_coverage: {
            type: "string",
            enum: ["full", "partial", "varies"],
            nullable: true,
          },
          certificate_awarded: { type: "boolean" },
          certificate_name: { type: "string", nullable: true },
          platform: { type: "string", nullable: true },
          career_family_ids: {
            type: "array",
            items: { type: "string" },
            description:
              "Which career families does this suit? Use these exact values: technology · design · science · business · engineering · health · law · media · education · environment · finance · arts · social-work · architecture · sports · agriculture · hospitality. Use empty array [] if open to all careers.",
          },
        },
        required: ["title", "organisation", "type", "description", "application_url"],
      },
    },
  },
};

const SYSTEM_PROMPT =
  "Extract all youth opportunity listings from this page. Each listing should be a separate object. Only extract real specific opportunities — not navigation, categories, or site sections. For deadlines, only use ISO date format YYYY-MM-DD or null.";

const VALID_TYPES = new Set(["internship", "competition", "program", "volunteering", "scholarship", "workshop"]);

// Validate deadline is a proper ISO date
function parseDeadline(raw: any): string | null {
  if (!raw || typeof raw !== "string") return null;
  // Must match YYYY-MM-DD pattern
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const d = new Date(match[0]);
  if (isNaN(d.getTime())) return null;
  return match[0];
}

// Scrape a single URL using the /v1/scrape endpoint (synchronous, always returns data)
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
      extract: {
        schema: EXTRACTION_SCHEMA,
        systemPrompt: SYSTEM_PROMPT,
      },
    }),
  });

  const data = await resp.json();
  if (!resp.ok) {
    console.error(`Firecrawl scrape error for ${url}:`, data);
    return [];
  }

  return data?.data?.extract?.opportunities || [];
}

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

  try {
    // Get all active sources
    const { data: sources, error: srcErr } = await supabase
      .from("opportunity_sources")
      .select("*")
      .eq("is_active", true);

    if (srcErr) throw srcErr;
    if (!sources || sources.length === 0) {
      return new Response(JSON.stringify({ message: "No active sources" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get existing application_urls for dedup
    const { data: existing } = await supabase
      .from("admin_opportunities")
      .select("application_url");
    const existingUrls = new Set((existing || []).map((e: any) => e.application_url));

    let totalNew = 0;
    let sourcesProcessed = 0;
    const failedSources: string[] = [];

    for (const source of sources) {
      try {
        console.log(`Processing source: ${source.name} (${source.scrape_strategy})`);

        // Always use the scrape endpoint — it's synchronous and reliable.
        // The crawl endpoint is async and requires polling, which can timeout edge functions.
        const opportunities = await scrapeUrl(firecrawlKey, source.url);

        let sourceNewCount = 0;

        for (const opp of opportunities) {
          if (!opp.application_url) continue;
          if (existingUrls.has(opp.application_url)) continue;

          const oppType = VALID_TYPES.has(opp.type) ? opp.type : source.default_type;
          const deadline = parseDeadline(opp.deadline);

          const row = {
            title: opp.title || "Untitled",
            organisation: opp.organisation || source.name,
            type: oppType,
            description: opp.description || "",
            application_url: opp.application_url,
            workshop_url: opp.workshop_url || "",
            deadline,
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
          sourceNewCount++;
          totalNew++;
        }

        // Always update source stats — even if 0 new
        const { error: updateErr } = await supabase
          .from("opportunity_sources")
          .update({
            last_scraped_at: new Date().toISOString(),
            last_scraped_count: sourceNewCount,
          })
          .eq("id", source.id);

        if (updateErr) {
          console.error(`Failed to update source stats for ${source.name}:`, updateErr.message);
        }

        sourcesProcessed++;
        console.log(`${source.name}: ${sourceNewCount} new opportunities`);
      } catch (sourceErr) {
        console.error(`Error processing ${source.name}:`, sourceErr);
        failedSources.push(source.name);
      }

      // Small delay between sources to respect rate limits
      await new Promise((r) => setTimeout(r, 500));
    }

    // Log the run
    await supabase.from("scrape_log").insert({
      sources_processed: sourcesProcessed,
      total_new_listings: totalNew,
      failed_sources: failedSources,
    });

    console.log(`Scrape complete: ${sourcesProcessed} sources, ${totalNew} new, ${failedSources.length} failed`);

    return new Response(
      JSON.stringify({
        success: true,
        sources_processed: sourcesProcessed,
        total_new_listings: totalNew,
        failed_sources: failedSources,
      }),
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
