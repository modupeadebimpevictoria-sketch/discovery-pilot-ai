import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { careers, careerCategories, categoryEmojis, type CareerCategory } from "@/data/careers";
import { useApp } from "@/contexts/AppContext";
import { ArrowLeft, Search, Heart } from "lucide-react";

const demandClass: Record<string, string> = {
  "High Demand": "demand-high",
  Growing: "demand-growing",
  Emerging: "demand-emerging",
  Stable: "demand-stable",
};

const gradientMap: Record<string, string> = {
  primary: "from-primary to-glow-secondary",
  secondary: "from-secondary to-glow-purple",
  accent: "from-accent to-glow-pink",
  purple: "from-glow-purple to-secondary",
};

export default function CareerUniverse() {
  const navigate = useNavigate();
  const { savedCareers, toggleSavedCareer } = useApp();
  const [activeCategory, setActiveCategory] = useState<CareerCategory | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = careers.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="sticky top-0 z-30 glass-heavy border-b border-glass-border/30 px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-muted/50">
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold gradient-text">Career Universe 🌌</h1>
            <p className="text-[10px] text-muted-foreground">{filtered.length} careers to explore</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search careers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
          <button
            onClick={() => setActiveCategory("All")}
            className={`category-chip whitespace-nowrap flex-shrink-0 text-xs ${
              activeCategory === "All" ? "gradient-bg text-primary-foreground" : "bg-muted/50 text-muted-foreground"
            }`}
          >
            🌟 All
          </button>
          {careerCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-chip whitespace-nowrap flex-shrink-0 text-xs ${
                activeCategory === cat ? "gradient-bg text-primary-foreground" : "bg-muted/50 text-muted-foreground"
              }`}
            >
              {categoryEmojis[cat]} {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Career Grid */}
      <div className="px-4 pt-4 grid grid-cols-2 gap-3">
        {filtered.map((career, i) => {
          const gradient = gradientMap[career.color] || gradientMap.primary;
          const saved = savedCareers.includes(career.id);
          return (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              className="glass-card-hover p-4 text-left space-y-2 rounded-2xl relative"
            >
              <button
                onClick={(e) => { e.stopPropagation(); toggleSavedCareer(career.id); }}
                className="absolute top-3 right-3"
              >
                <Heart size={14} className={saved ? "fill-accent text-accent" : "text-muted-foreground/40"} />
              </button>
              <button onClick={() => navigate(`/career/${career.id}`)} className="w-full text-left space-y-2">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl`}>
                  {career.emoji}
                </div>
                <h3 className="font-bold text-foreground text-sm leading-tight">{career.title}</h3>
                <div className="flex flex-wrap gap-1">
                  <span className={`${demandClass[career.jobOutlook] || "demand-stable"} text-[9px] px-1.5 py-0.5`}>
                    {career.jobOutlook}
                  </span>
                  <span className="text-[9px] text-muted-foreground">{career.salaryRange.mid}</span>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-4xl mb-2">🔍</p>
          <p className="text-sm">No careers found. Try a different search!</p>
        </div>
      )}
    </div>
  );
}
