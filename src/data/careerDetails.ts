// Rich career detail content — role models, detailed skills, and "Imagine you at" scenarios
// Separated from careers.ts to keep files focused and manageable

export interface RoleModel {
  name: string;
  title: string;
  company: string;
  fact: string;
  quote: string;
  photoUrl: string;
}

export interface DetailedSkill {
  name: string;
  why: string;
  resource: string;
  resourceUrl: string;
}

export interface AgeSnapshot {
  age: number;
  scenario: string;
}

export interface CareerDetailContent {
  roleModels: RoleModel[];
  detailedSkills: DetailedSkill[];
  imagineYou: AgeSnapshot[];
}

const careerDetails: Record<string, CareerDetailContent> = {
  "ai-engineer": {
    roleModels: [
      {
        name: "Timnit Gebru",
        title: "AI Research Scientist & Founder",
        company: "DAIR Institute",
        fact: "Born in Ethiopia, she became one of the most influential voices in AI ethics and co-authored a landmark study on bias in facial recognition systems.",
        quote: "We need to ensure AI works for everyone, not just the privileged few.",
        photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Fei-Fei Li",
        title: "Professor of Computer Science",
        company: "Stanford University",
        fact: "Created ImageNet, the dataset that sparked the deep learning revolution. Immigrated from China at 16 speaking almost no English.",
        quote: "I believe in the power of AI to augment human ability — not replace it.",
        photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Moustapha Cissé",
        title: "Head of Google AI Centre",
        company: "Google Africa",
        fact: "From Senegal, he founded Google's first AI research centre in Africa (Accra, Ghana) to develop AI solutions tailored to African challenges.",
        quote: "Africa should not just consume AI — it should help create and shape it.",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Python Programming", why: "The primary language used to build, train, and deploy AI models. Nearly every AI tool and framework uses Python.", resource: "Codecademy Python", resourceUrl: "https://www.codecademy.com/learn/learn-python-3" },
      { name: "Linear Algebra & Calculus", why: "The mathematical foundation that makes neural networks and machine learning algorithms work under the hood.", resource: "Khan Academy", resourceUrl: "https://www.khanacademy.org/math/linear-algebra" },
      { name: "Machine Learning Fundamentals", why: "Understanding how algorithms learn from data — classification, regression, clustering — is the core of AI engineering.", resource: "Google ML Crash Course", resourceUrl: "https://developers.google.com/machine-learning/crash-course" },
      { name: "Data Wrangling", why: "Real-world data is messy. You need to clean, transform, and prepare datasets before any model can learn from them.", resource: "Kaggle Learn", resourceUrl: "https://www.kaggle.com/learn" },
      { name: "Neural Network Architecture", why: "Designing the structure of deep learning models — how many layers, what type, how they connect — determines what an AI can do.", resource: "3Blue1Brown Neural Networks", resourceUrl: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi" },
      { name: "Cloud Computing", why: "Training AI models requires massive computing power. You need to know how to use cloud platforms like AWS or Google Cloud.", resource: "Google Cloud Skills Boost", resourceUrl: "https://www.cloudskillsboost.google" },
      { name: "Version Control (Git)", why: "Working on AI projects with teams means tracking code changes, collaborating on experiments, and managing model versions.", resource: "GitHub Skills", resourceUrl: "https://skills.github.com" },
    ],
    imagineYou: [
      { age: 22, scenario: "You're in a computer lab at university, running your first real machine learning model on a dataset of satellite images. After three weeks of debugging, the model finally identifies crop disease patterns with 89% accuracy. Your professor asks to present it at a conference." },
      { age: 25, scenario: "You're at an AI startup in Lagos, headphones on, training a natural language processing model that understands Yoruba and Igbo. Your team's chatbot is about to launch in 12 hospitals across West Africa to help patients describe symptoms in their own language." },
      { age: 30, scenario: "You lead a team of 8 AI engineers at a global tech company. Your latest project — an AI system that predicts flood risks using weather data — just got deployed across 15 African countries. The UN invites you to speak at their climate summit." },
    ],
  },
  "dentist": {
    roleModels: [
      {
        name: "Dr. Enitan Sodipo",
        title: "Consultant Orthodontist",
        company: "Lagos University Teaching Hospital",
        fact: "One of Nigeria's leading orthodontists, she has trained over 200 dental professionals and advocates for affordable orthodontic care across West Africa.",
        quote: "Every child deserves a smile they're proud of — regardless of where they're born.",
        photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Dr. Mark Burhenne",
        title: "Family Dentist & Educator",
        company: "Ask the Dentist",
        fact: "Practised dentistry for over 30 years and built one of the world's largest online dental health education platforms reaching millions.",
        quote: "The mouth is the gateway to the rest of the body — take care of it.",
        photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Manual Dexterity", why: "You work inside tiny spaces — mouths — with sharp instruments. Steady, precise hand movements are non-negotiable.", resource: "Practice with model kits", resourceUrl: "https://www.youtube.com/results?search_query=dental+dexterity+exercises" },
      { name: "Human Anatomy & Physiology", why: "Understanding how teeth, gums, nerves, and jaw bones connect to the rest of the body is essential for diagnosis and treatment.", resource: "Khan Academy Biology", resourceUrl: "https://www.khanacademy.org/science/biology" },
      { name: "Radiograph Interpretation", why: "Reading dental X-rays to spot cavities, infections, and bone loss that aren't visible to the naked eye.", resource: "Radiopaedia", resourceUrl: "https://radiopaedia.org" },
      { name: "Patient Communication", why: "Many patients are anxious about dental visits. Explaining procedures calmly and clearly is just as important as the procedure itself.", resource: "Coursera Patient Communication", resourceUrl: "https://www.coursera.org/search?query=patient+communication" },
      { name: "Infection Control", why: "Dental work involves blood and saliva. Strict hygiene protocols prevent disease transmission between patients.", resource: "WHO Infection Prevention", resourceUrl: "https://www.who.int/infection-prevention" },
      { name: "Chemistry", why: "Understanding how dental materials — fillings, cements, bleaching agents — interact chemically with teeth and tissue.", resource: "Khan Academy Chemistry", resourceUrl: "https://www.khanacademy.org/science/chemistry" },
    ],
    imagineYou: [
      { age: 20, scenario: "You're in a dental simulation lab at university, practising on a realistic mannequin head. You just completed your first cavity filling on the model — the instructor says your technique is 'clean and confident.' You feel your hands getting steadier each week." },
      { age: 26, scenario: "It's 9am at your dental clinic in Abuja. Your first patient is a nervous 8-year-old who's never been to a dentist before. You show him the tools, let him press the water spray, and by the end he's laughing. His mum thanks you — he's already asking when he can come back." },
      { age: 32, scenario: "You run your own practice with two other dentists. You've just invested in a 3D scanner that creates digital impressions — no more messy moulds. On weekends, you volunteer at a free dental clinic in a rural community, treating 40 patients a day." },
    ],
  },
  "aerospace-engineer": {
    roleModels: [
      {
        name: "Kwasi Adjei-Brenyah",
        title: "Spacecraft Systems Engineer",
        company: "NASA Jet Propulsion Laboratory",
        fact: "Ghanaian-American engineer who worked on the Mars Perseverance rover, specifically on the systems that help the rover navigate Martian terrain autonomously.",
        quote: "Every time the rover moves on Mars, I remember the nights I spent debugging the code that makes it possible.",
        photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Gwynne Shotwell",
        title: "President & COO",
        company: "SpaceX",
        fact: "Joined SpaceX as its 7th employee and built it into the world's most successful private space company, overseeing every Falcon 9 and Starship launch.",
        quote: "I didn't know I wanted to be a rocket scientist until someone showed me it was possible.",
        photoUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Aerodynamics", why: "Understanding how air flows around aircraft and rockets — the science that determines whether something flies or falls.", resource: "NASA Aerodynamics Guide", resourceUrl: "https://www.grc.nasa.gov/www/k-12/airplane/bga.html" },
      { name: "CAD Software (SolidWorks/CATIA)", why: "You design every component of an aircraft or spacecraft digitally before anything gets built. CAD is your primary design tool.", resource: "Onshape (free)", resourceUrl: "https://www.onshape.com/en/education" },
      { name: "Thermodynamics", why: "Rockets generate extreme heat. Understanding heat transfer keeps engines from melting and astronauts safe.", resource: "MIT OpenCourseWare", resourceUrl: "https://ocw.mit.edu/courses/16-050-thermal-energy-fall-2002/" },
      { name: "Materials Science", why: "Choosing the right materials — lightweight but strong enough to survive supersonic speeds and extreme temperatures.", resource: "Materials Project", resourceUrl: "https://materialsproject.org" },
      { name: "Systems Engineering", why: "An aircraft has millions of parts. You need to understand how every subsystem connects and what happens when one fails.", resource: "NASA Systems Engineering Handbook", resourceUrl: "https://www.nasa.gov/reference/systems-engineering-handbook/" },
      { name: "MATLAB/Python Programming", why: "Running simulations, analyzing flight data, and testing designs computationally before building expensive prototypes.", resource: "MATLAB Onramp (free)", resourceUrl: "https://matlabacademy.mathworks.com" },
    ],
    imagineYou: [
      { age: 22, scenario: "You're in a university wind tunnel lab, testing a wing design you modelled in CAD. The sensor data shows your airfoil produces 12% more lift than the baseline. Your professor says it's one of the best designs she's seen from an undergraduate." },
      { age: 26, scenario: "You're at an aerospace company in Cape Town, reviewing stress analysis results on a new drone frame. The carbon fibre composite you selected passes all the load tests. Your design will be used in drones that deliver medical supplies to remote clinics." },
      { age: 30, scenario: "You're in a control room watching a satellite you helped design separate from its rocket and deploy its solar panels 600km above Earth. Three years of work — and it's now orbiting the planet, providing internet to rural communities across Africa." },
    ],
  },
  "music-producer": {
    roleModels: [
      {
        name: "Sarz",
        title: "Music Producer & Songwriter",
        company: "Sarz Academy",
        fact: "Nigerian producer behind global Afrobeats hits for Wizkid, Beyoncé, and Drake. Built his own production academy in Lagos to train the next generation.",
        quote: "I started making beats on a cracked version of FL Studio in my bedroom in Lagos. Now my sounds are on stages worldwide.",
        photoUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Rvssian",
        title: "Record Producer",
        company: "Head Concussion Records",
        fact: "Jamaican producer who went from making dancehall beats in Kingston to producing for global artists like Ed Sheeran, Cardi B, and Kanye West.",
        quote: "Stay authentic to your sound. The world will come to you.",
        photoUrl: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "DAW Proficiency (FL Studio/Ableton)", why: "A Digital Audio Workstation is your main instrument. Every beat, mix, and master happens here.", resource: "BandLab (free)", resourceUrl: "https://www.bandlab.com" },
      { name: "Music Theory", why: "Understanding chords, scales, and song structure lets you compose melodies that actually move people emotionally.", resource: "musictheory.net", resourceUrl: "https://www.musictheory.net" },
      { name: "Sound Design", why: "Creating unique sounds from scratch — synths, drums, textures — is what makes your productions stand out from everyone else's.", resource: "Syntorial", resourceUrl: "https://www.syntorial.com" },
      { name: "Mixing & Mastering", why: "Making all the instruments sit together properly in a track so it sounds polished and professional on any speaker.", resource: "Mixing Secrets (YouTube)", resourceUrl: "https://www.youtube.com/results?search_query=mixing+tutorial+beginners" },
      { name: "Ear Training", why: "Recognising pitch, intervals, and frequencies by ear helps you make faster, better decisions in the studio.", resource: "tonedear.com", resourceUrl: "https://tonedear.com" },
      { name: "Music Business & Copyright", why: "Understanding publishing, royalties, and splits means you actually get paid for your work.", resource: "Coursera Music Business", resourceUrl: "https://www.coursera.org/search?query=music+business" },
    ],
    imagineYou: [
      { age: 19, scenario: "You're in your bedroom studio at 2am, headphones on, layering a highlife guitar sample over an 808 bass pattern. You upload it to BandLab and wake up to 3,000 plays. An artist in your DMs wants to use it on their EP." },
      { age: 24, scenario: "You're in a professional recording studio in Lagos, producing a track for an Afrobeats artist whose last song hit 50 million streams. The vocalist nails the hook on the third take. You both know this one is special." },
      { age: 28, scenario: "Your production credit appears on a song that charts in 12 countries. You're invited to a songwriting camp in London with producers from across the globe. Your unique Afrobeats-infused sound is now influencing pop music worldwide." },
    ],
  },
  "architect": {
    roleModels: [
      {
        name: "Kunlé Adeyemi",
        title: "Architect & Founder",
        company: "NLÉ Works",
        fact: "Nigerian architect who designed the famous Makoko Floating School in Lagos — a structure that became a global symbol of innovative African architecture.",
        quote: "Architecture in Africa isn't about copying the West. It's about solving our own problems with our own genius.",
        photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Mariam Kamara",
        title: "Principal Architect",
        company: "Atelier Masōmī",
        fact: "From Niger, she designs culturally rooted buildings across West Africa. Her Niamey Cultural Centre won international acclaim for blending tradition with modern design.",
        quote: "Good architecture doesn't impose — it listens to the people and the land.",
        photoUrl: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Spatial Reasoning", why: "The ability to visualise how a building will look and feel in 3D before it's built — how light enters, how people move through it.", resource: "SketchUp Free", resourceUrl: "https://www.sketchup.com/plans-and-pricing/sketchup-free" },
      { name: "Technical Drawing & CAD", why: "Every building starts as precise drawings with exact measurements. AutoCAD and Revit are the industry standard tools.", resource: "AutoCAD Web (free)", resourceUrl: "https://web.autocad.com" },
      { name: "Structural Understanding", why: "Knowing how forces act on a building — gravity, wind, earthquakes — so your designs don't just look good, they stand up.", resource: "MIT Structures Course", resourceUrl: "https://ocw.mit.edu/courses/1-050-engineering-mechanics-i-fall-2007/" },
      { name: "Sustainable Design", why: "Modern architecture must consider energy efficiency, natural ventilation, and environmental impact. Green buildings are the future.", resource: "LEED Green Building", resourceUrl: "https://www.usgbc.org/leed" },
      { name: "Model Making", why: "Physical and digital models help clients and teams understand your vision. It's how you sell your ideas.", resource: "Tinkercad (free 3D)", resourceUrl: "https://www.tinkercad.com" },
      { name: "History of Architecture", why: "Understanding how buildings evolved across cultures helps you design with context and meaning, not just aesthetics.", resource: "ArchDaily", resourceUrl: "https://www.archdaily.com" },
    ],
    imagineYou: [
      { age: 22, scenario: "You're at your desk in architecture school, building a scale model of a community library out of basswood and card. Your studio critic walks by, pauses, and says 'This one has something.' You stay up until 3am perfecting the entrance canopy." },
      { age: 26, scenario: "You're on a construction site in Accra at 7:30am, hard hat on, checking that the foundation walls match your drawings exactly. The contractor asks about a drainage detail — you pull up the plan on your tablet and solve it on the spot." },
      { age: 32, scenario: "Your firm just won a competition to design a new primary school in Kigali. The brief asked for a building that stays cool without air conditioning. Your design uses cross-ventilation and local stone. Construction starts in 6 months." },
    ],
  },
  "climate-scientist": {
    roleModels: [
      {
        name: "Hindou Oumarou Ibrahim",
        title: "Environmental Activist & Geographer",
        company: "Association of Indigenous Women and Peoples of Chad",
        fact: "Chadian climate advocate who combines indigenous knowledge with satellite data to map climate change impacts in the Sahel region.",
        quote: "Indigenous communities have been reading the climate for thousands of years. Science should listen.",
        photoUrl: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Katharine Hayhoe",
        title: "Chief Scientist",
        company: "The Nature Conservancy",
        fact: "One of the world's most respected climate communicators, named by TIME as one of the 100 Most Influential People for making climate science accessible.",
        quote: "The most important thing you can do about climate change is talk about it.",
        photoUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Data Analysis & Statistics", why: "Climate science runs on data — temperature records, sea levels, carbon concentrations. You need to spot trends in massive datasets.", resource: "Khan Academy Statistics", resourceUrl: "https://www.khanacademy.org/math/statistics-probability" },
      { name: "GIS & Remote Sensing", why: "Using satellite imagery and geographic information systems to map environmental changes across regions and continents.", resource: "QGIS (free)", resourceUrl: "https://qgis.org" },
      { name: "Climate Modelling", why: "Building computer simulations that predict how temperature, rainfall, and sea levels will change over decades.", resource: "EdX Climate Science", resourceUrl: "https://www.edx.org/learn/climate-change" },
      { name: "Scientific Writing", why: "Communicating your findings clearly in research papers and policy reports that influence government decisions.", resource: "Coursera Science Writing", resourceUrl: "https://www.coursera.org/search?query=scientific+writing" },
      { name: "Python/R for Research", why: "Processing climate data, creating visualisations, and running statistical models — programming is essential for modern research.", resource: "Python for Earth Science", resourceUrl: "https://www.kaggle.com/learn" },
      { name: "Environmental Chemistry", why: "Understanding greenhouse gas cycles, ocean acidification, and atmospheric chemistry that drive climate change.", resource: "Khan Academy Chemistry", resourceUrl: "https://www.khanacademy.org/science/chemistry" },
    ],
    imagineYou: [
      { age: 22, scenario: "You're in a university lab downloading rainfall data from weather stations across the Sahel. Your analysis shows a clear shift in rainy season timing over 20 years. Your supervisor says this could become a published paper." },
      { age: 26, scenario: "You're at a field station in Northern Kenya, installing a solar-powered weather sensor on a metal pole. This is one of 50 sensors your project is placing across East Africa to build the most detailed climate dataset the region has ever had." },
      { age: 30, scenario: "You present your research to delegates at COP35. Your data shows that mangrove restoration in West Africa has captured 3x more carbon than expected. Two governments ask to meet with you about expanding the programme." },
    ],
  },
  "data-scientist": {
    roleModels: [
      {
        name: "Olubayo Adekanmbi",
        title: "Founder & CEO",
        company: "Data Science Nigeria",
        fact: "Built the largest data science community in Africa, training over 500,000 Nigerians in AI and data skills through free bootcamps and competitions.",
        quote: "Data is the new oil, and Africa is sitting on an ocean of it. We just need to build the refineries.",
        photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Cassie Kozyrkov",
        title: "Chief Decision Scientist",
        company: "Google",
        fact: "Created Google's decision intelligence discipline and has trained over 20,000 Googlers in data-driven decision making.",
        quote: "Statistics is the science of changing your mind. Data science is the engineering of it.",
        photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Python Programming", why: "Used to clean, analyse, and model large datasets. Pandas, NumPy, and scikit-learn are your daily tools.", resource: "Replit (free)", resourceUrl: "https://replit.com" },
      { name: "SQL (Database Queries)", why: "Most company data lives in databases. SQL lets you pull exactly the data you need for analysis.", resource: "SQLBolt", resourceUrl: "https://sqlbolt.com" },
      { name: "Statistics & Probability", why: "Understanding distributions, significance tests, and probability is how you know if your findings are real or just noise.", resource: "Khan Academy Statistics", resourceUrl: "https://www.khanacademy.org/math/statistics-probability" },
      { name: "Data Visualisation", why: "Turning numbers into charts and dashboards that non-technical people can understand and act on.", resource: "Tableau Public (free)", resourceUrl: "https://public.tableau.com" },
      { name: "Machine Learning", why: "Building predictive models — like forecasting which customers will churn or what products will sell — is core to the role.", resource: "Google ML Crash Course", resourceUrl: "https://developers.google.com/machine-learning/crash-course" },
      { name: "Business Thinking", why: "The best data scientists don't just crunch numbers — they understand the business problem and translate data into decisions.", resource: "Harvard Business Review", resourceUrl: "https://hbr.org/topic/data" },
      { name: "Excel & Spreadsheets", why: "Still the most widely used data tool in the world. Quick analysis, pivot tables, and sharing results with non-technical teams.", resource: "Google Sheets", resourceUrl: "https://sheets.google.com" },
    ],
    imagineYou: [
      { age: 22, scenario: "You've just finished a Kaggle competition where you predicted crop yields using satellite imagery. Your model ranked in the top 5%. A recruiter from a Lagos fintech company sends you a LinkedIn message." },
      { age: 25, scenario: "You're at a fintech startup, staring at a dashboard you built. Your fraud detection model just flagged 47 suspicious transactions overnight — saving the company ₦12 million. Your manager calls it 'the best hire decision we've made.'" },
      { age: 30, scenario: "You lead a data team of 6 at a pan-African bank. Your credit scoring model — trained on mobile money data — has helped 200,000 small business owners get their first loans. You're presenting the results at a conference in Nairobi." },
    ],
  },
  "film-director": {
    roleModels: [
      {
        name: "Kunle Afolayan",
        title: "Film Director & Producer",
        company: "Golden Effects Pictures",
        fact: "Nigerian filmmaker whose movie 'The Figurine' revived Nollywood cinema. His films have screened at Toronto, Berlin, and London film festivals.",
        quote: "Nollywood taught me that you don't need Hollywood's budget to tell a powerful story.",
        photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Wanuri Kahiu",
        title: "Film Director",
        company: "AFROBUBBLEGUM",
        fact: "Kenyan director whose sci-fi film 'Pumzi' was the first Kenyan film screened at Sundance. She champions 'fun, fierce, and frivolous' African storytelling.",
        quote: "African stories don't always have to be about struggle. We deserve joy, fantasy, and wonder on screen too.",
        photoUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Visual Storytelling", why: "Telling a story through images, camera angles, and movement — not just dialogue. The best directors speak through what you see.", resource: "Every Frame a Painting (YouTube)", resourceUrl: "https://www.youtube.com/c/everyframeapainting" },
      { name: "Shot Composition", why: "Knowing where to place the camera, how to frame a face, when to go wide or close — this is what makes a scene feel right.", resource: "StudioBinder", resourceUrl: "https://www.studiobinder.com/blog/rules-of-shot-composition-in-film/" },
      { name: "Video Editing", why: "Editing is where the film is actually made. Cutting, pacing, and sequencing determine whether your audience stays gripped or gets bored.", resource: "DaVinci Resolve (free)", resourceUrl: "https://www.blackmagicdesign.com/products/davinciresolve/" },
      { name: "Directing Actors", why: "Getting authentic performances means knowing how to communicate emotion, motivation, and energy to your cast.", resource: "MasterClass trailers", resourceUrl: "https://www.youtube.com/results?search_query=directing+actors+masterclass" },
      { name: "Scriptwriting Basics", why: "Even if you don't write scripts yourself, understanding screenplay structure helps you interpret and improve any script you direct.", resource: "WriterSolo (free)", resourceUrl: "https://www.writersolo.com" },
      { name: "Sound Design Awareness", why: "Half of filmmaking is sound. Knowing how music, dialogue, and ambient sound create mood separates good directors from great ones.", resource: "Filmmaking guides (YouTube)", resourceUrl: "https://www.youtube.com/results?search_query=film+sound+design+beginners" },
    ],
    imagineYou: [
      { age: 20, scenario: "You're on a rooftop in Lagos with your phone on a cheap tripod, directing your friend in a 3-minute short film. You uploaded it to YouTube last night and woke up to 15,000 views. Someone in the comments calls it 'better than most Nollywood.'" },
      { age: 25, scenario: "You're on a film set — your film set — calling 'Action!' for the first time on a properly funded short. The crew is 12 people, you have a boom mic, lighting rigs, and a cinematographer who believes in your vision. The lead actress delivers a take that gives you chills." },
      { age: 30, scenario: "Your debut feature film premieres at the Toronto International Film Festival. You sit in the back of a 400-seat theatre watching 400 strangers laugh, gasp, and cry at a story you wrote in your bedroom three years ago. Two distributors want to meet you after the screening." },
    ],
  },
  "game-developer": {
    roleModels: [
      {
        name: "Hugo Obi",
        title: "Founder & CEO",
        company: "Maliyo Games",
        fact: "Nigerian game developer who built one of Africa's first mobile game studios. His games — featuring African characters and settings — have been downloaded millions of times.",
        quote: "I wanted African kids to see characters that look like them when they pick up a phone to play.",
        photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Jade Raymond",
        title: "VP & Head of Studios",
        company: "PlayStation Studios (formerly Ubisoft/EA)",
        fact: "Led the creation of the Assassin's Creed franchise — one of the best-selling game series in history with over 200 million copies sold.",
        quote: "Games are the most powerful storytelling medium we have. You don't just watch — you live it.",
        photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Programming (C# or C++)", why: "The programming languages that power Unity (C#) and Unreal Engine (C++) — the two biggest game engines in the world.", resource: "Codecademy C#", resourceUrl: "https://www.codecademy.com/learn/learn-c-sharp" },
      { name: "Game Engine (Unity/Godot)", why: "Game engines handle physics, graphics, and input so you can focus on creating gameplay. Unity and Godot are free to start.", resource: "Unity Learn", resourceUrl: "https://learn.unity.com" },
      { name: "Game Design Principles", why: "Understanding what makes a game fun — reward loops, difficulty curves, player psychology — is what separates a good game from a forgettable one.", resource: "Game Design Toolkit (YouTube)", resourceUrl: "https://www.youtube.com/c/MarkBrownGMT" },
      { name: "2D/3D Art Basics", why: "Even if you specialise in code, understanding sprites, textures, and 3D models helps you communicate with artists and build prototypes.", resource: "Piskel (free pixel art)", resourceUrl: "https://www.piskelapp.com" },
      { name: "Level Design", why: "Creating game worlds that guide players, tell stories, and provide the right balance of challenge and reward.", resource: "World of Level Design", resourceUrl: "https://www.worldofleveldesign.com" },
      { name: "Version Control (Git)", why: "Game projects have thousands of files. Git lets you track changes, collaborate with teammates, and roll back mistakes.", resource: "GitHub Desktop", resourceUrl: "https://desktop.github.com" },
    ],
    imagineYou: [
      { age: 19, scenario: "You're at a 48-hour game jam, running on instant noodles and excitement. Your team of three has built a puzzle game set in a Lagos market. At the showcase, people crowd around your laptop laughing and competing for high scores. You win 'Most Creative.'" },
      { age: 24, scenario: "Your mobile game — an African mythology adventure — just hit 100,000 downloads on Google Play. Players in 23 countries are sending fan art. A games publisher in South Africa wants to fund your next project." },
      { age: 28, scenario: "You lead a studio of 15 developers building a story-driven RPG set in pre-colonial West Africa. Your game has been featured in IGN, Polygon, and Kotaku. Sony invites you to showcase it at their indie games event." },
    ],
  },
  "investment-banker": {
    roleModels: [
      {
        name: "Aigboje Aig-Imoukhuede",
        title: "Former Managing Director",
        company: "Access Bank",
        fact: "Transformed Access Bank from a small Nigerian bank into one of Africa's largest financial institutions. Co-founded the Africa Initiative for Governance.",
        quote: "The biggest deals start with the courage to think bigger than everyone else in the room.",
        photoUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Ruth Porat",
        title: "President & Chief Investment Officer",
        company: "Alphabet (Google)",
        fact: "Was CFO of Morgan Stanley during the 2008 financial crisis, helping stabilise the bank. Named 'the most powerful woman on Wall Street' by Fortune.",
        quote: "The numbers tell a story. Your job is to listen to what they're saying.",
        photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Financial Modelling (Excel)", why: "Building spreadsheet models that predict a company's future revenue, costs, and value — the foundation of every deal.", resource: "CFI Free Excel Course", resourceUrl: "https://corporatefinanceinstitute.com/resources/excel/" },
      { name: "Accounting Fundamentals", why: "Reading balance sheets, income statements, and cash flow statements to understand a company's financial health.", resource: "Khan Academy Accounting", resourceUrl: "https://www.khanacademy.org/economics-finance-domain/core-finance/accounting-and-financial-stateme" },
      { name: "Valuation Methods", why: "Calculating what a company is actually worth — using DCF, comparable analysis, and precedent transactions.", resource: "Investopedia Valuation", resourceUrl: "https://www.investopedia.com/terms/v/valuation.asp" },
      { name: "Presentation & Pitch Skills", why: "Creating and presenting pitch books to CEOs and boards — you need to be convincing, concise, and confident.", resource: "HBR Presenting", resourceUrl: "https://hbr.org/topic/presentations" },
      { name: "Market Analysis", why: "Understanding industry trends, competitor landscapes, and economic indicators that affect deal decisions.", resource: "Financial Times (free articles)", resourceUrl: "https://www.ft.com" },
      { name: "Negotiation", why: "Every deal involves negotiation — price, terms, structure. The best bankers find solutions that work for both sides.", resource: "Coursera Negotiation", resourceUrl: "https://www.coursera.org/learn/negotiation" },
    ],
    imagineYou: [
      { age: 22, scenario: "You're an intern at an investment bank in Lagos, sitting in a conference room at midnight building a financial model in Excel. The senior analyst checks your work, nods, and says 'This is going in the pitch deck tomorrow.' Your model will be shown to a CEO." },
      { age: 26, scenario: "You're in a boardroom in Johannesburg presenting a ₦50 billion acquisition deal. You've spent 6 weeks modelling every scenario. The client's CFO pushes back on your valuation — you defend it calmly with three supporting data points. They agree." },
      { age: 30, scenario: "You've just closed the biggest deal of your career — advising a Nigerian tech company on its IPO. The shares list on the stock exchange and jump 22% on the first day. Your phone is full of congratulations messages. You take your team out to celebrate." },
    ],
  },
  "software-engineer": {
    roleModels: [
      {
        name: "Ire Aderinokun",
        title: "Co-founder & VP of Engineering",
        company: "Helicarrier (formerly BuyCoins)",
        fact: "Nigerian software engineer and Google Developer Expert who built one of Nigeria's first cryptocurrency exchanges. She's also a prolific tech educator and blogger.",
        quote: "I taught myself to code from blog posts and free tutorials. If I can do it from Lagos, anyone can.",
        photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Prosper Otemuyiwa",
        title: "Developer Advocate & Engineer",
        company: "Novu (formerly Auth0, Cloudinary)",
        fact: "Nigerian developer who has contributed to major open-source projects and mentored thousands of African developers through technical content.",
        quote: "The code you write today can reach millions of people tomorrow. That's the power of software.",
        photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Margaret Hamilton",
        title: "Software Engineering Pioneer",
        company: "MIT / NASA",
        fact: "Wrote the onboard flight software for NASA's Apollo 11 mission. Her code literally put humans on the Moon and she coined the term 'software engineering.'",
        quote: "There was no choice but to be pioneers.",
        photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "JavaScript / TypeScript", why: "The language of the web. Every website you've ever used runs JavaScript. TypeScript adds type safety for large projects.", resource: "freeCodeCamp", resourceUrl: "https://www.freecodecamp.org" },
      { name: "HTML & CSS", why: "The building blocks of every web page. HTML structures content, CSS makes it look good. You need both from day one.", resource: "MDN Web Docs", resourceUrl: "https://developer.mozilla.org/en-US/docs/Learn" },
      { name: "Git & Version Control", why: "Every software team uses Git to track changes, collaborate on code, and manage releases without breaking things.", resource: "GitHub Skills", resourceUrl: "https://skills.github.com" },
      { name: "Problem Solving & Algorithms", why: "Breaking big problems into small, solvable steps — and knowing common patterns like sorting, searching, and recursion.", resource: "LeetCode (free tier)", resourceUrl: "https://leetcode.com" },
      { name: "APIs & Databases", why: "Most apps need to store data and communicate with other services. Understanding REST APIs and SQL databases is essential.", resource: "SQLBolt", resourceUrl: "https://sqlbolt.com" },
      { name: "Testing & Debugging", why: "Finding and fixing bugs systematically, and writing tests that catch problems before users do.", resource: "The Odin Project", resourceUrl: "https://www.theodinproject.com" },
      { name: "Command Line / Terminal", why: "Navigating your computer, running scripts, and managing servers through text commands — a fundamental developer skill.", resource: "Codecademy CLI", resourceUrl: "https://www.codecademy.com/learn/learn-the-command-line" },
    ],
    imagineYou: [
      { age: 20, scenario: "You're at a hackathon in Lagos, 14 hours in. Your team has built a web app that helps students find study groups near them. You push the final commit at 5am, demo it to the judges, and win second place. A mentor hands you their business card." },
      { age: 24, scenario: "You're a software engineer at a fintech startup in Nairobi. Your pull request just got approved — the payment feature you built will process its first real transaction tomorrow. 50,000 small business owners will use it within three months." },
      { age: 28, scenario: "You're a senior engineer leading a team of 5. Your mobile banking app serves 2 million users across 4 African countries. You spend your mornings reviewing code, afternoons mentoring junior engineers, and you just got promoted to engineering manager." },
    ],
  },
  "ux-designer": {
    roleModels: [
      {
        name: "Adekunle Oduye",
        title: "Design Systems Lead",
        company: "GitHub",
        fact: "Nigerian-American designer who built design systems at major tech companies including Etsy and GitHub, helping create consistent user experiences for millions.",
        quote: "Good design is invisible. When it works perfectly, nobody notices — and that's the point.",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Julie Zhuo",
        title: "Former VP of Product Design",
        company: "Facebook (Meta)",
        fact: "Joined Facebook as one of its first designers and grew the design team from a handful to hundreds, shaping how 3 billion people interact with Facebook.",
        quote: "A designer's job isn't to make things pretty. It's to make things work for real people.",
        photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "User Research", why: "Talking to real users to understand their problems, needs, and behaviours — before designing anything.", resource: "NNGroup UX Articles", resourceUrl: "https://www.nngroup.com/articles/" },
      { name: "Wireframing & Prototyping", why: "Creating quick, low-fidelity sketches and interactive prototypes to test ideas before writing any code.", resource: "Figma (free)", resourceUrl: "https://www.figma.com" },
      { name: "Visual Design Fundamentals", why: "Understanding colour, typography, spacing, and hierarchy to create interfaces that are both beautiful and usable.", resource: "Refactoring UI (tips)", resourceUrl: "https://www.refactoringui.com" },
      { name: "Usability Testing", why: "Watching real people use your designs to find problems you'd never notice on your own. This is where designs get better.", resource: "Maze (free plan)", resourceUrl: "https://maze.co" },
      { name: "Design Thinking", why: "A structured approach to solving problems: empathise, define, ideate, prototype, test. Used by designers at Google, Apple, and IDEO.", resource: "IDEO Design Thinking", resourceUrl: "https://designthinking.ideo.com" },
      { name: "Accessibility (a11y)", why: "Designing for people with disabilities — screen readers, colour blindness, motor impairments. Good design works for everyone.", resource: "WebAIM", resourceUrl: "https://webaim.org" },
    ],
    imagineYou: [
      { age: 21, scenario: "You're redesigning the checkout flow for a campus food delivery app as a class project. You tested it with 5 students — two couldn't find the 'confirm order' button. You move it, retest, and completion rates jump from 60% to 95%." },
      { age: 25, scenario: "You're in a product review meeting at a Lagos fintech startup. You've just presented three different app screen designs to the team. The CEO points at your second option and says 'this one feels right.' Your design ships to 40,000 users next week." },
      { age: 29, scenario: "You're the lead designer for a health app used across East Africa. A message from a user in rural Tanzania says: 'Your app helped me track my pregnancy and know when to go to the clinic. Thank you.' You screenshot it and pin it above your desk." },
    ],
  },
  "entrepreneur": {
    roleModels: [
      {
        name: "Shola Akinlade",
        title: "Co-founder & CEO",
        company: "Paystack",
        fact: "Nigerian entrepreneur who built Paystack from a two-person team to a payments giant acquired by Stripe for over $200 million — the largest startup acquisition in African history.",
        quote: "We didn't set out to build a billion-dollar company. We set out to solve a problem for Nigerian businesses.",
        photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Ngozi Dozie",
        title: "Co-founder",
        company: "Carbon (formerly Paylater)",
        fact: "Built one of Nigeria's first digital lending platforms, giving millions of Nigerians access to instant credit through their phones.",
        quote: "The best businesses in Africa will be built by people who deeply understand African problems.",
        photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Problem Identification", why: "The best businesses start by finding a real problem people will pay to solve. This skill comes before everything else.", resource: "Y Combinator Startup School", resourceUrl: "https://www.startupschool.org" },
      { name: "Financial Literacy", why: "Understanding revenue, costs, profit margins, and cash flow — so you know if your business is actually making money.", resource: "Khan Academy Finance", resourceUrl: "https://www.khanacademy.org/economics-finance-domain/core-finance" },
      { name: "Sales & Persuasion", why: "Every entrepreneur needs to sell — to customers, investors, partners, and future employees. Your idea means nothing if you can't convince people.", resource: "HubSpot Sales (free)", resourceUrl: "https://academy.hubspot.com/courses/inbound-sales" },
      { name: "Basic Coding / No-Code Tools", why: "Building a prototype or MVP yourself saves money and lets you move fast. Even basic skills help you communicate with developers.", resource: "Bubble (no-code)", resourceUrl: "https://bubble.io" },
      { name: "Marketing & Storytelling", why: "Getting people to know about your product — social media, content, branding — is how you grow without a massive budget.", resource: "Google Digital Garage", resourceUrl: "https://learndigital.withgoogle.com/digitalgarage" },
      { name: "Resilience & Adaptability", why: "Most startups fail. The ones that succeed are led by people who learn from failure, pivot, and keep going.", resource: "How I Built This (podcast)", resourceUrl: "https://www.npr.org/series/490248027/how-i-built-this" },
    ],
    imagineYou: [
      { age: 18, scenario: "You notice students at your school waste food because the tuckshop doesn't know what they actually want. You build a simple pre-order app using a no-code tool. Within 2 weeks, 80 students are using it daily and food waste drops by 40%." },
      { age: 24, scenario: "Your logistics startup has 3 employees and you just signed your 100th business customer. You're in a WeWork in Yaba at 11pm, preparing a pitch deck for a ₦50 million seed round. An investor you met at a conference last month just confirmed the meeting." },
      { age: 28, scenario: "Your company processes ₦2 billion in transactions monthly. You have 45 employees across Lagos and Nairobi. TechCrunch just published a profile on you. You remember the Google Form you used as your 'first product' — and laugh." },
    ],
  },
  "journalist": {
    roleModels: [
      {
        name: "Ruona Meyer",
        title: "Investigative Journalist",
        company: "BBC Africa Eye",
        fact: "Nigerian investigative journalist whose undercover documentary exposed sexual harassment at West African universities, leading to policy changes across multiple countries.",
        quote: "Journalism isn't about being popular. It's about telling the stories that need to be told, especially the uncomfortable ones.",
        photoUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Larry Madowo",
        title: "International Correspondent",
        company: "CNN",
        fact: "Kenyan journalist who became CNN's Nairobi-based correspondent, covering Africa for a global audience. Started his career at a local Kenyan TV station.",
        quote: "Africa's stories deserve the same depth and complexity as any other continent's stories.",
        photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Investigative Research", why: "Digging beneath the surface — verifying claims, finding documents, cross-referencing sources — is what separates journalism from gossip.", resource: "Google News Initiative", resourceUrl: "https://newsinitiative.withgoogle.com/resources/trainings/" },
      { name: "Interviewing", why: "Asking the right questions, in the right order, to get people to reveal the truth. A great interview can make a story.", resource: "Practice with friends", resourceUrl: "https://www.youtube.com/results?search_query=journalism+interview+techniques" },
      { name: "Writing for Clarity", why: "Turning complex events into clear, compelling stories that anyone can understand — in 300 words or 3,000.", resource: "Hemingway Editor (free)", resourceUrl: "https://hemingwayapp.com" },
      { name: "Digital Media Production", why: "Modern journalists shoot video, record podcasts, and create social media content — not just write articles.", resource: "Canva (free)", resourceUrl: "https://www.canva.com" },
      { name: "Fact-Checking", why: "Verifying every claim before publishing protects your credibility and prevents misinformation from spreading.", resource: "Africa Check", resourceUrl: "https://africacheck.org" },
      { name: "Media Law & Ethics", why: "Understanding defamation, source protection, and ethical boundaries keeps you and your sources safe.", resource: "Reuters Journalism Course", resourceUrl: "https://www.reuters.com/journalism-course/" },
    ],
    imagineYou: [
      { age: 20, scenario: "You're the editor of your university newspaper. Your investigation into missing student fees gets picked up by a national news site. The vice chancellor issues a statement within 48 hours. Your classmates start calling you 'the journalist.'" },
      { age: 25, scenario: "You're at a press conference in Abuja, live-tweeting a government policy announcement. Your thread gets 5,000 retweets because you're the only journalist who explains what the policy actually means for ordinary people." },
      { age: 30, scenario: "Your 6-month investigation into illegal mining in Northern Nigeria airs as a documentary on the BBC. It gets nominated for an award. Communities affected by the mining contact you to say 'someone finally told our story.'" },
    ],
  },
  "psychologist": {
    roleModels: [
      {
        name: "Dr. Jibril Abdulmalik",
        title: "Consultant Psychiatrist & Researcher",
        company: "University of Ibadan / WHO",
        fact: "Nigerian mental health researcher who has worked with the WHO to scale up mental health services across sub-Saharan Africa, where there's 1 psychiatrist per 1 million people.",
        quote: "Mental health is not a luxury. It is a fundamental part of health — and Africa deserves better access.",
        photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Brené Brown",
        title: "Research Professor",
        company: "University of Houston",
        fact: "Her TED talk on vulnerability has over 60 million views. Her research on shame, courage, and empathy has changed how the world thinks about mental health.",
        quote: "Vulnerability is not winning or losing. It's having the courage to show up when you can't control the outcome.",
        photoUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Active Listening", why: "Hearing not just words but emotions, patterns, and what's left unsaid. This is the foundation of every therapy session.", resource: "Coursera Active Listening", resourceUrl: "https://www.coursera.org/search?query=active+listening" },
      { name: "Psychological Assessment", why: "Administering and interpreting standardised tests that measure personality, cognitive ability, and mental health symptoms.", resource: "Verywell Mind", resourceUrl: "https://www.verywellmind.com" },
      { name: "Research Methods & Statistics", why: "Designing studies, collecting data, and analysing results — essential for understanding human behaviour scientifically.", resource: "Khan Academy Statistics", resourceUrl: "https://www.khanacademy.org/math/statistics-probability" },
      { name: "Cognitive Behavioural Techniques", why: "CBT is one of the most evidence-based therapy approaches. Understanding how thoughts, feelings, and behaviours connect.", resource: "Psychology Tools (free)", resourceUrl: "https://www.psychologytools.com" },
      { name: "Cultural Sensitivity", why: "Mental health looks different across cultures. Effective psychologists adapt their approach to each person's background.", resource: "APA Cultural Guidelines", resourceUrl: "https://www.apa.org/about/policy/multicultural-guidelines" },
      { name: "Empathy & Emotional Regulation", why: "Managing your own emotions while holding space for others' pain — without burning out — is a skill you build over years.", resource: "Headspace (basics free)", resourceUrl: "https://www.headspace.com" },
    ],
    imagineYou: [
      { age: 22, scenario: "You're in a university counselling placement, sitting across from a first-year student who's struggling with anxiety. You use a breathing technique you learned in class. Fifteen minutes later, their shoulders drop, they take a deep breath, and say 'I feel better.'" },
      { age: 27, scenario: "You're a clinical psychologist at a community mental health centre in Port Harcourt. A teenager you've been seeing for 3 months finally opens up about what's been troubling them. The trust took weeks to build — but today, the real work begins." },
      { age: 32, scenario: "You run a private practice and a group therapy programme for young adults dealing with anxiety and depression. You've also launched a podcast about mental health for Nigerian teenagers — it has 50,000 listeners. A school invites you to train their teachers." },
    ],
  },
  "cybersecurity-analyst": {
    roleModels: [
      {
        name: "Confidence Staveley",
        title: "Founder & CEO",
        company: "CyberSafe Foundation",
        fact: "Nigerian cybersecurity expert who founded Africa's leading digital safety organisation, training over 1 million people in cyber awareness across the continent.",
        quote: "Cybersecurity isn't just a tech issue — it's a human issue. We need to protect people, not just systems.",
        photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Katie Moussouris",
        title: "Founder & CEO",
        company: "Luta Security",
        fact: "Created Microsoft's first bug bounty programme and helped the US Department of Defense launch 'Hack the Pentagon.'",
        quote: "The best hackers are the ones who think like attackers but work for the defence.",
        photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Network Security Fundamentals", why: "Understanding how networks work — TCP/IP, firewalls, VPNs — so you can identify where attackers might break in.", resource: "Cisco Networking Basics", resourceUrl: "https://www.netacad.com/courses/networking/networking-basics" },
      { name: "Ethical Hacking", why: "Learning how hackers think and operate so you can find vulnerabilities before the bad guys do.", resource: "TryHackMe (free tier)", resourceUrl: "https://tryhackme.com" },
      { name: "Linux Command Line", why: "Most security tools and servers run on Linux. You need to be comfortable navigating and scripting in the terminal.", resource: "OverTheWire Bandit", resourceUrl: "https://overthewire.org/wargames/bandit/" },
      { name: "Incident Response", why: "When a breach happens, you need to act fast — contain the attack, investigate what happened, and prevent it from happening again.", resource: "SANS Incident Handling", resourceUrl: "https://www.sans.org/cyber-security-courses/incident-handler-training/" },
      { name: "Programming (Python)", why: "Writing scripts to automate security tasks, analyse logs, and build custom tools for threat detection.", resource: "Automate the Boring Stuff", resourceUrl: "https://automatetheboringstuff.com" },
      { name: "Risk Assessment", why: "Evaluating which threats are most likely and most damaging so you can prioritise what to protect first.", resource: "NIST Framework", resourceUrl: "https://www.nist.gov/cyberframework" },
    ],
    imagineYou: [
      { age: 21, scenario: "You're at a cybersecurity capture-the-flag competition, hunched over your laptop. You just cracked a simulated encryption challenge that stumped 80% of competitors. Your team finishes 3rd out of 200 — and a recruiter from a Big Four firm hands you a card." },
      { age: 25, scenario: "You're a security analyst at a Nigerian bank. At 3am, your monitoring system flags unusual login attempts from three countries simultaneously. You contain the threat within 20 minutes. The next morning, the CTO tells the board you prevented a potential ₦500 million breach." },
      { age: 29, scenario: "You lead the security operations centre for a pan-African fintech company. You've built a team of 8 analysts and developed a threat intelligence programme that shares data across African financial institutions. Forbes Africa profiles you in their '30 Under 30' issue." },
    ],
  },
  "surgeon": {
    roleModels: [
      {
        name: "Dr. Oluyinka Olutoye",
        title: "Surgeon-in-Chief & Professor",
        company: "Nationwide Children's Hospital, USA",
        fact: "Nigerian paediatric surgeon who performed groundbreaking surgery on a baby while still in the womb — removing a tumour and placing the baby back to continue developing.",
        quote: "Surgery is not just about cutting and stitching. It's about giving a child a future they would not have had.",
        photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Dr. Atul Gawande",
        title: "Surgeon & Public Health Leader",
        company: "Brigham and Women's Hospital / WHO",
        fact: "His 'Surgical Safety Checklist' has been adopted by hospitals in 120+ countries and has saved an estimated half a million lives.",
        quote: "Better is possible. It does not take genius. It takes diligence. It takes moral clarity.",
        photoUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Human Anatomy (in depth)", why: "You need to know every organ, blood vessel, and nerve in the body — because a 2mm mistake in surgery can change a life.", resource: "Visible Body (app)", resourceUrl: "https://www.visiblebody.com" },
      { name: "Manual Dexterity & Precision", why: "Operating with instruments inside the human body requires hand steadiness and fine motor control that takes years to develop.", resource: "Suturing practice kits", resourceUrl: "https://www.youtube.com/results?search_query=surgical+suturing+practice" },
      { name: "Decision Making Under Pressure", why: "In the operating room, you face split-second decisions where hesitation can cost a life. You train for this through simulation.", resource: "Clinical decision simulations", resourceUrl: "https://www.youtube.com/results?search_query=surgical+decision+making" },
      { name: "Biochemistry", why: "Understanding how drugs interact with the body, how anaesthesia works, and how wounds heal at a molecular level.", resource: "Khan Academy Biology", resourceUrl: "https://www.khanacademy.org/science/biology" },
      { name: "Stamina & Physical Endurance", why: "Surgeries can last 8-12 hours standing. You need physical and mental endurance to stay focused for the entire procedure.", resource: "Fitness training", resourceUrl: "https://www.youtube.com/results?search_query=surgeon+fitness+routine" },
      { name: "Communication & Empathy", why: "Explaining complex procedures to patients and families in plain language, and supporting them through fear and uncertainty.", resource: "Coursera Medical Communication", resourceUrl: "https://www.coursera.org/search?query=medical+communication" },
    ],
    imagineYou: [
      { age: 22, scenario: "You're in an anatomy lab at medical school, identifying structures on a cadaver. Your hands are steady as you trace the path of the brachial artery. The professor watches, nods, and says 'You have the hands for this.'" },
      { age: 28, scenario: "You're a surgical resident at Lagos University Teaching Hospital. It's 6am and you're scrubbing in for your first appendectomy as lead surgeon. Your consultant stands across the table watching. You make the first incision. Your hands don't shake." },
      { age: 35, scenario: "You're a consultant surgeon specialising in paediatric surgery. Today you operated on a 3-year-old with a congenital heart defect. The surgery took 7 hours. When you walk into the waiting room and tell the parents it went well, her mother cries and hugs you." },
    ],
  },
  "marine-biologist": {
    roleModels: [
      {
        name: "Oluniyi Fadahunsi",
        title: "Marine Conservation Researcher",
        company: "Nigerian Institute for Oceanography",
        fact: "Leading research on sea turtle conservation along the Nigerian coastline, working with local fishing communities to protect nesting sites.",
        quote: "The ocean feeds us, protects us, and gives us oxygen. The least we can do is protect it back.",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Sylvia Earle",
        title: "Marine Biologist & Explorer",
        company: "Mission Blue / National Geographic",
        fact: "At 88, she's dived to depths most humans will never reach. Named TIME's first 'Hero for the Planet' and has led over 100 expeditions.",
        quote: "No water, no life. No blue, no green.",
        photoUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Marine Biology & Ecology", why: "Understanding ocean ecosystems — how species interact, food chains work, and habitats function — is your core knowledge.", resource: "Coursera Marine Biology", resourceUrl: "https://www.coursera.org/search?query=marine+biology" },
      { name: "Scuba Diving (PADI certified)", why: "You collect samples, observe marine life, and conduct experiments underwater. Diving certification is a job requirement.", resource: "PADI eLearning", resourceUrl: "https://www.padi.com/courses/open-water-diver" },
      { name: "Data Collection & Analysis", why: "Recording species counts, water temperatures, and habitat changes over time — then analysing the data to spot trends.", resource: "Google Sheets / R", resourceUrl: "https://www.kaggle.com/learn" },
      { name: "Scientific Writing", why: "Publishing research papers that other scientists, governments, and conservation organisations use to make decisions.", resource: "Nature Masterclass", resourceUrl: "https://masterclasses.nature.com" },
      { name: "GPS & GIS Mapping", why: "Mapping coral reefs, tracking animal migration routes, and monitoring ocean temperature changes across regions.", resource: "QGIS (free)", resourceUrl: "https://qgis.org" },
      { name: "Species Identification", why: "Recognising hundreds of marine species — fish, corals, invertebrates — by sight, both alive and preserved.", resource: "iNaturalist (app)", resourceUrl: "https://www.inaturalist.org" },
    ],
    imagineYou: [
      { age: 22, scenario: "You're snorkelling off the coast of Lagos, clipboard in hand in a waterproof case, counting fish species around a rocky reef. You spot a species that hasn't been documented in this area before. Your supervisor gets excited — this could be a new paper." },
      { age: 26, scenario: "You're on a research vessel in the Gulf of Guinea, deploying underwater cameras to monitor dolphin populations. The footage you collect over 3 weeks will form the basis of a conservation report that goes to the Nigerian government." },
      { age: 30, scenario: "You lead a marine conservation project protecting mangrove forests along the West African coast. Your team has planted 50,000 mangrove seedlings. Satellite imagery shows your restoration area now supports 3x more fish species than five years ago." },
    ],
  },
  "chef": {
    roleModels: [
      {
        name: "Hilda Baci",
        title: "Chef & Restaurateur",
        company: "My Food by Hilda",
        fact: "Nigerian chef who broke the Guinness World Record for longest individual cooking marathon (93 hours and 11 minutes), bringing global attention to Nigerian cuisine.",
        quote: "Cooking is love made visible. I cook because I want people to feel something when they eat my food.",
        photoUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Michael Elégbèdé",
        title: "Executive Chef & Founder",
        company: "ÌTÀN Test Kitchen, Lagos",
        fact: "Nigerian chef trained at Le Cordon Bleu who returned to Lagos to create fine dining using exclusively Nigerian ingredients. Featured in Netflix's Chef's Table.",
        quote: "Nigerian food is one of the most complex and beautiful cuisines in the world. The world just doesn't know it yet.",
        photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Knife Skills", why: "Speed, precision, and safety with a knife — the most fundamental skill in any kitchen. Chefs practise this for years.", resource: "YouTube Knife Skills", resourceUrl: "https://www.youtube.com/results?search_query=chef+knife+skills+tutorial" },
      { name: "Flavour Pairing", why: "Understanding which ingredients complement each other — why tomato and basil work, why ginger and garlic elevate a stew.", resource: "Tasteatlas", resourceUrl: "https://www.tasteatlas.com" },
      { name: "Heat Management", why: "Knowing the difference between searing, braising, simmering, and roasting — and when to use each technique.", resource: "Serious Eats (free)", resourceUrl: "https://www.seriouseats.com" },
      { name: "Menu Design", why: "Creating a menu that balances flavours, costs, preparation time, and seasonal ingredients — this is how restaurants succeed.", resource: "Coursera Food & Beverage", resourceUrl: "https://www.coursera.org/search?query=food+and+beverage" },
      { name: "Food Safety & Hygiene", why: "Preventing foodborne illness is non-negotiable. You need to know temperature danger zones, cross-contamination, and storage rules.", resource: "ServSafe", resourceUrl: "https://www.servsafe.com" },
      { name: "Kitchen Management", why: "Running a kitchen means managing people, inventory, timing, and costs — all at the same time, during a dinner rush.", resource: "Restaurant management guides", resourceUrl: "https://www.youtube.com/results?search_query=kitchen+management+tips" },
    ],
    imagineYou: [
      { age: 19, scenario: "You're in culinary school, dicing onions at speed. Your instructor times you — 45 seconds for a perfect brunoise. Six months ago it took you 3 minutes. You can feel your hands getting faster and more confident every week." },
      { age: 24, scenario: "You're a sous chef at a busy restaurant in Victoria Island, Lagos. It's Saturday night, tickets are flying in, and you're plating 4 dishes at once. The head chef tastes your jollof rice sauce, pauses, and says 'Perfect. Don't change anything.'" },
      { age: 28, scenario: "You've just opened your own restaurant. The menu is 100% modern Nigerian cuisine — your grandmother's recipes reimagined. A food critic publishes a glowing review. On Friday night, every table is booked. You stand in the kitchen and smile." },
    ],
  },
  "robotics-engineer": {
    roleModels: [
      {
        name: "Silas Adekunle",
        title: "Robotics Engineer & Founder",
        company: "Reach Robotics",
        fact: "Nigerian-born robotics engineer who created the world's first gaming robot, MekaMon, and became the youngest person to lead a robotics company in the UK.",
        quote: "I grew up in Lagos dreaming about robots. Now I build them. Your background is never a limitation.",
        photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Cynthia Breazeal",
        title: "Professor of Media Arts & Sciences",
        company: "MIT Media Lab",
        fact: "Created Jibo, one of the first social robots, and pioneered the field of human-robot interaction. Her work explores how robots can be companions, not just tools.",
        quote: "The question isn't whether robots will be part of our lives. It's what kind of relationship we want to have with them.",
        photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Programming (Python/C++)", why: "Writing the code that tells robots what to do — from reading sensors to making decisions to moving actuators.", resource: "Codecademy Python", resourceUrl: "https://www.codecademy.com/learn/learn-python-3" },
      { name: "Electronics & Circuit Design", why: "Robots are made of motors, sensors, and microcontrollers. You need to understand how to wire and power them.", resource: "Arduino Starter Kit", resourceUrl: "https://www.arduino.cc/en/Guide" },
      { name: "Mechanical Design & CAD", why: "Designing the physical structure of a robot — joints, frames, grippers — using software before 3D printing or machining.", resource: "Onshape (free)", resourceUrl: "https://www.onshape.com/en/education" },
      { name: "Control Systems", why: "Making a robot move smoothly and accurately — PID controllers, feedback loops, and motion planning algorithms.", resource: "MATLAB Control Systems", resourceUrl: "https://matlabacademy.mathworks.com" },
      { name: "Computer Vision", why: "Giving robots 'eyes' — processing camera images so they can recognise objects, navigate spaces, and interact with the world.", resource: "OpenCV tutorials", resourceUrl: "https://opencv.org/university/" },
      { name: "3D Printing & Prototyping", why: "Building physical prototypes quickly and cheaply to test ideas before committing to expensive manufacturing.", resource: "Tinkercad (free)", resourceUrl: "https://www.tinkercad.com" },
    ],
    imagineYou: [
      { age: 21, scenario: "You're in the university robotics lab at 11pm. Your robot arm just successfully picked up a cup and placed it on a table — the 47th attempt. You punch the air. The mechanical design is yours, the code is yours, and it finally works." },
      { age: 25, scenario: "You're at a robotics company in Cape Town, testing an agricultural robot that detects diseased crops using computer vision. In field trials, it identifies blight 2 days before farmers would notice. This could save thousands of tonnes of food." },
      { age: 30, scenario: "You lead a team building delivery robots for African cities. Your robot navigates busy sidewalks in Lagos, avoids okadas, and delivers packages in 30 minutes. DHL wants to pilot your technology across 5 countries. You're on the cover of Wired Africa." },
    ],
  },
  "fashion-designer": {
    roleModels: [
      {
        name: "Lisa Folawiyo",
        title: "Creative Director",
        company: "Lisa Folawiyo Studio",
        fact: "Nigerian fashion designer who transformed Ankara fabric into global luxury fashion, dressing celebrities and showing at New York Fashion Week.",
        quote: "African fashion doesn't need validation from the West. It is already world-class.",
        photoUrl: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Kenneth Ize",
        title: "Fashion Designer",
        company: "Kenneth Ize (brand)",
        fact: "Nigerian designer who was a finalist for the LVMH Prize. He works with traditional Aso Oke weavers, preserving a centuries-old craft while creating modern fashion.",
        quote: "Fashion is a tool for cultural preservation. Every thread tells a story.",
        photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Fashion Illustration", why: "Sketching your designs by hand or digitally — this is how you communicate your vision before cutting any fabric.", resource: "Procreate (iPad)", resourceUrl: "https://procreate.com" },
      { name: "Pattern Making & Draping", why: "Translating a 2D sketch into a 3D garment — creating the templates that determine how fabric is cut and sewn.", resource: "YouTube pattern making", resourceUrl: "https://www.youtube.com/results?search_query=pattern+making+beginners" },
      { name: "Sewing & Construction", why: "Understanding how garments are actually built — seams, hems, closures, lining — is essential even if you eventually supervise others.", resource: "Sewing tutorials", resourceUrl: "https://www.youtube.com/results?search_query=beginner+sewing+tutorial" },
      { name: "Textile Knowledge", why: "Knowing the difference between cotton, silk, polyester, and wool — how they drape, breathe, and hold colour.", resource: "Textile learner", resourceUrl: "https://textilelearner.net" },
      { name: "Trend Forecasting", why: "Predicting what people will want to wear 12-18 months from now — colours, silhouettes, cultural influences.", resource: "WGSN (student access)", resourceUrl: "https://www.wgsn.com" },
      { name: "Fashion Business", why: "Understanding pricing, sourcing, supply chains, and branding — because great design means nothing if you can't sell it.", resource: "Business of Fashion (free articles)", resourceUrl: "https://www.businessoffashion.com" },
    ],
    imagineYou: [
      { age: 20, scenario: "You're hand-sewing beads onto an Ankara jacket for your end-of-year fashion show at school. Your fingers ache but each bead catches the light perfectly. On show night, the audience gasps when your model walks out. Three people ask to buy it." },
      { age: 25, scenario: "You have a small studio in Lekki with two seamstresses. Your Instagram following just hit 20,000 and a Nollywood actress wore your dress to an awards ceremony. The orders are pouring in — you need to hire another tailor." },
      { age: 29, scenario: "Your collection debuts at Lagos Fashion Week. Backstage, models are wearing your creations — each piece featuring Adire fabric dyed by artisans in Osogbo. A buyer from a London department store approaches you after the show." },
    ],
  },
  "pharmacist": {
    roleModels: [
      {
        name: "Dr. Stella Okoli",
        title: "Founder & CEO",
        company: "Emzor Pharmaceutical Industries",
        fact: "Nigerian pharmacist who built Emzor from scratch into one of Nigeria's largest pharmaceutical companies, producing affordable medicines for millions.",
        quote: "I started making paracetamol in a small room. Today we produce over 100 products. Anything is possible with persistence.",
        photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Dr. Vivian Nwakah",
        title: "Founder & CEO",
        company: "Medsaf",
        fact: "Nigerian pharmacist who created a technology platform that helps hospitals verify and source genuine medicines, fighting the counterfeit drug crisis in Africa.",
        quote: "Every fake drug that reaches a patient is a life at risk. Technology can fix this.",
        photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Pharmacology", why: "Understanding how drugs work in the body — mechanisms of action, side effects, and interactions between medications.", resource: "Khan Academy Biology", resourceUrl: "https://www.khanacademy.org/science/biology" },
      { name: "Organic Chemistry", why: "Understanding the chemical structure of drugs and how molecular changes affect their effectiveness and safety.", resource: "Khan Academy Organic Chemistry", resourceUrl: "https://www.khanacademy.org/science/organic-chemistry" },
      { name: "Patient Counselling", why: "Explaining to patients how to take their medication correctly, what side effects to expect, and when to seek help.", resource: "Coursera Health Communication", resourceUrl: "https://www.coursera.org/search?query=health+communication" },
      { name: "Drug Interaction Analysis", why: "Checking whether multiple medications taken together could be dangerous — this prevents serious harm.", resource: "Drugs.com Interaction Checker", resourceUrl: "https://www.drugs.com/drug_interactions.html" },
      { name: "Attention to Detail", why: "A single decimal point error in a dosage can be the difference between treatment and toxicity. Precision saves lives.", resource: "Pharmacy calculation practice", resourceUrl: "https://www.youtube.com/results?search_query=pharmacy+calculations+practice" },
      { name: "Regulatory Knowledge", why: "Understanding drug approval processes, prescription laws, and pharmaceutical regulations in your country.", resource: "WHO Essential Medicines", resourceUrl: "https://www.who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines" },
    ],
    imagineYou: [
      { age: 22, scenario: "You're in a pharmacy lab at university, using a mortar and pestle to compound a custom medication for a case study. Your formulation has to dissolve at exactly the right rate. You check the calculations three times — accuracy is everything here." },
      { age: 26, scenario: "You're working at a busy hospital pharmacy in Lagos. A doctor prescribes two medications that interact dangerously. You catch it, call the ward, and suggest a safe alternative. The doctor thanks you — your knowledge just protected a patient." },
      { age: 30, scenario: "You manage a chain of 5 community pharmacies across Abuja. You've implemented a digital system that tracks inventory and flags expiring medications. Your team counsels 200 patients daily. You're now training pharmacy students on clinical practice." },
    ],
  },
  "professional-athlete": {
    roleModels: [
      {
        name: "Tobi Amusan",
        title: "World Record Holder, 100m Hurdles",
        company: "Nigerian Athletics Federation",
        fact: "Set the world record in the 100m hurdles (12.12 seconds) at the 2022 World Championships in Oregon, becoming the first Nigerian world champion in a track event.",
        quote: "Every hurdle I clear is a reminder that limitations are just things you haven't broken through yet.",
        photoUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Victor Osimhen",
        title: "Professional Footballer",
        company: "SSC Napoli / Super Eagles",
        fact: "Grew up in the streets of Lagos, lost his mother at age 11, and became one of the most expensive African footballers in history, helping Napoli win Serie A.",
        quote: "Where I come from, football was the only way out. I made sure I was ready when the opportunity came.",
        photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Sport-Specific Training", why: "Mastering the technical skills of your sport — whether it's ball control, stroke technique, or sprint mechanics.", resource: "YouTube coaching channels", resourceUrl: "https://www.youtube.com/results?search_query=sport+specific+training" },
      { name: "Nutrition & Fuelling", why: "What you eat directly affects performance, recovery, and energy. Elite athletes treat food as fuel.", resource: "Precision Nutrition", resourceUrl: "https://www.precisionnutrition.com" },
      { name: "Mental Toughness", why: "Performing under pressure, recovering from losses, and staying motivated through years of training requires psychological strength.", resource: "Headspace Sport", resourceUrl: "https://www.headspace.com/sport" },
      { name: "Injury Prevention", why: "Understanding your body — warming up correctly, stretching, and listening to pain signals — keeps you on the field.", resource: "NHS Sport Injury Guide", resourceUrl: "https://www.nhs.uk/live-well/exercise/exercise-guidelines/" },
      { name: "Video Analysis", why: "Reviewing footage of your performance and your competitors to identify weaknesses and tactical opportunities.", resource: "Hudl (free for students)", resourceUrl: "https://www.hudl.com" },
      { name: "Financial Planning", why: "Athletic careers are short. Managing your earnings wisely during peak years ensures security long after retirement.", resource: "Khan Academy Personal Finance", resourceUrl: "https://www.khanacademy.org/college-careers-more/personal-finance" },
    ],
    imagineYou: [
      { age: 18, scenario: "You're at a national athletics trial, standing on the starting blocks. The stadium is loud but your mind is quiet. The gun fires. You run the race of your life and qualify for the national team. Your coach runs onto the track and lifts you up." },
      { age: 23, scenario: "You're in a training camp in Abuja, preparing for the African Games. Your personal best has improved three times this year. A European sports agent reaches out — they want to represent you. This is the call you've been training for." },
      { age: 27, scenario: "You stand on the podium at an international championship, the Nigerian flag rising behind you. Your mum is in the crowd, crying. You came from a small town in Edo State. Tonight, every child in that town believes they can do it too." },
    ],
  },
  "biomedical-engineer": {
    roleModels: [
      {
        name: "Valerie Thomas",
        title: "Inventor & NASA Scientist",
        company: "NASA",
        fact: "African-American physicist and inventor who created the illusion transmitter — technology that later influenced 3D imaging used in modern medical devices.",
        quote: "Innovation happens when you look at a problem and refuse to accept the existing solution.",
        photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Dr. Obinna Nnaji",
        title: "Biomedical Engineer & Inventor",
        company: "University of Nigeria, Nsukka",
        fact: "Nigerian engineer who developed affordable prosthetic limbs using locally sourced materials, making mobility aids accessible in communities that couldn't afford imported devices.",
        quote: "Engineering should serve the people who need it most, not just the people who can afford it.",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Biology & Physiology", why: "You're designing devices that interact with the human body — you must understand how organs, tissues, and cells work.", resource: "Khan Academy Biology", resourceUrl: "https://www.khanacademy.org/science/biology" },
      { name: "CAD & 3D Modelling", why: "Designing medical devices digitally — from prosthetic joints to surgical instruments — before manufacturing them.", resource: "Fusion 360 (free for students)", resourceUrl: "https://www.autodesk.com/products/fusion-360/personal" },
      { name: "Materials Science", why: "Choosing biocompatible materials — metals, polymers, ceramics — that won't be rejected by the human body.", resource: "MIT OpenCourseWare", resourceUrl: "https://ocw.mit.edu" },
      { name: "Electronics & Signal Processing", why: "Many medical devices — ECGs, EEGs, pulse oximeters — work by processing electrical signals from the body.", resource: "Arduino Health Projects", resourceUrl: "https://www.arduino.cc/en/Guide" },
      { name: "Regulatory & Quality Standards", why: "Medical devices must meet strict safety standards (ISO 13485, FDA/NAFDAC). Understanding regulations is mandatory.", resource: "FDA Device Basics", resourceUrl: "https://www.fda.gov/medical-devices" },
      { name: "Programming (Python/MATLAB)", why: "Analysing medical data, running simulations, and programming device firmware all require coding skills.", resource: "Replit", resourceUrl: "https://replit.com" },
    ],
    imagineYou: [
      { age: 22, scenario: "You're in a university biomedical lab, testing a low-cost pulse oximeter prototype you designed. It clips onto a finger and reads oxygen levels with 97% accuracy — matching devices that cost 10x more. Your professor submits it for a design competition." },
      { age: 26, scenario: "You work at a medical device company in Nairobi. Your team just finished a portable ultrasound device designed for rural clinics. You watch a midwife in a village use it for the first time — she sees the baby on screen and her eyes widen." },
      { age: 30, scenario: "You lead R&D at a health-tech startup. Your affordable prosthetic leg — 3D printed from recycled plastic — has been fitted to 500 amputees across West Africa. A global health foundation funds your expansion to 5 more countries." },
    ],
  },
  "environmental-engineer": {
    roleModels: [
      {
        name: "Dr. Oladele Osinbajo",
        title: "Environmental Engineer & Researcher",
        company: "University of Lagos",
        fact: "Nigerian environmental engineer whose research on water treatment using locally available materials has provided clean water solutions for communities in the Niger Delta.",
        quote: "Clean water is not a privilege — it's a right. Engineering can deliver that right to everyone.",
        photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Ellen MacArthur",
        title: "Founder",
        company: "Ellen MacArthur Foundation",
        fact: "After breaking the world record for solo sailing around the globe, she founded a foundation that's changed how the world thinks about circular economy and waste.",
        quote: "There is no such thing as waste — only materials in the wrong place.",
        photoUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Water Treatment Engineering", why: "Designing systems that make water safe to drink — filtration, chlorination, and biological treatment methods.", resource: "EPA Water Resources", resourceUrl: "https://www.epa.gov/learn-issues/learn-about-water" },
      { name: "Environmental Impact Assessment", why: "Evaluating how construction projects, factories, and infrastructure affect the surrounding environment and communities.", resource: "IAIA Resources", resourceUrl: "https://www.iaia.org" },
      { name: "GIS & Remote Sensing", why: "Mapping pollution sources, flood risk zones, and deforestation patterns using satellite data and geographic software.", resource: "QGIS (free)", resourceUrl: "https://qgis.org" },
      { name: "Chemistry & Chemical Engineering", why: "Understanding how pollutants behave in water, air, and soil — and how to chemically neutralise or remove them.", resource: "Khan Academy Chemistry", resourceUrl: "https://www.khanacademy.org/science/chemistry" },
      { name: "Project Management", why: "Environmental projects involve multiple stakeholders, budgets, timelines, and regulations. Managing complexity is key.", resource: "Trello (free)", resourceUrl: "https://trello.com" },
      { name: "Sustainability & Circular Economy", why: "Designing systems where waste becomes a resource — the future of engineering is circular, not linear.", resource: "Ellen MacArthur Foundation", resourceUrl: "https://www.ellenmacarthurfoundation.org/topics/circular-economy-introduction/overview" },
    ],
    imagineYou: [
      { age: 22, scenario: "You're in a university lab testing a water filter made from locally sourced clay and silver nanoparticles. Your filter removes 99% of bacteria from contaminated water. Your thesis supervisor says it could be manufactured for under $5." },
      { age: 26, scenario: "You're on site at a new housing estate in Abuja, inspecting the rainwater harvesting system you designed. It will collect, filter, and store enough water to supply 200 families during the dry season — reducing their dependence on water tankers." },
      { age: 30, scenario: "You're the lead environmental engineer on a project to rehabilitate a polluted river in the Niger Delta. After 18 months of work, fish are returning to sections of the river that were lifeless. Local fishermen thank your team at a community meeting." },
    ],
  },
  "tv-presenter": {
    roleModels: [
      {
        name: "Ebuka Obi-Uchendu",
        title: "TV Presenter & Lawyer",
        company: "Channels TV / Big Brother Naija",
        fact: "Nigerian media personality who went from being a Big Brother contestant to becoming Nigeria's most recognisable TV host, known for his sharp style and smooth delivery.",
        quote: "Presenting isn't just talking. It's connecting — making millions of people feel like you're speaking directly to them.",
        photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Zainab Balogun",
        title: "TV Presenter, Actress & Entrepreneur",
        company: "EbonyLife TV / Various",
        fact: "British-Nigerian actress and presenter who transitioned from modelling in London to becoming one of Nollywood's most versatile on-screen talents.",
        quote: "The camera can tell when you're not being authentic. Be yourself — that's your superpower.",
        photoUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "On-Camera Presence", why: "Looking comfortable, confident, and natural in front of a camera — this takes practice and self-awareness.", resource: "Record yourself daily", resourceUrl: "https://www.youtube.com/results?search_query=how+to+be+confident+on+camera" },
      { name: "Improvisation", why: "Live TV goes wrong — guests are late, autocues break, things happen. You need to think on your feet and keep the show running.", resource: "Improv exercises", resourceUrl: "https://www.youtube.com/results?search_query=improv+exercises+beginners" },
      { name: "Interviewing", why: "Asking questions that make guests open up, tell stories, and give answers that audiences care about.", resource: "Larry King interview tips", resourceUrl: "https://www.youtube.com/results?search_query=interviewing+tips+tv+presenter" },
      { name: "Voice & Diction", why: "Clear pronunciation, varied tone, and good pacing make the difference between a boring presenter and a captivating one.", resource: "Vocal warm-up exercises", resourceUrl: "https://www.youtube.com/results?search_query=vocal+warm+up+for+presenters" },
      { name: "Script Writing & Teleprompter", why: "Writing your own links, intros, and questions — and reading from a teleprompter without sounding robotic.", resource: "Practice with phone teleprompter app", resourceUrl: "https://www.youtube.com/results?search_query=teleprompter+practice" },
      { name: "Social Media & Personal Brand", why: "Modern presenters build audiences across platforms. Your Instagram and YouTube following can open doors that auditions can't.", resource: "Canva (free)", resourceUrl: "https://www.canva.com" },
    ],
    imagineYou: [
      { age: 20, scenario: "You're presenting your university's online radio show for the third time. This week's guest doesn't show up. You improvise — interview a classmate about exam stress instead. The episode gets 2x the normal listens. Your producer says 'That was your best one yet.'" },
      { age: 24, scenario: "You're in the studio for your first live TV segment on a morning show in Lagos. The countdown hits zero. The red light goes on. You look at the camera, smile, and deliver your 90-second entertainment news roundup without a single stumble." },
      { age: 28, scenario: "You host a prime-time culture show that gets 4 million viewers weekly. Last night you interviewed a Grammy-winning artist. Your social media clips from the interview are trending. A production company approaches you about hosting a new pan-African travel show." },
    ],
  },
  "wildlife-conservationist": {
    roleModels: [
      {
        name: "Gladys Kalema-Zikusoka",
        title: "Wildlife Veterinarian & Founder",
        company: "Conservation Through Public Health (Uganda)",
        fact: "Ugandan vet who became the first wildlife veterinarian for the Uganda Wildlife Authority and pioneered the link between gorilla health and community health.",
        quote: "You can't save wildlife without saving the communities around them. Conservation is about people too.",
        photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Wangari Maathai",
        title: "Environmental Activist & Nobel Laureate",
        company: "Green Belt Movement (Kenya)",
        fact: "Kenyan environmentalist who planted over 51 million trees across Africa and became the first African woman to win the Nobel Peace Prize.",
        quote: "Until you dig a hole, plant a tree, water it, and make it survive, you haven't done a thing. You are just talking.",
        photoUrl: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Wildlife Biology", why: "Understanding animal behaviour, population dynamics, and ecosystem interactions — the science behind conservation decisions.", resource: "Coursera Wildlife Conservation", resourceUrl: "https://www.coursera.org/search?query=wildlife+conservation" },
      { name: "Field Research Methods", why: "Tracking animals, setting camera traps, collecting samples, and recording data in harsh outdoor conditions.", resource: "iNaturalist (app)", resourceUrl: "https://www.inaturalist.org" },
      { name: "GIS & GPS Tracking", why: "Mapping animal territories, migration routes, and habitat boundaries using satellite and GPS technology.", resource: "QGIS (free)", resourceUrl: "https://qgis.org" },
      { name: "Community Engagement", why: "Conservation only works when local communities support it. Building trust and involving people is essential.", resource: "Conservation Leadership", resourceUrl: "https://www.conservationleadershipprogramme.org" },
      { name: "Grant Writing & Fundraising", why: "Conservation projects need funding. Writing compelling proposals to donors and organisations keeps programmes alive.", resource: "Grant writing guides", resourceUrl: "https://www.youtube.com/results?search_query=grant+writing+for+conservation" },
      { name: "Photography & Documentation", why: "Capturing images and footage of wildlife for research records, awareness campaigns, and fundraising materials.", resource: "Wildlife photography basics", resourceUrl: "https://www.youtube.com/results?search_query=wildlife+photography+beginners" },
    ],
    imagineYou: [
      { age: 22, scenario: "You're in Yankari National Park in Nigeria, kneeling by a watering hole at dawn. You're counting elephants through binoculars for a population survey. You count 23 — three more than last year's count. The conservation programme is working." },
      { age: 26, scenario: "You're leading an anti-poaching patrol in a national park in Kenya. Your team discovers and dismantles 15 wire snares set by poachers. You report the GPS coordinates, and rangers increase patrols in the area. Two weeks later, a family of giraffes is spotted safely grazing there." },
      { age: 30, scenario: "You direct a conservation programme that protects 50,000 hectares of rainforest in the Congo Basin. Your community-based approach — paying local families to be forest guardians — has reduced deforestation by 70%. National Geographic features your work." },
    ],
  },
  "sports-physiotherapist": {
    roleModels: [
      {
        name: "Dr. Adaeze Oreh",
        title: "Sports Medicine Specialist",
        company: "National Sports Medicine Centre, Abuja",
        fact: "Nigerian sports medicine specialist who has treated Super Eagles players and works to improve access to sports rehabilitation across West Africa.",
        quote: "An athlete's body is their instrument. My job is to keep it playing at its best.",
        photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Eva Carneiro",
        title: "Sports Medicine Doctor",
        company: "Chelsea FC (formerly) / Gibraltar FA",
        fact: "One of the few women to serve as first-team doctor for a Premier League club. She became a symbol of women breaking into elite sports medicine.",
        quote: "The pitch is where the science meets the pressure. You have 30 seconds to make a decision that affects a player's career.",
        photoUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Musculoskeletal Assessment", why: "Diagnosing exactly which muscle, tendon, or ligament is injured — and how severely — through physical examination.", resource: "Physiotutors (YouTube)", resourceUrl: "https://www.youtube.com/c/Physiotutors" },
      { name: "Rehabilitation Programme Design", why: "Creating step-by-step recovery plans that bring athletes from injury back to peak performance safely.", resource: "Sports Physio courses", resourceUrl: "https://www.coursera.org/search?query=sports+rehabilitation" },
      { name: "Taping & Strapping", why: "Applying sports tape to support joints during training and competition — a hands-on skill that takes lots of practice.", resource: "YouTube taping tutorials", resourceUrl: "https://www.youtube.com/results?search_query=sports+taping+techniques" },
      { name: "Exercise Prescription", why: "Designing specific exercises that strengthen weak areas and prevent re-injury — tailored to each athlete's sport and position.", resource: "ExRx (free)", resourceUrl: "https://exrx.net" },
      { name: "Anatomy & Biomechanics", why: "Understanding how the body moves during sport — running gait, throwing mechanics, jumping forces — so you can fix what goes wrong.", resource: "Visible Body (app)", resourceUrl: "https://www.visiblebody.com" },
      { name: "Pitch-Side Emergency Care", why: "Providing immediate treatment when injuries happen during a match — from dislocations to head injuries to cardiac emergencies.", resource: "Sports First Aid", resourceUrl: "https://www.redcross.org/take-a-class/first-aid" },
    ],
    imagineYou: [
      { age: 22, scenario: "You're on clinical placement at a physiotherapy clinic in Lagos. A secondary school footballer comes in with a knee injury. You assess the ligament, design a 6-week rehab plan, and three months later he's back on the pitch — stronger than before." },
      { age: 26, scenario: "You're the physiotherapist for a Nigerian Premier League team. It's halftime, the star striker has tight hamstrings. You have 15 minutes to loosen them up so he can play the second half. He scores the winning goal in the 89th minute." },
      { age: 30, scenario: "You're part of the medical team at the African Cup of Nations. An athlete tears their ACL on the field — you're the first responder. You stabilise the knee calmly and professionally. The team doctor later says your quick response reduced the severity of the injury." },
    ],
  },
  "diplomat": {
    roleModels: [
      {
        name: "Amina Mohammed",
        title: "Deputy Secretary-General",
        company: "United Nations",
        fact: "Nigerian diplomat who rose from advising the Nigerian government to becoming the second-highest ranking official at the United Nations.",
        quote: "Diplomacy is not about choosing between what is right and what is easy. It's about making what is right possible.",
        photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Kofi Annan",
        title: "Former Secretary-General",
        company: "United Nations",
        fact: "Ghanaian diplomat who served as UN Secretary-General and won the Nobel Peace Prize. He mediated conflicts in Syria, Kenya, and Myanmar.",
        quote: "Knowledge is power. Information is liberating. Education is the premise of progress.",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "Negotiation & Mediation", why: "Finding agreements between parties with opposing interests — the core skill of every diplomat.", resource: "Coursera Negotiation", resourceUrl: "https://www.coursera.org/learn/negotiation" },
      { name: "Foreign Languages", why: "Speaking multiple languages — especially French, Arabic, or Mandarin — opens doors in international organisations.", resource: "Duolingo (free)", resourceUrl: "https://www.duolingo.com" },
      { name: "International Law", why: "Understanding treaties, human rights law, and the rules that govern relationships between countries.", resource: "Coursera International Law", resourceUrl: "https://www.coursera.org/search?query=international+law" },
      { name: "Policy Analysis & Writing", why: "Reading complex policy documents, identifying key issues, and writing clear briefings for senior officials.", resource: "UN resources", resourceUrl: "https://www.un.org/en/our-work" },
      { name: "Cultural Intelligence", why: "Working effectively across cultures — understanding customs, communication styles, and values different from your own.", resource: "Cultural Atlas", resourceUrl: "https://culturalatlas.sbs.com.au" },
      { name: "Public Speaking", why: "Representing your country at the UN, in press conferences, and at international forums requires confident, persuasive speaking.", resource: "Toastmasters", resourceUrl: "https://www.toastmasters.org" },
    ],
    imagineYou: [
      { age: 23, scenario: "You're an intern at the Nigerian Embassy in Berlin. You're asked to write a briefing note for the Ambassador on a trade policy issue. She reads it, makes two edits, and uses it in her meeting with the German Trade Minister that afternoon." },
      { age: 27, scenario: "You're a junior diplomat at the African Union in Addis Ababa. You're in a conference room with representatives from 15 countries, drafting a resolution on climate finance. You propose a compromise clause — both sides agree. The chair thanks you by name." },
      { age: 32, scenario: "You're Nigeria's representative at a UN General Assembly session in New York. You deliver a 5-minute speech about digital rights in Africa. Delegates from 8 countries approach you afterward to discuss collaboration. Your phone buzzes with messages from home — your family watched the live stream." },
    ],
  },
  "urban-planner": {
    roleModels: [
      {
        name: "Kunle Adeyemi",
        title: "Architect & Urban Designer",
        company: "NLÉ Works",
        fact: "Nigerian architect and urbanist whose floating structures in Makoko, Lagos, reimagined how cities can adapt to flooding and climate change.",
        quote: "African cities are growing faster than anywhere else on Earth. We have the chance to build them right — or repeat others' mistakes.",
        photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      },
      {
        name: "Jane Jacobs",
        title: "Urban Activist & Writer",
        company: "Author (The Death and Life of Great American Cities)",
        fact: "Transformed urban planning by arguing that cities should be designed around people, not cars — her ideas influence city design worldwide to this day.",
        quote: "Cities have the capability of providing something for everybody, only because, and only when, they are created by everybody.",
        photoUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face",
      },
    ],
    detailedSkills: [
      { name: "GIS & Spatial Analysis", why: "Mapping land use, population density, and infrastructure to make data-driven decisions about how cities should grow.", resource: "QGIS (free)", resourceUrl: "https://qgis.org" },
      { name: "Urban Design Principles", why: "Understanding walkability, mixed-use zoning, green spaces, and transit-oriented development — what makes cities livable.", resource: "Streetmix (free)", resourceUrl: "https://streetmix.net" },
      { name: "Community Engagement", why: "Planning affects everyone. You must listen to residents, hold public consultations, and incorporate diverse perspectives.", resource: "Participatory planning guides", resourceUrl: "https://www.youtube.com/results?search_query=community+engagement+urban+planning" },
      { name: "Transport Planning", why: "Designing road networks, bus routes, bike lanes, and pedestrian paths that move people efficiently and safely.", resource: "NACTO Street Design Guide", resourceUrl: "https://nacto.org/publication/urban-street-design-guide/" },
      { name: "Environmental Sustainability", why: "Planning for climate resilience — flood management, green infrastructure, and reducing urban heat islands.", resource: "UN Habitat", resourceUrl: "https://unhabitat.org" },
      { name: "Policy & Regulation", why: "Understanding zoning laws, building codes, and land-use regulations that shape what can be built and where.", resource: "Coursera Urban Planning", resourceUrl: "https://www.coursera.org/search?query=urban+planning" },
    ],
    imagineYou: [
      { age: 23, scenario: "You're at a community meeting in Surulere, Lagos, listening to residents describe their daily commute. The data says the average person spends 3 hours on the road. You sketch a bus rapid transit route on the whiteboard that could cut that to 45 minutes." },
      { age: 27, scenario: "You work for a city planning agency in Nairobi. Your proposal for a pedestrian-friendly neighbourhood — with wider pavements, more trees, and car-free zones — gets approved. Construction starts next quarter. 12,000 people will walk through your design daily." },
      { age: 32, scenario: "You're the lead planner for a new sustainable district in Abuja. Your master plan includes solar-powered buildings, rainwater harvesting, urban farms, and car-free streets. The World Bank funds the pilot phase. Architects from 6 countries want to collaborate." },
    ],
  },
};

export function getCareerDetails(careerId: string): CareerDetailContent | undefined {
  return careerDetails[careerId];
}

// Fallback role models for careers without specific data
export function getDefaultRoleModels(careerTitle: string, existingNames: string[]): RoleModel[] {
  return existingNames.slice(0, 3).map((name) => ({
    name,
    title: `Professional ${careerTitle}`,
    company: "Industry leader",
    fact: `Known for their significant contributions to the field of ${careerTitle.toLowerCase()}.`,
    quote: `Passion and persistence are the keys to success in ${careerTitle.toLowerCase()}.`,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  }));
}

// Fallback detailed skills
export function getDefaultDetailedSkills(skills: string[], careerTitle: string): DetailedSkill[] {
  return skills.slice(0, 7).map((skill) => ({
    name: skill,
    why: `Essential for success as a ${careerTitle.toLowerCase()}. This skill is used daily in the field.`,
    resource: "Google Search",
    resourceUrl: `https://www.google.com/search?q=learn+${encodeURIComponent(skill)}+free`,
  }));
}

// Fallback imagine you scenarios
export function getDefaultImagineYou(career: { title: string; dailyLife: string; salaryRange: { mid: string }; skills: string[]; worldImpact: string }, currentAge: number): AgeSnapshot[] {
  return [
    { age: currentAge + 5, scenario: `You're studying hard and building your skills in ${career.skills[0]} and ${career.skills[1]}. You land your first internship and discover what it's really like to work as a ${career.title}. The real-world experience is nothing like you imagined — it's better.` },
    { age: currentAge + 10, scenario: `You've been working as a ${career.title} for a few years now. ${career.dailyLife.split('.')[0]}. You earn around ${career.salaryRange.mid} and your confidence grows every day. Colleagues come to you for advice.` },
    { age: currentAge + 15, scenario: `You're a senior ${career.title} now. You've mentored three young professionals, led major projects, and ${career.worldImpact.split('.')[0].toLowerCase()}. You look back at your teenage self and smile — you made it.` },
  ];
}
