import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminClient = createClient(supabaseUrl, serviceKey);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { batch_size = 15, offset = 0 } = await req.json().catch(() => ({}));

    // Get careers that need skill explanations
    const { data: careers, error: fetchErr } = await adminClient
      .from("careers")
      .select("id, title, skills")
      .eq("is_active", true)
      .eq("is_deleted", false)
      .not("skills", "is", null)
      .order("title")
      .range(offset, offset + batch_size - 1);

    if (fetchErr) throw fetchErr;
    if (!careers || careers.length === 0) {
      return new Response(JSON.stringify({ success: true, message: "No more careers to process", updated: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Filter to careers where skills lack explanations
    const needsUpdate = careers.filter((c: any) => {
      const skills = c.skills || [];
      return skills.some((s: any) => !s.explanation);
    });

    if (needsUpdate.length === 0) {
      return new Response(JSON.stringify({ success: true, message: "All careers in this batch already have explanations", updated: 0, next_offset: offset + batch_size }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const careerList = needsUpdate.map((c: any) => ({
      id: c.id,
      title: c.title,
      skills: (c.skills || []).filter((s: any) => !s.explanation).map((s: any) => s.name),
    }));

    const prompt = `For each career below, write a one-line explanation for each of its skills.
Target audience: 16-21 year olds. Be specific to the career. No generic filler.
Each explanation should be max 25 words, punchy, and explain WHY this skill matters for THIS specific career.
Do NOT start with "A key skill..." or repeat the skill name at the start.

Careers:
${JSON.stringify(careerList, null, 2)}

Return a JSON object where keys are career IDs and values are objects mapping skill names to their explanations.
Example: {"uuid-here": {"Communication": "Explaining complex diagnoses to worried patients in simple language they can actually understand."}}
Return ONLY valid JSON.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You generate concise, career-specific skill explanations for teens. Return only valid JSON." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("AI error:", response.status, t);
      if (response.status === 429) return new Response(JSON.stringify({ error: "Rate limited, try again later" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (response.status === 402) return new Response(JSON.stringify({ error: "Credits needed" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error(`AI error: ${response.status}`);
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";
    const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const explanationsMap = JSON.parse(jsonStr);

    let updated = 0;
    const updateErrors: string[] = [];

    for (const career of needsUpdate) {
      const cid = career.id;
      const explanations = explanationsMap[cid];
      if (!explanations) continue;

      const updatedSkills = (career.skills || []).map((skill: any) => ({
        ...skill,
        explanation: explanations[skill.name] || skill.explanation || undefined,
      }));

      const { error: updateErr } = await adminClient
        .from("careers")
        .update({ skills: updatedSkills })
        .eq("id", cid);

      if (updateErr) {
        updateErrors.push(`${career.title}: ${updateErr.message}`);
      } else {
        updated++;
      }
    }

    return new Response(JSON.stringify({
      success: true,
      updated,
      processed: careers.length,
      next_offset: offset + batch_size,
      errors: updateErrors.length > 0 ? updateErrors : undefined,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("enrich-skill-explanations error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
