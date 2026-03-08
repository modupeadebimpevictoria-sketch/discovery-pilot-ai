import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { getCareerById, careers } from "@/data/careers";
import { archetypes } from "@/data/questions";
import {
  ChevronRight, Sparkles, Heart, Flame, Compass, Award,
  Target, Zap, Share2, TrendingUp
} from "lucide-react";
import { useState } from "react";
import ShareModal from "@/components/ShareModal";

const unknownCareers = [
  { id: "cybersecurity-analyst", title: "Ethical Hacker", emoji: "🔐", why: "Protect the digital world" },
  { id: "climate-scientist", title: "Climate Policy Analyst", emoji: "🌡️", why: "Shape global climate strategy" },
  { id: "ux-designer", title: "AI Prompt Engineer", emoji: "🤖", why: "Talk to AI for a living" },
  { id: "marine-biologist", title: "Deep Sea Explorer", emoji: "🐋", why: "Discover the unknown ocean" },
  { id: "biomedical-engineer", title: "Biomedical Innovator", emoji: "🫀", why: "3D print human organs" },
  { id: "urban-planner", title: "Smart City Designer", emoji: "🏙️", why: "Build the cities of tomorrow" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, matchedCareers, archetype, savedCareers, badges, completedMissions } = useApp();
  const [shareOpen, setShareOpen] = useState(false);

  const arch = archetypes[archetype];
  const topCareer = matchedCareers[0] ? getCareerById(matchedCareers[0].careerId) : null;

  // Level calculations
  const totalActions = savedCareers.length + completedMissions.length + badges.length + matchedCareers.length;
  const level = Math.min(10, Math.floor(totalActions / 3) + 1);
  const xp = (totalActions % 3) * 33;
  const levelTitles = ["Beginner", "Explorer", "Discoverer", "Pathfinder", "Navigator", "Trailblazer", "Pioneer", "Visionary", "Master", "Legend"];

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 max-w-xs">
          <span className="text-6xl">🧭</span>
          <h2 className="text-2xl font-bold gradient-text">Start Your Journey</h2>
          <p className="text-sm text-muted-foreground">Take the quiz to discover your career matches and unlock your dashboard.</p>
          <button onClick={() => navigate("/onboarding")} className="btn-primary-glow w-full flex items-center justify-center gap-2">
            <Sparkles size={18} /> Get Started
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Hero header */}
      <div className="px-5 pt-8 pb-2 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Welcome back</p>
            <h1 className="text-2xl font-bold text-foreground">{profile.name} 👋</h1>
          </div>
          <button onClick={() => setShareOpen(true)} className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
            <Share2 size={18} className="text-foreground" />
          </button>
        </div>

        {/* Level bar */}
        <div className="glass-card p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-sm font-bold text-primary-foreground">
                {level}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{levelTitles[level - 1]}</p>
                <p className="text-[10px] text-muted-foreground">Level {level} • {xp}% to next</p>
              </div>
            </div>
            {arch && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-lg">{arch.emoji}</span>
                <span className="text-xs font-bold text-primary">{arch.name}</span>
              </div>
            )}
          </div>
          <div className="level-bar">
            <motion.div
              className="level-bar-fill gradient-bg"
              initial={{ width: 0 }}
              animate={{ width: `${xp}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "🎯", value: matchedCareers.length, label: "Matches" },
            { icon: "❤️", value: savedCareers.length, label: "Saved" },
            { icon: "🏆", value: badges.length, label: "Badges" },
            { icon: "⚡", value: completedMissions.length, label: "Missions" },
          ].map((s) => (
            <div key={s.label} className="glass-card p-3 text-center rounded-2xl">
              <span className="text-lg">{s.icon}</span>
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Match */}
      {topCareer && (
        <div className="px-5 mb-4">
          <div className="glass-card p-5 neon-border rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">#1 Career Match</span>
            </div>
            <div className="flex items-center gap-4">
              <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-5xl">
                {topCareer.emoji}
              </motion.span>
              <div className="flex-1">
                <h3 className="font-bold text-foreground text-xl">{topCareer.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-primary">{matchedCareers[0].score}% match</span>
                  <span className="text-xs text-muted-foreground">• {topCareer.salaryRange.mid}</span>
                </div>
              </div>
            </div>
            <button onClick={() => navigate(`/career/${topCareer.id}`)} className="w-full btn-primary-glow flex items-center justify-center gap-2 text-sm">
              Explore This Career <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Saved Careers */}
      {savedCareers.length > 0 && (
        <div className="mb-4">
          <div className="px-5 flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Heart size={16} className="text-accent" /> Saved
            </h2>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-5">
            {savedCareers.map((id) => {
              const c = getCareerById(id);
              if (!c) return null;
              return (
                <button key={id} onClick={() => navigate(`/career/${c.id}`)} className="glass-card-hover p-3 min-w-[100px] text-center flex-shrink-0 space-y-1 rounded-2xl">
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
        <div className="px-5 mb-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 mb-3">
            <Award size={16} className="text-secondary" /> Badges
          </h2>
          <div className="flex gap-2 flex-wrap">
            {badges.map((b) => (
              <span key={b} className="px-4 py-2 rounded-full text-xs font-bold gradient-bg text-primary-foreground">🏆 {b}</span>
            ))}
          </div>
        </div>
      )}

      {/* Careers You Didn't Know Existed */}
      <div className="mb-4">
        <div className="px-5 mb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Zap size={16} className="text-glow-purple" /> Careers You Didn't Know Existed
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Surprising jobs that are blowing up right now 🔥</p>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-5">
          {unknownCareers.map((uc) => (
            <button
              key={uc.id}
              onClick={() => navigate(`/career/${uc.id}`)}
              className="glass-card-hover p-4 min-w-[140px] flex-shrink-0 space-y-2 rounded-2xl text-left"
            >
              <span className="text-3xl">{uc.emoji}</span>
              <p className="text-sm font-bold text-foreground">{uc.title}</p>
              <p className="text-[10px] text-muted-foreground">{uc.why}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Skill suggestions */}
      {topCareer && (
        <div className="px-5 mb-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-primary" /> Start Building Skills
          </h2>
          <div className="space-y-2">
            {topCareer.skills.slice(0, 3).map((skill) => (
              <div key={skill} className="glass-card p-3 flex items-center gap-3 rounded-2xl">
                <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-sm">⚡</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{skill}</p>
                  <p className="text-[10px] text-muted-foreground">Essential for {topCareer.title}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-5 space-y-2">
        <h2 className="text-base font-bold text-foreground mb-1">Quick Actions</h2>
        {[
          { icon: <Flame size={18} className="text-accent" />, label: "Career Feed", desc: "Swipe through careers", path: "/feed" },
          { icon: <Compass size={18} className="text-secondary" />, label: "Career Universe", desc: "Browse all careers", path: "/universe" },
          { icon: <Target size={18} className="text-primary" />, label: "Retake Quiz", desc: "Get new matches", path: "/assessment" },
        ].map((a) => (
          <button
            key={a.path}
            onClick={() => navigate(a.path)}
            className="glass-card-hover w-full p-4 flex items-center gap-3 rounded-2xl"
          >
            <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">{a.icon}</div>
            <div className="text-left flex-1">
              <p className="text-sm font-semibold text-foreground">{a.label}</p>
              <p className="text-[10px] text-muted-foreground">{a.desc}</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        careerTitle={topCareer?.title || "career"}
        careerEmoji={topCareer?.emoji || "🎯"}
        score={matchedCareers[0]?.score}
        archetype={arch?.name}
      />
    </div>
  );
}
