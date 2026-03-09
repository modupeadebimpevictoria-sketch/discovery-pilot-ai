// Real human photos for each career — young African/African-American professionals
// Images from Unsplash, curated for authenticity and diversity

export interface CareerImageSet {
  hero: string;   // Full scene of professional at work
  avatar: string; // Headshot / portrait
}

const careerImages: Record<string, CareerImageSet> = {
  "ai-engineer": {
    hero: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&q=80",
  },
  "software-developer": {
    hero: "https://images.unsplash.com/photo-1607799279861-4dd421887fc5?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
  },
  "cybersecurity-analyst": {
    hero: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80",
  },
  "data-scientist": {
    hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80",
  },
  "ux-designer": {
    hero: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&q=80",
  },
  "doctor": {
    hero: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&q=80",
  },
  "nurse": {
    hero: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80",
  },
  "pharmacist": {
    hero: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&q=80",
  },
  "entrepreneur": {
    hero: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80",
  },
  "financial-analyst": {
    hero: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&q=80",
  },
  "marketing-manager": {
    hero: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&q=80",
  },
  "graphic-designer": {
    hero: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&q=80",
  },
  "musician": {
    hero: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
  },
  "filmmaker": {
    hero: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&q=80",
  },
  "architect": {
    hero: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80",
  },
  "civil-engineer": {
    hero: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&q=80",
  },
  "mechanical-engineer": {
    hero: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80",
  },
  "environmental-scientist": {
    hero: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80",
  },
  "marine-biologist": {
    hero: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&q=80",
  },
  "psychologist": {
    hero: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80",
  },
  "journalist": {
    hero: "https://images.unsplash.com/photo-1504711434969-e33886168d8c?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&q=80",
  },
  "sports-manager": {
    hero: "https://images.unsplash.com/photo-1461896836934-bd45ba8fcb3c?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&q=80",
  },
  "diplomat": {
    hero: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&q=80",
  },
  "lawyer": {
    hero: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
  },
  "game-developer": {
    hero: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&q=80",
  },
  "biomedical-engineer": {
    hero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&q=80",
  },
  "fashion-designer": {
    hero: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&q=80",
  },
  "urban-planner": {
    hero: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80",
  },
  "renewable-energy-engineer": {
    hero: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80",
  },
  "social-worker": {
    hero: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80",
  },
};

// Fallback for careers not in the map
const fallbackImages: CareerImageSet = {
  hero: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1000&fit=crop&q=80",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
};

export function getCareerImages(careerId: string): CareerImageSet {
  return careerImages[careerId] || fallbackImages;
}

// Professional names for avatar display
const professionalNames: Record<string, string> = {
  "ai-engineer": "Chidi O.",
  "software-developer": "Amara K.",
  "cybersecurity-analyst": "David M.",
  "data-scientist": "Fatima B.",
  "ux-designer": "Zara N.",
  "doctor": "Dr. Emeka A.",
  "nurse": "Aisha J.",
  "pharmacist": "Nneka U.",
  "entrepreneur": "Kofi T.",
  "financial-analyst": "Marcus W.",
  "marketing-manager": "Liya D.",
  "graphic-designer": "Jaylen C.",
  "musician": "Kwame S.",
  "filmmaker": "Tunde R.",
  "architect": "Isaiah P.",
  "civil-engineer": "Solomon G.",
  "mechanical-engineer": "Dayo F.",
  "environmental-scientist": "Naledi M.",
  "marine-biologist": "Adaeze I.",
  "psychologist": "Thandiwe K.",
  "journalist": "Chioma E.",
  "sports-manager": "Jabari L.",
  "diplomat": "Oluwaseun A.",
  "lawyer": "Kwesi B.",
  "game-developer": "Emeka N.",
  "biomedical-engineer": "Amina H.",
  "fashion-designer": "Ayo W.",
  "urban-planner": "Tendai C.",
  "renewable-energy-engineer": "Babajide O.",
  "social-worker": "Ngozi P.",
};

export function getProfessionalName(careerId: string): string {
  return professionalNames[careerId] || "Young Professional";
}
