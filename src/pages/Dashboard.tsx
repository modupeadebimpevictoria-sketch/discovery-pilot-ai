import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { getCareerById } from "@/data/careers";
import { archetypes } from "@/data/questions";
import {
  Compass, Heart, Target, Award, ChevronRight, Sparkles, BookOpen
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, matchedCareers, archetype, savedCareers, badges, completedMissions } = useApp();

  const arch = archetypes[archetype];

  if (!profile) {
    navigate("/");
    return null;
  }

  const topCareer = matchedCareers[0] ? getCareerById(matchedCareers[0].careerId) : null;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-8 pb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <h1 className="text-2xl font-bold text-foreground">{profile.name} 👋</h1>
          </div>
          {arch && (
            <div className="glass-card px-3 py-2 rounded-xl text-center">
              <span className="text-2xl">{arch.emoji}</span>
              <p className="text-xs font-medium text-primary">{arch.name}</p>
            </div>
          )}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <Target size={18} className="text-primary" />, label: "Matches", value: matchedCareers.length },
            { icon: <Heart size={18} className="text-accent" />, label: "Saved", value: savedCareers.length },
            { icon: <Award size={18} className="text-secondary" />, label: "Badges", value: badges.length },
          ].map((s) => (
            <div key={s.label} className="glass-card p-3 text-center">
              <div className="flex justify-center mb-1">{s.icon}</div>
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Match */}
      {topCareer && (
        <div className="px-4 mb-4">
          <div className="glass-card p-5 neon-border space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Top Career Match</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{topCareer.emoji}</span>
              <div>
                <h3 className="font-bold text-foreground text-lg">{topCareer.title}</h3>
                <p className="text-sm text-muted-foreground">{matchedCareers[0].score}% match</p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/career/${topCareer.id}`)}
              className="w-full btn-primary-glow flex items-center justify-center gap-2 text-sm"
            >
              Explore This Career <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Saved Careers */}
      {savedCareers.length > 0 && (
        <div className="px-4 mb-4">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Heart size={18} className="text-accent" /> Saved Careers
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {savedCareers.map((id) => {
              const c = getCareerById(id);
              if (!c) return null;
              return (
                <button
                  key={id}
                  onClick={() => navigate(`/career/${c.id}`)}
                  className="glass-card p-3 min-w-[120px] text-center flex-shrink-0 space-y-1"
                >
                  <span className="text-3xl">{c.emoji}</span>
                  <p className="text-xs font-medium text-foreground">{c.title}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Badges */}
      {badges.length > 0 && (
        <div className="px-4 mb-4">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Award size={18} className="text-secondary" /> Your Badges
          </h2>
          <div className="flex gap-2 flex-wrap">
            {badges.map((b) => (
              <span key={b} className="px-4 py-2 rounded-full text-sm font-medium gradient-bg text-primary-foreground">
                🏆 {b}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-4 space-y-3">
        <h2 className="text-lg font-bold text-foreground">Quick Actions</h2>
        {[
          { icon: <Compass size={20} className="text-primary" />, label: "Browse Career Universe", path: "/universe", emoji: "🌌" },
          { icon: <Target size={20} className="text-secondary" />, label: "Retake Assessment", path: "/assessment", emoji: "🎯" },
          { icon: <BookOpen size={20} className="text-accent" />, label: "View All Results", path: "/results", emoji: "📊" },
        ].map((a) => (
          <button
            key={a.path}
            onClick={() => navigate(a.path)}
            className="glass-card-hover w-full p-4 flex items-center gap-3"
          >
            {a.icon}
            <span className="font-medium text-foreground flex-1 text-left">{a.label}</span>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Skill Suggestions */}
      {topCareer && (
        <div className="px-4 mt-6">
          <h2 className="text-lg font-bold text-foreground mb-3">🚀 Start Building Skills</h2>
          <div className="space-y-2">
            {topCareer.skills.slice(0, 4).map((skill) => (
              <div key={skill} className="glass-card p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-sm">⚡</div>
                <div>
                  <p className="text-sm font-medium text-foreground">Learn {skill}</p>
                  <p className="text-xs text-muted-foreground">Essential for {topCareer.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
