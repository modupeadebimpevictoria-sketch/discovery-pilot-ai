import { motion } from "framer-motion";
import { ExternalLink, Lock, Calendar, GraduationCap, MapPin } from "lucide-react";
import type { AdminOpportunity } from "@/pages/Opportunities";

interface OpportunityCardProps {
  opportunity: AdminOpportunity;
  index: number;
  typeConfig: Record<string, { emoji: string; label: string; color: string }>;
  locationLabel: string;
  userGrade: number | null;
  careerId: string | undefined;
  applied: boolean;
  onApply: () => void;
}

export default function OpportunityCard({
  opportunity: opp,
  index,
  typeConfig,
  locationLabel,
  userGrade,
  careerId,
  applied,
  onApply,
}: OpportunityCardProps) {
  const cfg = typeConfig[opp.type] || typeConfig.internship;
  const gradeTag = `Grade ${opp.min_grade}–${opp.max_grade}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="glass-card-hover p-4 rounded-2xl"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{cfg.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground">{opp.title}</p>
          <p className="text-[10px] text-muted-foreground">{opp.organisation}</p>
          {opp.description && (
            <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{opp.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${cfg.color}`}>
              {cfg.label}
            </span>
            <span className="text-[10px] text-muted-foreground">{locationLabel}</span>
            <span className="flex items-center gap-0.5 text-[10px] text-primary font-medium">
              <GraduationCap size={10} /> {gradeTag}
            </span>
            {opp.deadline && (
              <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                <Calendar size={10} /> {opp.deadline}
              </span>
            )}
            {opp.is_remote && (
              <span className="text-[10px] font-medium text-accent">🏠 Remote</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <a
          href={opp.application_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 btn-glass text-xs py-2 flex items-center justify-center gap-1"
        >
          <ExternalLink size={12} /> View Details
        </a>
        {careerId ? (
          <button
            onClick={onApply}
            disabled={applied}
            className={`flex-1 text-xs py-2 rounded-2xl font-bold transition-all flex items-center justify-center gap-1 ${
              applied
                ? "bg-primary/10 text-primary border border-primary/20"
                : "btn-primary-glow"
            }`}
          >
            {applied ? "✅ Applied" : "📩 Apply"}
          </button>
        ) : (
          <div className="flex-1 text-xs py-2 rounded-2xl font-bold bg-muted/50 text-muted-foreground flex items-center justify-center gap-1">
            <Lock size={12} /> Set Active Path
          </div>
        )}
      </div>
    </motion.div>
  );
}
