import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCareerById, type Career } from "@/data/careers";
import { getCareerListingById, getCareerFamilyById } from "@/data/careerFamilies";
import { getMissionsByCareer } from "@/data/missions";
import { getSkillBuilders } from "@/data/skillBuilders";
import { getInternshipsByCareer } from "@/data/internships";
import { useApp } from "@/contexts/AppContext";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ShareModal from "@/components/ShareModal";
import OrbitChat from "@/components/PathfinderChat";
import {
  ArrowLeft, Heart, Play, DollarSign, TrendingUp, Clock, Star,
  Users, MapPin, GraduationCap, Share2, ChevronRight, Zap, BookOpen,
  Target, Briefcase, Bot, CheckCircle, ExternalLink
} from "lucide-react";
import { toast } from "sonner";

// Convert a CareerListing into a full Career object with sensible defaults
function listingToCareer(id: string): Career | undefined {
  const listing = getCareerListingById(id);
  if (!listing) return undefined;
  const family = getCareerFamilyById(listing.familyId);

  // Parse salary range for entry/mid/senior
  const salaryParts = listing.salaryRange.replace(/\$/g, "").split("–").map((s) => s.trim());
  const entryPay = salaryParts[0] ? `$${salaryParts[0].replace(/\s/g, "")}` : "$30,000";
  const seniorPay = salaryParts[1] ? `$${salaryParts[1].replace(/\s/g, "")}` : "$100,000+";
  // Estimate mid from the range
  const entryNum = parseInt(salaryParts[0]?.replace(/[^0-9]/g, "") || "30") * 1000;
  const seniorNum = parseInt(salaryParts[1]?.replace(/[^0-9+]/g, "") || "100") * 1000;
  const midNum = Math.round((entryNum + seniorNum) / 2);
  const midPay = `$${(midNum / 1000).toFixed(0)}k`;

  const outlook: Career["jobOutlook"] = listing.growthTag?.includes("Emerging")
    ? "Emerging"
    : listing.growthTag?.includes("High demand")
    ? "High Demand"
    : "Growing";

  const categoryMap: Record<string, Career["category"]> = {
    "creative-design": "Creative Arts",
    "media-content": "Media",
    "entertainment-performance": "Creative Arts",
    "technology": "Technology",
    "product-tech": "Technology",
    "healthcare-medicine": "Healthcare",
    "mental-health": "Healthcare",
    "science-research": "Science",
    "environment-sustainability": "Environment",
    "engineering-architecture": "Engineering",
    "trades-technical": "Engineering",
    "business-entrepreneurship": "Business",
    "finance-investment": "Business",
    "marketing-communications": "Media",
    "law-justice": "Government",
    "education-academia": "Government",
    "social-impact": "Government",
    "government-public-service": "Government",
    "international-development": "Government",
    "travel-hospitality": "Business",
    "food-culinary": "Creative Arts",
    "sport-fitness": "Sports",
    "animals-nature": "Science",
    "space-future-tech": "Science",
    "beauty-wellness": "Creative Arts",
    "real-estate-property": "Business",
  };

  return {
    id: listing.id,
    title: listing.title,
    category: categoryMap[listing.familyId] || "Business",
    description: listing.description,
    dailyLife: `As a ${listing.title}, you spend your days working on tasks related to ${listing.searchTerms.slice(0, 3).join(", ")}. Every day is different and you're always learning something new.`,
    worldImpact: `${listing.title}s make a real difference in the world of ${family?.name || "their field"}. This career helps shape how people live, work and thrive.`,
    skills: listing.searchTerms.slice(0, 6).map((t) => t.charAt(0).toUpperCase() + t.slice(1)),
    personalityFit: ["Curious", "Dedicated", "Problem-solver", "Collaborative"],
    recommendedSubjects: ["English", "Mathematics", "ICT", "Related specialist subjects"],
    educationPath: [
      "Research this career and speak to people in the field",
      "Choose relevant subjects at school / college",
      "Pursue further education, apprenticeship or self-study",
      `Start building experience as a ${listing.title}`,
    ],
    certifications: ["Industry-specific certifications available"],
    salaryRange: { entry: entryPay, mid: midPay, senior: seniorPay },
    jobOutlook: outlook,
    futureGrowth: listing.growthTag
      ? `This field is ${listing.growthTag.includes("Emerging") ? "an emerging area with exciting new opportunities" : "in high demand with strong job prospects"}.`
      : "This field offers stable career prospects with room for growth.",
    difficulty: "Moderate",
    timelineYears: 4,
    dayInLifeVideo: `https://www.youtube.com/results?search_query=day+in+the+life+${encodeURIComponent(listing.title)}`,
    encouragementVideo: `https://www.youtube.com/results?search_query=${encodeURIComponent(listing.title)}+career+advice`,
    encouragementFigure: "Industry leaders",
    roleModels: [],
    emoji: family?.emoji || "💼",
    color: "primary" as const,
    tags: listing.searchTerms,
  };
}

export default function CareerExploration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savedCareers, toggleSavedCareer, matchedCareers, profile, completedMissions, addCompletedMission, addBadge, addXp, appliedInternships, applyToInternship } = useApp();
  const [shareOpen, setShareOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Try detailed career first, then fall back to listing conversion
  const career = getCareerById(id || "") || listingToCareer(id || "");
  if (!career) return <div className="p-8 text-center text-muted-foreground">Career not found</div>;

  const saved = savedCareers.includes(career.id);
  const matchScore = matchedCareers.find((m) => m.careerId === career.id)?.score;
  const currentAge = profile?.age || 15;
  const missions = getMissionsByCareer(career.id);
  const skills = getSkillBuilders(career.id);
  const internshipList = getInternshipsByCareer(career.id);

  const timeline = [
    { age: currentAge, label: "Pick the right subjects now", emoji: "📚" },
    { age: 18, label: "Apply to uni or training", emoji: "🎓" },
    { age: 18 + Math.floor(career.timelineYears * 0.5), label: "Finish your studies", emoji: "📜" },
    { age: 18 + career.timelineYears - 2, label: "Start working in the field", emoji: "💼" },
    { age: 18 + career.timelineYears, label: `You're a ${career.title}!`, emoji: "🌟" },
  ];

  const demandClass: Record<string, string> = {
    "High Demand": "demand-high",
    Growing: "demand-growing",
    Emerging: "demand-emerging",
    Stable: "demand-stable",
  };

  const handleCompleteMission = (missionId: string, xpReward: number, badge?: string) => {
    addCompletedMission(missionId);
    addXp(xpReward);
    if (badge) addBadge(badge);
    toast.success(`Mission complete! +${xpReward} XP 🎉${badge ? ` Badge: ${badge}` : ""}`);
  };

  const handleApplyInternship = (internshipId: string) => {
    applyToInternship(internshipId);
    toast.success("Application sent! 🎉 We'll keep you updated.");
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
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="glass-card p-3 text-center rounded-2xl">
            <DollarSign size={16} className="text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Average Pay</p>
            <p className="text-sm font-bold text-foreground">{career.salaryRange.mid}</p>
          </div>
          <div className="glass-card p-3 text-center rounded-2xl">
            <Clock size={16} className="text-secondary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">How Long</p>
            <p className="text-sm font-bold text-foreground">{career.timelineYears} years</p>
          </div>
          <div className="glass-card p-3 text-center rounded-2xl">
            <Star size={16} className="text-accent mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Difficulty</p>
            <p className="text-sm font-bold text-foreground">{career.difficulty}</p>
          </div>
        </div>

        {/* What is it */}
        <Card title="What is this job?" icon={<BookOpen size={16} className="text-primary" />}>
          <p className="text-sm text-muted-foreground leading-relaxed">{career.description}</p>
        </Card>

        {/* What people actually do */}
        <Card title="What people in this job actually do" icon={<Zap size={16} className="text-accent" />}>
          <div className="space-y-2">
            {career.dailyLife.split(", ").slice(0, 3).map((task, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-primary font-bold text-sm">{i + 1}.</span>
                <span className="text-sm text-muted-foreground capitalize">{task.replace(/\.$/, "")}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Videos */}
        <div className="grid grid-cols-2 gap-3">
          <a href={career.dayInLifeVideo} target="_blank" rel="noopener noreferrer" className="glass-card-hover p-4 rounded-2xl space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mx-auto">
              <Play size={20} className="text-primary-foreground" />
            </div>
            <p className="text-xs font-bold text-foreground">A Day in the Life</p>
            <p className="text-[10px] text-muted-foreground">See what it's really like</p>
          </a>
          <a href={career.encouragementVideo} target="_blank" rel="noopener noreferrer" className="glass-card-hover p-4 rounded-2xl space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl gradient-bg-warm flex items-center justify-center mx-auto">
              <Play size={20} className="text-accent-foreground" />
            </div>
            <p className="text-xs font-bold text-foreground">Get Inspired</p>
            <p className="text-[10px] text-muted-foreground">by {career.encouragementFigure}</p>
          </a>
        </div>

        {/* Why it matters */}
        <Card title="Why this job matters 🌍" icon={<Star size={16} className="text-secondary" />}>
          <p className="text-sm text-muted-foreground leading-relaxed">{career.worldImpact}</p>
        </Card>

        {/* 🎮 Career Missions */}
        {missions.length > 0 && (
          <Card title="🎮 Try This Career — Fun Missions!" icon={<Target size={16} className="text-accent" />}>
            <p className="text-xs text-muted-foreground mb-3">Complete these challenges to earn XP and badges! Each one takes 10-30 minutes.</p>
            <div className="space-y-3">
              {missions.map((m) => {
                const done = completedMissions.includes(m.id);
                return (
                  <div key={m.id} className={`glass-card p-4 rounded-xl space-y-2 ${done ? "opacity-60" : ""}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{m.emoji}</span>
                        <div>
                          <p className="text-sm font-bold text-foreground">{m.title}</p>
                          <p className="text-[10px] text-muted-foreground">⏱️ {m.timeMinutes} min • ⚡ {m.xpReward} XP</p>
                        </div>
                      </div>
                      {done && <CheckCircle size={20} className="text-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{m.description}</p>
                    <div className="space-y-1">
                      {m.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[10px] font-bold text-primary bg-primary/10 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">{i + 1}</span>
                          <span className="text-xs text-muted-foreground">{step}</span>
                        </div>
                      ))}
                    </div>
                    {!done && (
                      <button
                        onClick={() => handleCompleteMission(m.id, m.xpReward, m.badge)}
                        className="w-full btn-primary-glow text-xs py-2.5 flex items-center justify-center gap-1"
                      >
                        ✅ I did this! Claim {m.xpReward} XP
                      </button>
                    )}
                    {done && m.badge && (
                      <p className="text-xs text-primary font-bold text-center">🏆 Badge earned: {m.badge}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* 🛠️ Skill Builder */}
        {skills.length > 0 && (
          <Card title="🛠️ Start Building Skills Now" icon={<TrendingUp size={16} className="text-primary" />}>
            <p className="text-xs text-muted-foreground mb-3">Things you can do RIGHT NOW to get closer to this career:</p>
            <div className="space-y-2">
              {skills.map((s) => (
                <div key={s.id} className="glass-card p-3 rounded-xl flex items-start gap-3">
                  <span className="text-2xl">{s.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{s.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                    <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      s.difficulty === "Easy" ? "bg-primary/10 text-primary" :
                      s.difficulty === "Medium" ? "bg-secondary/10 text-secondary" :
                      "bg-accent/10 text-accent"
                    }`}>{s.difficulty}</span>
                  </div>
                  {s.link && (
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted/50">
                      <ExternalLink size={14} className="text-muted-foreground" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Skills you'll need */}
        <Card title="Skills you'll need" icon={<Zap size={16} className="text-primary" />}>
          <div className="flex flex-wrap gap-2">
            {career.skills.map((s) => (
              <span key={s} className="fact-pill border-primary/20 text-primary">{s}</span>
            ))}
          </div>
        </Card>

        {/* Subjects that help you get this job */}
        <Card title="Subjects that help you get this job" icon={<GraduationCap size={16} className="text-secondary" />}>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {career.recommendedSubjects.map((s) => (
              <span key={s} className="fact-pill text-secondary border-secondary/20">{s}</span>
            ))}
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">What you need to study to become this:</p>
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

        {/* Your Roadmap */}
        <Card title="Your Step-by-Step Plan" icon={<MapPin size={16} className="text-accent" />}>
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

        {/* How much can you earn? */}
        <Card title="How much can you earn? 💰" icon={<DollarSign size={16} className="text-primary" />}>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Starting Out", value: career.salaryRange.entry, color: "bg-muted/50" },
              { label: "With Experience", value: career.salaryRange.mid, color: "bg-primary/10 border border-primary/20" },
              { label: "Top Level", value: career.salaryRange.senior, color: "bg-muted/50" },
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

        {/* Is this job growing? */}
        <Card title="Is this job growing in the future?" icon={<TrendingUp size={16} className="text-secondary" />}>
          <p className="text-sm text-muted-foreground leading-relaxed">{career.futureGrowth}</p>
        </Card>

        {/* 🏢 Try This Career in Real Life */}
        {internshipList.length > 0 && (
          <Card title="🏢 Try This Career in Real Life" icon={<Briefcase size={16} className="text-glow-purple" />}>
            <p className="text-xs text-muted-foreground mb-3">Shadow opportunities and internships for Year 10+ students:</p>
            <div className="space-y-3">
              {internshipList.map((intern) => {
                const applied = appliedInternships.includes(intern.id);
                return (
                  <div key={intern.id} className="glass-card p-4 rounded-xl space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{intern.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">{intern.title}</p>
                        <p className="text-xs text-muted-foreground">{intern.company}</p>
                        <div className="flex gap-2 mt-1 flex-wrap">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">📍 {intern.location}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{intern.type}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">⏱️ {intern.duration}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{intern.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {intern.requirements.map((r) => (
                        <span key={r} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{r}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => !applied && handleApplyInternship(intern.id)}
                      disabled={applied}
                      className={`w-full text-xs py-2.5 rounded-xl font-bold transition-all ${
                        applied
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "btn-primary-glow"
                      } flex items-center justify-center gap-1`}
                    >
                      {applied ? "✅ Applied!" : "📩 Apply Now"}
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Role Models */}
        <Card title="People who made it 🌟" icon={<Users size={16} className="text-glow-purple" />}>
          <div className="flex flex-wrap gap-2">
            {career.roleModels.map((rm) => (
              <span key={rm} className="fact-pill">⭐ {rm}</span>
            ))}
          </div>
        </Card>

        {/* Future Self */}
        <div className="glass-card p-5 rounded-2xl space-y-3 neon-border">
          <h3 className="font-bold text-foreground flex items-center gap-2 text-sm">
            🔮 Imagine you at age {currentAge + career.timelineYears + 5}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Picture this: You wake up as a {career.title}. {career.dailyLife.split(".")[0]}.
            You earn around {career.salaryRange.mid} and love what you do.
            Your {career.skills[0]} and {career.skills[1]} skills set you apart.
            {career.worldImpact.split(".")[0]}.
          </p>
        </div>

        {/* Career Journey Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate(`/roadmap/${career.id}`)}
            className="glass-card-hover p-4 rounded-2xl text-left space-y-2"
          >
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
              <MapPin size={18} className="text-primary-foreground" />
            </div>
            <p className="text-sm font-bold text-foreground">Career Roadmap</p>
            <p className="text-[10px] text-muted-foreground">Step-by-step path to this career</p>
          </button>
          <button
            onClick={() => navigate("/opportunities")}
            className="glass-card-hover p-4 rounded-2xl text-left space-y-2"
          >
            <div className="w-9 h-9 rounded-xl gradient-bg-warm flex items-center justify-center">
              <GraduationCap size={18} className="text-accent-foreground" />
            </div>
            <p className="text-sm font-bold text-foreground">Opportunities</p>
            <p className="text-[10px] text-muted-foreground">Scholarships, courses & more</p>
          </button>
        </div>

        {/* Ask AI Mentor */}
        <button
          onClick={() => setChatOpen(true)}
          className="w-full glass-card-hover p-4 rounded-2xl flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
            <Bot size={20} className="text-primary-foreground" />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm font-bold text-foreground">Got questions about {career.title}?</p>
            <p className="text-[10px] text-muted-foreground">Ask SpringBoard AI — your career launchpad 🏊</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>

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
            {saved ? "Saved ❤️" : "Save Career"}
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

      <AnimatePresence>
        {chatOpen && <OrbitChat onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
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
