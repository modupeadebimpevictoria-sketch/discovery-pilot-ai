import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { getQuestsForCareer, getCurrentWeekNumber, WeeklyQuest } from "@/data/weeklyQuests";
import { getCareerById } from "@/data/careers";
import { getCareerListingById } from "@/data/careerFamilies";
import { ChevronLeft, Clock, Zap, CheckCircle, Flame, Calendar, Lock } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Quests() {
  const navigate = useNavigate();
  const { selectedCareerPath, matchedCareers, completedQuests, completeQuest, addXp, addBadge, user } = useApp();
  const [expandedQuest, setExpandedQuest] = useState<string | null>(null);

  const careerId = selectedCareerPath || matchedCareers[0]?.careerId || null;
  const career = careerId ? (getCareerById(careerId) || (() => { const l = getCareerListingById(careerId); return l ? { id: l.id, title: l.title, emoji: "💼" } : null; })()) : null;
  const weekNumber = getCurrentWeekNumber();
  const thisWeekQuests = careerId ? getQuestsForCareer(careerId, weekNumber) : [];
  const allQuests = careerId ? getQuestsForCareer(careerId) : [];

  const completedThisWeek = thisWeekQuests.filter((q) => completedQuests.includes(q.id)).length;
  const streakWeeks = Math.floor(completedQuests.length / 3);

  const handleComplete = (quest: WeeklyQuest) => {
    if (completedQuests.includes(quest.id)) return;
    completeQuest(quest.id);
    addXp(quest.xpReward);
    toast.success(`+${quest.xpReward} XP! Quest completed! 🎉`);
    if (completedQuests.length + 1 >= 5) addBadge("Quest Champion");
    if (completedQuests.length + 1 >= 10) addBadge("Quest Master");
  };

  // No Active Path gate
  if (!careerId) {
    return (
      <div className="min-h-screen bg-background pb-28 flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 max-w-xs">
          <Lock size={48} className="text-muted-foreground mx-auto" />
          <h2 className="text-xl font-bold text-foreground">Set Your Active Path First</h2>
          <p className="text-sm text-muted-foreground">You need to explore a career and set it as your Active Path before you can start quests.</p>
          <button onClick={() => navigate("/universe")} className="btn-primary-glow w-full">
            Explore Careers
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
          <ChevronLeft size={18} /> Back
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl gradient-bg-warm flex items-center justify-center">
            <Flame size={24} className="text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Weekly Quests</h1>
            <p className="text-sm text-muted-foreground">
              Week {weekNumber} • {career?.title || "Career"} Path
            </p>
          </div>
        </div>

        {/* Weekly progress */}
        <div className="glass-card p-4 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              <span className="text-sm font-semibold text-foreground">This Week's Progress</span>
            </div>
            <span className="text-sm font-bold text-primary">{completedThisWeek}/{thisWeekQuests.length}</span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${thisWeekQuests.length > 0 ? (completedThisWeek / thisWeekQuests.length) * 100 : 0}%` }}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5">
              <Flame size={14} className="text-accent" />
              <span className="text-[10px] font-medium text-muted-foreground">{streakWeeks} week streak</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-primary" />
              <span className="text-[10px] font-medium text-muted-foreground">{completedQuests.length} total quests done</span>
            </div>
          </div>
        </div>
      </div>

      {/* This Week's Quests */}
      <div className="px-5 mb-6">
        <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <Flame size={16} className="text-accent" /> This Week's Quests
        </h2>
        <div className="space-y-3">
          {thisWeekQuests.map((quest, idx) => {
            const done = completedQuests.includes(quest.id);
            const expanded = expandedQuest === quest.id;
            return (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-card rounded-2xl overflow-hidden ${done ? "border-primary/30 bg-primary/5" : ""}`}
              >
                <button
                  onClick={() => setExpandedQuest(expanded ? null : quest.id)}
                  className="w-full p-4 flex items-start gap-3 text-left"
                >
                  <span className="text-2xl">{quest.emoji}</span>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${done ? "text-primary" : "text-foreground"}`}>{quest.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{quest.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock size={10} /> {quest.timeMinutes} min
                      </span>
                      <span className="text-[10px] font-bold text-primary">+{quest.xpReward} XP</span>
                      <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground">{quest.skillTag}</span>
                    </div>
                  </div>
                  {done && <CheckCircle size={20} className="text-primary mt-1" />}
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

        {thisWeekQuests.length === 0 && (
          <div className="glass-card p-6 rounded-2xl text-center">
            <span className="text-3xl">🎉</span>
            <p className="text-sm font-semibold text-foreground mt-2">No quests this week!</p>
            <p className="text-[10px] text-muted-foreground">Check back next week for new challenges</p>
          </div>
        )}
      </div>

      {/* All Available Quests */}
      <div className="px-5">
        <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
          <Zap size={16} className="text-secondary" /> All Career Quests
        </h2>
        <div className="space-y-2">
          {allQuests.filter((q) => !thisWeekQuests.find((tw) => tw.id === q.id)).map((quest) => {
            const done = completedQuests.includes(quest.id);
            return (
              <button
                key={quest.id}
                onClick={() => !done && handleComplete(quest)}
                className={`w-full glass-card p-3 rounded-xl flex items-center gap-3 text-left ${done ? "opacity-60" : ""}`}
              >
                <span className="text-xl">{quest.emoji}</span>
                <div className="flex-1">
                  <p className={`text-xs font-semibold ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>{quest.title}</p>
                  <span className="text-[10px] text-primary font-bold">+{quest.xpReward} XP</span>
                </div>
                {done && <CheckCircle size={16} className="text-primary" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
