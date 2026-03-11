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
    const now = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const { data, error } = await supabase
      .from("admin_opportunities")
      .update({ is_archived: true, updated_at: new Date().toISOString() })
      .eq("is_archived", false)
      .not("deadline", "is", null)
      .lt("deadline", now)
      .select("id");

    if (error) throw error;

    const count = data?.length || 0;
    console.log(`Archived ${count} expired opportunities`);

    return new Response(
      JSON.stringify({ success: true, archived_count: count }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Archive run failed:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
