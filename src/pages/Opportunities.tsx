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

  // Fetch from admin_opportunities table
  useEffect(() => {
    const fetchOpps = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from("admin_opportunities")
          .select("*")
          .eq("is_active", true);

        // Grade filtering
        if (userGrade !== null) {
          query = query.lte("min_grade", userGrade).gte("max_grade", userGrade);
        }

        const { data, error } = await query.order("created_at", { ascending: false });
        if (error) throw error;
        setDbOpps((data as AdminOpportunity[]) || []);
      } catch (err) {
        console.error("Failed to fetch opportunities:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOpps();
  }, [userGrade]);

  // Sort: location-first, then by type relevance
  const sortedOpps = useMemo(() => {
    const filtered = filter === "all" ? dbOpps : dbOpps.filter((o) => o.type === filter);
    return [...filtered].sort((a, b) => {
      const aPri = getLocationPriority(a.country, userCountry);
      const bPri = getLocationPriority(b.country, userCountry);
      return aPri - bPri;
    });
  }, [dbOpps, filter, userCountry]);

  const handleApply = (oppId: string) => {
    if (!careerId) {
      toast.error("Set a career as your Active Path to apply");
      return;
    }
    applyToInternship(oppId);
    toast.success("Application sent! 🎉");
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
          {sortedOpps.map((opp, idx) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              index={idx}
              typeConfig={typeConfig}
              locationLabel={locationLabel(opp)}
              userGrade={userGrade}
              careerId={careerId}
              applied={appliedInternships.includes(opp.id)}
              onApply={() => handleApply(opp.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
