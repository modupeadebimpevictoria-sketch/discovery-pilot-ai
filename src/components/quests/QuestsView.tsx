import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { getQuestsForCareer, getCurrentWeekNumber, WeeklyQuest } from "@/data/weeklyQuests";
import { getCareerById } from "@/data/careers";
import { getCareerListingById, getCareerFamilyById, careerFamilies } from "@/data/careerFamilies";
import {
  Clock, Zap, CheckCircle, Flame, Lock, ChevronRight,
  Trophy, MapPin, Briefcase, Target, Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

// XP Levels
const XP_LEVELS = [
  { name: "Curious", min: 0, max: 199, emoji: "🔍" },
  { name: "Explorer", min: 200, max: 599, emoji: "🧭" },
  { name: "Trailblazer", min: 600, max: 1199, emoji: "🔥" },
  { name: "Achiever", min: 1200, max: 2499, emoji: "⭐" },
  { name: "Springboarder", min: 2500, max: Infinity, emoji: "🚀" },
];

function getLevel(xp: number) {
  return XP_LEVELS.find((l) => xp >= l.min && xp <= l.max) || XP_LEVELS[0];
}

function getNextLevel(xp: number) {
  const idx = XP_LEVELS.findIndex((l) => xp >= l.min && xp <= l.max);
  return idx < XP_LEVELS.length - 1 ? XP_LEVELS[idx + 1] : null;
}

export default function QuestsView() {
  const navigate = useNavigate();
  const {
    selectedCareerPath, matchedCareers, completedQuests, completeQuest,
    addXp, addBadge, xp, completedMilestones, badges, completedMissions,
    appliedInternships, streak, profile,
  } = useApp();
  const [expandedQuest, setExpandedQuest] = useState<string | null>(null);

  const careerId = selectedCareerPath || matchedCareers[0]?.careerId || null;

  // No Active Path gate
  if (!careerId) {
    return (
      <div className="flex items-center justify-center px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 max-w-xs">
          <Lock size={48} className="text-muted-foreground mx-auto" />
          <h2 className="text-xl font-bold text-foreground">Set Your Active Path First</h2>
          <p className="text-sm text-muted-foreground">Set a career as your Active Path to begin quests and challenges.</p>
          <button onClick={() => navigate("/universe")} className="btn-primary-glow w-full">Explore Careers</button>
        </motion.div>
      </div>
    );
  }

  const career = getCareerById(careerId) || (() => {
    const l = getCareerListingById(careerId);
    return l ? { id: l.id, title: l.title, emoji: "💼" } : null;
  })();

  const listing = getCareerListingById(careerId);
  const family = listing ? getCareerFamilyById(listing.familyId) : null;

  const weekNumber = getCurrentWeekNumber();
  const thisWeekQuests = getQuestsForCareer(careerId, weekNumber);
  const allQuests = getQuestsForCareer(careerId);
  const completedThisWeek = thisWeekQuests.filter((q) => completedQuests.includes(q.id)).length;

  const level = getLevel(xp);
  const nextLevel = getNextLevel(xp);
  const levelProgress = nextLevel ? ((xp - level.min) / (nextLevel.min - level.min)) * 100 : 100;

  const handleComplete = (quest: WeeklyQuest) => {
    if (completedQuests.includes(quest.id)) return;
    completeQuest(quest.id);
    addXp(quest.xpReward);
    toast.success(`+${quest.xpReward} XP! Quest completed! 🎉`);
    if (completedQuests.length + 1 >= 5) addBadge("Quest Champion");
    if (completedQuests.length + 1 >= 10) addBadge("Quest Master");
  };

  return (
    <div className="space-y-6">
      {/* This Week's Quests */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Flame size={16} className="text-glow-pink" /> This Week's Quests
          </h2>
          <span className="text-[10px] font-bold text-primary">{completedThisWeek}/{thisWeekQuests.length} done</span>
        </div>

        {thisWeekQuests.length > 0 ? (
          <div className="space-y-3">
            {thisWeekQuests.map((quest, idx) => {
              const done = completedQuests.includes(quest.id);
              const expanded = expandedQuest === quest.id;
              return (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className={`glass-card rounded-2xl overflow-hidden ${done ? "border-primary/30 bg-primary/5" : ""}`}
                >
                  {/* Quest card header area with gradient accent */}
                  <div className={`h-1.5 w-full ${done ? "gradient-bg" : "bg-muted"}`} />

                  <button
                    onClick={() => setExpandedQuest(expanded ? null : quest.id)}
                    className="w-full p-4 flex items-start gap-3 text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-xl shrink-0">
                      {quest.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`text-sm font-bold ${done ? "text-primary" : "text-foreground"}`}>{quest.title}</p>
                        {!done && idx === 0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-glow-pink/15 text-glow-pink text-[9px] font-bold">New this week 🎯</span>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{quest.description}</p>
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        {family && (
                          <span className="px-2 py-0.5 rounded-full bg-glow-purple/15 text-glow-purple text-[9px] font-bold">
                            {family.emoji} {family.name}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-muted text-[9px] font-medium text-muted-foreground">{quest.skillTag}</span>
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock size={10} /> {quest.timeMinutes} min
                        </span>
                        <span className="text-[10px] font-bold text-primary">💎 {quest.xpReward} XP</span>
                      </div>
                    </div>
                    {done && <CheckCircle size={20} className="text-primary mt-1 shrink-0" />}
                  </button>

                  {expanded && !done && (
                    <div className="px-4 pb-4">
                      <button
                        onClick={() => handleComplete(quest)}
                        className="w-full btn-primary-glow text-sm flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={16} /> Mark as Complete
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card p-6 rounded-2xl text-center">
            <span className="text-3xl">🎉</span>
            <p className="text-sm font-semibold text-foreground mt-2">No quests this week!</p>
            <p className="text-[10px] text-muted-foreground">Check back next Monday for new challenges</p>
          </div>
        )}
      </div>

      {/* All Career Quests */}
      <div>
        <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Zap size={16} className="text-glow-purple" /> All {career?.title || "Career"} Quests
        </h2>
        <div className="space-y-2">
          {allQuests
            .filter((q) => !thisWeekQuests.find((tw) => tw.id === q.id))
            .map((quest) => {
              const done = completedQuests.includes(quest.id);
              return (
                <button
                  key={quest.id}
                  onClick={() => !done && handleComplete(quest)}
                  className={`w-full glass-card p-3 rounded-xl flex items-center gap-3 text-left ${done ? "opacity-50" : ""}`}
                >
                  <span className="text-lg">{quest.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>{quest.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-primary font-bold">💎 {quest.xpReward} XP</span>
                      <span className="text-[10px] text-muted-foreground">{quest.timeMinutes} min</span>
                    </div>
                  </div>
                  {done ? <CheckCircle size={16} className="text-primary shrink-0" /> : <ChevronRight size={14} className="text-muted-foreground shrink-0" />}
                </button>
              );
            })}
        </div>
      </div>

      {/* ═══ Progress Hub ═══ */}
      <div className="space-y-4 pt-2">
        <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Target size={16} className="text-primary" /> Progress Hub
        </h2>

        {/* XP Level Card */}
        <div className="glass-card p-4 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{level.emoji}</span>
              <div>
                <p className="text-sm font-bold text-foreground">Level {XP_LEVELS.indexOf(level) + 1} — {level.name}</p>
                <p className="text-[10px] text-muted-foreground">{xp} XP total</p>
              </div>
            </div>
            {nextLevel && (
              <span className="text-[10px] text-muted-foreground">{nextLevel.min - xp} XP to {nextLevel.name}</span>
            )}
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(levelProgress, 100)}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Quests", value: completedQuests.length, icon: <Flame size={14} className="text-glow-pink" /> },
            { label: "Milestones", value: completedMilestones.length, icon: <MapPin size={14} className="text-glow-purple" /> },
            { label: "Badges", value: badges.length, icon: <Trophy size={14} className="text-primary" /> },
            { label: "Missions", value: completedMissions.length, icon: <Target size={14} className="text-secondary" /> },
            { label: "Internships", value: appliedInternships.length, icon: <Briefcase size={14} className="text-glow-purple" /> },
            { label: "Streak", value: `${streak}🔥`, icon: <Calendar size={14} className="text-glow-pink" /> },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-3 rounded-xl text-center space-y-1">
              <div className="flex justify-center">{stat.icon}</div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[9px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Streak heatmap (simplified) */}
        <div className="glass-card p-4 rounded-2xl space-y-2">
          <p className="text-xs font-bold text-foreground flex items-center gap-2">
            <Flame size={14} className="text-glow-pink" /> Activity Streak
          </p>
          <div className="flex gap-1 flex-wrap">
            {Array.from({ length: 28 }).map((_, i) => {
              const active = i >= 28 - streak;
              return (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${
                    active ? "bg-primary" : "bg-muted"
                  }`}
                />
              );
            })}
          </div>
          <p className="text-[10px] text-muted-foreground">Last 4 weeks</p>
        </div>

        {/* People Like You */}
        {profile && (
          <div className="glass-card p-4 rounded-2xl space-y-3">
            <p className="text-xs font-bold text-foreground">🫂 People Like You</p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {[
                { name: "Amara", path: "UX Designer" },
                { name: "Kofi", path: "AI Engineer" },
                { name: "Zainab", path: "Film Director" },
              ].map((peer) => (
                <div key={peer.name} className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50 border border-glass-border">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                    {peer.name[0]}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-foreground">{peer.name}</p>
                    <p className="text-[8px] text-muted-foreground">{peer.path}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
