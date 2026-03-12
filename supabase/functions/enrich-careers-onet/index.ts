import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const AI_GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";

const RIASEC_KEYS = ["R", "I", "A", "S", "E", "C"] as const;

async function enrichWithAI(apiKey: string, title: string, onetCode: string) {
  const prompt = `You are a career data expert. For the career "${title}" (O*NET code: ${onetCode}), provide structured data in JSON format with these fields:

1. "riasec_profile": An object with keys R, I, A, S, E, C (Realistic, Investigative, Artistic, Social, Enterprising, Conventional). Each value 0-100 representing how strongly this career aligns with that interest area.

2. "skills": Array of up to 8 objects with "name" (string) and "importance" (number 0-100). Include the most relevant skills for this career.

3. "work_values": Array of up to 5 strings representing core work values (e.g. "Achievement", "Independence", "Recognition", "Relationships", "Support", "Working Conditions").

4. "job_zone": Number 1-5 representing preparation needed (1=Little, 2=Some, 3=Medium, 4=Considerable, 5=Extensive).

5. "growth_outlook": One of "Bright", "Average", "Below Average" based on current job market trends.

6. "salary_global": Object with "min" and "max" (annual USD numbers, no formatting).

7. "what_they_do_teen": A 2-3 sentence description of this career written for a 15-year-old. Make it engaging and relatable. Avoid jargon.

8. "description_full": A professional 3-4 sentence description of this career suitable for a career guide.

Return ONLY valid JSON, no markdown fences.`;

  const resp = await fetch(AI_GATEWAY, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`AI gateway error ${resp.status}: ${errText.slice(0, 200)}`);
  }

  const data = await resp.json();
  const content = data.choices?.[0]?.message?.content || "";
  
  // Strip markdown fences if present
  const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(cleaned);
}

/**
 * Modes:
 * POST { career_id: "uuid" } — enrich a single career
 * POST {} — enrich all careers that have an onet_code but missing riasec_profile
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

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey);

  let body: any = {};
  try { body = await req.json(); } catch { /* empty */ }

  try {
    let careers: any[] = [];

    if (body?.career_id) {
      // Single career
      const { data, error } = await supabase
        .from("careers")
        .select("id, title, onet_code")
        .eq("id", body.career_id)
        .single();
      if (error || !data) throw new Error("Career not found");
      if (!data.onet_code) throw new Error("Career has no O*NET code");
      careers = [data];
    } else {
      // All careers with onet_code but no riasec_profile
      const { data, error } = await supabase
        .from("careers")
        .select("id, title, onet_code")
        .not("onet_code", "is", null)
        .is("riasec_profile", null)
        .eq("is_active", true);
      if (error) throw error;
      careers = data || [];
    }

    const results: { id: string; title: string; status: string }[] = [];

    for (const career of careers) {
      try {
        console.log(`Enriching from O*NET: ${career.title} (${career.onet_code})`);
        const enriched = await enrichWithAI(lovableKey, career.title, career.onet_code);

        // Compute primary/secondary RIASEC
        const riasec = enriched.riasec_profile || {};
        const sorted = Object.entries(riasec).sort(([, a], [, b]) => (b as number) - (a as number));
        const primary = sorted[0]?.[0] || null;
        const secondary = sorted[1]?.[0] || null;

        // Build salary_context with GLOBAL entry
        const salaryGlobal = enriched.salary_global || {};
        const existingCareer = body?.career_id
          ? (await supabase.from("careers").select("salary_context").eq("id", career.id).single()).data
          : null;
        const existingSalary = existingCareer?.salary_context || {};
        
        const globalEntry = {
          min: salaryGlobal.min || 30000,
          max: salaryGlobal.max || 80000,
          currency: "USD",
          label: formatSalaryLabel(salaryGlobal.min || 30000, salaryGlobal.max || 80000, "$"),
          source: "O*NET (AI estimated)",
        };

        const updatePayload: Record<string, any> = {
          riasec_profile: enriched.riasec_profile,
          riasec_primary: primary,
          riasec_secondary: secondary,
          skills: (enriched.skills || []).slice(0, 8),
          work_values: (enriched.work_values || []).slice(0, 5),
          job_zone: enriched.job_zone || null,
          growth_outlook: enriched.growth_outlook || null,
          salary_context: { ...existingSalary, GLOBAL: globalEntry },
          onet_last_updated: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Only set descriptions if they're currently null
        if (enriched.what_they_do_teen) {
          const { data: current } = await supabase.from("careers").select("what_they_do_teen, description_full").eq("id", career.id).single();
          if (!current?.what_they_do_teen) updatePayload.what_they_do_teen = enriched.what_they_do_teen;
          if (!current?.description_full) updatePayload.description_full = enriched.description_full;
        }

        const { error: updateErr } = await supabase
          .from("careers")
          .update(updatePayload)
          .eq("id", career.id);

        if (updateErr) throw updateErr;
        results.push({ id: career.id, title: career.title, status: "success" });
      } catch (err: any) {
        console.error(`Failed to enrich ${career.title}:`, err.message);
        results.push({ id: career.id, title: career.title, status: "failed" });

        // Log the issue
        await supabase.from("career_enrichment_log").insert({
          career_id: career.id,
          career_title: career.title,
          issue: "no_onet_match",
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
    console.error("O*NET enrichment failed:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function formatSalaryLabel(min: number, max: number, symbol: string): string {
  const fmt = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
    return String(n);
  };
  return `${symbol}${fmt(min)}–${symbol}${fmt(max)}/yr`;
}
