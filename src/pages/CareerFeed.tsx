import { useRef, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { careers } from "@/data/careers";
import { careerImages, defaultCareerImage } from "@/data/careerImages";
import { useApp } from "@/contexts/AppContext";
import { Heart, ArrowRight, ChevronUp, Play, DollarSign, TrendingUp } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const shuffled = [...careers].sort(() => Math.random() - 0.5);

const demandClass: Record<string, string> = {
  "High Demand": "demand-high",
  Growing: "demand-growing",
  Emerging: "demand-emerging",
  Stable: "demand-stable",
};

export default function CareerFeed() {
  const navigate = useNavigate();
  const { savedCareers, toggleSavedCareer } = useApp();
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
    setCurrentIndex(Math.round(scrollTop / cardHeight));
  }, []);

  const getImages = (id: string) => careerImages[id] || defaultCareerImage;

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
          const images = getImages(career.id);

          return (
            <div key={career.id} className="feed-card snap-start relative">
              {/* Full-bleed hero photo */}
              <div className="absolute inset-0">
                <img
                  src={images.hero}
                  alt={`Young ${career.title} at work`}
                  className="w-full h-full object-cover"
                  loading={index < 3 ? "eager" : "lazy"}
                />
                {/* Gradient scrim for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
              </div>

              {/* Content overlay — pinned to bottom */}
              <div className="relative z-10 h-full flex flex-col justify-end p-5 pb-24 space-y-3">
                {/* Profile row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <Avatar className="h-11 w-11 border-2 border-primary/40">
                    <AvatarImage src={images.avatar} alt={career.title} />
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                      {career.title.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{career.title}</p>
                    <p className="text-xs text-muted-foreground">{career.category}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`${demandClass[career.jobOutlook] || "demand-stable"} text-[10px]`}>
                      {career.jobOutlook}
                    </span>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 }}
                  className="text-sm text-foreground/90 leading-relaxed line-clamp-2"
                >
                  {career.description}
                </motion.p>

                {/* Quick facts */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-wrap gap-1.5"
                >
                  <span className="fact-pill">
                    <DollarSign size={11} /> {career.salaryRange.mid}
                  </span>
                  <span className="fact-pill">
                    <TrendingUp size={11} /> {career.difficulty}
                  </span>
                  {career.skills.slice(0, 2).map((s) => (
                    <span key={s} className="fact-pill">{s}</span>
                  ))}
                </motion.div>

                {/* Day in the life */}
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  href={career.dayInLifeVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-2.5 flex items-center gap-3 rounded-2xl active:scale-[0.98] transition-transform"
                >
                  <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                    <Play size={16} className="text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">Day in the Life</p>
                    <p className="text-[11px] text-muted-foreground truncate">Watch what {career.title}s actually do</p>
                  </div>
                </motion.a>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/career/${career.id}`)}
                    className="flex-1 btn-primary-glow flex items-center justify-center gap-2 text-sm py-3"
                  >
                    Explore <ArrowRight size={16} />
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
                  className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
                >
                  <ChevronUp size={20} className="swipe-hint" />
                  <span className="text-xs text-muted-foreground">Swipe up to explore more</span>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Side action bar */}
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
