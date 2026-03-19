import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ONET_BASE = "https://services.onetcenter.org/ws/mnm";

function formatSalaryLabel(min: number, max: number, symbol: string): string {
  const fmt = (n: number) => {
    if (n >= 1_000_000) return `${Math.round(n / 1_000_000)}M`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
    return String(n);
  };
  return `${symbol}${fmt(min)}–${symbol}${fmt(max)}/yr`;
}

async function onetFetch(url: string, apiKey: string) {
  const resp = await fetch(url, {
    headers: {
      "X-API-Key": apiKey,
      Accept: "application/json",
    },
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`O*NET API ${resp.status}: ${text.slice(0, 200)}`);
  }
  return resp.json();
}

async function searchOnetCode(title: string, apiKey: string): Promise<string | null> {
  const url = `${ONET_BASE}/search?keyword=${encodeURIComponent(title)}`;
  const data = await onetFetch(url, apiKey);
  const results = data?.career || [];
  if (results.length === 0) return null;
  const top = results[0];
  if ((top.score ?? 0) < 80) return null;
  return top.code || null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const onetApiKey = Deno.env.get("ONET_API_KEY");
  if (!onetApiKey) {
    return new Response(JSON.stringify({ error: "ONET_API_KEY not configured" }), {
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
        .select("id, title, onet_code")
        .eq("id", body.career_id)
        .single();
      if (error || !data) throw new Error("Career not found");
      careers = [data];
    } else {
      const { data, error } = await supabase
        .from("careers")
        .select("id, title, onet_code")
        .eq("is_active", true);
      if (error) throw error;
      careers = data || [];
    }

    const results: { id: string; title: string; status: string }[] = [];

    for (let i = 0; i < careers.length; i++) {
      const career = careers[i];
      try {
        console.log(`Enriching O*NET: ${career.title}`);

        // Step 1: Get onet_code
        let code = career.onet_code;
        if (!code) {
          code = await searchOnetCode(career.title, onetApiKey);
          if (!code) {
            await supabase.from("career_enrichment_log").insert({
              career_id: career.id,
              career_title: career.title,
              issue: "no_onet_match",
            });
            results.push({ id: career.id, title: career.title, status: "skipped" });
            continue;
          }
        }

        // Step 2: Call O*NET endpoints in parallel
        const [careerData, interestsData, skillsData, workValuesData, wagesData] = await Promise.all([
          onetFetch(`${ONET_BASE}/careers/${code}`, onetApiKey),
          onetFetch(`${ONET_BASE}/careers/${code}/interests`, onetApiKey),
          onetFetch(`${ONET_BASE}/careers/${code}/skills`, onetApiKey),
          onetFetch(`${ONET_BASE}/careers/${code}/work_values`, onetApiKey),
          onetFetch(`${ONET_BASE}/careers/${code}/wages`, onetApiKey),
        ]);

        // Step 3: Parse responses
        const outlookCat = careerData?.bright_outlook?.category || "";
        let growthOutlook = "Below Average";
        if (outlookCat === "Bright") growthOutlook = "Bright";
        else if (outlookCat === "Average") growthOutlook = "Average";

        const jobZone = careerData?.job_zone?.value || null;

        const riasecProfile: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        const interestElements = interestsData?.element || [];
        for (const el of interestElements) {
          const id = el.id as string;
          if (id in riasecProfile) {
            riasecProfile[id] = el.score ?? 0;
          }
        }
        const sorted = Object.entries(riasecProfile).sort(([, a], [, b]) => b - a);
        const riasecPrimary = sorted[0]?.[0] || null;
        const riasecSecondary = sorted[1]?.[0] || null;

        const skillElements = (skillsData?.element || [])
          .sort((a: any, b: any) => (b.score ?? 0) - (a.score ?? 0))
          .slice(0, 8)
          .map((el: any) => ({ name: el.name || "", importance: el.score ?? 0 }));

        const workValues = (workValuesData?.element || [])
          .slice(0, 3)
          .map((el: any) => el.name || "");

        const nationalWages = wagesData?.national_wages || {};
        const annual10th = nationalWages.annual_10th_percentile || 30000;
        const annual90th = nationalWages.annual_90th_percentile || 80000;
        const globalSalary = {
          min: annual10th,
          max: annual90th,
          currency: "USD",
          label: formatSalaryLabel(annual10th, annual90th, "$") + " globally",
          source: "O*NET",
        };

        // Step 4: Update career
        const { data: existing } = await supabase
          .from("careers")
          .select("salary_context")
          .eq("id", career.id)
          .single();

        const existingSalary = (existing?.salary_context as Record<string, any>) || {};

        const { error: updateErr } = await supabase
          .from("careers")
          .update({
            onet_code: code,
            riasec_profile: riasecProfile,
            riasec_primary: riasecPrimary,
            riasec_secondary: riasecSecondary,
            skills: skillElements,
            work_values: workValues,
            growth_outlook: growthOutlook,
            job_zone: jobZone,
            salary_context: { ...existingSalary, GLOBAL: globalSalary },
            onet_last_updated: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", career.id);

        if (updateErr) throw updateErr;
        results.push({ id: career.id, title: career.title, status: "success" });
      } catch (err: any) {
        console.error(`Failed to enrich ${career.title}:`, err.message);
        results.push({ id: career.id, title: career.title, status: "failed" });
        await supabase.from("career_enrichment_log").insert({
          career_id: career.id,
          career_title: career.title,
          issue: "no_onet_match",
          notes: err.message?.slice(0, 200),
        });
      }

      if (i < careers.length - 1) {
        await new Promise((r) => setTimeout(r, 200));
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
