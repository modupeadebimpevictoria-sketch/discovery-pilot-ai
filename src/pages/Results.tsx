import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { useCareers } from "@/contexts/CareersContext";
import { computeRiasecFromAnswers } from "@/data/questions";
import { determineWorldAndCluster } from "@/data/worlds";
import { getClusterByFamilyId } from "@/data/clusters";
import { fireConfetti } from "@/lib/confetti";
import ShareModal from "@/components/ShareModal";
import PostAssessmentWalkthrough from "@/components/PostAssessmentWalkthrough";
import { ArrowRight, Share2, Check } from "lucide-react";

export default function Results() {
  const navigate = useNavigate();
  const {
    matchedCareers, assessmentAnswers, savedCareers,
    selectedCareerPath, setSelectedCareerPath, profile,
  } = useApp();
  const { getCareerById, getCareerListingById } = useCareers();

  const [phase, setPhase] = useState<"reveal" | "results" | "walkthrough">("reveal");
  const [walkthroughSeen] = useState(() => localStorage.getItem("sb_walkthrough_seen") === "true");
  const [shareOpen, setShareOpen] = useState(false);

  // Derive World & Cluster from assessment answers + matched careers
  const riasecScores = computeRiasecFromAnswers(assessmentAnswers);
  const matchedFamilyIds = matchedCareers.map((m) => {
    const listing = getCareerListingById(m.careerId);
    return listing?.familyId || "";
  }).filter(Boolean);

  const { world, cluster } = determineWorldAndCluster(riasecScores, matchedFamilyIds);

  useEffect(() => {
    if (phase === "reveal") {
      setTimeout(() => fireConfetti(), 500);
      setTimeout(() => setPhase("results"), 3500);
    }
  }, [phase]);

  if (!matchedCareers.length) {
    navigate("/");
    return null;
  }

  // Reveal animation
  if (phase === "reveal") {
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
            {world.emoji}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-2"
          >
            <p className="text-muted-foreground text-sm">{profile?.name}, your world is…</p>
            <h1 className="text-4xl font-bold gradient-text">{world.name}</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">{world.description}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="pt-2"
          >
            <p className="text-sm text-muted-foreground">
              Your career cluster: {cluster.emoji} <span className="font-semibold text-foreground">{cluster.name}</span>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            <span className="text-xs text-muted-foreground">Finding your starting points…</span>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Post-assessment walkthrough (runs once)
  if (phase === "walkthrough") {
    return (
      <PostAssessmentWalkthrough
        onComplete={() => {
          localStorage.setItem("sb_walkthrough_seen", "true");
          navigate("/feed");
        }}
      />
    );
  }

  // Final results view
  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Layer 1 — World & Cluster reveal */}
      <div className="px-5 pt-8 pb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-1" />
          <button onClick={() => setShareOpen(true)} className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
            <Share2 size={18} className="text-foreground" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-2xl text-center space-y-3"
        >
          <span className="text-6xl block">{world.emoji}</span>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">Your World</p>
            <h1 className="text-3xl font-bold gradient-text">{world.name}</h1>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            {world.description}
          </p>
          <div className="pt-1">
            <p className="text-sm text-muted-foreground">
              Your career cluster: {cluster.emoji}{" "}
              <span className="font-semibold text-foreground">{cluster.name}</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Layer 2 — 3 career starting points */}
      <div className="px-5 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Start your exploration here</h2>
          <p className="text-sm text-muted-foreground mt-0.5">based on your results</p>
        </div>

        {matchedCareers.slice(0, 3).map((match, i) => {
          const career = getCareerById(match.careerId);
          if (!career) return null;
          const listing = getCareerListingById(match.careerId);
          const careerCluster = listing?.familyId ? getClusterByFamilyId(listing.familyId) : null;
          const isActive = selectedCareerPath === career.id;

          return (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.12 }}
              className="glass-card-hover p-5 space-y-3"
            >
              <div className="flex items-start gap-3">
                <span className="text-4xl">{career.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-lg">{career.title}</h3>
                  {careerCluster && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {careerCluster.emoji} {careerCluster.name}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {career.description}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCareerPath(career.id)}
                  className={`flex-1 flex items-center justify-center gap-2 text-sm py-2.5 rounded-xl font-medium transition-all ${
                    isActive
                      ? "bg-[#a3e635] text-black"
                      : "btn-glass"
                  }`}
                >
                  {isActive ? (
                    <>
                      <Check size={16} /> Active Path
                    </>
                  ) : (
                    "Set as Active Path"
                  )}
                </button>
                <button
                  onClick={() => navigate(`/career/${career.id}`)}
                  className="px-4 py-2.5 rounded-xl glass-card flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Explore <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="px-5 mt-6 space-y-3">
        <button
          onClick={() => {
            if (walkthroughSeen) {
              navigate("/feed");
            } else {
              setPhase("walkthrough");
            }
          }}
          className="w-full btn-glass text-center flex items-center justify-center gap-2"
        >
          🔥 See Your Career Feed
        </button>
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        careerTitle={getCareerById(matchedCareers[0]?.careerId)?.title || ""}
        careerEmoji={getCareerById(matchedCareers[0]?.careerId)?.emoji || "🎯"}
        score={matchedCareers[0]?.score}
        archetype={world.name}
      />
    </div>
  );
}
