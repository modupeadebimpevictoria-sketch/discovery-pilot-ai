import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import type { Career } from "@/contexts/CareersContext";

interface ActivePathwayCardProps {
  career: Career;
  matchScore: number;
  questsCompleted: number;
  questsTotal: number;
  onContinue: () => void;
}

export default function ActivePathwayCard({ career, matchScore, questsCompleted, questsTotal, onContinue }: ActivePathwayCardProps) {
  const progress = questsTotal > 0 ? Math.round((questsCompleted / questsTotal) * 100) : 0;

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
        🧭 Active Pathway
      </h2>
      <button
        onClick={onContinue}
        className="w-full glass-card neon-border p-5 rounded-2xl text-left space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-3xl">
            {career.emoji}
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-foreground">{career.title}</h3>
            <span className="text-xs font-bold text-primary">{matchScore}% match</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{questsCompleted}/{questsTotal} quests completed</span>
            <span className="text-primary font-bold">{progress}%</span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-primary/10 text-primary text-sm font-bold">
          Continue Exploring <ArrowRight size={16} />
        </div>
      </button>
    </div>
  );
}
