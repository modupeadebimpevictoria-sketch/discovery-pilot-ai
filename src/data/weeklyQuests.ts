export interface WeeklyQuest {
  id: string;
  careerId: string;
  title: string;
  description: string;
  timeMinutes: number;
  xpReward: number;
  emoji: string;
  skillTag: string;
  week: number; // 1-52, cycles through
}

export const weeklyQuests: WeeklyQuest[] = [
  // AI Engineer
  { id: "wq-ai-1", careerId: "ai-engineer", title: "Teach a Chatbot Something New", description: "Use ChatGPT or a free chatbot and try to get it to answer unusual questions. Write down what it gets right and wrong.", timeMinutes: 15, xpReward: 25, emoji: "🤖", skillTag: "AI Thinking", week: 1 },
  { id: "wq-ai-2", careerId: "ai-engineer", title: "Spot AI in Your Life", description: "List 5 things you used today that are powered by AI (suggestions, filters, autocorrect). How do they work?", timeMinutes: 10, xpReward: 20, emoji: "🔍", skillTag: "AI Awareness", week: 2 },
  { id: "wq-ai-3", careerId: "ai-engineer", title: "Code a Simple Calculator", description: "Write a Python calculator that adds, subtracts, multiplies and divides. Use replit.com if you don't have Python.", timeMinutes: 25, xpReward: 35, emoji: "🧮", skillTag: "Programming", week: 3 },
  { id: "wq-ai-4", careerId: "ai-engineer", title: "Data Detective", description: "Find a free dataset online and write 3 interesting facts you discovered from the data.", timeMinutes: 20, xpReward: 30, emoji: "📊", skillTag: "Data Analysis", week: 4 },

  // Architect
  { id: "wq-arch-1", careerId: "architect", title: "Analyse a Building", description: "Visit a building you admire. Sketch its shape, note the materials used, and write why you think it was designed that way.", timeMinutes: 25, xpReward: 30, emoji: "🏗️", skillTag: "Design Thinking", week: 1 },
  { id: "wq-arch-2", careerId: "architect", title: "Design a Tiny House", description: "Using pen and paper, design a tiny house (under 20 square metres) that has everything someone needs.", timeMinutes: 20, xpReward: 25, emoji: "🏠", skillTag: "Space Design", week: 2 },
  { id: "wq-arch-3", careerId: "architect", title: "Build a Bridge from Paper", description: "Using only paper and tape, build the strongest bridge you can. Test it with coins!", timeMinutes: 30, xpReward: 35, emoji: "🌉", skillTag: "Engineering", week: 3 },
  { id: "wq-arch-4", careerId: "architect", title: "Photo Walk: Patterns in Buildings", description: "Walk around your neighbourhood and photograph 5 interesting patterns, textures, or shapes in buildings.", timeMinutes: 20, xpReward: 25, emoji: "📸", skillTag: "Observation", week: 4 },

  // Entrepreneur
  { id: "wq-ent-1", careerId: "entrepreneur", title: "Spot a Problem to Solve", description: "Walk around your school or neighbourhood and find 3 problems people have. Write a business idea for each.", timeMinutes: 15, xpReward: 25, emoji: "💡", skillTag: "Ideation", week: 1 },
  { id: "wq-ent-2", careerId: "entrepreneur", title: "Interview a Business Owner", description: "Talk to a local shop owner or business person. Ask: How did you start? What's the hardest part?", timeMinutes: 20, xpReward: 30, emoji: "🎤", skillTag: "Networking", week: 2 },
  { id: "wq-ent-3", careerId: "entrepreneur", title: "Create a Social Media Post", description: "Design a promotional post for a product or service you'd like to create. Use Canva for free.", timeMinutes: 15, xpReward: 20, emoji: "📱", skillTag: "Marketing", week: 3 },
  { id: "wq-ent-4", careerId: "entrepreneur", title: "Budget Challenge", description: "If you had ₦50,000 to start a business, plan exactly how you'd spend it. List every cost.", timeMinutes: 15, xpReward: 25, emoji: "💰", skillTag: "Finance", week: 4 },

  // Film Director
  { id: "wq-film-1", careerId: "film-director", title: "Write a One-Page Script", description: "Write a short script (1 page) for a 30-second scene. Include dialogue and stage directions.", timeMinutes: 20, xpReward: 25, emoji: "📝", skillTag: "Storytelling", week: 1 },
  { id: "wq-film-2", careerId: "film-director", title: "Study a Movie Scene", description: "Watch a scene from your favourite film 3 times. Note camera angles, music, and lighting choices.", timeMinutes: 15, xpReward: 20, emoji: "🎬", skillTag: "Film Analysis", week: 2 },
  { id: "wq-film-3", careerId: "film-director", title: "Shoot 5 Creative Shots", description: "Using your phone, take 5 photos or short clips using different angles (low, high, close-up, wide, POV).", timeMinutes: 15, xpReward: 25, emoji: "📸", skillTag: "Cinematography", week: 3 },
  { id: "wq-film-4", careerId: "film-director", title: "Storyboard a Short Film", description: "Draw 6-8 panels for a short film idea. Include shot types and brief descriptions.", timeMinutes: 25, xpReward: 30, emoji: "🖼️", skillTag: "Visual Planning", week: 4 },

  // Climate Scientist
  { id: "wq-clim-1", careerId: "climate-scientist", title: "Nature Observation Journal", description: "Spend 15 minutes outside. Record the weather, plants, animals, and any environmental changes you notice.", timeMinutes: 15, xpReward: 20, emoji: "🌿", skillTag: "Observation", week: 1 },
  { id: "wq-clim-2", careerId: "climate-scientist", title: "Energy Audit Your Home", description: "Check which appliances use the most energy at home. Calculate potential savings from turning things off.", timeMinutes: 20, xpReward: 25, emoji: "⚡", skillTag: "Energy Science", week: 2 },
  { id: "wq-clim-3", careerId: "climate-scientist", title: "Research a Climate Solution", description: "Pick one climate technology (solar, wind, carbon capture) and write 5 key facts about it.", timeMinutes: 15, xpReward: 20, emoji: "🌍", skillTag: "Research", week: 3 },
  { id: "wq-clim-4", careerId: "climate-scientist", title: "Water Usage Tracker", description: "Track how much water your household uses in one day. Compare to the global average.", timeMinutes: 15, xpReward: 20, emoji: "💧", skillTag: "Data Collection", week: 4 },

  // Game Developer
  { id: "wq-game-1", careerId: "game-developer", title: "Design a Game Character", description: "Draw a game character with stats: name, abilities, strengths, weaknesses. Write their backstory.", timeMinutes: 20, xpReward: 25, emoji: "🎮", skillTag: "Game Design", week: 1 },
  { id: "wq-game-2", careerId: "game-developer", title: "Play-Test and Review", description: "Play a game critically. Write a 200-word review: What works? What would you change?", timeMinutes: 20, xpReward: 20, emoji: "🕹️", skillTag: "Game Analysis", week: 2 },
  { id: "wq-game-3", careerId: "game-developer", title: "Design a Game Level", description: "Sketch a game level on paper. Include obstacles, power-ups, and a goal.", timeMinutes: 20, xpReward: 25, emoji: "🗺️", skillTag: "Level Design", week: 3 },
  { id: "wq-game-4", careerId: "game-developer", title: "Learn a Coding Concept", description: "Learn about variables and loops using Scratch or a free tutorial. Make something move!", timeMinutes: 25, xpReward: 30, emoji: "💻", skillTag: "Programming", week: 4 },

  // Doctor / Surgeon
  { id: "wq-surg-1", careerId: "surgeon", title: "Anatomy Sketch Challenge", description: "Pick a body part (heart, brain, hand). Draw and label it as accurately as you can.", timeMinutes: 20, xpReward: 25, emoji: "🫀", skillTag: "Anatomy", week: 1 },
  { id: "wq-surg-2", careerId: "surgeon", title: "First Aid Quick Learn", description: "Learn 3 basic first aid techniques (CPR steps, treating a burn, stopping bleeding). Quiz a friend!", timeMinutes: 15, xpReward: 20, emoji: "🏥", skillTag: "Medical Knowledge", week: 2 },

  // Generic quests for any career
  { id: "wq-gen-1", careerId: "generic", title: "Research a Role Model", description: "Find someone successful in your dream career. Write 5 things about their journey and what you learned.", timeMinutes: 15, xpReward: 20, emoji: "⭐", skillTag: "Inspiration", week: 1 },
  { id: "wq-gen-2", careerId: "generic", title: "Set 3 Monthly Goals", description: "Write 3 goals for this month related to your career journey. Make them specific and achievable.", timeMinutes: 10, xpReward: 15, emoji: "🎯", skillTag: "Goal Setting", week: 2 },
  { id: "wq-gen-3", careerId: "generic", title: "Teach Someone Something", description: "Explain a topic you've learned recently to a friend or family member. Teaching helps you learn!", timeMinutes: 15, xpReward: 20, emoji: "📖", skillTag: "Communication", week: 3 },
  { id: "wq-gen-4", careerId: "generic", title: "Read for 20 Minutes", description: "Read an article, book chapter, or blog post related to your career interest.", timeMinutes: 20, xpReward: 15, emoji: "📚", skillTag: "Knowledge", week: 4 },
];

export function getQuestsForCareer(careerId: string, weekNumber?: number): WeeklyQuest[] {
  const careerQuests = weeklyQuests.filter((q) => q.careerId === careerId);
  const genericQuests = weeklyQuests.filter((q) => q.careerId === "generic");
  const all = [...careerQuests, ...genericQuests];
  if (weekNumber !== undefined) {
    const weekMod = ((weekNumber - 1) % 4) + 1;
    return all.filter((q) => q.week === weekMod);
  }
  return all;
}

export function getCurrentWeekNumber(): number {
  const start = new Date(2025, 0, 1);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
}
