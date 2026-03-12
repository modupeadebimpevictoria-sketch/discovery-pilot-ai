import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { useCareers } from "@/contexts/CareersContext";
import { getOrCreateRoadmap, RoadmapMilestone } from "@/data/roadmaps";
import { ChevronLeft, CheckCircle, Circle, MapPin, GraduationCap, BookOpen, Trophy, Briefcase, Users, Code } from "lucide-react";
import { toast } from "sonner";

const categoryIcons: Record<string, React.ReactNode> = {
  subjects: <BookOpen size={16} />,
  extracurricular: <Users size={16} />,
  skills: <Code size={16} />,
  projects: <MapPin size={16} />,
  competitions: <Trophy size={16} />,
  internships: <Briefcase size={16} />,
  university: <GraduationCap size={16} />,
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

export default function Roadmap() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { completedMilestones, toggleMilestone, addXp, addBadge, xp } = useApp();

  // Support both detailed careers and listing-only careers
  const detailedCareer = id ? getCareerById(id) : null;
  const listing = !detailedCareer && id ? getCareerListingById(id) : null;
  const family = listing ? getCareerFamilyById(listing.familyId) : null;

  const careerTitle = detailedCareer?.title || listing?.title;
  const careerEmoji = detailedCareer?.emoji || family?.emoji || "💼";
  const familyId = listing?.familyId;

  if (!careerTitle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Career not found</p>
      </div>
    );
  }

  const roadmap = getOrCreateRoadmap(id!, careerTitle, familyId);
  const milestones = roadmap.milestones;
  const completedCount = milestones.filter((m) => completedMilestones.includes(m.id)).length;
  const progress = Math.round((completedCount / milestones.length) * 100);

  // Group by age range
  const ageGroups = milestones.reduce((acc, m) => {
    if (!acc[m.ageRange]) acc[m.ageRange] = [];
    acc[m.ageRange].push(m);
    return acc;
  }, {} as Record<string, RoadmapMilestone[]>);

  const handleToggle = (milestone: RoadmapMilestone) => {
    const wasCompleted = completedMilestones.includes(milestone.id);
    toggleMilestone(milestone.id);
    if (!wasCompleted) {
      addXp(milestone.xpReward);
      toast.success(`+${milestone.xpReward} XP! "${milestone.title}" completed! 🎉`);
      if (progress >= 90) {
        addBadge(`${careerTitle} Orbit Master`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
          <ChevronLeft size={18} /> Back
        </button>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{careerEmoji}</span>
          <div>
            <h1 className="text-xl font-bold text-foreground">Your Roadmap</h1>
            <p className="text-sm text-muted-foreground">Path to becoming a {careerTitle}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="glass-card p-4 rounded-2xl space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-foreground">{completedCount} of {milestones.length} milestones</span>
            <span className="font-bold text-primary">{progress}%</span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground">
            {progress < 25 ? "Just getting started — every step counts! 💪" :
             progress < 50 ? "Great progress! Keep building your path 🚀" :
             progress < 75 ? "You're more than halfway there! Amazing! ⭐" :
             progress < 100 ? "Almost there! The finish line is in sight! 🏆" :
             "You did it! You're fully prepared! 🎓"}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-5 space-y-6">
        {Object.entries(ageGroups).map(([age, items]) => (
          <div key={age}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-primary-foreground">
                {age.split("-")[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Age {age}</p>
                <p className="text-[10px] text-muted-foreground">
                  {items.filter((i) => completedMilestones.includes(i.id)).length}/{items.length} done
                </p>
              </div>
            </div>

            <div className="space-y-2 ml-4 border-l-2 border-glass-border pl-4">
              {items.map((milestone, idx) => {
                const done = completedMilestones.includes(milestone.id);
                return (
                  <motion.button
                    key={milestone.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleToggle(milestone)}
                    className={`w-full glass-card p-3 rounded-xl flex items-start gap-3 text-left transition-all ${
                      done ? "border-primary/30 bg-primary/5" : ""
                    }`}
                  >
                    <div className="mt-0.5">
                      {done ? (
                        <CheckCircle size={20} className="text-primary" />
                      ) : (
                        <Circle size={20} className="text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{milestone.emoji}</span>
                        <p className={`text-sm font-semibold ${done ? "text-primary" : "text-foreground"}`}>
                          {milestone.title}
                        </p>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{milestone.description}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`flex items-center gap-1 text-[10px] font-medium ${categoryColors[milestone.category]}`}>
                          {categoryIcons[milestone.category]} {milestone.category}
                        </span>
                        <span className="text-[10px] text-primary font-bold">+{milestone.xpReward} XP</span>
                      </div>
                      {milestone.alternativePath && (
                        <p className="text-[9px] text-accent mt-1 italic">🌍 {milestone.alternativePath}</p>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
