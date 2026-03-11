import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Flame, Map, MessageCircle } from "lucide-react";

interface PostAssessmentWalkthroughProps {
  onComplete: () => void;
}

const screens = [
  {
    icon: <Flame size={48} className="text-glow-pink" />,
    headline: "Your feed is ready 🔥",
    body: "Every day, SpringBoard brings you real stories, videos, and updates about your 3 matched careers. The more you explore, the more personalised it gets.",
    bgClass: "bg-glow-pink/10 border-glow-pink/20",
    dotColor: "bg-glow-pink",
  },
  {
    icon: <Map size={48} className="text-primary" />,
    headline: "Pick a path to get started 🗺️",
    body: "Set one career as your Active Path to unlock quests, earn XP, and build your Career Passport. You can switch anytime — your progress is always saved.",
    bgClass: "bg-primary/10 border-primary/20",
    dotColor: "bg-primary",
  },
  {
    icon: <MessageCircle size={48} className="text-glow-purple" />,
    headline: "Meet your AI Mentor 👆",
    body: "Ask anything. Your SpringBoard Mentor knows your matches, your progress, and your goals — it gives you real, specific advice, not generic tips.",
    bgClass: "bg-glow-purple/10 border-glow-purple/20",
    dotColor: "bg-glow-purple",
  },
];

export default function PostAssessmentWalkthrough({ onComplete }: PostAssessmentWalkthroughProps) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const screen = screens[currentScreen];

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end px-5 pt-4">
        <button
          onClick={onComplete}
          className="text-xs text-muted-foreground font-medium"
        >
          Skip →
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 pt-2 pb-6">
        {screens.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentScreen
                ? "w-6 bg-primary"
                : i < currentScreen
                ? "w-1.5 bg-primary/40"
                : "w-1.5 bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-6 max-w-sm w-full"
          >
            {/* Mock visual */}
            <div className="w-32 h-32 rounded-3xl bg-primary/10 border border-primary/20 mx-auto flex items-center justify-center">
              {screen.icon}
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground">{screen.headline}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{screen.body}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="px-8 pb-10">
        <button
          onClick={handleNext}
          className="w-full btn-primary-glow py-4 text-sm font-bold flex items-center justify-center gap-2"
        >
          {currentScreen === screens.length - 1 ? (
            <>Let's go <ArrowRight size={16} /></>
          ) : (
            <>Next <ArrowRight size={16} /></>
          )}
        </button>
      </div>
    </div>
  );
}
