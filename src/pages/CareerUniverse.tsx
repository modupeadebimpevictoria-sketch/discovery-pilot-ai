import { useState, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  careerFamilies,
  careerListings,
  searchCareerListings,
  type CareerListing,
} from "@/data/careerFamilies";
import { useApp } from "@/contexts/AppContext";
import { Search, X, Bookmark, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import CareerCard from "@/components/explore/CareerCard";
import FilterSortSheet, { type SortOption } from "@/components/explore/FilterSortSheet";

function getMatchScore(careerId: string): number {
  let hash = 0;
  for (let i = 0; i < careerId.length; i++) {
    hash = ((hash << 5) - hash) + careerId.charCodeAt(i);
    hash |= 0;
  }
  return 55 + Math.abs(hash % 40);
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
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("match");
  const [growthFilter, setGrowthFilter] = useState("all");

  const filtered = useMemo(() => {
    let results = search ? searchCareerListings(search) : careerListings;

    if (familyFilter !== "all") {
      results = results.filter((l) => l.familyId === familyFilter);
    }

    // Hide rejected
    results = results.filter((l) => !rejectedCareers.includes(l.id));

    // Growth filter
    if (growthFilter === "high") {
      results = results.filter((l) => l.growthTag?.includes("High demand"));
    } else if (growthFilter === "emerging") {
      results = results.filter((l) => l.growthTag?.includes("Emerging"));
    }

    // Sort
    if (sortBy === "match") {
      results = [...results].sort((a, b) => getMatchScore(b.id) - getMatchScore(a.id));
    } else if (sortBy === "growth") {
      results = [...results].sort((a, b) => {
        const aGrowth = a.growthTag ? 1 : 0;
        const bGrowth = b.growthTag ? 1 : 0;
        return bGrowth - aGrowth;
      });
    } else if (sortBy === "alpha") {
      results = [...results].sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
  }, [search, familyFilter, rejectedCareers, sortBy, growthFilter]);

  const handleSaveSearch = (query: string) => {
    if (query && !savedSearches.includes(query)) {
      setSavedSearches((prev) => [...prev, query]);
      toast.success(`"${query}" saved! We'll add it soon 🚀`);
    }
  };

  const handleFamilySelect = (id: string) => {
    setFamilyFilter(id);
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

        {/* Family filter pills */}
        <div
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
                  ? "bg-primary text-primary-foreground shadow-sm"
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
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
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

      {/* Career grid — 2 col mobile, 3 col desktop */}
      <div className="px-4 pt-1 grid grid-cols-2 md:grid-cols-3 gap-3">
        {filtered.map((career, i) => {
          const saved = savedCareers.includes(career.id);
          const matchScore = matchedCareers.find((m) => m.careerId === career.id)?.score || getMatchScore(career.id);

          return (
            <CareerCard
              key={career.id}
              career={career}
              matchScore={matchScore}
              saved={saved}
              onToggleSave={() => toggleSavedCareer(career.id)}
              onClick={() => navigate(`/career/${career.id}`)}
              index={i}
            />
          );
        })}
      </div>

      {/* No results */}
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

      {/* Floating filter/sort button */}
      <button
        onClick={() => setSheetOpen(true)}
        className="fixed bottom-24 right-4 z-20 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center active:scale-95 transition-transform"
      >
        <SlidersHorizontal size={20} />
      </button>

      <FilterSortSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        sortBy={sortBy}
        onSortChange={setSortBy}
        salaryMin={0}
        onSalaryMinChange={() => {}}
        growthFilter={growthFilter}
        onGrowthFilterChange={setGrowthFilter}
      />
    </div>
  );
}
