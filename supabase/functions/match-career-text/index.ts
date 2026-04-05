import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(JSON.stringify({ careerId: null }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get active careers
    const { data: careers, error } = await supabase
      .from("careers")
      .select("id, title")
      .eq("is_active", true)
      .eq("is_deleted", false)
      .order("title");

    if (error || !careers || careers.length === 0) {
      console.error("Failed to fetch careers:", error);
      return new Response(JSON.stringify({ careerId: null }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const careerList = careers.map((c: any) => c.title).join("\n");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: "You are a career matching assistant for teenagers. Match the user's career interest to the single most relevant career from the provided list. Consider synonyms, related roles, and vague descriptions. Always pick the closest match even if it's not exact.",
          },
          {
            role: "user",
            content: `A teenager said they're interested in: "${text.trim()}"\n\nMatch this to the closest career from this list:\n${careerList}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "match_career",
              description: "Return the matched career title from the list",
              parameters: {
                type: "object",
                properties: {
                  career_title: {
                    type: "string",
                    description: "The exact career title from the provided list that best matches the teen's interest",
                  },
                },
                required: ["career_title"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "match_career" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(JSON.stringify({ careerId: null }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiResult = await response.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      return new Response(JSON.stringify({ careerId: null }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const args = JSON.parse(toolCall.function.arguments);
    const matchedTitle = args.career_title;

    // Find the career by title (case-insensitive fuzzy match)
    const matched = careers.find(
      (c: any) => c.title.toLowerCase() === matchedTitle?.toLowerCase()
    );

    return new Response(
      JSON.stringify({ careerId: matched?.id || null }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("match-career-text error:", e);
    return new Response(
      JSON.stringify({ careerId: null, error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
