import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { getCareerById } from "@/data/careers";
import { archetypes } from "@/data/questions";
import { getQuestsForCareer, getCurrentWeekNumber } from "@/data/weeklyQuests";
import { Share2, Sparkles, Bot, ChevronRight, LogOut } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ShareModal from "@/components/ShareModal";
import OrbitChat from "@/components/PathfinderChat";

// Dashboard sections
import StreakXpBar from "@/components/dashboard/StreakXpBar";
import ActivePathwayCard from "@/components/dashboard/ActivePathwayCard";
import MatchedPathwaysQueue from "@/components/dashboard/MatchedPathwaysQueue";
import CareerPassportPreview from "@/components/dashboard/CareerPassportPreview";
import QuestProgress from "@/components/dashboard/QuestProgress";
import DailyNudge from "@/components/dashboard/DailyNudge";
import PeopleLikeYou from "@/components/dashboard/PeopleLikeYou";
import MentorSpotlight from "@/components/dashboard/MentorSpotlight";
import SavedResourcesList from "@/components/dashboard/SavedResourcesList";
import JournalSection from "@/components/dashboard/JournalSection";
import PathwayPulseCheck from "@/components/dashboard/PathwayPulseCheck";

const levelTitles = ["Starter", "Explorer", "Discoverer", "Orbiter", "Navigator", "Trailblazer", "Pioneer", "Visionary", "Master", "Legend"];

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    user, signOut, profile, matchedCareers, archetype, badges,
    completedMissions, xp, completedMilestones,
    completedQuests, selectedCareerPath, setSelectedCareerPath,
    rejectedCareers, rejectCareer,
    journalEntries, addJournalEntry,
    savedResources, removeSavedResource,
    savedCareers, appliedInternships,
    streak, pulseCheck, setPulseCheck,
    pathwayStartDate,
  } = useApp();
  const [shareOpen, setShareOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const arch = archetypes[archetype];

  // Active pathway — first matched career or selected one
  const activePathwayId = selectedCareerPath || matchedCareers[0]?.careerId || null;
  const activeCareeer = activePathwayId ? getCareerById(activePathwayId) : null;
  const activeMatch = matchedCareers.find((m) => m.careerId === activePathwayId);

  const level = Math.min(10, Math.floor(xp / 100) + 1);
  const xpProgress = xp % 100;

  // Weekly quest progress for active pathway
  const weekNumber = getCurrentWeekNumber();
  const weekQuests = activeCareeer ? getQuestsForCareer(activeCareeer.id, weekNumber) : [];
  const allQuestsForCareer = activeCareeer ? getQuestsForCareer(activeCareeer.id) : [];

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 max-w-xs">
          <span className="text-6xl">🔐</span>
          <h2 className="text-2xl font-bold gradient-text">Sign In to Continue</h2>
          <p className="text-sm text-muted-foreground">Create an account or sign in to save your progress and track your journey.</p>
          <button onClick={() => navigate("/auth")} className="btn-primary-glow w-full flex items-center justify-center gap-2">
            <Sparkles size={18} /> Sign In / Sign Up
          </button>
        </motion.div>
      </div>
    );
  }

  // No assessment yet
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
      {/* Header */}
      <div className="px-5 pt-8 pb-2 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Welcome back</p>
            <h1 className="text-2xl font-bold text-foreground">Hey {profile.name}! 👋</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShareOpen(true)} className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
              <Share2 size={18} className="text-foreground" />
            </button>
            <button onClick={signOut} className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
              <LogOut size={18} className="text-foreground" />
            </button>
          </div>
        </div>

        {/* 6. Streak & XP Bar */}
        <StreakXpBar
          streak={streak}
          xp={xp}
          level={level}
          levelTitle={levelTitles[level - 1]}
          xpProgress={xpProgress}
        />
      </div>

      <div className="px-5 space-y-5 mt-2">
        {/* 1. Active Career Pathway Card */}
        {activeCareeer && activeMatch && (
          <ActivePathwayCard
            career={activeCareeer}
            matchScore={activeMatch.score}
            questsCompleted={allQuestsForCareer.filter((q) => completedQuests.includes(q.id)).length}
            questsTotal={allQuestsForCareer.length}
            onContinue={() => navigate(`/career/${activeCareeer.id}`)}
          />
        )}

        {/* 2. Matched Pathways Queue */}
        <MatchedPathwaysQueue
          matchedCareers={matchedCareers}
          activePathwayId={activePathwayId}
          rejectedCareers={rejectedCareers}
          onReject={rejectCareer}
        />

        {/* 3. Career Passport Preview */}
        <CareerPassportPreview
          matchedCareers={matchedCareers}
          badges={badges}
          completedMilestones={completedMilestones}
        />

        {/* 4. Quest Progress */}
        <QuestProgress
          weekQuests={weekQuests}
          completedQuests={completedQuests}
        />

        {/* 5. Daily Nudge */}
        {activeCareeer && <DailyNudge career={activeCareeer} />}

        {/* 11. Pathway Pulse Check */}
        {activeCareeer && (
          <PathwayPulseCheck
            pathwayStartDate={pathwayStartDate}
            careerTitle={activeCareeer.title}
            currentPulse={pulseCheck}
            onPulse={setPulseCheck}
          />
        )}

        {/* 7. People Like You */}
        <PeopleLikeYou />

        {/* 8. Mentor Spotlight */}
        <MentorSpotlight />

        {/* 9. Saved Resources */}
        <SavedResourcesList
          resources={savedResources}
          onRemove={removeSavedResource}
        />

        {/* 10. Journal */}
        {activePathwayId && (
          <JournalSection
            entries={journalEntries}
            careerId={activePathwayId}
            onAdd={addJournalEntry}
          />
        )}

        {/* AI Mentor CTA */}
        <button
          onClick={() => setChatOpen(true)}
          className="w-full glass-card-hover p-4 rounded-2xl flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center">
            <Bot size={24} className="text-primary-foreground" />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm font-bold text-foreground">Ask SpringBoard AI 🏊</p>
            <p className="text-[10px] text-muted-foreground">Got career questions? Your AI coach is ready.</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        careerTitle={activeCareeer?.title || "career"}
        careerEmoji={activeCareeer?.emoji || "🎯"}
        score={activeMatch?.score}
        archetype={arch?.name}
      />

      <AnimatePresence>
        {chatOpen && <OrbitChat onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
