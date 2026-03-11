import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ═══════════════════════════════════════════
// Career families embedded (from client data)
// ═══════════════════════════════════════════
const CAREER_FAMILIES = [
  { id: "creative-design", name: "Creative & Design", description: "Make beautiful things people use every day", primaryCareerId: "graphic-designer" },
  { id: "media-content", name: "Media & Content", description: "Tell stories the world watches and reads", primaryCareerId: "journalist" },
  { id: "entertainment-performance", name: "Entertainment & Performance", description: "Perform, entertain, and move audiences", primaryCareerId: "actor" },
  { id: "technology", name: "Technology", description: "Build the digital world we live in", primaryCareerId: "ai-engineer" },
  { id: "product-tech", name: "Product & Tech", description: "Design and manage products people love", primaryCareerId: "product-manager" },
  { id: "healthcare-medicine", name: "Healthcare & Medicine", description: "Heal people and save lives", primaryCareerId: "doctor" },
  { id: "mental-health", name: "Mental Health & Wellbeing", description: "Help people feel better inside", primaryCareerId: "psychologist" },
  { id: "science-research", name: "Science & Research", description: "Discover how the universe works", primaryCareerId: "research-scientist" },
  { id: "environment-sustainability", name: "Environment & Sustainability", description: "Protect the planet for future generations", primaryCareerId: "environmental-scientist" },
  { id: "engineering-architecture", name: "Engineering & Architecture", description: "Design and build the structures around us", primaryCareerId: "architect" },
  { id: "trades-technical", name: "Trades & Technical", description: "Skilled hands-on work that keeps the world running", primaryCareerId: "electrician" },
  { id: "business-entrepreneurship", name: "Business & Entrepreneurship", description: "Start companies and run organisations", primaryCareerId: "entrepreneur" },
  { id: "finance-investment", name: "Finance & Investment", description: "Manage money and grow wealth", primaryCareerId: "financial-analyst" },
  { id: "marketing-communications", name: "Marketing & Communications", description: "Spread ideas and build brands", primaryCareerId: "marketing-manager" },
  { id: "law-justice", name: "Law & Justice", description: "Fight for fairness and protect rights", primaryCareerId: "lawyer" },
  { id: "education-academia", name: "Education & Academia", description: "Teach and inspire the next generation", primaryCareerId: "teacher" },
  { id: "social-impact", name: "Social Impact", description: "Make the world a better place for everyone", primaryCareerId: "social-worker" },
  { id: "government-public-service", name: "Government & Public Service", description: "Serve communities and shape policy", primaryCareerId: "policy-analyst" },
  { id: "international-development", name: "International Development", description: "Help communities thrive around the world", primaryCareerId: "development-worker" },
  { id: "travel-hospitality", name: "Travel & Hospitality", description: "Create amazing experiences for travellers", primaryCareerId: "hotel-manager" },
  { id: "food-culinary", name: "Food & Culinary", description: "Create delicious food and dining experiences", primaryCareerId: "chef" },
  { id: "sport-fitness", name: "Sport & Fitness", description: "Compete, coach, and keep people active", primaryCareerId: "sports-coach" },
  { id: "animals-nature", name: "Animals & Nature", description: "Care for animals and protect wildlife", primaryCareerId: "veterinarian" },
  { id: "space-future-tech", name: "Space & Future Tech", description: "Explore space and invent the future", primaryCareerId: "aerospace-engineer" },
  { id: "beauty-wellness", name: "Beauty & Wellness", description: "Help people look and feel their best", primaryCareerId: "beauty-therapist" },
  { id: "real-estate-property", name: "Real Estate & Property", description: "Buy, sell, and develop places to live and work", primaryCareerId: "real-estate-agent" },
];

const GRADE_BANDS = [
  { band: "9-10", ageRange: "ages 13–15" },
  { band: "11-12", ageRange: "ages 15–18" },
  { band: "university-1-2", ageRange: "ages 18–21" },
];

const SYSTEM_PROMPT = `You are a career education content writer for SpringBoard, an app for students aged 13–21 worldwide. Generate weekly quest challenges for students at a specific career and grade level. Each quest must be: practical and hands-on; achievable in 15–45 minutes with no special equipment; genuinely relevant to what professionals in this career do; clear and direct — no jargon; specific enough that the student knows exactly what to do; relevant to their grade level and country context.
Produce exactly 4 quests. Each must use a different quest_type.
Return ONLY a valid JSON array — no preamble, no markdown fences.
Schema per item: { "title": string (max 8 words), "brief": string (2–3 paragraphs markdown), "instructions": string (the task, markdown), "quest_type": "research"|"challenge"|"create"|"watch"|"explore", "resource_url": string|null, "estimated_minutes": number 15–45, "xp_reward": number 50–150, "skill_tag": string }`;

function getCurrentWeekNumber(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  return Math.ceil((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
}

function getMonthName(): string {
  return new Date().toLocaleString("en-US", { month: "long" });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminClient = createClient(supabaseUrl, serviceKey);

    // Optional: verify admin if called manually (not from cron)
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ") && !authHeader.includes(Deno.env.get("SUPABASE_ANON_KEY") || "___")) {
      const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
      const supabase = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authHeader } },
      });
      const token = authHeader.replace("Bearer ", "");
      const { data: claims, error: claimsError } = await supabase.auth.getClaims(token);
      if (!claimsError && claims?.claims) {
        const userId = claims.claims.sub;
        const { data: roleData } = await adminClient.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").single();
        if (!roleData) {
          return new Response(JSON.stringify({ error: "Admin access required" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const weekNumber = getCurrentWeekNumber();
    const monthName = getMonthName();

    console.log(`Starting weekly quest generation for week ${weekNumber} (${monthName})`);

    const results = { success: 0, failed: 0, totalQuests: 0, errors: [] as string[] };

    // Process all 78 slots (26 families × 3 grade bands)
    for (const family of CAREER_FAMILIES) {
      for (const grade of GRADE_BANDS) {
        const slotKey = `${family.id}/${grade.band}`;
        console.log(`Processing slot: ${slotKey}`);

        try {
          // ── Gather context ──

          // 1. Top student countries for this family
          let topCountries = ["Nigeria", "Kenya", "South Africa"];
          try {
            // Get career IDs in this family from user_progress selected paths
            const { data: countryData } = await adminClient
              .from("profiles")
              .select("country")
              .not("country", "is", null)
              .limit(1000);

            if (countryData && countryData.length > 0) {
              const countryCounts: Record<string, number> = {};
              for (const row of countryData) {
                if (row.country) {
                  countryCounts[row.country] = (countryCounts[row.country] || 0) + 1;
                }
              }
              const sorted = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
              if (sorted.length > 0) {
                topCountries = sorted.map(([c]) => c);
              }
            }
          } catch { /* use defaults */ }

          // 2. Recent quests for this slot (avoid repeats)
          let recentQuests: { title: string; quest_type: string }[] = [];
          try {
            const { data: recent } = await adminClient
              .from("quests")
              .select("title, quest_type")
              .eq("family_id", family.id)
              .eq("grade_band", grade.band)
              .gte("week_number", weekNumber - 4)
              .order("created_at", { ascending: false })
              .limit(6);
            if (recent) recentQuests = recent;
          } catch { /* ignore */ }

          // 3. Build user message
          const recentTopicsBlock = recentQuests.length > 0
            ? recentQuests.map((q) => `${q.title} (${q.quest_type})`).join("\n")
            : "(none — this is the first generation for this slot)";

          const userMessage = `Generate 4 weekly quests for this context:

CAREER FAMILY: ${family.name}
DESCRIPTION: ${family.description}
GRADE BAND: ${grade.band} (${grade.ageRange})
WEEK: Week ${weekNumber} (${monthName})
TOP STUDENT COUNTRIES: ${topCountries.join(", ")}

DO NOT REPEAT THESE RECENT TOPICS:
${recentTopicsBlock}

Generate 4 quests a ${grade.band} student exploring ${family.name} would find genuinely useful this week.`;

          // ── Call AI ──
          const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userMessage },
              ],
            }),
          });

          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`AI gateway error ${response.status}: ${errText}`);
          }

          const aiData = await response.json();
          const content = aiData.choices?.[0]?.message?.content || "";

          // ── Parse JSON (robust: extract first JSON array even if model adds trailing text) ──
          let questsArray;
          try {
            let jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
            // Find the first '[' and its matching ']'
            const startIdx = jsonStr.indexOf("[");
            if (startIdx === -1) throw new Error("No JSON array found");
            let depth = 0;
            let endIdx = -1;
            for (let i = startIdx; i < jsonStr.length; i++) {
              if (jsonStr[i] === "[") depth++;
              else if (jsonStr[i] === "]") { depth--; if (depth === 0) { endIdx = i; break; } }
            }
            if (endIdx === -1) throw new Error("Unclosed JSON array");
            jsonStr = jsonStr.slice(startIdx, endIdx + 1);
            questsArray = JSON.parse(jsonStr);
            if (!Array.isArray(questsArray)) throw new Error("Not an array");
          } catch (parseErr) {
            throw new Error(`Failed to parse AI response: ${parseErr instanceof Error ? parseErr.message : "unknown"}`);
          }

          // ── Insert quests ──
          const generationContext = {
            family_id: family.id,
            family_name: family.name,
            grade_band: grade.band,
            week_number: weekNumber,
            month: monthName,
            top_countries: topCountries,
            recent_quests: recentQuests.map((q) => q.title),
          };

          const questRows = questsArray.map((q: any) => ({
            career_id: family.primaryCareerId,
            family_id: family.id,
            title: q.title,
            brief: q.brief || null,
            instructions: q.instructions || null,
            quest_type: q.quest_type || "research",
            resource_url: q.resource_url || null,
            estimated_minutes: q.estimated_minutes || 20,
            xp_reward: q.xp_reward || 75,
            skill_tag: q.skill_tag || "",
            week_number: weekNumber,
            grade_band: grade.band,
            is_active: true,
            flagged: false,
            created_by: "ai-generated",
            generation_context: generationContext,
          }));

          const { data: inserted, error: insertError } = await adminClient
            .from("quests")
            .insert(questRows)
            .select("id");

          if (insertError) throw insertError;

          const questIds = (inserted || []).map((r: any) => r.id);

          // ── Log success ──
          await adminClient.from("quest_generation_log").insert({
            career_family_id: family.id,
            grade_band: grade.band,
            week_number: weekNumber,
            quest_ids_created: questIds,
            prompt_used: userMessage,
            model: "google/gemini-3-flash-preview",
            status: "success",
          });

          results.success++;
          results.totalQuests += questIds.length;
          console.log(`✅ ${slotKey}: ${questIds.length} quests created`);

          // Small delay to avoid rate limits (78 slots × 1 call each)
          await new Promise((resolve) => setTimeout(resolve, 1500));

        } catch (slotError) {
          const errorMsg = slotError instanceof Error ? slotError.message : "Unknown error";
          console.error(`❌ ${slotKey}: ${errorMsg}`);
          results.failed++;
          results.errors.push(`${slotKey}: ${errorMsg}`);

          // Log failure
          try {
            await adminClient.from("quest_generation_log").insert({
              career_family_id: family.id,
              grade_band: grade.band,
              week_number: weekNumber,
              status: "failed",
              error_message: errorMsg,
              model: "google/gemini-3-flash-preview",
            });
          } catch { /* ignore logging errors */ }

          // Continue to next slot — do NOT crash
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    }

    console.log(`Generation complete: ${results.success} succeeded, ${results.failed} failed, ${results.totalQuests} total quests`);

    return new Response(JSON.stringify({
      success: true,
      week_number: weekNumber,
      slots_succeeded: results.success,
      slots_failed: results.failed,
      total_quests_created: results.totalQuests,
      errors: results.errors.slice(0, 10), // cap error list
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("generate-weekly-quests fatal error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
