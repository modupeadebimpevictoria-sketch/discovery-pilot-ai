export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  emoji: string;
  ageRange: string;
  category: "subjects" | "extracurricular" | "skills" | "projects" | "competitions" | "internships" | "university";
  xpReward: number;
  alternativePath?: string; // International or alternative option
}

export interface CareerRoadmap {
  careerId: string;
  milestones: RoadmapMilestone[];
}

// ═══════════════════════════════════════════════════════════════
// NIGERIA-SPECIFIC CAREER FAMILY ROADMAP TEMPLATES
// Each template references real Nigerian institutions, exams,
// competitions, organisations, and professional bodies.
// International alternatives are noted in alternativePath.
// ═══════════════════════════════════════════════════════════════

const familyMilestoneTemplates: Record<string, (id: string, title: string) => RoadmapMilestone[]> = {

  // ═══════════════════════════════════════════
  // 🎨 CREATIVE & DESIGN
  // ═══════════════════════════════════════════
  "creative-design": (id, title) => [
    { id: `${id}-f1`, title: "Start a Design/Sketch Journal", description: "Draw daily — sketch objects, patterns, logos. Build your visual thinking muscle", emoji: "✏️", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Take Fine Art & Basic Tech at School", description: "Choose Fine Art, Basic Technology and Computer Studies for JSCE. These build your design foundation", emoji: "🎨", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Learn Canva & Start Digital Design", description: "Create posters, social media graphics, and flyers using Canva (free). Design for your school or church", emoji: "💻", ageRange: "14-15", category: "skills", xpReward: 50, alternativePath: "International: Try Figma or Adobe Express (free tier)" },
    { id: `${id}-f4`, title: "Join a Creative Community", description: "Find communities like Design Week Lagos (Instagram), Behance Nigeria, or your school's art club", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 30, alternativePath: "International: Join Dribbble, Behance global community" },
    { id: `${id}-f5`, title: "Choose SSCE Subjects Strategically", description: "Register for Fine Art, Visual Art, or Technical Drawing in WASSCE/NECO alongside core subjects", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f6`, title: "Complete Your First Real Design Project", description: `Design something real related to ${title} — a logo for a local business, event poster, or product packaging`, emoji: "🎯", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f7`, title: "Learn Figma or Adobe Illustrator", description: "Move beyond Canva — learn industry-standard tools. Figma is free. Watch tutorials on YouTube by Nigerian creators", emoji: "🖥️", ageRange: "15-16", category: "skills", xpReward: 50 },
    { id: `${id}-f8`, title: "Enter the NLNG Art Competition or Similar", description: "Submit work to the NLNG Prize for Literature art category, Doodle for Google, or CcHub design challenges", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60, alternativePath: "International: Adobe Design Achievement Awards, Behance Student Gallery" },
    { id: `${id}-f9`, title: "Build a Portfolio Website", description: "Showcase your best 8-10 pieces on a free site (Behance, Wix, or Carrd). Include process shots", emoji: "🌐", ageRange: "16-17", category: "projects", xpReward: 60 },
    { id: `${id}-f10`, title: "Shadow a Professional Designer", description: `Connect with a ${title} in Lagos/Abuja via LinkedIn or Design Week Lagos. Ask to shadow for 1-2 weeks`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70, alternativePath: "Remote: Reach out to designers on Twitter/X for virtual mentorship" },
    { id: `${id}-f11`, title: "Take a Certification Course", description: "Complete Google UX Design Certificate (Coursera), ALX Design programme, or a course at Utiva", emoji: "🎓", ageRange: "17-18", category: "skills", xpReward: 50, alternativePath: "International: Interaction Design Foundation, Coursera specialisations" },
    { id: `${id}-f12`, title: "Apply to Design Programmes", description: "Apply to UNILAG (Creative Arts), Covenant Uni (Industrial Design), Yaba Tech (Graphics), or Pan-Atlantic University. Alternative: ALX, Andela-adjacent design bootcamps", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: Parsons, RISD, Goldsmiths (UK). Scholarships: MasterCard Foundation, Chevening" },
    { id: `${id}-f13`, title: "Write UTME & Post-UTME / Submit Portfolio", description: "Register for JAMB UTME (Use of English + 3 relevant subjects). Prepare a strong portfolio for schools that require it", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🎥 MEDIA & CONTENT
  // ═══════════════════════════════════════════
  "media-content": (id, title) => [
    { id: `${id}-f1`, title: "Start Creating Content Now", description: "Start a blog on Medium, a YouTube channel, or make TikToks/Reels about topics you care about. Consistency matters", emoji: "📱", ageRange: "13-14", category: "skills", xpReward: 40 },
    { id: `${id}-f2`, title: "Develop Your English & Writing Skills", description: "Excellent written and spoken English is essential. Read widely — newspapers, novels, online articles", emoji: "📚", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Learn Basic Video/Audio Editing", description: "Use CapCut (free) for video, Audacity for audio, or Canva for graphics. Create polished content", emoji: "💻", ageRange: "14-15", category: "skills", xpReward: 50 },
    { id: `${id}-f4`, title: "Join Your School Press Club or Media Team", description: "Work on the school magazine, join the debate team, or start a student podcast", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 30 },
    { id: `${id}-f5`, title: "Choose WASSCE Subjects Wisely", description: "Take English Language, Literature in English, Government or Economics — strong humanities grades open media doors", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f6`, title: "Create a Serious Content Project", description: `Produce something substantial related to ${title} — a mini-documentary, article series, or podcast with 5+ episodes`, emoji: "🎬", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f7`, title: "Build Your Online Presence", description: "Create a portfolio site or professional social media page. Showcase your best work consistently", emoji: "🌐", ageRange: "15-16", category: "projects", xpReward: 40 },
    { id: `${id}-f8`, title: "Enter Content Competitions", description: "Submit to the Future Awards Africa, Campus Journalism Awards, or Writivism Short Story Prize", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60, alternativePath: "International: Scholastic Writing Awards, BBC Young Reporter" },
    { id: `${id}-f9`, title: "Intern at a Media House", description: "Apply for internships at newspapers (Punch, Guardian), TV stations (Channels, TVC), or digital media (Pulse.ng, Zikoko, TechCabal)", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70, alternativePath: "Remote: Apply to international digital publications for virtual internships" },
    { id: `${id}-f10`, title: "Learn Storytelling & Audience Building", description: "Study how top Nigerian creators (Mark Angel, Korty EO, Aproko Doctor) build audiences. Understand analytics", emoji: "🎯", ageRange: "17-18", category: "skills", xpReward: 40 },
    { id: `${id}-f11`, title: "Apply to Mass Communication / Media Programmes", description: "Target UNILAG (Mass Comm), University of Ibadan (Communication), ABUAD, or Pan-Atlantic. Alternative: Radio Nigeria training, MultiChoice Talent Factory", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: Westminster (UK), USC Annenberg. Scholarships: Chevening, Commonwealth" },
    { id: `${id}-f12`, title: "Write UTME & Prepare Applications", description: "Register for JAMB (Use of English, Government, Literature, CRK/Economics). Include media portfolio with applications", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🎭 ENTERTAINMENT & PERFORMANCE
  // ═══════════════════════════════════════════
  "entertainment-performance": (id, title) => [
    { id: `${id}-f1`, title: "Start Performing Regularly", description: "Act in church dramas, school plays, open mics, or create skits for social media. Practice performing in front of audiences", emoji: "🎭", ageRange: "13-14", category: "skills", xpReward: 40 },
    { id: `${id}-f2`, title: "Study English, Literature & Music", description: "Take Literature in English, Music, and focus on strong communication skills for JSCE", emoji: "📚", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Join a Drama/Music Group", description: "Join your school's drama club, choir, or a local youth theatre group. Look for groups like Crown Troupe of Africa (Lagos)", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 40, alternativePath: "International: National Youth Theatre auditions, online masterclasses" },
    { id: `${id}-f4`, title: "Learn the Business Side of Entertainment", description: "Understand contracts, royalties, talent management. Read about how Nollywood and Afrobeats industry works", emoji: "💡", ageRange: "14-15", category: "skills", xpReward: 30 },
    { id: `${id}-f5`, title: "Create Content & Build a Following", description: "Post performance clips on Instagram/TikTok. Build a fanbase and portfolio of your work", emoji: "📱", ageRange: "15-16", category: "projects", xpReward: 50 },
    { id: `${id}-f6`, title: "Take Formal Training", description: "Attend workshops at Terra Kulture (Lagos), National Theatre, or take classes at a music school like MUSON", emoji: "🎓", ageRange: "15-16", category: "skills", xpReward: 60, alternativePath: "Online: MasterClass, Skillshare acting/music courses" },
    { id: `${id}-f7`, title: "Compete in Talent Contests", description: "Enter competitions like Nigerian Idol, The Voice Nigeria, Maltina Dance All, or school talent shows", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60 },
    { id: `${id}-f8`, title: "Get Industry Experience", description: `Audition for Nollywood roles, work as an extra, assist at events, or shadow a ${title} on set`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Build a Professional Portfolio/Showreel", description: "Compile your best performances into a showreel. Get professional headshots. Create an EPK (Electronic Press Kit)", emoji: "📁", ageRange: "17-18", category: "projects", xpReward: 60 },
    { id: `${id}-f10`, title: "Apply to Performing Arts Programmes", description: "Apply to UNILAG (Creative Arts/Theatre), University of Ibadan (Theatre Arts), DELSU, or MUSON School of Music. Alternative path: apprentice directly under established artists", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: LAMDA, Juilliard, Berklee. Scholarships: NNPC/Total, MTN Foundation" },
    { id: `${id}-f11`, title: "Write UTME or Pursue Direct Entry", description: "JAMB (Use of English, Literature, Government + 1). Or pursue direct industry entry with your portfolio and connections", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 💻 TECHNOLOGY
  // ═══════════════════════════════════════════
  "technology": (id, title) => [
    { id: `${id}-f1`, title: "Write Your First Lines of Code", description: "Start with Scratch (scratch.mit.edu), then move to HTML/CSS or Python. Build a simple calculator or website", emoji: "💻", ageRange: "13-14", category: "skills", xpReward: 40 },
    { id: `${id}-f2`, title: "Excel in Maths & Computer Studies", description: "Focus on Mathematics, Further Maths, Computer Studies and Physics for JSCE. Strong maths is essential for tech", emoji: "📐", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Join a Coding Community", description: "Find communities like Google Developer Student Club, ALC (Andela Learning Community), or DevCareer. Join online on Twitter/Discord", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 40, alternativePath: "International: freeCodeCamp community, GitHub Education" },
    { id: `${id}-f4`, title: "Complete a Programming Course", description: "Finish a full course on freeCodeCamp, Codecademy, or SoloLearn. Get your certificate. Focus on Python or JavaScript", emoji: "🎓", ageRange: "14-15", category: "skills", xpReward: 50 },
    { id: `${id}-f5`, title: "Choose SSCE Science Track", description: "Register for Mathematics, Further Maths, Physics, and Computer Studies for WASSCE/NECO", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f6`, title: "Build Your First Real Project", description: `Build a working app, website, or tool related to ${title}. Solve a real problem you see around you`, emoji: "🚀", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f7`, title: "Attend Nigerian Tech Events", description: "Go to events like DevFest, Google I/O Extended Lagos, Techpoint Build, or CcHub meetups", emoji: "🌐", ageRange: "15-16", category: "extracurricular", xpReward: 30 },
    { id: `${id}-f8`, title: "Compete in Hackathons", description: "Join hackathons like HackSultan, Hacktoberfest, Google Solution Challenge, or First Bank Hackathon", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60, alternativePath: "International: MLH Hackathons, Google Code Jam, Meta Hacker Cup" },
    { id: `${id}-f9`, title: "Get Tech Internship or Training", description: "Apply to Andela, HNG Internship (free, remote), CcHub programmes, or intern at a local tech startup", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70, alternativePath: "International: Google Summer of Code, MLH Fellowship" },
    { id: `${id}-f10`, title: "Build a Portfolio on GitHub", description: "Push 3-5 quality projects to GitHub. Write clear READMEs. Create a personal portfolio website", emoji: "📁", ageRange: "16-17", category: "projects", xpReward: 60 },
    { id: `${id}-f11`, title: "Apply to CS / Tech Programmes", description: "Apply to UNILAG (Computer Science), Covenant Uni, OAU, University of Ibadan, or LASU. Alternative: ALX Software Engineering (free, 12 months), Semicolon Africa", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: MIT, Stanford, Waterloo. Scholarships: MasterCard Foundation, Agbami, PTDF" },
    { id: `${id}-f12`, title: "Write UTME & Post-UTME", description: "JAMB subjects: Use of English, Mathematics, Physics, Chemistry (or Biology for some schools). Score 250+ for competitive programmes", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 📱 PRODUCT & TECH
  // ═══════════════════════════════════════════
  "product-tech": (id, title) => [
    { id: `${id}-f1`, title: "Start Using Apps Critically", description: "Study how your favourite apps work — what makes them easy or frustrating? Write down observations", emoji: "📱", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Excel in Maths, English & Computer Studies", description: "Product roles need analytical thinking AND communication. Focus on both for JSCE", emoji: "📐", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Learn Basic Design & Prototyping", description: "Use Figma (free) to design app screens. Watch YouTube tutorials by Nigerian designers like Ope Adeoye", emoji: "🖥️", ageRange: "14-15", category: "skills", xpReward: 50 },
    { id: `${id}-f4`, title: "Learn Basic Coding", description: "Understand HTML/CSS and basic JavaScript. You don't need to be an expert — just understand how products are built", emoji: "💻", ageRange: "14-15", category: "skills", xpReward: 40 },
    { id: `${id}-f5`, title: "Choose SSCE Subjects for Versatility", description: "Take Mathematics, English, Economics, and Computer Studies for WASSCE. Product roles value diverse knowledge", emoji: "📐", ageRange: "15-16", category: "subjects", xpReward: 40 },
    { id: `${id}-f6`, title: "Design & Test a Product Concept", description: `Create a prototype for a product related to ${title}. Test it with friends and get feedback`, emoji: "🎯", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f7`, title: "Join the Nigerian Product Community", description: "Follow Product School Lagos, attend Flutterwave/Paystack talks, join ProductDive community on Slack/Twitter", emoji: "🤝", ageRange: "16-17", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f8`, title: "Enter Product/Design Competitions", description: "Join CcHub design sprints, Google Solution Challenge, or create case studies of real Nigerian products", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60 },
    { id: `${id}-f9`, title: "Intern at a Tech Company", description: "Apply to internships at Flutterwave, Paystack, Piggyvest, Kuda, or any Nigerian startup. Focus on product or design teams", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70, alternativePath: "Remote: Apply to international startups for virtual product internships" },
    { id: `${id}-f10`, title: "Take a Product Management Course", description: "Complete Google Project Management Certificate, or Product School's free resources. Join ALX PM track if available", emoji: "🎓", ageRange: "17-18", category: "skills", xpReward: 50 },
    { id: `${id}-f11`, title: "Apply to Relevant University Programmes", description: "Apply to Computer Science, Industrial Design, or Business/Economics at top Nigerian universities. Alternative: AltSchool Africa, Semicolon", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: Carnegie Mellon HCI, Stanford d.school" },
    { id: `${id}-f12`, title: "Write UTME & Build Case Study Portfolio", description: "JAMB + Post-UTME. Also prepare 2-3 product case studies showing your design thinking process", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🏥 HEALTHCARE & MEDICINE
  // ═══════════════════════════════════════════
  "healthcare-medicine": (id, title) => [
    { id: `${id}-f1`, title: "Learn First Aid & Basic Health", description: "Take a Red Cross First Aid course (offered in most states). Understand basic anatomy and hygiene", emoji: "🩹", ageRange: "13-14", category: "skills", xpReward: 40 },
    { id: `${id}-f2`, title: "Excel in Biology, Chemistry & Maths", description: "Start building strong foundations in science subjects for JSCE. Biology and Chemistry are non-negotiable", emoji: "🔬", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Choose the Science Track for SSCE", description: "Register for Biology, Chemistry, Physics, and Mathematics for WASSCE/NECO. These are required for all medical programmes", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f4`, title: "Volunteer at a Health Centre or Hospital", description: "Volunteer at a local government health centre, PHC, or teaching hospital. Even basic observation teaches a lot", emoji: "🏥", ageRange: "14-15", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f5`, title: "Join a Science/Health Club", description: "Join your school's science club, Health Prefects team, or Junior Red Cross/Red Crescent Society", emoji: "🤝", ageRange: "15-16", category: "extracurricular", xpReward: 30 },
    { id: `${id}-f6`, title: "Shadow a Healthcare Professional", description: `Spend time with a doctor, nurse, pharmacist, or ${title} in a Nigerian hospital. Ask about their daily work and training path`, emoji: "👔", ageRange: "15-16", category: "internships", xpReward: 60 },
    { id: `${id}-f7`, title: "Study the Nigerian Medical Pathway", description: `Understand exactly what qualifications you need for ${title} — MBBS (6 years), Nursing (5 years), Pharmacy (5 years), etc. Research MDCN, PCN, or NMCN registration`, emoji: "📋", ageRange: "16-17", category: "skills", xpReward: 30 },
    { id: `${id}-f8`, title: "Enter Science Competitions", description: "Compete in the STAN Science Quiz, Cowbell Mathematics Competition, or JETS (Junior Engineers, Technicians & Scientists)", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60, alternativePath: "International: International Biology Olympiad, Chemistry Olympiad" },
    { id: `${id}-f9`, title: "Ace Your WASSCE/NECO", description: "Target A1-B3 in Biology, Chemistry, Physics, Maths, and English. Medical schools have strict cut-offs", emoji: "📝", ageRange: "16-17", category: "skills", xpReward: 60 },
    { id: `${id}-f10`, title: "Prepare Intensively for UTME", description: "Score 280+ in JAMB for competitive medical schools. Use past questions from JAMB CBT Practice, PrepClass, or MySchool.ng", emoji: "🎓", ageRange: "17-18", category: "skills", xpReward: 60 },
    { id: `${id}-f11`, title: "Apply to Medical/Health Programmes", description: "Apply to UNILAG (College of Medicine), UCH/UI, LUTH, ABU Zaria, UNIBEN, or OAU. Alternative: study abroad with PTDF or Agbami scholarship", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: UK medical schools (5 years), Caribbean med schools. Scholarships: PTDF, BEA, Commonwealth" },
    { id: `${id}-f12`, title: "Take Post-UTME & Screening", description: "Prepare for school-specific Post-UTME exams. Some schools require interviews. Have your O'Level results ready", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🧠 MENTAL HEALTH & WELLBEING
  // ═══════════════════════════════════════════
  "mental-health": (id, title) => [
    { id: `${id}-f1`, title: "Learn About Emotional Intelligence", description: "Read about emotions, empathy, and self-awareness. Try journaling your own feelings daily", emoji: "🧠", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Study Biology, English & Social Studies", description: "Understanding the human body and society is key. Focus on Biology, English, and Social Studies for JSCE", emoji: "📚", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Become a Peer Counsellor at School", description: "Many Nigerian schools have peer support or guidance counsellor programmes. Volunteer as a peer mediator", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f4`, title: "Choose Science-Humanities Blend for SSCE", description: "Take Biology, Chemistry, English, and one of Health Education/Economics. Psychology isn't offered in WASSCE, but Biology + social subjects prepare you well", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f5`, title: "Learn About Mental Health in Nigeria", description: "Follow organisations like Mental Health Foundation Nigeria, She Writes Woman, or Mentally Aware Nigeria Initiative (MANI)", emoji: "💡", ageRange: "15-16", category: "skills", xpReward: 40, alternativePath: "International: Mind (UK), NAMI (US)" },
    { id: `${id}-f6`, title: "Volunteer With a Mental Health Organisation", description: "Volunteer with MANI, Asido Foundation, or local youth counselling services in your state", emoji: "🤲", ageRange: "15-16", category: "extracurricular", xpReward: 50 },
    { id: `${id}-f7`, title: "Read Psychology Books", description: "Read 'Thinking, Fast and Slow', 'The Boy Who Was Raised as a Dog', or 'Maybe You Should Talk to Someone'", emoji: "📖", ageRange: "16-17", category: "skills", xpReward: 30 },
    { id: `${id}-f8`, title: "Shadow a Psychologist or Counsellor", description: `Connect with a clinical psychologist or ${title} through UNILAG, UI, or a private practice. Ask about their career path`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Complete an Online Psychology Course", description: "Take Yale's 'Science of Well-Being' (free on Coursera) or Khan Academy's Intro to Psychology", emoji: "🎓", ageRange: "17-18", category: "skills", xpReward: 50 },
    { id: `${id}-f10`, title: "Apply to Psychology / Counselling Programmes", description: "Apply to UNILAG (Psychology), University of Ibadan (Psychology), UNIBEN, or OAU. Note: becoming a clinical psychologist requires MSc + supervised practice + NPC registration", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: Edinburgh, UCL, or US programmes. Scholarships: MasterCard Foundation, NNPC" },
    { id: `${id}-f11`, title: "Write UTME (Science-Oriented)", description: "JAMB subjects: Use of English, Biology, Chemistry, Physics (or relevant combo). Score competitively for top programmes", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🔬 SCIENCE & RESEARCH
  // ═══════════════════════════════════════════
  "science-research": (id, title) => [
    { id: `${id}-f1`, title: "Fall in Love with Asking Questions", description: "Keep a curiosity journal. Watch science content by Nigerian creators, TED-Ed, Kurzgesagt, or Veritasium", emoji: "🔬", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Excel in All Science & Maths Subjects", description: "Build strong foundations in Biology, Chemistry, Physics, and Mathematics for JSCE", emoji: "📐", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Choose Full Science Track for SSCE", description: "Take Biology, Chemistry, Physics, Further Maths, and Mathematics for WASSCE/NECO", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f4`, title: "Join a Science Club or Society", description: "Join JETS (Junior Engineers, Technicians and Scientists) at school, or your school's science club", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 30 },
    { id: `${id}-f5`, title: "Conduct Your Own Experiment", description: `Design a mini research project related to ${title}. Use scientific method: question → hypothesis → experiment → conclusion`, emoji: "🧪", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f6`, title: "Learn Data Analysis Basics", description: "Learn to use Excel/Google Sheets for data, create graphs, and interpret results statistically", emoji: "📊", ageRange: "15-16", category: "skills", xpReward: 40 },
    { id: `${id}-f7`, title: "Compete in Science Olympiads", description: "Enter STAN Quiz, Cowbell Maths, JETS National, or state-level science competitions", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60, alternativePath: "International: International Science Olympiad (Physics/Chemistry/Biology/Maths)" },
    { id: `${id}-f8`, title: "Get Research/Lab Experience", description: "Contact university labs (UNILAG, UI, ABU Zaria) about shadowing researchers. NASRDA also has student programmes", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70, alternativePath: "International: MIT PRIMES, RSI (Research Science Institute)" },
    { id: `${id}-f9`, title: "Publish or Present Your Research", description: "Submit your project to a science fair, JETS National, or write it up for a student journal", emoji: "📄", ageRange: "17-18", category: "projects", xpReward: 60 },
    { id: `${id}-f10`, title: "Apply to Science Programmes", description: "Apply to University of Ibadan, UNILAG, ABU Zaria, OAU, or Covenant. Research-heavy programmes give best preparation", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: Imperial College, MIT, ETH Zurich. Scholarships: PTDF, Agbami, Shell SPDC" },
    { id: `${id}-f11`, title: "Write UTME & Target High Scores", description: "JAMB subjects depend on specific science — Biology/Chemistry/Physics/Maths combos. Aim for 280+", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🌍 ENVIRONMENT & SUSTAINABILITY
  // ═══════════════════════════════════════════
  "environment-sustainability": (id, title) => [
    { id: `${id}-f1`, title: "Understand Your Local Environment", description: "Observe environmental issues around you — flooding, waste, deforestation, pollution. Start documenting them", emoji: "🌍", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Study Geography, Biology & Agriculture", description: "Focus on Geography, Agricultural Science, Biology, and Chemistry for JSCE. These are your foundation subjects", emoji: "📚", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Join or Start an Environmental Club", description: "Start a recycling or clean-up initiative at school. Join organisations like Friends of the Environment Nigeria", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f4`, title: "Choose Relevant SSCE Subjects", description: "Take Geography, Biology, Chemistry, Agricultural Science, and Mathematics for WASSCE", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f5`, title: "Run a Local Environmental Project", description: `Start a project related to ${title} — tree planting, waste audit, water quality testing, or composting programme`, emoji: "🌱", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f6`, title: "Learn About Nigerian Environmental Law", description: "Study NESREA (National Environmental Standards), understand EIA processes. Read about Lagos Waste Management Authority (LAWMA)", emoji: "📋", ageRange: "15-16", category: "skills", xpReward: 40 },
    { id: `${id}-f7`, title: "Participate in Environmental Competitions", description: "Enter Shell LiveWIRE, NESREA essay competitions, or UN World Environment Day challenges", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60, alternativePath: "International: Stockholm Junior Water Prize, Earthshot Prize ideas" },
    { id: `${id}-f8`, title: "Volunteer with Environmental NGOs", description: "Work with Nigerian Conservation Foundation (NCF), WasteAid Nigeria, RecyclePoints, or Greenpeace Africa", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Learn GIS & Environmental Tech", description: "Take free courses on GIS (Geographic Information Systems) — essential for environmental work. Try QGIS or Google Earth Engine", emoji: "🗺️", ageRange: "17-18", category: "skills", xpReward: 50 },
    { id: `${id}-f10`, title: "Apply to Environmental Science Programmes", description: "Apply to UNILAG (Environmental Management), UI (Geography/Environment), FUTA, or OAU. Alternative: Environmental Health at polytechnics", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: Wageningen (Netherlands), Edinburgh, UBC. Scholarships: DAAD, Chevening, MasterCard Foundation" },
    { id: `${id}-f11`, title: "Write UTME & Submit Applications", description: "JAMB subjects: Use of English, Chemistry, Biology/Geography, Physics/Maths. Target relevant programme cut-offs", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🏗️ ENGINEERING & ARCHITECTURE
  // ═══════════════════════════════════════════
  "engineering-architecture": (id, title) => [
    { id: `${id}-f1`, title: "Build Things With Your Hands", description: "Try model building, electronics kits, woodwork, or simple construction projects. Visit building sites (safely) and observe", emoji: "🔧", ageRange: "13-14", category: "skills", xpReward: 40 },
    { id: `${id}-f2`, title: "Excel in Maths, Physics & Technical Drawing", description: "Mathematics, Physics, Technical Drawing (now Basic Tech), and Chemistry are non-negotiable for JSCE", emoji: "📐", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Learn CAD Software", description: "Start with Tinkercad (free, web-based), then move to AutoCAD or SketchUp. Essential for modern engineering", emoji: "💻", ageRange: "14-15", category: "skills", xpReward: 50 },
    { id: `${id}-f4`, title: "Choose Full Science + Tech Drawing for SSCE", description: "Register for Mathematics, Further Maths, Physics, Chemistry, and Technical Drawing for WASSCE", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f5`, title: "Join JETS or a Robotics Club", description: "Join JETS (Junior Engineers, Technicians & Scientists) at your school, or start a robotics/maker club", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 30 },
    { id: `${id}-f6`, title: "Complete an Engineering Project", description: `Design and build something related to ${title} — a bridge model, circuit, mechanical device, or architectural model`, emoji: "🏗️", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f7`, title: "Enter STEM Competitions", description: "Compete in JETS National, Cowbell Maths, First Lego League, or Science Olympiad", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60, alternativePath: "International: FIRST Robotics, Physics/Maths Olympiad" },
    { id: `${id}-f8`, title: "Shadow an Engineer or Architect", description: `Visit a construction site, engineering firm (Julius Berger, Dangote, local firms) or architecture studio. Shadow a ${title}`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Study Sustainability & Modern Methods", description: "Learn about green building, renewable energy, smart structures, and 3D printing in construction", emoji: "🌱", ageRange: "16-17", category: "skills", xpReward: 40 },
    { id: `${id}-f10`, title: "Build a Technical Portfolio", description: "Document all your projects with photos, technical drawings, and explanations. Essential for architecture applicants", emoji: "📁", ageRange: "17-18", category: "projects", xpReward: 60 },
    { id: `${id}-f11`, title: "Apply to Engineering/Architecture Programmes", description: "Apply to UNILAG, UI, Covenant, ABU Zaria, FUTA, or UNN. Engineering is 5 years; Architecture is 5+1 (studio year). Register with COREN/ARCON after graduation", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: Imperial, TU Delft, MIT. Scholarships: PTDF, Total, Shell SPDC, Agbami" },
    { id: `${id}-f12`, title: "Write UTME & Score High", description: "JAMB: Use of English, Mathematics, Physics, Chemistry. Target 280+ for top engineering programmes. Prepare heavily for Post-UTME", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🔧 TRADES & TECHNICAL
  // ═══════════════════════════════════════════
  "trades-technical": (id, title) => [
    { id: `${id}-f1`, title: "Start Working With Your Hands", description: "Fix things at home, help with repairs, take apart old electronics. Develop your practical instincts", emoji: "🔧", ageRange: "13-14", category: "skills", xpReward: 40 },
    { id: `${id}-f2`, title: "Focus on Technical & Practical Subjects", description: "Take Basic Technology, Basic Science, Maths, and Computer Studies for JSCE", emoji: "📐", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Learn Safety & Professional Standards", description: "Understand workplace safety (HSE basics), tool handling, and professional standards in Nigerian trades", emoji: "⚠️", ageRange: "14-15", category: "skills", xpReward: 30 },
    { id: `${id}-f4`, title: "Choose Practical SSCE Subjects", description: "Consider Technical Drawing, Physics, Chemistry, Maths, or trade-specific subjects for WASSCE/NECO/NABTEB", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f5`, title: "Find a Master Craftsperson to Learn From", description: `Connect with an experienced ${title} in your area. In Nigeria, apprenticeship (oga/master system) is a proven pathway`, emoji: "🤝", ageRange: "15-16", category: "extracurricular", xpReward: 50 },
    { id: `${id}-f6`, title: "Complete a Practical Project", description: `Build, fix, install, or create something real related to ${title}. Document the process with photos`, emoji: "🛠️", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f7`, title: "Get Formal Technical Training", description: "Enrol at a Government Technical College (GTC), NABTEB programme, or vocational centre like Don Bosco or ITF skills centres", emoji: "🎓", ageRange: "16-17", category: "skills", xpReward: 60, alternativePath: "International: City & Guilds, NVQ qualifications (UK pathway)" },
    { id: `${id}-f8`, title: "Pursue Industry Certifications", description: "Get certified through ITF (Industrial Training Fund), NABTEB trade certificates, or industry-specific certifications", emoji: "📜", ageRange: "16-17", category: "skills", xpReward: 50 },
    { id: `${id}-f9`, title: "Do an Apprenticeship or Attachment", description: "Work under a qualified professional for 6-12 months. In Nigeria, this is often the most respected pathway into trades", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f10`, title: "Apply to Polytechnics or Monotechnics", description: "Apply to Yaba Tech, Kaduna Polytechnic, Federal Polytechnic Ilaro, or state polytechnics for ND/HND in relevant trades. Alternative: Start your own workshop", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: Apprenticeship programmes in Germany (dual system), Canada, UK" },
    { id: `${id}-f11`, title: "Build Your Reputation & Client Base", description: "Document your best work. Get references from clients. Start building a business reputation early", emoji: "🌟", ageRange: "17-18", category: "projects", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 📊 BUSINESS & ENTREPRENEURSHIP
  // ═══════════════════════════════════════════
  "business-entrepreneurship": (id, title) => [
    { id: `${id}-f1`, title: "Read Nigerian Business Success Stories", description: "Read about Aliko Dangote, Tony Elumelu, Folorunso Alakija, Tara Durotoye. Understand how they built from nothing", emoji: "📚", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Focus on Maths, English & Commerce", description: "Strong numeracy and communication are essential. Add Commerce and Social Studies for JSCE", emoji: "📐", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Start a Small Side Hustle", description: "Sell snacks at school, start a social media page, tutor juniors, or resell items. Learn the basics of profit and customers", emoji: "💡", ageRange: "14-15", category: "projects", xpReward: 50 },
    { id: `${id}-f4`, title: "Choose Commercial/Social Science Track", description: "Take Mathematics, Economics, Commerce, Accounting, and Government for WASSCE/NECO", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f5`, title: "Learn Financial Literacy", description: "Understand budgets, profit/loss, savings, and basic bookkeeping. Use apps like PiggyVest to practice saving", emoji: "💰", ageRange: "15-16", category: "skills", xpReward: 40 },
    { id: `${id}-f6`, title: "Join a Young Enterprise Programme", description: "Participate in Junior Achievement Nigeria (JAN), FATE Foundation's Aspiring Entrepreneurs Programme, or Tony Elumelu Foundation's youth track", emoji: "🤝", ageRange: "15-16", category: "extracurricular", xpReward: 50, alternativePath: "International: Network for Teaching Entrepreneurship (NFTE)" },
    { id: `${id}-f7`, title: "Build a Real Business", description: "Create a product or service with actual paying customers. Track your revenue and expenses properly", emoji: "🚀", ageRange: "16-17", category: "projects", xpReward: 70 },
    { id: `${id}-f8`, title: "Enter Business Pitch Competitions", description: "Compete in FATE Foundation programmes, Diamond Bank/Access Bank business challenges, or The Next Titan", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60 },
    { id: `${id}-f9`, title: "Network with Entrepreneurs", description: "Attend events by Ventures Platform, CcHub, or Lagos Chamber of Commerce. Find a mentor", emoji: "🤝", ageRange: "16-17", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f10`, title: "Learn Digital Marketing & Branding", description: "Understand social media marketing, Google ads, and branding. Essential for any modern business in Nigeria", emoji: "📣", ageRange: "17-18", category: "skills", xpReward: 40 },
    { id: `${id}-f11`, title: "Apply to Business/Economics Programmes", description: "Apply to UNILAG (Business Admin), UI (Economics), LBS (later for MBA), Covenant, or Pan-Atlantic. Alternative: Tony Elumelu Foundation Entrepreneurship Programme (TEEP) after school", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: LSE, Wharton, INSEAD. Scholarships: MasterCard Foundation, Chevening" },
    { id: `${id}-f12`, title: "Write UTME & Prepare Applications", description: "JAMB: Use of English, Mathematics, Economics, Government/Commerce. Include your business track record in personal statements", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 💰 FINANCE & INVESTMENT
  // ═══════════════════════════════════════════
  "finance-investment": (id, title) => [
    { id: `${id}-f1`, title: "Understand Money Basics", description: "Learn how money works — saving, spending, interest rates, inflation. Use PiggyVest or Cowrywise to start saving", emoji: "💰", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Excel in Mathematics & Commerce", description: "Maths is the language of finance. Focus on Mathematics, Commerce, and Computer Studies for JSCE", emoji: "📐", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Choose Commercial Track for SSCE", description: "Take Mathematics, Economics, Commerce, Accounting, and Further Maths if available for WASSCE", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f4`, title: "Learn About the Nigerian Stock Exchange", description: "Understand how the NGX (Nigerian Exchange Group) works. Read about stocks, bonds, and mutual funds. Follow BizWatch Nigeria", emoji: "📈", ageRange: "14-15", category: "skills", xpReward: 40 },
    { id: `${id}-f5`, title: "Practice Basic Accounting", description: "Learn double-entry bookkeeping, balance sheets, and income statements. Master Excel for financial calculations", emoji: "📊", ageRange: "15-16", category: "skills", xpReward: 50 },
    { id: `${id}-f6`, title: "Join Investment or Finance Clubs", description: "Join your school's commerce club or find youth investment groups. Some Nigerian banks run youth finance programmes", emoji: "🤝", ageRange: "15-16", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f7`, title: "Enter Maths/Economics Competitions", description: "Compete in Cowbell Mathematics Competition, Economics quiz bowls, or bank-sponsored academic challenges", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60 },
    { id: `${id}-f8`, title: "Shadow a Finance Professional", description: `Visit a bank, investment firm, or ${title} in Lagos/Abuja. Ask about ICAN, ACCA, or CFA career paths`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Start Studying for ICAN/ACCA Early", description: "The Institute of Chartered Accountants of Nigeria (ICAN) or ACCA (UK) are the gold-standard qualifications. Start with Foundation level", emoji: "🎓", ageRange: "17-18", category: "skills", xpReward: 60, alternativePath: "International: ACCA, CFA (after BSc), CIMA" },
    { id: `${id}-f10`, title: "Apply to Accounting/Finance Programmes", description: "Apply to UNILAG (Accounting/Finance), UI, Covenant, ABU Zaria. Accounting is the most common entry to finance careers in Nigeria", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: LSE, Warwick, NYU Stern. Scholarships: NNPC, Shell, FirstBank" },
    { id: `${id}-f11`, title: "Write UTME & Excel", description: "JAMB: Use of English, Mathematics, Economics, Accounting/Commerce. Top programmes need 260+", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 📣 MARKETING & COMMUNICATIONS
  // ═══════════════════════════════════════════
  "marketing-communications": (id, title) => [
    { id: `${id}-f1`, title: "Study How Brands Communicate", description: "Analyse Nigerian brands you love — GTBank, Flutterwave, Indomie. What makes their marketing work?", emoji: "📣", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Focus on English, Commerce & Social Studies", description: "Strong communication and understanding of society are key. Excel in English Language and Literature for JSCE", emoji: "📚", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Start a Social Media Page or Blog", description: "Build something from scratch — a brand page, blog, or content account. Learn to write copy that gets engagement", emoji: "📱", ageRange: "14-15", category: "projects", xpReward: 50 },
    { id: `${id}-f4`, title: "Choose Arts/Commercial SSCE Track", description: "Take English, Literature, Economics, Commerce, and Government for WASSCE", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f5`, title: "Learn Digital Marketing Basics", description: "Take free Google Digital Skills for Africa courses. Learn about SEO, social media marketing, and email marketing", emoji: "💻", ageRange: "15-16", category: "skills", xpReward: 50, alternativePath: "International: HubSpot Academy (free), Google Ads certification" },
    { id: `${id}-f6`, title: "Run a Marketing Campaign for Someone", description: `Plan and execute a marketing project related to ${title} — promote a school event, local business, or cause`, emoji: "🎯", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f7`, title: "Join PR/Marketing Communities", description: "Follow the Advertising Practitioners Council of Nigeria (APCON), NIPR, or join marketing groups on LinkedIn/Twitter", emoji: "🤝", ageRange: "16-17", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f8`, title: "Intern at a Marketing Agency or Brand", description: "Apply to agencies like Insight Publicis, X3M Ideas, Ogilvy Nigeria, or marketing teams at Flutterwave, MTN, or GTBank", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Enter Creative/Marketing Competitions", description: "Submit to LAIF Awards student category, Cannes Young Lions, or run a marketing challenge on social media", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60, alternativePath: "International: Cannes Young Lions, D&AD New Blood" },
    { id: `${id}-f10`, title: "Apply to Mass Comm / Marketing Programmes", description: "Apply to UNILAG (Mass Communication), UI, Pan-Atlantic (Marketing/Comm), or Covenant. Alternative: Digital marketing bootcamps", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: NYU, Westminster, Leeds. Scholarships: MasterCard Foundation" },
    { id: `${id}-f11`, title: "Write UTME & Build a Campaign Portfolio", description: "JAMB: Use of English, Economics, Government, Literature/Commerce. Include 2-3 campaign case studies in applications", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // ⚖️ LAW & JUSTICE
  // ═══════════════════════════════════════════
  "law-justice": (id, title) => [
    { id: `${id}-f1`, title: "Develop Your Argumentation Skills", description: "Join debate clubs, read widely, and practise making logical arguments. Watch Nigerian court proceedings online", emoji: "⚖️", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Excel in English, Government & Social Studies", description: "Excellent English (written and spoken) is mandatory. Focus on English, Government, and Social Studies for JSCE", emoji: "📚", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Join the Debate/Moot Court Club", description: "School debate clubs are the best preparation. Participate in inter-school debates", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f4`, title: "Choose Arts/Social Science Track for SSCE", description: "Take English, Literature in English, Government, Economics, and CRK/IRS for WASSCE/NECO", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f5`, title: "Read About the Nigerian Legal System", description: "Understand the 1999 Constitution, Nigerian court structure, and roles of lawyers, judges, and magistrates", emoji: "📖", ageRange: "15-16", category: "skills", xpReward: 40 },
    { id: `${id}-f6`, title: "Attend a Court Session", description: "Visit a Magistrate or High Court in your state. Observe proceedings. This is usually free and open to the public", emoji: "🏛️", ageRange: "15-16", category: "extracurricular", xpReward: 50 },
    { id: `${id}-f7`, title: "Enter Debate/Essay Competitions", description: "Compete in the NNPC National Quiz, Cowbell essay competitions, or state-level debate championships", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60, alternativePath: "International: UN Youth Delegate programmes, Model United Nations" },
    { id: `${id}-f8`, title: "Shadow a Lawyer or Visit a Law Firm", description: `Connect with a lawyer or ${title}. Visit a law firm in your city. Ask about the path: LLB → Law School → Call to Bar`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Understand the Full Legal Education Path", description: "In Nigeria: 5-year LLB degree → 1 year at Nigerian Law School (Lagos, Abuja, Kano, etc.) → Call to Bar. Then NYSC. Know this pathway", emoji: "📋", ageRange: "17-18", category: "skills", xpReward: 30 },
    { id: `${id}-f10`, title: "Apply to Law Faculties", description: "Apply to UNILAG, UI, ABU Zaria, OAU, UNN, or UNIBEN Law. These are the most respected. Law is competitive — prepare well", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: UK LLB (3 years) at LSE, UCL, SOAS. Scholarships: Chevening, Commonwealth, NNPC" },
    { id: `${id}-f11`, title: "Write UTME & Score 280+", description: "JAMB: Use of English, Literature, Government, CRK/Economics. Law cut-offs are among the highest — score 280+ minimum", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🎓 EDUCATION & ACADEMIA
  // ═══════════════════════════════════════════
  "education-academia": (id, title) => [
    { id: `${id}-f1`, title: "Start Teaching or Tutoring Others", description: "Help classmates, younger students, or siblings with homework. Teaching is the best way to learn if you enjoy it", emoji: "🎓", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Excel in Your Strongest Subjects", description: "Identify the subjects you love most and focus on mastering them. Your specialty becomes your teaching subject", emoji: "📚", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Volunteer as a Peer Tutor", description: "Officially volunteer as a tutor at your school or in your community. Many churches and NGOs also need tutors", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f4`, title: "Choose SSCE Subjects in Your Teaching Area", description: "If you want to teach sciences, take science subjects. If humanities, take arts. Get excellent grades in your speciality", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f5`, title: "Learn About Different Teaching Methods", description: "Study how great teachers teach — watch TED-Ed, explore Khan Academy's approach, observe your best teachers", emoji: "💡", ageRange: "15-16", category: "skills", xpReward: 40 },
    { id: `${id}-f6`, title: "Run a Teaching Project", description: `Create and deliver a lesson series related to ${title}. Teach at a community centre, Sunday school, or online via YouTube`, emoji: "📋", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f7`, title: "Enter Academic Competitions", description: "Compete in STAN Quiz, Cowbell Maths, debate competitions, or subject olympiads to sharpen your expertise", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60 },
    { id: `${id}-f8`, title: "Shadow a Teacher or Lecturer", description: "Spend time with a professional teacher or university lecturer. Understand the TRCN registration process", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 60 },
    { id: `${id}-f9`, title: "Explore EdTech Opportunities", description: "Learn about Nigerian EdTech — uLesson, PrepClass, Tuteria. Teaching is evolving beyond classrooms", emoji: "💻", ageRange: "17-18", category: "skills", xpReward: 40 },
    { id: `${id}-f10`, title: "Apply to Education Programmes", description: "Apply to UI (Education), UNILAG (Education), ABU Zaria, or Colleges of Education. B.Ed or BSc.Ed are 4-5 years, then register with TRCN", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: UCL IOE, Cambridge PGCE, Teach For All. Scholarships: Commonwealth, TETFUND" },
    { id: `${id}-f11`, title: "Write UTME & Apply", description: "JAMB subjects depend on your teaching speciality + Education. Prepare for Post-UTME at your chosen institution", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🤝 SOCIAL IMPACT
  // ═══════════════════════════════════════════
  "social-impact": (id, title) => [
    { id: `${id}-f1`, title: "Identify Problems You Care About", description: "Look at your community — what needs fixing? Poverty, education gaps, healthcare access, gender inequality. Pick your cause", emoji: "🤲", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Study English, Social Studies & Civic Ed", description: "Understanding society and communicating well are essential. Focus on English, Social Studies, and Civic Education for JSCE", emoji: "📚", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Start Volunteering", description: "Join NGOs like AIESEC, Rotaract, Red Cross Youth, or community-based organisations in your area", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f4`, title: "Choose Social Science SSCE Track", description: "Take Government, Economics, CRK/IRS, English, and Literature for WASSCE. These prepare you for social impact careers", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f5`, title: "Run a Community Project", description: `Lead a project related to ${title} — a clean-up drive, mentorship programme, health awareness campaign, or fundraiser`, emoji: "🌍", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f6`, title: "Learn About Nigerian NGO/Development Sector", description: "Research organisations like UNDP Nigeria, ActionAid, Save the Children Nigeria. Understand how social impact careers work here", emoji: "📋", ageRange: "15-16", category: "skills", xpReward: 40 },
    { id: `${id}-f7`, title: "Apply for Youth Leadership Programmes", description: "Apply to YALI (Young African Leaders Initiative), LEAP Africa, or Mandela Washington Fellowship youth track", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60, alternativePath: "International: UN Youth Delegate, Global Changemakers, Ashoka Youth Venture" },
    { id: `${id}-f8`, title: "Intern at an NGO", description: "Work with organisations like BudgIT, EiE Nigeria, Teach For Nigeria, or local state-level NGOs", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Document Your Impact", description: "Write up your projects, collect testimonials, take photos. Build a portfolio of social impact work", emoji: "📁", ageRange: "17-18", category: "projects", xpReward: 50 },
    { id: `${id}-f10`, title: "Apply to Social Science/Development Programmes", description: "Apply to UI (Sociology/Political Science), UNILAG, ABU Zaria, or Covenant. Alternative: Development Studies at SOAS or similar", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: SOAS, Sciences Po, Georgetown. Scholarships: MasterCard Foundation, YALI, Chevening" },
    { id: `${id}-f11`, title: "Write UTME & Apply", description: "JAMB: Use of English, Government, Economics, CRK/Geography. Highlight your social impact work in applications", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🏛️ GOVERNMENT & PUBLIC SERVICE
  // ═══════════════════════════════════════════
  "government-public-service": (id, title) => [
    { id: `${id}-f1`, title: "Understand How Government Works", description: "Learn about Nigeria's 3 arms of government, 36 states, local government system. Read the Constitution (simplified version)", emoji: "🏛️", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Excel in Government, English & Civic Ed", description: "Focus on Government, Civic Education, Social Studies, and English for JSCE", emoji: "📚", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Join Your School's Government/Student Council", description: "Run for class representative, prefect, or student government. Learn leadership and public speaking", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f4`, title: "Choose Social Science Track for SSCE", description: "Take Government, Economics, English, Literature, and CRK/History for WASSCE", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f5`, title: "Follow Nigerian Policy & Governance", description: "Read BudgIT's budget analyses, follow INEC processes, understand how policies affect your community", emoji: "📰", ageRange: "15-16", category: "skills", xpReward: 40 },
    { id: `${id}-f6`, title: "Participate in Civic Projects", description: `Lead or join a civic engagement project — voter education, community town halls, or policy advocacy related to ${title}`, emoji: "🌍", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f7`, title: "Enter Debate/Leadership Competitions", description: "Compete in Model United Nations (MUN), debate championships, or essay competitions on governance topics", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60 },
    { id: `${id}-f8`, title: "Intern at a Government Office or NGO", description: "Shadow a local government official, intern at your state House of Assembly, or work with governance NGOs like EiE or PLAC", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Study Public Administration Pathway", description: "Understand career routes — Civil Service Commission, EFCC, INEC, Foreign Affairs, or elected office. Most require university degree + NYSC", emoji: "📋", ageRange: "17-18", category: "skills", xpReward: 30 },
    { id: `${id}-f10`, title: "Apply to Political Science / Public Admin", description: "Apply to UNILAG, UI, ABU Zaria, UNN, or Covenant for Political Science, Public Administration, or International Relations", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: Oxford PPE, Georgetown, Sciences Po. Scholarships: Chevening, Commonwealth, YALI" },
    { id: `${id}-f11`, title: "Write UTME & Apply", description: "JAMB: Use of English, Government, Economics, CRK/History. Some programmes also accept Literature", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🌐 INTERNATIONAL DEVELOPMENT
  // ═══════════════════════════════════════════
  "international-development": (id, title) => [
    { id: `${id}-f1`, title: "Develop Global Awareness", description: "Follow world news, learn about the UN SDGs (Sustainable Development Goals), and understand global challenges", emoji: "🌐", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Excel in English, Geography & Social Studies", description: "Languages and understanding of global systems are crucial. Focus on English, Geography, and Social Studies for JSCE", emoji: "📚", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Learn a Second Language", description: "French is extremely valuable for development work in West/Central Africa. Other useful languages: Arabic, Portuguese", emoji: "🗣️", ageRange: "14-15", category: "skills", xpReward: 50 },
    { id: `${id}-f4`, title: "Choose Social Science Track for SSCE", description: "Take Government, Economics, Geography, English, and French for WASSCE if available", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f5`, title: "Join International Organisations", description: "Participate in AIESEC, Red Cross Youth, Amnesty International student chapters, or local UN-affiliated clubs", emoji: "🤝", ageRange: "15-16", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f6`, title: "Run a Development-Focused Project", description: `Lead a community project aligned with ${title} and the SDGs — water access, education, health, or gender equality`, emoji: "🌍", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f7`, title: "Participate in Model UN", description: "Join Model United Nations (MUN) conferences in Nigeria — great for understanding diplomacy and global policy", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60, alternativePath: "International: NMUN, THIMUN, Harvard WorldMUN" },
    { id: `${id}-f8`, title: "Intern at a Development Organisation", description: "Apply to UNDP Nigeria, UNICEF, ActionAid, British Council Nigeria, or local development NGOs", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Apply for Youth Leadership Programmes", description: "Apply to YALI (Mandela Washington Fellowship), ONE Campaign Youth Ambassadors, or Tony Elumelu Foundation", emoji: "🌟", ageRange: "17-18", category: "skills", xpReward: 50 },
    { id: `${id}-f10`, title: "Apply to International Relations / Dev Studies", description: "Apply to UI, UNILAG, Covenant for Int'l Relations or Political Science. Alternative: Study abroad at SOAS, Sussex, or Sciences Po", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: SOAS, Sussex, Geneva. Scholarships: Chevening, DAAD, MasterCard Foundation, Mandela Washington" },
    { id: `${id}-f11`, title: "Write UTME & Apply", description: "JAMB: Use of English, Government, Economics, Geography/CRK. Strong extracurriculars matter as much as grades for this field", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // ✈️ TRAVEL & HOSPITALITY
  // ═══════════════════════════════════════════
  "travel-hospitality": (id, title) => [
    { id: `${id}-f1`, title: "Explore Your Own City/State", description: "Visit tourist sites, hotels, and cultural landmarks in your state. Document what makes each experience great or poor", emoji: "✈️", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Focus on English, Geography & Business", description: "Hospitality needs excellent communication and understanding of cultures. Focus on English, Geography, and Commerce for JSCE", emoji: "📚", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Learn a Second Language", description: "French is critical for West African hospitality/tourism. Other valuable options: Spanish, Arabic", emoji: "🗣️", ageRange: "14-15", category: "skills", xpReward: 50 },
    { id: `${id}-f4`, title: "Choose Relevant SSCE Subjects", description: "Take English, Economics, Geography, Commerce, and French (if available) for WASSCE", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f5`, title: "Get Customer Service Experience", description: "Work at a family restaurant, help at a hotel front desk, or assist at an event. Learn how to serve people excellently", emoji: "🤝", ageRange: "15-16", category: "extracurricular", xpReward: 50 },
    { id: `${id}-f6`, title: "Study the Nigerian Hospitality Industry", description: `Research ${title} opportunities — Transcorp Hilton, Eko Hotels, Marriott Lagos, Airbnb Nigeria, tour operators, airlines`, emoji: "📋", ageRange: "15-16", category: "skills", xpReward: 40 },
    { id: `${id}-f7`, title: "Create a Tourism/Hospitality Project", description: "Write a tourism guide for your local area, plan a mock event, or create a hotel marketing plan", emoji: "🎯", ageRange: "16-17", category: "projects", xpReward: 60 },
    { id: `${id}-f8`, title: "Intern at a Hotel, Restaurant or Tour Company", description: "Apply for internships at major hotels, airline offices, tour companies, or event management firms in your city", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Get Hospitality Certifications", description: "Take free courses on Alison.com or Coursera for hospitality management. Consider food safety certifications", emoji: "🎓", ageRange: "17-18", category: "skills", xpReward: 50, alternativePath: "International: WSET (wine/spirits), ServSafe, IATA (airlines)" },
    { id: `${id}-f10`, title: "Apply to Hospitality/Tourism Programmes", description: "Apply to Federal Poly Ilaro, Yaba Tech, UNILAG (Geography/Tourism), or NIHOTOUR (National Institute for Hospitality). Alternative: HND at polytechnics", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: Swiss hotel schools (EHL, Glion), UK programmes. Scholarships: Commonwealth, Hilton Foundation" },
    { id: `${id}-f11`, title: "Write UTME or Apply to Polytechnics", description: "JAMB: Use of English, Geography, Economics, Commerce/Government. Polytechnic entry is also a strong pathway for this field", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🍽️ FOOD & CULINARY
  // ═══════════════════════════════════════════
  "food-culinary": (id, title) => [
    { id: `${id}-f1`, title: "Start Cooking at Home", description: "Learn to cook Nigerian staples — jollof rice, egusi soup, puff puff, small chops. Practise weekly and experiment with recipes", emoji: "🍳", ageRange: "13-14", category: "skills", xpReward: 40 },
    { id: `${id}-f2`, title: "Study Home Economics, Food & Nutrition", description: "Take Home Economics, Food & Nutrition, and Agricultural Science for JSCE. Understand nutrition and food safety", emoji: "📚", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Learn Food Safety & Hygiene", description: "Understand NAFDAC standards, food handling safety, and proper storage. Essential for any food career", emoji: "⚠️", ageRange: "14-15", category: "skills", xpReward: 30 },
    { id: `${id}-f4`, title: "Choose Relevant SSCE Subjects", description: "Take Food & Nutrition, Chemistry, Biology, and Agricultural Science for WASSCE/NABTEB", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f5`, title: "Cook for Others & Get Feedback", description: "Cater for a family event, cook for your church, or start a small chops business. Learn from real customers", emoji: "🍽️", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f6`, title: "Learn From a Professional Chef", description: `Apprentice under a chef or ${title} at a restaurant, catering service, or hotel kitchen in your area`, emoji: "🤝", ageRange: "15-16", category: "extracurricular", xpReward: 50 },
    { id: `${id}-f7`, title: "Enter Cooking Competitions", description: "Compete in school cooking contests, Knorr taste quest, or community culinary challenges", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60 },
    { id: `${id}-f8`, title: "Intern at a Restaurant or Catering Company", description: "Work in a professional kitchen — a restaurant, hotel kitchen, or catering company. Learn the business side too", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Get Formal Culinary Training", description: "Attend Culinary Academy Lagos, LUTH catering school, Federal Poly Hotel & Catering, or online culinary courses", emoji: "🎓", ageRange: "17-18", category: "skills", xpReward: 60, alternativePath: "International: Le Cordon Bleu, CIA (Culinary Institute of America), Westminster Kingsway" },
    { id: `${id}-f10`, title: "Apply to Food Science / Catering Programmes", description: "Apply to UNILAG (Food Technology), UI (Food Science), Federal Polytechnics (Catering/Hotel Management), or NIHOTOUR", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: Swiss culinary schools, UK catering programmes. Start your own catering business as alternative" },
    { id: `${id}-f11`, title: "Build Your Culinary Brand", description: "Create a food Instagram/TikTok, develop signature dishes, and build a client base. Many Nigerian chefs succeed without formal degrees", emoji: "🌟", ageRange: "17-18", category: "projects", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // ⚽ SPORT & FITNESS
  // ═══════════════════════════════════════════
  "sport-fitness": (id, title) => [
    { id: `${id}-f1`, title: "Train Consistently & Seriously", description: "Commit to regular daily training in your sport. Join a local club, academy, or gym. Discipline is everything", emoji: "💪", ageRange: "13-14", category: "skills", xpReward: 40 },
    { id: `${id}-f2`, title: "Study PE, Biology & Health Education", description: "Understand your body — study Physical & Health Education, Biology, and Basic Science for JSCE", emoji: "📐", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Join School & Local Sports Teams", description: "Represent your school in inter-house and inter-school competitions. Join state-level sport academies if available", emoji: "🤝", ageRange: "14-15", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f4`, title: "Learn Sports Science & Nutrition", description: "Study how nutrition, sleep, and recovery affect performance. Follow Nigerian sports scientists and trainers online", emoji: "🧠", ageRange: "15-16", category: "skills", xpReward: 40 },
    { id: `${id}-f5`, title: "Get Coaching or Fitness Certifications", description: "Take basic coaching or first aid courses. Nigerian Institute of Sport (NIS) offers some youth programmes", emoji: "📜", ageRange: "15-16", category: "skills", xpReward: 50, alternativePath: "International: NASM, ACE Fitness, ISSA certifications (online)" },
    { id: `${id}-f6`, title: "Compete at State/National Level", description: "Enter state championships, National Youth Games, or federation-level competitions in your sport", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60 },
    { id: `${id}-f7`, title: "Get Scouted or Recruited", description: `Get noticed by scouts, academies, or selectors for ${title}. Attend open trials. Build a highlights reel/stats portfolio`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f8`, title: "Explore Both Athletic & Academic Paths", description: "Plan dual tracks: athletic career (professional sport) AND academic backup (Sports Science, Physiotherapy, Coaching)", emoji: "📋", ageRange: "17-18", category: "skills", xpReward: 30 },
    { id: `${id}-f9`, title: "Apply to Sports/Fitness Programmes", description: "Apply to National Institute of Sports (NIS) Lagos, UNILAG (Human Kinetics), UI, or state universities with strong sports programmes. Alternative: Professional academy pathway", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: US athletic scholarships (NCAA Division I/II), UK sport scholarships. Use platforms like BeRecruited" },
    { id: `${id}-f10`, title: "Write UTME or Pursue Pro Sports", description: "JAMB: Use of English, Biology, Chemistry/Physics, Health Education. Or pursue professional contracts with documented training history", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🐾 ANIMALS & NATURE
  // ═══════════════════════════════════════════
  "animals-nature": (id, title) => [
    { id: `${id}-f1`, title: "Observe & Document Animals/Nature", description: "Start a nature journal. Visit zoos (Lekki Conservation Centre, Jos Wildlife Park), observe birds, insects, and wildlife around you", emoji: "🐾", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Excel in Biology & Agricultural Science", description: "Biology and Agricultural Science are your core subjects. Also focus on Chemistry and Mathematics for JSCE", emoji: "🔬", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Choose Science/Agriculture Track for SSCE", description: "Take Biology, Chemistry, Agricultural Science, Physics, and Mathematics for WASSCE", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f4`, title: "Volunteer at a Vet Clinic or Animal Shelter", description: "Spend weekends helping at a veterinary clinic, animal shelter, or farm. Learn about animal care and behaviour", emoji: "🏥", ageRange: "14-15", category: "extracurricular", xpReward: 50 },
    { id: `${id}-f5`, title: "Learn About Nigerian Wildlife & Conservation", description: "Study endangered species in Nigeria — Cross River gorillas, Nigerian-Cameroon chimpanzees, pangolins. Research NCF and WCS Nigeria", emoji: "🌍", ageRange: "15-16", category: "skills", xpReward: 40 },
    { id: `${id}-f6`, title: "Run a Conservation or Animal Welfare Project", description: `Start a project related to ${title} — tree planting, wildlife awareness campaign, or school anti-poaching presentation`, emoji: "🌱", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f7`, title: "Enter Science Competitions", description: "Submit biology projects to JETS, STAN quiz, or state science fairs focused on animal/environmental themes", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60 },
    { id: `${id}-f8`, title: "Shadow a Vet or Wildlife Professional", description: `Connect with a veterinarian, ${title}, or conservation officer. Visit Yankari Game Reserve, Gashaka-Gumti, or university vet clinics`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Understand the Career Pathway", description: "Veterinary Medicine is 6 years in Nigeria. Register with VCN (Veterinary Council of Nigeria) after graduation. Wildlife/conservation may require additional MSc", emoji: "📋", ageRange: "17-18", category: "skills", xpReward: 30 },
    { id: `${id}-f10`, title: "Apply to Veterinary/Animal Science Programmes", description: "Apply to UNILAG, UI, ABU Zaria, FUNAAB, or UNIMAID for Veterinary Medicine or Animal Science. FUNAAB is particularly strong", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: RVC London, Edinburgh Vet School, UC Davis. Scholarships: PTDF, Commonwealth" },
    { id: `${id}-f11`, title: "Write UTME & Score High", description: "JAMB: Use of English, Biology, Chemistry, Physics/Maths. Vet Medicine cut-offs are high — target 270+", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🔭 SPACE & FUTURE TECH
  // ═══════════════════════════════════════════
  "space-future-tech": (id, title) => [
    { id: `${id}-f1`, title: "Fall in Love with Space & Science", description: "Watch SpaceX launches, follow NASRDA (Nigeria's space agency), read about NigeriaSat satellites, and explore astronomy apps", emoji: "🔭", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Excel in Maths, Physics & Computer Science", description: "These are non-negotiable for space and future tech. Build the strongest possible foundation in JSCE", emoji: "📐", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Choose Full Science Track for SSCE", description: "Take Mathematics, Further Maths, Physics, Chemistry, and Computer Studies for WASSCE", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f4`, title: "Learn Programming (Python & C++)", description: "Start with Python, then learn C++ — both are used heavily in space tech, robotics, and AI", emoji: "💻", ageRange: "14-15", category: "skills", xpReward: 50 },
    { id: `${id}-f5`, title: "Join Robotics/STEM Communities", description: "Join JETS, robotics clubs, or connect with communities like Roborave Nigeria or Google Developer Student Clubs", emoji: "🤝", ageRange: "15-16", category: "extracurricular", xpReward: 40 },
    { id: `${id}-f6`, title: "Build a Future Tech Project", description: `Build something related to ${title} — a drone, robot, satellite model, AI tool, or IoT device`, emoji: "🚀", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f7`, title: "Enter STEM Competitions", description: "Compete in JETS National, Google Science Fair, First Lego League, or NASA Space Apps Challenge (Nigeria chapter)", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 60, alternativePath: "International: NASA Space Apps, Intel ISEF, Google Science Fair" },
    { id: `${id}-f8`, title: "Connect with NASRDA", description: "Visit NASRDA (National Space Research & Development Agency) in Abuja. Learn about Nigeria's satellite programme and internship opportunities", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Take Advanced Online Courses", description: "Complete courses on MIT OpenCourseWare, edX, or Coursera in robotics, aerospace, or AI. Build serious technical depth", emoji: "🎓", ageRange: "17-18", category: "skills", xpReward: 50 },
    { id: `${id}-f10`, title: "Apply to Engineering/Physics Programmes", description: "Apply to ABU Zaria (Space Science), UNILAG, UI, or OAU for Physics, Electrical Engineering, or Computer Science. NASRDA partners with some universities", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: MIT, Caltech, TU Delft, Surrey Space Centre (UK). Scholarships: PTDF, Agbami, NASRDA partnerships" },
    { id: `${id}-f11`, title: "Write UTME & Aim for Top Scores", description: "JAMB: Use of English, Mathematics, Physics, Chemistry. Target 290+ for top engineering/physics programmes", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 💄 BEAUTY & WELLNESS
  // ═══════════════════════════════════════════
  "beauty-wellness": (id, title) => [
    { id: `${id}-f1`, title: "Start Practising on Yourself & Friends", description: "Experiment with hair styling, makeup, skincare routines, or nail art. Watch tutorials by Nigerian beauty creators", emoji: "💄", ageRange: "13-14", category: "skills", xpReward: 40 },
    { id: `${id}-f2`, title: "Study Home Economics & Chemistry", description: "Understanding skin/hair science needs Chemistry. Home Economics teaches practical beauty and wellness skills", emoji: "📚", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Follow Nigerian Beauty Industry Leaders", description: "Study how brands like Zaron, House of Tara, R&R Luxury, and Dabota Lawson built their businesses", emoji: "📱", ageRange: "14-15", category: "skills", xpReward: 30 },
    { id: `${id}-f4`, title: "Choose Relevant SSCE Subjects", description: "Take Chemistry, Biology, Home Economics, and English for WASSCE. Science background helps for product formulation", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f5`, title: "Learn From a Professional", description: `Apprentice under a professional ${title} — a makeup artist, hair stylist, skincare specialist, or spa manager in your area`, emoji: "🤝", ageRange: "15-16", category: "extracurricular", xpReward: 50 },
    { id: `${id}-f6`, title: "Build a Client Portfolio", description: "Start doing paid work — weddings, events, photoshoots. Take before/after photos of every client. Build your Instagram portfolio", emoji: "📸", ageRange: "15-16", category: "projects", xpReward: 60 },
    { id: `${id}-f7`, title: "Get Formal Training & Certifications", description: "Attend House of Tara Academy, Bimpe Onakoya's courses, or beauty schools in Lagos/Abuja. Get NAFDAC awareness for product creation", emoji: "🎓", ageRange: "16-17", category: "skills", xpReward: 60, alternativePath: "International: ITEC, CIDESCO, or City & Guilds beauty qualifications" },
    { id: `${id}-f8`, title: "Enter Beauty Competitions", description: "Compete in bridal makeup challenges, hair styling competitions, or beauty brand ambassador searches", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 50 },
    { id: `${id}-f9`, title: "Intern at a Salon, Spa, or Beauty Brand", description: "Work at an established salon, spa (like Oasis Medspa), or beauty brand. Learn business operations", emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f10`, title: "Decide Your Pathway", description: "University (Cosmetology/Chemistry for product formulation) OR Vocational (beauty academy + build your brand). Both paths are valid and profitable", emoji: "📋", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: London College of Fashion, Vidal Sassoon Academy, Makeup Designory (US)" },
    { id: `${id}-f11`, title: "Launch Your Beauty Brand/Business", description: "Start your own beauty service or product line. Register with CAC, get NAFDAC approval for products, build social media presence", emoji: "🌟", ageRange: "17-18", category: "projects", xpReward: 50 },
  ],

  // ═══════════════════════════════════════════
  // 🏠 REAL ESTATE & PROPERTY
  // ═══════════════════════════════════════════
  "real-estate-property": (id, title) => [
    { id: `${id}-f1`, title: "Understand Property & Land", description: "Learn how property ownership works in Nigeria — Land Use Act, C of O (Certificate of Occupancy), and why location matters", emoji: "🏠", ageRange: "13-14", category: "skills", xpReward: 30 },
    { id: `${id}-f2`, title: "Focus on Maths, English & Geography", description: "Strong numeracy, communication, and understanding of land/location are essential. Focus on these for JSCE", emoji: "📐", ageRange: "13-14", category: "subjects", xpReward: 30 },
    { id: `${id}-f3`, title: "Learn Financial Literacy & Investment Basics", description: "Understand how money grows — savings, interest, mortgage basics, ROI. Use PiggyVest or Cowrywise to start", emoji: "💰", ageRange: "14-15", category: "skills", xpReward: 40 },
    { id: `${id}-f4`, title: "Choose Social Science/Commercial Track", description: "Take Economics, Geography, Mathematics, Commerce, and Government for WASSCE", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
    { id: `${id}-f5`, title: "Study the Nigerian Property Market", description: `Research how the Lagos/Abuja property market works. Follow PropertyPro.ng, Estate Intel, and real estate pages on Instagram`, emoji: "📋", ageRange: "15-16", category: "skills", xpReward: 40 },
    { id: `${id}-f6`, title: "Visit Property Sites & Open Houses", description: "Attend property exhibitions (like Abuja Housing Show), visit construction sites, tour model homes with estate agents", emoji: "🏗️", ageRange: "15-16", category: "extracurricular", xpReward: 50 },
    { id: `${id}-f7`, title: "Learn Digital Marketing for Real Estate", description: "Many Nigerian estates are sold via Instagram and WhatsApp. Learn digital marketing, photography, and virtual tours", emoji: "📱", ageRange: "16-17", category: "skills", xpReward: 50 },
    { id: `${id}-f8`, title: "Shadow a Real Estate Professional", description: `Connect with an estate agent, property developer, or ${title}. Learn about NIESV (Nigerian Institution of Estate Surveyors & Valuers)`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 70 },
    { id: `${id}-f9`, title: "Understand Real Estate Law", description: "Learn about land documentation — C of O, Governor's Consent, Survey Plans, Deed of Assignment. This knowledge is gold in Nigeria", emoji: "⚖️", ageRange: "17-18", category: "skills", xpReward: 40 },
    { id: `${id}-f10`, title: "Apply to Estate Management Programmes", description: "Apply to UNILAG (Estate Management), Covenant, OAU, Federal Polytechnic Ilaro. After graduation, register with ESVARBON and NIESV", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40, alternativePath: "International: University of Reading (UK), NYU Schack Institute. Alternative: Start as an agent while studying" },
    { id: `${id}-f11`, title: "Write UTME & Apply", description: "JAMB: Use of English, Mathematics, Economics, Geography. Estate Management is a professional degree — plan for 5 years + NYSC", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
  ],
};

// Every career family maps to its own dedicated template — no more sharing
const familyToTemplate: Record<string, string> = {
  "creative-design": "creative-design",
  "media-content": "media-content",
  "entertainment-performance": "entertainment-performance",
  "technology": "technology",
  "product-tech": "product-tech",
  "healthcare-medicine": "healthcare-medicine",
  "mental-health": "mental-health",
  "science-research": "science-research",
  "environment-sustainability": "environment-sustainability",
  "engineering-architecture": "engineering-architecture",
  "trades-technical": "trades-technical",
  "business-entrepreneurship": "business-entrepreneurship",
  "finance-investment": "finance-investment",
  "marketing-communications": "marketing-communications",
  "law-justice": "law-justice",
  "education-academia": "education-academia",
  "social-impact": "social-impact",
  "government-public-service": "government-public-service",
  "international-development": "international-development",
  "travel-hospitality": "travel-hospitality",
  "food-culinary": "food-culinary",
  "sport-fitness": "sport-fitness",
  "animals-nature": "animals-nature",
  "space-future-tech": "space-future-tech",
  "beauty-wellness": "beauty-wellness",
  "real-estate-property": "real-estate-property",
};

// Hand-crafted roadmaps for specific popular careers (kept for backwards compat)
export const careerRoadmaps: CareerRoadmap[] = [];

export function getRoadmapForCareer(careerId: string): CareerRoadmap | undefined {
  return careerRoadmaps.find((r) => r.careerId === careerId);
}

// Generate a roadmap based on career family — all 26 families now have unique, Nigeria-specific templates
export function getOrCreateRoadmap(careerId: string, careerTitle: string, familyId?: string): CareerRoadmap {
  const existing = getRoadmapForCareer(careerId);
  if (existing) return existing;

  // Get family-specific milestones
  const templateKey = familyId ? familyToTemplate[familyId] : undefined;
  const templateFn = templateKey ? familyMilestoneTemplates[templateKey] : undefined;

  if (templateFn) {
    return {
      careerId,
      milestones: templateFn(careerId, careerTitle),
    };
  }

  // Fallback for any edge cases
  return {
    careerId,
    milestones: [
      { id: `${careerId}-g1`, title: "Discover Your Interests", description: "Take the career quiz and explore what excites you about this field", emoji: "🧭", ageRange: "13-14", category: "skills", xpReward: 20 },
      { id: `${careerId}-g2`, title: "Focus on Key JSCE Subjects", description: `Study the subjects most relevant to becoming a ${careerTitle}`, emoji: "📚", ageRange: "14-15", category: "subjects", xpReward: 30 },
      { id: `${careerId}-g3`, title: "Choose Your WASSCE Track Wisely", description: "Select SSCE subjects that open doors to university programmes in this field", emoji: "📐", ageRange: "14-15", category: "subjects", xpReward: 40 },
      { id: `${careerId}-g4`, title: "Join a Related Club or Community", description: `Find extracurricular activities connected to ${careerTitle}`, emoji: "🤝", ageRange: "15-16", category: "extracurricular", xpReward: 30 },
      { id: `${careerId}-g5`, title: "Build a Beginner Project", description: `Create something real related to ${careerTitle}`, emoji: "🛠️", ageRange: "15-16", category: "projects", xpReward: 50 },
      { id: `${careerId}-g6`, title: "Get Real-World Experience", description: `Shadow someone working as a ${careerTitle} or do an internship`, emoji: "👔", ageRange: "16-17", category: "internships", xpReward: 60 },
      { id: `${careerId}-g7`, title: "Enter a Competition", description: "Participate in a relevant contest to test your skills", emoji: "🏆", ageRange: "16-17", category: "competitions", xpReward: 50 },
      { id: `${careerId}-g8`, title: "Research University/Training Programmes", description: "Find the best Nigerian university, polytechnic, or vocational programme for this career", emoji: "🏫", ageRange: "17-18", category: "university", xpReward: 40 },
      { id: `${careerId}-g9`, title: "Write UTME & Apply", description: "Register for JAMB, prepare intensively, and submit your applications!", emoji: "📝", ageRange: "17-18", category: "university", xpReward: 50 },
    ],
  };
}
