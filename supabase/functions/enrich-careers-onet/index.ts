import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// V2.0 API — uses api-v2 subdomain, no /ws/ prefix
const ONET_BASE = "https://api-v2.onetcenter.org/mnm";

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
  console.log(`  Search "${title}" → ${top.code} (${top.title})`);
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
    const batchSize = body?.batch_size || 0; // 0 = all
    const offset = body?.offset || 0;

    if (body?.career_id) {
      const { data, error } = await supabase
        .from("careers")
        .select("id, title, onet_code, is_manually_edited, is_deleted")
        .eq("id", body.career_id)
        .single();
      if (error || !data) throw new Error("Career not found");
      careers = [data];
    } else {
      let query = supabase
        .from("careers")
        .select("id, title, onet_code, is_manually_edited, is_deleted")
        .eq("is_active", true)
        .eq("is_deleted", false)
        .order("title");
      if (batchSize > 0) {
        query = query.range(offset, offset + batchSize - 1);
      }
      const { data, error } = await query;
      if (error) throw error;
      careers = data || [];
    }

    console.log(`Processing ${careers.length} careers (offset=${offset})`);
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

        // Step 2: Call O*NET v2 endpoints in parallel
        const [careerData, skillsData, personalityData, outlookData] = await Promise.all([
          onetFetch(`${ONET_BASE}/careers/${code}`, onetApiKey),
          onetFetch(`${ONET_BASE}/careers/${code}/skills`, onetApiKey),
          onetFetch(`${ONET_BASE}/careers/${code}/personality`, onetApiKey),
          onetFetch(`${ONET_BASE}/careers/${code}/job_outlook`, onetApiKey),
        ]);

        // Step 3: Parse v2 responses

        // Growth outlook from job_outlook endpoint
        const outlookCategory = outlookData?.outlook?.category;
        let growthOutlook = "Below Average";
        if (outlookCategory === "Bright") growthOutlook = "Bright";
        else if (outlookCategory === "Average") growthOutlook = "Average";

        // Job zone from career overview
        const jobZone = careerData?.job_zone?.value || null;

        // RIASEC from personality endpoint — v2 returns top_interest with name like "Realistic"
        const riasecMap: Record<string, string> = {
          Realistic: "R", Investigative: "I", Artistic: "A",
          Social: "S", Enterprising: "E", Conventional: "C",
        };
        const riasecProfile: Record<string, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        const topInterest = personalityData?.top_interest;
        if (topInterest) {
          const letter = riasecMap[topInterest.name] || "";
          if (letter) riasecProfile[letter] = 100;
        }
        const sorted = Object.entries(riasecProfile).sort(([, a], [, b]) => b - a);
        const riasecPrimary = sorted[0]?.[1] > 0 ? sorted[0]?.[0] : topInterest?.name?.charAt(0) || null;
        const riasecSecondary = sorted[1]?.[1] > 0 ? sorted[1]?.[0] : null;

        // Skills — v2 returns groups with element[] containing id + verbose description
        // Map O*NET skill IDs to standard short names
        const onetSkillNames: Record<string, string> = {
          "2.A.1.a": "Reading Comprehension", "2.A.1.b": "Active Listening",
          "2.A.1.c": "Writing", "2.A.1.d": "Speaking",
          "2.A.1.e": "Mathematics", "2.A.1.f": "Science",
          "2.A.2.a": "Critical Thinking", "2.A.2.b": "Active Learning",
          "2.A.2.c": "Learning Strategies", "2.A.2.d": "Monitoring",
          "2.B.1.a": "Social Perceptiveness", "2.B.1.b": "Coordination",
          "2.B.1.c": "Persuasion", "2.B.1.d": "Negotiation",
          "2.B.1.e": "Instructing", "2.B.1.f": "Service Orientation",
          "2.B.2.i": "Complex Problem Solving",
          "2.B.3.a": "Operations Analysis", "2.B.3.b": "Technology Design",
          "2.B.3.c": "Equipment Selection", "2.B.3.d": "Installation",
          "2.B.3.e": "Programming", "2.B.3.f": "Operation Monitoring",
          "2.B.3.g": "Operation & Control", "2.B.3.h": "Equipment Maintenance",
          "2.B.3.j": "Troubleshooting", "2.B.3.k": "Repairing",
          "2.B.3.l": "Quality Control Analysis",
          "2.B.4.e": "Judgment & Decision Making", "2.B.4.g": "Systems Analysis",
          "2.B.4.h": "Systems Evaluation",
          "2.B.5.a": "Time Management", "2.B.5.b": "Financial Management",
          "2.B.5.c": "Material Management", "2.B.5.d": "Personnel Management",
        };

        const allSkills: any[] = [];
        const skillGroups = Array.isArray(skillsData) ? skillsData : (skillsData?.group || []);
        for (const group of skillGroups) {
          if (Array.isArray(group.element)) {
            for (const el of group.element) allSkills.push(el);
          }
        }

        const skillElements = allSkills
          .slice(0, 8)
          .map((el: any) => ({
            name: onetSkillNames[el.id] || el.name?.split(",")[0]?.trim() || "",
            importance: 0,
          }));

        // Work values from personality
        const workStyles = (personalityData?.work_styles || [])
          .slice(0, 3)
          .map((el: any) => el.name || "");

        // Wages from job_outlook endpoint
        const wages = outlookData?.salary || {};
        const annual10th = wages?.annual_10th_percentile || 30000;
        const annual90th = wages?.annual_90th_percentile || wages?.annual_median ? (wages.annual_median * 1.5) : 80000;
        const globalSalary = {
          min: annual10th,
          max: annual90th,
          currency: "USD",
          label: formatSalaryLabel(annual10th, annual90th, "$") + " globally",
          source: "O*NET",
        };

        // Step 4: Build the update payload
        const { data: existing } = await supabase
          .from("careers")
          .select("salary_context")
          .eq("id", career.id)
          .single();

        const existingSalary = (existing?.salary_context as Record<string, any>) || {};

        const updatePayload = {
          onet_code: code,
          riasec_profile: riasecProfile,
          riasec_primary: riasecPrimary,
          riasec_secondary: riasecSecondary,
          skills: skillElements,
          work_values: workStyles.length > 0 ? workStyles : undefined,
          growth_outlook: growthOutlook,
          job_zone: jobZone,
          salary_context: { ...existingSalary, GLOBAL: globalSalary },
          onet_last_updated: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Step 5: Sync protection — if manually edited or deleted, store as pending
        if (career.is_manually_edited || career.is_deleted) {
          console.log(`  ⏸ Career "${career.title}" is manually edited/deleted — storing as pending`);
          const { error: pendingErr } = await supabase
            .from("careers")
            .update({
              pending_sync_data: updatePayload,
              sync_approval_status: "pending",
            })
            .eq("id", career.id);
          if (pendingErr) throw pendingErr;
          results.push({ id: career.id, title: career.title, status: "pending_review" });
        } else {
          const { error: updateErr } = await supabase
            .from("careers")
            .update(updatePayload)
            .eq("id", career.id);
          if (updateErr) throw updateErr;
          results.push({ id: career.id, title: career.title, status: "success" });
        }
      } catch (err: any) {
        console.error(`Failed to enrich ${career.title}:`, err.message);
        results.push({ id: career.id, title: career.title, status: "failed" });
        await supabase.from("career_enrichment_log").insert({
          career_id: career.id,
          career_title: career.title,
          issue: "enrichment_failed",
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
