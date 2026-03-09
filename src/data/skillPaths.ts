export interface SkillLevel {
  id: string;
  level: "beginner" | "intermediate" | "advanced";
  title: string;
  description: string;
  emoji: string;
  xpRequired: number;
  activities?: string[];
  tools?: { name: string; url: string }[];
}

export interface SkillPath {
  careerId: string;
  skills: {
    name: string;
    emoji: string;
    levels: SkillLevel[];
  }[];
}

// Hand-crafted skill paths for specific careers
const handcraftedPaths: SkillPath[] = [
  {
    careerId: "ai-engineer",
    skills: [
      {
        name: "Programming",
        emoji: "💻",
        levels: [
          { id: "ai-prog-1", level: "beginner", title: "Hello World", description: "Learn basic Python syntax, variables, and loops", emoji: "🌱", xpRequired: 0, activities: ["Complete a Python basics course", "Build a calculator"], tools: [{ name: "Replit", url: "https://replit.com" }, { name: "Codecademy Python", url: "https://codecademy.com/learn/learn-python-3" }] },
          { id: "ai-prog-2", level: "intermediate", title: "Problem Solver", description: "Build programs that solve real problems. Learn functions and data structures", emoji: "⚡", xpRequired: 100, activities: ["Solve 10 coding challenges", "Build a to-do app"], tools: [{ name: "LeetCode", url: "https://leetcode.com" }, { name: "HackerRank", url: "https://hackerrank.com" }] },
          { id: "ai-prog-3", level: "advanced", title: "Code Master", description: "Build complex applications. Contribute to open source projects", emoji: "🔥", xpRequired: 250, activities: ["Contribute to an open-source project", "Build a full-stack app"], tools: [{ name: "GitHub", url: "https://github.com" }] },
        ],
      },
      {
        name: "Mathematics",
        emoji: "📐",
        levels: [
          { id: "ai-math-1", level: "beginner", title: "Number Ninja", description: "Master algebra, basic statistics, and probability", emoji: "🌱", xpRequired: 0, tools: [{ name: "Khan Academy", url: "https://khanacademy.org" }] },
          { id: "ai-math-2", level: "intermediate", title: "Data Thinker", description: "Learn linear algebra, calculus, and advanced statistics", emoji: "⚡", xpRequired: 100, tools: [{ name: "3Blue1Brown", url: "https://youtube.com/3blue1brown" }] },
          { id: "ai-math-3", level: "advanced", title: "Math Wizard", description: "Apply math to ML algorithms. Understand optimization theory", emoji: "🔥", xpRequired: 250 },
        ],
      },
      {
        name: "AI & Machine Learning",
        emoji: "🤖",
        levels: [
          { id: "ai-ml-1", level: "beginner", title: "AI Explorer", description: "Understand what AI is, play with Teachable Machine", emoji: "🌱", xpRequired: 0, tools: [{ name: "Teachable Machine", url: "https://teachablemachine.withgoogle.com" }] },
          { id: "ai-ml-2", level: "intermediate", title: "Model Builder", description: "Train your own ML models. Learn about neural networks", emoji: "⚡", xpRequired: 150, tools: [{ name: "Kaggle", url: "https://kaggle.com" }] },
          { id: "ai-ml-3", level: "advanced", title: "AI Creator", description: "Build and deploy AI applications. Compete on Kaggle", emoji: "🔥", xpRequired: 300 },
        ],
      },
    ],
  },
  {
    careerId: "architect",
    skills: [
      {
        name: "Design & Drawing",
        emoji: "✏️",
        levels: [
          { id: "arch-draw-1", level: "beginner", title: "First Sketches", description: "Learn basic drawing, perspective, and floor plans", emoji: "🌱", xpRequired: 0, tools: [{ name: "SketchBook", url: "https://sketchbook.com" }] },
          { id: "arch-draw-2", level: "intermediate", title: "Design Thinker", description: "Create detailed designs with measurements and scale", emoji: "⚡", xpRequired: 100 },
          { id: "arch-draw-3", level: "advanced", title: "Master Designer", description: "Create professional-quality architectural drawings", emoji: "🔥", xpRequired: 250 },
        ],
      },
      {
        name: "3D Modeling",
        emoji: "🏗️",
        levels: [
          { id: "arch-3d-1", level: "beginner", title: "3D Starter", description: "Learn SketchUp or Tinkercad basics", emoji: "🌱", xpRequired: 0, tools: [{ name: "Tinkercad", url: "https://tinkercad.com" }, { name: "SketchUp Free", url: "https://app.sketchup.com" }] },
          { id: "arch-3d-2", level: "intermediate", title: "Model Maker", description: "Build complete 3D building models with interiors", emoji: "⚡", xpRequired: 120 },
          { id: "arch-3d-3", level: "advanced", title: "Digital Architect", description: "Create photo-realistic renders and walkthroughs", emoji: "🔥", xpRequired: 280 },
        ],
      },
    ],
  },
  {
    careerId: "entrepreneur",
    skills: [
      {
        name: "Business Thinking",
        emoji: "💡",
        levels: [
          { id: "ent-biz-1", level: "beginner", title: "Idea Starter", description: "Learn to spot problems and think of solutions", emoji: "🌱", xpRequired: 0 },
          { id: "ent-biz-2", level: "intermediate", title: "Business Builder", description: "Create business plans, understand customers, test ideas", emoji: "⚡", xpRequired: 100 },
          { id: "ent-biz-3", level: "advanced", title: "Startup Pro", description: "Launch a real product/service and get paying customers", emoji: "🔥", xpRequired: 250 },
        ],
      },
      {
        name: "Finance",
        emoji: "💰",
        levels: [
          { id: "ent-fin-1", level: "beginner", title: "Money Basics", description: "Learn budgeting, saving, and basic financial terms", emoji: "🌱", xpRequired: 0, tools: [{ name: "Khan Academy Finance", url: "https://khanacademy.org/economics-finance-domain" }] },
          { id: "ent-fin-2", level: "intermediate", title: "Money Manager", description: "Create budgets, understand profit/loss, pricing", emoji: "⚡", xpRequired: 80 },
          { id: "ent-fin-3", level: "advanced", title: "Finance Pro", description: "Understand investment, fundraising, and financial planning", emoji: "🔥", xpRequired: 200 },
        ],
      },
    ],
  },
];

// Family-based skill templates for generating paths for any career
const familySkillTemplates: Record<string, (careerId: string) => SkillPath["skills"]> = {
  "creative-design": (id) => [
    { name: "Design Fundamentals", emoji: "🎨", levels: [
      { id: `${id}-des-1`, level: "beginner", title: "Design Explorer", description: "Learn colour theory, composition, and basic layout principles", emoji: "🌱", xpRequired: 0, tools: [{ name: "Canva", url: "https://canva.com" }] },
      { id: `${id}-des-2`, level: "intermediate", title: "Design Creator", description: "Master typography, grid systems, and visual hierarchy", emoji: "⚡", xpRequired: 100, tools: [{ name: "Figma", url: "https://figma.com" }] },
      { id: `${id}-des-3`, level: "advanced", title: "Design Pro", description: "Create professional work for real clients and build a portfolio", emoji: "🔥", xpRequired: 250 },
    ]},
    { name: "Digital Tools", emoji: "💻", levels: [
      { id: `${id}-tool-1`, level: "beginner", title: "Tool Starter", description: "Learn to use basic design software (Canva, free tools)", emoji: "🌱", xpRequired: 0, tools: [{ name: "Canva", url: "https://canva.com" }] },
      { id: `${id}-tool-2`, level: "intermediate", title: "Tool Expert", description: "Master industry-standard software (Figma, Adobe)", emoji: "⚡", xpRequired: 120, tools: [{ name: "Figma", url: "https://figma.com" }] },
      { id: `${id}-tool-3`, level: "advanced", title: "Tool Master", description: "Use advanced features, plugins, and automation in your tools", emoji: "🔥", xpRequired: 280 },
    ]},
    { name: "Portfolio Building", emoji: "📁", levels: [
      { id: `${id}-port-1`, level: "beginner", title: "First Projects", description: "Create 3 practice projects to start your collection", emoji: "🌱", xpRequired: 0 },
      { id: `${id}-port-2`, level: "intermediate", title: "Real Work", description: "Complete projects for real people or organisations", emoji: "⚡", xpRequired: 150 },
      { id: `${id}-port-3`, level: "advanced", title: "Pro Portfolio", description: "Build a professional portfolio website with case studies", emoji: "🔥", xpRequired: 300, tools: [{ name: "Behance", url: "https://behance.net" }] },
    ]},
  ],
  "technology": (id) => [
    { name: "Programming", emoji: "💻", levels: [
      { id: `${id}-code-1`, level: "beginner", title: "Code Starter", description: "Learn basic programming with Python or JavaScript", emoji: "🌱", xpRequired: 0, tools: [{ name: "freeCodeCamp", url: "https://freecodecamp.org" }, { name: "Replit", url: "https://replit.com" }] },
      { id: `${id}-code-2`, level: "intermediate", title: "Code Builder", description: "Build real projects. Learn frameworks and databases", emoji: "⚡", xpRequired: 100, tools: [{ name: "Codecademy", url: "https://codecademy.com" }] },
      { id: `${id}-code-3`, level: "advanced", title: "Code Master", description: "Contribute to open source. Build production-ready apps", emoji: "🔥", xpRequired: 250, tools: [{ name: "GitHub", url: "https://github.com" }] },
    ]},
    { name: "Problem Solving", emoji: "🧩", levels: [
      { id: `${id}-ps-1`, level: "beginner", title: "Puzzle Starter", description: "Solve simple coding challenges and logic puzzles", emoji: "🌱", xpRequired: 0, tools: [{ name: "Scratch", url: "https://scratch.mit.edu" }] },
      { id: `${id}-ps-2`, level: "intermediate", title: "Problem Solver", description: "Tackle algorithm challenges and data structures", emoji: "⚡", xpRequired: 120 },
      { id: `${id}-ps-3`, level: "advanced", title: "Algorithm Expert", description: "Solve competitive programming problems and system design", emoji: "🔥", xpRequired: 280 },
    ]},
    { name: "Tech Ecosystem", emoji: "🌐", levels: [
      { id: `${id}-eco-1`, level: "beginner", title: "Tech Explorer", description: "Understand how the internet, apps, and cloud work", emoji: "🌱", xpRequired: 0 },
      { id: `${id}-eco-2`, level: "intermediate", title: "Tech Literate", description: "Learn about APIs, databases, and deployment", emoji: "⚡", xpRequired: 100 },
      { id: `${id}-eco-3`, level: "advanced", title: "Full Stack", description: "Build and deploy complete applications end-to-end", emoji: "🔥", xpRequired: 250 },
    ]},
  ],
};

// Generate a default skill path for any career based on universal skills
function generateDefaultSkills(careerId: string): SkillPath["skills"] {
  return [
    { name: "Core Knowledge", emoji: "📚", levels: [
      { id: `${careerId}-core-1`, level: "beginner", title: "Foundation", description: "Learn the basics of this field through free online resources", emoji: "🌱", xpRequired: 0, tools: [{ name: "YouTube", url: "https://youtube.com" }, { name: "Khan Academy", url: "https://khanacademy.org" }] },
      { id: `${careerId}-core-2`, level: "intermediate", title: "Deep Diver", description: "Study specialised topics and complete structured courses", emoji: "⚡", xpRequired: 100, tools: [{ name: "Coursera", url: "https://coursera.org" }] },
      { id: `${careerId}-core-3`, level: "advanced", title: "Expert", description: "Master advanced concepts and stay current with industry trends", emoji: "🔥", xpRequired: 250 },
    ]},
    { name: "Practical Skills", emoji: "🛠️", levels: [
      { id: `${careerId}-prac-1`, level: "beginner", title: "First Steps", description: "Complete your first hands-on project in this field", emoji: "🌱", xpRequired: 0 },
      { id: `${careerId}-prac-2`, level: "intermediate", title: "Builder", description: "Take on more complex projects. Get feedback from others", emoji: "⚡", xpRequired: 120 },
      { id: `${careerId}-prac-3`, level: "advanced", title: "Professional", description: "Deliver professional-quality work. Build a portfolio", emoji: "🔥", xpRequired: 280 },
    ]},
    { name: "Communication", emoji: "💬", levels: [
      { id: `${careerId}-comm-1`, level: "beginner", title: "Clear Speaker", description: "Practice explaining complex ideas in simple terms", emoji: "🌱", xpRequired: 0 },
      { id: `${careerId}-comm-2`, level: "intermediate", title: "Presenter", description: "Give presentations and write professional documents", emoji: "⚡", xpRequired: 80 },
      { id: `${careerId}-comm-3`, level: "advanced", title: "Influencer", description: "Lead meetings, mentor others, and build your professional brand", emoji: "🔥", xpRequired: 200 },
    ]},
  ];
}

import { careerListings } from "@/data/careerFamilies";

export const skillPaths: SkillPath[] = handcraftedPaths;

export function getSkillPathForCareer(careerId: string): SkillPath | undefined {
  // Check hand-crafted first
  const handcrafted = handcraftedPaths.find((s) => s.careerId === careerId);
  if (handcrafted) return handcrafted;

  // Try family-based template
  const listing = careerListings.find((l) => l.id === careerId);
  if (listing && familySkillTemplates[listing.familyId]) {
    return {
      careerId,
      skills: familySkillTemplates[listing.familyId](careerId),
    };
  }

  // Default template
  return {
    careerId,
    skills: generateDefaultSkills(careerId),
  };
}
