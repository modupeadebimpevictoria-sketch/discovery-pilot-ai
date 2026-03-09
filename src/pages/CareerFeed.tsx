import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { careerListings, getCareerFamilyById } from "@/data/careerFamilies";
import { useApp } from "@/contexts/AppContext";
import { Heart, ArrowRight, ChevronUp, DollarSign, TrendingUp, Star } from "lucide-react";

const shuffled = [...careerListings].sort(() => Math.random() - 0.5);

const familyGradients: Record<string, string> = {
  "creative-design": "from-purple-500/20 via-background to-background",
  "media-content": "from-red-500/20 via-background to-background",
  "entertainment-performance": "from-fuchsia-500/20 via-background to-background",
  "technology": "from-cyan-500/20 via-background to-background",
  "product-tech": "from-indigo-500/20 via-background to-background",
  "healthcare-medicine": "from-emerald-500/20 via-background to-background",
  "mental-health": "from-violet-500/20 via-background to-background",
  "science-research": "from-blue-500/20 via-background to-background",
  "environment-sustainability": "from-green-500/20 via-background to-background",
  "engineering-architecture": "from-orange-500/20 via-background to-background",
  "trades-technical": "from-amber-500/20 via-background to-background",
  "business-entrepreneurship": "from-sky-500/20 via-background to-background",
  "finance-investment": "from-emerald-500/20 via-background to-background",
  "marketing-communications": "from-pink-500/20 via-background to-background",
  "law-justice": "from-slate-500/20 via-background to-background",
  "education-academia": "from-amber-500/20 via-background to-background",
  "social-impact": "from-rose-500/20 via-background to-background",
  "government-public-service": "from-blue-600/20 via-background to-background",
  "international-development": "from-teal-500/20 via-background to-background",
  "travel-hospitality": "from-sky-500/20 via-background to-background",
  "food-culinary": "from-red-500/20 via-background to-background",
  "sport-fitness": "from-lime-500/20 via-background to-background",
  "animals-nature": "from-green-600/20 via-background to-background",
  "space-future-tech": "from-violet-600/20 via-background to-background",
  "beauty-wellness": "from-pink-400/20 via-background to-background",
  "real-estate-property": "from-amber-600/20 via-background to-background",
};

function getMatchScore(careerId: string): number {
  let hash = 0;
  for (let i = 0; i < careerId.length; i++) {
    hash = ((hash << 5) - hash) + careerId.charCodeAt(i);
    hash |= 0;
  }
  return 55 + Math.abs(hash % 40);
}

export default function CareerFeed() {
  const navigate = useNavigate();
  const { savedCareers, toggleSavedCareer, matchedCareers } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const cardHeight = containerRef.current.clientHeight;
    const index = Math.round(scrollTop / cardHeight);
    setCurrentIndex(index);
  }, []);

  return (
    <div className="fixed inset-0 bg-background">
      {/* Progress dots */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30 flex gap-1">
        {shuffled.slice(Math.max(0, currentIndex - 2), currentIndex + 5).map((c, i) => (
          <div
            key={c.id}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === Math.min(currentIndex, 2) ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* Feed container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-scroll snap-y-mandatory no-scrollbar"
      >
        {shuffled.map((career, index) => {
          const saved = savedCareers.includes(career.id);
          const family = getCareerFamilyById(career.familyId);
          const gradient = familyGradients[career.familyId] || "from-primary/20 via-background to-background";
          const matchScore = matchedCareers.find((m) => m.careerId === career.id)?.score || getMatchScore(career.id);

          return (
            <div key={career.id} className="feed-card snap-start">
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-b ${gradient}`} />

              {/* Large emoji background */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] opacity-10 pointer-events-none select-none">
                {family?.emoji || "💼"}
              </div>

              {/* Content overlay */}
              <div className="relative z-10 p-5 pb-24 space-y-4">
                {/* Career identity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    {career.growthTag && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        career.growthTag.includes("Emerging")
                          ? "bg-accent/20 text-accent"
                          : "bg-primary/20 text-primary"
                      }`}>
                        {career.growthTag}
                      </span>
                    )}
                    <span className="fact-pill">
                      <DollarSign size={12} /> {career.salaryRange}
                    </span>
                    <span className="fact-pill border-primary/30 text-primary font-bold">
                      <Star size={10} className="fill-primary" /> {matchScore}% Match
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                    <span>{family?.emoji || "💼"}</span>
                    {career.title}
                  </h2>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {career.description}
                  </p>
                </motion.div>

                {/* Family tag */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  {family && (
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-muted/50 text-muted-foreground">
                      {family.emoji} {family.name}
                    </span>
                  )}
                </motion.div>

                {/* Search terms as quick tags */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-wrap gap-1.5"
                >
                  {career.searchTerms.slice(0, 4).map((tag) => (
                    <span key={tag} className="fact-pill capitalize">{tag}</span>
                  ))}
                </motion.div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/career/${career.id}`)}
                    className="flex-1 btn-primary-glow flex items-center justify-center gap-2 text-sm py-3"
                  >
                    Explore this path <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => toggleSavedCareer(career.id)}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      saved ? "bg-accent/20 neon-border-accent" : "glass-card"
                    }`}
                  >
                    <Heart size={22} className={saved ? "fill-accent text-accent" : "text-muted-foreground"} />
                  </button>
                </div>
              </div>

              {/* Swipe hint */}
              {index === 0 && showHint && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
                >
                  <ChevronUp size={20} className="swipe-hint" />
                  <span className="text-xs text-muted-foreground">Swipe up to explore more</span>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Side action bar (TikTok style) */}
      <div className="fixed right-4 bottom-32 z-20 flex flex-col gap-4 items-center">
        <button
          onClick={() => toggleSavedCareer(shuffled[currentIndex]?.id)}
          className="flex flex-col items-center gap-0.5"
        >
          <div className="w-11 h-11 rounded-full glass-heavy flex items-center justify-center">
            <Heart
              size={22}
              className={
                savedCareers.includes(shuffled[currentIndex]?.id)
                  ? "fill-accent text-accent"
                  : "text-foreground"
              }
            />
          </div>
          <span className="text-[10px] text-muted-foreground">{savedCareers.length}</span>
        </button>
      </div>
    </div>
  );
}
