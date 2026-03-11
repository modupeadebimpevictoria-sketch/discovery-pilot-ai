import { Sparkles, Clock, Zap } from "lucide-react";
import type { Career } from "@/data/careers";

interface DailyNudgeProps {
  career: Career;
}

const nudges: Record<string, { action: string; time: number; xp: number }> = {
  "ai-engineer": { action: "Ask ChatGPT to explain one new concept about machine learning", time: 10, xp: 15 },
  "architect": { action: "Sketch the floor plan of your dream house on paper", time: 15, xp: 20 },
  "dentist": { action: "Research what a day in dental school looks like", time: 10, xp: 15 },
  "entrepreneur": { action: "Write down 3 problems you noticed today that could be businesses", time: 10, xp: 15 },
  "film-director": { action: "Watch 1 behind-the-scenes video of your favorite film", time: 15, xp: 15 },
  "climate-scientist": { action: "Read one article about climate change solutions", time: 10, xp: 15 },
  "game-developer": { action: "Sketch a game character concept on paper", time: 15, xp: 20 },
  "data-scientist": { action: "Find an interesting chart or dataset and write what you notice", time: 10, xp: 15 },
  "surgeon": { action: "Watch a short video about robotic surgery technology", time: 10, xp: 15 },
  "ux-designer": { action: "Pick an app you use daily and list 3 things you'd improve", time: 10, xp: 15 },
};

const defaultNudge = { action: "Spend 10 minutes researching your career path online", time: 10, xp: 15 };

export default function DailyNudge({ career }: DailyNudgeProps) {
  const nudge = nudges[career.id] || defaultNudge;

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
        <Sparkles size={14} className="text-glow-pink" /> Today's Nudge
      </h2>
      <div className="glass-card p-4 rounded-2xl space-y-3 border-glow-pink/20">
        <p className="text-sm text-foreground leading-relaxed">{nudge.action}</p>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock size={10} /> ~{nudge.time} min
          </span>
          <span className="flex items-center gap-1 text-[10px] text-primary font-bold">
            <Zap size={10} /> +{nudge.xp} XP
          </span>
        </div>
      </div>
    </div>
  );
}
