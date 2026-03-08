import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { careers, careerCategories, categoryEmojis, type CareerCategory } from "@/data/careers";
import { ArrowLeft, Search } from "lucide-react";

export default function CareerUniverse() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CareerCategory | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = careers.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const colorClasses: Record<string, string> = {
    primary: "from-primary to-glow-secondary",
    secondary: "from-secondary to-glow-purple",
    accent: "from-accent to-destructive",
    purple: "from-glow-purple to-secondary",
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 glass-card rounded-xl">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold gradient-text">Career Universe</h1>
            <p className="text-sm text-muted-foreground">{careers.length} careers to explore</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search careers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <button
            onClick={() => setActiveCategory("All")}
            className={`category-chip whitespace-nowrap flex-shrink-0 ${
              activeCategory === "All" ? "gradient-bg text-primary-foreground" : "glass-card text-muted-foreground"
            }`}
          >
            🌟 All
          </button>
          {careerCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-chip whitespace-nowrap flex-shrink-0 ${
                activeCategory === cat ? "gradient-bg text-primary-foreground" : "glass-card text-muted-foreground"
              }`}
            >
              {categoryEmojis[cat]} {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Career Grid */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {filtered.map((career, i) => {
          const gradient = colorClasses[career.color] || colorClasses.primary;
          return (
            <motion.button
              key={career.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => navigate(`/career/${career.id}`)}
              className="glass-card-hover p-4 text-left space-y-2"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-xl`}>
                {career.emoji}
              </div>
              <h3 className="font-bold text-foreground text-sm leading-tight">{career.title}</h3>
              <span className="text-xs text-muted-foreground">{career.category}</span>
              <div className="flex items-center gap-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  career.jobOutlook === "High Demand" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {career.jobOutlook}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-4xl mb-2">🔍</p>
          <p>No careers found. Try a different search!</p>
        </div>
      )}
    </div>
  );
}
