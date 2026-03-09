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

// Family-specific milestone templates that generate relevant steps
const familyMilestoneTemplates: Record<string, (id: string, title: string) => RoadmapMilestone[]> = {
  "creative-design": (id, title) => [
    { id: `${id}-f1`, title: "Start a Sketchbook or Design Journal", description: "Draw, doodle and collect visual inspiration every week", emoji: "✏️", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Take Art & Design Seriously at School", description: "Focus on art, design technology, and visual arts subjects", emoji: "🎨", ageRange: "14-15", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Learn a Design Tool", description: "Try Canva, Figma, or Adobe Express — start creating digital work", emoji: "💻", ageRange: "14-15", category: "skills", xpReward: 50 },
    { id: `${id}-f4`, title: "Join a Creative Club or Community", description: "Find a school art club, online design community or local workshop", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 30 },
    { id: `${id}-f5`, title: "Complete Your First Real Design Project", description: `Create something related to ${title} — a poster, logo, or concept`, emoji: "🎯", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f6`, title: "Study Colour Theory & Typography", description: "Learn the fundamentals that make great design", emoji: "🌈", ageRange: "15-16", category: "skills", xpReward: 40 },
    { id: `${id}-f7`, title: "Enter a Design Competition", description: "Submit work to a student art/design contest or exhibition", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 50 },
    { id: `${id}-f8`, title: "Build a Portfolio Website", description: "Showcase your best 5-10 pieces online using a free website builder", emoji: "🌐", ageRange: "16-17", category: "projects", xpReward: 60 },
    { id: `${id}-f9`, title: "Shadow a Professional Designer", description: `Spend time with someone working as a ${title} or similar role`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 60 },
    { id: `${id}-f10`, title: "Take an Online Design Course", description: "Complete a course on Skillshare, Coursera, or YouTube", emoji: "🎓", ageRange: "17-18", category: "skills", xpReward: 50 },
    { id: `${id}-f11`, title: "Research Design Programs & Schools", description: "Find the best design/art programs and their requirements", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40 },
    { id: `${id}-f12`, title: "Prepare Portfolio & Applications", description: "Finalize your portfolio and submit university applications", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],
  "technology": (id, title) => [
    { id: `${id}-f1`, title: "Try Your First Lines of Code", description: "Start with Scratch, Python, or HTML — just build something!", emoji: "💻", ageRange: "13-14", category: "skills", xpReward: 40 },
    { id: `${id}-f2`, title: "Excel in Maths & Computer Science", description: "Focus on maths, ICT and any programming subjects available", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Join a Coding Club or Hackathon", description: "Find a school coding club, CoderDojo, or online community", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 30 },
    { id: `${id}-f4`, title: "Complete a Programming Course", description: "Finish a beginner course on freeCodeCamp, Codecademy, or Khan Academy", emoji: "🎓", ageRange: "14-15", category: "skills", xpReward: 50 },
    { id: `${id}-f5`, title: "Build Your First Real Project", description: `Create an app, website, or tool related to ${title}`, emoji: "🚀", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f6`, title: "Learn About the Industry", description: `Watch talks, read articles, and follow people working as ${title}s`, emoji: "📰", ageRange: "15-16", category: "skills", xpReward: 30 },
    { id: `${id}-f7`, title: "Enter a Tech Competition", description: "Compete in a hackathon, science fair, or coding challenge", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60 },
    { id: `${id}-f8`, title: "Build a Portfolio of Projects", description: "Create 2-3 projects you can show on GitHub or a personal site", emoji: "📁", ageRange: "16-17", category: "projects", xpReward: 60 },
    { id: `${id}-f9`, title: "Get Real-World Tech Experience", description: "Shadow a tech professional, do an internship, or contribute to open source", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f10`, title: "Learn Advanced Topics", description: `Study specialised areas related to ${title} through online courses`, emoji: "🧠", ageRange: "17-18", category: "skills", xpReward: 50 },
    { id: `${id}-f11`, title: "Research CS & Tech Programs", description: "Find top computer science or technology programs", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40 },
    { id: `${id}-f12`, title: "Submit Applications", description: "Write personal statements highlighting your projects and apply!", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],
  "healthcare-medicine": (id, title) => [
    { id: `${id}-f1`, title: "Learn First Aid & CPR", description: "Get a basic first aid certificate — it's free at many organisations", emoji: "🩹", ageRange: "13-14", category: "skills", xpReward: 40 },
    { id: `${id}-f2`, title: "Focus on Biology & Chemistry", description: "These are essential subjects for any healthcare career", emoji: "🔬", ageRange: "14-15", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Also Study Maths & Physics", description: "Strong maths and science grades open more doors", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 30 },
    { id: `${id}-f4`, title: "Volunteer at a Care Home or Hospital", description: "Get experience helping and caring for people", emoji: "🏥", ageRange: "14-15", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f5`, title: "Join a Science or Health Club", description: "Find school clubs focused on biology, health, or medicine", emoji: "🤝", ageRange: "15-16", category: "extracurricular", xpReward: 30 },
    { id: `${id}-f6`, title: "Shadow a Healthcare Professional", description: `Spend time with someone working in ${title} or a related field`, emoji: "👔", ageRange: "15-16", category: "internships", xpReward: 60 },
    { id: `${id}-f7`, title: "Research the Healthcare Pathway", description: `Understand exactly what qualifications you need for ${title}`, emoji: "📋", ageRange: "16-17", category: "skills", xpReward: 30 },
    { id: `${id}-f8`, title: "Complete a Health Science Course", description: "Take an online anatomy, biology, or health course", emoji: "🎓", ageRange: "16-17", category: "skills", xpReward: 50 },
    { id: `${id}-f9`, title: "Get More Clinical Experience", description: "Build up hours volunteering or working in healthcare settings", emoji: "🩺", ageRange: "16-17", category: "internships", xpReward: 60 },
    { id: `${id}-f10`, title: "Prepare for Entrance Exams", description: "Study for UCAT, BMAT, MCAT or other required exams", emoji: "📝", ageRange: "17-18", category: "skills", xpReward: 60 },
    { id: `${id}-f11`, title: "Research Medical/Health Programs", description: "Find the best healthcare programs and entry requirements", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40 },
    { id: `${id}-f12`, title: "Submit Applications & Personal Statement", description: "Write about your motivation and healthcare experience", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],
  "business-entrepreneurship": (id, title) => [
    { id: `${id}-f1`, title: "Read a Business Book", description: "Try 'Rich Dad Poor Dad', 'The Lean Startup', or 'Start With Why'", emoji: "📚", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Focus on Maths, English & Economics", description: "Strong communication and number skills are essential in business", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Start a Small Side Project", description: "Sell something, start a service, or run a social media page", emoji: "💡", ageRange: "14-15", category: "projects", xpReward: 50 },
    { id: `${id}-f4`, title: "Learn Financial Literacy", description: "Understand budgets, profit/loss, savings and basic accounting", emoji: "💰", ageRange: "15-16", category: "skills", xpReward: 40 },
    { id: `${id}-f5`, title: "Join a Young Enterprise Programme", description: "Participate in a school business competition or entrepreneur club", emoji: "🏆", ageRange: "15-16", category: "competitions", xpReward: 50 },
    { id: `${id}-f6`, title: "Build Something People Pay For", description: "Create a product or service with real customers", emoji: "🚀", ageRange: "15-16", category: "projects", xpReward: 70 },
    { id: `${id}-f7`, title: "Shadow a Business Professional", description: `Spend time with someone working as a ${title} or in business`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 60 },
    { id: `${id}-f8`, title: "Network with Entrepreneurs", description: "Attend startup events, find mentors, connect on LinkedIn", emoji: "🤝", ageRange: "16-17", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f9`, title: "Learn Digital Marketing Basics", description: "Understand social media marketing, SEO, and branding", emoji: "📣", ageRange: "17-18", category: "skills", xpReward: 40 },
    { id: `${id}-f10`, title: "Research Business Programs", description: "Find top business, economics, or management programs", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40 },
    { id: `${id}-f11`, title: "Apply to University or Accelerators", description: "Submit applications with a strong personal statement about your ventures", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],
  "engineering-architecture": (id, title) => [
    { id: `${id}-f1`, title: "Build Something With Your Hands", description: "Try woodwork, 3D printing, model building, or electronics kits", emoji: "🔧", ageRange: "13-14", category: "skills", xpReward: 40 },
    { id: `${id}-f2`, title: "Excel in Maths, Physics & Design Tech", description: "These are the core subjects for any engineering career", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Learn CAD Software", description: "Try Tinkercad, Fusion 360, or SketchUp for 3D design", emoji: "💻", ageRange: "14-15", category: "skills", xpReward: 50 },
    { id: `${id}-f4`, title: "Join a Robotics or STEM Club", description: "Get hands-on with engineering projects at school", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 30 },
    { id: `${id}-f5`, title: "Complete an Engineering Project", description: `Design and build something related to ${title}`, emoji: "🏗️", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f6`, title: "Enter a STEM Competition", description: "Compete in a science fair, robotics challenge, or engineering contest", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60 },
    { id: `${id}-f7`, title: "Shadow an Engineer or Architect", description: `Visit a workplace and see what ${title}s do daily`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 60 },
    { id: `${id}-f8`, title: "Study Sustainability & Materials", description: "Learn about green engineering, materials science, and modern methods", emoji: "🌱", ageRange: "16-17", category: "skills", xpReward: 40 },
    { id: `${id}-f9`, title: "Build a Technical Portfolio", description: "Document your projects with photos, sketches, and write-ups", emoji: "📁", ageRange: "17-18", category: "projects", xpReward: 60 },
    { id: `${id}-f10`, title: "Research Engineering Programs", description: "Find top engineering or architecture programs and requirements", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40 },
    { id: `${id}-f11`, title: "Submit Applications", description: "Apply with a strong personal statement and portfolio", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],
  "science-research": (id, title) => [
    { id: `${id}-f1`, title: "Fall in Love with Science", description: "Watch science documentaries, read popular science books, ask big questions", emoji: "🔬", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Excel in Science & Maths", description: "Focus on biology, chemistry, physics, and mathematics", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Start a Lab Notebook", description: "Record observations, experiments, and ideas like a real scientist", emoji: "📓", ageRange: "14-15", category: "skills", xpReward: 30 },
    { id: `${id}-f4`, title: "Join a Science Club or Society", description: "Connect with other curious minds at school or online", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 30 },
    { id: `${id}-f5`, title: "Conduct Your Own Experiment", description: `Design a research project related to ${title}`, emoji: "🧪", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f6`, title: "Learn Data Analysis Basics", description: "Understand graphs, statistics, and how to interpret results", emoji: "📊", ageRange: "15-16", category: "skills", xpReward: 40 },
    { id: `${id}-f7`, title: "Enter a Science Competition", description: "Submit a project to a science fair, olympiad, or research contest", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60 },
    { id: `${id}-f8`, title: "Get Lab or Research Experience", description: "Shadow a researcher, volunteer in a lab, or assist on a project", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Read Scientific Papers", description: "Start reading journal articles in your area of interest", emoji: "📄", ageRange: "17-18", category: "skills", xpReward: 40 },
    { id: `${id}-f10`, title: "Research Science Programs", description: "Find the best science or research-focused university programs", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40 },
    { id: `${id}-f11`, title: "Apply to University", description: "Submit applications with your research experience front and center", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],
  "media-content": (id, title) => [
    { id: `${id}-f1`, title: "Start Creating Content", description: "Write a blog, start a YouTube channel, or make TikToks — just start!", emoji: "📱", ageRange: "13-14", category: "skills", xpReward: 40 },
    { id: `${id}-f2`, title: "Study English, Media & Communications", description: "Focus on writing, storytelling, and media studies at school", emoji: "📚", ageRange: "14-15", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Learn a Content Tool", description: "Try video editing (CapCut), writing (Google Docs), or design (Canva)", emoji: "💻", ageRange: "14-15", category: "skills", xpReward: 50 },
    { id: `${id}-f4`, title: "Join a School Media Team", description: "Work on the school newspaper, magazine, podcast, or video team", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 30 },
    { id: `${id}-f5`, title: "Create a Serious Project", description: `Make a short film, article series, or podcast related to ${title}`, emoji: "🎬", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f6`, title: "Build an Online Presence", description: "Create a portfolio website or social media page for your work", emoji: "🌐", ageRange: "15-16", category: "projects", xpReward: 40 },
    { id: `${id}-f7`, title: "Enter a Creative Competition", description: "Submit to a film festival, writing competition, or content award", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 50 },
    { id: `${id}-f8`, title: "Get Industry Experience", description: `Shadow someone working as a ${title} or intern at a media company`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 60 },
    { id: `${id}-f9`, title: "Study Storytelling & Audience", description: "Learn how to tell compelling stories that connect with people", emoji: "🎯", ageRange: "17-18", category: "skills", xpReward: 40 },
    { id: `${id}-f10`, title: "Research Media & Communications Programs", description: "Find the best journalism, film, or media programs", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40 },
    { id: `${id}-f11`, title: "Apply with a Portfolio", description: "Submit applications with your best content pieces", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],
  "trades-technical": (id, title) => [
    { id: `${id}-f1`, title: "Start Working With Your Hands", description: "Try DIY projects, fix things at home, or take apart old electronics", emoji: "🔧", ageRange: "13-14", category: "skills", xpReward: 40 },
    { id: `${id}-f2`, title: "Focus on Practical Subjects", description: "Study design technology, physics, maths, and any vocational subjects", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Learn Safety & Tool Basics", description: "Understand workplace safety, basic tools, and professional standards", emoji: "⚠️", ageRange: "14-15", category: "skills", xpReward: 30 },
    { id: `${id}-f4`, title: "Find a Mentor or Local Professional", description: `Connect with someone working as a ${title} in your area`, emoji: "🤝", ageRange: "15-16", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f5`, title: "Complete a Practical Project", description: `Build, fix, or install something related to ${title}`, emoji: "🛠️", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f6`, title: "Get Work Experience", description: "Shadow a professional or do a short placement in the trade", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 60 },
    { id: `${id}-f7`, title: "Research Apprenticeships", description: "Find apprenticeship programmes with good employers", emoji: "🏭", ageRange: "16-17", category: "university", xpReward: 40 },
    { id: `${id}-f8`, title: "Get Your First Certification", description: "Complete any entry-level certificates or safety qualifications", emoji: "📜", ageRange: "16-17", category: "skills", xpReward: 50 },
    { id: `${id}-f9`, title: "Apply for Apprenticeships or College", description: "Apply to trade schools, apprenticeships, or vocational programs", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
    { id: `${id}-f10`, title: "Start Building Your Reputation", description: "Document your work, get references, and start networking", emoji: "🌟", ageRange: "17-18", category: "projects", xpReward: 40 },
  ],
  "sport-fitness": (id, title) => [
    { id: `${id}-f1`, title: "Train Consistently", description: "Commit to regular training and practice in your sport or fitness area", emoji: "💪", ageRange: "13-14", category: "skills", xpReward: 40 },
    { id: `${id}-f2`, title: "Study PE, Biology & Nutrition", description: "Understand the science behind sport and the human body", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Join Competitive Teams or Clubs", description: "Compete at school, local, or regional level", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f4`, title: "Learn About Sports Science", description: "Study how the body works, nutrition, and recovery", emoji: "🧠", ageRange: "15-16", category: "skills", xpReward: 40 },
    { id: `${id}-f5`, title: "Get a Coaching or First Aid Qualification", description: "Start building professional credentials early", emoji: "📜", ageRange: "15-16", category: "skills", xpReward: 50 },
    { id: `${id}-f6`, title: "Compete at a Higher Level", description: "Enter regional, national, or online competitions", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60 },
    { id: `${id}-f7`, title: "Shadow a Sports Professional", description: `Spend time with someone working as a ${title}`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 60 },
    { id: `${id}-f8`, title: "Build Your Profile", description: "Create a highlights reel, stats portfolio, or coaching log", emoji: "📁", ageRange: "17-18", category: "projects", xpReward: 50 },
    { id: `${id}-f9`, title: "Research Sports Programs & Scholarships", description: "Find sports science, coaching, or athletic scholarship programs", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40 },
    { id: `${id}-f10`, title: "Apply to Programs or Academies", description: "Submit applications to sports programs, academies, or degree courses", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],
};

// Map career family IDs to template keys
const familyToTemplate: Record<string, string> = {
  "creative-design": "creative-design",
  "media-content": "media-content",
  "entertainment-performance": "creative-design",
  "technology": "technology",
  "product-tech": "technology",
  "healthcare-medicine": "healthcare-medicine",
  "mental-health": "healthcare-medicine",
  "science-research": "science-research",
  "environment-sustainability": "science-research",
  "engineering-architecture": "engineering-architecture",
  "trades-technical": "trades-technical",
  "business-entrepreneurship": "business-entrepreneurship",
  "finance-investment": "business-entrepreneurship",
  "marketing-communications": "media-content",
  "law-justice": "business-entrepreneurship",
  "education-academia": "science-research",
  "social-impact": "business-entrepreneurship",
  "government-public-service": "business-entrepreneurship",
  "international-development": "business-entrepreneurship",
  "travel-hospitality": "business-entrepreneurship",
  "food-culinary": "trades-technical",
  "sport-fitness": "sport-fitness",
  "animals-nature": "science-research",
  "space-future-tech": "technology",
  "beauty-wellness": "trades-technical",
  "real-estate-property": "business-entrepreneurship",
};

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

// Generate a smart roadmap based on career family for careers without hand-crafted ones
export function getOrCreateRoadmap(careerId: string, careerTitle: string, familyId?: string): CareerRoadmap {
  const existing = getRoadmapForCareer(careerId);
  if (existing) return existing;

  // Try to get family-specific milestones
  const templateKey = familyId ? familyToTemplate[familyId] : undefined;
  const templateFn = templateKey ? familyMilestoneTemplates[templateKey] : undefined;

  if (templateFn) {
    return {
      careerId,
      milestones: [
        ...genericMilestones(careerId, careerTitle),
        ...templateFn(careerId, careerTitle),
      ],
    };
  }

  // Ultimate fallback — generic roadmap
  return {
    careerId,
    milestones: [
      { id: `${careerId}-g1`, title: "Take the Career Quiz", description: "Discover your interests and strengths", emoji: "🧭", ageRange: "13-14", category: "skills", xpReward: 20 },
      { id: `${careerId}-g2`, title: "Explore Different Careers", description: "Read about at least 5 different career options", emoji: "🔍", ageRange: "13-14", category: "skills", xpReward: 20 },
      { id: `${careerId}-g3`, title: "Focus on Key Subjects", description: `Study the subjects most relevant to becoming a ${careerTitle}`, emoji: "📚", ageRange: "14-15", category: "subjects", xpReward: 30 },
      { id: `${careerId}-g4`, title: "Join a Related Club or Community", description: `Find extracurricular activities connected to ${careerTitle}`, emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 30 },
      { id: `${careerId}-g5`, title: "Build a Beginner Project", description: `Create something small related to ${careerTitle}`, emoji: "🛠️", ageRange: "15-16", category: "projects", xpReward: 50 },
      { id: `${careerId}-g6`, title: "Develop Core Skills", description: `Practice the key skills needed for ${careerTitle}`, emoji: "⚡", ageRange: "15-16", category: "skills", xpReward: 40 },
      { id: `${careerId}-g7`, title: "Get Real-World Experience", description: `Shadow someone working as a ${careerTitle} or do work experience`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 60 },
      { id: `${careerId}-g8`, title: "Enter a Competition or Challenge", description: "Participate in a relevant contest to test your skills", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 50 },
      { id: `${careerId}-g9`, title: "Build Your Portfolio", description: "Collect your best work to show universities or employers", emoji: "📁", ageRange: "17-18", category: "projects", xpReward: 60 },
      { id: `${careerId}-g10`, title: "Research Programs & Pathways", description: "Find the best university, apprenticeship, or training programs", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40 },
      { id: `${careerId}-g11`, title: "Submit Applications", description: "Write personal statements and apply to your chosen programs!", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
    ],
  };
}
