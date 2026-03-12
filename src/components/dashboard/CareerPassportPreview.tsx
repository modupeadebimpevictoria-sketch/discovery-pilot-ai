import { useNavigate } from "react-router-dom";
import { Award, ChevronRight } from "lucide-react";
import { useCareers } from "@/contexts/CareersContext";

interface CareerPassportPreviewProps {
  matchedCareers: { careerId: string; score: number }[];
  badges: string[];
  completedMilestones: string[];
}

export default function CareerPassportPreview({ matchedCareers, badges, completedMilestones }: CareerPassportPreviewProps) {
  const navigate = useNavigate();
  const { getCareerById } = useCareers();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Award size={14} className="text-primary" /> Career Passport
        </h2>
        <button
          onClick={() => navigate("/passport")}
          className="text-[10px] text-primary font-semibold flex items-center gap-0.5"
        >
          View full passport <ChevronRight size={12} />
        </button>
      </div>

      <div className="glass-card p-4 rounded-2xl">
        {/* Stamp grid */}
        <div className="flex gap-3 flex-wrap">
          {matchedCareers.slice(0, 6).map((match) => {
            const career = getCareerById(match.careerId);
            if (!career) return null;
            const completed = completedMilestones.some((m) => m.startsWith(career.id));

            return (
              <div
                key={career.id}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border-2 transition-all ${
                  completed
                    ? "border-primary/40 bg-primary/10 shadow-[0_0_8px_hsl(var(--primary)/0.2)]"
                    : "border-glass-border bg-muted/30 opacity-40 grayscale"
                }`}
              >
                {career.emoji}
              </div>
            );
          })}
        </div>

        {badges.length > 0 && (
          <div className="mt-3 flex gap-1.5 flex-wrap">
            {badges.slice(0, 3).map((b) => (
              <span key={b} className="px-2 py-1 rounded-full text-[10px] font-bold gradient-bg text-primary-foreground">
                🏆 {b}
              </span>
            ))}
            {badges.length > 3 && (
              <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-muted text-muted-foreground">
                +{badges.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
