import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { useCareers } from "@/contexts/CareersContext";
import { generateFeedForCareers, FeedPost } from "@/data/feedContent";
import { ArrowRight, Play, ExternalLink } from "lucide-react";

export default function CareerFeed() {
  const navigate = useNavigate();
  const { matchedCareers, rejectedCareers, profile, selectedCareerPath } = useApp();
  const { getCareerById } = useCareers();

  const activeCareers = matchedCareers.filter(
    (m) => !rejectedCareers.includes(m.careerId)
  );

  const studentName = profile?.name || "Explorer";

  const posts = useMemo(
    () => generateFeedForCareers(activeCareers, studentName, getCareerById),
    [activeCareers, studentName, getCareerById]
  );

  if (activeCareers.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 pb-28">
        <div className="text-center space-y-4">
          <span className="text-6xl">🎯</span>
          <h2 className="text-xl font-bold text-foreground">Take the Assessment First!</h2>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Your feed is built around your matched careers. Complete the assessment to unlock personalized content.
          </p>
          <button onClick={() => navigate("/assessment")} className="btn-primary-glow text-sm">
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="px-5 pt-16 pb-4 space-y-3">
        <h1 className="text-xl font-bold text-foreground">Your Career Feed</h1>
        <p className="text-xs text-muted-foreground">
          Content picked just for you, {studentName} — across your top {activeCareers.length} paths
        </p>

        {/* Career pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {activeCareers.map((m) => {
            const isActive = m.careerId === selectedCareerPath;
            return (
              <span
                key={m.careerId}
                className={`text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? "gradient-bg text-primary-foreground"
                    : "glass-card text-foreground"
                }`}
              >
                {m.careerId.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")} · {m.score}% fit
              </span>
            );
          })}
        </div>
      </div>

      {/* Feed */}
      <div className="px-5 space-y-5">
        {posts.map((post, i) => (
          <FeedCard key={post.id} post={post} index={i} onExplore={() => navigate(`/career/${post.careerId}`)} />
        ))}
      </div>
    </div>
  );
}

function FeedCard({ post, index, onExplore }: { post: FeedPost; index: number; onExplore: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.3) }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.headline}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm text-foreground">
            {post.typeEmoji} {post.typeLabel}
          </span>
        </div>

        {/* Career pill */}
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full gradient-bg text-primary-foreground">
            {post.careerEmoji} {post.careerTitle} · Your Path
          </span>
        </div>

        {/* Video play button */}
        {post.videoUrl && (
          <a
            href={post.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <Play size={18} className="text-foreground ml-0.5" />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-bold text-foreground leading-snug">{post.headline}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{post.body}</p>

        {post.type === "mission-nudge" ? (
          <button
            onClick={() => window.location.href = "/quests"}
            className="w-full btn-primary-glow flex items-center justify-center gap-2 text-xs py-2.5"
          >
            Do it → <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={onExplore}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary"
          >
            Learn more about {post.careerTitle} <ExternalLink size={12} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
