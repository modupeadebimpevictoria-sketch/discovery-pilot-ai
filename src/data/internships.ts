export interface Internship {
  id: string;
  careerId: string;
  title: string;
  company: string;
  location: string;
  type: "In-Person" | "Remote" | "Hybrid";
  duration: string;
  description: string;
  emoji: string;
  requirements: string[];
  applyUrl?: string;
}

export const internships: Internship[] = [
  // AI Engineer
  { id: "int-ai-1", careerId: "ai-engineer", title: "Junior AI Intern", company: "Google DeepMind (Youth Programme)", location: "Lagos / Remote", type: "Hybrid", duration: "4 weeks", description: "Shadow AI researchers and learn how machine learning models are built. Perfect for students who love maths and coding!", emoji: "🤖", requirements: ["Year 10+", "Basic coding knowledge", "Love for maths"] },
  { id: "int-ai-2", careerId: "ai-engineer", title: "Tech Discovery Week", company: "Andela", location: "Lagos, Nigeria", type: "In-Person", duration: "1 week", description: "Spend a week at one of Africa's top tech companies. See how software and AI products are built from scratch.", emoji: "💻", requirements: ["Year 10+", "Curiosity about tech"] },
  // Dentist
  { id: "int-d-1", careerId: "dentist", title: "Dental Clinic Shadow", company: "Local Dental Clinics", location: "Your city", type: "In-Person", duration: "1-2 weeks", description: "Follow a dentist for a week and see what a real dental practice looks like. Watch procedures, meet patients, and learn!", emoji: "🦷", requirements: ["Year 10+", "Interest in healthcare"] },
  // Architect
  { id: "int-arch-1", careerId: "architect", title: "Architecture Studio Intern", company: "Local Architecture Firms", location: "Your city", type: "In-Person", duration: "2 weeks", description: "Work alongside architects as they design buildings. You'll learn about blueprints, 3D models, and site visits!", emoji: "🏗️", requirements: ["Year 10+", "Interest in design", "Basic drawing skills helpful"] },
  // Journalist
  { id: "int-j-1", careerId: "journalist", title: "Junior Reporter Programme", company: "The Guardian Nigeria / Punch", location: "Lagos / Remote", type: "Hybrid", duration: "2 weeks", description: "Learn from real journalists. You'll attend editorial meetings, write articles, and learn about digital media.", emoji: "📰", requirements: ["Year 10+", "Good writing skills", "Curious mind"] },
  // Entrepreneur
  { id: "int-e-1", careerId: "entrepreneur", title: "Startup Shadowing", company: "CcHub / Techstars Lagos", location: "Lagos, Nigeria", type: "In-Person", duration: "1 week", description: "Spend time at a startup hub and see how entrepreneurs build companies. Meet founders and learn how ideas become businesses!", emoji: "🚀", requirements: ["Year 10+", "Business curiosity"] },
  // Software Engineer
  { id: "int-se-1", careerId: "software-engineer", title: "Code Camp Intern", company: "Flutterwave / Paystack", location: "Lagos / Remote", type: "Hybrid", duration: "4 weeks", description: "Join a fintech company's junior programme. Learn how real software is built and shipped to millions of users!", emoji: "💻", requirements: ["Year 10+", "Basic coding knowledge"] },
  // Game Developer
  { id: "int-gd-1", careerId: "game-developer", title: "Game Studio Tour", company: "Local Game Studios", location: "Your city / Remote", type: "Hybrid", duration: "1 week", description: "Visit a game studio and see how games go from idea to finished product. You might even test unreleased games!", emoji: "🎮", requirements: ["Year 10+", "Love for gaming"] },
  // Music Producer
  { id: "int-mp-1", careerId: "music-producer", title: "Studio Session Shadow", company: "Local Recording Studios", location: "Your city", type: "In-Person", duration: "1 week", description: "Sit in on real recording sessions. Learn about mixing, mastering, and how hits are made!", emoji: "🎵", requirements: ["Year 10+", "Passion for music"] },
  // Film Director
  { id: "int-fd-1", careerId: "film-director", title: "Film Set Experience", company: "Nollywood Studios", location: "Lagos, Nigeria", type: "In-Person", duration: "1 week", description: "Experience a real film set! See how directors, camera operators, and editors work together to make movies.", emoji: "🎬", requirements: ["Year 10+", "Interest in storytelling"] },
  // Chef
  { id: "int-chef-1", careerId: "chef", title: "Kitchen Apprentice", company: "Local Restaurants & Hotels", location: "Your city", type: "In-Person", duration: "2 weeks", description: "Work in a real kitchen! Learn cooking techniques, food safety, and what it takes to run a busy restaurant.", emoji: "👨‍🍳", requirements: ["Year 10+", "Love for cooking"] },
  // Climate Scientist
  { id: "int-cs-1", careerId: "climate-scientist", title: "Environmental Research Assistant", company: "University Labs / NESREA", location: "Your city / Remote", type: "Hybrid", duration: "2 weeks", description: "Help with real environmental research. Collect data, learn about climate models, and see science in action!", emoji: "🌡️", requirements: ["Year 10+", "Good at science", "Interest in the environment"] },
  // Cybersecurity
  { id: "int-cyber-1", careerId: "cybersecurity-analyst", title: "Cyber Defence Workshop", company: "CyberSafe Foundation", location: "Lagos / Remote", type: "Remote", duration: "1 week", description: "Learn the basics of cybersecurity from experts. Practice finding vulnerabilities and defending against attacks!", emoji: "🔐", requirements: ["Year 10+", "Basic computer skills"] },
  // Psychologist
  { id: "int-psych-1", careerId: "psychologist", title: "Mental Health Awareness Volunteer", company: "Mental Health Foundation Nigeria", location: "Your city / Remote", type: "Hybrid", duration: "2 weeks", description: "Help create mental health awareness materials and learn about psychology from professionals.", emoji: "🧠", requirements: ["Year 10+", "Empathy and good listening"] },
  // Fashion Designer
  { id: "int-fashion-1", careerId: "fashion-designer", title: "Fashion House Intern", company: "Local Fashion Brands", location: "Lagos / Your city", type: "In-Person", duration: "2 weeks", description: "See the fashion world from the inside! Learn about design, fabric selection, and how collections come to life.", emoji: "👗", requirements: ["Year 10+", "Creative & interested in fashion"] },
];

export function getInternshipsByCareer(careerId: string): Internship[] {
  return internships.filter((i) => i.careerId === careerId);
}
