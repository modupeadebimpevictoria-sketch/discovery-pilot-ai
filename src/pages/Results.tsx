import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { getCareerById } from "@/data/careers";
import { archetypes } from "@/data/questions";
import { fireConfetti, fireBurst } from "@/lib/confetti";
import ShareModal from "@/components/ShareModal";
import { ArrowRight, Share2, Sparkles, Heart, ChevronDown } from "lucide-react";

const surprisingFacts: Record<string, string> = {
  "ai-engineer": "AI engineers can earn more than doctors within 5 years of graduating! 🤯",
  "dentist": "Dentists are some of the happiest workers in the world! 😊",
  "aerospace-engineer": "SpaceX engineers landed a rocket on a ship in the middle of the ocean! 🚀",
  "music-producer": "Max Martin has written more number-one hits than The Beatles! 🎵",
  "architect": "The world's tallest building took 6 years to design but only 5 to build! 🏗️",
  "climate-scientist": "Planting 1 trillion trees could cancel 10 years of pollution! 🌳",
  "data-scientist": "Harvard called data science 'the coolest job of the century'! 📊",
  "film-director": "Christopher Nolan doesn't use a phone or email! 🎬",
  "game-developer": "Minecraft was built by one person in just 6 days! 🎮",
  "investment-banker": "New investment bankers can earn $200k+ in their first year! 💰",
  "robotics-engineer": "Robots can now do parkour better than most humans! 🦾",
  "tv-presenter": "Oprah was fired from her first TV job — now she's worth $2.5 billion! 📺",
  "wildlife-conservationist": "Scientists saved the bald eagle from going extinct! 🦅",
  "sports-physiotherapist": "Sports physios travel the world with famous athletes! ⚽",
  "diplomat": "Diplomats get a special passport and can't be arrested! 🌐",
  "entrepreneur": "Most billionaires started their first business before age 25! 🚀",
  "chef": "Gordon Ramsay has earned 16 Michelin stars in his career! 👨‍🍳",
  "urban-planner": "Well-designed cities can cut car use by 40%! 🏙️",
  "fashion-designer": "Virgil Abloh went from DJing to running Louis Vuitton! 👗",
  "cybersecurity-analyst": "There are 3.5 million unfilled cybersecurity jobs right now! 🔐",
  "surgeon": "Surgeons can now operate on patients from thousands of miles away using robots! 🏥",
  "ux-designer": "Good design can make a website 400% more successful! 🎨",
  "marine-biologist": "We've explored more of the Moon than the deep ocean! 🐋",
  "psychologist": "It takes just 7 seconds to form a first impression! 🧠",
  "software-engineer": "Software engineers at Google get free food every day! 💻",
  "biomedical-engineer": "Engineers 3D-printed a heart from human cells! 🫀",
  "journalist": "Two journalists' reporting brought down a US president! 📰",
  "pharmacist": "Pharmacists are the easiest doctors to access — no appointment needed! 💊",
  "environmental-engineer": "Environmental engineers helped clean up 80% of polluted rivers! ♻️",
  "professional-athlete": "Cristiano Ronaldo earns more from Instagram than from playing football! 🏆",
};

export default function Results() {
  const navigate = useNavigate();
  const { matchedCareers, archetype, savedCareers, toggleSavedCareer, profile } = useApp();
  const [phase, setPhase] = useState<"archetype" | "reveal" | "cards">("archetype");
  const [cardIndex, setCardIndex] = useState(0);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [shareOpen, setShareOpen] = useState(false);

  const arch = archetypes[archetype];

  useEffect(() => {
    if (phase === "archetype") {
      setTimeout(() => fireConfetti(), 500);
      setTimeout(() => setPhase("reveal"), 3500);
    }
  }, [phase]);

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      const current = matchedCareers[cardIndex];
      if (!current) return;
      
      if (direction === "right") {
        toggleSavedCareer(current.careerId);
      }
      setDismissed((d) => [...d, current.careerId]);
      
      if (cardIndex < matchedCareers.length - 1) {
        setCardIndex((i) => i + 1);
        fireBurst();
      } else {
        setPhase("cards");
      }
    },
    [cardIndex, matchedCareers, toggleSavedCareer]
  );

  if (!matchedCareers.length) {
    navigate("/");
    return null;
  }

  const colorGradients: Record<string, string> = {
    primary: "from-primary to-glow-secondary",
    secondary: "from-secondary to-glow-purple",
    accent: "from-accent to-glow-pink",
    purple: "from-glow-purple to-secondary",
  };

  // Archetype reveal
  if (phase === "archetype" && arch) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.3 }}
          className="text-center space-y-6 max-w-sm"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-8xl"
          >
            {arch.emoji}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-2"
          >
            <p className="text-muted-foreground text-sm">{profile?.name}, you are...</p>
            <h1 className="text-4xl font-bold gradient-text">{arch.name}</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">{arch.description}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center gap-2 pt-4"
          >
            <ChevronDown size={20} className="swipe-hint text-primary" />
            <span className="text-xs text-muted-foreground">Finding your best career matches...</span>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Swipeable card reveal
  if (phase === "reveal") {
    const current = matchedCareers[cardIndex];
    const career = current ? getCareerById(current.careerId) : null;

    if (!career) {
      setPhase("cards");
      return null;
    }

    const gradient = colorGradients[career.color] || colorGradients.primary;
    const fact = surprisingFacts[career.id] || `${career.title}s are in ${career.jobOutlook.toLowerCase()} right now!`;

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Progress */}
        <div className="absolute top-6 left-6 right-6 flex gap-2">
          {matchedCareers.map((_, i) => (
            <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-muted">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  i <= cardIndex ? "gradient-bg w-full" : "w-0"
                }`}
              />
            </div>
          ))}
        </div>

        <p className="absolute top-14 text-sm text-muted-foreground">
          Match {cardIndex + 1} of {matchedCareers.length}
        </p>

        {/* Card */}
        <SwipeCard key={career.id} onSwipe={handleSwipe}>
          <div className="glass-heavy p-6 rounded-3xl space-y-5 w-full max-w-sm border border-glass-border/60">
            {/* Score ring */}
            <div className="flex justify-center">
              <div className="relative">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <motion.circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke="url(#scoreGrad)" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - current.score / 100) }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--secondary))" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl font-bold text-foreground"
                  >
                    {current.score}%
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Career info */}
            <div className="text-center space-y-2">
              <span className="text-5xl">{career.emoji}</span>
              <h2 className="text-2xl font-bold text-foreground">{career.title}</h2>
              <span className={`${demandClassMap[career.jobOutlook] || "demand-stable"} inline-block`}>
                {career.jobOutlook}
              </span>
            </div>

            {/* Why it fits */}
            <div className="glass-card p-3 rounded-xl space-y-1">
              <p className="text-xs font-bold text-primary uppercase tracking-wider">Why this fits you</p>
              <p className="text-sm text-muted-foreground">
                Your {career.personalityFit.slice(0, 2).join(" and ")} personality matches perfectly with being a {career.title}. You'd love this!
              </p>
            </div>

            {/* Surprising fact */}
            <div className="glass-card p-3 rounded-xl">
              <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">🤯 Did you know?</p>
              <p className="text-sm text-muted-foreground">{fact}</p>
            </div>

            {/* Quick facts */}
            <div className="flex gap-2">
              <span className="fact-pill flex-1 justify-center">💰 {career.salaryRange.mid}</span>
              <span className="fact-pill flex-1 justify-center">⏱️ {career.timelineYears}yr path</span>
            </div>
          </div>
        </SwipeCard>

        {/* Swipe instructions */}
        <div className="mt-6 flex gap-8 text-xs text-muted-foreground">
          <span>← Not for me</span>
          <span>Save it! →</span>
        </div>

        <button onClick={() => setPhase("cards")} className="mt-4 text-xs text-muted-foreground underline">
          See all matches
        </button>
      </div>
    );
  }

  // Final cards view
  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="px-5 pt-8 pb-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{profile?.name}'s results</p>
            <h1 className="text-2xl font-bold gradient-text">Your Top 3 Paths 🎯</h1>
          </div>
          <button onClick={() => setShareOpen(true)} className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
            <Share2 size={18} className="text-foreground" />
          </button>
        </div>

        {arch && (
          <div className="glass-card p-4 rounded-2xl flex items-center gap-3">
            <span className="text-3xl">{arch.emoji}</span>
            <div>
              <p className="font-bold text-foreground text-sm">{arch.name}</p>
              <p className="text-xs text-muted-foreground">{arch.description}</p>
            </div>
            <button onClick={() => setShareOpen(true)} className="ml-auto">
              <Share2 size={16} className="text-muted-foreground" />
            </button>
          </div>
        )}
      </div>

      {/* Career cards */}
      <div className="px-5 space-y-4">
        {matchedCareers.map((match, i) => {
          const career = getCareerById(match.careerId);
          if (!career) return null;
          const saved = savedCareers.includes(career.id);
          const gradient = colorGradients[career.color] || colorGradients.primary;
          const fact = surprisingFacts[career.id] || "";

          return (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.12 }}
              className="glass-card-hover p-5 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl`}>
                    {career.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{career.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{career.category}</span>
                      <span className={`${demandClassMap[career.jobOutlook] || "demand-stable"} text-[10px] px-2 py-0.5`}>
                        {career.jobOutlook}
                      </span>
                    </div>
                  </div>
                </div>
                <button onClick={() => toggleSavedCareer(career.id)} className="p-2 -mr-2">
                  <Heart size={22} className={saved ? "fill-accent text-accent" : "text-muted-foreground"} />
                </button>
              </div>

              {/* Fit indicator */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">How well it fits you</span>
                  <span className="text-primary font-bold text-lg">{match.score}% fit</span>
                </div>
                <div className="progress-bar h-3 rounded-full">
                  <motion.div
                    className="progress-bar-fill h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${match.score}%` }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.8 }}
                  />
                </div>
              </div>

              {/* Quick facts */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                <span className="fact-pill whitespace-nowrap">💰 {career.salaryRange.mid}</span>
                <span className="fact-pill whitespace-nowrap">⏱️ {career.timelineYears}yr</span>
                {career.personalityFit.slice(0, 1).map((t) => (
                  <span key={t} className="fact-pill whitespace-nowrap">✨ {t}</span>
                ))}
              </div>

              {fact && <p className="text-xs text-muted-foreground italic">🤯 {fact}</p>}

              <button
                onClick={() => navigate(`/career/${career.id}`)}
                className="w-full btn-primary-glow flex items-center justify-center gap-2 text-sm"
              >
                Learn More <ArrowRight size={16} />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="px-5 mt-6 space-y-3">
        <button onClick={() => navigate("/feed")} className="w-full btn-glass text-center flex items-center justify-center gap-2">
          🔥 Explore More Careers
        </button>
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        careerTitle={getCareerById(matchedCareers[0]?.careerId)?.title || ""}
        careerEmoji={getCareerById(matchedCareers[0]?.careerId)?.emoji || "🎯"}
        score={matchedCareers[0]?.score}
        archetype={arch?.name}
      />
    </div>
  );
}

// Swipeable card component
function SwipeCard({ children, onSwipe }: { children: React.ReactNode; onSwipe: (dir: "left" | "right") => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 80) onSwipe("right");
    else if (info.offset.x < -80) onSwipe("left");
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, opacity }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0, y: -100 }}
      transition={{ type: "spring", damping: 20 }}
      className="cursor-grab active:cursor-grabbing w-full max-w-sm"
    >
      {children}
    </motion.div>
  );
}

const demandClassMap: Record<string, string> = {
  "High Demand": "demand-high",
  Growing: "demand-growing",
  Emerging: "demand-emerging",
  Stable: "demand-stable",
};
