export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  emoji: string;
  ageRange: string;
  category: "subjects" | "extracurricular" | "skills" | "projects" | "competitions" | "internships" | "university";
  xpReward: number;
}

export interface CareerRoadmap {
  careerId: string;
  milestones: RoadmapMilestone[];
}

const genericMilestones = (careerId: string, title: string): RoadmapMilestone[] => [
  { id: `${careerId}-r1`, title: "Take the Career Quiz", description: "Discover your interests and strengths", emoji: "🧭", ageRange: "13-14", category: "skills", xpReward: 20 },
  { id: `${careerId}-r2`, title: "Explore Different Careers", description: "Read about at least 5 different career options", emoji: "🔍", ageRange: "13-14", category: "skills", xpReward: 20 },
];

export const careerRoadmaps: CareerRoadmap[] = [
  {
    careerId: "ai-engineer",
    milestones: [
      ...genericMilestones("ai", "AI Engineer"),
      { id: "ai-r3", title: "Start Learning Python", description: "Complete a beginner Python course on Codecademy or freeCodeCamp", emoji: "🐍", ageRange: "13-14", category: "skills", xpReward: 50 },
      { id: "ai-r4", title: "Excel in Mathematics", description: "Focus on algebra, statistics and calculus in school", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 30 },
      { id: "ai-r5", title: "Join a Coding Club", description: "Find or start a coding club at your school", emoji: "💻", ageRange: "14-15", category: "extracurricular", xpReward: 30 },
      { id: "ai-r6", title: "Build Your First AI Project", description: "Use Teachable Machine or simple ML tools to build something", emoji: "🤖", ageRange: "15-16", category: "projects", xpReward: 60 },
      { id: "ai-r7", title: "Enter a STEM Competition", description: "Participate in a science fair, hackathon, or coding contest", emoji: "🏆", ageRange: "15-16", category: "competitions", xpReward: 50 },
      { id: "ai-r8", title: "Learn Data Science Basics", description: "Understand data visualization, pandas, and basic statistics", emoji: "📊", ageRange: "16-17", category: "skills", xpReward: 50 },
      { id: "ai-r9", title: "Complete an Online AI Course", description: "Finish a course on Coursera, edX or Khan Academy", emoji: "🎓", ageRange: "16-17", category: "skills", xpReward: 60 },
      { id: "ai-r10", title: "Build a Portfolio Project", description: "Create an AI-powered app or tool you can show universities", emoji: "🚀", ageRange: "17-18", category: "projects", xpReward: 80 },
      { id: "ai-r11", title: "Get a Tech Internship or Shadow", description: "Work with a tech company or professional for a few weeks", emoji: "👔", ageRange: "17-18", category: "internships", xpReward: 70 },
      { id: "ai-r12", title: "Research University Programs", description: "Identify top CS/AI programs and their requirements", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40 },
      { id: "ai-r13", title: "Prepare University Applications", description: "Write personal statements, gather references, submit applications", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
    ],
  },
  {
    careerId: "architect",
    milestones: [
      ...genericMilestones("arch", "Architect"),
      { id: "arch-r3", title: "Take Art & Design Seriously", description: "Focus on art, design technology, and mathematics in school", emoji: "🎨", ageRange: "13-14", category: "subjects", xpReward: 30 },
      { id: "arch-r4", title: "Learn to Sketch", description: "Practice drawing buildings, floor plans, and spaces", emoji: "✏️", ageRange: "14-15", category: "skills", xpReward: 40 },
      { id: "arch-r5", title: "Learn SketchUp or Floorplanner", description: "Use free 3D modeling tools to design buildings", emoji: "🏗️", ageRange: "14-15", category: "skills", xpReward: 50 },
      { id: "arch-r6", title: "Visit Interesting Buildings", description: "Explore architecture in your city and take photos", emoji: "📸", ageRange: "15-16", category: "extracurricular", xpReward: 30 },
      { id: "arch-r7", title: "Enter a Design Competition", description: "Submit a design to a student architecture or art contest", emoji: "🏆", ageRange: "15-16", category: "competitions", xpReward: 50 },
      { id: "arch-r8", title: "Build a Design Portfolio", description: "Collect your best sketches, models, and 3D designs", emoji: "📁", ageRange: "16-17", category: "projects", xpReward: 60 },
      { id: "arch-r9", title: "Shadow an Architect", description: "Spend time with a practising architect to see the job", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 60 },
      { id: "arch-r10", title: "Learn About Sustainability", description: "Study green building and sustainable design principles", emoji: "🌱", ageRange: "17-18", category: "skills", xpReward: 40 },
      { id: "arch-r11", title: "Research Architecture Schools", description: "Find top architecture programs and their requirements", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40 },
      { id: "arch-r12", title: "Prepare Your Portfolio & Applications", description: "Finalize portfolio and submit university applications", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
    ],
  },
  {
    careerId: "aerospace-engineer",
    milestones: [
      ...genericMilestones("aero", "Aerospace Engineer"),
      { id: "aero-r3", title: "Master Physics & Maths", description: "Focus on physics, advanced maths, and further maths", emoji: "🔬", ageRange: "14-15", category: "subjects", xpReward: 40 },
      { id: "aero-r4", title: "Join a Robotics or Science Club", description: "Get hands-on with engineering and building things", emoji: "🦾", ageRange: "14-15", category: "extracurricular", xpReward: 30 },
      { id: "aero-r5", title: "Build a Model Rocket", description: "Design and launch a model rocket to learn aerodynamics", emoji: "🚀", ageRange: "15-16", category: "projects", xpReward: 50 },
      { id: "aero-r6", title: "Learn CAD Software", description: "Learn Fusion 360 or Tinkercad for engineering design", emoji: "💻", ageRange: "15-16", category: "skills", xpReward: 50 },
      { id: "aero-r7", title: "Enter a STEM Competition", description: "Compete in science olympiad, rocketry, or robotics", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60 },
      { id: "aero-r8", title: "Study Aerodynamics Basics", description: "Learn about lift, drag, thrust through online resources", emoji: "✈️", ageRange: "16-17", category: "skills", xpReward: 50 },
      { id: "aero-r9", title: "Visit an Aerospace Facility", description: "Tour a space centre, aviation museum, or factory", emoji: "🏭", ageRange: "17-18", category: "extracurricular", xpReward: 30 },
      { id: "aero-r10", title: "Apply to Engineering Programs", description: "Target top aerospace/mechanical engineering programs", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
    ],
  },
  {
    careerId: "entrepreneur",
    milestones: [
      ...genericMilestones("ent", "Entrepreneur"),
      { id: "ent-r3", title: "Read Business Books", description: "Read 'Rich Dad Poor Dad' or similar teen-friendly business books", emoji: "📚", ageRange: "13-14", category: "skills", xpReward: 30 },
      { id: "ent-r4", title: "Start a Small Side Project", description: "Sell something at school, start a social media page, or tutor", emoji: "💡", ageRange: "14-15", category: "projects", xpReward: 50 },
      { id: "ent-r5", title: "Learn Financial Literacy", description: "Understand budgets, profit/loss, and basic accounting", emoji: "💰", ageRange: "15-16", category: "skills", xpReward: 40 },
      { id: "ent-r6", title: "Join a Business Competition", description: "Enter a young entrepreneurs challenge or pitch competition", emoji: "🏆", ageRange: "15-16", category: "competitions", xpReward: 50 },
      { id: "ent-r7", title: "Build a Real Product or Service", description: "Create something people actually pay for", emoji: "🚀", ageRange: "16-17", category: "projects", xpReward: 70 },
      { id: "ent-r8", title: "Network with Entrepreneurs", description: "Attend startup events, connect with mentors", emoji: "🤝", ageRange: "16-17", category: "extracurricular", xpReward: 40 },
      { id: "ent-r9", title: "Apply to Business Programs", description: "Research business/economics degrees or startup accelerators", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
    ],
  },
  {
    careerId: "data-scientist",
    milestones: [
      ...genericMilestones("ds", "Data Scientist"),
      { id: "ds-r3", title: "Excel at Statistics", description: "Focus on maths and statistics in school", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 30 },
      { id: "ds-r4", title: "Learn Excel & Google Sheets", description: "Master spreadsheets, charts, and basic data analysis", emoji: "📊", ageRange: "14-15", category: "skills", xpReward: 40 },
      { id: "ds-r5", title: "Start Learning Python", description: "Begin with data-focused Python (pandas, matplotlib)", emoji: "🐍", ageRange: "15-16", category: "skills", xpReward: 50 },
      { id: "ds-r6", title: "Analyse a Real Dataset", description: "Find a public dataset and create visualizations", emoji: "📈", ageRange: "15-16", category: "projects", xpReward: 50 },
      { id: "ds-r7", title: "Enter a Data Competition", description: "Try a beginner Kaggle competition or data challenge", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60 },
      { id: "ds-r8", title: "Build a Data Portfolio", description: "Create 2-3 data analysis projects you can show", emoji: "📁", ageRange: "17-18", category: "projects", xpReward: 60 },
      { id: "ds-r9", title: "Apply to Data/CS Programs", description: "Target statistics, CS, or data science programs", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
    ],
  },
];

export function getRoadmapForCareer(careerId: string): CareerRoadmap | undefined {
  return careerRoadmaps.find((r) => r.careerId === careerId);
}

// Generate a generic roadmap for careers without specific ones
export function getOrCreateRoadmap(careerId: string, careerTitle: string): CareerRoadmap {
  const existing = getRoadmapForCareer(careerId);
  if (existing) return existing;
  
  return {
    careerId,
    milestones: [
      { id: `${careerId}-g1`, title: "Take the Career Quiz", description: "Discover your interests and strengths", emoji: "🧭", ageRange: "13-14", category: "skills", xpReward: 20 },
      { id: `${careerId}-g2`, title: "Explore Different Careers", description: "Read about at least 5 different career options", emoji: "🔍", ageRange: "13-14", category: "skills", xpReward: 20 },
      { id: `${careerId}-g3`, title: "Focus on Key Subjects", description: `Study the subjects most relevant to becoming a ${careerTitle}`, emoji: "📚", ageRange: "14-15", category: "subjects", xpReward: 30 },
      { id: `${careerId}-g4`, title: "Join a Related Club", description: `Find extracurricular activities related to ${careerTitle}`, emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 30 },
      { id: `${careerId}-g5`, title: "Build a Beginner Project", description: `Create something small related to ${careerTitle}`, emoji: "🛠️", ageRange: "15-16", category: "projects", xpReward: 50 },
      { id: `${careerId}-g6`, title: "Develop Core Skills", description: `Practice the key skills needed for ${careerTitle}`, emoji: "⚡", ageRange: "15-16", category: "skills", xpReward: 40 },
      { id: `${careerId}-g7`, title: "Enter a Competition", description: "Participate in a relevant contest or challenge", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 50 },
      { id: `${careerId}-g8`, title: "Get Real-World Experience", description: "Shadow a professional or do an internship", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 60 },
      { id: `${careerId}-g9`, title: "Build Your Portfolio", description: "Collect your best work to show universities", emoji: "📁", ageRange: "17-18", category: "projects", xpReward: 60 },
      { id: `${careerId}-g10`, title: "Research University Programs", description: "Find the best programs for your career goal", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40 },
      { id: `${careerId}-g11`, title: "Submit University Applications", description: "Write personal statements and apply!", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
    ],
  };
}
