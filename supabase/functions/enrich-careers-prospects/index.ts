import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PROSPECTS_BASE = "https://www.prospects.ac.uk/job-profiles";

async function scrapeWithFirecrawl(firecrawlKey: string, slug: string) {
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
      formats: ["extract"],
      extract: {
        schema: {
          type: "object",
          properties: {
            description_full: { type: "string", description: "Main overview of what this career involves" },
            day_in_the_life: { type: "string", description: "Typical daily activities and tasks" },
            entry_requirements: { type: "string", description: "Qualifications and subjects typically needed" },
            career_path: { type: "string", description: "How this career progresses from junior to senior" },
          },
          required: ["description_full"],
        },
        systemPrompt: "Extract career information from this Prospects.ac.uk job profile page. Factual content only. Do not extract salary information.",
      },
    }),
  });

  const data = await resp.json();
  if (!resp.ok) {
    console.error(`Firecrawl error for ${slug}:`, JSON.stringify(data).slice(0, 300));
    return null;
  }

  return data?.data?.extract || data?.extract || null;
}

async function rewriteWithClaude(anthropicKey: string, title: string, descriptionFull: string, dayInTheLife: string | null) {
  const userContent = `Rewrite this career description for a 15-year-old curious about ${title}.

ORIGINAL:
${descriptionFull}

DAY IN THE LIFE:
${dayInTheLife || "Not available"}

Rules: plain English, Grade 9 reading level, no jargon (if a technical term is needed explain it in brackets immediately after), direct and vivid, help the student picture it. No passive voice.

Return only this JSON:
{"what_they_do_teen": "3-4 sentences", "day_in_the_life_teen": "3-5 sentences"}`;

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": anthropicKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      system: "You are a career writer for SpringBoard, an app for students aged 13–21. Return only valid JSON. No preamble. No markdown fences.",
      messages: [{ role: "user", content: userContent }],
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Anthropic API error ${resp.status}: ${errText.slice(0, 200)}`);
  }

  const data = await resp.json();
  const content = data?.content?.[0]?.text || "";
  const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(cleaned);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!firecrawlKey) {
    return new Response(JSON.stringify({ error: "FIRECRAWL_API_KEY not configured" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!anthropicKey) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
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
      careers = [data];
    } else {
      const { data, error } = await supabase
        .from("careers")
        .select("id, title, prospects_slug")
        .not("prospects_slug", "is", null)
        .eq("is_active", true);
      if (error) throw error;
      careers = data || [];
    }

    const results: { id: string; title: string; status: string }[] = [];

    for (const career of careers) {
      try {
        // Step 1: Check prospects_slug
        if (!career.prospects_slug) {
          await supabase.from("career_enrichment_log").insert({
            career_id: career.id,
            career_title: career.title,
            issue: "no_prospects_slug",
          });
          results.push({ id: career.id, title: career.title, status: "skipped" });
          continue;
        }

        console.log(`Enriching from Prospects: ${career.title} (${career.prospects_slug})`);

        // Step 2: Scrape with Firecrawl
        const extracted = await scrapeWithFirecrawl(firecrawlKey, career.prospects_slug);

        const updatePayload: Record<string, any> = {
          prospects_last_updated: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        if (!extracted || !extracted.description_full) {
          // Log scrape failure
          await supabase.from("career_enrichment_log").insert({
            career_id: career.id,
            career_title: career.title,
            issue: "scrape_failed",
            notes: "Firecrawl returned empty or no description_full",
          });

          // Save any partial data
          if (extracted) {
            if (extracted.entry_requirements) updatePayload.entry_requirements = extracted.entry_requirements;
            if (extracted.career_path) updatePayload.career_path = extracted.career_path;
            if (extracted.day_in_the_life) updatePayload.day_in_the_life = extracted.day_in_the_life;
          }

          await supabase.from("careers").update(updatePayload).eq("id", career.id);
          results.push({ id: career.id, title: career.title, status: "partial" });
          continue;
        }

        // Save Firecrawl data
        updatePayload.description_full = extracted.description_full;
        if (extracted.entry_requirements) updatePayload.entry_requirements = extracted.entry_requirements;
        if (extracted.career_path) updatePayload.career_path = extracted.career_path;

        // Step 3: Rewrite with Claude
        try {
          const rewritten = await rewriteWithClaude(
            anthropicKey,
            career.title,
            extracted.description_full,
            extracted.day_in_the_life || null
          );

          if (rewritten.what_they_do_teen) updatePayload.what_they_do_teen = rewritten.what_they_do_teen;
          if (rewritten.day_in_the_life_teen) updatePayload.day_in_the_life = rewritten.day_in_the_life_teen;
        } catch (rewriteErr: any) {
          console.error(`Claude rewrite failed for ${career.title}:`, rewriteErr.message);
          await supabase.from("career_enrichment_log").insert({
            career_id: career.id,
            career_title: career.title,
            issue: "rewrite_failed",
            notes: rewriteErr.message?.slice(0, 200),
          });
          // Still save raw Prospects data (already in updatePayload)
          if (extracted.day_in_the_life) updatePayload.day_in_the_life = extracted.day_in_the_life;
        }

        // Step 4: Update career
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
    const failed = results.filter((r) => r.status === "failed" || r.status === "partial").length;

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
