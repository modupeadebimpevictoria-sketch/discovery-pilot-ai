export interface Mission {
  id: string;
  careerId: string;
  title: string;
  description: string;
  timeMinutes: number;
  xpReward: number;
  emoji: string;
  steps: string[];
  badge?: string;
}

export const missions: Mission[] = [
  // AI Engineer
  {
    id: "ai-1",
    careerId: "ai-engineer",
    title: "Teach an AI to Recognise Pictures",
    description: "Use a free tool called Teachable Machine to train a simple AI model that can tell the difference between objects.",
    timeMinutes: 20,
    xpReward: 50,
    emoji: "🤖",
    steps: [
      "Go to teachablemachine.withgoogle.com",
      "Pick 'Image Project'",
      "Train the AI with two different objects (like a pen and a phone)",
      "Test it and see how accurate it is!",
    ],
    badge: "AI Trainer",
  },
  // Dentist
  {
    id: "dentist-1",
    careerId: "dentist",
    title: "Be a Tooth Detective",
    description: "Learn how dentists check teeth by examining different foods and how they affect tooth health.",
    timeMinutes: 15,
    xpReward: 30,
    emoji: "🦷",
    steps: [
      "Pick 5 foods you eat regularly",
      "Research which ones are good or bad for teeth",
      "Make a quick poster or chart showing your findings",
      "Share it with your family!",
    ],
    badge: "Tooth Detective",
  },
  // Aerospace Engineer
  {
    id: "aerospace-1",
    careerId: "aerospace-engineer",
    title: "Build a Paper Rocket",
    description: "Design and test a paper rocket to learn about aerodynamics — the science of how things fly!",
    timeMinutes: 25,
    xpReward: 40,
    emoji: "🚀",
    steps: [
      "Design 3 different paper rocket shapes",
      "Launch each one and measure how far it flies",
      "Write down which design worked best and why",
      "Think about what real rocket engineers consider",
    ],
    badge: "Rocket Scientist",
  },
  // Music Producer
  {
    id: "music-1",
    careerId: "music-producer",
    title: "Make a Beat in 15 Minutes",
    description: "Use a free online tool to create your first beat — no experience needed!",
    timeMinutes: 15,
    xpReward: 35,
    emoji: "🎵",
    steps: [
      "Go to BandLab.com (free, no download needed)",
      "Pick a genre you like",
      "Add drums, bass, and a melody",
      "Export and share your first beat!",
    ],
    badge: "Beat Maker",
  },
  // Architect
  {
    id: "architect-1",
    careerId: "architect",
    title: "Design Your Dream Room",
    description: "Sketch a floor plan for your ideal bedroom or hangout space — think like a real architect!",
    timeMinutes: 20,
    xpReward: 40,
    emoji: "🏗️",
    steps: [
      "Measure your current room (or pick a size)",
      "Sketch a floor plan on paper or use Floorplanner.com",
      "Add furniture, windows, and doors",
      "Think about lighting and how the space feels",
    ],
    badge: "Space Designer",
  },
  // Climate Scientist
  {
    id: "climate-1",
    careerId: "climate-scientist",
    title: "Track Your Carbon Footprint",
    description: "Calculate how much CO2 your daily life produces — and find ways to reduce it!",
    timeMinutes: 15,
    xpReward: 35,
    emoji: "🌡️",
    steps: [
      "Use a free carbon footprint calculator online",
      "Input your transport, food, and energy habits",
      "Compare your result to the global average",
      "Write 3 things you could change to lower it",
    ],
    badge: "Climate Champion",
  },
  // Data Scientist
  {
    id: "data-1",
    careerId: "data-scientist",
    title: "Find Patterns in Your Screen Time",
    description: "Analyse your phone's screen time data like a real data scientist would!",
    timeMinutes: 20,
    xpReward: 40,
    emoji: "📊",
    steps: [
      "Check your screen time for the past week",
      "Write down the top 5 apps by usage",
      "Make a simple chart (pie chart or bar chart)",
      "What patterns do you notice? Any surprises?",
    ],
    badge: "Data Explorer",
  },
  // Film Director
  {
    id: "film-1",
    careerId: "film-director",
    title: "Direct a 60-Second Film",
    description: "Plan and shoot a super-short film using just your phone!",
    timeMinutes: 30,
    xpReward: 50,
    emoji: "🎬",
    steps: [
      "Write a simple story with a beginning, middle, and end",
      "Find a friend or family member to be your actor",
      "Shoot it on your phone (try different camera angles!)",
      "Edit it using a free app like CapCut or iMovie",
    ],
    badge: "Mini Director",
  },
  // Game Developer
  {
    id: "game-1",
    careerId: "game-developer",
    title: "Build a Simple Game",
    description: "Create a basic game using Scratch — it's free and visual, no coding experience needed!",
    timeMinutes: 30,
    xpReward: 50,
    emoji: "🎮",
    steps: [
      "Go to scratch.mit.edu and create a free account",
      "Pick a character (sprite) and a background",
      "Add controls so the character moves with arrow keys",
      "Add a goal (like catching items) and a score!",
    ],
    badge: "Game Creator",
  },
  // Entrepreneur
  {
    id: "entrepreneur-1",
    careerId: "entrepreneur",
    title: "Create a Mini Business Plan",
    description: "Come up with a business idea and plan it out like a real startup founder!",
    timeMinutes: 25,
    xpReward: 45,
    emoji: "🚀",
    steps: [
      "Think of a problem people around you have",
      "Come up with a product or service that solves it",
      "Write down: Who would buy it? How much would it cost? How would you sell it?",
      "Design a simple logo and name for your brand!",
    ],
    badge: "Young Entrepreneur",
  },
  // Journalist
  {
    id: "journalist-1",
    careerId: "journalist",
    title: "Write a Mini News Story",
    description: "Interview someone you know and write a short article about them — just like a real journalist!",
    timeMinutes: 25,
    xpReward: 40,
    emoji: "📰",
    steps: [
      "Pick someone interesting (teacher, family member, friend)",
      "Prepare 5 good questions to ask them",
      "Record or write down their answers",
      "Write a short story (200-300 words) about what you learned",
    ],
    badge: "Reporter",
  },
  // Chef
  {
    id: "chef-1",
    careerId: "chef",
    title: "Create Your Own Recipe",
    description: "Invent a new dish using ingredients you already have at home!",
    timeMinutes: 30,
    xpReward: 40,
    emoji: "👨‍🍳",
    steps: [
      "Look at what's in your kitchen right now",
      "Combine ingredients in a creative way",
      "Cook your creation (ask an adult for help if needed!)",
      "Take a photo and write down your recipe",
    ],
    badge: "Junior Chef",
  },
  // Software Engineer
  {
    id: "software-1",
    careerId: "software-engineer",
    title: "Build Your First Website",
    description: "Create a simple personal webpage using free tools — no experience needed!",
    timeMinutes: 30,
    xpReward: 50,
    emoji: "💻",
    steps: [
      "Go to codepen.io (free, no download)",
      "Write some HTML: your name, a photo, and a fun fact about you",
      "Add some colour using CSS",
      "Share the link with a friend!",
    ],
    badge: "Web Builder",
  },
  // Psychologist
  {
    id: "psychologist-1",
    careerId: "psychologist",
    title: "Run a Mini Mood Experiment",
    description: "Track how different activities affect your mood — like a real psychology study!",
    timeMinutes: 20,
    xpReward: 35,
    emoji: "🧠",
    steps: [
      "Pick 4 activities (exercise, music, social media, reading)",
      "Do each for 15 minutes and rate your mood from 1-10",
      "Write down what you noticed",
      "What made you feel best? Why do you think that is?",
    ],
    badge: "Mind Explorer",
  },
  // Cybersecurity Analyst
  {
    id: "cyber-1",
    careerId: "cybersecurity-analyst",
    title: "Test Your Password Strength",
    description: "Learn how hackers think by testing how strong your passwords really are!",
    timeMinutes: 15,
    xpReward: 30,
    emoji: "🔐",
    steps: [
      "Go to howsecureismypassword.net",
      "Test some example passwords (NOT your real ones!)",
      "Learn what makes a password strong vs weak",
      "Create 3 super-strong passwords using a passphrase method",
    ],
    badge: "Cyber Guardian",
  },
  // Fashion Designer
  {
    id: "fashion-1",
    careerId: "fashion-designer",
    title: "Design a Mini Collection",
    description: "Sketch 3 outfits for a themed collection — express yourself through fashion!",
    timeMinutes: 25,
    xpReward: 40,
    emoji: "👗",
    steps: [
      "Pick a theme (futuristic, vintage, streetwear, nature-inspired)",
      "Sketch 3 different outfits on paper",
      "Choose colours and fabrics for each",
      "Give your collection a name and write a 2-sentence description",
    ],
    badge: "Fashion Creator",
  },
  // UX Designer
  {
    id: "ux-1",
    careerId: "ux-designer",
    title: "Redesign an App You Use",
    description: "Pick an app you think could be better and sketch how you'd improve it!",
    timeMinutes: 20,
    xpReward: 40,
    emoji: "🎨",
    steps: [
      "Pick an app that frustrates you sometimes",
      "Write down 3 things that annoy you about it",
      "Sketch a new design that fixes those problems",
      "Show your design to a friend — would they prefer it?",
    ],
    badge: "UX Thinker",
  },
  // Marine Biologist
  {
    id: "marine-1",
    careerId: "marine-biologist",
    title: "Ocean Research Challenge",
    description: "Research an endangered marine species and create a mini fact file about it!",
    timeMinutes: 20,
    xpReward: 35,
    emoji: "🐋",
    steps: [
      "Choose an endangered ocean animal",
      "Research: Where does it live? Why is it endangered?",
      "Find out what conservation efforts exist",
      "Create a one-page fact file with drawings or printed images",
    ],
    badge: "Ocean Explorer",
  },
  // Investment Banker
  {
    id: "investment-1",
    careerId: "investment-banker",
    title: "Stock Market Simulation",
    description: "Pick 3 stocks and track them for a week — learn how the market works!",
    timeMinutes: 15,
    xpReward: 35,
    emoji: "💰",
    steps: [
      "Pick 3 companies you know (Apple, Nike, etc.)",
      "Write down their stock price today",
      "Check the prices daily for a week",
      "Calculate: Did you gain or lose 'money'? Why do you think?",
    ],
    badge: "Market Watcher",
  },
  // Surgeon
  {
    id: "surgeon-1",
    careerId: "surgeon",
    title: "Precision Surgery Challenge",
    description: "Test your hand steadiness — a key skill for surgeons — with a fun challenge!",
    timeMinutes: 15,
    xpReward: 30,
    emoji: "🏥",
    steps: [
      "Get a pair of tweezers and small beads or rice grains",
      "Set a timer for 2 minutes",
      "Move as many grains as you can into a small container",
      "Try again and see if you improved! Surgeons practice this way too.",
    ],
    badge: "Steady Hands",
  },
];

export function getMissionsByCareer(careerId: string): Mission[] {
  return missions.filter((m) => m.careerId === careerId);
}

export function getMissionById(id: string): Mission | undefined {
  return missions.find((m) => m.id === id);
}
