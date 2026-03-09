// Real professional photos mapped to career IDs
// Using Unsplash photos of young professionals in relevant workplaces

export interface CareerPhoto {
  hero: string;   // Primary workplace/action shot
  avatar: string; // Profile face photo
}

const careerPhotos: Record<string, CareerPhoto> = {
  "ai-engineer": {
    hero: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "dentist": {
    hero: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "aerospace-engineer": {
    hero: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "music-producer": {
    hero: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "architect": {
    hero: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "climate-scientist": {
    hero: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "data-scientist": {
    hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "film-director": {
    hero: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "game-developer": {
    hero: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "investment-banker": {
    hero: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "robotics-engineer": {
    hero: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "tv-presenter": {
    hero: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "wildlife-conservationist": {
    hero: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "sports-physiotherapist": {
    hero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "diplomat": {
    hero: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "entrepreneur": {
    hero: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "chef": {
    hero: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "urban-planner": {
    hero: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "fashion-designer": {
    hero: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "cybersecurity-analyst": {
    hero: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "surgeon": {
    hero: "https://images.unsplash.com/photo-1551190822-a9ce113d0d3f?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "ux-designer": {
    hero: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "marine-biologist": {
    hero: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "psychologist": {
    hero: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "software-engineer": {
    hero: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "biomedical-engineer": {
    hero: "https://images.unsplash.com/photo-1581093458791-9f3c3250a8b0?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "journalist": {
    hero: "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "pharmacist": {
    hero: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "environmental-engineer": {
    hero: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "professional-athlete": {
    hero: "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=200&h=200&fit=crop&crop=face&q=80",
  },
};

// Fallback photos by category for any unmapped careers
const categoryFallbacks: Record<string, CareerPhoto> = {
  Technology: {
    hero: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face&q=80",
  },
  Healthcare: {
    hero: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face&q=80",
  },
  Business: {
    hero: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face&q=80",
  },
  "Creative Arts": {
    hero: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face&q=80",
  },
  Engineering: {
    hero: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&q=80",
  },
  Science: {
    hero: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&q=80",
  },
  Sports: {
    hero: "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=200&h=200&fit=crop&crop=face&q=80",
  },
  Media: {
    hero: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face&q=80",
  },
  Environment: {
    hero: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face&q=80",
  },
  Government: {
    hero: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=1000&fit=crop&q=80",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face&q=80",
  },
};

export function getCareerPhoto(careerId: string, category: string): CareerPhoto {
  return careerPhotos[careerId] || categoryFallbacks[category] || categoryFallbacks.Technology;
}
