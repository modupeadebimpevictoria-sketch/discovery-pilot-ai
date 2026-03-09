export interface WeeklyQuest {
  id: string;
  careerId: string;
  title: string;
  description: string;
  timeMinutes: number;
  xpReward: number;
  emoji: string;
  skillTag: string;
  week: number; // 1-52, cycles through weeks 1-8
}

// Hand-crafted quests for specific careers (high-quality, bespoke)
const handcraftedQuests: WeeklyQuest[] = [
  // AI Engineer
  { id: "wq-ai-1", careerId: "ai-engineer", title: "Teach a Chatbot Something New", description: "Use ChatGPT or a free chatbot and try to get it to answer unusual questions. Write down what it gets right and wrong.", timeMinutes: 15, xpReward: 25, emoji: "🤖", skillTag: "AI Thinking", week: 1 },
  { id: "wq-ai-2", careerId: "ai-engineer", title: "Spot AI in Your Daily Life", description: "List 5 things you used today that are powered by AI (suggestions, filters, autocorrect). Explain how each one probably works.", timeMinutes: 10, xpReward: 20, emoji: "🔍", skillTag: "AI Awareness", week: 2 },
  { id: "wq-ai-3", careerId: "ai-engineer", title: "Code a Simple Calculator in Python", description: "Write a Python calculator that adds, subtracts, multiplies and divides. Use replit.com if you don't have Python.", timeMinutes: 25, xpReward: 35, emoji: "🧮", skillTag: "Programming", week: 3 },
  { id: "wq-ai-4", careerId: "ai-engineer", title: "Be a Data Detective", description: "Find a free dataset on Kaggle. Load it and write 3 surprising facts you discovered from the data.", timeMinutes: 20, xpReward: 30, emoji: "📊", skillTag: "Data Analysis", week: 4 },
  { id: "wq-ai-5", careerId: "ai-engineer", title: "Train a No-Code AI Model", description: "Use Google's Teachable Machine to train an image recognition model. Teach it to recognise 3 objects.", timeMinutes: 25, xpReward: 35, emoji: "🧠", skillTag: "Machine Learning", week: 5 },
  { id: "wq-ai-6", careerId: "ai-engineer", title: "Write an AI Ethics Essay", description: "In 200 words, argue whether AI should be allowed to make medical diagnoses. Consider both sides.", timeMinutes: 20, xpReward: 25, emoji: "⚖️", skillTag: "AI Ethics", week: 6 },

  // Architect
  { id: "wq-arch-1", careerId: "architect", title: "Analyse a Building's Design", description: "Visit a building you admire. Sketch its shape, note the materials used, and write why you think it was designed that way.", timeMinutes: 25, xpReward: 30, emoji: "🏗️", skillTag: "Design Thinking", week: 1 },
  { id: "wq-arch-2", careerId: "architect", title: "Design a Tiny House (Under 20m²)", description: "Using pen and paper, design a tiny house under 20 square metres that has a bedroom, kitchen, and bathroom.", timeMinutes: 20, xpReward: 25, emoji: "🏠", skillTag: "Space Design", week: 2 },
  { id: "wq-arch-3", careerId: "architect", title: "Build the Strongest Paper Bridge", description: "Using only paper and tape, build a bridge across two books. Test it with coins — how much weight can it hold?", timeMinutes: 30, xpReward: 35, emoji: "🌉", skillTag: "Structural Engineering", week: 3 },
  { id: "wq-arch-4", careerId: "architect", title: "Photo Walk: Patterns in Buildings", description: "Walk around your neighbourhood and photograph 5 interesting patterns, textures, or shapes in buildings. Write why each one works.", timeMinutes: 20, xpReward: 25, emoji: "📸", skillTag: "Architectural Observation", week: 4 },
  { id: "wq-arch-5", careerId: "architect", title: "Redesign Your Classroom", description: "Draw a new floor plan for your classroom or study area. Focus on natural light, seating flow, and comfort.", timeMinutes: 25, xpReward: 30, emoji: "📐", skillTag: "Interior Layout", week: 5 },

  // Entrepreneur
  { id: "wq-ent-1", careerId: "entrepreneur", title: "Spot 3 Problems Worth Solving", description: "Walk around your school or neighbourhood and find 3 real problems people have. Write a business idea for each one.", timeMinutes: 15, xpReward: 25, emoji: "💡", skillTag: "Ideation", week: 1 },
  { id: "wq-ent-2", careerId: "entrepreneur", title: "Interview a Local Business Owner", description: "Talk to a local shop owner. Ask: How did you start? What's the hardest part? What would you do differently?", timeMinutes: 20, xpReward: 30, emoji: "🎤", skillTag: "Networking", week: 2 },
  { id: "wq-ent-3", careerId: "entrepreneur", title: "Design a Product Launch Post", description: "Create a promotional social media post for a product you'd like to create. Use Canva and write compelling copy.", timeMinutes: 15, xpReward: 20, emoji: "📱", skillTag: "Marketing", week: 3 },
  { id: "wq-ent-4", careerId: "entrepreneur", title: "₦50,000 Startup Budget", description: "If you had ₦50,000 to start a business, plan exactly how you'd spend it. List every single cost.", timeMinutes: 15, xpReward: 25, emoji: "💰", skillTag: "Financial Planning", week: 4 },

  // Film Director
  { id: "wq-film-1", careerId: "film-director", title: "Write a 30-Second Scene Script", description: "Write a short script (1 page) for a 30-second scene. Include dialogue, camera directions, and mood notes.", timeMinutes: 20, xpReward: 25, emoji: "📝", skillTag: "Screenwriting", week: 1 },
  { id: "wq-film-2", careerId: "film-director", title: "Analyse a Movie Scene Frame by Frame", description: "Watch a scene from your favourite film 3 times. Note every camera angle, music cue, and lighting choice.", timeMinutes: 15, xpReward: 20, emoji: "🎬", skillTag: "Film Analysis", week: 2 },
  { id: "wq-film-3", careerId: "film-director", title: "Shoot 5 Creative Camera Angles", description: "Using your phone, take 5 short clips using different angles: low angle, high angle, close-up, wide shot, POV.", timeMinutes: 15, xpReward: 25, emoji: "📸", skillTag: "Cinematography", week: 3 },
  { id: "wq-film-4", careerId: "film-director", title: "Storyboard a Short Film", description: "Draw 6-8 panels for a short film idea. Include shot types, transitions, and brief descriptions for each frame.", timeMinutes: 25, xpReward: 30, emoji: "🖼️", skillTag: "Visual Planning", week: 4 },

  // Climate Scientist
  { id: "wq-clim-1", careerId: "climate-scientist", title: "Nature Observation Journal Entry", description: "Spend 15 minutes outside. Record temperature, cloud type, wind direction, and any environmental changes you notice.", timeMinutes: 15, xpReward: 20, emoji: "🌿", skillTag: "Field Observation", week: 1 },
  { id: "wq-clim-2", careerId: "climate-scientist", title: "Home Energy Audit", description: "Check which appliances use the most energy at home. Calculate potential savings from turning things off at night.", timeMinutes: 20, xpReward: 25, emoji: "⚡", skillTag: "Energy Science", week: 2 },
  { id: "wq-clim-3", careerId: "climate-scientist", title: "Research a Climate Technology", description: "Pick one climate technology (direct air capture, green hydrogen, or agrivoltaics). Write 5 key facts about how it works.", timeMinutes: 15, xpReward: 20, emoji: "🌍", skillTag: "Climate Tech", week: 3 },
  { id: "wq-clim-4", careerId: "climate-scientist", title: "Track Your Water Footprint", description: "Track how much water your household uses in one day. Compare to the Nigerian and global average.", timeMinutes: 15, xpReward: 20, emoji: "💧", skillTag: "Resource Tracking", week: 4 },

  // Game Developer
  { id: "wq-game-1", careerId: "game-developer", title: "Design a Game Character with Stats", description: "Create a game character: name, 4 abilities with numeric stats, 2 weaknesses, and a backstory. Draw them!", timeMinutes: 20, xpReward: 25, emoji: "🎮", skillTag: "Character Design", week: 1 },
  { id: "wq-game-2", careerId: "game-developer", title: "Write a 200-Word Game Review", description: "Play a game critically. Write a 200-word review covering mechanics, fun factor, difficulty curve, and one thing you'd change.", timeMinutes: 20, xpReward: 20, emoji: "🕹️", skillTag: "Game Analysis", week: 2 },
  { id: "wq-game-3", careerId: "game-developer", title: "Design a Game Level on Paper", description: "Sketch a complete game level. Include spawn points, obstacles, enemies, power-ups, checkpoints, and the exit.", timeMinutes: 20, xpReward: 25, emoji: "🗺️", skillTag: "Level Design", week: 3 },
  { id: "wq-game-4", careerId: "game-developer", title: "Make Something Move in Scratch", description: "Open Scratch (scratch.mit.edu). Use variables and loops to make a character move, jump, or chase the mouse.", timeMinutes: 25, xpReward: 30, emoji: "💻", skillTag: "Game Programming", week: 4 },

  // Surgeon
  { id: "wq-surg-1", careerId: "surgeon", title: "Draw & Label the Human Heart", description: "Draw the heart from memory with all 4 chambers, valves, and major blood vessels. Then check your accuracy.", timeMinutes: 20, xpReward: 25, emoji: "🫀", skillTag: "Cardiac Anatomy", week: 1 },
  { id: "wq-surg-2", careerId: "surgeon", title: "Learn 3 First Aid Techniques", description: "Learn CPR steps, how to treat a burn, and how to stop heavy bleeding. Quiz a friend on all three.", timeMinutes: 15, xpReward: 20, emoji: "🏥", skillTag: "Emergency Medicine", week: 2 },
  { id: "wq-surg-3", careerId: "surgeon", title: "Practice Surgical Dexterity", description: "Thread a needle 10 times as fast as you can. Then try tying knots with chopsticks. Record your times.", timeMinutes: 15, xpReward: 25, emoji: "🪡", skillTag: "Fine Motor Skills", week: 3 },
  { id: "wq-surg-4", careerId: "surgeon", title: "Research a Surgical Innovation", description: "Research robotic surgery or a recent surgical breakthrough. Write how it changed patient outcomes.", timeMinutes: 20, xpReward: 25, emoji: "🔬", skillTag: "Medical Innovation", week: 4 },
];

// Career-specific quest generators — each template produces quests unique to the career's actual work
import { careerListings, careerFamilies } from "@/data/careerFamilies";

interface QuestTemplate {
  titleFn: (career: string) => string;
  descFn: (career: string) => string;
  time: number;
  xp: number;
  emoji: string;
  skillFn: (career: string) => string;
  week: number;
}

const familyQuestTemplates: Record<string, QuestTemplate[]> = {
  "creative-design": [
    { titleFn: (c) => `Sketch a ${c} Project`, descFn: (c) => `Spend 15 minutes sketching a real ${c} project — a logo, product, layout, or design concept. Focus on clean lines and proportions.`, time: 15, xp: 20, emoji: "✏️", skillFn: () => "Visual Design", week: 1 },
    { titleFn: (c) => `Study a Famous ${c}'s Portfolio`, descFn: (c) => `Find a professional ${c} online. Study 3 of their best works and write what makes each one effective.`, time: 20, xp: 25, emoji: "🔍", skillFn: () => "Design Analysis", week: 2 },
    { titleFn: (c) => `Redesign Something as a ${c}`, descFn: (c) => `Find a badly-designed item relevant to ${c} work (a poster, product, UI, etc). Redesign it with a ${c}'s eye.`, time: 25, xp: 30, emoji: "🎨", skillFn: () => "Design Critique", week: 3 },
    { titleFn: (c) => `Create a ${c} Mood Board`, descFn: (c) => `Build a mood board on Canva or Pinterest with 10+ images that inspire your style as a ${c}. Write your design philosophy.`, time: 20, xp: 25, emoji: "🎯", skillFn: () => "Creative Direction", week: 4 },
    { titleFn: (c) => `${c} Client Brief Challenge`, descFn: (c) => `Write a fake client brief asking a ${c} to design something specific. Then complete the brief yourself in 20 minutes.`, time: 25, xp: 30, emoji: "📋", skillFn: () => "Client Work", week: 5 },
    { titleFn: (c) => `${c} Tool Exploration`, descFn: (c) => `Learn one new tool or technique a ${c} uses daily (Figma, Procreate, Illustrator, or Canva). Create something with it.`, time: 25, xp: 30, emoji: "🛠️", skillFn: () => "Tool Mastery", week: 6 },
  ],
  "media-content": [
    { titleFn: (c) => `Write a ${c}-Style Article`, descFn: (c) => `Write a 250-word article in the style a ${c} would produce. Use a compelling headline, hook, and clear structure.`, time: 20, xp: 25, emoji: "📰", skillFn: () => "Content Writing", week: 1 },
    { titleFn: (c) => `Create a 30-Second ${c} Video`, descFn: (c) => `Using only your phone, create a 30-second video like a ${c} would — consider framing, pacing, and storytelling.`, time: 20, xp: 25, emoji: "🎬", skillFn: () => "Video Production", week: 2 },
    { titleFn: (c) => `Interview Someone for a ${c} Story`, descFn: (c) => `Interview a family member or friend about an interesting topic. Write it up as a ${c} would — with quotes and context.`, time: 20, xp: 25, emoji: "🎤", skillFn: () => "Interviewing", week: 3 },
    { titleFn: (c) => `Plan a ${c} Content Calendar`, descFn: (c) => `Plan 7 days of content like a ${c} would publish. Write topics, formats, and target audiences for each day.`, time: 20, xp: 25, emoji: "📱", skillFn: () => "Content Strategy", week: 4 },
    { titleFn: (c) => `Fact-Check a News Story`, descFn: (c) => `As a ${c}, fact-checking is crucial. Find a viral claim on social media and verify it using 3 reliable sources.`, time: 15, xp: 20, emoji: "✅", skillFn: () => "Fact-Checking", week: 5 },
    { titleFn: (c) => `Edit & Tighten Your Writing`, descFn: (c) => `Take an old piece of writing and edit it down by 30% without losing meaning — a core ${c} skill.`, time: 15, xp: 20, emoji: "✂️", skillFn: () => "Editing", week: 6 },
  ],
  "entertainment-performance": [
    { titleFn: (c) => `60-Second ${c} Performance`, descFn: (c) => `Perform a 60-second piece as a ${c} would — a monologue, song, comedy bit, or dance. Record it and review.`, time: 15, xp: 25, emoji: "🎭", skillFn: () => "Performing", week: 1 },
    { titleFn: (c) => `Study a Master ${c}`, descFn: (c) => `Watch a top ${c} perform. Note 3 specific techniques they use that make them great. How can you learn from them?`, time: 15, xp: 20, emoji: "👀", skillFn: () => "Performance Study", week: 2 },
    { titleFn: (c) => `Write a ${c} Showcase Piece`, descFn: (c) => `Write a 2-minute piece that showcases what a ${c} does best. Rehearse it until you can perform it confidently.`, time: 25, xp: 30, emoji: "📝", skillFn: () => "Creative Writing", week: 3 },
    { titleFn: (c) => `Stage Presence as a ${c}`, descFn: (c) => `Practice performing in front of a mirror for 10 minutes. Focus on body language, energy, and connecting with your audience.`, time: 10, xp: 20, emoji: "🪞", skillFn: () => "Stage Presence", week: 4 },
    { titleFn: (c) => `Warm-Up Routine for a ${c}`, descFn: (c) => `Research and practice the warm-up routine that professional ${c}s use before performing.`, time: 15, xp: 20, emoji: "🔥", skillFn: () => "Preparation", week: 5 },
  ],
  "technology": [
    { titleFn: (c) => `Build a ${c} Mini-Project`, descFn: (c) => `Build a small project that a ${c} would create — a website, script, tool, or prototype. Use CodePen or Replit.`, time: 30, xp: 35, emoji: "💻", skillFn: () => "Building", week: 1 },
    { titleFn: (c) => `Debug Code Like a ${c}`, descFn: (c) => `Find a broken code snippet online. Fix it using systematic debugging — the way a professional ${c} would approach it.`, time: 20, xp: 25, emoji: "🐛", skillFn: () => "Debugging", week: 2 },
    { titleFn: (c) => `${c} Industry News Briefing`, descFn: (c) => `Read 3 articles about the latest developments in the ${c} field. Write a 1-sentence summary and your opinion on each.`, time: 15, xp: 20, emoji: "📰", skillFn: () => "Industry Awareness", week: 3 },
    { titleFn: (c) => `Automate a Task Like a ${c}`, descFn: (c) => `Use Python, Shortcuts, or IFTTT to automate a boring task. A good ${c} always looks for ways to save time.`, time: 25, xp: 30, emoji: "⚙️", skillFn: () => "Automation", week: 4 },
    { titleFn: (c) => `Explain ${c} Work to a 10-Year-Old`, descFn: (c) => `Write an explanation of what a ${c} does that a 10-year-old would understand. Use analogies and no jargon.`, time: 15, xp: 20, emoji: "🗣️", skillFn: () => "Technical Communication", week: 5 },
    { titleFn: (c) => `${c} Tool Deep Dive`, descFn: (c) => `Pick one tool that ${c}s use daily (Git, VS Code, terminal, etc). Learn 5 features you didn't know about.`, time: 20, xp: 25, emoji: "🛠️", skillFn: () => "Tooling", week: 6 },
  ],
  "product-tech": [
    { titleFn: (c) => `${c} App Teardown`, descFn: (c) => `Pick an app and analyse it through a ${c}'s lens. Write what works, what frustrates users, and 3 improvements you'd make.`, time: 20, xp: 25, emoji: "📱", skillFn: () => "Product Analysis", week: 1 },
    { titleFn: (c) => `User Research as a ${c}`, descFn: (c) => `Ask 3 people about a problem they face with a digital product. Write up their pain points as a ${c} would.`, time: 20, xp: 25, emoji: "🎤", skillFn: () => "User Research", week: 2 },
    { titleFn: (c) => `Wireframe 3 Screens`, descFn: (c) => `Sketch 3 app screens for a product idea, thinking like a ${c}. Focus on user flow, hierarchy, and ease of use.`, time: 20, xp: 25, emoji: "✏️", skillFn: () => "Wireframing", week: 3 },
    { titleFn: (c) => `Write a ${c} Feature Spec`, descFn: (c) => `Pick a feature for an imaginary app. Write a spec the way a ${c} would: who it's for, what it does, success metrics.`, time: 15, xp: 20, emoji: "📋", skillFn: () => "Product Writing", week: 4 },
    { titleFn: (c) => `Competitive Analysis: ${c} Edition`, descFn: (c) => `Compare 3 competing products in a market. Analyse strengths and gaps like a ${c} preparing a strategy doc.`, time: 20, xp: 25, emoji: "📊", skillFn: () => "Market Analysis", week: 5 },
  ],
  "healthcare-medicine": [
    { titleFn: (c) => `${c} Case Study`, descFn: (c) => `Research a medical case or breakthrough related to ${c} work. Write a 200-word summary of what happened and why it matters.`, time: 20, xp: 25, emoji: "🏥", skillFn: () => "Medical Knowledge", week: 1 },
    { titleFn: (c) => `Draw & Label an Organ`, descFn: (c) => `Pick an organ relevant to ${c} work. Draw it from memory with all major parts labelled. Check your accuracy.`, time: 20, xp: 25, emoji: "🫀", skillFn: () => "Anatomy", week: 2 },
    { titleFn: (c) => `${c} First Aid Drill`, descFn: (c) => `Learn 3 first aid techniques relevant to ${c} practice. Teach them to a friend and quiz each other.`, time: 20, xp: 25, emoji: "🩹", skillFn: () => "Emergency Skills", week: 3 },
    { titleFn: (c) => `A Day in the Life of a ${c}`, descFn: (c) => `Research what a typical day looks like for a ${c}. Write a detailed hour-by-hour schedule from morning to evening.`, time: 15, xp: 20, emoji: "📋", skillFn: () => "Career Understanding", week: 4 },
    { titleFn: (c) => `Medical Ethics Debate: ${c}`, descFn: (c) => `Find an ethical dilemma that ${c}s face. Write 3 arguments for each side. What would you decide?`, time: 20, xp: 25, emoji: "⚖️", skillFn: () => "Medical Ethics", week: 5 },
    { titleFn: (c) => `${c} Patient Communication`, descFn: (c) => `Write how a ${c} would explain a complex medical concept to a worried patient. Be clear, kind, and accurate.`, time: 15, xp: 20, emoji: "💬", skillFn: () => "Patient Communication", week: 6 },
  ],
  "mental-health": [
    { titleFn: (c) => `${c} Empathy Exercise`, descFn: (c) => `Have a conversation where you only listen and ask open-ended questions — a core skill for a ${c}. Note what you learned.`, time: 15, xp: 20, emoji: "👂", skillFn: () => "Active Listening", week: 1 },
    { titleFn: (c) => `Mood Tracking Experiment`, descFn: (c) => `Track your mood 3 times today as a ${c} would track a client's. Note triggers, patterns, and coping strategies.`, time: 10, xp: 20, emoji: "🧠", skillFn: () => "Emotional Awareness", week: 2 },
    { titleFn: (c) => `Research a ${c} Technique`, descFn: (c) => `Research one therapy or counselling technique ${c}s use (CBT, mindfulness, motivational interviewing). Explain it simply.`, time: 15, xp: 25, emoji: "📚", skillFn: () => "Therapeutic Knowledge", week: 3 },
    { titleFn: (c) => `Write a ${c} Support Script`, descFn: (c) => `Write what a ${c} would say to help someone going through anxiety or a tough time. Be specific, warm, and professional.`, time: 15, xp: 25, emoji: "💬", skillFn: () => "Counselling Skills", week: 4 },
    { titleFn: (c) => `Self-Care Plan as a ${c}`, descFn: (c) => `${c}s need self-care too. Create a weekly self-care plan to prevent burnout, including boundaries and recovery activities.`, time: 15, xp: 20, emoji: "🧘", skillFn: () => "Self-Care", week: 5 },
  ],
  "science-research": [
    { titleFn: (c) => `Run a ${c} Experiment`, descFn: (c) => `Design and run a simple experiment related to ${c} work using household items. Record your hypothesis, method, and results.`, time: 25, xp: 30, emoji: "🔬", skillFn: () => "Experimentation", week: 1 },
    { titleFn: (c) => `Explain ${c} Research Simply`, descFn: (c) => `Read a ${c}-related science article and explain it in simple words to someone who isn't into science. Make it exciting!`, time: 15, xp: 20, emoji: "📰", skillFn: () => "Science Communication", week: 2 },
    { titleFn: (c) => `${c} Observation Journal`, descFn: (c) => `Spend 20 minutes observing something a ${c} would study. Write detailed, precise notes like a professional researcher.`, time: 20, xp: 25, emoji: "🌿", skillFn: () => "Scientific Observation", week: 3 },
    { titleFn: (c) => `3 Unanswered ${c} Questions`, descFn: (c) => `Write 3 questions about the world that ${c}s haven't fully answered yet. Research one and write what we know so far.`, time: 15, xp: 20, emoji: "❓", skillFn: () => "Scientific Inquiry", week: 4 },
    { titleFn: (c) => `${c} Lab Report`, descFn: (c) => `Write a proper lab report (hypothesis, materials, method, results, conclusion) for any experiment — even a kitchen one.`, time: 20, xp: 25, emoji: "📝", skillFn: () => "Scientific Writing", week: 5 },
  ],
  "environment-sustainability": [
    { titleFn: (c) => `${c} Waste Audit`, descFn: (c) => `As a ${c} would, sort your family's waste for one day. Calculate what % could be recycled, composted, or reused.`, time: 20, xp: 25, emoji: "♻️", skillFn: () => "Waste Analysis", week: 1 },
    { titleFn: (c) => `Carbon Footprint Calculator`, descFn: (c) => `Use a free carbon calculator to measure your footprint. As a ${c}, propose 3 realistic ways to reduce it.`, time: 15, xp: 20, emoji: "🌍", skillFn: () => "Climate Analysis", week: 2 },
    { titleFn: (c) => `${c} Field Project: Grow Something`, descFn: (c) => `Plant a seed, herb, or vegetable as a ${c} field study. Document soil type, sunlight, watering, and growth over the week.`, time: 20, xp: 25, emoji: "🌱", skillFn: () => "Ecology", week: 3 },
    { titleFn: (c) => `${c} Solution Pitch`, descFn: (c) => `Write a 1-minute pitch for an environmental solution a ${c} could implement to address a local problem you've observed.`, time: 15, xp: 25, emoji: "💡", skillFn: () => "Green Innovation", week: 4 },
    { titleFn: (c) => `Map Your Local Ecosystem`, descFn: (c) => `As a ${c}, map the ecosystem around your home: plants, animals, water sources, pollution sources. Draw and annotate it.`, time: 25, xp: 30, emoji: "🗺️", skillFn: () => "Ecosystem Mapping", week: 5 },
  ],
  "engineering-architecture": [
    { titleFn: (c) => `${c} Build Challenge`, descFn: (c) => `Using only household items, build the tallest free-standing structure you can. Think like a ${c} — consider stability and load.`, time: 25, xp: 30, emoji: "🏗️", skillFn: () => "Structural Design", week: 1 },
    { titleFn: (c) => `${c} Technical Drawing`, descFn: (c) => `Measure a room in your house and draw a to-scale floor plan. A ${c} needs precision — include dimensions in cm.`, time: 20, xp: 25, emoji: "📐", skillFn: () => "Technical Drawing", week: 2 },
    { titleFn: (c) => `${c} Problem Solver`, descFn: (c) => `Identify a physical problem in your school or home (a door that sticks, a leak). Sketch an engineering solution as a ${c} would.`, time: 20, xp: 25, emoji: "🔧", skillFn: () => "Problem Solving", week: 3 },
    { titleFn: (c) => `Famous ${c} Project Study`, descFn: (c) => `Research a famous project by a ${c} (bridge, building, system). Write 5 engineering challenges they faced and how they solved them.`, time: 15, xp: 20, emoji: "🌐", skillFn: () => "Engineering History", week: 4 },
    { titleFn: (c) => `${c} Materials Test`, descFn: (c) => `Test the strength of 3 common materials (paper, plastic, wood). Record which bends, breaks, or holds weight best — as a ${c} would.`, time: 20, xp: 25, emoji: "🧪", skillFn: () => "Materials Science", week: 5 },
  ],
  "trades-technical": [
    { titleFn: (c) => `Fix Something Like a ${c}`, descFn: (c) => `Find something broken or loose at home. Fix it the way a ${c} would — with the right approach, tools, and documentation.`, time: 25, xp: 30, emoji: "🔧", skillFn: () => "Hands-On Repair", week: 1 },
    { titleFn: (c) => `${c} Tool Identification`, descFn: (c) => `Learn the names and proper uses of 10 tools a ${c} uses. Draw each one and write when to use it.`, time: 15, xp: 20, emoji: "🛠️", skillFn: () => "Tool Knowledge", week: 2 },
    { titleFn: (c) => `Take Apart & Understand`, descFn: (c) => `Take apart a broken device (with permission) and try to understand how it works — like a curious ${c} would.`, time: 25, xp: 30, emoji: "⚙️", skillFn: () => "Mechanical Understanding", week: 3 },
    { titleFn: (c) => `${c} Safety Checklist`, descFn: (c) => `Research the safety procedures and PPE that a ${c} must follow. Write a complete safety checklist for a typical workday.`, time: 15, xp: 20, emoji: "🦺", skillFn: () => "Workplace Safety", week: 4 },
    { titleFn: (c) => `${c} Apprenticeship Research`, descFn: (c) => `Research how to become a qualified ${c} in Nigeria. Find training programs, apprenticeships, and certification requirements.`, time: 20, xp: 25, emoji: "📋", skillFn: () => "Career Planning", week: 5 },
  ],
  "business-entrepreneurship": [
    { titleFn: (c) => `${c} Business Idea Sprint`, descFn: (c) => `In 10 minutes, come up with 5 business ideas a ${c} could start. Pick the best one and write a 100-word pitch.`, time: 15, xp: 20, emoji: "💡", skillFn: () => "Business Ideation", week: 1 },
    { titleFn: (c) => `${c} Competitor Analysis`, descFn: (c) => `Find 3 successful ${c}s or businesses in that field. Compare what they do differently. What can you learn from each?`, time: 20, xp: 25, emoji: "📊", skillFn: () => "Market Research", week: 2 },
    { titleFn: (c) => `60-Second ${c} Elevator Pitch`, descFn: (c) => `Write and practice a 60-second pitch about your dream ${c} business or project idea. Record yourself on your phone and watch it back.`, time: 15, xp: 25, emoji: "🎤", skillFn: () => "Pitching", week: 3 },
    { titleFn: (c) => `${c} Revenue Model`, descFn: (c) => `How do ${c}s earn money? Research different ways people in this career make income — from salary to freelancing to starting their own business.`, time: 15, xp: 20, emoji: "💰", skillFn: () => "Business Models", week: 4 },
    { titleFn: (c) => `${c} SWOT Analysis`, descFn: (c) => `Do a SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) on yourself as an aspiring ${c}.`, time: 15, xp: 25, emoji: "📋", skillFn: () => "Strategic Thinking", week: 5 },
  ],
  "finance-investment": [
    { titleFn: (c) => `${c} Stock Market Simulation`, descFn: (c) => `Pick 3 companies a ${c} might analyse. Track their stock prices for a week and write investment notes on each.`, time: 15, xp: 25, emoji: "📈", skillFn: () => "Investment Analysis", week: 1 },
    { titleFn: (c) => `Budget Like a ${c}`, descFn: (c) => `Track every naira you spend this week. Categorise spending and create a ${c}-quality budget report with insights.`, time: 15, xp: 20, emoji: "💳", skillFn: () => "Budgeting", week: 2 },
    { titleFn: (c) => `${c} Financial News Digest`, descFn: (c) => `Read 3 finance articles that a ${c} should know about. Summarise each and explain the market impact.`, time: 15, xp: 20, emoji: "📰", skillFn: () => "Financial Literacy", week: 3 },
    { titleFn: (c) => `Compound Interest Calculator`, descFn: (c) => `As a ${c}, calculate how much you'd have saving ₦500/week for 10 years at 5%, 10%, and 15% interest. Show your work.`, time: 15, xp: 25, emoji: "🏦", skillFn: () => "Compound Interest", week: 4 },
    { titleFn: (c) => `${c} Risk Assessment`, descFn: (c) => `Research 3 types of investments (stocks, bonds, crypto). Rank them from safest to riskiest and explain why — like a ${c} in training.`, time: 20, xp: 25, emoji: "⚠️", skillFn: () => "Risk Management", week: 5 },
  ],
  "marketing-communications": [
    { titleFn: (c) => `${c} Ad Breakdown`, descFn: (c) => `Find 3 ads on social media and analyse them through a ${c}'s lens: target audience, message, call to action, and effectiveness.`, time: 15, xp: 20, emoji: "📣", skillFn: () => "Ad Analysis", week: 1 },
    { titleFn: (c) => `Create a Brand as a ${c}`, descFn: (c) => `Invent a brand name, tagline, colour palette, and voice — the way a ${c} would build a brand from scratch. Design a simple logo.`, time: 20, xp: 25, emoji: "✨", skillFn: () => "Brand Building", week: 2 },
    { titleFn: (c) => `${c} Social Media Audit`, descFn: (c) => `Analyse a brand's social media the way a ${c} would. What's their posting frequency, engagement rate, and visual style?`, time: 15, xp: 20, emoji: "📱", skillFn: () => "Social Strategy", week: 3 },
    { titleFn: (c) => `Write 3 Headlines as a ${c}`, descFn: (c) => `Write 3 different ad headlines for the same product. Test them on friends — a ${c} always A/B tests!`, time: 15, xp: 20, emoji: "📝", skillFn: () => "Copywriting", week: 4 },
    { titleFn: (c) => `${c} Campaign Strategy`, descFn: (c) => `Plan a complete marketing campaign as a ${c}: objective, target audience, channels, content plan, and success metrics.`, time: 25, xp: 30, emoji: "🎯", skillFn: () => "Campaign Planning", week: 5 },
  ],
  "law-justice": [
    { titleFn: (c) => `${c} Debate Challenge`, descFn: (c) => `Pick a controversial topic and argue both sides like a ${c} would in court. Write 3 strong arguments for each side.`, time: 20, xp: 25, emoji: "⚖️", skillFn: () => "Legal Argumentation", week: 1 },
    { titleFn: (c) => `Mock ${c} Trial`, descFn: (c) => `Write a short mock trial script. Include a judge, a ${c} arguing the case, a witness, and a verdict.`, time: 25, xp: 30, emoji: "🏛️", skillFn: () => "Court Procedure", week: 2 },
    { titleFn: (c) => `Know Your Rights: ${c} Edition`, descFn: (c) => `Research 5 fundamental rights in Nigerian law that a ${c} should know inside out. Explain each in simple terms.`, time: 15, xp: 20, emoji: "📜", skillFn: () => "Constitutional Law", week: 3 },
    { titleFn: (c) => `${c} Case Study`, descFn: (c) => `Read about a famous legal case relevant to ${c} work. Write what happened, the legal reasoning, and whether you agree with the verdict.`, time: 20, xp: 25, emoji: "📋", skillFn: () => "Case Analysis", week: 4 },
    { titleFn: (c) => `${c} Contract Review`, descFn: (c) => `Find a sample contract online. Read it like a ${c} would — identify 3 clauses that could be problematic and explain why.`, time: 20, xp: 25, emoji: "📄", skillFn: () => "Contract Law", week: 5 },
  ],
  "education-academia": [
    { titleFn: (c) => `Teach a Topic Like a ${c}`, descFn: (c) => `Pick a topic you know well. Teach it to someone in 5 minutes using techniques a ${c} would use — engagement, questions, examples.`, time: 15, xp: 25, emoji: "🎓", skillFn: () => "Teaching", week: 1 },
    { titleFn: (c) => `Design a ${c}-Quality Quiz`, descFn: (c) => `Write a 10-question quiz with varying difficulty levels. Include multiple choice, short answer, and one critical thinking question.`, time: 15, xp: 20, emoji: "📝", skillFn: () => "Assessment Design", week: 2 },
    { titleFn: (c) => `${c} Learning Style Analysis`, descFn: (c) => `Research visual, auditory, and kinesthetic learning styles. As a ${c}, design one activity for each style on the same topic.`, time: 15, xp: 20, emoji: "🧠", skillFn: () => "Pedagogy", week: 3 },
    { titleFn: (c) => `Write a ${c} Lesson Plan`, descFn: (c) => `Plan a 15-minute lesson with learning objectives, activities, differentiation, and assessment — the way a trained ${c} would.`, time: 20, xp: 25, emoji: "📋", skillFn: () => "Lesson Planning", week: 4 },
    { titleFn: (c) => `${c} Feedback Practice`, descFn: (c) => `Review a friend's work (essay, drawing, project). Give feedback the way a great ${c} would — specific, kind, and actionable.`, time: 15, xp: 20, emoji: "💬", skillFn: () => "Constructive Feedback", week: 5 },
  ],
  "social-impact": [
    { titleFn: (c) => `${c} Community Problem Map`, descFn: (c) => `As a ${c}, identify 5 problems in your community. Rank them by urgency and impact. Propose realistic solutions for the top 2.`, time: 20, xp: 25, emoji: "🗺️", skillFn: () => "Community Analysis", week: 1 },
    { titleFn: (c) => `Find ${c} Volunteer Opportunities`, descFn: (c) => `Find 3 volunteer or internship opportunities related to ${c} work near you or online. Apply to one.`, time: 15, xp: 25, emoji: "🤝", skillFn: () => "Service & Action", week: 2 },
    { titleFn: (c) => `${c} Impact Story`, descFn: (c) => `Research a ${c} who made a real difference in their community. Write their story and what you can learn from their approach.`, time: 15, xp: 20, emoji: "📖", skillFn: () => "Impact Storytelling", week: 3 },
    { titleFn: (c) => `${c} Campaign Draft`, descFn: (c) => `Draft a social media campaign about an issue a ${c} would champion. Include 3 posts, hashtags, and a call to action.`, time: 20, xp: 25, emoji: "✊", skillFn: () => "Advocacy", week: 4 },
  ],
  "government-public-service": [
    { titleFn: (c) => `${c} Government Structure Research`, descFn: (c) => `Research how the part of government a ${c} works in is structured. Who makes decisions? How are they held accountable?`, time: 15, xp: 20, emoji: "🏛️", skillFn: () => "Civic Knowledge", week: 1 },
    { titleFn: (c) => `Write a ${c} Policy Proposal`, descFn: (c) => `Write a 1-page policy proposal as a ${c} to improve something in your school or community. Include problem, solution, and budget.`, time: 20, xp: 25, emoji: "📋", skillFn: () => "Policy Writing", week: 2 },
    { titleFn: (c) => `${c} Budget Simulation`, descFn: (c) => `If you had ₦10 million to allocate as a ${c}, how would you spend it to maximise community benefit? Break it down.`, time: 15, xp: 20, emoji: "💰", skillFn: () => "Public Budgeting", week: 3 },
    { titleFn: (c) => `${c} Public Speech`, descFn: (c) => `Write and deliver a 2-minute speech about an issue relevant to ${c} work. Record it and listen back.`, time: 15, xp: 25, emoji: "🎤", skillFn: () => "Public Speaking", week: 4 },
  ],
  "international-development": [
    { titleFn: (c) => `${c} Global Issue Deep Dive`, descFn: (c) => `Pick a global issue a ${c} works on (poverty, education access, health equity). Research how one country is tackling it.`, time: 20, xp: 25, emoji: "🌐", skillFn: () => "Global Awareness", week: 1 },
    { titleFn: (c) => `UN SDGs Through a ${c}'s Eyes`, descFn: (c) => `Learn about 3 UN Sustainable Development Goals most relevant to ${c} work. Which one would you focus your career on?`, time: 15, xp: 20, emoji: "🎯", skillFn: () => "SDG Knowledge", week: 2 },
    { titleFn: (c) => `${c} Cross-Cultural Research`, descFn: (c) => `Research how ${c} work differs in 3 different countries. What cultural factors shape the approach?`, time: 15, xp: 20, emoji: "🌍", skillFn: () => "Cultural Competence", week: 3 },
    { titleFn: (c) => `${c} Project Proposal`, descFn: (c) => `Design a small development project a ${c} could implement. Write a 1-page proposal with objectives, activities, and expected impact.`, time: 20, xp: 25, emoji: "📝", skillFn: () => "Project Design", week: 4 },
  ],
  "travel-hospitality": [
    { titleFn: (c) => `${c} Travel Itinerary`, descFn: (c) => `Plan a 3-day experience as a ${c} would — including logistics, budget, customer touchpoints, and memorable details.`, time: 20, xp: 25, emoji: "✈️", skillFn: () => "Experience Design", week: 1 },
    { titleFn: (c) => `${c} Service Review`, descFn: (c) => `Write a detailed, professional review of a hospitality experience the way a ${c} would — evaluating service, ambiance, and value.`, time: 15, xp: 20, emoji: "🏨", skillFn: () => "Service Evaluation", week: 2 },
    { titleFn: (c) => `${c} Customer Recovery Script`, descFn: (c) => `Write how a ${c} would handle an angry customer complaint. Script both sides of the conversation with a resolution.`, time: 15, xp: 20, emoji: "🤝", skillFn: () => "Conflict Resolution", week: 3 },
    { titleFn: (c) => `${c} Local Guide`, descFn: (c) => `Write a mini travel guide to your city as a ${c} would — 5 must-see spots, local tips, and insider recommendations.`, time: 20, xp: 25, emoji: "📖", skillFn: () => "Destination Knowledge", week: 4 },
  ],
  "food-culinary": [
    { titleFn: (c) => `Cook a New Dish as a ${c}`, descFn: (c) => `Try a recipe from a cuisine you've never cooked before. As a ${c}, focus on technique, timing, and presentation. Take photos!`, time: 30, xp: 30, emoji: "👨‍🍳", skillFn: () => "Culinary Technique", week: 1 },
    { titleFn: (c) => `${c} Cost Calculator`, descFn: (c) => `Calculate the exact cost of making your favourite meal from scratch. As a ${c}, figure out the price to charge for 50% profit.`, time: 15, xp: 20, emoji: "💰", skillFn: () => "Food Costing", week: 2 },
    { titleFn: (c) => `${c} Plating Challenge`, descFn: (c) => `Make any meal and plate it like a ${c} would in a restaurant — consider colours, height, garnish, and negative space. Photograph it.`, time: 20, xp: 25, emoji: "🍽️", skillFn: () => "Plating & Presentation", week: 3 },
    { titleFn: (c) => `${c} Recipe Creation`, descFn: (c) => `Create a brand new recipe using only 5 ingredients you already have. Write it up professionally with method, timing, and serving tips.`, time: 25, xp: 25, emoji: "📝", skillFn: () => "Recipe Development", week: 4 },
    { titleFn: (c) => `${c} Food Safety Audit`, descFn: (c) => `Inspect your kitchen like a ${c} health inspector. Check storage temps, expiry dates, and cross-contamination risks.`, time: 15, xp: 20, emoji: "🧤", skillFn: () => "Food Safety", week: 5 },
  ],
  "sport-fitness": [
    { titleFn: (c) => `Design a ${c} Training Plan`, descFn: (c) => `Create a 30-minute training session a ${c} would use — targeting specific skills, conditioning, and recovery.`, time: 20, xp: 25, emoji: "💪", skillFn: () => "Training Design", week: 1 },
    { titleFn: (c) => `${c} Performance Analysis`, descFn: (c) => `Watch a sports match or performance and analyse it like a ${c}: strategy, technique, decision-making, and areas to improve.`, time: 20, xp: 20, emoji: "⚽", skillFn: () => "Performance Analysis", week: 2 },
    { titleFn: (c) => `${c} Nutrition Plan`, descFn: (c) => `Research what professional athletes eat. As a ${c}, plan a full day of meals optimised for peak performance.`, time: 15, xp: 20, emoji: "🥗", skillFn: () => "Sports Nutrition", week: 3 },
    { titleFn: (c) => `Coach Someone as a ${c}`, descFn: (c) => `Teach a friend a sport technique or exercise. Use coaching cues, demonstration, and feedback — the way a professional ${c} would.`, time: 15, xp: 25, emoji: "🏋️", skillFn: () => "Coaching", week: 4 },
  ],
  "animals-nature": [
    { titleFn: (c) => `${c} Wildlife Observation Log`, descFn: (c) => `Spend 20 minutes observing an animal the way a ${c} would. Record behaviour, habitat, feeding patterns, and interactions.`, time: 20, xp: 25, emoji: "🐾", skillFn: () => "Animal Behaviour", week: 1 },
    { titleFn: (c) => `${c} Conservation Report`, descFn: (c) => `Research an endangered species in Africa. As a ${c}, create a fact sheet with threats, population data, and conservation actions.`, time: 20, xp: 25, emoji: "🦁", skillFn: () => "Conservation", week: 2 },
    { titleFn: (c) => `${c} Field Photography`, descFn: (c) => `Take 5 nature photos like a ${c} doing fieldwork. Label each organism, note the habitat, and describe what you observed.`, time: 15, xp: 20, emoji: "📸", skillFn: () => "Field Documentation", week: 3 },
    { titleFn: (c) => `${c} Care Protocol`, descFn: (c) => `Create a detailed care plan for an animal as a ${c} would — including diet, exercise, health monitoring, and enrichment activities.`, time: 15, xp: 20, emoji: "🐕", skillFn: () => "Animal Welfare", week: 4 },
  ],
  "space-future-tech": [
    { titleFn: (c) => `${c} Mission Design`, descFn: (c) => `Plan a space or future-tech mission as a ${c}. Define the objective, equipment needed, timeline, and potential risks.`, time: 20, xp: 30, emoji: "🚀", skillFn: () => "Mission Planning", week: 1 },
    { titleFn: (c) => `${c} 2050 Predictions`, descFn: (c) => `Write 5 predictions about how ${c} work will change by 2050. Research if any of your predictions are already being built.`, time: 15, xp: 20, emoji: "🔮", skillFn: () => "Futurism", week: 2 },
    { titleFn: (c) => `${c} Star Gazing Lab`, descFn: (c) => `Go outside at night and identify 3 constellations or planets. Use a free app like SkyView. Log your observations as a ${c} would.`, time: 15, xp: 20, emoji: "⭐", skillFn: () => "Astronomy", week: 3 },
    { titleFn: (c) => `${c} Innovation Design`, descFn: (c) => `Design a piece of future technology that a ${c} would use. Sketch it, list its features, and explain the science behind it.`, time: 20, xp: 25, emoji: "🤖", skillFn: () => "Innovation Design", week: 4 },
  ],
  "beauty-wellness": [
    { titleFn: (c) => `${c} Ingredient Science`, descFn: (c) => `Research 5 ingredients commonly used in ${c} work. Write what each does, backed by science — not marketing claims.`, time: 15, xp: 20, emoji: "💄", skillFn: () => "Product Knowledge", week: 1 },
    { titleFn: (c) => `${c} Wellness Routine Design`, descFn: (c) => `Create a morning and evening wellness routine as a ${c} would prescribe. Try it for 3 days and log the results.`, time: 15, xp: 25, emoji: "🧘", skillFn: () => "Routine Design", week: 2 },
    { titleFn: (c) => `${c} Look Tutorial`, descFn: (c) => `Create a look or treatment as a ${c} would and film a mini tutorial. Focus on technique, product selection, and client communication.`, time: 20, xp: 25, emoji: "✨", skillFn: () => "Practical Artistry", week: 3 },
    { titleFn: (c) => `${c} Product Honest Review`, descFn: (c) => `Write honest, professional reviews of 3 products a ${c} would evaluate. Cover efficacy, ingredients, value, and recommendation.`, time: 15, xp: 20, emoji: "📝", skillFn: () => "Product Evaluation", week: 4 },
  ],
  "real-estate-property": [
    { titleFn: (c) => `${c} Property Comparison`, descFn: (c) => `Research 3 property listings in your area as a ${c} would. Compare prices, location value, and investment potential.`, time: 20, xp: 25, emoji: "🏠", skillFn: () => "Property Valuation", week: 1 },
    { titleFn: (c) => `${c} Dream Development Plan`, descFn: (c) => `Design the floor plan for a property development as a ${c} — include room sizes, amenities, target market, and pricing.`, time: 25, xp: 30, emoji: "📐", skillFn: () => "Development Planning", week: 2 },
    { titleFn: (c) => `${c} Neighbourhood Analysis`, descFn: (c) => `Walk around your neighbourhood as a ${c} would. Assess infrastructure, security, schools, and what drives property value up or down.`, time: 20, xp: 20, emoji: "🚶", skillFn: () => "Location Analysis", week: 3 },
    { titleFn: (c) => `${c} Investment Calculator`, descFn: (c) => `If you bought a property for ₦10M and it appreciated 5% yearly, calculate its value in 5, 10, and 20 years. Show your ${c} analysis.`, time: 15, xp: 25, emoji: "📊", skillFn: () => "Investment Analysis", week: 4 },
  ],
};

function getCareerFamilyId(careerId: string): string | undefined {
  const listing = careerListings.find((l) => l.id === careerId);
  return listing?.familyId;
}

function generateFamilyQuests(careerId: string): WeeklyQuest[] {
  const familyId = getCareerFamilyId(careerId);
  if (!familyId || !familyQuestTemplates[familyId]) return [];

  const listing = careerListings.find((l) => l.id === careerId);
  const careerTitle = listing?.title || careerId;

  return familyQuestTemplates[familyId].map((t, i) => ({
    id: `wq-fam-${careerId}-${i + 1}`,
    careerId,
    title: t.titleFn(careerTitle),
    description: t.descFn(careerTitle),
    timeMinutes: t.time,
    xpReward: t.xp,
    emoji: t.emoji,
    skillTag: t.skillFn(careerTitle),
    week: t.week,
  }));
}

// Combine all quests (no more generic quests polluting career-specific feeds)
export const weeklyQuests: WeeklyQuest[] = [...handcraftedQuests];

export function getQuestsForCareer(careerId: string, weekNumber?: number): WeeklyQuest[] {
  // Get handcrafted quests for this career
  const careerQuests = handcraftedQuests.filter((q) => q.careerId === careerId);
  // Generate family-based quests (career-specific)
  const familyQuests = generateFamilyQuests(careerId);
  // Combine — handcrafted first, then family quests (NO generics)
  const all = [...careerQuests, ...familyQuests];

  // Deduplicate by id
  const unique = Array.from(new Map(all.map((q) => [q.id, q])).values());

  if (weekNumber !== undefined) {
    const weekMod = ((weekNumber - 1) % 8) + 1; // 8-week cycle now
    return unique.filter((q) => q.week === weekMod);
  }
  return unique;
}

export function getCurrentWeekNumber(): number {
  const start = new Date(2025, 0, 1);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
}
