import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { getCareerById } from "@/data/careers";
import { archetypes } from "@/data/questions";
import { ArrowRight, Heart, Sparkles } from "lucide-react";

export default function Results() {
  const navigate = useNavigate();
  const { matchedCareers, archetype, savedCareers, toggleSavedCareer, profile } = useApp();

  const arch = archetypes[archetype];

  if (!matchedCareers.length) {
    navigate("/");
    return null;
  }

  const colorClasses: Record<string, string> = {
    primary: "from-primary to-glow-secondary",
    secondary: "from-secondary to-glow-purple",
    accent: "from-accent to-destructive",
    purple: "from-glow-purple to-secondary",
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="px-4 pt-8 pb-6 text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="text-6xl"
        >
          {arch?.emoji || "🎯"}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-muted-foreground text-sm">{profile?.name}, you are...</p>
          <h1 className="text-3xl font-bold gradient-text">{arch?.name || "Unique"}</h1>
          <p className="text-muted-foreground mt-2 text-sm max-w-xs mx-auto">{arch?.description}</p>
        </motion.div>
      </div>

      {/* Career Matches */}
      <div className="px-4 space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Sparkles size={20} className="text-primary" /> Your Top Career Matches
        </h2>

        {matchedCareers.map((match, i) => {
          const career = getCareerById(match.careerId);
          if (!career) return null;
          const saved = savedCareers.includes(career.id);
          const gradient = colorClasses[career.color] || colorClasses.primary;

          return (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="glass-card-hover p-5 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl`}>
                    {career.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{career.title}</h3>
                    <span className="text-xs text-muted-foreground">{career.category}</span>
                  </div>
                </div>
                <button onClick={() => toggleSavedCareer(career.id)} className="p-2">
                  <Heart size={20} className={saved ? "fill-accent text-accent" : "text-muted-foreground"} />
                </button>
              </div>

              {/* Score bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Match</span>
                  <span className="text-primary font-bold">{match.score}%</span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${match.score}%` }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
                  />
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">{career.description}</p>

              <div className="flex flex-wrap gap-1">
                {career.personalityFit.slice(0, 3).map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">{t}</span>
                ))}
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  career.jobOutlook === "High Demand" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {career.jobOutlook}
                </span>
              </div>

              <button
                onClick={() => navigate(`/career/${career.id}`)}
                className="w-full btn-primary-glow flex items-center justify-center gap-2 text-sm"
              >
                Explore Career <ArrowRight size={16} />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="px-4 mt-8 space-y-3">
        <button onClick={() => navigate("/universe")} className="w-full btn-glass text-center">
          🌌 Browse All Careers
        </button>
        <button onClick={() => navigate("/dashboard")} className="w-full btn-glass text-center">
          📊 Go to Dashboard
        </button>
      </div>
    </div>
  );
}
