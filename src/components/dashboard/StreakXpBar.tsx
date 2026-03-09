import { motion } from "framer-motion";
import { Flame, Zap } from "lucide-react";

interface StreakXpBarProps {
  streak: number;
  xp: number;
  level: number;
  levelTitle: string;
  xpProgress: number;
}

export default function StreakXpBar({ streak, xp, level, levelTitle, xpProgress }: StreakXpBarProps) {
  return (
    <div className="glass-card p-4 rounded-2xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
            <Flame size={14} className="text-secondary" />
            <span className="text-xs font-bold text-secondary">{streak} day streak</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <Zap size={14} className="text-primary" />
          <span className="text-xs font-bold text-primary">{xp} XP</span>
        </div>
      </div>

      {/* Level progress */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-sm font-bold text-primary-foreground">
          {level}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-foreground">{levelTitle}</span>
            <span className="text-[10px] text-muted-foreground">Level {level}</span>
          </div>
          <div className="level-bar">
            <motion.div
              className="level-bar-fill gradient-bg"
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
