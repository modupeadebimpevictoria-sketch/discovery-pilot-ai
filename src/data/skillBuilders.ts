export interface SkillBuilder {
  id: string;
  careerId: string;
  title: string;
  description: string;
  emoji: string;
  difficulty: "Easy" | "Medium" | "Challenge";
  link?: string;
}

export const skillBuilders: Record<string, SkillBuilder[]> = {
  "ai-engineer": [
    { id: "ai-s1", careerId: "ai-engineer", title: "Learn basic Python coding", description: "Start with free Python lessons on Codecademy or Khan Academy. Python is the #1 language for AI.", emoji: "🐍", difficulty: "Easy", link: "https://www.codecademy.com/learn/learn-python-3" },
    { id: "ai-s2", careerId: "ai-engineer", title: "Try Google's AI experiments", description: "Play with fun AI demos at experiments.withgoogle.com — see how AI works behind the scenes!", emoji: "🧪", difficulty: "Easy", link: "https://experiments.withgoogle.com/collection/ai" },
    { id: "ai-s3", careerId: "ai-engineer", title: "Take a maths challenge", description: "AI needs strong maths. Practice algebra and statistics on Khan Academy — it'll give you a head start.", emoji: "📐", difficulty: "Medium" },
  ],
  "dentist": [
    { id: "d-s1", careerId: "dentist", title: "Study biology basics", description: "Focus on human anatomy and biology. Understanding how the body works is step one to becoming a dentist.", emoji: "🦴", difficulty: "Easy" },
    { id: "d-s2", careerId: "dentist", title: "Volunteer at a health clinic", description: "See if any local clinics need volunteers. It's a great way to see healthcare up close!", emoji: "🏥", difficulty: "Medium" },
    { id: "d-s3", careerId: "dentist", title: "Practice fine motor skills", description: "Try activities like model-building, painting small details, or even playing an instrument — dentists need steady hands!", emoji: "✋", difficulty: "Easy" },
  ],
  "architect": [
    { id: "arch-s1", careerId: "architect", title: "Start drawing or sketching daily", description: "Carry a sketchbook and draw buildings, rooms, or objects you see. Architects think visually!", emoji: "✏️", difficulty: "Easy" },
    { id: "arch-s2", careerId: "architect", title: "Try free 3D design software", description: "Download SketchUp Free and try designing a simple house. It's the same tool real architects use!", emoji: "🏠", difficulty: "Medium", link: "https://www.sketchup.com/plans-and-pricing/sketchup-free" },
    { id: "arch-s3", careerId: "architect", title: "Visit interesting buildings", description: "Look at architecture around you — what makes a building feel good or bad? Start thinking like a designer.", emoji: "🏛️", difficulty: "Easy" },
  ],
  "journalist": [
    { id: "j-s1", careerId: "journalist", title: "Start a blog or newsletter", description: "Write about something you care about — school events, local news, your hobbies. Every journalist starts by writing!", emoji: "✍️", difficulty: "Easy" },
    { id: "j-s2", careerId: "journalist", title: "Join your school newspaper", description: "If your school has a paper or magazine, get involved! If not, start one with friends.", emoji: "📰", difficulty: "Easy" },
    { id: "j-s3", careerId: "journalist", title: "Practice interviewing", description: "Interview friends and family. Ask open-ended questions and practice writing up what they say.", emoji: "🎤", difficulty: "Easy" },
  ],
  "entrepreneur": [
    { id: "e-s1", careerId: "entrepreneur", title: "Build a small project or side hustle", description: "Sell something at school, start a social media page, or create something people would pay for. Start small!", emoji: "💡", difficulty: "Medium" },
    { id: "e-s2", careerId: "entrepreneur", title: "Learn about money basics", description: "Understand profit, expenses, and budgeting. Try tracking your own spending for a month!", emoji: "💵", difficulty: "Easy" },
    { id: "e-s3", careerId: "entrepreneur", title: "Read about successful founders", description: "Read stories about how people like Sara Blakely or Mark Zuckerberg started their businesses.", emoji: "📚", difficulty: "Easy" },
  ],
  "software-engineer": [
    { id: "se-s1", careerId: "software-engineer", title: "Learn HTML & CSS", description: "Build your first website! Start with freeCodeCamp — it's free and teaches you step by step.", emoji: "🌐", difficulty: "Easy", link: "https://www.freecodecamp.org" },
    { id: "se-s2", careerId: "software-engineer", title: "Try building a small app", description: "Use Scratch or Glitch to build something interactive. Start simple — a calculator or quiz!", emoji: "📱", difficulty: "Medium" },
    { id: "se-s3", careerId: "software-engineer", title: "Join a coding community", description: "Join GitHub, Stack Overflow, or a coding Discord. Learning from others is how real engineers grow.", emoji: "👥", difficulty: "Easy" },
  ],
  "game-developer": [
    { id: "gd-s1", careerId: "game-developer", title: "Make games with Scratch", description: "scratch.mit.edu is free and perfect for beginners. Make a simple platformer or quiz game!", emoji: "🕹️", difficulty: "Easy", link: "https://scratch.mit.edu" },
    { id: "gd-s2", careerId: "game-developer", title: "Learn Unity basics", description: "Unity is free for students. Follow beginner tutorials on YouTube to make your first 3D game!", emoji: "🎯", difficulty: "Challenge", link: "https://unity.com/learn" },
    { id: "gd-s3", careerId: "game-developer", title: "Join a game jam", description: "Game jams are events where you build a game in a weekend. Try itch.io game jams — they're super fun!", emoji: "⏱️", difficulty: "Medium" },
  ],
  "music-producer": [
    { id: "mp-s1", careerId: "music-producer", title: "Make beats on BandLab", description: "BandLab is free and works in your browser. Start experimenting with loops and sounds!", emoji: "🎹", difficulty: "Easy", link: "https://www.bandlab.com" },
    { id: "mp-s2", careerId: "music-producer", title: "Learn basic music theory", description: "Understanding chords, scales, and rhythm makes everything easier. Try musictheory.net!", emoji: "🎼", difficulty: "Medium" },
    { id: "mp-s3", careerId: "music-producer", title: "Remix a song you like", description: "Take a song you love and try remixing it. Change the tempo, add effects, make it your own!", emoji: "🔊", difficulty: "Medium" },
  ],
  "film-director": [
    { id: "fd-s1", careerId: "film-director", title: "Film a short video every week", description: "Use your phone! Practice telling stories visually. Even 30-second clips teach you about framing and editing.", emoji: "📹", difficulty: "Easy" },
    { id: "fd-s2", careerId: "film-director", title: "Learn video editing", description: "Download DaVinci Resolve (free!) or use CapCut. Editing is where films really come together.", emoji: "🎞️", difficulty: "Medium" },
    { id: "fd-s3", careerId: "film-director", title: "Study your favourite films", description: "Watch films and ask: Why did the director choose this angle? Why this music? Start thinking like a director.", emoji: "🍿", difficulty: "Easy" },
  ],
  "climate-scientist": [
    { id: "cs-s1", careerId: "climate-scientist", title: "Track weather patterns", description: "Record the temperature, rainfall, and wind every day for a month. Look for patterns!", emoji: "🌤️", difficulty: "Easy" },
    { id: "cs-s2", careerId: "climate-scientist", title: "Learn about climate data", description: "Explore NASA's climate website. See real satellite data about how Earth is changing.", emoji: "🛰️", difficulty: "Medium", link: "https://climate.nasa.gov" },
    { id: "cs-s3", careerId: "climate-scientist", title: "Start a school eco project", description: "Organise a recycling programme, plant trees, or measure your school's energy usage.", emoji: "🌱", difficulty: "Medium" },
  ],
};

export function getSkillBuilders(careerId: string): SkillBuilder[] {
  return skillBuilders[careerId] || [];
}
