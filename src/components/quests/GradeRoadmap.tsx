import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { useCareers } from "@/contexts/CareersContext";
import { getOrCreateRoadmap, RoadmapMilestone } from "@/data/roadmaps";
import {
  CheckCircle, Circle, MapPin, GraduationCap, BookOpen,
  Trophy, Briefcase, Users, Code, Lock, ChevronDown, ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";

// Map age ranges from roadmap data to grade bands
function ageRangeToGradeBand(ageRange: string): string {
  if (ageRange === "13-14" || ageRange === "14-15") return "Grade 9–10";
  if (ageRange === "15-16" || ageRange === "16-17") return "Grade 11–12";
  if (ageRange === "17-18") return "Pre-Graduation";
  return "Post-School";
}

const GRADE_BANDS = ["Grade 9–10", "Grade 11–12", "Pre-Graduation", "Post-School"];

const bandDescriptions: Record<string, string> = {
  "Grade 9–10": "Explore, discover, and build your foundation",
  "Grade 11–12": "Specialise, compete, and gain experience",
  "Pre-Graduation": "Prepare applications and finalise your path",
  "Post-School": "Launch your career or higher education",
};

const bandEmojis: Record<string, string> = {
  "Grade 9–10": "🌱",
  "Grade 11–12": "🚀",
  "Pre-Graduation": "🎓",
  "Post-School": "💼",
};

const categoryIcons: Record<string, React.ReactNode> = {
  subjects: <BookOpen size={14} />,
  extracurricular: <Users size={14} />,
  skills: <Code size={14} />,
  projects: <MapPin size={14} />,
  competitions: <Trophy size={14} />,
  internships: <Briefcase size={14} />,
  university: <GraduationCap size={14} />,
};

const categoryColors: Record<string, string> = {
  subjects: "text-secondary",
  extracurricular: "text-glow-purple",
  skills: "text-primary",
  projects: "text-accent",
  competitions: "text-glow-pink",
  internships: "text-secondary",
  university: "text-primary",
};

function gradeStringToNumber(grade: string): number {
  const num = parseInt(grade.replace(/\D/g, ""), 10);
  return isNaN(num) ? 9 : num;
}

function getCurrentBand(grade: string): string {
  const g = gradeStringToNumber(grade);
  if (g <= 10) return "Grade 9–10";
  if (g <= 12) return "Grade 11–12";
  return "Pre-Graduation";
}

function getBandIndex(band: string): number {
  return GRADE_BANDS.indexOf(band);
}

export default function GradeRoadmap() {
  const navigate = useNavigate();
  const { selectedCareerPath, matchedCareers, completedMilestones, toggleMilestone, addXp, addBadge, profile } = useApp();
  const [collapsedBands, setCollapsedBands] = useState<Set<string>>(new Set());
  const stickyRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const careerId = selectedCareerPath || matchedCareers[0]?.careerId || null;
  const detailedCareer = careerId ? getCareerById(careerId) : null;
  const listing = !detailedCareer && careerId ? getCareerListingById(careerId) : null;
  const family = listing ? getCareerFamilyById(listing.familyId) : null;
  const careerTitle = detailedCareer?.title || listing?.title;
  const careerEmoji = detailedCareer?.emoji || family?.emoji || "💼";

  const studentGrade = profile?.grade || "9";
  const currentBand = getCurrentBand(studentGrade);
  const currentBandIdx = getBandIndex(currentBand);

  const roadmap = (careerId && careerTitle) ? getOrCreateRoadmap(careerId, careerTitle, listing?.familyId || detailedCareer?.id) : null;
  const milestones = roadmap?.milestones || [];

  // Group milestones by grade band
  const bandGroups: Record<string, RoadmapMilestone[]> = {};
  GRADE_BANDS.forEach((b) => (bandGroups[b] = []));
  milestones.forEach((m) => {
    const band = ageRangeToGradeBand(m.ageRange);
    if (bandGroups[band]) bandGroups[band].push(m);
  });

  const completedCount = milestones.filter((m) => completedMilestones.includes(m.id)).length;
  const progress = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  // Auto-collapse past bands for upper grade students
  useEffect(() => {
    const pastBands = GRADE_BANDS.filter((_, i) => i < currentBandIdx);
    if (pastBands.length > 0) {
      setCollapsedBands(new Set(pastBands));
    }
  }, [currentBandIdx]);

  // No Active Path
  if (!careerId || !careerTitle) {
    return (
      <div className="flex items-center justify-center px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 max-w-xs">
          <Lock size={48} className="text-muted-foreground mx-auto" />
          <h2 className="text-xl font-bold text-foreground">Set Your Active Path First</h2>
          <p className="text-sm text-muted-foreground">Set a career as your Active Path to generate your personal roadmap →</p>
          <button onClick={() => navigate("/universe")} className="btn-primary-glow w-full">Explore Careers</button>
        </motion.div>
      </div>
    );
  }

  const toggleCollapse = (band: string) => {
    setCollapsedBands((prev) => {
      const next = new Set(prev);
      if (next.has(band)) next.delete(band);
      else next.add(band);
      return next;
    });
  };

  const handleToggle = (milestone: RoadmapMilestone) => {
    const wasCompleted = completedMilestones.includes(milestone.id);
    toggleMilestone(milestone.id);
    if (!wasCompleted) {
      addXp(milestone.xpReward);
      toast.success(`+${milestone.xpReward} XP! "${milestone.title}" completed! 🎉`);
      const newCompleted = completedCount + 1;
      if (newCompleted === milestones.length) {
        addBadge(`${careerTitle} Orbit Master`);
      }
    }
  };

  return (
    <div className="space-y-5">
      {/* Career header */}
      <div className="flex items-center gap-3">
        <span className="text-3xl">{careerEmoji}</span>
        <div>
          <h2 className="text-lg font-bold text-foreground">Path to {careerTitle}</h2>
          <p className="text-xs text-muted-foreground">Starting from Grade {gradeStringToNumber(studentGrade)}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="glass-card p-4 rounded-2xl space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-semibold text-foreground">{completedCount} of {milestones.length} milestones</span>
          <span className="font-bold text-primary">{progress}%</span>
        </div>
        <div className="progress-bar">
          <motion.div className="progress-bar-fill" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8 }} />
        </div>
        <p className="text-[10px] text-muted-foreground">
          {progress < 25 ? "Just getting started — every step counts! 💪" :
           progress < 50 ? "Great progress! Keep building your path 🚀" :
           progress < 75 ? "You're more than halfway there! Amazing! ⭐" :
           progress < 100 ? "Almost there! The finish line is in sight! 🏆" :
           "You did it! You're fully prepared! 🎓"}
        </p>
      </div>

      {/* Grade band timeline */}
      <div className="space-y-4">
        {GRADE_BANDS.map((band, bandIdx) => {
          const items = bandGroups[band];
          if (items.length === 0) return null;

          const isPast = bandIdx < currentBandIdx;
          const isCurrent = bandIdx === currentBandIdx;
          const isCollapsed = collapsedBands.has(band);
          const bandCompleted = items.filter((i) => completedMilestones.includes(i.id)).length;

          return (
            <div key={band}>
              {/* Sticky band header */}
              <div
                ref={(el) => (stickyRefs.current[band] = el)}
                className="sticky top-12 z-10 backdrop-blur-xl bg-background/80 py-2"
              >
                <button
                  onClick={() => toggleCollapse(band)}
                  className="w-full flex items-center gap-3"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    isCurrent ? "gradient-bg" :
                    isPast ? "bg-muted" :
                    "bg-card border border-glass-border"
                  }`}>
                    {bandEmojis[band]}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-bold ${isCurrent ? "text-primary" : isPast ? "text-muted-foreground" : "text-foreground"}`}>
                        {band}
                      </p>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold">NOW</span>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {bandDescriptions[band]} · {bandCompleted}/{items.length} done
                    </p>
                  </div>
                  {isCollapsed ? <ChevronRight size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                </button>
              </div>

              {/* Milestones */}
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className={`space-y-2 ml-5 border-l-2 pl-4 pt-2 ${
                      isPast ? "border-muted" : "border-primary/30"
                    }`}>
                      {items.map((milestone, idx) => {
                        const done = completedMilestones.includes(milestone.id);
                        return (
                          <motion.button
                            key={milestone.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            onClick={() => handleToggle(milestone)}
                            className={`w-full glass-card p-3 rounded-xl flex items-start gap-3 text-left transition-all ${
                              done ? "border-primary/30 bg-primary/5" : ""
                            } ${isPast && !done ? "opacity-60" : ""}`}
                          >
                            <div className="mt-0.5">
                              {done ? (
                                <CheckCircle size={18} className="text-primary" />
                              ) : (
                                <Circle size={18} className="text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-base">{milestone.emoji}</span>
                                <p className={`text-xs font-semibold truncate ${
                                  done ? "text-primary line-through" : "text-foreground"
                                }`}>
                                  {milestone.title}
                                </p>
                              </div>
                              <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{milestone.description}</p>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className={`flex items-center gap-1 text-[10px] font-medium ${categoryColors[milestone.category]}`}>
                                  {categoryIcons[milestone.category]} {milestone.category}
                                </span>
                                <span className="text-[10px] text-primary font-bold">+{milestone.xpReward} XP</span>
                              </div>
                              {milestone.alternativePath && (
                                <p className="text-[9px] text-glow-purple mt-1 italic">🌍 {milestone.alternativePath}</p>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
