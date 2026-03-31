export interface SkillDetail {
  name: string;
  explanation: string;
  resourceUrl?: string;
  resourceLabel?: string;
}

export const skillDetails: Record<string, SkillDetail[]> = {
  "ai-engineer": [
    { name: "Python Programming", explanation: "The primary language for building AI models, processing data, and writing automation scripts.", resourceUrl: "https://replit.com", resourceLabel: "Start free at replit.com" },
    { name: "Machine Learning", explanation: "Teaching computers to learn patterns from data without being explicitly programmed for each task.", resourceUrl: "https://teachablemachine.withgoogle.com", resourceLabel: "Try Teachable Machine" },
    { name: "Linear Algebra & Calculus", explanation: "The mathematical foundations behind neural networks — you need this to understand how AI actually works under the hood." },
    { name: "Data Wrangling", explanation: "Cleaning messy, real-world datasets so they're usable for training AI models — most of an AI engineer's time is spent here.", resourceUrl: "https://kaggle.com/learn", resourceLabel: "Practice on Kaggle" },
    { name: "Neural Network Architecture", explanation: "Designing the structure of deep learning models — deciding how many layers, nodes, and connections the AI brain needs." },
    { name: "Cloud Computing", explanation: "Running AI models on powerful remote servers because your laptop can't handle training on millions of data points.", resourceUrl: "https://cloud.google.com/edu", resourceLabel: "Google Cloud for Students" },
  ],
  "dentist": [
    { name: "Manual Dexterity", explanation: "Steady, precise hand movements for drilling, filling, and operating inside a tiny space — your patient's mouth." },
    { name: "Oral Anatomy", explanation: "Knowing every tooth, nerve, and blood vessel in the mouth so you don't damage anything during procedures." },
    { name: "Radiograph Interpretation", explanation: "Reading dental X-rays to spot cavities, infections, and bone loss that are invisible to the naked eye." },
    { name: "Patient Communication", explanation: "Explaining scary-sounding procedures in a calm, reassuring way so patients feel safe in the chair." },
    { name: "Infection Control", explanation: "Keeping every tool, surface, and procedure sterile to prevent spreading bacteria between patients." },
    { name: "Prosthodontics Basics", explanation: "Understanding how to design and fit crowns, bridges, and dentures that look and feel like real teeth." },
  ],
  "aerospace-engineer": [
    { name: "Aerodynamics", explanation: "Understanding how air flows around objects — the science that determines whether a plane flies or crashes." },
    { name: "CAD Modelling", explanation: "Using software to design 3D models of aircraft parts before they're built — mistakes on screen are cheaper than in a wind tunnel.", resourceUrl: "https://www.tinkercad.com", resourceLabel: "Try free at tinkercad.com" },
    { name: "Orbital Mechanics", explanation: "Calculating the paths spacecraft take through space — one small error and your satellite misses its orbit by thousands of kilometres." },
    { name: "Materials Science", explanation: "Choosing which metals and composites to use — the wrong material and your aircraft is too heavy, too weak, or melts on re-entry." },
    { name: "Systems Integration", explanation: "Making sure thousands of individual components — engines, electronics, fuel lines — all work together perfectly." },
    { name: "Thermodynamics", explanation: "Understanding heat transfer in engines and atmospheric re-entry — crucial for both jet engines and rockets." },
  ],
  "music-producer": [
    { name: "DAW Proficiency", explanation: "Mastering software like Ableton Live, FL Studio, or Logic Pro — the digital studio where all modern music is created.", resourceUrl: "https://bandlab.com", resourceLabel: "Start free at BandLab" },
    { name: "Music Theory", explanation: "Understanding chords, scales, and song structure so your beats have emotional depth, not just a good kick drum." },
    { name: "Sound Design", explanation: "Creating unique sounds from scratch using synthesizers — the skill that gives a producer their signature sonic identity." },
    { name: "Mixing & Mastering", explanation: "Balancing all the instruments, vocals, and effects so the final track sounds polished on any speaker or headphone." },
    { name: "Sampling & Interpolation", explanation: "Taking pieces of existing songs and transforming them into something entirely new — a core skill in hip-hop and electronic music." },
    { name: "Beat Programming", explanation: "Programming drums and percussion patterns that make people move — the foundation of almost every modern genre." },
  ],
  "architect": [
    { name: "Spatial Reasoning", explanation: "The ability to visualise how a building will look and feel in 3D before it's built — the core superpower of an architect.", resourceUrl: "https://www.sketchup.com/plans-and-pricing/sketchup-free", resourceLabel: "Practice free at sketchup.com" },
    { name: "CAD & BIM Software", explanation: "Using tools like AutoCAD and Revit to create precise technical drawings that builders use to construct your designs.", resourceUrl: "https://www.tinkercad.com", resourceLabel: "Start with Tinkercad" },
    { name: "Structural Understanding", explanation: "Knowing how forces — gravity, wind, earthquakes — act on a building so your design doesn't just look good, but stands up." },
    { name: "Sustainable Design", explanation: "Designing buildings that use less energy, water, and materials — critical as the world fights climate change." },
    { name: "Site Analysis", explanation: "Reading a piece of land — its slope, sunlight, wind patterns, neighbours — to decide how the building should sit on it." },
    { name: "Client Presentation", explanation: "Pitching your design vision to clients, councils, and investors using models, renders, and clear storytelling." },
  ],
  "climate-scientist": [
    { name: "Climate Modelling", explanation: "Building computer simulations that predict how the climate will change over decades — the core tool for climate policy decisions." },
    { name: "Statistical Analysis", explanation: "Using statistics to separate real climate trends from random weather noise in massive datasets.", resourceUrl: "https://www.r-project.org", resourceLabel: "Learn R for free" },
    { name: "Remote Sensing", explanation: "Using satellites and drones to measure ice sheets, sea levels, and deforestation from thousands of kilometres away." },
    { name: "Atmospheric Chemistry", explanation: "Understanding how greenhouse gases trap heat in the atmosphere — the chemistry behind global warming." },
    { name: "Scientific Writing", explanation: "Writing clear, evidence-based papers that policymakers and the public can actually understand and act on." },
    { name: "GIS Mapping", explanation: "Creating geographic maps that show which areas are most vulnerable to floods, droughts, and rising sea levels.", resourceUrl: "https://qgis.org", resourceLabel: "Try QGIS free" },
  ],
  "data-scientist": [
    { name: "Python Programming", explanation: "Used to clean, analyse, and visualise large datasets — the most popular language in data science.", resourceUrl: "https://replit.com", resourceLabel: "Start free at replit.com" },
    { name: "SQL Querying", explanation: "Pulling specific data from massive databases using structured queries — you'll use this every single day.", resourceUrl: "https://sqlzoo.net", resourceLabel: "Practice at SQLZoo" },
    { name: "Statistical Modelling", explanation: "Building mathematical models that predict outcomes — like whether a customer will cancel their subscription." },
    { name: "Data Visualisation", explanation: "Turning complex numbers into charts and graphs that anyone can understand — because insights only matter if people act on them.", resourceUrl: "https://public.tableau.com", resourceLabel: "Try Tableau Public free" },
    { name: "Machine Learning", explanation: "Training algorithms to find patterns humans can't see — from fraud detection to recommendation engines." },
    { name: "A/B Testing", explanation: "Running controlled experiments to prove that a change actually works, not just looks like it does." },
  ],
  "film-director": [
    { name: "Visual Storytelling", explanation: "Telling a story through camera angles, lighting, and composition — the difference between a home video and a film." },
    { name: "Script Analysis", explanation: "Breaking down a screenplay scene by scene to understand the emotional beats, character arcs, and pacing before shooting." },
    { name: "Directing Actors", explanation: "Guiding actors to deliver authentic performances — knowing when to push harder and when to let them be." },
    { name: "Shot Composition", explanation: "Deciding what the camera sees in every frame — where actors stand, what's in the background, how tight the close-up is." },
    { name: "Post-Production Editing", explanation: "Shaping the final film in the editing room — cutting scenes, adjusting pacing, and adding music and sound.", resourceUrl: "https://www.capcut.com", resourceLabel: "Edit free with CapCut" },
    { name: "Budget Management", explanation: "Making a film within budget — deciding where to spend money for maximum impact and where to improvise." },
  ],
  "game-developer": [
    { name: "C# or C++ Programming", explanation: "The languages that power Unity and Unreal Engine — the two game engines used to build most modern games.", resourceUrl: "https://scratch.mit.edu", resourceLabel: "Start with Scratch" },
    { name: "Game Engine Proficiency", explanation: "Using tools like Unity or Unreal to build game worlds, physics, and interactions without coding everything from scratch.", resourceUrl: "https://unity.com/learn", resourceLabel: "Unity Learn free" },
    { name: "Level Design", explanation: "Creating game environments that guide players naturally, reward exploration, and maintain the right difficulty curve." },
    { name: "Game Physics", explanation: "Programming realistic movement, gravity, collisions, and ragdoll effects so the game world feels believable." },
    { name: "Player Psychology", explanation: "Understanding what makes games addictive in a good way — reward loops, challenge balance, and progression systems." },
    { name: "3D Modelling Basics", explanation: "Creating or modifying 3D objects, characters, and environments for your game world.", resourceUrl: "https://www.blender.org", resourceLabel: "Learn Blender free" },
  ],
  "investment-banker": [
    { name: "Financial Modelling", explanation: "Building spreadsheet models that predict a company's future revenue, profit, and value — the core skill of investment banking.", resourceUrl: "https://www.investopedia.com", resourceLabel: "Learn at Investopedia" },
    { name: "Valuation Methods", explanation: "Calculating what a company is actually worth using DCF analysis, comparables, and precedent transactions." },
    { name: "Accounting Fundamentals", explanation: "Reading balance sheets, income statements, and cash flow statements to understand a company's financial health." },
    { name: "Presentation & Pitching", explanation: "Creating compelling pitch books that convince executives to do billion-dollar deals based on your analysis." },
    { name: "Market Analysis", explanation: "Understanding how economic trends, interest rates, and global events affect stock prices and deal activity." },
    { name: "Excel Mastery", explanation: "Building complex financial models with thousands of formulas — investment bankers live in Excel more than any other tool." },
  ],
  "robotics-engineer": [
    { name: "Embedded Programming", explanation: "Writing code that runs directly on robot hardware — microcontrollers and sensors — not just a computer screen.", resourceUrl: "https://www.arduino.cc", resourceLabel: "Start with Arduino" },
    { name: "Mechanical Design", explanation: "Designing the physical structure of robots — joints, gears, chassis — so they can move reliably in the real world.", resourceUrl: "https://www.tinkercad.com", resourceLabel: "Design at Tinkercad" },
    { name: "Control Systems", explanation: "Programming the feedback loops that let robots balance, navigate, and respond to their environment in real time." },
    { name: "Sensor Integration", explanation: "Connecting cameras, LIDAR, and touch sensors to give robots the ability to see, hear, and feel their surroundings." },
    { name: "ROS (Robot Operating System)", explanation: "The standard software framework for programming robots — used in labs and factories worldwide." },
    { name: "Computer Vision", explanation: "Teaching robots to understand what they see through cameras — recognising objects, faces, and obstacles." },
  ],
  "tv-presenter": [
    { name: "On-Camera Presence", explanation: "Looking natural, confident, and engaging while speaking directly into a camera — harder than it looks." },
    { name: "Teleprompter Reading", explanation: "Reading a script from a scrolling screen while making it sound completely natural and spontaneous." },
    { name: "Live Improvisation", explanation: "Thinking on your feet when something goes wrong on air — the teleprompter breaks, a guest doesn't show up, breaking news hits." },
    { name: "Interview Technique", explanation: "Asking the right follow-up questions to get genuine, interesting answers — not just sticking to a prepared list." },
    { name: "Voice Modulation", explanation: "Using pitch, pace, and pauses to keep viewers engaged — a monotone voice loses an audience in seconds." },
    { name: "Social Media Engagement", explanation: "Building and maintaining a personal brand online — modern presenters are expected to be influencers too." },
  ],
  "wildlife-conservationist": [
    { name: "Species Identification", explanation: "Recognising animals, plants, and insects in the field — you need to know what you're protecting and what threatens it." },
    { name: "Population Monitoring", explanation: "Tracking how many animals are in an area over time using camera traps, GPS collars, and field surveys." },
    { name: "GIS & Remote Sensing", explanation: "Using satellite data and mapping software to track habitat loss, migration patterns, and deforestation.", resourceUrl: "https://qgis.org", resourceLabel: "Try QGIS free" },
    { name: "Community Engagement", explanation: "Working with local communities who live alongside wildlife — conservation only works when people benefit too." },
    { name: "Grant Writing", explanation: "Writing compelling proposals to secure funding — conservation depends on donations and government grants." },
    { name: "Field Survival Skills", explanation: "Navigating remote wilderness, setting up camps, and staying safe around dangerous animals for weeks at a time." },
  ],
  "sports-physiotherapist": [
    { name: "Musculoskeletal Assessment", explanation: "Examining muscles, joints, and bones to diagnose exactly what's injured and how severe it is." },
    { name: "Rehabilitation Programming", explanation: "Designing step-by-step recovery plans that get athletes back to full fitness without re-injury." },
    { name: "Manual Therapy", explanation: "Using hands-on techniques like massage, joint mobilisation, and stretching to treat pain and stiffness." },
    { name: "Sports Taping & Bracing", explanation: "Applying tape and supports to protect injured joints during competition — a key pitch-side skill." },
    { name: "Exercise Prescription", explanation: "Creating specific strengthening and conditioning exercises tailored to each athlete's injury and sport." },
    { name: "Acute Injury Management", explanation: "Making rapid decisions on the sideline — is the player okay to continue, or do they need to come off immediately?" },
  ],
  "diplomat": [
    { name: "Multilingual Communication", explanation: "Speaking multiple languages — diplomats typically need fluency in at least two official UN languages." },
    { name: "Negotiation & Mediation", explanation: "Finding compromises between countries with opposing interests — the core skill that prevents conflicts from escalating." },
    { name: "Policy Analysis", explanation: "Reading complex international agreements and understanding their real-world implications for your country." },
    { name: "Cross-Cultural Intelligence", explanation: "Understanding how gestures, tone, and customs differ across cultures — what's polite in one country is offensive in another." },
    { name: "Report & Cable Writing", explanation: "Writing clear, concise diplomatic cables that brief your government on developments in your host country." },
    { name: "Public Speaking & Rhetoric", explanation: "Delivering speeches at the UN, press conferences, and international summits with poise and precision." },
  ],
  "entrepreneur": [
    { name: "Problem Identification", explanation: "Spotting real problems that people will actually pay to solve — not every idea is a business, but every good business solves a problem." },
    { name: "Product Development", explanation: "Building a minimum viable product quickly to test your idea before spending months or years on it.", resourceUrl: "https://www.canva.com", resourceLabel: "Prototype at Canva" },
    { name: "Financial Literacy", explanation: "Understanding revenue, costs, profit margins, and cash flow — because running out of money kills more startups than bad ideas." },
    { name: "Sales & Persuasion", explanation: "Convincing customers, investors, and partners to believe in your vision and give you their money or time." },
    { name: "Team Building", explanation: "Hiring the right people and creating a culture where talented individuals want to stay and give their best." },
    { name: "Resilience & Adaptability", explanation: "Handling rejection, failure, and pivots without quitting — most successful entrepreneurs failed multiple times first." },
  ],
  "chef": [
    { name: "Knife Skills", explanation: "Precise, fast cutting techniques — a professional chef can julienne vegetables in seconds without looking at the blade." },
    { name: "Flavour Pairing", explanation: "Understanding which ingredients complement each other — why lime works with coriander but not with cinnamon." },
    { name: "Heat Control", explanation: "Managing different cooking temperatures for different techniques — searing, braising, poaching all require different heat." },
    { name: "Menu Development", explanation: "Creating a balanced menu that flows from appetiser to dessert, considers seasons, and stays within food cost budgets." },
    { name: "Food Safety & Hygiene", explanation: "Preventing foodborne illness through proper storage, temperature control, and kitchen cleanliness — non-negotiable." },
    { name: "Kitchen Management", explanation: "Running a brigade of cooks during a busy service — timing, delegation, and calm under pressure." },
  ],
  "urban-planner": [
    { name: "GIS & Spatial Analysis", explanation: "Using geographic information systems to map population density, traffic flow, and land use patterns.", resourceUrl: "https://qgis.org", resourceLabel: "Try QGIS free" },
    { name: "Zoning & Land Use Law", explanation: "Understanding regulations that control what can be built where — residential, commercial, industrial, mixed-use." },
    { name: "Community Consultation", explanation: "Running public meetings and surveys to understand what residents actually want in their neighbourhood." },
    { name: "Transport Planning", explanation: "Designing road networks, bus routes, and bike lanes that move people efficiently without gridlock." },
    { name: "Environmental Impact Assessment", explanation: "Evaluating how a proposed development will affect air quality, water, wildlife, and local communities." },
    { name: "Urban Design Principles", explanation: "Understanding how building heights, street widths, and green spaces create a city that feels safe and vibrant." },
  ],
  "fashion-designer": [
    { name: "Pattern Cutting", explanation: "Creating the 2D templates that get cut from fabric and sewn into 3D garments — the foundation of fashion construction." },
    { name: "Textile Knowledge", explanation: "Understanding how different fabrics — silk, cotton, denim, leather — drape, stretch, and wear over time." },
    { name: "Fashion Illustration", explanation: "Sketching designs by hand to communicate your vision before it becomes a physical garment.", resourceUrl: "https://procreate.com", resourceLabel: "Draw with Procreate" },
    { name: "Trend Forecasting", explanation: "Predicting what colours, silhouettes, and styles will be popular 6-12 months from now — designing for the future." },
    { name: "Draping", explanation: "Creating designs by pinning fabric directly onto a mannequin — letting the material guide the shape of the garment." },
    { name: "Brand Identity", explanation: "Defining the look, feel, and story behind your fashion label — what makes your brand recognisable in a crowded market." },
  ],
  "cybersecurity-analyst": [
    { name: "Network Security", explanation: "Understanding how computer networks work so you can spot vulnerabilities and stop hackers from getting in." },
    { name: "Ethical Hacking", explanation: "Legally breaking into systems to find weaknesses before criminals do — you think like a hacker to beat one.", resourceUrl: "https://tryhackme.com", resourceLabel: "Practice at TryHackMe" },
    { name: "Incident Response", explanation: "Knowing exactly what to do when a breach happens — containing the attack, preserving evidence, and recovering systems." },
    { name: "Cryptography", explanation: "Understanding encryption and how data is protected during transmission — the maths behind secure communication." },
    { name: "Security Auditing", explanation: "Systematically reviewing an organization's security posture — finding gaps in policies, systems, and human behaviour." },
    { name: "Threat Intelligence", explanation: "Monitoring the dark web and hacker forums to predict and prepare for emerging cyber threats before they hit." },
  ],
  "surgeon": [
    { name: "Precision Hand Coordination", explanation: "Operating with millimetre accuracy inside the human body — one wrong cut can mean the difference between life and death." },
    { name: "Anatomical Mastery", explanation: "Knowing every organ, blood vessel, and nerve in the body so you can navigate safely during operations." },
    { name: "Rapid Decision Making", explanation: "Making life-or-death decisions in seconds during surgery when unexpected complications arise." },
    { name: "Suturing Techniques", explanation: "Closing wounds and incisions with precise stitches that promote healing and minimise scarring." },
    { name: "Diagnostic Imaging Interpretation", explanation: "Reading CT scans, MRIs, and X-rays to plan surgeries and identify problems before opening up a patient." },
    { name: "Composure Under Pressure", explanation: "Staying calm during 8-hour surgeries when complications arise — panic in an operating room costs lives." },
  ],
  "ux-designer": [
    { name: "User Research", explanation: "Interviewing and observing real users to understand their needs, frustrations, and behaviours before designing anything." },
    { name: "Wireframing", explanation: "Sketching simple layouts of screens to test ideas quickly before investing time in visual design.", resourceUrl: "https://www.figma.com", resourceLabel: "Design free at Figma" },
    { name: "Prototyping", explanation: "Building interactive mockups that look and feel like real apps — so you can test with users before writing any code.", resourceUrl: "https://www.figma.com", resourceLabel: "Prototype at Figma" },
    { name: "Usability Testing", explanation: "Watching real users try to use your design and identifying where they get confused, frustrated, or stuck." },
    { name: "Information Architecture", explanation: "Organising content and navigation so users can find what they need without thinking about it." },
    { name: "Interaction Design", explanation: "Designing how buttons, menus, and gestures respond to user input — making digital products feel smooth and intuitive." },
  ],
  "marine-biologist": [
    { name: "Scuba Diving (Certified)", explanation: "Professional underwater diving skills — you'll spend hours underwater collecting samples and observing marine life." },
    { name: "Species Taxonomy", explanation: "Identifying and classifying ocean organisms — from microscopic plankton to 30-metre whales." },
    { name: "Water Quality Analysis", explanation: "Testing ocean chemistry — pH, salinity, dissolved oxygen — to assess ecosystem health." },
    { name: "Statistical Ecology", explanation: "Using statistics to analyse population data and determine whether a species is thriving or declining.", resourceUrl: "https://www.r-project.org", resourceLabel: "Learn R free" },
    { name: "Scientific Diving Protocols", explanation: "Following strict safety procedures during research dives — managing depth, time, and decompression stops." },
    { name: "Marine Conservation Policy", explanation: "Understanding the laws and treaties that protect ocean habitats and endangered species." },
  ],
  "psychologist": [
    { name: "Active Listening", explanation: "Hearing not just words but emotions, tone, and what's being left unsaid — the foundation of effective therapy." },
    { name: "Cognitive Behavioural Therapy (CBT)", explanation: "A structured approach to helping people change negative thought patterns that cause anxiety, depression, and other issues." },
    { name: "Psychometric Assessment", explanation: "Administering and interpreting standardised tests that measure personality, intelligence, and mental health conditions." },
    { name: "Clinical Observation", explanation: "Noticing subtle changes in a patient's body language, speech patterns, and behaviour that reveal their emotional state." },
    { name: "Research Methodology", explanation: "Designing and conducting scientific studies to advance our understanding of human behaviour and mental health." },
    { name: "Ethical Decision-Making", explanation: "Navigating complex confidentiality, consent, and boundary issues that arise in therapeutic relationships." },
  ],
  "software-engineer": [
    { name: "Programming Languages", explanation: "Writing clean, efficient code in languages like JavaScript, Python, or Java — the building blocks of every application.", resourceUrl: "https://replit.com", resourceLabel: "Code free at Replit" },
    { name: "System Design", explanation: "Architecting large-scale applications that handle millions of users — deciding which databases, servers, and APIs to use." },
    { name: "Version Control (Git)", explanation: "Tracking changes to code and collaborating with other developers without accidentally overwriting each other's work.", resourceUrl: "https://github.com", resourceLabel: "Start at GitHub" },
    { name: "Debugging", explanation: "Finding and fixing bugs in code — reading error messages, setting breakpoints, and tracing logic step by step." },
    { name: "API Design", explanation: "Creating the interfaces that let different software systems talk to each other — connecting apps, databases, and services." },
    { name: "Testing & Quality Assurance", explanation: "Writing automated tests that catch bugs before users do — ensuring your code works correctly every time." },
  ],
  "biomedical-engineer": [
    { name: "Medical Device Design", explanation: "Creating devices — from pacemakers to prosthetics — that interact safely with the human body." },
    { name: "Biomechanics", explanation: "Understanding how forces affect biological systems — how joints move, how muscles generate force, how bones handle impact." },
    { name: "Regulatory Compliance", explanation: "Navigating FDA and CE marking requirements — medical devices can't be sold until they pass strict safety reviews." },
    { name: "Signal Processing", explanation: "Analysing electrical signals from the body — ECGs, EEGs, and EMGs — to monitor and diagnose health conditions." },
    { name: "Biocompatible Materials", explanation: "Choosing materials that won't be rejected by the human body — critical for implants, prosthetics, and surgical tools." },
    { name: "3D Printing for Medicine", explanation: "Using additive manufacturing to create custom implants, surgical guides, and anatomical models for surgical planning.", resourceUrl: "https://www.tinkercad.com", resourceLabel: "Design at Tinkercad" },
  ],
  "journalist": [
    { name: "Investigative Research", explanation: "Digging beyond press releases to find the real story — using public records, sources, and data to uncover truth." },
    { name: "Interview Technique", explanation: "Asking questions that get honest, revealing answers — knowing when to push and when to let silence do the work." },
    { name: "Fact-Checking", explanation: "Verifying every claim, quote, and statistic before publishing — one error can destroy a journalist's credibility." },
    { name: "Deadline Writing", explanation: "Producing clear, accurate, compelling copy under intense time pressure — sometimes in minutes, not hours." },
    { name: "Digital Storytelling", explanation: "Using video, audio, social media, and data visualisation to tell stories across multiple platforms.", resourceUrl: "https://www.canva.com", resourceLabel: "Create at Canva" },
    { name: "Media Law & Ethics", explanation: "Understanding defamation, privacy, source protection, and the ethical boundaries of reporting." },
  ],
  "pharmacist": [
    { name: "Pharmacology", explanation: "Deep knowledge of how drugs interact with the body — mechanisms, side effects, and therapeutic uses of thousands of medications." },
    { name: "Drug Interaction Analysis", explanation: "Spotting dangerous combinations when a patient takes multiple medications — this literally saves lives." },
    { name: "Compounding", explanation: "Preparing custom medications by mixing ingredients — needed when commercial drugs don't suit a specific patient." },
    { name: "Patient Counselling", explanation: "Explaining how to take medications correctly, potential side effects, and when to seek medical attention." },
    { name: "Dosage Calculation", explanation: "Calculating the correct drug dose based on a patient's weight, age, kidney function, and other factors — precision matters." },
    { name: "Inventory & Supply Chain", explanation: "Managing medicine stock to ensure critical drugs never run out — especially important in under-served areas." },
  ],
  "environmental-engineer": [
    { name: "Water Treatment Design", explanation: "Designing systems that purify contaminated water for safe drinking — from simple filters to large-scale treatment plants." },
    { name: "Environmental Impact Assessment", explanation: "Evaluating how construction projects, factories, and developments will affect air, water, and soil quality." },
    { name: "Waste Management Engineering", explanation: "Designing landfills, recycling systems, and waste-to-energy plants that minimise environmental harm." },
    { name: "Air Quality Monitoring", explanation: "Measuring pollutants in the atmosphere and designing solutions to reduce emissions from factories and vehicles." },
    { name: "Sustainable Energy Systems", explanation: "Designing solar, wind, and other renewable energy installations that reduce dependence on fossil fuels." },
    { name: "Soil & Groundwater Remediation", explanation: "Cleaning up contaminated land — removing toxic chemicals from soil and groundwater to make sites safe again." },
  ],
  "professional-athlete": [
    { name: "Sport-Specific Technique", explanation: "Mastering the precise movements and skills unique to your sport — technique separates good athletes from great ones." },
    { name: "Mental Toughness", explanation: "Performing under extreme pressure — penalties, final sets, last-second shots — when thousands of people are watching." },
    { name: "Nutrition & Recovery", explanation: "Fuelling your body for performance and recovery — knowing what to eat, when, and how much sleep you need." },
    { name: "Video Analysis", explanation: "Reviewing footage of your own performances and opponents to find tactical advantages and fix weaknesses." },
    { name: "Injury Prevention", explanation: "Doing prehab exercises, stretching routines, and load management to avoid the injuries that end careers early." },
    { name: "Competition Strategy", explanation: "Reading opponents, adapting tactics mid-game, and making split-second decisions under fatigue and pressure." },
  ],
};

export function getSkillDetails(careerId: string, fallbackSkills: string[], dbSkills?: { name: string; importance?: number; explanation?: string }[]): SkillDetail[] {
  // If DB skills have explanations, use those first
  if (dbSkills && dbSkills.some(s => s.explanation)) {
    return dbSkills.slice(0, 6).map(s => ({
      name: s.name,
      explanation: s.explanation || `Developing strong ${s.name.toLowerCase()} skills gives you an edge in this field.`,
    }));
  }

  if (skillDetails[careerId]) return skillDetails[careerId];
  
  const explanationTemplates: Record<string, string> = {
    "communication": "Expressing your ideas clearly so teammates, clients, and stakeholders actually understand what you mean.",
    "teamwork": "Working with different personalities towards a shared goal — most jobs need you to collaborate, not just work solo.",
    "problem solving": "Breaking down tricky situations into smaller parts and figuring out what to do when there's no obvious answer.",
    "problem-solving": "Breaking down tricky situations into smaller parts and figuring out what to do when there's no obvious answer.",
    "leadership": "Guiding a group, making tough decisions, and taking responsibility when things go right or wrong.",
    "creativity": "Coming up with original ideas and fresh approaches instead of just doing things the way they've always been done.",
    "critical thinking": "Analysing information carefully before making decisions — not just accepting things at face value.",
    "time management": "Prioritising tasks and meeting deadlines without burning out — a skill every employer values.",
    "adaptability": "Adjusting quickly when plans change — the people who thrive are the ones who can pivot without panicking.",
    "attention to detail": "Catching small errors before they become big problems — precision matters in this field.",
    "research": "Finding reliable information, comparing sources, and drawing conclusions based on evidence.",
    "writing": "Putting your thoughts into clear, well-structured text that others can follow and act on.",
    "data analysis": "Making sense of numbers and patterns to inform decisions — spreadsheets are your friend here.",
    "project management": "Planning, organising, and tracking work from start to finish so nothing falls through the cracks.",
    "customer service": "Understanding what people need and delivering it with patience, empathy, and professionalism.",
    "public speaking": "Presenting ideas confidently in front of a group — nerve-wracking at first, but a superpower once you've got it.",
    "negotiation": "Reaching agreements where both sides feel like they've won — useful in every career, not just business.",
    "networking": "Building genuine professional relationships that open doors you didn't even know existed.",
    "technical skills": "Mastering the specific tools, software, or equipment used day-to-day in this profession.",
    "emotional intelligence": "Reading people's feelings and responding appropriately — crucial for working with humans.",
    "organisation": "Keeping your work, files, and priorities structured so you can find anything in seconds.",
    "mathematics": "Using numbers, calculations, and logical reasoning to solve practical problems in this field.",
    "design": "Creating visually appealing and functional solutions that people actually want to use.",
    "programming": "Writing code that tells computers exactly what to do — the language of the digital world.",
    "analysis": "Examining complex information to find patterns, trends, and insights that drive better decisions.",
  };

  return fallbackSkills.slice(0, 6).map((s) => {
    const key = s.toLowerCase().trim();
    const explanation = explanationTemplates[key] 
      || `Developing strong ${s.toLowerCase()} skills gives you an edge — employers in this field look for people who can do this well.`;
    return { name: s, explanation };
  });
}
