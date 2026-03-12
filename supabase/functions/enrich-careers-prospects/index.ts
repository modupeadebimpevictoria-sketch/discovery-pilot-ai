import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const AI_GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const PROSPECTS_BASE = "https://www.prospects.ac.uk/job-profiles";

async function scrapeProspectsPage(firecrawlKey: string, slug: string): Promise<string | null> {
  const url = `${PROSPECTS_BASE}/${slug}`;
  console.log(`Scraping Prospects page: ${url}`);

  const resp = await fetch("https://api.firecrawl.dev/v1/scrape", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${firecrawlKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      formats: ["markdown"],
      onlyMainContent: true,
      waitFor: 3000,
    }),
  });

  const data = await resp.json();
  if (!resp.ok) {
    console.error(`Firecrawl error for ${slug}:`, JSON.stringify(data).slice(0, 300));
    return null;
  }

  return data?.data?.markdown || data?.markdown || null;
}

async function extractWithAI(apiKey: string, title: string, markdown: string) {
  const prompt = `You are a career guidance expert. I have scraped a Prospects.ac.uk career page for "${title}". Extract and rewrite the following fields from the content below.

IMPORTANT: Rewrite everything in your own words. Do NOT copy text verbatim from the source.

Return JSON with these fields:
1. "description_full": A professional 3-4 sentence career description based on the page content.
2. "what_they_do_teen": A 2-3 sentence description written for a 15-year-old African student. Make it engaging, relatable, and jargon-free. Reference real-world examples they'd know.
3. "day_in_the_life": 3-5 sentences describing a typical day in this career. Make it vivid and interesting for a teenager.
4. "entry_requirements": A clear summary of what qualifications/education are needed. Include UK context but note it may differ by country.
5. "career_path": A brief description of how someone progresses in this career, from entry level to senior roles.

Return ONLY valid JSON, no markdown fences.

--- PAGE CONTENT ---
${markdown.slice(0, 6000)}`;

  const resp = await fetch(AI_GATEWAY, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`AI gateway error ${resp.status}: ${errText.slice(0, 200)}`);
  }

  const data = await resp.json();
  const content = data.choices?.[0]?.message?.content || "";
  const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(cleaned);
}

/**
 * Modes:
 * POST { career_id: "uuid" } — enrich a single career from Prospects
 * POST {} — enrich all careers that have a prospects_slug but no what_they_do_teen
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  if (!lovableKey) {
    return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
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
  try { body = await req.json(); } catch { /* empty */ }

  try {
    let careers: any[] = [];

    if (body?.career_id) {
      const { data, error } = await supabase
        .from("careers")
        .select("id, title, prospects_slug")
        .eq("id", body.career_id)
        .single();
      if (error || !data) throw new Error("Career not found");
      if (!data.prospects_slug) throw new Error("Career has no Prospects slug");
      careers = [data];
    } else {
      const { data, error } = await supabase
        .from("careers")
        .select("id, title, prospects_slug")
        .not("prospects_slug", "is", null)
        .is("what_they_do_teen", null)
        .eq("is_active", true);
      if (error) throw error;
      careers = data || [];
    }

    const results: { id: string; title: string; status: string }[] = [];

    for (const career of careers) {
      try {
        console.log(`Enriching from Prospects: ${career.title} (${career.prospects_slug})`);

        const markdown = await scrapeProspectsPage(firecrawlKey, career.prospects_slug);
        if (!markdown) {
          throw new Error("Scrape returned no content");
        }

        const extracted = await extractWithAI(lovableKey, career.title, markdown);

        const updatePayload: Record<string, any> = {
          prospects_last_updated: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Only overwrite null fields
        const { data: current } = await supabase
          .from("careers")
          .select("what_they_do_teen, description_full, day_in_the_life, entry_requirements, career_path")
          .eq("id", career.id)
          .single();

        if (!current?.what_they_do_teen && extracted.what_they_do_teen) updatePayload.what_they_do_teen = extracted.what_they_do_teen;
        if (!current?.description_full && extracted.description_full) updatePayload.description_full = extracted.description_full;
        if (!current?.day_in_the_life && extracted.day_in_the_life) updatePayload.day_in_the_life = extracted.day_in_the_life;
        if (!current?.entry_requirements && extracted.entry_requirements) updatePayload.entry_requirements = extracted.entry_requirements;
        if (!current?.career_path && extracted.career_path) updatePayload.career_path = extracted.career_path;

        const { error: updateErr } = await supabase
          .from("careers")
          .update(updatePayload)
          .eq("id", career.id);

        if (updateErr) throw updateErr;
        results.push({ id: career.id, title: career.title, status: "success" });
      } catch (err: any) {
        console.error(`Failed to enrich ${career.title}:`, err.message);
        results.push({ id: career.id, title: career.title, status: "failed" });

        await supabase.from("career_enrichment_log").insert({
          career_id: career.id,
          career_title: career.title,
          issue: "scrape_failed",
          notes: err.message?.slice(0, 200),
        });
      }
    }

    const succeeded = results.filter((r) => r.status === "success").length;
    const failed = results.filter((r) => r.status === "failed").length;

    return new Response(
      JSON.stringify({ success: true, total: careers.length, succeeded, failed, results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Prospects enrichment failed:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
