import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

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
  user: User | null;
  authLoading: boolean;
  signOut: () => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profile, setProfileState] = useState<StudentProfile | null>(null);
  const [assessmentAnswers, setAssessmentAnswersState] = useState<Record<number, string | number>>({});
  const [matchedCareers, setMatchedCareersState] = useState<{ careerId: string; score: number }[]>([]);
  const [archetype, setArchetypeState] = useState("");
  const [savedCareers, setSavedCareers] = useState<string[]>([]);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);
  const [badges, setBadges] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [appliedInternships, setAppliedInternships] = useState<string[]>([]);
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [skillXp, setSkillXp] = useState<Record<string, number>>({});
  const [selectedCareerPath, setSelectedCareerPathState] = useState<string | null>(null);
  const [lastCheckInDate, setLastCheckInDateState] = useState<string | null>(null);
  const [rejectedCareers, setRejectedCareers] = useState<string[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [savedResources, setSavedResources] = useState<SavedResource[]>([]);
  const [streak, setStreak] = useState(0);
  const [pulseCheck, setPulseCheckState] = useState<string | null>(null);
  const [pathwayStartDate, setPathwayStartDateState] = useState<string | null>(null);
  const [dbLoaded, setDbLoaded] = useState(false);

  // Debounced save to database
  const saveProgressRef = React.useRef<ReturnType<typeof setTimeout>>();

  const saveProgress = useCallback(async () => {
    if (!user || !dbLoaded) return;

    const progressData = {
      xp,
      streak,
      badges,
      completed_missions: completedMissions,
      completed_quests: completedQuests,
      completed_milestones: completedMilestones,
      saved_careers: savedCareers,
      rejected_careers: rejectedCareers,
      applied_internships: appliedInternships,
      skill_xp: skillXp,
      selected_career_path: selectedCareerPath,
      last_check_in_date: lastCheckInDate,
      pathway_start_date: pathwayStartDate,
      pulse_check: pulseCheck,
      archetype,
      matched_careers: matchedCareers,
      assessment_answers: assessmentAnswers,
      journal_entries: journalEntries as unknown as Record<string, unknown>[],
      saved_resources: savedResources as unknown as Record<string, unknown>[],
      last_engaged_date: new Date().toISOString().split("T")[0],
      updated_at: new Date().toISOString(),
    };

    await supabase
      .from("user_progress")
      .update(progressData)
      .eq("user_id", user.id);
  }, [user, dbLoaded, xp, streak, badges, completedMissions, completedQuests, completedMilestones, savedCareers, rejectedCareers, appliedInternships, skillXp, selectedCareerPath, lastCheckInDate, pathwayStartDate, pulseCheck, archetype, matchedCareers, assessmentAnswers, journalEntries, savedResources]);

  // Auto-save progress on state change (debounced)
  useEffect(() => {
    if (!user || !dbLoaded) return;
    if (saveProgressRef.current) clearTimeout(saveProgressRef.current);
    saveProgressRef.current = setTimeout(() => {
      saveProgress();
    }, 1000);
    return () => {
      if (saveProgressRef.current) clearTimeout(saveProgressRef.current);
    };
  }, [saveProgress]);

  // Load user data from DB
  const loadUserData = useCallback(async (userId: string) => {
    try {
      // Load profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileData && profileData.name) {
        setProfileState({
          name: profileData.name,
          age: profileData.age || 15,
          grade: profileData.grade || "",
          country: profileData.country || "",
          subjects: profileData.subjects || [],
          dreamCareer: profileData.dream_career || "",
          interests: profileData.interests || [],
        });
      }

      // Load progress
      const { data: progress } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (progress) {
        setXp(progress.xp || 0);
        setStreak(progress.streak || 0);
        setBadges((progress.badges as string[]) || []);
        setCompletedMissions((progress.completed_missions as string[]) || []);
        setCompletedQuests((progress.completed_quests as string[]) || []);
        setCompletedMilestones((progress.completed_milestones as string[]) || []);
        setSavedCareers((progress.saved_careers as string[]) || []);
        setRejectedCareers((progress.rejected_careers as string[]) || []);
        setAppliedInternships((progress.applied_internships as string[]) || []);
        setSkillXp((progress.skill_xp as Record<string, number>) || {});
        setSelectedCareerPathState(progress.selected_career_path || null);
        setLastCheckInDateState(progress.last_check_in_date || null);
        setPathwayStartDateState(progress.pathway_start_date || null);
        setPulseCheckState(progress.pulse_check || null);
        setArchetypeState(progress.archetype || "");
        setMatchedCareersState((progress.matched_careers as { careerId: string; score: number }[]) || []);
        setAssessmentAnswersState((progress.assessment_answers as Record<number, string | number>) || {});
        setJournalEntries((progress.journal_entries as JournalEntry[]) || []);
        setSavedResources((progress.saved_resources as SavedResource[]) || []);
      }

      setDbLoaded(true);
    } catch (err) {
      console.error("Error loading user data:", err);
      setDbLoaded(true);
    }
  }, []);

  // Auth listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        // Use setTimeout to avoid Supabase deadlock
        setTimeout(() => loadUserData(session.user.id), 0);
      } else {
        setDbLoaded(false);
        // Reset state on logout
        setProfileState(null);
        setXp(0);
        setStreak(0);
        setBadges([]);
        setCompletedMissions([]);
        setCompletedQuests([]);
        setCompletedMilestones([]);
        setSavedCareers([]);
        setRejectedCareers([]);
        setAppliedInternships([]);
        setSkillXp({});
        setSelectedCareerPathState(null);
        setLastCheckInDateState(null);
        setPathwayStartDateState(null);
        setPulseCheckState(null);
        setArchetypeState("");
        setMatchedCareersState([]);
        setAssessmentAnswersState({});
        setJournalEntries([]);
        setSavedResources([]);
      }
      setAuthLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserData(session.user.id);
      }
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [loadUserData]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Profile setter that also saves to DB
  const setProfile = async (p: StudentProfile) => {
    setProfileState(p);
    if (user) {
      await supabase.from("profiles").upsert({
        id: user.id,
        name: p.name,
        age: p.age,
        grade: p.grade,
        country: p.country,
        subjects: p.subjects,
        dream_career: p.dreamCareer,
        interests: p.interests,
        updated_at: new Date().toISOString(),
      });
    }
  };

  const setAssessmentAnswers = (a: Record<number, string | number>) => setAssessmentAnswersState(a);
  const setMatchedCareers = (c: { careerId: string; score: number }[]) => setMatchedCareersState(c);
  const setArchetype = (a: string) => setArchetypeState(a);
  const setLastCheckInDate = (date: string) => setLastCheckInDateState(date);
  const setPulseCheck = (emoji: string | null) => setPulseCheckState(emoji);
  const setPathwayStartDate = (date: string | null) => setPathwayStartDateState(date);
  const setSelectedCareerPath = (id: string | null) => setSelectedCareerPathState(id);

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
        user, authLoading, signOut,
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
