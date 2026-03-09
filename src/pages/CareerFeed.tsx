import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { careers } from "@/data/careers";
import { getCareerPhoto } from "@/data/careerPhotos";
import { useApp } from "@/contexts/AppContext";
import { Heart, ArrowRight, ChevronUp, Play, DollarSign, TrendingUp } from "lucide-react";

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
          const photos = getCareerPhoto(career.id, career.category);

          return (
            <div key={career.id} className="feed-card snap-start relative">
              {/* Hero photo background */}
              <div className="absolute inset-0">
                <img
                  src={photos.hero}
                  alt={`${career.title} professional at work`}
                  className="w-full h-full object-cover"
                  loading={index < 3 ? "eager" : "lazy"}
                />
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="relative z-10 h-full flex flex-col justify-end p-5 pb-24 space-y-4">
                {/* Profile avatar + career identity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {/* Avatar row */}
                  <div className="flex items-center gap-3">
                    <img
                      src={photos.avatar}
                      alt={`${career.title} professional`}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/40"
                    />
                    <div>
                      <p className="text-sm font-bold text-foreground">{career.title}</p>
                      <p className="text-[11px] text-muted-foreground">{career.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`${demandClass[career.jobOutlook] || "demand-stable"}`}>
                      {career.jobOutlook}
                    </span>
                    <span className="fact-pill">
                      <DollarSign size={12} /> {career.salaryRange.mid}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-foreground">
                    {career.title}
                  </h2>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {career.description}
                  </p>
                </motion.div>

                {/* Quick facts */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <h3 className="text-xs font-bold text-primary uppercase tracking-wider">Quick Facts</h3>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.slice(0, 3).map((s) => (
                      <span key={s} className="fact-pill">{s}</span>
                    ))}
                    <span className="fact-pill">
                      <TrendingUp size={12} /> {career.difficulty}
                    </span>
                  </div>
                </motion.div>

                {/* Day in the life video link */}
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  href={career.dayInLifeVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-3 flex items-center gap-3 rounded-2xl active:scale-[0.98] transition-transform"
                >
                  <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0">
                    <Play size={18} className="text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">Day in the Life</p>
                    <p className="text-xs text-muted-foreground truncate">Watch what {career.title}s actually do</p>
                  </div>
                </motion.a>

                {/* Action buttons */}
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
                  className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20"
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
