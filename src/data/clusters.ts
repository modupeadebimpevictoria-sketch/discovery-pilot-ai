export interface Cluster {
  id: string;
  emoji: string;
  name: string;
  familyIds: string[];
}

export const clusters: Cluster[] = [
  {
    id: "future-builder",
    emoji: "🚀",
    name: "Future Builder",
    familyIds: ["business-entrepreneurship", "real-estate-property"],
  },
  {
    id: "tech-native",
    emoji: "💻",
    name: "Tech Native",
    familyIds: ["technology", "product-tech", "space-future-tech"],
  },
  {
    id: "health-care",
    emoji: "🏥",
    name: "Health & Care",
    familyIds: ["healthcare-medicine", "mental-health"],
  },
  {
    id: "story-architect",
    emoji: "🎬",
    name: "Story Architect",
    familyIds: ["creative-design", "media-content", "entertainment-performance"],
  },
  {
    id: "market-maker",
    emoji: "📈",
    name: "Market Maker",
    familyIds: ["finance-investment", "marketing-communications"],
  },
  {
    id: "change-agent",
    emoji: "⚖️",
    name: "Change Agent",
    familyIds: ["law-justice", "government-public-service", "social-impact", "international-development"],
  },
  {
    id: "knowledge-builder",
    emoji: "📚",
    name: "Knowledge Builder",
    familyIds: ["education-academia", "science-research"],
  },
  {
    id: "core-builder",
    emoji: "🏗️",
    name: "Core Builder",
    familyIds: ["engineering-architecture", "trades-technical"],
  },
  {
    id: "taste-style",
    emoji: "✨",
    name: "Taste & Style Connoisseur",
    familyIds: ["food-culinary", "beauty-wellness", "travel-hospitality"],
  },
  {
    id: "planet-protector",
    emoji: "🌍",
    name: "Planet Protector",
    familyIds: ["environment-sustainability", "animals-nature"],
  },
  {
    id: "body-hacker",
    emoji: "💪",
    name: "Body Hacker",
    familyIds: ["sport-fitness"],
  },
];

/** Get the cluster a career family belongs to */
export function getClusterByFamilyId(familyId: string): Cluster | undefined {
  return clusters.find((c) => c.familyIds.includes(familyId));
}
