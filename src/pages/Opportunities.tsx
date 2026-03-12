import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { ChevronLeft, ExternalLink, Lock, Briefcase, GraduationCap, MapPin, Calendar, Loader2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import OpportunityCard from "@/components/opportunities/OpportunityCard";
import OpportunityFilters from "@/components/opportunities/OpportunityFilters";
import { useOpportunityActions } from "@/hooks/useOpportunityActions";
import { useCareers } from "@/contexts/CareersContext";

// Maps the Firecrawl-extracted career_family_ids values to our app's familyId values
const FAMILY_ID_MAP: Record<string, string[]> = {
  technology: ["technology", "product-tech", "space-future-tech"],
  design: ["creative-design"],
  science: ["science-research"],
  business: ["business-entrepreneurship"],
  engineering: ["engineering-architecture", "trades-technical"],
  health: ["healthcare-medicine", "mental-health"],
  law: ["law-justice"],
  media: ["media-content", "entertainment-performance"],
  education: ["education-academia"],
  environment: ["environment-sustainability", "animals-nature"],
  finance: ["finance-investment"],
  arts: ["creative-design", "entertainment-performance"],
  "social-work": ["social-impact", "international-development", "government-public-service"],
  architecture: ["engineering-architecture", "real-estate-property"],
  sports: ["sport-fitness"],
  agriculture: ["environment-sustainability"],
  hospitality: ["travel-hospitality", "food-culinary", "beauty-wellness"],
};

function getAppFamilyIds(dbFamilyIds: string[]): string[] {
  const result: string[] = [];
  for (const dbId of dbFamilyIds) {
    const mapped = FAMILY_ID_MAP[dbId];
    if (mapped) result.push(...mapped);
    else result.push(dbId);
  }
  return result;
}

export type OpportunityType = "scholarship" | "competition" | "course" | "program" | "workshop" | "internship";

export interface AdminOpportunity {
  id: string;
  title: string;
  type: string;
  description: string;
  organisation: string;
  application_url: string;
  location: string;
  country: string;
  city: string | null;
  min_grade: number;
  max_grade: number;
  min_age: number | null;
  max_age: number | null;
  deadline: string | null;
  duration: string | null;
  career_family: string | null;
  career_family_ids: string[];
  is_remote: boolean | null;
  is_active: boolean | null;
  is_link_dead: boolean | null;
}

function parseGradeNumber(grade: string | undefined | null): number | null {
  if (!grade) return null;
  if (grade === "uni-1") return 13;
  if (grade === "uni-2") return 14;
  const match = grade.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function getLocationPriority(oppCountry: string, userCountry: string | undefined): number {
  const oC = oppCountry.toLowerCase();
  const uC = (userCountry || "").toLowerCase();
  if (oC === uC) return 0; // Local
  if (oC === "global" || oC === "online") return 2; // Global/Online
  return 1; // International
}

const typeConfig: Record<string, { emoji: string; label: string; color: string }> = {
  scholarship: { emoji: "🎓", label: "Scholarship", color: "bg-primary/10 text-primary" },
  competition: { emoji: "🏆", label: "Competition", color: "bg-accent/10 text-accent" },
  course: { emoji: "📚", label: "Course", color: "bg-secondary/10 text-secondary" },
  program: { emoji: "🌍", label: "Program", color: "bg-glow-purple/10 text-glow-purple" },
  workshop: { emoji: "🤝", label: "Workshop", color: "bg-glow-pink/10 text-glow-pink" },
  internship: { emoji: "💼", label: "Internship", color: "bg-secondary/10 text-secondary" },
};

export default function Opportunities() {
  const navigate = useNavigate();
  const { selectedCareerPath, matchedCareers, profile } = useApp();
  const [filter, setFilter] = useState<string>("all");
  const [dbOpps, setDbOpps] = useState<AdminOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const { appliedIds, savedIds, recordClick, toggleSave } = useOpportunityActions();

  const careerId = selectedCareerPath || matchedCareers[0]?.careerId;
  const userGrade = parseGradeNumber(profile?.grade);
  const userCountry = profile?.country;

  const userAge = profile?.age;

  // Fetch from admin_opportunities table
  useEffect(() => {
    const fetchOpps = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from("admin_opportunities")
          .select("*")
          .eq("is_active", true)
          .eq("flagged", false)
          .or("is_archived.eq.false,is_archived.is.null");

        // Grade filtering
        if (userGrade !== null) {
          query = query.lte("min_grade", userGrade).gte("max_grade", userGrade);
        }

        // Age filtering
        if (userAge !== null && userAge !== undefined) {
          query = query.or(`min_age.is.null,min_age.lte.${userAge}`);
          query = query.or(`max_age.is.null,max_age.gte.${userAge}`);
        }

        const { data, error } = await query.order("deadline", { ascending: true, nullsFirst: false });
        if (error) throw error;
        setDbOpps((data as AdminOpportunity[]) || []);
      } catch (err) {
        console.error("Failed to fetch opportunities:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOpps();
  }, [userGrade, userAge]);

  // Get the active path's family ID and all matched career family IDs
  const activePathFamilyId = useMemo(() => {
    if (!careerId) return null;
    const listing = careerListings.find((l) => l.id === careerId);
    return listing?.familyId || null;
  }, [careerId]);

  const matchedFamilyIds = useMemo(() => {
    return new Set(
      matchedCareers
        .map((m) => careerListings.find((l) => l.id === m.careerId)?.familyId)
        .filter(Boolean) as string[]
    );
  }, [matchedCareers]);

  // Tier: 0 = Active Path match, 1 = any matched career match, 2 = universal (empty), 3 = no match
  function getCareerTier(opp: AdminOpportunity): number {
    const raw = Array.isArray(opp.career_family_ids) ? opp.career_family_ids as string[] : [];
    // Universal (empty array) = Tier 2
    if (raw.length === 0) return 2;
    const appFamilies = getAppFamilyIds(raw);
    // Tier 0: matches Active Path family
    if (activePathFamilyId && appFamilies.includes(activePathFamilyId)) return 0;
    // Tier 1: matches any assessed career family
    if (appFamilies.some((f) => matchedFamilyIds.has(f))) return 1;
    // Tier 3: no match at all
    return 3;
  }

  // Sort: career tier first, then location priority
  const sortedOpps = useMemo(() => {
    const filtered = filter === "all" ? dbOpps : dbOpps.filter((o) => o.type === filter);
    return [...filtered].sort((a, b) => {
      const tierA = getCareerTier(a);
      const tierB = getCareerTier(b);
      if (tierA !== tierB) return tierA - tierB;
      const aPri = getLocationPriority(a.country, userCountry);
      const bPri = getLocationPriority(b.country, userCountry);
      if (aPri !== bPri) return aPri - bPri;
      // Deadline ascending (soonest first), nulls last
      if (a.deadline && b.deadline) return a.deadline.localeCompare(b.deadline);
      if (a.deadline && !b.deadline) return -1;
      if (!a.deadline && b.deadline) return 1;
      return 0;
    });
  }, [dbOpps, filter, userCountry, activePathFamilyId, matchedFamilyIds]);

  const handleApply = (oppId: string) => {
    if (!careerId) {
      toast.error("Set a career as your Active Path to apply");
      return;
    }
    recordClick(oppId);
  };

  const locationLabel = (opp: AdminOpportunity) => {
    const oC = opp.country.toLowerCase();
    const uC = (userCountry || "").toLowerCase();
    if (oC === uC) return "🏠 Local";
    if (oC === "global" || oC === "online") return "🌐 " + opp.country;
    return "✈️ " + opp.country;
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="px-5 pt-6 pb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
          <ChevronLeft size={18} /> Back
        </button>

        <h1 className="text-xl font-bold text-foreground mb-1">Opportunities 🚀</h1>
        <p className="text-sm text-muted-foreground mb-1">
          {userGrade ? `Showing opportunities for Grade ${userGrade}` : "Scholarships, competitions, courses & more"}
        </p>
        {userCountry && (
          <p className="text-[10px] text-muted-foreground mb-4 flex items-center gap-1">
            <MapPin size={10} /> Prioritizing opportunities in {userCountry}
          </p>
        )}

        <OpportunityFilters filter={filter} onFilterChange={setFilter} />
      </div>

      {/* Grade info banner */}
      {userGrade && (
        <div className="px-5 mb-4">
          <div className="glass-card neon-border p-3 rounded-2xl flex items-center gap-2">
            <GraduationCap size={16} className="text-primary" />
            <p className="text-xs text-foreground">
              <span className="font-bold">{sortedOpps.length} opportunities</span> available for Grade {userGrade} students
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="px-5">
          <div className="glass-card p-8 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-2">
              <Loader2 size={16} className="animate-spin text-primary" />
              <p className="text-xs text-muted-foreground">Loading opportunities...</p>
            </div>
          </div>
        </div>
      ) : sortedOpps.length === 0 ? (
        <div className="px-5">
          <div className="glass-card p-8 rounded-2xl text-center">
            <span className="text-3xl">🔍</span>
            <p className="text-sm font-semibold text-foreground mt-2">No opportunities found</p>
            <p className="text-[10px] text-muted-foreground">
              {filter !== "all" ? "Try a different filter" : "Check back later for new listings"}
            </p>
          </div>
        </div>
      ) : (
        <div className="px-5 space-y-3">
          {!careerId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card neon-border p-4 rounded-2xl"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">🧭</span>
                <div>
                  <p className="text-sm font-bold text-foreground">Set your Active Path</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Set an Active Path to unlock opportunities matched to your career goals.
                  </p>
                  <button
                    onClick={() => navigate("/career-exploration")}
                    className="mt-2 px-4 py-1.5 rounded-full text-xs font-bold bg-lime-500 text-black hover:bg-lime-400 transition-colors"
                  >
                    Explore careers →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          {sortedOpps.map((opp, idx) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              index={idx}
              typeConfig={typeConfig}
              locationLabel={locationLabel(opp)}
              careerId={careerId}
              applied={appliedIds.has(opp.id)}
              saved={savedIds.has(opp.id)}
              tier={getCareerTier(opp)}
              onApply={() => handleApply(opp.id)}
              onToggleSave={() => toggleSave(opp.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
