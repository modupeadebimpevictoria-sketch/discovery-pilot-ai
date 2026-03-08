import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCareerById } from "@/data/careers";
import { useApp } from "@/contexts/AppContext";
import { useState } from "react";
import ShareModal from "@/components/ShareModal";
import {
  ArrowLeft, Heart, Play, DollarSign, TrendingUp, Clock, Star,
  Users, MapPin, GraduationCap, Share2, ChevronRight, Zap, BookOpen
} from "lucide-react";

export default function CareerExploration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savedCareers, toggleSavedCareer, matchedCareers, profile } = useApp();
  const [shareOpen, setShareOpen] = useState(false);

  const career = getCareerById(id || "");
  if (!career) return <div className="p-8 text-center text-muted-foreground">Career not found</div>;

  const saved = savedCareers.includes(career.id);
  const matchScore = matchedCareers.find((m) => m.careerId === career.id)?.score;
  const currentAge = profile?.age || 15;

  const timeline = [
    { age: currentAge, label: "Choose the right subjects", emoji: "📚" },
    { age: 18, label: "Apply to university", emoji: "🎓" },
    { age: 18 + Math.floor(career.timelineYears * 0.5), label: "Complete education", emoji: "📜" },
    { age: 18 + career.timelineYears - 2, label: "Early career", emoji: "💼" },
    { age: 18 + career.timelineYears, label: `You're a ${career.title}!`, emoji: "🌟" },
  ];

  const demandClass: Record<string, string> = {
    "High Demand": "demand-high",
    Growing: "demand-growing",
    Emerging: "demand-emerging",
    Stable: "demand-stable",
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 glass-heavy border-b border-glass-border/30 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-muted/50 active:scale-95 transition-transform">
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <h1 className="text-sm font-bold text-foreground">{career.emoji} {career.title}</h1>
        <div className="flex gap-2">
          <button onClick={() => setShareOpen(true)} className="p-2 rounded-xl bg-muted/50 active:scale-95 transition-transform">
            <Share2 size={18} className="text-foreground" />
          </button>
          <button onClick={() => toggleSavedCareer(career.id)} className="p-2 rounded-xl bg-muted/50 active:scale-95 transition-transform">
            <Heart size={18} className={saved ? "fill-accent text-accent" : "text-foreground"} />
          </button>
        </div>
      </div>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-5 pt-6 pb-4 text-center space-y-3">
        <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="text-7xl block">
          {career.emoji}
        </motion.span>
        <h1 className="text-3xl font-bold gradient-text">{career.title}</h1>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="fact-pill">{career.category}</span>
          {matchScore && <span className="fact-pill border-primary/30 text-primary font-bold">🎯 {matchScore}% Match</span>}
          <span className={demandClass[career.jobOutlook] || "demand-stable"}>{career.jobOutlook}</span>
        </div>
      </motion.div>

      <div className="px-5 space-y-4">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="glass-card p-3 text-center rounded-2xl">
            <DollarSign size={16} className="text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Mid Salary</p>
            <p className="text-sm font-bold text-foreground">{career.salaryRange.mid}</p>
          </div>
          <div className="glass-card p-3 text-center rounded-2xl">
            <Clock size={16} className="text-secondary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Timeline</p>
            <p className="text-sm font-bold text-foreground">{career.timelineYears}yr</p>
          </div>
          <div className="glass-card p-3 text-center rounded-2xl">
            <Star size={16} className="text-accent mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Difficulty</p>
            <p className="text-sm font-bold text-foreground">{career.difficulty}</p>
          </div>
        </div>

        {/* What is it - bite sized */}
        <Card title="What is it?" icon={<BookOpen size={16} className="text-primary" />}>
          <p className="text-sm text-muted-foreground leading-relaxed">{career.description}</p>
        </Card>

        {/* 3 Things They Do */}
        <Card title={`3 things ${career.title}s actually do`} icon={<Zap size={16} className="text-accent" />}>
          <div className="space-y-2">
            {career.dailyLife.split(", ").slice(0, 3).map((task, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-primary font-bold text-sm">{i + 1}.</span>
                <span className="text-sm text-muted-foreground capitalize">{task.replace(/\.$/, "")}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Videos - bite sized */}
        <div className="grid grid-cols-2 gap-3">
          <a href={career.dayInLifeVideo} target="_blank" rel="noopener noreferrer" className="glass-card-hover p-4 rounded-2xl space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mx-auto">
              <Play size={20} className="text-primary-foreground" />
            </div>
            <p className="text-xs font-bold text-foreground">Day in the Life</p>
            <p className="text-[10px] text-muted-foreground">Watch a real {career.title}</p>
          </a>
          <a href={career.encouragementVideo} target="_blank" rel="noopener noreferrer" className="glass-card-hover p-4 rounded-2xl space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl gradient-bg-warm flex items-center justify-center mx-auto">
              <Play size={20} className="text-accent-foreground" />
            </div>
            <p className="text-xs font-bold text-foreground">Get Inspired</p>
            <p className="text-[10px] text-muted-foreground">by {career.encouragementFigure}</p>
          </a>
        </div>

        {/* World Impact */}
        <Card title="Why it matters 🌍" icon={<Star size={16} className="text-secondary" />}>
          <p className="text-sm text-muted-foreground leading-relaxed">{career.worldImpact}</p>
        </Card>

        {/* Skills as pills */}
        <Card title="Skills you'll need" icon={<Zap size={16} className="text-primary" />}>
          <div className="flex flex-wrap gap-2">
            {career.skills.map((s) => (
              <span key={s} className="fact-pill border-primary/20 text-primary">{s}</span>
            ))}
          </div>
        </Card>

        {/* Education Path */}
        <Card title="Education Pathway" icon={<GraduationCap size={16} className="text-secondary" />}>
          <div className="space-y-1.5 mb-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Subjects to take</p>
            <div className="flex flex-wrap gap-1.5">
              {career.recommendedSubjects.map((s) => (
                <span key={s} className="fact-pill text-secondary border-secondary/20">{s}</span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {career.educationPath.map((step, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full gradient-bg flex-shrink-0 flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <span className="text-sm text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Career Roadmap */}
        <Card title="Your Roadmap" icon={<MapPin size={16} className="text-accent" />}>
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
        </Card>

        {/* Salary Breakdown */}
        <Card title="Salary Range 💰" icon={<DollarSign size={16} className="text-primary" />}>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Entry", value: career.salaryRange.entry, color: "bg-muted/50" },
              { label: "Mid", value: career.salaryRange.mid, color: "bg-primary/10 border border-primary/20" },
              { label: "Senior", value: career.salaryRange.senior, color: "bg-muted/50" },
            ].map((s) => (
              <div key={s.label} className={`text-center p-3 rounded-2xl ${s.color}`}>
                <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
                <p className="text-sm font-bold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <TrendingUp size={14} className="text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground">{career.futureGrowth}</p>
          </div>
        </Card>

        {/* Role Models */}
        <Card title="People who made it" icon={<Users size={16} className="text-glow-purple" />}>
          <div className="flex flex-wrap gap-2">
            {career.roleModels.map((rm) => (
              <span key={rm} className="fact-pill">⭐ {rm}</span>
            ))}
          </div>
        </Card>

        {/* Future Self */}
        <div className="glass-card p-5 rounded-2xl space-y-3 neon-border">
          <h3 className="font-bold text-foreground flex items-center gap-2 text-sm">
            🔮 You at age {currentAge + career.timelineYears + 5}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Imagine waking up as a {career.title}. {career.dailyLife.split(".")[0]}. 
            You earn around {career.salaryRange.mid} and love what you do. 
            Your {career.skills[0]} and {career.skills[1]} skills set you apart. 
            {career.worldImpact.split(".")[0]}.
          </p>
        </div>

        {/* Share & Save */}
        <div className="flex gap-3">
          <button onClick={() => setShareOpen(true)} className="flex-1 btn-outline-glow flex items-center justify-center gap-2 text-sm">
            <Share2 size={16} /> Share
          </button>
          <button
            onClick={() => toggleSavedCareer(career.id)}
            className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold rounded-2xl px-6 py-3.5 transition-all duration-300 active:scale-95 ${
              saved ? "bg-accent/20 text-accent border-2 border-accent/30" : "btn-primary-glow"
            }`}
          >
            <Heart size={16} className={saved ? "fill-accent" : ""} />
            {saved ? "Saved" : "Save Career"}
          </button>
        </div>
      </div>

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        careerTitle={career.title}
        careerEmoji={career.emoji}
        score={matchScore}
      />
    </div>
  );
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="glass-card p-4 rounded-2xl space-y-3"
    >
      <h3 className="font-bold text-foreground flex items-center gap-2 text-sm">{icon} {title}</h3>
      {children}
    </motion.div>
  );
}
