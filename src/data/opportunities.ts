export type OpportunityType = "scholarship" | "competition" | "course" | "program" | "workshop" | "internship";

export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  description: string;
  emoji: string;
  link: string;
  deadline?: string;
  relatedCareers: string[]; // career IDs
  location: string; // "Nigeria" | "Global" | "Online"
  ageRange?: string;
  isFree: boolean;
}

export const opportunities: Opportunity[] = [
  // Scholarships
  { id: "opp-1", title: "MTN Foundation Scholarship", type: "scholarship", description: "Annual scholarship for Nigerian students with strong academics. Covers tuition and living expenses.", emoji: "🎓", link: "https://www.mtnonline.com/foundation", deadline: "October", relatedCareers: ["ai-engineer", "data-scientist", "software-engineer", "entrepreneur"], location: "Nigeria", isFree: true },
  { id: "opp-2", title: "Mastercard Foundation Scholars", type: "scholarship", description: "Full scholarships for talented African students at top universities worldwide.", emoji: "🌍", link: "https://mastercardfdn.org/all/scholars/", deadline: "Various", relatedCareers: ["ai-engineer", "climate-scientist", "entrepreneur", "diplomat"], location: "Global", isFree: true },
  { id: "opp-3", title: "Shell Nigeria Scholarship", type: "scholarship", description: "Scholarship for Nigerian students in STEM fields at Nigerian universities.", emoji: "🛢️", link: "https://www.shell.com.ng", deadline: "August", relatedCareers: ["aerospace-engineer", "robotics-engineer", "climate-scientist", "data-scientist"], location: "Nigeria", isFree: true },

  // Competitions
  { id: "opp-4", title: "Google Science Fair", type: "competition", description: "Global science and engineering competition for students aged 13-18.", emoji: "🔬", link: "https://sciencefair.googleblog.com", deadline: "March", relatedCareers: ["ai-engineer", "aerospace-engineer", "climate-scientist", "robotics-engineer"], location: "Global", ageRange: "13-18", isFree: true },
  { id: "opp-5", title: "COWBELL Mathematics Competition", type: "competition", description: "National mathematics competition for Nigerian secondary school students.", emoji: "🧮", link: "https://www.cowbellpedia.ng", deadline: "January", relatedCareers: ["ai-engineer", "data-scientist", "aerospace-engineer", "investment-banker"], location: "Nigeria", ageRange: "13-17", isFree: true },
  { id: "opp-6", title: "Africa Code Week", type: "competition", description: "Coding workshops and competitions across Africa for young learners.", emoji: "💻", link: "https://africacodeweek.org", deadline: "October", relatedCareers: ["ai-engineer", "software-engineer", "game-developer", "data-scientist"], location: "Nigeria", ageRange: "13-18", isFree: true },
  { id: "opp-7", title: "Young Entrepreneurs Competition", type: "competition", description: "Pitch your business idea to a panel of judges and win funding.", emoji: "🚀", link: "#", deadline: "April", relatedCareers: ["entrepreneur"], location: "Nigeria", ageRange: "15-18", isFree: true },

  // Online Courses
  { id: "opp-8", title: "CS50 by Harvard (Free)", type: "course", description: "World-famous intro to computer science. Free on edX. Perfect for beginners.", emoji: "🎓", link: "https://cs50.harvard.edu", relatedCareers: ["ai-engineer", "software-engineer", "game-developer", "data-scientist"], location: "Online", isFree: true },
  { id: "opp-9", title: "Coursera - AI for Everyone", type: "course", description: "Andrew Ng's beginner-friendly AI course. Learn what AI can do without coding.", emoji: "🤖", link: "https://www.coursera.org/learn/ai-for-everyone", relatedCareers: ["ai-engineer", "data-scientist"], location: "Online", isFree: true },
  { id: "opp-10", title: "Khan Academy", type: "course", description: "Free maths, science, and computing courses. Go at your own pace.", emoji: "📐", link: "https://www.khanacademy.org", relatedCareers: ["ai-engineer", "data-scientist", "aerospace-engineer", "climate-scientist", "surgeon", "dentist"], location: "Online", isFree: true },
  { id: "opp-11", title: "Buildspace", type: "course", description: "Build real projects and get feedback from a community of builders.", emoji: "🛠️", link: "https://buildspace.so", relatedCareers: ["software-engineer", "entrepreneur", "game-developer"], location: "Online", isFree: true },

  // Programs
  { id: "opp-12", title: "Andela Learning Community", type: "program", description: "Free learning program for aspiring African developers. Learn with a cohort.", emoji: "🌍", link: "https://www.andela.com", relatedCareers: ["ai-engineer", "software-engineer", "data-scientist", "game-developer"], location: "Nigeria", isFree: true },
  { id: "opp-13", title: "CcHub Design Lab", type: "program", description: "Innovation hub in Lagos offering workshops, mentorship, and workspace for young innovators.", emoji: "🏙️", link: "https://cchubnigeria.com", relatedCareers: ["entrepreneur", "ux-designer", "software-engineer"], location: "Nigeria", isFree: true },
  { id: "opp-14", title: "Tony Elumelu Foundation", type: "program", description: "Entrepreneurship program for young Africans. $5,000 seed funding and mentorship.", emoji: "💼", link: "https://www.tonyelumelufoundation.org", deadline: "March", relatedCareers: ["entrepreneur"], location: "Nigeria", isFree: true },

  // Workshops
  { id: "opp-15", title: "Google Developer Groups", type: "workshop", description: "Local tech meetups and workshops across Nigeria. Free to attend.", emoji: "🤝", link: "https://gdg.community.dev", relatedCareers: ["ai-engineer", "software-engineer", "data-scientist"], location: "Nigeria", isFree: true },
  { id: "opp-16", title: "Creative Design Workshops (Canva)", type: "workshop", description: "Free online workshops to learn graphic design and visual communication.", emoji: "🎨", link: "https://www.canva.com/designschool/", relatedCareers: ["ux-designer", "architect", "fashion-designer"], location: "Online", isFree: true },
];

export function getOpportunitiesForCareer(careerId: string): Opportunity[] {
  return opportunities.filter((o) => o.relatedCareers.includes(careerId));
}

export function getOpportunitiesByType(type: OpportunityType): Opportunity[] {
  return opportunities.filter((o) => o.type === type);
}
