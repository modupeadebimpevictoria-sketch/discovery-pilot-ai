import { motion } from "framer-motion";
import { ExternalLink, Heart, Calendar, GraduationCap, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { AdminOpportunity } from "@/pages/Opportunities";

interface OpportunityCardProps {
  opportunity: AdminOpportunity;
  index: number;
  typeConfig: Record<string, { emoji: string; label: string; color: string }>;
  locationLabel: string;
  careerId: string | undefined;
  applied: boolean;
  saved: boolean;
  tier?: number;
  onApply: () => void;
  onToggleSave: () => void;
}

export default function OpportunityCard({
  opportunity: opp,
  index,
  typeConfig,
  locationLabel,
  careerId,
  applied,
  saved,
  tier,
  onApply,
  onToggleSave,
}: OpportunityCardProps) {
  const cfg = typeConfig[opp.type] || typeConfig.internship;
  const gradeTag = `Grade ${opp.min_grade}–${opp.max_grade}`;
  const isDeadLink = opp.is_link_dead === true;


  const handleApplyClick = () => {
    onApply();
    toast.success("Good luck! 🎯 We've logged this in your Passport.");
  };

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(opp.organisation + " application")}`;

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
            {tier === 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/15 text-primary">
                For your path 🎯
              </span>
            )}
            {tier === 1 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent/10 text-accent-foreground">
                Also relevant
              </span>
            )}
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

      <div className="flex flex-col gap-2 mt-3">
        {/* Primary action row */}
        <div className="flex gap-2">
          {isDeadLink ? (
            <div className="flex-1 flex flex-col gap-1">
              <div className="text-xs py-2 rounded-2xl font-bold bg-muted/50 text-muted-foreground flex items-center justify-center gap-1">
                <AlertTriangle size={12} /> Link unavailable
              </div>
              <a
                href={googleSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-muted-foreground text-center hover:text-primary transition-colors"
              >
                This link may have expired. Try searching for{" "}
                <span className="underline">{opp.organisation}</span> directly.
              </a>
            </div>
          ) : !careerId ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex-1 text-xs py-2 rounded-2xl font-bold bg-muted/50 text-muted-foreground flex items-center justify-center gap-1 cursor-default">
                    Set an Active Path to apply
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[220px] text-center">
                  <p className="text-xs">
                    Set a career as your Active Path first — it helps us track your progress and build your Passport.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <a
              href={opp.application_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleApplyClick}
              className={`flex-1 text-xs py-2 rounded-2xl font-bold transition-all flex items-center justify-center gap-1 ${
                applied
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "btn-primary-glow"
              }`}
            >
              {applied ? "✅ Explored" : "Apply →"}
            </a>
          )}

          {/* View details */}
          <a
            href={opp.application_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass text-xs py-2 px-3 flex items-center justify-center gap-1"
          >
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Save for later */}
        {!isDeadLink && (
          <button
            onClick={onToggleSave}
            className={`w-full text-xs py-1.5 rounded-xl font-medium transition-all flex items-center justify-center gap-1 ${
              saved
                ? "text-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Heart size={12} className={saved ? "fill-primary" : ""} /> {saved ? "Saved" : "Save for later"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
