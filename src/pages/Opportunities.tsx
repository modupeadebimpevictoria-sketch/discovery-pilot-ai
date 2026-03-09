import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { opportunities, Opportunity, OpportunityType } from "@/data/opportunities";
import { getCareerById } from "@/data/careers";
import { getCareerListingById } from "@/data/careerFamilies";
import { ChevronLeft, ExternalLink, Lock, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const typeConfig: Record<OpportunityType, { emoji: string; label: string; color: string }> = {
  scholarship: { emoji: "🎓", label: "Scholarship", color: "bg-primary/10 text-primary" },
  competition: { emoji: "🏆", label: "Competition", color: "bg-accent/10 text-accent" },
  course: { emoji: "📚", label: "Course", color: "bg-secondary/10 text-secondary" },
  program: { emoji: "🌍", label: "Program", color: "bg-glow-purple/10 text-glow-purple" },
  workshop: { emoji: "🤝", label: "Workshop", color: "bg-glow-pink/10 text-glow-pink" },
  internship: { emoji: "💼", label: "Internship", color: "bg-secondary/10 text-secondary" },
};

interface ScrapedOpportunity {
  title: string;
  company: string;
  location: string;
  url: string;
  type: string;
}

export default function Opportunities() {
  const navigate = useNavigate();
  const { selectedCareerPath, matchedCareers, appliedInternships, applyToInternship } = useApp();
  const [filter, setFilter] = useState<OpportunityType | "all">("all");
  const [scrapedOpps, setScrapedOpps] = useState<ScrapedOpportunity[]>([]);
  const [loadingScrape, setLoadingScrape] = useState(false);

  const careerId = selectedCareerPath || matchedCareers[0]?.careerId;
  const career = careerId ? (getCareerById(careerId) || (() => { const l = getCareerListingById(careerId); return l ? { id: l.id, title: l.title, emoji: "💼" } : null; })()) : null;

  // Fetch scraped internships on mount
  useEffect(() => {
    const fetchScrapedOpps = async () => {
      setLoadingScrape(true);
      try {
        const { data, error } = await supabase.functions.invoke("scrape-opportunities", {
          body: { query: career?.title || "internship" },
        });
        if (error) throw error;
        if (data?.opportunities) {
          setScrapedOpps(data.opportunities);
        }
      } catch (err) {
        console.error("Failed to fetch scraped opportunities:", err);
      } finally {
        setLoadingScrape(false);
      }
    };
    fetchScrapedOpps();
  }, [career?.title]);

  // Show recommended first, then all
  const recommended = careerId
    ? opportunities.filter((o) => o.relatedCareers.includes(careerId))
    : [];
  const otherOpps = opportunities.filter((o) => !recommended.find((r) => r.id === o.id));
  const allOpps = [...recommended, ...otherOpps];
  const filtered = filter === "all" ? allOpps : allOpps.filter((o) => o.type === filter);

  const filters: { key: OpportunityType | "all"; label: string }[] = [
    { key: "all", label: "All" },
    { key: "internship", label: "💼 Internships" },
    { key: "scholarship", label: "🎓 Scholarships" },
    { key: "competition", label: "🏆 Competitions" },
    { key: "course", label: "📚 Courses" },
    { key: "program", label: "🌍 Programs" },
    { key: "workshop", label: "🤝 Workshops" },
  ];

  const handleApply = (oppId: string) => {
    if (!careerId) {
      toast.error("Set a career as your Active Path to apply");
      return;
    }
    applyToInternship(oppId);
    toast.success("Application sent! 🎉");
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="px-5 pt-6 pb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
          <ChevronLeft size={18} /> Back
        </button>

        <h1 className="text-xl font-bold text-foreground mb-1">Opportunities 🚀</h1>
        <p className="text-sm text-muted-foreground mb-4">
          {career ? `Recommended for future ${career.title}s` : "Scholarships, competitions, courses & more"}
        </p>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                filter === f.key
                  ? "gradient-bg text-primary-foreground"
                  : "glass-card text-muted-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended banner */}
      {careerId && filter === "all" && recommended.length > 0 && (
        <div className="px-5 mb-4">
          <div className="glass-card neon-border p-3 rounded-2xl flex items-center gap-2">
            <span className="text-lg">{career?.emoji}</span>
            <p className="text-xs text-foreground">
              <span className="font-bold">{recommended.length} opportunities</span> matched to your {career?.title} path
            </p>
          </div>
        </div>
      )}

      {/* Scraped Real Internships */}
      {(filter === "all" || filter === "internship") && scrapedOpps.length > 0 && (
        <div className="px-5 mb-6">
          <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
            <Briefcase size={16} className="text-secondary" /> Real Internships (Nigeria & International)
          </h2>
          <div className="space-y-3">
            {scrapedOpps.map((opp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card-hover p-4 rounded-2xl"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💼</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{opp.title}</p>
                    <p className="text-[10px] text-muted-foreground">{opp.company}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-[10px] text-muted-foreground">📍 {opp.location}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-secondary/10 text-secondary">{opp.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <a href={opp.url} target="_blank" rel="noopener noreferrer" className="flex-1 btn-glass text-xs py-2 flex items-center justify-center gap-1">
                    <ExternalLink size={12} /> View Details
                  </a>
                  {careerId ? (
                    <button
                      onClick={() => handleApply(`scraped-${idx}`)}
                      disabled={appliedInternships.includes(`scraped-${idx}`)}
                      className={`flex-1 text-xs py-2 rounded-2xl font-bold transition-all flex items-center justify-center gap-1 ${
                        appliedInternships.includes(`scraped-${idx}`)
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "btn-primary-glow"
                      }`}
                    >
                      {appliedInternships.includes(`scraped-${idx}`) ? "✅ Applied" : "📩 Apply"}
                    </button>
                  ) : (
                    <div className="flex-1 text-xs py-2 rounded-2xl font-bold bg-muted/50 text-muted-foreground flex items-center justify-center gap-1">
                      <Lock size={12} /> Set Active Path to apply
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {loadingScrape && (
        <div className="px-5 mb-4">
          <div className="glass-card p-4 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-muted-foreground">Finding real internships...</p>
            </div>
          </div>
        </div>
      )}

      {/* Curated Opportunity Cards */}
      <div className="px-5 space-y-3">
        {filtered.map((opp, idx) => {
          const isRecommended = recommended.find((r) => r.id === opp.id);
          const cfg = typeConfig[opp.type];
          return (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`glass-card-hover p-4 rounded-2xl ${isRecommended ? "border-primary/20" : ""}`}
            >
              <a href={opp.link} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3">
                <span className="text-2xl">{cfg.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-foreground">{opp.title}</p>
                    <ExternalLink size={14} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{opp.description}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${cfg.color}`}>{cfg.label}</span>
                    <span className="text-[10px] text-muted-foreground">📍 {opp.location}</span>
                    {opp.deadline && (
                      <span className="text-[10px] text-muted-foreground">📅 {opp.deadline}</span>
                    )}
                    {opp.isFree && (
                      <span className="text-[10px] font-bold text-primary">FREE</span>
                    )}
                    {isRecommended && (
                      <span className="text-[10px] font-bold text-accent">⭐ Recommended</span>
                    )}
                  </div>
                </div>
              </a>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && scrapedOpps.length === 0 && (
        <div className="px-5">
          <div className="glass-card p-8 rounded-2xl text-center">
            <span className="text-3xl">🔍</span>
            <p className="text-sm font-semibold text-foreground mt-2">No opportunities found</p>
            <p className="text-[10px] text-muted-foreground">Try a different filter</p>
          </div>
        </div>
      )}
    </div>
  );
}
