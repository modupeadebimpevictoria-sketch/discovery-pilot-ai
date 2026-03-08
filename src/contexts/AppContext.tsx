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

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        assessmentAnswers,
        setAssessmentAnswers,
        matchedCareers,
        setMatchedCareers,
        archetype,
        setArchetype,
        savedCareers,
        toggleSavedCareer,
        completedMissions,
        addCompletedMission,
        badges,
        addBadge,
        xp,
        addXp,
        appliedInternships,
        applyToInternship,
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
