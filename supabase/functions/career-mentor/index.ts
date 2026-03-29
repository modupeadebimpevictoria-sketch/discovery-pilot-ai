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
  activeCareerPath?: string;
  matchedCareers?: { title: string; score: number }[];
  xp?: number;
  streak?: number;
  completedQuests?: number;
  completedMissions?: number;
  badges?: string[];
  archetype?: string;
  pulseCheck?: string;
  lastJournalEntry?: string;
}) {
  let base = `You are Findr AI — the student's personal career mentor inside the Findr app.

Your personality:
- You sound like a warm, sharp, encouraging older sibling — not a teacher, not a robot
- You're practical, specific, and human. Short responses by default (3–5 sentences)
- You celebrate the student genuinely — not performatively
- Use the student's first name naturally throughout
- Teen-friendly language — no jargon, no corporate speak
- You use emojis naturally but not excessively (1-2 per response)
- If the student asks for more detail, go deeper — otherwise keep it tight
- You relate everything to their real life as a teenager

Your knowledge:
- You know about 100+ career paths across 27 career families in detail
- You understand school subjects and how they connect to careers
- You know about universities, courses, certifications, and alternative paths
- You understand education systems worldwide (with special depth on Nigeria, South Africa, Kenya, Ghana, UK, US)
- You know about internships, competitions, and opportunities for teens
- You understand RIASEC career matching (but never mention RIASEC to the student)

Rules:
- Never use complicated words when simple ones work
- Always encourage curiosity — there are no dumb questions
- If you don't know something, say so honestly
- Suggest specific next steps — not vague advice
- Be positive but realistic about career challenges
- When asked about subjects, explain WHY they matter for that career
- Frame failure states with kindness: "No worries — here's what you can do"
- Never talk down to the student or be condescending`;

  if (context) {
    const parts: string[] = [];
    if (context.name) parts.push(`Student's name: ${context.name}`);
    if (context.age) parts.push(`Age: ${context.age}`);
    if (context.grade) parts.push(`Grade: ${context.grade}`);
    if (context.country) parts.push(`Country: ${context.country}`);
    if (context.subjects?.length) parts.push(`Favourite subjects: ${context.subjects.join(", ")}`);
    if (context.interests?.length) parts.push(`Interests/hobbies: ${context.interests.join(", ")}`);
    if (context.dreamCareer) parts.push(`Dream career: ${context.dreamCareer}`);
    if (context.activeCareer) parts.push(`Current Active Path career: ${context.activeCareer}`);
    if (context.matchedCareers?.length) {
      parts.push(`Top 3 matched careers: ${context.matchedCareers.map(m => `${m.title} (${m.score}% match)`).join(", ")}`);
    }
    if (context.archetype) parts.push(`Career archetype: ${context.archetype}`);
    if (context.xp !== undefined) parts.push(`XP earned: ${context.xp}`);
    if (context.streak) parts.push(`Current streak: ${context.streak} days`);
    if (context.completedQuests) parts.push(`Quests completed: ${context.completedQuests}`);
    if (context.completedMissions) parts.push(`Missions completed: ${context.completedMissions}`);
    if (context.badges?.length) parts.push(`Badges earned: ${context.badges.join(", ")}`);
    if (context.pulseCheck) parts.push(`Recent pulse check (how they feel about their path): ${context.pulseCheck}`);
    if (context.lastJournalEntry) parts.push(`Last journal entry: "${context.lastJournalEntry}"`);

    if (parts.length > 0) {
      base += `\n\n--- STUDENT CONTEXT ---\n${parts.join("\n")}`;
      base += `\n\nUse this context to:
- Address the student by name naturally
- Relate answers to their active career path and subjects
- Acknowledge their progress (XP, streak, badges) to motivate them
- Give career advice relevant to their grade level and country
- If they have a pulse check that's negative, be extra encouraging
- Reference their matched careers when suggesting alternatives
- If they have a journal entry, you understand their thinking`;
    }
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
