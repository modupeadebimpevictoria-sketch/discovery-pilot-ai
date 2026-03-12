import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey);

  try {
    const { career_id, salary } = await req.json();

    if (!career_id) {
      return new Response(JSON.stringify({ error: "career_id is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!salary || typeof salary !== "object") {
      return new Response(JSON.stringify({ error: "salary object is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get existing salary_context to merge
    const { data: existing, error: fetchErr } = await supabase
      .from("careers")
      .select("salary_context")
      .eq("id", career_id)
      .single();

    if (fetchErr) throw fetchErr;

    const existingSalary = (existing?.salary_context as Record<string, any>) || {};
    const merged = { ...existingSalary, ...salary };

    const { error: updateErr } = await supabase
      .from("careers")
      .update({
        salary_context: merged,
        salary_last_updated: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", career_id);

    if (updateErr) throw updateErr;

    return new Response(
      JSON.stringify({ success: true, salary_context: merged }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Salary update failed:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
