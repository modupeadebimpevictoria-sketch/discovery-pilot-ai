import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { opportunities, Opportunity, OpportunityType } from "@/data/opportunities";
import { getCareerById } from "@/data/careers";
import { ChevronLeft, ExternalLink, Filter, GraduationCap, Trophy, BookOpen, Briefcase, Users } from "lucide-react";
import { useState } from "react";

const typeConfig: Record<OpportunityType, { emoji: string; label: string; color: string }> = {
  scholarship: { emoji: "🎓", label: "Scholarship", color: "bg-primary/10 text-primary" },
  competition: { emoji: "🏆", label: "Competition", color: "bg-accent/10 text-accent" },
  course: { emoji: "📚", label: "Course", color: "bg-secondary/10 text-secondary" },
  program: { emoji: "🌍", label: "Program", color: "bg-glow-purple/10 text-glow-purple" },
  workshop: { emoji: "🤝", label: "Workshop", color: "bg-glow-pink/10 text-glow-pink" },
  internship: { emoji: "💼", label: "Internship", color: "bg-secondary/10 text-secondary" },
};

export default function Opportunities() {
  const navigate = useNavigate();
  const { selectedCareerPath, matchedCareers } = useApp();
  const [filter, setFilter] = useState<OpportunityType | "all">("all");

  const careerId = selectedCareerPath || matchedCareers[0]?.careerId;
  const career = careerId ? getCareerById(careerId) : null;

  // Show recommended first, then all
  const recommended = careerId
    ? opportunities.filter((o) => o.relatedCareers.includes(careerId))
    : [];
  const otherOpps = opportunities.filter((o) => !recommended.find((r) => r.id === o.id));
  const allOpps = [...recommended, ...otherOpps];

  const filtered = filter === "all" ? allOpps : allOpps.filter((o) => o.type === filter);

  const filters: { key: OpportunityType | "all"; label: string }[] = [
    { key: "all", label: "All" },
    { key: "scholarship", label: "🎓 Scholarships" },
    { key: "competition", label: "🏆 Competitions" },
    { key: "course", label: "📚 Courses" },
    { key: "program", label: "🌍 Programs" },
    { key: "workshop", label: "🤝 Workshops" },
  ];

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

      {/* Opportunity Cards */}
      <div className="px-5 space-y-3">
        {filtered.map((opp, idx) => {
          const isRecommended = recommended.find((r) => r.id === opp.id);
          const cfg = typeConfig[opp.type];
          return (
            <motion.a
              key={opp.id}
              href={opp.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`block glass-card-hover p-4 rounded-2xl ${isRecommended ? "border-primary/20" : ""}`}
            >
              <div className="flex items-start gap-3">
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
              </div>
            </motion.a>
          );
        })}
      </div>

      {filtered.length === 0 && (
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
