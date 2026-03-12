import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// ─── Types ───────────────────────────────────────────────────────
export interface CareerFamily {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export interface CareerListing {
  id: string; // slug
  familyId: string;
  title: string;
  description: string;
  salaryRange: string;
  growthTag?: string;
  searchTerms: string[];
  dbId?: string;
  unsplashPhotoUrl?: string | null;
}

export type CareerCategory =
  | "Technology" | "Healthcare" | "Business" | "Creative Arts"
  | "Engineering" | "Science" | "Sports" | "Media"
  | "Environment" | "Government";

export interface Career {
  id: string;
  title: string;
  category: CareerCategory;
  description: string;
  dailyLife: string;
  worldImpact: string;
  skills: string[];
  personalityFit: string[];
  recommendedSubjects: string[];
  educationPath: string[];
  certifications: string[];
  salaryRange: { entry: string; mid: string; senior: string };
  jobOutlook: "High Demand" | "Growing" | "Stable" | "Emerging";
  futureGrowth: string;
  difficulty: "Moderate" | "Challenging" | "Very Challenging";
  timelineYears: number;
  dayInLifeVideo: string;
  encouragementVideo: string;
  encouragementFigure: string;
  roleModels: string[];
  emoji: string;
  color: "primary" | "secondary" | "accent" | "purple";
  tags: string[];
}

// ─── Static career families ──────────────────────────────────────
export const careerFamilies: CareerFamily[] = [
  { id: "creative-design", name: "Creative & Design", emoji: "🎨", description: "Make beautiful things people use every day", color: "from-purple-500 to-pink-500" },
  { id: "media-content", name: "Media & Content", emoji: "🎥", description: "Tell stories the world watches and reads", color: "from-red-500 to-orange-500" },
  { id: "entertainment-performance", name: "Entertainment & Performance", emoji: "🎭", description: "Perform, entertain, and move audiences", color: "from-fuchsia-500 to-purple-500" },
  { id: "technology", name: "Technology", emoji: "💻", description: "Build the digital world we live in", color: "from-cyan-500 to-blue-500" },
  { id: "product-tech", name: "Product & Tech", emoji: "📱", description: "Design and manage products people love", color: "from-indigo-500 to-cyan-500" },
  { id: "healthcare-medicine", name: "Healthcare & Medicine", emoji: "🏥", description: "Heal people and save lives", color: "from-emerald-500 to-teal-500" },
  { id: "mental-health", name: "Mental Health & Wellbeing", emoji: "🧠", description: "Help people feel better inside", color: "from-violet-500 to-indigo-500" },
  { id: "science-research", name: "Science & Research", emoji: "🔬", description: "Discover how the universe works", color: "from-blue-500 to-indigo-500" },
  { id: "environment-sustainability", name: "Environment & Sustainability", emoji: "🌍", description: "Protect the planet for future generations", color: "from-green-500 to-emerald-500" },
  { id: "engineering-architecture", name: "Engineering & Architecture", emoji: "🏗️", description: "Design and build the structures around us", color: "from-orange-500 to-amber-500" },
  { id: "trades-technical", name: "Trades & Technical", emoji: "🔧", description: "Skilled hands-on work that keeps the world running", color: "from-amber-500 to-yellow-500" },
  { id: "business-entrepreneurship", name: "Business & Entrepreneurship", emoji: "📊", description: "Start companies and run organisations", color: "from-sky-500 to-blue-500" },
  { id: "finance-investment", name: "Finance & Investment", emoji: "💰", description: "Manage money and grow wealth", color: "from-emerald-500 to-green-500" },
  { id: "marketing-communications", name: "Marketing & Communications", emoji: "📣", description: "Spread ideas and build brands", color: "from-pink-500 to-rose-500" },
  { id: "law-justice", name: "Law & Justice", emoji: "⚖️", description: "Fight for fairness and protect rights", color: "from-slate-500 to-zinc-500" },
  { id: "education-academia", name: "Education & Academia", emoji: "🎓", description: "Teach and inspire the next generation", color: "from-amber-500 to-orange-500" },
  { id: "social-impact", name: "Social Impact", emoji: "🤝", description: "Make the world a better place for everyone", color: "from-rose-500 to-pink-500" },
  { id: "government-public-service", name: "Government & Public Service", emoji: "🏛️", description: "Serve communities and shape policy", color: "from-blue-600 to-slate-500" },
  { id: "international-development", name: "International Development", emoji: "🌐", description: "Help communities thrive around the world", color: "from-teal-500 to-cyan-500" },
  { id: "travel-hospitality", name: "Travel & Hospitality", emoji: "✈️", description: "Create amazing experiences for travellers", color: "from-sky-500 to-indigo-500" },
  { id: "food-culinary", name: "Food & Culinary", emoji: "🍽️", description: "Create delicious food and dining experiences", color: "from-red-500 to-amber-500" },
  { id: "sport-fitness", name: "Sport & Fitness", emoji: "⚽", description: "Compete, coach, and keep people active", color: "from-lime-500 to-green-500" },
  { id: "animals-nature", name: "Animals & Nature", emoji: "🐾", description: "Care for animals and protect wildlife", color: "from-green-600 to-lime-500" },
  { id: "space-future-tech", name: "Space & Future Tech", emoji: "🔭", description: "Explore space and invent the future", color: "from-violet-600 to-blue-500" },
  { id: "beauty-wellness", name: "Beauty & Wellness", emoji: "💄", description: "Help people look and feel their best", color: "from-pink-400 to-fuchsia-500" },
  { id: "real-estate-property", name: "Real Estate & Property", emoji: "🏠", description: "Buy, sell, and develop places to live and work", color: "from-amber-600 to-orange-500" },
];

const familyMap = new Map(careerFamilies.map((f) => [f.id, f]));

const categoryMap: Record<string, CareerCategory> = {
  "creative-design": "Creative Arts",
  "media-content": "Media",
  "entertainment-performance": "Creative Arts",
  "technology": "Technology",
  "product-tech": "Technology",
  "healthcare-medicine": "Healthcare",
  "mental-health": "Healthcare",
  "science-research": "Science",
  "environment-sustainability": "Environment",
  "engineering-architecture": "Engineering",
  "trades-technical": "Engineering",
  "business-entrepreneurship": "Business",
  "finance-investment": "Business",
  "marketing-communications": "Media",
  "law-justice": "Government",
  "education-academia": "Government",
  "social-impact": "Government",
  "government-public-service": "Government",
  "international-development": "Government",
  "travel-hospitality": "Business",
  "food-culinary": "Creative Arts",
  "sport-fitness": "Sports",
  "animals-nature": "Science",
  "space-future-tech": "Science",
  "beauty-wellness": "Creative Arts",
  "real-estate-property": "Business",
};

// ─── DB row → CareerListing ──────────────────────────────────────
function dbRowToListing(row: any): CareerListing {
  return {
    id: row.slug || row.id,
    familyId: row.family_id || "",
    title: row.title,
    description: row.what_they_do_teen || row.description || row.description_full || "",
    salaryRange: row.salary_range || "",
    growthTag: row.growth_tag || undefined,
    searchTerms: Array.isArray(row.search_terms) ? row.search_terms : [],
    dbId: row.id,
    unsplashPhotoUrl: row.unsplash_photo_url,
  };
}

// ─── DB row → Career (full, with defaults) ───────────────────────
function dbRowToCareer(row: any): Career {
  const familyId = row.family_id || "";
  const family = familyMap.get(familyId);
  const salaryStr = row.salary_range || "";
  const salaryParts = salaryStr.replace(/\$/g, "").split("–").map((s: string) => s.trim());
  const entryPay = salaryParts[0] ? `$${salaryParts[0]}` : "$30,000";
  const seniorPay = salaryParts[1] ? `$${salaryParts[1]}` : "$100,000+";
  const entryNum = parseInt(salaryParts[0]?.replace(/[^0-9]/g, "") || "30") * 1000;
  const seniorNum = parseInt(salaryParts[1]?.replace(/[^0-9+]/g, "") || "100") * 1000;
  const midPay = `$${Math.round((entryNum + seniorNum) / 2000)}k`;

  const growthTag = row.growth_tag || "";
  const outlook: Career["jobOutlook"] = growthTag.includes("Emerging")
    ? "Emerging"
    : growthTag.includes("High demand")
    ? "High Demand"
    : "Growing";

  const skillNames = Array.isArray(row.skills)
    ? row.skills.map((s: any) => (typeof s === "string" ? s : s.name || ""))
    : [];
  const searchTerms: string[] = Array.isArray(row.search_terms) ? row.search_terms : [];

  return {
    id: row.slug || row.id,
    title: row.title,
    category: categoryMap[familyId] || "Business",
    description: row.what_they_do_teen || row.description || row.description_full || "",
    dailyLife: row.day_in_the_life || `As a ${row.title}, you spend your days working on exciting challenges. Every day is different and you're always learning something new.`,
    worldImpact: row.growth_outlook || `${row.title}s make a real difference in the world of ${family?.name || "their field"}.`,
    skills: skillNames.length > 0 ? skillNames : searchTerms.slice(0, 6).map((t: string) => t.charAt(0).toUpperCase() + t.slice(1)),
    personalityFit: ["Curious", "Dedicated", "Problem-solver", "Collaborative"],
    recommendedSubjects: Array.isArray(row.recommended_subjects) && row.recommended_subjects.length > 0
      ? row.recommended_subjects
      : ["English", "Mathematics", "ICT"],
    educationPath: row.career_path
      ? row.career_path.split("\n").filter(Boolean)
      : [
          "Research this career and speak to people in the field",
          "Choose relevant subjects at school / college",
          "Pursue further education, apprenticeship or self-study",
          `Start building experience as a ${row.title}`,
        ],
    certifications: row.entry_requirements
      ? [row.entry_requirements]
      : ["Industry-specific certifications available"],
    salaryRange: { entry: entryPay, mid: midPay, senior: seniorPay },
    jobOutlook: outlook,
    futureGrowth: row.growth_outlook || (growthTag
      ? `This field is ${growthTag.includes("Emerging") ? "an emerging area with exciting new opportunities" : "in high demand with strong job prospects"}.`
      : "This field offers stable career prospects with room for growth."),
    difficulty: "Moderate",
    timelineYears: row.job_zone ? Math.max(2, row.job_zone) : 4,
    dayInLifeVideo: `https://www.youtube.com/results?search_query=day+in+the+life+${encodeURIComponent(row.title)}`,
    encouragementVideo: `https://www.youtube.com/results?search_query=${encodeURIComponent(row.title)}+career+advice`,
    encouragementFigure: "Industry leaders",
    roleModels: [],
    emoji: row.emoji || family?.emoji || "💼",
    color: "primary",
    tags: searchTerms,
  };
}

// ─── Context interface ───────────────────────────────────────────
interface CareersContextValue {
  dbCareers: any[];
  careerListings: CareerListing[];
  careerFamilies: CareerFamily[];
  loading: boolean;
  getCareerById: (slugOrId: string) => Career | undefined;
  getCareerListingById: (slugOrId: string) => CareerListing | undefined;
  getCareerFamilyById: (id: string) => CareerFamily | undefined;
  searchCareerListings: (query: string) => CareerListing[];
  getListingsByFamily: (familyId: string) => CareerListing[];
}

const CareersContext = createContext<CareersContextValue | undefined>(undefined);

// ─── Provider ────────────────────────────────────────────────────
export function CareersProvider({ children }: { children: ReactNode }) {
  const { data: dbRows = [], isLoading } = useQuery({
    queryKey: ["careers-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("careers")
        .select("*")
        .eq("is_active", true)
        .order("title");
      if (error) throw error;
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 min
  });

  const value = useMemo(() => {
    const listings: CareerListing[] = dbRows.map(dbRowToListing);
    const careers: Career[] = dbRows.map(dbRowToCareer);

    // Build lookup maps for O(1) access
    const listingBySlug = new Map<string, CareerListing>();
    const listingById = new Map<string, CareerListing>();
    const careerBySlug = new Map<string, Career>();
    const careerById = new Map<string, Career>();

    listings.forEach((l, i) => {
      listingBySlug.set(l.id, l);
      if (l.dbId) listingById.set(l.dbId, l);
      const c = careers[i];
      careerBySlug.set(c.id, c);
      if (l.dbId) careerById.set(l.dbId, c);
    });

    return {
      dbCareers: dbRows,
      careerListings: listings,
      careerFamilies,
      loading: isLoading,
      getCareerById: (slugOrId: string) =>
        careerBySlug.get(slugOrId) || careerById.get(slugOrId),
      getCareerListingById: (slugOrId: string) =>
        listingBySlug.get(slugOrId) || listingById.get(slugOrId),
      getCareerFamilyById: (id: string) => familyMap.get(id),
      searchCareerListings: (query: string) => {
        const q = query.toLowerCase().trim();
        if (!q) return listings;
        return listings.filter(
          (l) =>
            l.title.toLowerCase().includes(q) ||
            l.description.toLowerCase().includes(q) ||
            l.searchTerms.some((t) => t.includes(q)) ||
            l.familyId.includes(q)
        );
      },
      getListingsByFamily: (familyId: string) =>
        listings.filter((l) => l.familyId === familyId),
    };
  }, [dbRows, isLoading]);

  return (
    <CareersContext.Provider value={value}>
      {children}
    </CareersContext.Provider>
  );
}

export function useCareers() {
  const ctx = useContext(CareersContext);
  if (!ctx) throw new Error("useCareers must be used within CareersProvider");
  return ctx;
}

// Re-export for backward compatibility with type imports
export type { CareerFamily as CareerFamilyType, CareerListing as CareerListingType };
