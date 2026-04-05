import { careers as careerData } from "./careers";

// ─── RIASEC Types ───
export type RIASECCode = "R" | "I" | "A" | "S" | "E" | "C";

export type InputType =
  | "swipe-cards"
  | "emoji-grid"
  | "photo-grid"
  | "two-cards"
  | "slider"
  | "tap-select"
  | "drag-rank"
  | "tap-photo-cards"
  | "three-way"
  | "emoji-slider"
  | "pill-grid"
  | "free-text";

export interface QuestionOption {
  label: string;
  value: string;
  emoji?: string;
  photoUrl?: string;
  illustration?: string;
  riasec?: RIASECCode[];
  personName?: string;
  personRole?: string;
}

export interface AssessmentQuestion {
  id: number;
  round: number;
  type: InputType;
  prompt: string;
  maxSelect?: number;
  options?: QuestionOption[];
  sliderLabels?: { left: string; right: string; leftEmoji?: string; rightEmoji?: string };
  sliderPoints?: number;
  placeholder?: string;
  skippable?: boolean;
}

export interface RoundIntro {
  round: number;
  headline: string;
  emoji: string;
  subtext: string;
  cta: string;
}

export const roundIntros: RoundIntro[] = [
  { round: 1, headline: "What gets you going?", emoji: "🔥", subtext: "No right answers here. Just go with your gut.", cta: "Let's go →" },
  { round: 2, headline: "How your brain works", emoji: "", subtext: "There's no better or worse here — just honest.", cta: "Keep going →" },
  { round: 3, headline: "Your strengths", emoji: "", subtext: "Not just school stuff — the things people genuinely come to you for.", cta: "Let's find out →" },
  { round: 4, headline: "What actually matters to you?", emoji: "", subtext: "Your future job should feel worth it. Let's figure out what that means for you.", cta: "Next →" },
  { round: 5, headline: "A little about you", emoji: "", subtext: "The best careers fit who you actually are — not just what you're good at.", cta: "Almost there →" },
  { round: 6, headline: "Last stretch!", emoji: "🏁", subtext: "Just 2 more. You're doing great.", cta: "Finish strong →" },
];

export const roundCelebrations: Record<number, string> = {
  1: "Round 1 done! 💥 You're on a roll.",
  2: "Nailed it! 🔥 Halfway there.",
  3: "Strengths unlocked! ⚡ Keep going.",
  4: "Values locked in! 🌟 Almost done.",
  5: "Nearly there! 🚀 One more round.",
};

export const assessmentQuestions: AssessmentQuestion[] = [
  // ═══ ROUND 1: Interests → RIASEC ═══
  {
    id: 1, round: 1, type: "swipe-cards",
    prompt: "Pick the activity that sounds most fun to you",
    options: [
      { label: "Design a poster", value: "design-poster", emoji: "🎨", riasec: ["A"], illustration: "poster-pink" },
      { label: "Run an experiment", value: "experiment", emoji: "🔬", riasec: ["I"], illustration: "experiment-purple" },
      { label: "Organize a talent show", value: "talent-show", emoji: "🎤", riasec: ["E", "C"], illustration: "talent-show-amber" },
      { label: "Build a simple app", value: "build-app", emoji: "💻", riasec: ["R"], illustration: "build-app-teal" },
      { label: "Plan a campaign", value: "campaign", emoji: "🌍", riasec: ["S", "E"], illustration: "campaign-green" },
      { label: "Volunteer at a clinic", value: "volunteer", emoji: "🏥", riasec: ["S"], illustration: "volunteer-blue" },
    ],
  },
  {
    id: 2, round: 1, type: "emoji-grid", maxSelect: 3,
    prompt: "Which of these do you find yourself doing even when nobody asked you to?",
    options: [
      { label: "Taking things apart to see how they work", value: "tinker", emoji: "🛠️", riasec: ["R"] },
      { label: "Reading about random topics just because", value: "reading", emoji: "📚", riasec: ["I"] },
      { label: "Making playlists, moodboards, or art", value: "moodboards", emoji: "🎵", riasec: ["A"] },
      { label: "Listening to friends' problems and helping", value: "listening", emoji: "💬", riasec: ["S"] },
      { label: "Coming up with ideas and pitching them", value: "pitching", emoji: "💡", riasec: ["E"] },
      { label: "Making spreadsheets or lists for fun", value: "lists", emoji: "📊", riasec: ["C"] },
      { label: "Spending time outdoors or with animals", value: "outdoors", emoji: "🌿", riasec: ["R"] },
      { label: "Writing stories, scripts, or captions", value: "writing", emoji: "✍️", riasec: ["A"] },
      { label: "Solving puzzles or logic games", value: "puzzles", emoji: "🧩", riasec: ["I"] },
    ],
  },

  // ═══ ROUND 2: How your brain works ═══
  {
    id: 4, round: 2, type: "two-cards",
    prompt: "Be honest — which sounds more like you?",
    options: [
      { label: "I do my best work solo, in my own zone", value: "solo", emoji: "🎧", illustration: "solo-indigo" },
      { label: "I come alive when I'm collaborating with others", value: "collab", emoji: "🤝", illustration: "collab-orange" },
      { label: "Honestly, it depends", value: "mixed", emoji: "🤷" },
    ],
  },
  {
    id: 5, round: 2, type: "slider", sliderPoints: 5,
    prompt: "When someone gives you something to do, you prefer…",
    sliderLabels: { left: "Clear steps and a plan", right: "Total freedom to figure it out my way", leftEmoji: "📋", rightEmoji: "🌊" },
  },

  // ═══ ROUND 3: Strengths ═══
  {
    id: 7, round: 3, type: "emoji-grid", maxSelect: 3,
    prompt: "What do people actually come to you for?",
    options: [
      { label: "Explaining things so they make sense", value: "explaining", emoji: "🗣️", riasec: ["S"] },
      { label: "Coming up with fresh ideas", value: "ideas", emoji: "💡", riasec: ["A", "E"] },
      { label: "Staying calm when things go wrong", value: "calm", emoji: "🧘", riasec: ["S"] },
      { label: "Spotting details others miss", value: "details", emoji: "🔍", riasec: ["C", "I"] },
      { label: "Getting people excited and moving", value: "energising", emoji: "⚡", riasec: ["E"] },
      { label: "Making people feel heard and understood", value: "empathy", emoji: "❤️", riasec: ["S"] },
      { label: "Building, fixing, or making things work", value: "building", emoji: "🔧", riasec: ["R"] },
      { label: "Spotting patterns in data or situations", value: "patterns", emoji: "📈", riasec: ["I"] },
      { label: "Performing or presenting in front of others", value: "performing", emoji: "🎤", riasec: ["E", "A"] },
      { label: "Keeping things organised and on track", value: "organising", emoji: "🗂️", riasec: ["C"] },
    ],
  },
  {
    id: 8, round: 3, type: "tap-select",
    prompt: "When you're stuck on something challenging, which describes you best?",
    options: [
      { label: "I zoom out — I care about the big picture and the overall vision", value: "big-picture", emoji: "🌐", riasec: ["E"] },
      { label: "I zoom in — I want every detail to be exactly right", value: "detail", emoji: "🔍", riasec: ["C"] },
      { label: "I switch between both depending on the situation", value: "balanced", emoji: "⚖️" },
    ],
  },

  // ═══ ROUND 4: Values ═══
  {
    id: 10, round: 4, type: "drag-rank",
    prompt: "Drag these into your personal order — most important at the top.",
    options: [
      { label: "Earning really good money", value: "money", emoji: "💰" },
      { label: "Making a genuine difference in people's lives", value: "impact", emoji: "❤️" },
      { label: "Doing something creative every day", value: "creativity", emoji: "🎨" },
      { label: "Feeling stable and secure — knowing the job is safe", value: "stability", emoji: "🔒" },
      { label: "Being challenged and always growing", value: "growth", emoji: "🚀" },
      { label: "Freedom — flexible hours, be your own boss", value: "freedom", emoji: "🗽" },
    ],
  },

  // ═══ ROUND 5: Personality & Risk ═══
  {
    id: 13, round: 5, type: "emoji-slider", sliderPoints: 5,
    prompt: "How do you feel about trying something new that might not work out?",
    sliderLabels: { left: "Makes me anxious", right: "I live for it", leftEmoji: "😬", rightEmoji: "😎" },
  },
  {
    id: 14, round: 5, type: "three-way",
    prompt: "At a party or social event, you usually...",
    options: [
      { label: "End up talking to lots of new people — I get energy from it", value: "extrovert", emoji: "🔥" },
      { label: "Stick with people I already know and have deeper chats", value: "ambivert", emoji: "🤝" },
      { label: "I'd honestly rather not be there — I recharge alone", value: "introvert", emoji: "🎧" },
    ],
  },

  // ═══ ROUND 6: Subjects & Career Curiosity ═══
  {
    id: 16, round: 6, type: "pill-grid", maxSelect: 4,
    prompt: "Which subjects do you actually enjoy — even a little?",
    options: [
      { label: "English", value: "english", emoji: "📝" },
      { label: "Maths", value: "maths", emoji: "🔢" },
      { label: "Biology", value: "biology", emoji: "🧬" },
      { label: "Chemistry", value: "chemistry", emoji: "⚗️" },
      { label: "Physics", value: "physics", emoji: "⚛️" },
      { label: "Geography", value: "geography", emoji: "🌍" },
      { label: "Economics", value: "economics", emoji: "📈" },
      { label: "Art", value: "art", emoji: "🎨" },
      { label: "Computer Science", value: "cs", emoji: "💻" },
      { label: "Business Studies", value: "business", emoji: "💼" },
      { label: "Drama", value: "drama", emoji: "🎭" },
      { label: "Music", value: "music", emoji: "🎵" },
      { label: "History", value: "history", emoji: "📜" },
      { label: "Physical Education", value: "pe", emoji: "🏃" },
      { label: "Literature", value: "literature", emoji: "📖" },
      { label: "Civics", value: "civics", emoji: "🏛️" },
      { label: "Environmental Science", value: "env-sci", emoji: "🌱" },
      { label: "Food & Nutrition", value: "food", emoji: "🍳" },
      { label: "Further Maths", value: "further-maths", emoji: "➕" },
    ],
  },
  {
    id: 18, round: 6, type: "free-text", skippable: true,
    prompt: "Is there a job or career you've already thought about? Even a vague idea counts.",
    placeholder: "e.g. forensic scientist, game developer, fashion designer...",
    options: [
      { label: "I haven't thought about one yet", value: "no-idea" },
    ],
  },
];

// ─── Archetype definitions (kept for backward compat) ───
export interface Archetype {
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export const archetypes: Record<string, Archetype> = {
  builder: { name: "The Builder", emoji: "🔧", description: "You love creating things from scratch and solving technical challenges.", color: "primary" },
  visionary: { name: "The Visionary", emoji: "🔮", description: "You see the big picture and inspire others with bold ideas.", color: "secondary" },
  creator: { name: "The Creator", emoji: "🎨", description: "You express yourself through art, design, and creative work.", color: "purple" },
  analyst: { name: "The Analyst", emoji: "📊", description: "You thrive on data, logic, and finding patterns others miss.", color: "secondary" },
  healer: { name: "The Healer", emoji: "💚", description: "You're driven by caring for others and making lives better.", color: "accent" },
  explorer: { name: "The Explorer", emoji: "🧭", description: "You seek adventure, new experiences, and understanding the world.", color: "primary" },
};

// ─── RIASEC Career Tags ───
const tagToRiasec: Record<string, RIASECCode[]> = {
  "tech": ["I", "R"], "analytical": ["I", "C"], "innovative": ["I", "E"],
  "engineering": ["R", "I"], "healthcare": ["S", "I"], "caring": ["S"],
  "creative": ["A"], "design": ["A", "R"], "business": ["E", "C"],
  "leadership": ["E"], "research": ["I"], "hands-on": ["R"],
  "outdoors": ["R"], "public-facing": ["E", "S"], "writing": ["A"],
  "science": ["I"], "finance": ["C", "E"], "sports": ["R"],
  "collaborative": ["S", "E"], "independent": ["I", "C"],
  "adventurous": ["R", "E"], "helping": ["S"], "stable": ["C"],
  "mission-driven": ["S"], "impactful": ["S", "E"], "cultural": ["A", "S"],
  "nature": ["R"], "environment": ["I", "R"], "sustainability": ["I", "S"],
  "high-salary": ["E", "C"], "risk-taking": ["E"], "empathetic": ["S"],
  "detail-oriented": ["C"], "visionary": ["E", "A"], "life-saving": ["S", "I"],
  "future-proof": ["I"], "performance": ["A", "E"],
};

export function getCareerRiasecProfile(tags: string[]): Record<RIASECCode, number> {
  const profile: Record<RIASECCode, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  tags.forEach(tag => {
    const codes = tagToRiasec[tag];
    if (codes) codes.forEach(c => profile[c] += 10);
  });
  const max = Math.max(...Object.values(profile), 1);
  (Object.keys(profile) as RIASECCode[]).forEach(k => profile[k] = Math.round((profile[k] / max) * 100));
  return profile;
}

// ─── Scoring helpers ───
export function computeRiasecFromAnswers(
  answers: Record<number, any>,
  dreamCareerRiasec?: Record<RIASECCode, number>
): Record<RIASECCode, number> {
  const scores: Record<RIASECCode, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  assessmentQuestions.forEach(q => {
    const ans = answers[q.id];
    if (!ans || !q.options) return;

    if (Array.isArray(ans)) {
      ans.forEach((v: string) => {
        const opt = q.options!.find(o => o.value === v);
        opt?.riasec?.forEach(c => scores[c] += 2);
      });
    } else if (typeof ans === "string") {
      const opt = q.options!.find(o => o.value === ans);
      opt?.riasec?.forEach(c => scores[c] += 3);
    }
  });

  // Dream career RIASEC boost — weighted as 2 MC questions (~6 points per dominant code)
  if (dreamCareerRiasec) {
    (Object.keys(dreamCareerRiasec) as RIASECCode[]).forEach(k => {
      scores[k] += Math.round((dreamCareerRiasec[k] / 100) * 6);
    });
  }

  const max = Math.max(...Object.values(scores), 1);
  (Object.keys(scores) as RIASECCode[]).forEach(k => scores[k] = Math.round((scores[k] / max) * 100));
  return scores;
}

function riasecSimilarity(a: Record<RIASECCode, number>, b: Record<RIASECCode, number>): number {
  let dot = 0, magA = 0, magB = 0;
  (Object.keys(a) as RIASECCode[]).forEach(k => {
    dot += a[k] * b[k];
    magA += a[k] * a[k];
    magB += b[k] * b[k];
  });
  if (magA === 0 || magB === 0) return 0;
  return Math.round((dot / (Math.sqrt(magA) * Math.sqrt(magB))) * 100);
}

// ─── Value mappings ───
const valueCareerTags: Record<string, string[]> = {
  money: ["high-salary", "finance", "business"],
  impact: ["mission-driven", "impactful", "caring", "healthcare", "helping"],
  creativity: ["creative", "design", "writing", "cultural"],
  stability: ["stable", "healthcare"],
  growth: ["innovative", "future-proof", "tech"],
  freedom: ["independent", "risk-taking", "adventurous"],
};

const botherToValue: Record<string, string> = {
  "no-variety": "growth", "no-stability": "stability", "no-autonomy": "freedom",
  "no-impact": "impact", "no-status": "growth", "no-creativity": "creativity",
};

// ─── Main matching algorithm ───
export function matchCareers(
  answers: Record<number, any>,
  dreamCareerRiasec?: Record<RIASECCode, number>
): { careerId: string; score: number; rawScore: number }[] {
  const studentRiasec = computeRiasecFromAnswers(answers, dreamCareerRiasec);
  const scores: Record<string, number> = {};

  careerData.forEach(career => {
    const careerRiasec = getCareerRiasecProfile(career.tags);
    let total = 0;

    // 1) RIASEC alignment — 30%
    const riasecScore = riasecSimilarity(studentRiasec, careerRiasec);
    total += riasecScore * 0.30;

    // 2) Interests (Q1-Q2) — 20%
    let interestScore = 0;
    const q1 = answers[1];
    if (q1 === "design-poster" && career.tags.some(t => ["creative", "design", "writing"].includes(t))) interestScore += 33;
    if (q1 === "experiment" && career.tags.some(t => ["research", "science", "analytical"].includes(t))) interestScore += 33;
    if (q1 === "talent-show" && career.tags.some(t => ["leadership", "business", "public-facing"].includes(t))) interestScore += 33;
    if (q1 === "build-app" && career.tags.some(t => ["tech", "engineering", "hands-on"].includes(t))) interestScore += 33;
    if (q1 === "campaign" && career.tags.some(t => ["mission-driven", "impactful", "helping"].includes(t))) interestScore += 33;
    if (q1 === "volunteer" && career.tags.some(t => ["healthcare", "caring", "helping"].includes(t))) interestScore += 33;

    const q2 = answers[2];
    if (Array.isArray(q2)) {
      q2.forEach((v: string) => {
        const opt = assessmentQuestions.find(q => q.id === 2)?.options?.find(o => o.value === v);
        if (opt?.riasec) {
          opt.riasec.forEach(c => {
            if (careerRiasec[c] > 40) interestScore += 11;
          });
        }
      });
    }
    total += Math.min(interestScore, 100) * 0.20;

    // 3) Values (Q10) — 20%
    let valueScore = 0;
    const q10 = answers[10];
    if (Array.isArray(q10) && q10.length > 0) {
      const topValues = q10.slice(0, 2);
      topValues.forEach((v: string) => {
        const matchTags = valueCareerTags[v] || [];
        if (career.tags.some(t => matchTags.includes(t))) valueScore += 25;
      });
    }
    // Q11 and Q12 removed — their code paths won't execute since no answers exist
    const q11 = answers[11];
    if (q11) {
      const mappedValue = botherToValue[q11];
      if (mappedValue) {
        const matchTags = valueCareerTags[mappedValue] || [];
        if (career.tags.some(t => matchTags.includes(t))) valueScore += 25;
      }
    }
    const q12 = answers[12];
    if (q12 === "healthcare" && career.tags.includes("healthcare")) valueScore += 25;
    if (q12 === "tech" && career.tags.includes("tech")) valueScore += 25;
    if (q12 === "culture" && career.tags.includes("creative")) valueScore += 25;
    if (q12 === "justice" && career.tags.some(t => ["mission-driven", "helping"].includes(t))) valueScore += 25;
    total += Math.min(valueScore, 100) * 0.20;

    // 4) Work style & personality (Q4, Q13, Q14) — 15%
    let personalityScore = 50;
    const q4 = answers[4];
    if (q4 === "solo" && career.tags.includes("independent")) personalityScore += 15;
    if (q4 === "collab" && career.tags.some(t => ["collaborative", "public-facing"].includes(t))) personalityScore += 15;

    const q14 = answers[14];
    if (q14 === "extrovert" && career.tags.includes("public-facing")) personalityScore += 10;
    if (q14 === "introvert" && career.tags.includes("independent")) personalityScore += 10;

    total += Math.min(personalityScore, 100) * 0.15;

    // 5) Strengths (Q7, Q8) — 10%
    let strengthScore = 0;
    const q7 = answers[7];
    if (Array.isArray(q7)) {
      q7.forEach((v: string) => {
        const opt = assessmentQuestions.find(q => q.id === 7)?.options?.find(o => o.value === v);
        if (opt?.riasec) {
          opt.riasec.forEach(c => {
            if (careerRiasec[c] > 40) strengthScore += 15;
          });
        }
      });
    }
    total += Math.min(strengthScore, 100) * 0.10;

    // 6) Subjects (Q16) — 5%
    let subjectScore = 0;
    const q16 = answers[16];
    if (Array.isArray(q16)) {
      const subjectMapping: Record<string, string[]> = {
        maths: ["tech", "engineering", "finance", "analytical"],
        physics: ["engineering", "tech", "science"],
        biology: ["healthcare", "science"],
        chemistry: ["healthcare", "science"],
        cs: ["tech"],
        art: ["creative", "design"],
        english: ["writing", "cultural"],
        economics: ["business", "finance"],
        business: ["business", "leadership"],
        drama: ["creative", "performance", "public-facing"],
        music: ["creative"],
        pe: ["sports"],
        history: ["cultural"],
        "env-sci": ["environment", "sustainability"],
      };
      q16.forEach((s: string) => {
        const tags = subjectMapping[s] || [];
        if (career.tags.some(t => tags.includes(t))) subjectScore += 25;
      });
    }
    total += Math.min(subjectScore, 100) * 0.05;

    scores[career.id] = total;
  });

  // Q18 dream career is now handled via dreamCareerRiasec parameter in RIASEC computation
  // No additional text-search boost needed

  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a).slice(0, 3);
  const maxScore = sorted[0]?.[1] || 1;

  return sorted.map(([id, score]) => ({
    careerId: id,
    score: Math.min(98, Math.max(60, Math.round((score / maxScore) * 95 + 3))),
    rawScore: Math.round(score),
  }));
}

export function determineArchetype(answers: Record<number, any>): string {
  const riasec = computeRiasecFromAnswers(answers);
  const map: Record<RIASECCode, string> = { R: "builder", I: "analyst", A: "creator", S: "healer", E: "visionary", C: "analyst" };
  const top = (Object.entries(riasec) as [RIASECCode, number][]).sort(([, a], [, b]) => b - a)[0][0];
  return map[top] || "explorer";
}
