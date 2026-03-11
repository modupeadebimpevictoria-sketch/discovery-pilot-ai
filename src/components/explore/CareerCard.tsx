import { Heart, Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { CareerListing } from "@/data/careerFamilies";
import { getCareerFamilyById } from "@/data/careerFamilies";

// Deterministic Unsplash photo for a career
function getCareerPhoto(careerId: string): string {
  const keywords = encodeURIComponent(careerId.replace(/-/g, " ") + " professional african");
  // Use picsum with a hash seed for deterministic photos
  let hash = 0;
  for (let i = 0; i < careerId.length; i++) {
    hash = ((hash << 5) - hash) + careerId.charCodeAt(i);
    hash |= 0;
  }
  const seed = Math.abs(hash % 1000);
  return `https://picsum.photos/seed/${seed}/400/300`;
}

function getMatchScore(careerId: string): number {
  let hash = 0;
  for (let i = 0; i < careerId.length; i++) {
    hash = ((hash << 5) - hash) + careerId.charCodeAt(i);
    hash |= 0;
  }
  return 55 + Math.abs(hash % 40);
}

interface CareerCardProps {
  career: CareerListing;
  matchScore?: number;
  saved: boolean;
  onToggleSave: () => void;
  onClick: () => void;
  index: number;
}

export default function CareerCard({ career, matchScore, saved, onToggleSave, onClick, index }: CareerCardProps) {
  const family = getCareerFamilyById(career.familyId);
  const score = matchScore ?? getMatchScore(career.id);
  const photoUrl = getCareerPhoto(career.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.3) }}
      className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm"
    >
      {/* Photo */}
      <button onClick={onClick} className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={photoUrl}
          alt={career.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />

        {/* Match badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
          <Star size={9} className="fill-current" />
          <span className="text-[10px] font-bold">{score}%</span>
        </div>

        {/* Save button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
          className="absolute top-2 left-2 p-1.5 rounded-full bg-background/60 backdrop-blur-sm"
        >
          <Heart size={12} className={saved ? "fill-accent text-accent" : "text-foreground/70"} />
        </button>
      </button>

      {/* Info */}
      <button onClick={onClick} className="w-full text-left p-3 space-y-1.5">
        <h3 className="font-bold text-foreground text-sm leading-tight line-clamp-1">{career.title}</h3>
        <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">{career.description}</p>

        <div className="flex flex-wrap gap-1">
          {family && (
            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-muted/80 text-muted-foreground">
              {family.emoji} {family.name}
            </span>
          )}
          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
            💰 {career.salaryRange}
          </span>
        </div>

        {career.growthTag && (
          <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
            career.growthTag.includes("Emerging")
              ? "bg-accent/10 text-accent"
              : "bg-primary/10 text-primary"
          }`}>
            {career.growthTag}
          </span>
        )}

        <div className="pt-1">
          <span className="text-[10px] font-bold text-primary flex items-center gap-0.5">
            Explore this path <ChevronRight size={11} />
          </span>
        </div>
      </button>
    </motion.div>
  );
}
