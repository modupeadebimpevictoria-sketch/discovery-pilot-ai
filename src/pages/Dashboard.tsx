import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { getCareerById } from "@/data/careers";
import { archetypes } from "@/data/questions";
import { missions } from "@/data/missions";
import { internships } from "@/data/internships";
import { getOrCreateRoadmap } from "@/data/roadmaps";
import { getQuestsForCareer, getCurrentWeekNumber } from "@/data/weeklyQuests";
import {
  ChevronRight, Sparkles, Heart, Flame, Compass, Award,
  Target, Zap, Share2, TrendingUp, Bot, Briefcase, CheckCircle,
  Map, GraduationCap, BookOpen, FileText
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ShareModal from "@/components/ShareModal";
import OrbitChat from "@/components/PathfinderChat";

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    profile, matchedCareers, archetype, savedCareers, badges,
    completedMissions, xp, appliedInternships, completedMilestones,
    completedQuests, selectedCareerPath, setSelectedCareerPath
  } = useApp();
  const [shareOpen, setShareOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const arch = archetypes[archetype];
  const topCareer = matchedCareers[0] ? getCareerById(matchedCareers[0].careerId) : null;

  // Set selected career path if not set
  const careerId = selectedCareerPath || matchedCareers[0]?.careerId;
  const career = careerId ? getCareerById(careerId) : null;

  const level = Math.min(10, Math.floor(xp / 100) + 1);
  const xpProgress = xp % 100;
  const levelTitles = ["Starter", "Explorer", "Discoverer", "Orbiter", "Navigator", "Trailblazer", "Pioneer", "Visionary", "Master", "Legend"];

  // Roadmap progress
  const roadmap = career ? getOrCreateRoadmap(career.id, career.title) : null;
  const roadmapProgress = roadmap
    ? Math.round((roadmap.milestones.filter((m) => completedMilestones.includes(m.id)).length / roadmap.milestones.length) * 100)
    : 0;

  // Weekly quest progress
  const weekNumber = getCurrentWeekNumber();
  const weekQuests = career ? getQuestsForCareer(career.id, weekNumber) : [];
  const weekQuestsDone = weekQuests.filter((q) => completedQuests.includes(q.id)).length;

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
                <p className="text-[10px] text-muted-foreground">Level {level} • {xp} XP total</p>
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
            <motion.div className="level-bar-fill gradient-bg" initial={{ width: 0 }} animate={{ width: `${xpProgress}%` }} transition={{ duration: 1, delay: 0.3 }} />
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "🎯", value: completedMilestones.length, label: "Milestones" },
            { icon: "🔥", value: completedQuests.length, label: "Quests" },
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

      {/* Career Roadmap Progress */}
      {career && roadmap && (
        <div className="px-5 mb-4">
          <button
            onClick={() => navigate(`/roadmap/${career.id}`)}
            className="w-full glass-card neon-border p-4 rounded-2xl text-left space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Map size={16} className="text-primary" />
                <span className="text-sm font-bold text-foreground">Your Career Roadmap</span>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{career.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Path to {career.title}</p>
                <p className="text-[10px] text-muted-foreground">
                  {roadmap.milestones.filter((m) => completedMilestones.includes(m.id)).length}/{roadmap.milestones.length} milestones
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{roadmapProgress}%</p>
              </div>
            </div>
            <div className="progress-bar">
              <motion.div className="progress-bar-fill" initial={{ width: 0 }} animate={{ width: `${roadmapProgress}%` }} transition={{ duration: 0.8 }} />
            </div>
          </button>
        </div>
      )}

      {/* Weekly Quests Preview */}
      <div className="px-5 mb-4">
        <button
          onClick={() => navigate("/quests")}
          className="w-full glass-card-hover p-4 rounded-2xl text-left"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-accent" />
              <span className="text-sm font-bold text-foreground">Weekly Quests</span>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-[10px] text-muted-foreground">
                {weekQuestsDone}/{weekQuests.length} completed this week
              </p>
              <div className="progress-bar mt-1.5">
                <div className="progress-bar-fill" style={{ width: `${weekQuests.length > 0 ? (weekQuestsDone / weekQuests.length) * 100 : 0}%` }} />
              </div>
            </div>
            {weekQuestsDone === weekQuests.length && weekQuests.length > 0 && (
              <span className="text-xs font-bold text-primary">All done! 🎉</span>
            )}
          </div>
        </button>
      </div>

      {/* AI Mentor */}
      <div className="px-5 mb-4">
        <button
          onClick={() => setChatOpen(true)}
          className="w-full glass-card-hover p-4 rounded-2xl flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center">
            <Bot size={24} className="text-primary-foreground" />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm font-bold text-foreground">Ask SpringBoard AI 🚀</p>
            <p className="text-[10px] text-muted-foreground">Questions about careers, subjects, or your future?</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* Quick Actions Grid */}
      <div className="px-5 mb-4">
        <h2 className="text-base font-bold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: <Map size={18} className="text-primary" />, label: "Roadmap", desc: "Your career path", path: career ? `/roadmap/${career.id}` : "/universe" },
            { icon: <GraduationCap size={18} className="text-secondary" />, label: "Opportunities", desc: "Scholarships & more", path: "/opportunities" },
            { icon: <FileText size={18} className="text-glow-purple" />, label: "Passport", desc: "Your portfolio", path: "/passport" },
            { icon: <Compass size={18} className="text-accent" />, label: "Explore", desc: "Browse careers", path: "/universe" },
          ].map((a) => (
            <button
              key={a.path + a.label}
              onClick={() => navigate(a.path)}
              className="glass-card-hover p-4 rounded-2xl text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center mb-2">{a.icon}</div>
              <p className="text-sm font-semibold text-foreground">{a.label}</p>
              <p className="text-[10px] text-muted-foreground">{a.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Top Match */}
      {topCareer && (
        <div className="px-5 mb-4">
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Your #1 Match</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{topCareer.emoji}</span>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{topCareer.title}</h3>
                <span className="text-sm font-bold text-primary">{matchedCareers[0].score}% match</span>
              </div>
              <button onClick={() => navigate(`/career/${topCareer.id}`)} className="px-3 py-1.5 rounded-xl gradient-bg text-xs font-bold text-primary-foreground">
                View
              </button>
            </div>
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
              <span key={b} className="px-3 py-1.5 rounded-full text-xs font-bold gradient-bg text-primary-foreground">🏆 {b}</span>
            ))}
          </div>
        </div>
      )}

      {/* More Actions */}
      <div className="px-5 space-y-2">
        {[
          { icon: <Flame size={18} className="text-accent" />, label: "Swipe Careers", desc: "TikTok-style feed", path: "/feed" },
          { icon: <Target size={18} className="text-primary" />, label: "Retake Quiz", desc: "Get new matches", path: "/assessment" },
        ].map((a) => (
          <button key={a.path} onClick={() => navigate(a.path)} className="glass-card-hover w-full p-4 flex items-center gap-3 rounded-2xl">
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
        {chatOpen && <OrbitChat onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
