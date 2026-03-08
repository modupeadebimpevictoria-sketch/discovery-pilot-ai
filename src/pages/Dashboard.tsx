import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { getCareerById, careers } from "@/data/careers";
import { archetypes } from "@/data/questions";
import { missions } from "@/data/missions";
import { internships } from "@/data/internships";
import {
  ChevronRight, Sparkles, Heart, Flame, Compass, Award,
  Target, Zap, Share2, TrendingUp, Bot, Briefcase, CheckCircle
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ShareModal from "@/components/ShareModal";
import PathfinderChat from "@/components/PathfinderChat";

const unknownCareers = [
  { id: "cybersecurity-analyst", title: "Ethical Hacker", emoji: "🔐", why: "Protect the internet from bad guys" },
  { id: "climate-scientist", title: "Climate Hero", emoji: "🌡️", why: "Help save the planet" },
  { id: "ux-designer", title: "App Designer", emoji: "🤖", why: "Make apps people love to use" },
  { id: "marine-biologist", title: "Ocean Explorer", emoji: "🐋", why: "Discover secrets of the deep sea" },
  { id: "biomedical-engineer", title: "Body Engineer", emoji: "🫀", why: "Build tech that saves lives" },
  { id: "urban-planner", title: "City Builder", emoji: "🏙️", why: "Design the cities of tomorrow" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, matchedCareers, archetype, savedCareers, badges, completedMissions, xp, appliedInternships } = useApp();
  const [shareOpen, setShareOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const arch = archetypes[archetype];
  const topCareer = matchedCareers[0] ? getCareerById(matchedCareers[0].careerId) : null;

  // Level calculations
  const level = Math.min(10, Math.floor(xp / 100) + 1);
  const xpProgress = xp % 100;
  const levelTitles = ["Starter", "Explorer", "Discoverer", "Pathfinder", "Navigator", "Trailblazer", "Pioneer", "Visionary", "Master", "Legend"];

  const completedMissionData = missions.filter((m) => completedMissions.includes(m.id));
  const appliedInternshipData = internships.filter((i) => appliedInternships.includes(i.id));

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 max-w-xs">
          <span className="text-6xl">🧭</span>
          <h2 className="text-2xl font-bold gradient-text">Let's Find Your Future!</h2>
          <p className="text-sm text-muted-foreground">Take a quick quiz to discover careers that match who you are. It only takes 5 minutes!</p>
          <button onClick={() => navigate("/onboarding")} className="btn-primary-glow w-full flex items-center justify-center gap-2">
            <Sparkles size={18} /> Start the Quiz
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
            <h1 className="text-2xl font-bold text-foreground">Hey {profile.name}! 👋</h1>
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
                <p className="text-[10px] text-muted-foreground">Level {level} • {xp} XP total • {xpProgress}% to next level</p>
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
              animate={{ width: `${xpProgress}%` }}
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

      {/* AI Mentor Quick Access */}
      <div className="px-5 mb-4">
        <button
          onClick={() => setChatOpen(true)}
          className="w-full glass-card-hover p-4 rounded-2xl flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center">
            <Bot size={24} className="text-primary-foreground" />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm font-bold text-foreground">Ask Pathfinder AI 🧭</p>
            <p className="text-[10px] text-muted-foreground">Questions about careers, subjects, or your future? I'm here to help!</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* Top Match */}
      {topCareer && (
        <div className="px-5 mb-4">
          <div className="glass-card p-5 neon-border rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Your #1 Career Match</span>
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

      {/* Completed Missions */}
      {completedMissionData.length > 0 && (
        <div className="px-5 mb-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 mb-3">
            <CheckCircle size={16} className="text-primary" /> Missions Completed
          </h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {completedMissionData.map((m) => (
              <div key={m.id} className="glass-card p-3 min-w-[120px] text-center flex-shrink-0 space-y-1 rounded-2xl">
                <span className="text-2xl">{m.emoji}</span>
                <p className="text-xs font-medium text-foreground">{m.title}</p>
                <p className="text-[10px] text-primary font-bold">+{m.xpReward} XP</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Applied Internships */}
      {appliedInternshipData.length > 0 && (
        <div className="px-5 mb-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 mb-3">
            <Briefcase size={16} className="text-glow-purple" /> Internship Applications
          </h2>
          <div className="space-y-2">
            {appliedInternshipData.map((intern) => (
              <div key={intern.id} className="glass-card p-3 rounded-xl flex items-center gap-3">
                <span className="text-xl">{intern.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{intern.title}</p>
                  <p className="text-[10px] text-muted-foreground">{intern.company}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary">Applied ✓</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved Careers */}
      {savedCareers.length > 0 && (
        <div className="mb-4">
          <div className="px-5 flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Heart size={16} className="text-accent" /> Careers You Saved
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
            <Award size={16} className="text-secondary" /> Your Badges
          </h2>
          <div className="flex gap-2 flex-wrap">
            {badges.map((b) => (
              <span key={b} className="px-4 py-2 rounded-full text-xs font-bold gradient-bg text-primary-foreground">🏆 {b}</span>
            ))}
          </div>
        </div>
      )}

      {/* Skill Recommendations */}
      {topCareer && (
        <div className="px-5 mb-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-primary" /> Skills to Start Building
          </h2>
          <p className="text-xs text-muted-foreground mb-2">Things you can do now to get closer to becoming a {topCareer.title}:</p>
          <div className="space-y-2">
            {topCareer.skills.slice(0, 3).map((skill) => (
              <div key={skill} className="glass-card p-3 flex items-center gap-3 rounded-2xl">
                <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-sm">⚡</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{skill}</p>
                  <p className="text-[10px] text-muted-foreground">Important for {topCareer.title}s</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Careers You Didn't Know Existed */}
      <div className="mb-4">
        <div className="px-5 mb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Zap size={16} className="text-glow-purple" /> Jobs You Didn't Know Existed
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Cool careers that are growing fast right now 🔥</p>
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

      {/* Quick Actions */}
      <div className="px-5 space-y-2">
        <h2 className="text-base font-bold text-foreground mb-1">What do you want to do?</h2>
        {[
          { icon: <Flame size={18} className="text-accent" />, label: "Swipe Careers", desc: "TikTok-style career feed", path: "/feed" },
          { icon: <Compass size={18} className="text-secondary" />, label: "Browse All Careers", desc: "See all 30+ options", path: "/universe" },
          { icon: <Target size={18} className="text-primary" />, label: "Retake the Quiz", desc: "Get new career matches", path: "/assessment" },
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

      <AnimatePresence>
        {chatOpen && <PathfinderChat onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
