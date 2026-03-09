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

// Hand-crafted quests for specific careers
const handcraftedQuests: WeeklyQuest[] = [
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

  // Surgeon
  { id: "wq-surg-1", careerId: "surgeon", title: "Anatomy Sketch Challenge", description: "Pick a body part (heart, brain, hand). Draw and label it as accurately as you can.", timeMinutes: 20, xpReward: 25, emoji: "🫀", skillTag: "Anatomy", week: 1 },
  { id: "wq-surg-2", careerId: "surgeon", title: "First Aid Quick Learn", description: "Learn 3 basic first aid techniques (CPR steps, treating a burn, stopping bleeding). Quiz a friend!", timeMinutes: 15, xpReward: 20, emoji: "🏥", skillTag: "Medical Knowledge", week: 2 },
];

// Family-based quest templates — generates quests for any career in a family
const familyQuestTemplates: Record<string, { title: string; desc: (career: string) => string; time: number; xp: number; emoji: string; skill: string; week: number }[]> = {
  "creative-design": [
    { title: "Sketch Challenge", desc: (c) => `Spend 15 minutes sketching something related to ${c}. Focus on shapes and proportions.`, time: 15, xp: 20, emoji: "✏️", skill: "Visual Thinking", week: 1 },
    { title: "Redesign Something Ugly", desc: () => "Find a badly-designed sign, poster, or product near you. Redesign it to look better.", time: 20, xp: 25, emoji: "🎨", skill: "Design Critique", week: 2 },
    { title: "Colour Palette Hunt", desc: () => "Find 5 colour combinations in nature or buildings. Create a mood board on Canva.", time: 15, xp: 20, emoji: "🌈", skill: "Colour Theory", week: 3 },
    { title: "Design for a Friend", desc: (c) => `Design something real for a friend — a logo, poster, or layout related to ${c}.`, time: 25, xp: 30, emoji: "🎯", skill: "Client Work", week: 4 },
  ],
  "media-content": [
    { title: "Write a Headline Story", desc: () => "Pick a topic you care about. Write a 200-word article with a catchy headline.", time: 20, xp: 25, emoji: "📰", skill: "Writing", week: 1 },
    { title: "30-Second Video", desc: (c) => `Create a 30-second video about ${c} using only your phone.`, time: 20, xp: 25, emoji: "🎬", skill: "Video Production", week: 2 },
    { title: "Interview Someone", desc: () => "Interview a family member or friend about their job. Write up the key takeaways.", time: 20, xp: 25, emoji: "🎤", skill: "Journalism", week: 3 },
    { title: "Social Media Content Plan", desc: () => "Plan 5 posts for a topic you love. Write captions and describe the visuals.", time: 15, xp: 20, emoji: "📱", skill: "Content Strategy", week: 4 },
  ],
  "entertainment-performance": [
    { title: "60-Second Performance", desc: () => "Perform a 60-second monologue, song, or comedy bit. Record it on your phone.", time: 15, xp: 25, emoji: "🎭", skill: "Performing", week: 1 },
    { title: "Study a Great Performance", desc: () => "Watch a performance you love (song, scene, dance). Note 3 techniques the performer used.", time: 15, xp: 20, emoji: "👀", skill: "Performance Analysis", week: 2 },
    { title: "Write a Short Skit", desc: () => "Write a 2-minute comedy or drama skit. Get friends to act it out!", time: 20, xp: 25, emoji: "📝", skill: "Script Writing", week: 3 },
    { title: "Stage Presence Practice", desc: () => "Practice speaking or performing in front of a mirror for 10 minutes. Focus on body language.", time: 10, xp: 20, emoji: "🪞", skill: "Confidence", week: 4 },
  ],
  "technology": [
    { title: "Build a Mini Website", desc: () => "Create a simple one-page website about yourself using CodePen or Replit.", time: 25, xp: 30, emoji: "💻", skill: "Web Development", week: 1 },
    { title: "Debug a Piece of Code", desc: () => "Find a broken code snippet online and fix it. Explain what was wrong.", time: 20, xp: 25, emoji: "🐛", skill: "Debugging", week: 2 },
    { title: "Tech News Summary", desc: () => "Read 3 tech news articles today. Write a 1-sentence summary of each.", time: 15, xp: 20, emoji: "📰", skill: "Tech Awareness", week: 3 },
    { title: "Automate Something", desc: () => "Use a simple tool (IFTTT, Shortcuts, or Python) to automate a boring task.", time: 25, xp: 30, emoji: "⚙️", skill: "Automation", week: 4 },
  ],
  "product-tech": [
    { title: "App Teardown", desc: () => "Pick an app you use daily. Write what works, what doesn't, and 3 improvements.", time: 20, xp: 25, emoji: "📱", skill: "Product Thinking", week: 1 },
    { title: "User Interview", desc: () => "Ask 3 people about a problem they have with an app. Write down their frustrations.", time: 20, xp: 25, emoji: "🎤", skill: "User Research", week: 2 },
    { title: "Wireframe an App Screen", desc: () => "Sketch 3 screens for an app idea on paper. Focus on layout and flow.", time: 20, xp: 25, emoji: "✏️", skill: "Wireframing", week: 3 },
    { title: "Write a Feature Spec", desc: () => "Pick a feature for an imaginary app. Write what it does, who it's for, and why it matters.", time: 15, xp: 20, emoji: "📋", skill: "Product Writing", week: 4 },
  ],
  "healthcare-medicine": [
    { title: "Health Myth Buster", desc: () => "Find 3 common health myths. Research whether they're true or false.", time: 15, xp: 20, emoji: "🏥", skill: "Medical Research", week: 1 },
    { title: "Anatomy Quick Draw", desc: () => "Draw and label a major organ from memory. Check your accuracy afterwards.", time: 20, xp: 25, emoji: "🫀", skill: "Anatomy", week: 2 },
    { title: "First Aid Basics", desc: () => "Learn and practice 3 first aid techniques. Teach them to a friend.", time: 20, xp: 25, emoji: "🩹", skill: "Emergency Skills", week: 3 },
    { title: "Nutrition Tracker", desc: () => "Track what you eat for one day. Research which nutrients you're getting.", time: 15, xp: 20, emoji: "🥗", skill: "Nutrition Science", week: 4 },
  ],
  "mental-health": [
    { title: "Mood Tracker Experiment", desc: () => "Track your mood 3 times today. Note what affected it positively and negatively.", time: 10, xp: 20, emoji: "🧠", skill: "Self-Awareness", week: 1 },
    { title: "Active Listening Practice", desc: () => "Have a conversation where you only listen and ask questions. Notice how the person responds.", time: 15, xp: 20, emoji: "👂", skill: "Empathy", week: 2 },
    { title: "Stress Management Research", desc: () => "Research 5 science-backed ways to reduce stress. Try one today.", time: 15, xp: 20, emoji: "🧘", skill: "Wellness", week: 3 },
    { title: "Write a Support Script", desc: () => "Write what you'd say to help a friend going through a tough time. Be kind and specific.", time: 15, xp: 25, emoji: "💬", skill: "Counselling", week: 4 },
  ],
  "science-research": [
    { title: "Kitchen Science Experiment", desc: () => "Do a simple science experiment at home (baking soda volcano, density tower). Record results.", time: 25, xp: 30, emoji: "🔬", skill: "Experimentation", week: 1 },
    { title: "Science News Deep Dive", desc: () => "Read a science article and explain it in simple words to someone who isn't into science.", time: 15, xp: 20, emoji: "📰", skill: "Science Communication", week: 2 },
    { title: "Observation Journal", desc: () => "Spend 20 minutes observing something in nature. Write detailed notes like a scientist.", time: 20, xp: 25, emoji: "🌿", skill: "Observation", week: 3 },
    { title: "Research Question", desc: () => "Write 3 questions about the world that science hasn't fully answered yet. Research one.", time: 15, xp: 20, emoji: "❓", skill: "Critical Thinking", week: 4 },
  ],
  "environment-sustainability": [
    { title: "Waste Audit", desc: () => "Sort your family's waste for one day. Calculate what % could be recycled.", time: 20, xp: 25, emoji: "♻️", skill: "Environmental Science", week: 1 },
    { title: "Carbon Footprint Check", desc: () => "Use a free online calculator to check your carbon footprint. Find 3 ways to reduce it.", time: 15, xp: 20, emoji: "🌍", skill: "Climate Awareness", week: 2 },
    { title: "Plant Something", desc: () => "Plant a seed, herb, or vegetable. Document its growth over the next week.", time: 20, xp: 25, emoji: "🌱", skill: "Ecology", week: 3 },
    { title: "Environmental Solution Pitch", desc: () => "Write a 1-minute pitch for an environmental solution to a local problem.", time: 15, xp: 25, emoji: "💡", skill: "Innovation", week: 4 },
  ],
  "engineering-architecture": [
    { title: "Build a Structure", desc: () => "Using only household items, build the tallest free-standing tower you can.", time: 25, xp: 30, emoji: "🏗️", skill: "Structural Thinking", week: 1 },
    { title: "Measure & Sketch a Room", desc: () => "Measure a room in your house and draw a to-scale floor plan.", time: 20, xp: 25, emoji: "📐", skill: "Technical Drawing", week: 2 },
    { title: "Bridge Challenge", desc: () => "Build a bridge from paper that can hold the most weight. Test with coins.", time: 25, xp: 30, emoji: "🌉", skill: "Engineering Design", week: 3 },
    { title: "Famous Engineering Study", desc: () => "Research a famous engineering project (Burj Khalifa, Panama Canal). Write 5 key facts.", time: 15, xp: 20, emoji: "🌐", skill: "Engineering Knowledge", week: 4 },
  ],
  "trades-technical": [
    { title: "Fix Something at Home", desc: () => "Find something broken or loose at home. Fix it (with permission!) and document how.", time: 25, xp: 30, emoji: "🔧", skill: "Practical Skills", week: 1 },
    { title: "Tool Identification", desc: () => "Learn the names and uses of 10 tools you didn't know before. Draw them.", time: 15, xp: 20, emoji: "🛠️", skill: "Tool Knowledge", week: 2 },
    { title: "How Things Work", desc: () => "Take apart a broken device (with permission) and try to understand how it works.", time: 25, xp: 30, emoji: "⚙️", skill: "Mechanical Thinking", week: 3 },
    { title: "Safety First", desc: () => "Research safety procedures for a trade you're interested in. Write a safety checklist.", time: 15, xp: 20, emoji: "🦺", skill: "Safety Awareness", week: 4 },
  ],
  "business-entrepreneurship": [
    { title: "Business Idea Generator", desc: () => "Come up with 5 business ideas in 10 minutes. Pick the best one and write why.", time: 15, xp: 20, emoji: "💡", skill: "Ideation", week: 1 },
    { title: "Competitor Analysis", desc: () => "Pick a business you like. Find 3 competitors and compare their strengths.", time: 20, xp: 25, emoji: "📊", skill: "Market Research", week: 2 },
    { title: "60-Second Elevator Pitch", desc: () => "Write and practice a 60-second pitch for a business idea. Record yourself.", time: 15, xp: 25, emoji: "🎤", skill: "Pitching", week: 3 },
    { title: "Pricing Challenge", desc: () => "Pick a product. Research how much it costs to make vs sell. Calculate the profit margin.", time: 15, xp: 20, emoji: "💰", skill: "Business Finance", week: 4 },
  ],
  "finance-investment": [
    { title: "Stock Market Watch", desc: () => "Pick 3 companies. Track their stock prices for a week and write what you notice.", time: 15, xp: 25, emoji: "📈", skill: "Investing", week: 1 },
    { title: "Budget Your Week", desc: () => "Track every naira/dollar you spend this week. Categorise your spending.", time: 15, xp: 20, emoji: "💳", skill: "Budgeting", week: 2 },
    { title: "Financial News Summary", desc: () => "Read 3 finance news articles. Summarise each in one sentence.", time: 15, xp: 20, emoji: "📰", skill: "Financial Literacy", week: 3 },
    { title: "Savings Challenge", desc: () => "Calculate how much you'd have in 10 years saving ₦500/week with compound interest.", time: 15, xp: 25, emoji: "🏦", skill: "Compound Interest", week: 4 },
  ],
  "marketing-communications": [
    { title: "Ad Analysis", desc: () => "Find 3 ads on social media. Write what makes each effective or ineffective.", time: 15, xp: 20, emoji: "📣", skill: "Ad Analysis", week: 1 },
    { title: "Create a Brand Name", desc: () => "Invent a brand name and tagline for a fictional product. Design a simple logo.", time: 20, xp: 25, emoji: "✨", skill: "Branding", week: 2 },
    { title: "Social Media Audit", desc: () => "Analyse a brand's social media. What's their style? What works? What could improve?", time: 15, xp: 20, emoji: "📱", skill: "Social Strategy", week: 3 },
    { title: "Write 3 Ad Headlines", desc: () => "Write 3 different headlines for the same product. Ask friends which is best.", time: 15, xp: 20, emoji: "📝", skill: "Copywriting", week: 4 },
  ],
  "law-justice": [
    { title: "Debate Both Sides", desc: () => "Pick a controversial topic. Write 3 arguments for AND against it.", time: 20, xp: 25, emoji: "⚖️", skill: "Critical Thinking", week: 1 },
    { title: "Mock Trial", desc: () => "Write a short script for a mock trial. Include a judge, lawyer, and witness.", time: 25, xp: 30, emoji: "🏛️", skill: "Legal Reasoning", week: 2 },
    { title: "Know Your Rights", desc: () => "Research 5 basic rights you have in your country. Explain each in simple terms.", time: 15, xp: 20, emoji: "📜", skill: "Legal Knowledge", week: 3 },
    { title: "Case Study", desc: () => "Read about a famous legal case. Write what happened and what you think of the verdict.", time: 20, xp: 25, emoji: "📋", skill: "Legal Analysis", week: 4 },
  ],
  "education-academia": [
    { title: "Teach Something", desc: () => "Pick a topic you know well. Teach it to someone in 5 minutes.", time: 15, xp: 25, emoji: "🎓", skill: "Teaching", week: 1 },
    { title: "Create a Quiz", desc: () => "Write a 10-question quiz on a subject you like. Test your friends.", time: 15, xp: 20, emoji: "📝", skill: "Assessment Design", week: 2 },
    { title: "Learning Style Research", desc: () => "Research different learning styles. Figure out what yours is and how to use it.", time: 15, xp: 20, emoji: "🧠", skill: "Education Theory", week: 3 },
    { title: "Lesson Plan", desc: () => "Plan a 15-minute lesson on any topic. Include activities and a quiz.", time: 20, xp: 25, emoji: "📋", skill: "Curriculum Design", week: 4 },
  ],
  "social-impact": [
    { title: "Community Problem Mapping", desc: () => "Identify 5 problems in your community. Rank them by urgency and write solutions.", time: 20, xp: 25, emoji: "🗺️", skill: "Community Analysis", week: 1 },
    { title: "Volunteer Research", desc: () => "Find 3 volunteer opportunities near you. Apply to one.", time: 15, xp: 25, emoji: "🤝", skill: "Service", week: 2 },
    { title: "Impact Story", desc: () => "Write about someone who made a difference in their community. What can you learn?", time: 15, xp: 20, emoji: "📖", skill: "Storytelling", week: 3 },
    { title: "Petition or Campaign Draft", desc: () => "Write a short petition or social media campaign about an issue you care about.", time: 20, xp: 25, emoji: "✊", skill: "Advocacy", week: 4 },
  ],
  "government-public-service": [
    { title: "Know Your Government", desc: () => "Research your local government structure. Who represents you? What do they do?", time: 15, xp: 20, emoji: "🏛️", skill: "Civic Knowledge", week: 1 },
    { title: "Policy Proposal", desc: () => "Write a 1-page policy proposal to improve something in your school or community.", time: 20, xp: 25, emoji: "📋", skill: "Policy Writing", week: 2 },
    { title: "Budget Simulation", desc: () => "If you had ₦10 million for your community, how would you spend it? Break it down.", time: 15, xp: 20, emoji: "💰", skill: "Public Finance", week: 3 },
    { title: "Public Speaking Practice", desc: () => "Write and deliver a 2-minute speech about an issue you care about.", time: 15, xp: 25, emoji: "🎤", skill: "Public Speaking", week: 4 },
  ],
  "international-development": [
    { title: "Global Issue Research", desc: () => "Pick a global issue (poverty, education, health). Research how one country is tackling it.", time: 20, xp: 25, emoji: "🌐", skill: "Global Awareness", week: 1 },
    { title: "UN Goals Explorer", desc: () => "Learn about 3 of the UN Sustainable Development Goals. Which matters most to you?", time: 15, xp: 20, emoji: "🎯", skill: "SDG Knowledge", week: 2 },
    { title: "Cultural Exchange", desc: () => "Learn 5 facts about a country you've never been to. Share with a friend.", time: 15, xp: 20, emoji: "🌍", skill: "Cultural Awareness", week: 3 },
    { title: "Aid Project Proposal", desc: () => "Design a small project that could help a community in need. Write a 1-page plan.", time: 20, xp: 25, emoji: "📝", skill: "Project Planning", week: 4 },
  ],
  "travel-hospitality": [
    { title: "Travel Itinerary", desc: () => "Plan a 3-day trip to a city you've never visited. Include budget, transport, and activities.", time: 20, xp: 25, emoji: "✈️", skill: "Travel Planning", week: 1 },
    { title: "Hotel Review", desc: () => "Write a detailed review of a place you've stayed (hotel, Airbnb, or even your own home!).", time: 15, xp: 20, emoji: "🏨", skill: "Hospitality", week: 2 },
    { title: "Customer Service Role-Play", desc: () => "Practice handling a difficult customer complaint. Write both sides of the conversation.", time: 15, xp: 20, emoji: "🤝", skill: "Customer Service", week: 3 },
    { title: "Local Tourism Guide", desc: () => "Write a mini guide to your town/city for tourists. Include 5 must-see spots.", time: 20, xp: 25, emoji: "📖", skill: "Tourism", week: 4 },
  ],
  "food-culinary": [
    { title: "Cook Something New", desc: () => "Try a recipe from a cuisine you've never cooked before. Take photos!", time: 30, xp: 30, emoji: "👨‍🍳", skill: "Cooking", week: 1 },
    { title: "Food Cost Calculator", desc: () => "Calculate the exact cost of making your favourite meal from scratch.", time: 15, xp: 20, emoji: "💰", skill: "Food Business", week: 2 },
    { title: "Plate Presentation", desc: () => "Make any meal and focus on making it look beautiful on the plate. Take a photo.", time: 20, xp: 25, emoji: "🍽️", skill: "Plating", week: 3 },
    { title: "Recipe Invention", desc: () => "Create a brand new recipe using 5 ingredients you already have.", time: 25, xp: 25, emoji: "📝", skill: "Creativity", week: 4 },
  ],
  "sport-fitness": [
    { title: "Create a Workout Plan", desc: () => "Design a 30-minute workout targeting 3 muscle groups. Try it yourself!", time: 20, xp: 25, emoji: "💪", skill: "Fitness Planning", week: 1 },
    { title: "Sport Analysis", desc: () => "Watch a sports match and analyse one player's strategy. Write 3 observations.", time: 20, xp: 20, emoji: "⚽", skill: "Sports Analysis", week: 2 },
    { title: "Nutrition for Athletes", desc: () => "Research what elite athletes eat. Plan a day of meals for peak performance.", time: 15, xp: 20, emoji: "🥗", skill: "Sports Nutrition", week: 3 },
    { title: "Coach a Friend", desc: () => "Teach a friend how to do an exercise or sport technique properly.", time: 15, xp: 25, emoji: "🏋️", skill: "Coaching", week: 4 },
  ],
  "animals-nature": [
    { title: "Wildlife Observation", desc: () => "Spend 20 minutes observing an animal (pet, bird, insect). Record its behaviour.", time: 20, xp: 25, emoji: "🐾", skill: "Animal Behaviour", week: 1 },
    { title: "Endangered Species Report", desc: () => "Research an endangered animal in Nigeria or Africa. Create a fact sheet.", time: 20, xp: 25, emoji: "🦁", skill: "Conservation", week: 2 },
    { title: "Nature Photography", desc: () => "Take 5 photos of different plants or animals near you. Label each one.", time: 15, xp: 20, emoji: "📸", skill: "Field Work", week: 3 },
    { title: "Pet Care Plan", desc: () => "Create a detailed care plan for a pet (real or imaginary). Include diet, exercise, and health checks.", time: 15, xp: 20, emoji: "🐕", skill: "Animal Care", week: 4 },
  ],
  "space-future-tech": [
    { title: "Space Mission Planner", desc: () => "Plan a mission to Mars. What would you bring? How long would it take?", time: 20, xp: 30, emoji: "🚀", skill: "Space Science", week: 1 },
    { title: "Future Tech Prediction", desc: () => "Write 5 predictions about technology in 2050. Research if any are already being built.", time: 15, xp: 20, emoji: "🔮", skill: "Futurism", week: 2 },
    { title: "Star Gazing Log", desc: () => "Go outside at night and identify 3 constellations or planets. Use a free app to help.", time: 15, xp: 20, emoji: "⭐", skill: "Astronomy", week: 3 },
    { title: "Robot Design Challenge", desc: () => "Design a robot that solves a specific problem. Sketch it and list its features.", time: 20, xp: 25, emoji: "🤖", skill: "Robotics", week: 4 },
  ],
  "beauty-wellness": [
    { title: "Skincare Science", desc: () => "Research what ingredients in skincare actually work. Create a simple routine.", time: 15, xp: 20, emoji: "💄", skill: "Beauty Science", week: 1 },
    { title: "Wellness Routine Design", desc: () => "Create a morning and evening wellness routine. Try it for 3 days.", time: 15, xp: 25, emoji: "🧘", skill: "Wellness", week: 2 },
    { title: "Makeup Look Tutorial", desc: () => "Create a makeup look and photograph or film a mini tutorial.", time: 20, xp: 25, emoji: "✨", skill: "Artistry", week: 3 },
    { title: "Product Review", desc: () => "Write an honest review of 3 beauty/wellness products. Would you recommend them?", time: 15, xp: 20, emoji: "📝", skill: "Product Knowledge", week: 4 },
  ],
  "real-estate-property": [
    { title: "Property Price Research", desc: () => "Research property prices in your area. Compare 3 listings and analyse differences.", time: 20, xp: 25, emoji: "🏠", skill: "Market Analysis", week: 1 },
    { title: "Dream Home Floor Plan", desc: () => "Design the floor plan for your dream home. Include room sizes and features.", time: 25, xp: 30, emoji: "📐", skill: "Property Design", week: 2 },
    { title: "Neighbourhood Walkthrough", desc: () => "Walk around your neighbourhood. What makes it valuable? What could improve?", time: 20, xp: 20, emoji: "🚶", skill: "Location Analysis", week: 3 },
    { title: "Investment Calculator", desc: () => "If you bought a property for ₦10M and it grew 5% yearly, what's it worth in 10 years?", time: 15, xp: 25, emoji: "📊", skill: "Property Investment", week: 4 },
  ],
};

// Generic quests for any career
const genericQuests: WeeklyQuest[] = [
  { id: "wq-gen-1", careerId: "generic", title: "Research a Role Model", description: "Find someone successful in your dream career. Write 5 things about their journey and what you learned.", timeMinutes: 15, xpReward: 20, emoji: "⭐", skillTag: "Inspiration", week: 1 },
  { id: "wq-gen-2", careerId: "generic", title: "Set 3 Monthly Goals", description: "Write 3 goals for this month related to your career journey. Make them specific and achievable.", timeMinutes: 10, xpReward: 15, emoji: "🎯", skillTag: "Goal Setting", week: 2 },
  { id: "wq-gen-3", careerId: "generic", title: "Teach Someone Something", description: "Explain a topic you've learned recently to a friend or family member. Teaching helps you learn!", timeMinutes: 15, xpReward: 20, emoji: "📖", skillTag: "Communication", week: 3 },
  { id: "wq-gen-4", careerId: "generic", title: "Read for 20 Minutes", description: "Read an article, book chapter, or blog post related to your career interest.", timeMinutes: 20, xpReward: 15, emoji: "📚", skillTag: "Knowledge", week: 4 },
];

// Import careerFamilies to map career IDs to family IDs
import { careerListings, careerFamilies } from "@/data/careerFamilies";

function getCareerFamilyId(careerId: string): string | undefined {
  const listing = careerListings.find((l) => l.id === careerId);
  return listing?.familyId;
}

// Generate quests for a career based on its family template
function generateFamilyQuests(careerId: string): WeeklyQuest[] {
  const familyId = getCareerFamilyId(careerId);
  if (!familyId || !familyQuestTemplates[familyId]) return [];

  const listing = careerListings.find((l) => l.id === careerId);
  const careerTitle = listing?.title || careerId;

  return familyQuestTemplates[familyId].map((t, i) => ({
    id: `wq-fam-${careerId}-${i + 1}`,
    careerId,
    title: t.title,
    description: t.desc(careerTitle),
    timeMinutes: t.time,
    xpReward: t.xp,
    emoji: t.emoji,
    skillTag: t.skill,
    week: t.week,
  }));
}

// Combine all quests
export const weeklyQuests: WeeklyQuest[] = [...handcraftedQuests, ...genericQuests];

export function getQuestsForCareer(careerId: string, weekNumber?: number): WeeklyQuest[] {
  // Get handcrafted quests for this career
  const careerQuests = handcraftedQuests.filter((q) => q.careerId === careerId);
  // Generate family-based quests
  const familyQuests = generateFamilyQuests(careerId);
  // Generic quests
  const all = [...careerQuests, ...familyQuests, ...genericQuests];

  // Deduplicate by id
  const unique = Array.from(new Map(all.map((q) => [q.id, q])).values());

  if (weekNumber !== undefined) {
    const weekMod = ((weekNumber - 1) % 4) + 1;
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
