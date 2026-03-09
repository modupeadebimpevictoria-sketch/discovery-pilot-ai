import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ChevronRight, CheckCircle } from "lucide-react";
import type { WeeklyQuest } from "@/data/weeklyQuests";

interface QuestProgressProps {
  weekQuests: WeeklyQuest[];
  completedQuests: string[];
}

export default function QuestProgress({ weekQuests, completedQuests }: QuestProgressProps) {
  const navigate = useNavigate();
  const done = weekQuests.filter((q) => completedQuests.includes(q.id)).length;
  const total = weekQuests.length;

  if (total === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Flame size={14} className="text-accent" /> Quest Progress
        </h2>
        <button
          onClick={() => navigate("/quests")}
          className="text-[10px] text-primary font-semibold flex items-center gap-0.5"
        >
          View all <ChevronRight size={12} />
        </button>
      </div>

      <div className="glass-card p-4 rounded-2xl space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{done}/{total} quests this week</span>
          {done === total && <span className="text-primary font-bold">All done! 🎉</span>}
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Show next incomplete quest */}
        {weekQuests
          .filter((q) => !completedQuests.includes(q.id))
          .slice(0, 1)
          .map((q) => (
            <button
              key={q.id}
              onClick={() => navigate("/quests")}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-muted/30 text-left"
            >
              <span className="text-lg">{q.emoji}</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{q.title}</p>
                <p className="text-[10px] text-muted-foreground">{q.timeMinutes} min • +{q.xpReward} XP</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground" />
            </button>
          ))}
      </div>
    </div>
  );
}
