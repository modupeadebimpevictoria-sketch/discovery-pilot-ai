import { careers as careerData } from "./careers";

export type QuestionType = "multiple-choice" | "scenario" | "slider" | "personality";

export interface AssessmentQuestion {
  id: number;
  type: QuestionType;
  category: string;
  question: string;
  emoji: string;
  options?: { label: string; value: string; emoji?: string }[];
  sliderLabels?: { left: string; right: string };
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    type: "multiple-choice",
    category: "interests",
    question: "What sounds like the most exciting way to spend a Saturday?",
    emoji: "🌟",
    options: [
      { label: "Building something with my hands or code", value: "building", emoji: "🔧" },
      { label: "Helping someone solve a problem", value: "helping", emoji: "🤝" },
      { label: "Creating art, music, or content", value: "creating", emoji: "🎨" },
      { label: "Exploring nature or doing sports", value: "exploring", emoji: "🌿" },
    ],
  },
  {
    id: 2,
    type: "scenario",
    category: "strengths",
    question: "Your school asks you to lead a big project. What's your move?",
    emoji: "🎯",
    options: [
      { label: "I plan everything out and organize the team", value: "organizer", emoji: "📋" },
      { label: "I come up with creative ideas and inspire people", value: "visionary", emoji: "💡" },
      { label: "I dive into the details and do the hard work", value: "executor", emoji: "⚡" },
      { label: "I research everything first to make smart decisions", value: "researcher", emoji: "🔍" },
    ],
  },
  {
    id: 3,
    type: "slider",
    category: "thinking-style",
    question: "How do you prefer to solve problems?",
    emoji: "🧠",
    sliderLabels: { left: "Logic & Analysis 🔬", right: "Creativity & Intuition 🎨" },
  },
  {
    id: 4,
    type: "multiple-choice",
    category: "academic",
    question: "Which school subject genuinely excites you?",
    emoji: "📚",
    options: [
      { label: "Math or Physics — I love solving puzzles", value: "stem", emoji: "🔢" },
      { label: "English or History — I love stories and ideas", value: "humanities", emoji: "📖" },
      { label: "Art or Music — I love expressing myself", value: "arts", emoji: "🎵" },
      { label: "Biology or Chemistry — I love understanding life", value: "life-sciences", emoji: "🧬" },
    ],
  },
  {
    id: 5,
    type: "personality",
    category: "personality",
    question: "At a party, you're most likely to...",
    emoji: "🎉",
    options: [
      { label: "Talk to everyone and be the center of energy", value: "extrovert", emoji: "🗣️" },
      { label: "Have deep conversations with a few people", value: "ambivert", emoji: "💬" },
      { label: "Observe and enjoy the vibe quietly", value: "introvert", emoji: "👀" },
      { label: "Be organizing the playlist or food", value: "organizer", emoji: "🎧" },
    ],
  },
  {
    id: 6,
    type: "multiple-choice",
    category: "work-environment",
    question: "Where would you love to work?",
    emoji: "🏢",
    options: [
      { label: "A high-tech office with the latest gadgets", value: "tech-office", emoji: "💻" },
      { label: "Outdoors — labs, fields, or the ocean", value: "outdoors", emoji: "🌊" },
      { label: "A creative studio or workshop", value: "studio", emoji: "🎨" },
      { label: "A hospital, school, or community center", value: "community", emoji: "🏥" },
    ],
  },
  {
    id: 7,
    type: "slider",
    category: "work-style",
    question: "Do you prefer working alone or with a team?",
    emoji: "👥",
    sliderLabels: { left: "Solo — I do my best work alone 🎯", right: "Team — I thrive with others 🤝" },
  },
  {
    id: 8,
    type: "scenario",
    category: "goals",
    question: "You just won $10 million. What do you do first?",
    emoji: "💰",
    options: [
      { label: "Start a business that changes the world", value: "entrepreneur", emoji: "🚀" },
      { label: "Fund research to solve a huge problem", value: "researcher", emoji: "🔬" },
      { label: "Create something beautiful — a film, album, or building", value: "creator", emoji: "🎬" },
      { label: "Travel and learn from different cultures", value: "explorer", emoji: "✈️" },
    ],
  },
  {
    id: 9,
    type: "multiple-choice",
    category: "impact",
    question: "What kind of impact do you want to make?",
    emoji: "🌍",
    options: [
      { label: "Save lives or improve health", value: "health", emoji: "❤️" },
      { label: "Push technology forward", value: "technology", emoji: "🤖" },
      { label: "Make people feel something through art", value: "art", emoji: "🎭" },
      { label: "Protect the planet and nature", value: "environment", emoji: "🌱" },
    ],
  },
  {
    id: 10,
    type: "slider",
    category: "risk-tolerance",
    question: "How much risk are you willing to take in your career?",
    emoji: "🎲",
    sliderLabels: { left: "Play it safe — I want stability 🛡️", right: "Go big — I'll risk it all 🎰" },
  },
  {
    id: 11,
    type: "personality",
    category: "personality",
    question: "Friends would describe you as...",
    emoji: "✨",
    options: [
      { label: "The brains — always solving problems", value: "analytical", emoji: "🧠" },
      { label: "The heart — always caring for others", value: "empathetic", emoji: "💖" },
      { label: "The spark — always generating ideas", value: "creative", emoji: "⚡" },
      { label: "The rock — always reliable and strong", value: "steady", emoji: "🪨" },
    ],
  },
  {
    id: 12,
    type: "multiple-choice",
    category: "interests",
    question: "Which YouTube rabbit hole do you fall into?",
    emoji: "📱",
    options: [
      { label: "Tech reviews and coding tutorials", value: "tech", emoji: "💻" },
      { label: "True crime, documentaries, psychology", value: "investigation", emoji: "🔍" },
      { label: "Music production, art, or design", value: "creative", emoji: "🎨" },
      { label: "Sports highlights and fitness", value: "sports", emoji: "🏅" },
    ],
  },
  {
    id: 13,
    type: "scenario",
    category: "strengths",
    question: "A friend is starting a business and needs help. You offer to...",
    emoji: "🤝",
    options: [
      { label: "Build their website or app", value: "technical", emoji: "🖥️" },
      { label: "Design their brand and marketing", value: "design", emoji: "✏️" },
      { label: "Handle the finances and strategy", value: "business", emoji: "📊" },
      { label: "Connect them with the right people", value: "networking", emoji: "🌐" },
    ],
  },
  {
    id: 14,
    type: "slider",
    category: "leadership",
    question: "Are you more of a leader or an independent contributor?",
    emoji: "👑",
    sliderLabels: { left: "Independent expert 🎯", right: "Team leader 👑" },
  },
  {
    id: 15,
    type: "multiple-choice",
    category: "academic",
    question: "What kind of project would you ace?",
    emoji: "🏆",
    options: [
      { label: "A science experiment or engineering challenge", value: "stem-project", emoji: "🔬" },
      { label: "A creative writing or film project", value: "creative-project", emoji: "📝" },
      { label: "A business plan or debate competition", value: "business-project", emoji: "💼" },
      { label: "A community service or environmental project", value: "service-project", emoji: "🌍" },
    ],
  },
  {
    id: 16,
    type: "personality",
    category: "motivation",
    question: "What motivates you the most?",
    emoji: "🔥",
    options: [
      { label: "Making a lot of money", value: "wealth", emoji: "💵" },
      { label: "Making a real difference in the world", value: "impact", emoji: "🌟" },
      { label: "Being famous or influential", value: "fame", emoji: "⭐" },
      { label: "Having freedom and work-life balance", value: "freedom", emoji: "🕊️" },
    ],
  },
  {
    id: 17,
    type: "multiple-choice",
    category: "work-environment",
    question: "What's your ideal daily routine?",
    emoji: "⏰",
    options: [
      { label: "Structured 9-5 with clear tasks", value: "structured", emoji: "📋" },
      { label: "Flexible hours, work from anywhere", value: "flexible", emoji: "🏠" },
      { label: "Always different — travel and variety", value: "varied", emoji: "✈️" },
      { label: "High-intensity, fast-paced environment", value: "intense", emoji: "🔥" },
    ],
  },
  {
    id: 18,
    type: "scenario",
    category: "impact",
    question: "If you could fix ONE world problem, which would it be?",
    emoji: "🌎",
    options: [
      { label: "Climate change and environmental destruction", value: "environment", emoji: "🌡️" },
      { label: "Healthcare access and disease", value: "health", emoji: "🏥" },
      { label: "Education inequality", value: "education", emoji: "📚" },
      { label: "Poverty and economic inequality", value: "poverty", emoji: "🤲" },
    ],
  },
  {
    id: 19,
    type: "slider",
    category: "thinking-style",
    question: "Big picture or fine details?",
    emoji: "🔎",
    sliderLabels: { left: "Zoom in — I love the details 🔍", right: "Zoom out — I see the big picture 🌐" },
  },
  {
    id: 20,
    type: "multiple-choice",
    category: "interests",
    question: "Which superpower would you choose?",
    emoji: "🦸",
    options: [
      { label: "Super intelligence — know everything instantly", value: "intelligence", emoji: "🧠" },
      { label: "Healing — cure any illness or injury", value: "healing", emoji: "✨" },
      { label: "Time travel — explore past and future", value: "time-travel", emoji: "⏰" },
      { label: "Telepathy — understand everyone's feelings", value: "telepathy", emoji: "💫" },
    ],
  },
];

export interface AssessmentResult {
  answers: Record<number, string | number>;
}

// Archetype definitions
export interface Archetype {
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export const archetypes: Record<string, Archetype> = {
  builder: {
    name: "The Builder",
    emoji: "🔧",
    description: "You love creating things from scratch and solving technical challenges.",
    color: "primary",
  },
  visionary: {
    name: "The Visionary",
    emoji: "🔮",
    description: "You see the big picture and inspire others with bold ideas.",
    color: "secondary",
  },
  creator: {
    name: "The Creator",
    emoji: "🎨",
    description: "You express yourself through art, design, and creative work.",
    color: "purple",
  },
  analyst: {
    name: "The Analyst",
    emoji: "📊",
    description: "You thrive on data, logic, and finding patterns others miss.",
    color: "secondary",
  },
  healer: {
    name: "The Healer",
    emoji: "💚",
    description: "You're driven by caring for others and making lives better.",
    color: "accent",
  },
  explorer: {
    name: "The Explorer",
    emoji: "🧭",
    description: "You seek adventure, new experiences, and understanding the world.",
    color: "primary",
  },
};

// Simple career matching algorithm
export function matchCareers(answers: Record<number, string | number>) {
  const scores: Record<string, number> = {};
  
  const { careers: careerList } = require("./careers") as { careers: any[] };

  careerList.forEach((career: any) => {
    let score = 0;

    // Interest matching
    const q1 = answers[1];
    if (q1 === "building" && career.tags.includes("tech")) score += 15;
    if (q1 === "building" && career.tags.includes("engineering")) score += 15;
    if (q1 === "helping" && career.tags.includes("healthcare")) score += 15;
    if (q1 === "helping" && career.tags.includes("caring")) score += 10;
    if (q1 === "creating" && career.tags.includes("creative")) score += 15;
    if (q1 === "exploring" && career.tags.includes("adventurous")) score += 15;
    if (q1 === "exploring" && career.tags.includes("outdoors")) score += 10;

    // Strength matching
    const q2 = answers[2];
    if (q2 === "organizer" && career.tags.includes("leadership")) score += 10;
    if (q2 === "visionary" && career.tags.includes("innovative")) score += 10;
    if (q2 === "executor" && career.tags.includes("hands-on")) score += 10;
    if (q2 === "researcher" && career.tags.includes("analytical")) score += 10;
    if (q2 === "researcher" && career.tags.includes("research")) score += 10;

    // Thinking style (slider 0-100)
    const q3 = typeof answers[3] === "number" ? answers[3] : 50;
    if (q3 < 40 && career.tags.includes("analytical")) score += 10;
    if (q3 > 60 && career.tags.includes("creative")) score += 10;

    // Academic interests
    const q4 = answers[4];
    if (q4 === "stem" && career.tags.includes("tech")) score += 12;
    if (q4 === "stem" && career.tags.includes("engineering")) score += 12;
    if (q4 === "humanities" && career.tags.includes("writing")) score += 12;
    if (q4 === "humanities" && career.tags.includes("cultural")) score += 8;
    if (q4 === "arts" && career.tags.includes("creative")) score += 12;
    if (q4 === "life-sciences" && career.tags.includes("healthcare")) score += 12;
    if (q4 === "life-sciences" && career.tags.includes("science")) score += 10;

    // Personality
    const q5 = answers[5];
    if (q5 === "extrovert" && career.tags.includes("public-facing")) score += 8;
    if (q5 === "extrovert" && career.tags.includes("leadership")) score += 8;
    if (q5 === "introvert" && career.tags.includes("research")) score += 8;
    if (q5 === "introvert" && career.tags.includes("analytical")) score += 5;

    // Work environment
    const q6 = answers[6];
    if (q6 === "tech-office" && career.tags.includes("tech")) score += 10;
    if (q6 === "outdoors" && career.tags.includes("outdoors")) score += 10;
    if (q6 === "outdoors" && career.tags.includes("nature")) score += 10;
    if (q6 === "outdoors" && career.tags.includes("adventurous")) score += 8;
    if (q6 === "studio" && career.tags.includes("creative")) score += 10;
    if (q6 === "studio" && career.tags.includes("design")) score += 8;
    if (q6 === "community" && career.tags.includes("healthcare")) score += 10;
    if (q6 === "community" && career.tags.includes("helping")) score += 8;

    // Work style (slider)
    const q7 = typeof answers[7] === "number" ? answers[7] : 50;
    if (q7 < 40 && career.tags.includes("independent")) score += 8;
    if (q7 > 60 && career.tags.includes("collaborative")) score += 8;

    // Goals
    const q8 = answers[8];
    if (q8 === "entrepreneur" && career.tags.includes("business")) score += 10;
    if (q8 === "entrepreneur" && career.tags.includes("leadership")) score += 8;
    if (q8 === "researcher" && career.tags.includes("research")) score += 10;
    if (q8 === "researcher" && career.tags.includes("science")) score += 8;
    if (q8 === "creator" && career.tags.includes("creative")) score += 10;
    if (q8 === "explorer" && career.tags.includes("adventurous")) score += 10;

    // Impact
    const q9 = answers[9];
    if (q9 === "health" && career.tags.includes("healthcare")) score += 12;
    if (q9 === "health" && career.tags.includes("life-saving")) score += 10;
    if (q9 === "technology" && career.tags.includes("tech")) score += 12;
    if (q9 === "technology" && career.tags.includes("innovative")) score += 8;
    if (q9 === "art" && career.tags.includes("creative")) score += 12;
    if (q9 === "environment" && career.tags.includes("environment")) score += 12;
    if (q9 === "environment" && career.tags.includes("sustainability")) score += 10;

    // Risk tolerance (slider)
    const q10 = typeof answers[10] === "number" ? answers[10] : 50;
    if (q10 > 70 && career.tags.includes("risk-taking")) score += 8;
    if (q10 < 30 && career.tags.includes("stable")) score += 8;

    // Personality q11
    const q11 = answers[11];
    if (q11 === "analytical" && career.tags.includes("analytical")) score += 10;
    if (q11 === "empathetic" && career.tags.includes("caring")) score += 10;
    if (q11 === "empathetic" && career.tags.includes("empathetic")) score += 10;
    if (q11 === "creative" && career.tags.includes("creative")) score += 10;
    if (q11 === "steady" && career.tags.includes("stable")) score += 8;

    // YouTube interests q12
    const q12 = answers[12];
    if (q12 === "tech" && career.tags.includes("tech")) score += 8;
    if (q12 === "investigation" && career.tags.includes("research")) score += 8;
    if (q12 === "creative" && career.tags.includes("creative")) score += 8;
    if (q12 === "sports" && career.tags.includes("sports")) score += 8;

    // Skills q13
    const q13 = answers[13];
    if (q13 === "technical" && career.tags.includes("tech")) score += 8;
    if (q13 === "design" && career.tags.includes("design")) score += 8;
    if (q13 === "business" && career.tags.includes("business")) score += 8;
    if (q13 === "business" && career.tags.includes("finance")) score += 8;
    if (q13 === "networking" && career.tags.includes("public-facing")) score += 8;

    // Leadership (slider)
    const q14 = typeof answers[14] === "number" ? answers[14] : 50;
    if (q14 > 60 && career.tags.includes("leadership")) score += 8;

    // Academic project q15
    const q15 = answers[15];
    if (q15 === "stem-project" && career.tags.includes("engineering")) score += 8;
    if (q15 === "stem-project" && career.tags.includes("tech")) score += 5;
    if (q15 === "creative-project" && career.tags.includes("creative")) score += 8;
    if (q15 === "business-project" && career.tags.includes("business")) score += 8;
    if (q15 === "service-project" && career.tags.includes("mission-driven")) score += 8;

    // Motivation q16
    const q16 = answers[16];
    if (q16 === "wealth" && career.tags.includes("high-salary")) score += 8;
    if (q16 === "impact" && career.tags.includes("mission-driven")) score += 8;
    if (q16 === "impact" && career.tags.includes("impactful")) score += 8;

    // World problem q18
    const q18 = answers[18];
    if (q18 === "environment" && career.tags.includes("environment")) score += 10;
    if (q18 === "health" && career.tags.includes("healthcare")) score += 10;

    // Big picture vs details (slider)
    const q19 = typeof answers[19] === "number" ? answers[19] : 50;
    if (q19 < 40 && career.tags.includes("detail-oriented")) score += 5;
    if (q19 > 60 && career.tags.includes("visionary")) score += 5;

    // Superpower q20
    const q20 = answers[20];
    if (q20 === "intelligence" && career.tags.includes("analytical")) score += 8;
    if (q20 === "healing" && career.tags.includes("healthcare")) score += 8;
    if (q20 === "telepathy" && career.tags.includes("empathetic")) score += 8;

    scores[career.id] = score;
  });

  // Sort and return top 5
  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const maxScore = sorted[0]?.[1] || 1;

  return sorted.map(([id, score]) => ({
    careerId: id,
    score: Math.min(98, Math.round((score / maxScore) * 100 * 0.95 + 5)),
    rawScore: score,
  }));
}

export function determineArchetype(answers: Record<number, string | number>): string {
  const counts: Record<string, number> = {
    builder: 0,
    visionary: 0,
    creator: 0,
    analyst: 0,
    healer: 0,
    explorer: 0,
  };

  if (answers[1] === "building") { counts.builder += 2; counts.analyst += 1; }
  if (answers[1] === "helping") { counts.healer += 2; }
  if (answers[1] === "creating") { counts.creator += 2; }
  if (answers[1] === "exploring") { counts.explorer += 2; }

  if (answers[2] === "organizer") counts.builder += 1;
  if (answers[2] === "visionary") counts.visionary += 2;
  if (answers[2] === "executor") counts.builder += 1;
  if (answers[2] === "researcher") counts.analyst += 2;

  const q3 = typeof answers[3] === "number" ? answers[3] : 50;
  if (q3 < 40) counts.analyst += 2;
  if (q3 > 60) counts.creator += 2;

  if (answers[8] === "entrepreneur") counts.visionary += 2;
  if (answers[8] === "researcher") counts.analyst += 1;
  if (answers[8] === "creator") counts.creator += 2;
  if (answers[8] === "explorer") counts.explorer += 2;

  if (answers[9] === "health") counts.healer += 2;
  if (answers[9] === "technology") { counts.builder += 1; counts.visionary += 1; }
  if (answers[9] === "art") counts.creator += 2;
  if (answers[9] === "environment") counts.explorer += 1;

  if (answers[11] === "analytical") counts.analyst += 2;
  if (answers[11] === "empathetic") counts.healer += 2;
  if (answers[11] === "creative") counts.creator += 2;
  if (answers[11] === "steady") counts.builder += 1;

  const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
  return sorted[0][0];
}
