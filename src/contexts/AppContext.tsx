import React, { createContext, useContext, useState, ReactNode } from "react";

export interface StudentProfile {
  name: string;
  age: number;
  grade: string;
  country: string;
  subjects: string[];
  dreamCareer: string;
  interests: string[];
}

export interface JournalEntry {
  id: string;
  careerId: string;
  text: string;
  date: string;
}

export interface SavedResource {
  id: string;
  title: string;
  type: "article" | "video" | "profile";
  url?: string;
  careerId?: string;
}

interface AppState {
  profile: StudentProfile | null;
  setProfile: (p: StudentProfile) => void;
  assessmentAnswers: Record<number, string | number>;
  setAssessmentAnswers: (a: Record<number, string | number>) => void;
  matchedCareers: { careerId: string; score: number }[];
  setMatchedCareers: (c: { careerId: string; score: number }[]) => void;
  archetype: string;
  setArchetype: (a: string) => void;
  savedCareers: string[];
  toggleSavedCareer: (id: string) => void;
  completedMissions: string[];
  addCompletedMission: (id: string) => void;
  badges: string[];
  addBadge: (b: string) => void;
  xp: number;
  addXp: (amount: number) => void;
  appliedInternships: string[];
  applyToInternship: (id: string) => void;
  completedMilestones: string[];
  toggleMilestone: (id: string) => void;
  completedQuests: string[];
  completeQuest: (id: string) => void;
  skillXp: Record<string, number>;
  addSkillXp: (skillId: string, amount: number) => void;
  selectedCareerPath: string | null;
  setSelectedCareerPath: (id: string | null) => void;
  lastCheckInDate: string | null;
  setLastCheckInDate: (date: string) => void;
  // Dashboard additions
  rejectedCareers: string[];
  rejectCareer: (id: string) => void;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;
  savedResources: SavedResource[];
  addSavedResource: (r: SavedResource) => void;
  removeSavedResource: (id: string) => void;
  streak: number;
  incrementStreak: () => void;
  pulseCheck: string | null;
  setPulseCheck: (emoji: string | null) => void;
  pathwayStartDate: string | null;
  setPathwayStartDate: (date: string | null) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<number, string | number>>({});
  const [matchedCareers, setMatchedCareers] = useState<{ careerId: string; score: number }[]>([]);
  const [archetype, setArchetype] = useState("");
  const [savedCareers, setSavedCareers] = useState<string[]>([]);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [badges, setBadges] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [appliedInternships, setAppliedInternships] = useState<string[]>([]);
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [skillXp, setSkillXp] = useState<Record<string, number>>({});
  const [selectedCareerPath, setSelectedCareerPath] = useState<string | null>(null);
  const [lastCheckInDate, setLastCheckInDate] = useState<string | null>(null);
  // Dashboard additions
  const [rejectedCareers, setRejectedCareers] = useState<string[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [savedResources, setSavedResources] = useState<SavedResource[]>([]);
  const [streak, setStreak] = useState(0);
  const [pulseCheck, setPulseCheck] = useState<string | null>(null);
  const [pathwayStartDate, setPathwayStartDate] = useState<string | null>(null);

  const toggleSavedCareer = (id: string) => {
    setSavedCareers((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const addCompletedMission = (id: string) => {
    setCompletedMissions((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const addBadge = (b: string) => {
    setBadges((prev) => (prev.includes(b) ? prev : [...prev, b]));
  };

  const addXp = (amount: number) => {
    setXp((prev) => prev + amount);
  };

  const applyToInternship = (id: string) => {
    setAppliedInternships((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const toggleMilestone = (id: string) => {
    setCompletedMilestones((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const completeQuest = (id: string) => {
    setCompletedQuests((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const addSkillXp = (skillId: string, amount: number) => {
    setSkillXp((prev) => ({ ...prev, [skillId]: (prev[skillId] || 0) + amount }));
  };

  const rejectCareer = (id: string) => {
    setRejectedCareers((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const addJournalEntry = (entry: JournalEntry) => {
    setJournalEntries((prev) => [entry, ...prev]);
  };

  const addSavedResource = (r: SavedResource) => {
    setSavedResources((prev) => (prev.find((x) => x.id === r.id) ? prev : [r, ...prev]));
  };

  const removeSavedResource = (id: string) => {
    setSavedResources((prev) => prev.filter((r) => r.id !== id));
  };

  const incrementStreak = () => {
    setStreak((prev) => prev + 1);
  };

  return (
    <AppContext.Provider
      value={{
        profile, setProfile,
        assessmentAnswers, setAssessmentAnswers,
        matchedCareers, setMatchedCareers,
        archetype, setArchetype,
        savedCareers, toggleSavedCareer,
        completedMissions, addCompletedMission,
        badges, addBadge,
        xp, addXp,
        appliedInternships, applyToInternship,
        completedMilestones, toggleMilestone,
        completedQuests, completeQuest,
        skillXp, addSkillXp,
        selectedCareerPath, setSelectedCareerPath,
        lastCheckInDate, setLastCheckInDate,
        rejectedCareers, rejectCareer,
        journalEntries, addJournalEntry,
        savedResources, addSavedResource, removeSavedResource,
        streak, incrementStreak,
        pulseCheck, setPulseCheck,
        pathwayStartDate, setPathwayStartDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
