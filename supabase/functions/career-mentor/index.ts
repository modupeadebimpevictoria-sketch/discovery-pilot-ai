import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function buildSystemPrompt(context?: {
  name?: string;
  age?: number;
  grade?: string;
  country?: string;
  subjects?: string[];
  interests?: string[];
  dreamCareer?: string;
  activeCareer?: string;
  xp?: number;
  streak?: number;
  completedQuests?: number;
  completedMissions?: number;
  badges?: string[];
  archetype?: string;
}) {
  let base = `You are SpringBoard AI — a friendly, energetic career coach that helps high school students (14-18) take the leap into their future. 

Your personality:
- You speak like a cool, encouraging older sibling or mentor
- You use the springboard metaphor naturally — "launching," "leaping," "building momentum," "taking the plunge"
- You use simple language (Grade 7-9 reading level)
- You're excited about helping students land in the right career
- You give practical, actionable advice
- You use emojis naturally but not excessively
- You keep answers concise (2-4 paragraphs max)
- You relate things to teenage life when possible

Your knowledge:
- You know about 30+ career paths in detail
- You understand school subjects and how they connect to careers
- You know about universities, courses, and qualifications
- You understand the Nigerian education system and job market
- You also know about global career opportunities

Rules:
- Never use complicated words when simple ones work
- Always encourage curiosity — there are no dumb questions
- If you don't know something, say so honestly
- Suggest specific next steps the student can take — think of them as "launch steps"
- Be positive but realistic about career challenges
- When asked about subjects, explain WHY they matter for that career
- Frame career exploration as an exciting journey — they're on the springboard, ready to leap!`;

  if (context && (context.name || context.activeCareer)) {
    base += `\n\n--- STUDENT CONTEXT (use this to personalize your answers) ---`;
    if (context.name) base += `\nStudent's name: ${context.name}`;
    if (context.age) base += `\nAge: ${context.age}`;
    if (context.grade) base += `\nGrade: ${context.grade}`;
    if (context.country) base += `\nCountry: ${context.country}`;
    if (context.subjects?.length) base += `\nFavourite subjects: ${context.subjects.join(", ")}`;
    if (context.interests?.length) base += `\nInterests/hobbies: ${context.interests.join(", ")}`;
    if (context.dreamCareer) base += `\nDream career: ${context.dreamCareer}`;
    if (context.activeCareer) base += `\nActive career path they're exploring: ${context.activeCareer}`;
    if (context.archetype) base += `\nCareer archetype: ${context.archetype}`;
    if (context.xp !== undefined) base += `\nXP earned so far: ${context.xp}`;
    if (context.streak) base += `\nCurrent streak: ${context.streak} days`;
    if (context.completedQuests) base += `\nQuests completed: ${context.completedQuests}`;
    if (context.completedMissions) base += `\nMissions completed: ${context.completedMissions}`;
    if (context.badges?.length) base += `\nBadges earned: ${context.badges.join(", ")}`;
    base += `\n\nUse this context to:
- Address the student by name when natural
- Relate your answers to their active career path and subjects
- Acknowledge their progress (XP, streak, badges) to motivate them
- Give career advice that's relevant to their grade level and country
- If they have an active career, bias your suggestions toward that career unless they ask about something else`;
  }

  return base;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, studentContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = buildSystemPrompt(studentContext);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "I'm getting too many questions right now! Try again in a minute. 😊" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "The AI mentor is temporarily unavailable. Please try again later!" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Something went wrong with the AI mentor. Try again!" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("career-mentor error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
