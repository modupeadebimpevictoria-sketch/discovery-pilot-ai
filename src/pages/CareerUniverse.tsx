import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  careerFamilies,
  careerListings,
  getListingsByFamily,
  searchCareerListings,
  getCareerFamilyById,
  type CareerFamily,
  type CareerListing,
} from "@/data/careerFamilies";
import { useApp } from "@/contexts/AppContext";
import { careers as detailedCareers } from "@/data/careers";
import {
  ArrowLeft, Search, Heart, SlidersHorizontal, X, ChevronRight,
  ArrowUpDown, Bookmark, Eye, EyeOff, Star
} from "lucide-react";
import { toast } from "sonner";

type SortOption = "match" | "growth" | "alpha";
type SalaryFilter = "all" | "under50" | "50to100" | "over100";
type GrowthFilter = "all" | "high-demand" | "emerging";

function getUnsplashUrl(keyword: string) {
  return `https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&fit=crop&q=80`;
}

// Generate a pseudo-random match score based on career id (deterministic)
function getMatchScore(careerId: string): number {
  let hash = 0;
  for (let i = 0; i < careerId.length; i++) {
    hash = ((hash << 5) - hash) + careerId.charCodeAt(i);
    hash |= 0;
  }
  return 55 + Math.abs(hash % 40); // 55-94
}

export default function CareerUniverse() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { savedCareers, toggleSavedCareer, rejectedCareers, matchedCareers } = useApp();

  const familyParam = searchParams.get("family");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("match");
  const [salaryFilter, setSalaryFilter] = useState<SalaryFilter>("all");
  const [growthFilter, setGrowthFilter] = useState<GrowthFilter>("all");
  const [familyFilter, setFamilyFilter] = useState<string>(familyParam || "all");
  const [showRejected, setShowRejected] = useState(false);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);

  const selectedFamily = familyFilter !== "all" ? getCareerFamilyById(familyFilter) : null;

  const filtered = useMemo(() => {
    let results = search ? searchCareerListings(search) : careerListings;

    // Family filter
    if (familyFilter !== "all") {
      results = results.filter((l) => l.familyId === familyFilter);
    }

    // Growth filter
    if (growthFilter === "high-demand") {
      results = results.filter((l) => l.growthTag?.includes("High demand"));
    } else if (growthFilter === "emerging") {
      results = results.filter((l) => l.growthTag?.includes("Emerging"));
    }

    // Salary filter
    if (salaryFilter !== "all") {
      results = results.filter((l) => {
        const match = l.salaryRange.match(/\$(\d+)k/);
        const low = match ? parseInt(match[1]) : 0;
        if (salaryFilter === "under50") return low < 50;
        if (salaryFilter === "50to100") return low >= 40 && low <= 100;
        if (salaryFilter === "over100") return low >= 80;
        return true;
      });
    }

    // Hide rejected unless toggled
    if (!showRejected) {
      results = results.filter((l) => !rejectedCareers.includes(l.id));
    }

    // Sort
    if (sortBy === "alpha") {
      results = [...results].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "growth") {
      results = [...results].sort((a, b) => {
        const score = (g?: string) => g?.includes("Emerging") ? 2 : g?.includes("High demand") ? 1 : 0;
        return score(b.growthTag) - score(a.growthTag);
      });
    } else {
      // match sort
      results = [...results].sort((a, b) => getMatchScore(b.id) - getMatchScore(a.id));
    }

    return results;
  }, [search, familyFilter, growthFilter, salaryFilter, sortBy, showRejected, rejectedCareers]);

  const handleCareerClick = (listing: CareerListing) => {
    // Check if detailed career exists
    const detailed = detailedCareers.find((c) => c.id === listing.id);
    if (detailed) {
      navigate(`/career/${listing.id}`);
    } else {
      navigate(`/career/${listing.id}`);
    }
  };

  const handleSaveSearch = (query: string) => {
    if (query && !savedSearches.includes(query)) {
      setSavedSearches((prev) => [...prev, query]);
      toast.success(`"${query}" saved! We'll add it soon 🚀`);
    }
  };

  const noResults = search.length > 0 && filtered.length === 0;

  // LAYER 1 — Family tiles view
  if (familyFilter === "all" && !search) {
    return (
      <div className="min-h-screen bg-background pb-28">
        <div className="sticky top-0 z-30 glass-heavy border-b border-glass-border/30 px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-muted/50">
              <ArrowLeft size={18} className="text-foreground" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold gradient-text">Career Universe 🌌</h1>
              <p className="text-[10px] text-muted-foreground">{careerListings.length} careers across {careerFamilies.length} families</p>
            </div>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search any career..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="px-4 pt-4 grid grid-cols-2 gap-3">
          {careerFamilies.map((family, i) => (
            <motion.button
              key={family.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => setFamilyFilter(family.id)}
              className="glass-card-hover p-4 rounded-2xl text-left space-y-2 relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${family.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <span className="text-3xl relative z-10">{family.emoji}</span>
              <h3 className="font-bold text-foreground text-sm leading-tight relative z-10">{family.name}</h3>
              <p className="text-[10px] text-muted-foreground leading-snug relative z-10">{family.description}</p>
              <div className="flex items-center gap-1 relative z-10">
                <span className="text-[9px] text-primary font-bold">{getListingsByFamily(family.id).length} careers</span>
                <ChevronRight size={10} className="text-primary" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // LAYER 2 — Career listings view (with search results)
  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="sticky top-0 z-30 glass-heavy border-b border-glass-border/30 px-4 py-3 space-y-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (search) { setSearch(""); }
              else { setFamilyFilter("all"); }
            }}
            className="p-2 rounded-xl bg-muted/50"
          >
            <ArrowLeft size={18} className="text-foreground" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-bold text-foreground truncate">
              {selectedFamily ? `${selectedFamily.emoji} ${selectedFamily.name}` : "Search Results"}
            </h1>
            <p className="text-[10px] text-muted-foreground">{filtered.length} careers</p>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="p-2 rounded-xl bg-muted/50 relative">
            <SlidersHorizontal size={16} className="text-foreground" />
            {(salaryFilter !== "all" || growthFilter !== "all") && (
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full" />
            )}
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search careers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Family chips */}
        {!search && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
            <button
              onClick={() => setFamilyFilter("all")}
              className="category-chip whitespace-nowrap flex-shrink-0 text-xs bg-muted/50 text-muted-foreground"
            >
              ← All Families
            </button>
          </div>
        )}

        {/* Filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-3 pt-2"
            >
              {/* Sort */}
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Sort by</p>
                <div className="flex gap-2">
                  {([
                    { key: "match", label: "Best Match", icon: "🎯" },
                    { key: "growth", label: "Highest Growth", icon: "📈" },
                    { key: "alpha", label: "A–Z", icon: "🔤" },
                  ] as const).map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setSortBy(s.key)}
                      className={`text-[10px] px-3 py-1.5 rounded-full font-bold transition-all ${
                        sortBy === s.key ? "gradient-bg text-primary-foreground" : "bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {s.icon} {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Growth filter */}
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Growth Outlook</p>
                <div className="flex gap-2">
                  {([
                    { key: "all", label: "All" },
                    { key: "high-demand", label: "📈 High Demand" },
                    { key: "emerging", label: "🚀 Emerging" },
                  ] as const).map((g) => (
                    <button
                      key={g.key}
                      onClick={() => setGrowthFilter(g.key)}
                      className={`text-[10px] px-3 py-1.5 rounded-full font-bold transition-all ${
                        growthFilter === g.key ? "gradient-bg text-primary-foreground" : "bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary filter */}
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Salary Range</p>
                <div className="flex gap-2">
                  {([
                    { key: "all", label: "All" },
                    { key: "under50", label: "Under $50k" },
                    { key: "50to100", label: "$50k–$100k" },
                    { key: "over100", label: "$100k+" },
                  ] as const).map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setSalaryFilter(s.key)}
                      className={`text-[10px] px-3 py-1.5 rounded-full font-bold transition-all ${
                        salaryFilter === s.key ? "gradient-bg text-primary-foreground" : "bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Show rejected toggle */}
              <button
                onClick={() => setShowRejected(!showRejected)}
                className="flex items-center gap-2 text-[10px] text-muted-foreground"
              >
                {showRejected ? <Eye size={12} /> : <EyeOff size={12} />}
                {showRejected ? "Hiding rejected paths" : "Show rejected paths"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Career listings */}
      <div className="px-4 pt-3 space-y-3">
        {filtered.map((career, i) => {
          const family = getCareerFamilyById(career.familyId);
          const saved = savedCareers.includes(career.id);
          const matchScore = matchedCareers.find((m) => m.careerId === career.id)?.score || getMatchScore(career.id);

          return (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.015, 0.3) }}
              className="glass-card-hover rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => handleCareerClick(career)}
                className="w-full text-left p-4 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-sm leading-tight">{career.title}</h3>
                    <p className="text-[11px] text-muted-foreground leading-snug mt-1">{career.description}</p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 flex-shrink-0">
                    <Star size={10} className="text-primary fill-primary" />
                    <span className="text-[10px] font-bold text-primary">{matchScore}%</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {family && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-muted/80 text-muted-foreground">
                      {family.emoji} {family.name}
                    </span>
                  )}
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
                    💰 {career.salaryRange}
                  </span>
                  {career.growthTag && (
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      career.growthTag.includes("Emerging")
                        ? "bg-accent/10 text-accent"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {career.growthTag}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-bold text-primary flex items-center gap-1">
                    Explore this path <ChevronRight size={12} />
                  </span>
                </div>
              </button>

              <div className="absolute top-3 right-3">
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSavedCareer(career.id); }}
                  className="p-1.5"
                >
                  <Heart size={14} className={saved ? "fill-accent text-accent" : "text-muted-foreground/40"} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* No results — save search prompt */}
      {noResults && (
        <div className="text-center py-16 px-6">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm text-muted-foreground mb-1">
            We don't have "<span className="font-bold text-foreground">{search}</span>" yet
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            We're adding this soon — save it and we'll let you know!
          </p>
          <button
            onClick={() => handleSaveSearch(search)}
            className="btn-primary-glow text-xs px-6 py-2.5 inline-flex items-center gap-2"
          >
            <Bookmark size={14} /> Save this career
          </button>
          {savedSearches.length > 0 && (
            <div className="mt-4 space-y-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Your saved searches</p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {savedSearches.map((s) => (
                  <span key={s} className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-bold">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {filtered.length > 0 && !noResults && (
        <div className="text-center py-6">
          <p className="text-[10px] text-muted-foreground">Showing {filtered.length} of {careerListings.length} careers</p>
        </div>
      )}
    </div>
  );
}
