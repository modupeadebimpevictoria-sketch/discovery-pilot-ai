import { clusters, getClusterByFamilyId, type Cluster } from "./clusters";
import type { RIASECCode } from "./questions";

export interface World {
  id: string;
  emoji: string;
  name: string;
  description: string;
  clusterIds: string[];
}

export const worlds: World[] = [
  {
    id: "building-making",
    emoji: "🔨",
    name: "Building & Making",
    description: "You're someone who loves turning ideas into real things people can see and touch.",
    clusterIds: ["core-builder"],
  },
  {
    id: "discovering-understanding",
    emoji: "🔬",
    name: "Discovering & Understanding",
    description: "You're driven by questions and won't stop until you find the answers.",
    clusterIds: ["knowledge-builder", "health-care"],
  },
  {
    id: "creating-expressing",
    emoji: "🎨",
    name: "Creating & Expressing",
    description: "You see the world differently and you have the urge to show everyone what you see.",
    clusterIds: ["story-architect", "taste-style"],
  },
  {
    id: "people-community",
    emoji: "🤝",
    name: "People & Community",
    description: "You're at your best when you're making life better for the people around you.",
    clusterIds: ["health-care", "change-agent", "knowledge-builder"],
  },
  {
    id: "business-leading",
    emoji: "🚀",
    name: "Business & Leading",
    description: "You see problems as opportunities and you want to build something that didn't exist before.",
    clusterIds: ["future-builder", "market-maker"],
  },
  {
    id: "systems-order",
    emoji: "⚙️",
    name: "Systems & Order",
    description: "You make sense of complexity and you love it when everything works exactly as it should.",
    clusterIds: ["tech-native", "change-agent", "market-maker"],
  },
  {
    id: "planet-protector",
    emoji: "🌱",
    name: "Planet Protector",
    description: "You feel the responsibility to protect what the world has and fix what's been broken.",
    clusterIds: ["planet-protector"],
  },
  {
    id: "body-hacker",
    emoji: "💪",
    name: "Body Hacker",
    description: "You understand what the human body can do and you want to push it further.",
    clusterIds: ["body-hacker"],
  },
];

/** RIASEC code → default World id */
const riasecToWorld: Record<RIASECCode, string> = {
  R: "building-making",
  I: "discovering-understanding",
  A: "creating-expressing",
  S: "people-community",
  E: "business-leading",
  C: "systems-order",
};

/**
 * Determine the World and Cluster from RIASEC scores and matched career family IDs.
 * 1) Check if matched careers strongly point to planet-protector or body-hacker clusters.
 * 2) Otherwise, use RIASEC top code to pick the World.
 * 3) Within the World's clusters, pick the one most represented by matched careers.
 */
export function determineWorldAndCluster(
  riasecScores: Record<RIASECCode, number>,
  matchedFamilyIds: string[]
): { world: World; cluster: Cluster } {
  // Count clusters from matched careers
  const clusterCounts: Record<string, number> = {};
  matchedFamilyIds.forEach((fid) => {
    const c = getClusterByFamilyId(fid);
    if (c) clusterCounts[c.id] = (clusterCounts[c.id] || 0) + 1;
  });

  // Check for special worlds (planet-protector, body-hacker) — if majority of careers are there
  const specialOverrides = ["planet-protector", "body-hacker"];
  for (const sid of specialOverrides) {
    if ((clusterCounts[sid] || 0) >= 2) {
      const world = worlds.find((w) => w.id === sid)!;
      const cluster = clusters.find((c) => c.id === sid)!;
      return { world, cluster };
    }
  }

  // Use RIASEC top code to determine World
  const topCode = (Object.entries(riasecScores) as [RIASECCode, number][])
    .sort(([, a], [, b]) => b - a)[0][0];
  const worldId = riasecToWorld[topCode];
  const world = worlds.find((w) => w.id === worldId) || worlds[0];

  // Pick the best cluster within this World
  let bestCluster: Cluster | undefined;
  let bestCount = -1;
  for (const cid of world.clusterIds) {
    const count = clusterCounts[cid] || 0;
    if (count > bestCount) {
      bestCount = count;
      bestCluster = clusters.find((c) => c.id === cid);
    }
  }

  // Fallback: first cluster of the World
  if (!bestCluster) {
    bestCluster = clusters.find((c) => c.id === world.clusterIds[0])!;
  }

  return { world, cluster: bestCluster };
}
