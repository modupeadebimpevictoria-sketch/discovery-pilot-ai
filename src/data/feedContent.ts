import { getCareerById, Career } from "@/data/careers";

export type FeedContentType = "deep-dive" | "interview" | "field-update" | "history" | "spotlight" | "mission-nudge";

export interface FeedPost {
  id: string;
  type: FeedContentType;
  careerId: string;
  careerTitle: string;
  careerEmoji: string;
  headline: string;
  body: string;
  imageUrl: string;
  videoUrl?: string;
  typeEmoji: string;
  typeLabel: string;
}

const typeConfig: Record<FeedContentType, { typeEmoji: string; typeLabel: string }> = {
  "deep-dive": { typeEmoji: "📖", typeLabel: "Career Deep-Dive" },
  "interview": { typeEmoji: "🎥", typeLabel: "Pro Interview" },
  "field-update": { typeEmoji: "🌍", typeLabel: "Field Update" },
  "history": { typeEmoji: "🏛️", typeLabel: "History & Context" },
  "spotlight": { typeEmoji: "💬", typeLabel: "Inspiration" },
  "mission-nudge": { typeEmoji: "🎯", typeLabel: "Mission Nudge" },
};

// Real professional portrait photos from Unsplash
const professionalPhotos = [
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
];

// Workspace/field photos
const fieldPhotos: Record<string, string[]> = {
  default: [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop",
  ],
};

function getFieldPhoto(careerId: string, index: number): string {
  const photos = fieldPhotos[careerId] || fieldPhotos.default;
  return photos[index % photos.length];
}

function getPersonPhoto(index: number): string {
  return professionalPhotos[index % professionalPhotos.length];
}

function generateDeepDive(career: Career, studentName: string): Omit<FeedPost, "id"> {
  return {
    type: "deep-dive",
    careerId: career.id,
    careerTitle: career.title,
    careerEmoji: career.emoji,
    headline: `${studentName}, here's what a day as a ${career.title} actually looks like`,
    body: career.dailyLife,
    imageUrl: getFieldPhoto(career.id, 0),
    ...typeConfig["deep-dive"],
  };
}

function generateInterview(career: Career, studentName: string, idx: number): Omit<FeedPost, "id"> {
  const model = career.roleModels[idx % career.roleModels.length] || career.encouragementFigure;
  return {
    type: "interview",
    careerId: career.id,
    careerTitle: career.title,
    careerEmoji: career.emoji,
    headline: `"I almost gave up" — ${model} on becoming a ${career.title}`,
    body: `${model} didn't have it all figured out in high school either. They share how they found their way into ${career.title.toLowerCase()} and what they wish someone had told them at your age.`,
    imageUrl: getPersonPhoto(idx),
    videoUrl: career.dayInLifeVideo || career.encouragementVideo,
    ...typeConfig["interview"],
  };
}

function generateFieldUpdate(career: Career, studentName: string): Omit<FeedPost, "id"> {
  return {
    type: "field-update",
    careerId: career.id,
    careerTitle: career.title,
    careerEmoji: career.emoji,
    headline: `${career.futureGrowth.split(".")[0]}`,
    body: `${career.futureGrowth} This could shape your future as a ${career.title}, ${studentName}!`,
    imageUrl: getFieldPhoto(career.id, 1),
    ...typeConfig["field-update"],
  };
}

function generateHistory(career: Career, studentName: string): Omit<FeedPost, "id"> {
  return {
    type: "history",
    careerId: career.id,
    careerTitle: career.title,
    careerEmoji: career.emoji,
    headline: `How ${career.title.toLowerCase()}s changed the world — and how you could too`,
    body: `${career.worldImpact} The field of ${career.title.toLowerCase()} has evolved massively, ${studentName}. What started as a niche role is now one of the most impactful careers you can pursue.`,
    imageUrl: getFieldPhoto(career.id, 2),
    ...typeConfig["history"],
  };
}

function generateSpotlight(career: Career, idx: number): Omit<FeedPost, "id"> {
  const model = career.roleModels[idx % career.roleModels.length] || career.encouragementFigure;
  return {
    type: "spotlight",
    careerId: career.id,
    careerTitle: career.title,
    careerEmoji: career.emoji,
    headline: `${model} — from dreams to reality as a ${career.title}`,
    body: `${model} is a ${career.title} who proves that passion and persistence pay off. They overcame early setbacks, stayed curious, and built a career that makes a real difference. Their advice? "Start now, even if you don't feel ready."`,
    imageUrl: getPersonPhoto(idx + 3),
    ...typeConfig["spotlight"],
  };
}

function generateMissionNudge(career: Career, studentName: string): Omit<FeedPost, "id"> {
  return {
    type: "mission-nudge",
    careerId: career.id,
    careerTitle: career.title,
    careerEmoji: career.emoji,
    headline: `Complete today's mission 🎯`,
    body: `Quick ${career.title} mission waiting for you — under 10 minutes. Complete it to earn XP and build your Career Passport.`,
    imageUrl: getFieldPhoto(career.id, 3),
    ...typeConfig["mission-nudge"],
  };
}

export function generateFeedForCareers(
  matchedCareers: { careerId: string; score: number }[],
  studentName: string
): FeedPost[] {
  const posts: FeedPost[] = [];
  let idCounter = 0;

  matchedCareers.forEach((match, careerIdx) => {
    const career = getCareerById(match.careerId);
    if (!career) return;

    // Generate all 6 content types for each career
    const generators = [
      () => generateDeepDive(career, studentName),
      () => generateInterview(career, studentName, careerIdx),
      () => generateFieldUpdate(career, studentName),
      () => generateHistory(career, studentName),
      () => generateSpotlight(career, careerIdx),
      () => generateQuestNudge(career, studentName),
    ];

    generators.forEach((gen) => {
      const post = gen();
      posts.push({ ...post, id: `feed-${idCounter++}` });
    });
  });

  // Interleave posts from different careers for variety
  const byCareer: Record<string, FeedPost[]> = {};
  posts.forEach((p) => {
    if (!byCareer[p.careerId]) byCareer[p.careerId] = [];
    byCareer[p.careerId].push(p);
  });

  const interleaved: FeedPost[] = [];
  const careerIds = Object.keys(byCareer);
  const maxLen = Math.max(...Object.values(byCareer).map((arr) => arr.length));

  for (let i = 0; i < maxLen; i++) {
    for (const cid of careerIds) {
      if (byCareer[cid][i]) interleaved.push(byCareer[cid][i]);
    }
  }

  return interleaved;
}
