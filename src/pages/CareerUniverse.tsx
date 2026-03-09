import { useState, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  careerFamilies,
  careerListings,
  searchCareerListings,
  getCareerFamilyById,
  type CareerListing,
} from "@/data/careerFamilies";
import { useApp } from "@/contexts/AppContext";
import { careers as detailedCareers } from "@/data/careers";
import {
  Search, Heart, X, ChevronRight, Bookmark, Star
} from "lucide-react";
import { toast } from "sonner";

// Generate a pseudo-random match score based on career id (deterministic)
function getMatchScore(careerId: string): number {
  let hash = 0;
  for (let i = 0; i < careerId.length; i++) {
    hash = ((hash << 5) - hash) + careerId.charCodeAt(i);
    hash |= 0;
  }
  return 55 + Math.abs(hash % 40); // 55-94
}

const familyPills = [
  { id: "all", emoji: "⭐", name: "All" },
  ...careerFamilies.map((f) => ({ id: f.id, emoji: f.emoji, name: f.name })),
];

export default function CareerUniverse() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { savedCareers, toggleSavedCareer, rejectedCareers, matchedCareers } = useApp();

  const familyParam = searchParams.get("family");
  const [search, setSearch] = useState("");
  const [familyFilter, setFamilyFilter] = useState<string>(familyParam || "all");
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const pillsRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let results = search ? searchCareerListings(search) : careerListings;

    if (familyFilter !== "all") {
      results = results.filter((l) => l.familyId === familyFilter);
    }

    // Hide rejected
    results = results.filter((l) => !rejectedCareers.includes(l.id));

    // Sort by match %
    results = [...results].sort((a, b) => getMatchScore(b.id) - getMatchScore(a.id));

    return results;
  }, [search, familyFilter, rejectedCareers]);

  const handleCareerClick = (listing: CareerListing) => {
    navigate(`/career/${listing.id}`);
  };

  const handleSaveSearch = (query: string) => {
    if (query && !savedSearches.includes(query)) {
      setSavedSearches((prev) => [...prev, query]);
      toast.success(`"${query}" saved! We'll add it soon 🚀`);
    }
  };

  const handleFamilySelect = (id: string) => {
    setFamilyFilter(id);
    // Scroll selected pill into view
    setTimeout(() => {
      const el = document.getElementById(`pill-${id}`);
      el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }, 50);
  };

  const noResults = search.length > 0 && filtered.length === 0;

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Sticky header: search + pills */}
      <div className="sticky top-[52px] z-30 bg-background/95 backdrop-blur-xl border-b border-border/40">
        {/* Search bar */}
        <div className="px-4 pt-3 pb-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search any career..."
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
        </div>

        {/* Family filter pills — single horizontal scrollable row */}
        <div
          ref={pillsRef}
          className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {familyPills.map((pill) => (
            <button
              key={pill.id}
              id={`pill-${pill.id}`}
              onClick={() => handleFamilySelect(pill.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                familyFilter === pill.id
                  ? "bg-[#AAED4E] text-[#1a1a2e] shadow-sm"
                  : "bg-transparent text-muted-foreground border border-border/60 hover:border-border"
              }`}
            >
              <span>{pill.emoji}</span>
              <span>{pill.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-[11px] text-muted-foreground">
          {filtered.length} career{filtered.length !== 1 ? "s" : ""}
          {familyFilter !== "all" && !search && (
            <> in <span className="font-semibold text-foreground">{familyPills.find(p => p.id === familyFilter)?.name}</span></>
          )}
          {search && (
            <> matching "<span className="font-semibold text-foreground">{search}</span>"</>
          )}
        </p>
      </div>

      {/* Career listings */}
      <div className="px-4 pt-1 space-y-3">
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
              className="relative glass-card-hover rounded-2xl overflow-hidden"
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
