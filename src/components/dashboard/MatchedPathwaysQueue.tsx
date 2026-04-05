import { Lock, X, Sparkles } from "lucide-react";
import { useCareers } from "@/contexts/CareersContext";

interface MatchedPathwaysQueueProps {
  matchedCareers: { careerId: string; score: number }[];
  activePathwayId: string | null;
  rejectedCareers: string[];
  onReject: (id: string) => void;
}

export default function MatchedPathwaysQueue({ matchedCareers, activePathwayId, rejectedCareers, onReject }: MatchedPathwaysQueueProps) {
  const { getCareerById } = useCareers();
  const queuedCareers = matchedCareers.filter(
    (m) => m.careerId !== activePathwayId && !rejectedCareers.includes(m.careerId)
  );

  if (queuedCareers.length === 0) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-bold text-foreground">🔮 Your Other Paths</h2>
      <p className="text-xs text-muted-foreground">These are waiting for you when you're ready</p>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5">
        {queuedCareers.map((match) => {
          const career = getCareerById(match.careerId);
          if (!career) return null;

          return (
            <div
              key={career.id}
              className="glass-card p-4 rounded-2xl min-w-[160px] max-w-[160px] relative flex-shrink-0 opacity-60"
            >
              {/* Reject button */}
              <button
                onClick={(e) => { e.stopPropagation(); onReject(career.id); }}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-colors"
              >
                <X size={12} />
              </button>

              <div className="text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-xl mx-auto">
                  {career.emoji}
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground truncate">{career.title}</p>
                  <p className="text-[10px] text-muted-foreground">Matched for you</p>
                </div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
                  <Lock size={10} />
                  <span>Waiting</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
