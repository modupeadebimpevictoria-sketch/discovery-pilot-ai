export interface SkillLevel {
  id: string;
  level: "beginner" | "intermediate" | "advanced";
  title: string;
  description: string;
  emoji: string;
  xpRequired: number; // xp needed in this skill to unlock
}

export interface SkillPath {
  careerId: string;
  skills: {
    name: string;
    emoji: string;
    levels: SkillLevel[];
  }[];
}

export const skillPaths: SkillPath[] = [
  {
    careerId: "ai-engineer",
    skills: [
      {
        name: "Programming",
        emoji: "💻",
        levels: [
          { id: "ai-prog-1", level: "beginner", title: "Hello World", description: "Learn basic Python syntax, variables, and loops", emoji: "🌱", xpRequired: 0 },
          { id: "ai-prog-2", level: "intermediate", title: "Problem Solver", description: "Build programs that solve real problems. Learn functions and data structures", emoji: "⚡", xpRequired: 100 },
          { id: "ai-prog-3", level: "advanced", title: "Code Master", description: "Build complex applications. Contribute to open source projects", emoji: "🔥", xpRequired: 250 },
        ],
      },
      {
        name: "Mathematics",
        emoji: "📐",
        levels: [
          { id: "ai-math-1", level: "beginner", title: "Number Ninja", description: "Master algebra, basic statistics, and probability", emoji: "🌱", xpRequired: 0 },
          { id: "ai-math-2", level: "intermediate", title: "Data Thinker", description: "Learn linear algebra, calculus, and advanced statistics", emoji: "⚡", xpRequired: 100 },
          { id: "ai-math-3", level: "advanced", title: "Math Wizard", description: "Apply math to ML algorithms. Understand optimization theory", emoji: "🔥", xpRequired: 250 },
        ],
      },
      {
        name: "AI & Machine Learning",
        emoji: "🤖",
        levels: [
          { id: "ai-ml-1", level: "beginner", title: "AI Explorer", description: "Understand what AI is, play with Teachable Machine", emoji: "🌱", xpRequired: 0 },
          { id: "ai-ml-2", level: "intermediate", title: "Model Builder", description: "Train your own ML models. Learn about neural networks", emoji: "⚡", xpRequired: 150 },
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
          { id: "arch-draw-1", level: "beginner", title: "First Sketches", description: "Learn basic drawing, perspective, and floor plans", emoji: "🌱", xpRequired: 0 },
          { id: "arch-draw-2", level: "intermediate", title: "Design Thinker", description: "Create detailed designs with measurements and scale", emoji: "⚡", xpRequired: 100 },
          { id: "arch-draw-3", level: "advanced", title: "Master Designer", description: "Create professional-quality architectural drawings", emoji: "🔥", xpRequired: 250 },
        ],
      },
      {
        name: "3D Modeling",
        emoji: "🏗️",
        levels: [
          { id: "arch-3d-1", level: "beginner", title: "3D Starter", description: "Learn SketchUp or Tinkercad basics", emoji: "🌱", xpRequired: 0 },
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
          { id: "ent-fin-1", level: "beginner", title: "Money Basics", description: "Learn budgeting, saving, and basic financial terms", emoji: "🌱", xpRequired: 0 },
          { id: "ent-fin-2", level: "intermediate", title: "Money Manager", description: "Create budgets, understand profit/loss, pricing", emoji: "⚡", xpRequired: 80 },
          { id: "ent-fin-3", level: "advanced", title: "Finance Pro", description: "Understand investment, fundraising, and financial planning", emoji: "🔥", xpRequired: 200 },
        ],
      },
    ],
  },
];

export function getSkillPathForCareer(careerId: string): SkillPath | undefined {
  return skillPaths.find((s) => s.careerId === careerId);
}
