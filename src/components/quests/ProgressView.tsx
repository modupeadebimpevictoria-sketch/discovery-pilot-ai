import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Target, Flame, Zap, MapPin, Trophy, Briefcase, Calendar,
} from "lucide-react";

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

export default function ProgressView() {
  const {
    xp, completedMilestones, badges, appliedInternships, streak, user, profile,
  } = useApp();

  const [missionsCount, setMissionsCount] = useState(0);
  const [questsCount, setQuestsCount] = useState(0);
  const [skillsCount, setSkillsCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const fetchCounts = async () => {
      const [mRes, qRes, sRes] = await Promise.all([
        supabase.from("user_mission_progress").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("user_quest_progress").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "completed"),
        supabase.from("user_skill_progress").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      ]);
      setMissionsCount(mRes.count || 0);
      setQuestsCount(qRes.count || 0);
      setSkillsCount(sRes.count || 0);
    };
    fetchCounts();
  }, [user]);

  const level = getLevel(xp);
  const nextLevel = getNextLevel(xp);
  const levelProgress = nextLevel ? ((xp - level.min) / (nextLevel.min - level.min)) * 100 : 100;

  return (
    <div className="space-y-4">
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
          <motion.div className="progress-bar-fill" initial={{ width: 0 }} animate={{ width: `${Math.min(levelProgress, 100)}%` }} transition={{ duration: 1 }} />
        </div>
      </div>

      {/* Stats Grid — updated */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Missions done", value: missionsCount, icon: <Target size={14} className="text-secondary" /> },
          { label: "Quests done", value: questsCount, icon: <Flame size={14} className="text-glow-pink" /> },
          { label: "Skills practised", value: skillsCount, icon: <Zap size={14} className="text-primary" /> },
          { label: "Milestones hit", value: completedMilestones.length, icon: <MapPin size={14} className="text-glow-purple" /> },
          { label: "Badges earned", value: badges.length, icon: <Trophy size={14} className="text-primary" /> },
          { label: "Opps explored", value: appliedInternships.length, icon: <Briefcase size={14} className="text-glow-purple" /> },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-3 rounded-xl text-center space-y-1">
            <div className="flex justify-center">{stat.icon}</div>
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-[9px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Streak heatmap */}
      <div className="glass-card p-4 rounded-2xl space-y-2">
        <p className="text-xs font-bold text-foreground flex items-center gap-2">
          <Flame size={14} className="text-glow-pink" /> Activity Streak
        </p>
        <p className="text-[10px] text-muted-foreground mb-1">
          Any day you complete a mission, quest, skill prompt, or milestone counts
        </p>
        <div className="flex gap-1 flex-wrap">
          {Array.from({ length: 28 }).map((_, i) => {
            const active = i >= 28 - streak;
            return (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm ${active ? "bg-primary" : "bg-muted"}`}
              />
            );
          })}
        </div>
        <p className="text-[10px] text-muted-foreground">Last 4 weeks · {streak}🔥 streak</p>
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
  );
}
