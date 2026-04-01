import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const unsplashKey = Deno.env.get("UNSPLASH_ACCESS_KEY");
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");

  if (!unsplashKey) {
    return new Response(JSON.stringify({ error: "UNSPLASH_ACCESS_KEY not configured" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (!lovableKey) {
    return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  // Parse optional parameters
  let body: any = {};
  try { body = await req.json(); } catch {}
  const batchSize = body.batch_size || 20;
  const offset = body.offset || 0;

  // Fetch careers
  const { data: careers, error: fetchErr } = await supabase
    .from("careers")
    .select("id, title, family_id, unsplash_keyword")
    .eq("is_active", true)
    .eq("is_deleted", false)
    .order("title")
    .range(offset, offset + batchSize - 1);

  if (fetchErr) {
    return new Response(JSON.stringify({ error: fetchErr.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!careers || careers.length === 0) {
    return new Response(JSON.stringify({ message: "No careers in range", succeeded: 0, failed: 0, total: 0 }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Generate keywords for all careers in this batch using AI
  const careerList = careers.map((c: any) => `${c.id}|||${c.title}|||${c.family_id || "general"}`).join("\n");
  
  const aiPrompt = `For each career below, generate a specific 3-5 word scene-based photo search phrase describing someone actively doing this job. The phrase should be vivid and specific enough to find a great stock photo. Do NOT just repeat the career title.

IMPORTANT: If the photo would naturally feature a person or people (which is most careers), prefix the phrase with "african" so that search results represent young African professionals. Examples:
- Software Engineer → "african developer coding dual monitors office"
- Pediatric Nurse → "african nurse examining child clinic"
- Chef → "african chef plating dish kitchen"
- Architect → "african architect working blueprints"

Only SKIP "african" for careers where the ideal photo would NOT feature any person at all (e.g. purely landscape, equipment, or object-focused shots like "coral reef underwater" or "circuit board closeup").

Careers (format: id|||title|||family):
${careerList}

Respond with ONLY a JSON array of objects: [{"id":"...","keyword":"..."}]
No markdown, no explanation, just the JSON array.`;

  let keywords: { id: string; keyword: string }[] = [];
  try {
    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${lovableKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "user", content: aiPrompt },
        ],
      }),
    });

    if (!aiResp.ok) {
      const errText = await aiResp.text();
      throw new Error(`AI API error ${aiResp.status}: ${errText}`);
    }

    const aiData = await aiResp.json();
    const content = aiData.choices?.[0]?.message?.content || "";
    // Parse JSON from response, stripping markdown fences and control characters
    let cleaned = content
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim()
      // Remove control characters (except normal whitespace)
      .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "");
    
    // Fix unescaped newlines/tabs inside JSON string values by normalising to spaces
    // Match content between quotes and replace raw newlines/tabs within
    cleaned = cleaned.replace(/"([^"\\]|\\.)*"/g, (match) =>
      match.replace(/\n/g, " ").replace(/\r/g, "").replace(/\t/g, " ")
    );
    
    keywords = JSON.parse(cleaned);
  } catch (err: any) {
    return new Response(JSON.stringify({ error: `AI keyword generation failed: ${err.message}` }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // For each keyword, fetch top Unsplash result and update DB
  let succeeded = 0;
  let failed = 0;
  let rateLimited = false;
  const errors: string[] = [];

  for (const item of keywords) {
    try {
      // Search Unsplash
      const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(item.keyword)}&per_page=1&orientation=landscape`;
      const unsplashResp = await fetch(searchUrl, {
        headers: { Authorization: `Client-ID ${unsplashKey}` },
      });

      if (unsplashResp.status === 429) {
        rateLimited = true;
        errors.push(`Rate limited after ${succeeded} successful updates`);
        break;
      }

      if (!unsplashResp.ok) {
        const errText = await unsplashResp.text();
        throw new Error(`Unsplash ${unsplashResp.status}: ${errText}`);
      }

      const unsplashData = await unsplashResp.json();
      const photoUrl = unsplashData.results?.[0]?.urls?.regular || null;

      if (!photoUrl) {
        throw new Error("No Unsplash results");
      }

      // Update career in DB
      const { error: updateErr } = await supabase
        .from("careers")
        .update({
          unsplash_keyword: item.keyword,
          unsplash_photo_url: photoUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", item.id);

      if (updateErr) throw new Error(updateErr.message);
      succeeded++;
    } catch (err: any) {
      failed++;
      errors.push(`${item.id}: ${err.message}`);
    }

    // Small delay to avoid Unsplash rate limits (50/hr for demo apps)
    await new Promise((r) => setTimeout(r, 200));
  }

  return new Response(JSON.stringify({
    succeeded,
    failed,
    rate_limited: rateLimited,
    total: keywords.length,
    offset,
    batch_size: batchSize,
    next_offset: offset + succeeded + failed,
    errors: errors.slice(0, 10),
  }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
