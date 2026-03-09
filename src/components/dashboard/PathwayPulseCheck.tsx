import { useState } from "react";
import { Heart } from "lucide-react";

interface PathwayPulseCheckProps {
  pathwayStartDate: string | null;
  careerTitle: string;
  currentPulse: string | null;
  onPulse: (emoji: string) => void;
}

const pulseEmojis = [
  { emoji: "🔥", label: "Excited" },
  { emoji: "😊", label: "Good" },
  { emoji: "🤔", label: "Unsure" },
  { emoji: "😐", label: "Meh" },
  { emoji: "😟", label: "Doubtful" },
];

export default function PathwayPulseCheck({ pathwayStartDate, careerTitle, currentPulse, onPulse }: PathwayPulseCheckProps) {
  // Only show after 7+ days on the same pathway
  if (!pathwayStartDate) return null;

  const daysSinceStart = Math.floor(
    (Date.now() - new Date(pathwayStartDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceStart < 7) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
        <Heart size={14} className="text-secondary" /> Pathway Pulse Check
      </h2>
      <div className="glass-card p-4 rounded-2xl space-y-3">
        <p className="text-xs text-muted-foreground">
          How are you feeling about the <span className="text-foreground font-semibold">{careerTitle}</span> path?
        </p>
        <div className="flex items-center justify-around">
          {pulseEmojis.map((p) => (
            <button
              key={p.emoji}
              onClick={() => onPulse(p.emoji)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                currentPulse === p.emoji
                  ? "bg-primary/10 border border-primary/30 scale-110"
                  : "hover:bg-muted/30"
              }`}
            >
              <span className="text-2xl">{p.emoji}</span>
              <span className="text-[9px] text-muted-foreground">{p.label}</span>
            </button>
          ))}
        </div>
        {currentPulse && (
          <p className="text-[10px] text-center text-primary font-semibold">
            Thanks for checking in! Your feedback helps us tailor your experience.
          </p>
        )}
      </div>
    </div>
  );
}
