import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCareerById } from "@/data/careers";
import { useApp } from "@/contexts/AppContext";
import {
  ArrowLeft, Heart, BookOpen, Briefcase, GraduationCap, DollarSign,
  TrendingUp, Clock, Star, Play, Users, MapPin
} from "lucide-react";

export default function CareerExploration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savedCareers, toggleSavedCareer, matchedCareers, profile } = useApp();

  const career = getCareerById(id || "");
  if (!career) return <div className="p-8 text-center text-muted-foreground">Career not found</div>;

  const saved = savedCareers.includes(career.id);
  const matchScore = matchedCareers.find((m) => m.careerId === career.id)?.score;

  const currentAge = profile?.age || 15;
  const timeline = [
    { age: currentAge, label: "Choose the right subjects", emoji: "📚" },
    { age: 18, label: "Apply to university", emoji: "🎓" },
    { age: 18 + Math.floor(career.timelineYears * 0.5), label: "Complete education", emoji: "📜" },
    { age: 18 + career.timelineYears - 2, label: "Early career / internship", emoji: "💼" },
    { age: 18 + career.timelineYears, label: `Working as a ${career.title}!`, emoji: "🌟" },
  ];

  const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
    <div className="glass-card p-4 space-y-3">
      <h3 className="font-bold text-foreground flex items-center gap-2">{icon} {title}</h3>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-6 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 glass-card rounded-xl">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <button onClick={() => toggleSavedCareer(career.id)} className="p-2 glass-card rounded-xl">
          <Heart size={20} className={saved ? "fill-accent text-accent" : "text-foreground"} />
        </button>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-4 pb-6 text-center space-y-3"
      >
        <span className="text-6xl">{career.emoji}</span>
        <h1 className="text-3xl font-bold gradient-text">{career.title}</h1>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">{career.category}</span>
          {matchScore && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary">{matchScore}% Match</span>
          )}
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            career.jobOutlook === "High Demand" ? "bg-primary/20 text-primary" :
            career.jobOutlook === "Growing" ? "bg-secondary/20 text-secondary" :
            "bg-muted text-muted-foreground"
          }`}>{career.jobOutlook}</span>
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-4 space-y-4">
        <Section icon={<BookOpen size={18} className="text-primary" />} title="What is it?">
          <p className="text-sm text-muted-foreground leading-relaxed">{career.description}</p>
        </Section>

        <Section icon={<Briefcase size={18} className="text-secondary" />} title="A Day in the Life">
          <p className="text-sm text-muted-foreground leading-relaxed">{career.dailyLife}</p>
          <a
            href={career.dayInLifeVideo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary font-medium mt-2"
          >
            <Play size={16} /> Watch "Day in the Life" video
          </a>
        </Section>

        <Section icon={<Star size={18} className="text-accent" />} title="World Impact">
          <p className="text-sm text-muted-foreground leading-relaxed">{career.worldImpact}</p>
        </Section>

        {/* Inspiration */}
        <Section icon={<Users size={18} className="text-glow-purple" />} title="Get Inspired">
          <a
            href={career.encouragementVideo}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-3 flex items-center gap-3 rounded-xl"
          >
            <div className="w-10 h-10 rounded-full gradient-bg-warm flex items-center justify-center">
              <Play size={16} className="text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Inspiration from {career.encouragementFigure}</p>
              <p className="text-xs text-muted-foreground">Watch encouragement video</p>
            </div>
          </a>
          <div className="flex flex-wrap gap-2 mt-2">
            {career.roleModels.map((rm) => (
              <span key={rm} className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground">{rm}</span>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section icon={<Star size={18} className="text-primary" />} title="Key Skills">
          <div className="flex flex-wrap gap-2">
            {career.skills.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">{s}</span>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section icon={<GraduationCap size={18} className="text-secondary" />} title="Education Path">
          <div className="space-y-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Recommended Subjects</p>
              <div className="flex flex-wrap gap-1">
                {career.recommendedSubjects.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-secondary/10 text-secondary">{s}</span>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              {career.educationPath.map((step, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full gradient-bg flex-shrink-0 flex items-center justify-center text-xs font-bold text-primary-foreground mt-0.5">
                    {i + 1}
                  </div>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Roadmap Timeline */}
        <Section icon={<MapPin size={18} className="text-accent" />} title="Your Career Roadmap">
          <div className="space-y-0">
            {timeline.map((t, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 relative">
                {i < timeline.length - 1 && (
                  <div className="absolute left-[15px] top-8 w-0.5 h-full bg-border" />
                )}
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-lg z-10 flex-shrink-0">
                  {t.emoji}
                </div>
                <div>
                  <p className="text-xs font-bold text-primary">Age {t.age}</p>
                  <p className="text-sm text-muted-foreground">{t.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Salary & Demand */}
        <Section icon={<DollarSign size={18} className="text-primary" />} title="Salary & Demand">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Entry", value: career.salaryRange.entry },
              { label: "Mid", value: career.salaryRange.mid },
              { label: "Senior", value: career.salaryRange.senior },
            ].map((s) => (
              <div key={s.label} className="text-center p-2 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-sm font-bold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp size={16} className="text-primary" />
            <p className="text-sm text-muted-foreground">{career.futureGrowth}</p>
          </div>
        </Section>

        {/* Difficulty & Timeline */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-4 text-center">
            <Clock size={20} className="text-secondary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Timeline</p>
            <p className="text-lg font-bold text-foreground">{career.timelineYears} years</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Star size={20} className="text-accent mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Difficulty</p>
            <p className="text-lg font-bold text-foreground">{career.difficulty}</p>
          </div>
        </div>

        {/* Future Self */}
        <div className="glass-card p-5 space-y-3 neon-border">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            🔮 Your Future Self at {currentAge + career.timelineYears + 5}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Imagine waking up as a {career.title}. {career.dailyLife} You're making a real impact — {career.worldImpact.toLowerCase()}
            Your expertise in {career.skills.slice(0, 2).join(" and ")} sets you apart. You earn around {career.salaryRange.mid} and love what you do.
          </p>
        </div>
      </div>
    </div>
  );
}
