import { useParams, useNavigate } from "react-router-dom";
import { getClusterByFamilyId } from "@/data/clusters";
import { motion, AnimatePresence } from "framer-motion";
import { useCareers, type Career } from "@/contexts/CareersContext";
import { getMissionsByCareer } from "@/data/missions";
import { getRoleModelProfiles, type RoleModelProfile } from "@/data/roleModelProfiles";
import { getSkillDetails } from "@/data/skillDetails";
import { getImagineYouScenarios } from "@/data/imagineYouScenarios";
import { getInternshipsByCareer } from "@/data/internships";
import { useApp } from "@/contexts/AppContext";
import { useState, useEffect } from "react";
import ShareModal from "@/components/ShareModal";
import OrbitChat from "@/components/PathfinderChat";
import { SetActivePathModal, SwitchPathModal } from "@/components/ActivePathModal";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  ArrowLeft, Heart, Play, DollarSign, TrendingUp, Clock, Star,
  Users, MapPin, GraduationCap, Share2, ChevronRight, Zap, BookOpen,
  Target, Briefcase, Bot, CheckCircle, Lock, Shield, Award
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Generate a deterministic photo URL for a career
function getCareerPhoto(careerId: string): string {
  let hash = 0;
  for (let i = 0; i < careerId.length; i++) {
    hash = ((hash << 5) - hash) + careerId.charCodeAt(i);
    hash |= 0;
  }
  const seed = Math.abs(hash % 1000);
  return `https://picsum.photos/seed/${seed}/800/400`;
}

// Convert a CareerListing into a full Career object with sensible defaults
function listingToCareer(
  id: string,
  getCareerListingById: (id: string) => any,
  getCareerFamilyById: (id: string) => any
): Career | undefined {
  const listing = getCareerListingById(id);
  if (!listing) return undefined;
  const family = getCareerFamilyById(listing.familyId);

  const salaryParts = listing.salaryRange.replace(/\$/g, "").split("–").map((s) => s.trim());
  const entryPay = salaryParts[0] ? `$${salaryParts[0].replace(/\s/g, "")}` : "$30,000";
  const seniorPay = salaryParts[1] ? `$${salaryParts[1].replace(/\s/g, "")}` : "$100,000+";
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
  const {
    savedCareers, toggleSavedCareer, matchedCareers, profile,
    completedMissions, addCompletedMission, addBadge, addXp,
    appliedInternships, applyToInternship,
    selectedCareerPath, setSelectedCareerPath,
  } = useApp();
  const { getCareerById, getCareerListingById, getCareerFamilyById } = useCareers();
  const [shareOpen, setShareOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showSetActiveModal, setShowSetActiveModal] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [dbCareer, setDbCareer] = useState<any>(null);

  // Fetch enriched data from DB
  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await supabase.from("careers" as any).select("*").eq("is_active", true);
      if (data) {
        const match = (data as any[]).find((c: any) =>
          c.id === id ||
          c.slug === id ||
          c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id
        );
        if (match) setDbCareer(match);
      }
    })();
  }, [id]);

  const career = getCareerById(id || "") || listingToCareer(id || "", getCareerListingById, getCareerFamilyById);
  if (!career) return <div className="p-8 text-center text-muted-foreground">Career not found</div>;

  const listing = getCareerListingById(id || "");
  const cluster = listing ? getClusterByFamilyId(listing.familyId) : undefined;

  // Derive enriched description with fallback chain
  const heroDescription = dbCareer?.what_they_do_teen || dbCareer?.description_full || career.description;
  const dayInTheLife = dbCareer?.day_in_the_life || null;
  const enrichedSkills: { name: string; importance: number }[] | null = dbCareer?.skills || null;
  const workValues: string[] | null = dbCareer?.work_values || null;
  const entryRequirements: string | null = dbCareer?.entry_requirements || null;
  const careerPath: string | null = dbCareer?.career_path || null;
  const growthOutlook: string | null = dbCareer?.growth_outlook || null;
  const salaryContext: Record<string, any> = dbCareer?.salary_context || {};

  // Salary lookup based on user's country
  const userCountry = profile?.country?.toUpperCase() || "";
  const countryCodeMap: Record<string, string> = {
    "NIGERIA": "NG", "NG": "NG",
    "KENYA": "KE", "KE": "KE",
    "GHANA": "GH", "GH": "GH",
    "SOUTH AFRICA": "ZA", "ZA": "ZA",
  };
  const userCountryCode = countryCodeMap[userCountry] || "";
  const salaryEntry = salaryContext[userCountryCode] || salaryContext["GLOBAL"] || null;
  const salaryLabel = salaryEntry
    ? (userCountryCode && salaryContext[userCountryCode]
        ? salaryEntry.label
        : `${salaryEntry.label} (global average)`)
    : null;
  const salaryIsEmpty = !salaryLabel;

  // Growth outlook badge
  const outlookBadge = growthOutlook === "Bright"
    ? { icon: "🌟", text: "High demand" }
    : growthOutlook === "Average"
    ? { icon: "📈", text: "Steady" }
    : growthOutlook === "Below Average"
    ? { icon: "⚡", text: "Competitive" }
    : null;

  const saved = savedCareers.includes(career.id);
  const isActivePath = selectedCareerPath === career.id;
  const hasAnyActivePath = !!selectedCareerPath;
  const currentActiveCareer = selectedCareerPath
    ? (getCareerById(selectedCareerPath) || listingToCareer(selectedCareerPath, getCareerListingById, getCareerFamilyById))
    : null;

  const getDefaultMatch = (cid: string) => {
    let hash = 0;
    for (let i = 0; i < cid.length; i++) { hash = ((hash << 5) - hash) + cid.charCodeAt(i); hash |= 0; }
    return 55 + Math.abs(hash % 40);
  };
  const matchScore = matchedCareers.find((m) => m.careerId === career.id)?.score || getDefaultMatch(career.id);
  const currentAge = profile?.age || 15;
  const missions = getMissionsByCareer(career.id);
  const internshipList = getInternshipsByCareer(career.id);
  const roleModels = getRoleModelProfiles(career.id, career.title, career.roleModels);
  const skills = getSkillDetails(career.id, career.skills, enrichedSkills || undefined);
  const imagineScenarios = getImagineYouScenarios(career.id, career.title, currentAge, career.timelineYears, career);
  const heroPhoto = dbCareer?.unsplash_photo_url || getCareerPhoto(career.id);

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

  const requireActivePath = (action: () => void) => {
    if (isActivePath) { action(); return; }
    setShowSetActiveModal(true);
  };

  const handleSetActivePath = () => {
    if (hasAnyActivePath && !isActivePath) {
      setShowSetActiveModal(false);
      setShowSwitchModal(true);
      return;
    }
    setSelectedCareerPath(career.id);
    setShowSetActiveModal(false);
    toast.success(`${career.emoji} ${career.title} is now your Active Path!`);
  };

  const handleSwitchPath = () => {
    setSelectedCareerPath(career.id);
    setShowSwitchModal(false);
    toast.success(`Switched to ${career.emoji} ${career.title} as your Active Path!`);
  };

  const handleSaveAndContinue = () => {
    if (!saved) toggleSavedCareer(career.id);
    setShowSwitchModal(false);
    toast.success(`${career.emoji} ${career.title} saved for later!`);
  };

  const handleCompleteMission = (missionId: string, xpReward: number, badge?: string) => {
    requireActivePath(() => {
      addCompletedMission(missionId);
      addXp(xpReward);
      if (badge) addBadge(badge);
      toast.success(`Mission complete! +${xpReward} XP 🎉${badge ? ` Badge: ${badge}` : ""}`);
    });
  };

  const handleApplyInternship = (internshipId: string) => {
    requireActivePath(() => {
      applyToInternship(internshipId);
      toast.success("Application sent! 🎉 We'll keep you updated.");
    });
  };

  const LockedOverlay = ({ children, label }: { children: React.ReactNode; label?: string }) => {
    if (isActivePath) return <>{children}</>;
    return (
      <button onClick={() => setShowSetActiveModal(true)} className="w-full relative">
        <div className="pointer-events-none opacity-40">{children}</div>
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Lock size={14} />
            <span>{label || "Set as Active Path to begin"}</span>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 glass-heavy border-b border-glass-border/30 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-muted/50 active:scale-95 transition-transform">
          <ArrowLeft size={18} className="text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold text-foreground">{career.emoji} {career.title}</h1>
          {isActivePath && (
            <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center gap-1">
              <Shield size={10} /> Active Path 🟢
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShareOpen(true)} className="p-2 rounded-xl bg-muted/50 active:scale-95 transition-transform">
            <Share2 size={18} className="text-foreground" />
          </button>
          <button onClick={() => toggleSavedCareer(career.id)} className="p-2 rounded-xl bg-muted/50 active:scale-95 transition-transform">
            <Heart size={18} className={saved ? "fill-accent text-accent" : "text-foreground"} />
          </button>
        </div>
      </div>

      {/* Hero with real photo */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={heroPhoto}
          alt={career.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <h1 className="text-2xl font-bold text-foreground drop-shadow-md">{career.emoji} {career.title}</h1>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            <span className="fact-pill">{career.category}</span>
            <span className={demandClass[career.jobOutlook] || "demand-stable"}>{career.jobOutlook}</span>
            {outlookBadge && (
              <span className="fact-pill border-primary/20 text-primary font-bold">{outlookBadge.icon} {outlookBadge.text}</span>
            )}
            {isActivePath && (
              <span className="fact-pill border-primary/30 bg-primary/15 text-primary font-bold">🟢 Active Path</span>
            )}
          </div>
          {cluster && (
            <p className="text-[11px] text-muted-foreground/70 mt-1 drop-shadow-sm">{cluster.emoji} {cluster.name}</p>
          )}
        </div>
      </div>

      <div className="px-5 space-y-4 pt-4">
        {/* 1. Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="glass-card p-3 text-center rounded-2xl border-primary/20">
            <DollarSign size={16} className="text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Average Pay</p>
            <p className="text-sm font-bold text-foreground">{career.salaryRange.mid}</p>
          </div>
          <div className="glass-card p-3 text-center rounded-2xl border-glow-purple/20">
            <Clock size={16} className="text-glow-purple mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">How Long</p>
            <p className="text-sm font-bold text-foreground">{career.timelineYears} years</p>
          </div>
          <div className="glass-card p-3 text-center rounded-2xl border-glow-pink/20">
            <Star size={16} className="text-glow-pink mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Difficulty</p>
            <p className="text-sm font-bold text-foreground">{career.difficulty}</p>
          </div>
        </div>

        {/* 2. What people actually do */}
        <Card title="What people in this job actually do" icon={<BookOpen size={16} className="text-primary" />}>
          <p className="text-sm text-muted-foreground leading-relaxed">{heroDescription}</p>
          <div className="space-y-2 mt-3 pt-3 border-t border-border/50">
            {career.dailyLife.split(", ").slice(0, 5).map((task, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-primary font-bold text-sm">{i + 1}.</span>
                <span className="text-sm text-muted-foreground capitalize">{task.replace(/\.$/, "")}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Day in the Life (from DB) */}
        {dayInTheLife && (
          <Card title="A day in the life" icon={<Clock size={16} className="text-glow-purple" />}>
            <p className="text-sm text-muted-foreground leading-relaxed">{dayInTheLife}</p>
          </Card>
        )}

        {/* Skills — merge DB skills with detailed explanations */}
        <Card title="Key Skills" icon={<Zap size={16} className="text-primary" />}>
          <div className="space-y-3">
            {(enrichedSkills && enrichedSkills.length > 0
              ? enrichedSkills.slice(0, 6).map((s) => {
                  const detail = skills.find((d) => d.name.toLowerCase() === s.name.toLowerCase());
                  return { name: s.name, explanation: detail?.explanation || `Understanding ${s.name.toLowerCase()} helps you solve real problems and stand out in this career.`, resourceUrl: detail?.resourceUrl, resourceLabel: detail?.resourceLabel };
                })
              : skills
            ).map((s) => (
              <div key={s.name} className="glass-card p-3 rounded-xl space-y-1.5">
                <p className="text-sm font-bold text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.explanation}</p>
                {s.resourceUrl && (
                  <a href={s.resourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline mt-1">
                    🔗 {s.resourceLabel || "Start learning free"} <ChevronRight size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Work Values from DB */}
        {workValues && workValues.length > 0 && (
          <Card title="Work Values" icon={<Award size={16} className="text-glow-pink" />}>
            <div className="flex flex-wrap gap-1.5">
              {workValues.map((v, i) => (
                <span key={i} className="fact-pill text-foreground">{v}</span>
              ))}
            </div>
          </Card>
        )}

        {/* Entry Requirements from DB */}
        {entryRequirements && (
          <Card title="Entry Requirements" icon={<GraduationCap size={16} className="text-glow-purple" />}>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{entryRequirements}</p>
          </Card>
        )}

        {/* Career Progression from DB */}
        {careerPath && (
          <Card title="Career Progression" icon={<TrendingUp size={16} className="text-landing-mint" />}>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{careerPath}</p>
          </Card>
        )}

        {/* Salary from DB salary_context */}
        {salaryIsEmpty ? null : null}
        {/* We override the existing salary section below if DB salary_context exists */}

        {/* 3. A Day in the Life + Get Inspired — side-by-side */}
        {/* // TODO: Replace YouTube search with Findr-produced custom videos per career. video_library table in Supabase is already structured for custom video_ids per career_id + video_type. Swap search query for DB lookup once custom videos are ready. */}
        <div className="grid grid-cols-2 gap-3">
          <a href={career.dayInLifeVideo} target="_blank" rel="noopener noreferrer" className="glass-card-hover rounded-2xl overflow-hidden">
            <div className="relative aspect-video bg-muted/30 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Play size={18} className="text-primary ml-0.5" />
              </div>
            </div>
            <div className="p-3 space-y-1">
              <p className="text-xs font-bold text-foreground">A Day in the Life</p>
              <p className="text-[10px] text-muted-foreground">See what it's really like</p>
            </div>
          </a>
          <a href={career.encouragementVideo} target="_blank" rel="noopener noreferrer" className="glass-card-hover rounded-2xl overflow-hidden">
            <div className="relative aspect-video bg-glow-purple/10 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-glow-purple/20 flex items-center justify-center">
                <Play size={18} className="text-glow-purple ml-0.5" />
              </div>
            </div>
            <div className="p-3 space-y-1">
              <p className="text-xs font-bold text-foreground">Get Inspired By {career.encouragementFigure !== "Industry leaders" ? career.encouragementFigure : "an Industry Leader"}</p>
              <p className="text-[10px] text-muted-foreground">Career story & interview</p>
            </div>
          </a>
        </div>

        {/* 4. Subjects that help */}
        <Card title="Subjects that help you get here" icon={<GraduationCap size={16} className="text-glow-purple" />}>
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">High School Subjects</p>
            <div className="flex flex-wrap gap-1.5">
              {(career.recommendedSubjects.length >= 3
                ? career.recommendedSubjects
                : [...career.recommendedSubjects, ...["English", "Mathematics", "ICT"].filter(s => !career.recommendedSubjects.includes(s))]
              ).slice(0, 5).map((s) => (
                <span key={s} className="fact-pill text-glow-purple border-glow-purple/20">{s}</span>
              ))}
            </div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mt-2">University Courses</p>
            <div className="flex flex-wrap gap-1.5">
              {(dbCareer?.recommended_subjects?.filter((s: string) => s.toLowerCase().includes("degree") || s.toLowerCase().includes("university") || s.toLowerCase().includes("bsc") || s.toLowerCase().includes("bachelor"))?.length > 0
                ? dbCareer.recommended_subjects.filter((s: string) => s.toLowerCase().includes("degree") || s.toLowerCase().includes("university") || s.toLowerCase().includes("bsc") || s.toLowerCase().includes("bachelor"))
                : [`${career.category} Studies`, `${career.title}-related degree`]
              ).slice(0, 2).map((s: string) => (
                <span key={s} className="fact-pill text-primary border-primary/20">🎓 {s}</span>
              ))}
            </div>
          </div>
        </Card>

        {/* 5. Is this job growing? */}
        <Card title="Is this job growing in the future?" icon={<TrendingUp size={16} className="text-landing-mint" />}>
          <div className="flex items-center gap-2 mb-2">
            <span className={demandClass[career.jobOutlook] || "demand-stable"}>{career.jobOutlook}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{career.futureGrowth}</p>
        </Card>

        {/* Salary section removed — same as Average Pay in quick stats */}

        {/* 7. Meet the people — horizontal swipeable */}
        <Card title="Meet the people" icon={<Users size={16} className="text-glow-pink" />}>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1" style={{ scrollbarWidth: "none" }}>
            {roleModels.map((rm) => (
              <RoleModelSwipeCard key={rm.name} profile={rm} />
            ))}
          </div>
        </Card>

        {/* Why this job matters */}
        <Card title="Why this job matters 🌍" icon={<Star size={16} className="text-landing-mint" />}>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {growthOutlook
              ? `${career.title}s play a vital role in ${career.category.toLowerCase()}. ${career.worldImpact} ${career.futureGrowth}`
              : career.worldImpact}
          </p>
        </Card>

        {/* 8. Try This Career — Missions (GATED) */}
        <Card title="🎯 Try This Career — Fun Missions!" icon={<Target size={16} className="text-glow-pink" />}>
          <p className="text-xs text-muted-foreground mb-3">Complete these challenges to earn XP and badges!</p>
          {missions.length > 0 ? (
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
                          <p className="text-[10px] text-muted-foreground">⏱️ {m.timeMinutes} min • ⚡ {m.xpReward} XP{m.badge ? ` • 🏆 ${m.badge}` : ""}</p>
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
                      <LockedOverlay label="Set Active Path to start">
                        <button
                          onClick={() => handleCompleteMission(m.id, m.xpReward, m.badge)}
                          className="w-full btn-primary-glow text-xs py-2.5 flex items-center justify-center gap-1"
                        >
                          ✅ I did this! Claim {m.xpReward} XP
                        </button>
                      </LockedOverlay>
                    )}
                    {done && m.badge && (
                      <p className="text-xs text-primary font-bold text-center">🏆 Badge earned: {m.badge}</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="glass-card p-4 rounded-xl text-center space-y-2">
              <p className="text-sm text-muted-foreground">Missions for {career.title} are being created!</p>
            </div>
          )}
        </Card>

        {/* Duplicate skills section removed — kept Key Skills above */}

        {/* Step-by-step plan removed */}

        {/* 11. Opportunities / Internships (GATED) */}
        {internshipList.length > 0 && (
          <Card title="🏢 Opportunities" icon={<Briefcase size={16} className="text-glow-purple" />}>
            <p className="text-xs text-muted-foreground mb-3">Shadow opportunities and internships:</p>
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
                    <LockedOverlay label="Set Active Path to apply">
                      <button
                        onClick={() => !applied && handleApplyInternship(intern.id)}
                        disabled={applied}
                        className={`w-full text-xs py-2.5 rounded-xl font-bold transition-all ${
                          applied ? "bg-primary/10 text-primary border border-primary/20" : "btn-primary-glow"
                        } flex items-center justify-center gap-1`}
                      >
                        {applied ? "✅ Applied!" : "📩 Apply Now"}
                      </button>
                    </LockedOverlay>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* 12. Imagine you — single future scenario */}
        {imagineScenarios.length > 0 && (() => {
          const entryAge = 18 + career.timelineYears;
          const bestScenario = imagineScenarios.reduce((closest, s) =>
            Math.abs(s.age - entryAge) < Math.abs(closest.age - entryAge) ? s : closest
          , imagineScenarios[0]);
          return (
            <div className="glass-card p-5 rounded-2xl space-y-3 neon-border">
              <h3 className="font-bold text-foreground flex items-center gap-2 text-sm">
                🔮 Imagine you at age {bestScenario.age}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-glow-purple bg-glow-purple/10 px-2.5 py-1 rounded-full">Age {bestScenario.age}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{bestScenario.text}</p>
            </div>
          );
        })()}

        {/* 13. Career Roadmap & Opportunities buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => navigate(`/roadmap/${career.id}`)} className="glass-card-hover p-4 rounded-2xl text-left space-y-2">
            <div className="w-9 h-9 rounded-xl bg-glow-purple/20 flex items-center justify-center">
              <MapPin size={18} className="text-glow-purple" />
            </div>
            <p className="text-sm font-bold text-foreground">Career Roadmap</p>
            <p className="text-[10px] text-muted-foreground">Step-by-step path</p>
          </button>
          <button onClick={() => navigate("/opportunities")} className="glass-card-hover p-4 rounded-2xl text-left space-y-2">
            <div className="w-9 h-9 rounded-xl bg-glow-pink/20 flex items-center justify-center">
              <GraduationCap size={18} className="text-glow-pink" />
            </div>
            <p className="text-sm font-bold text-foreground">Opportunities</p>
            <p className="text-[10px] text-muted-foreground">Scholarships & more</p>
          </button>
        </div>

        {/* 14. Ask AI Mentor */}
        <button onClick={() => setChatOpen(true)} className="w-full glass-card-hover p-4 rounded-2xl flex items-center gap-3 border-landing-mint/20">
          <div className="w-10 h-10 rounded-xl bg-landing-mint/20 flex items-center justify-center">
            <Bot size={20} className="text-landing-mint" />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm font-bold text-foreground">Got questions about {career.title}?</p>
            <p className="text-[10px] text-muted-foreground">Ask Findr AI — your career mentor</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>

        {/* Action pills — compact row */}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShareOpen(true)} className="flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-2 border border-border bg-muted/30 active:scale-95 transition-transform text-muted-foreground">
            <Share2 size={12} /> Share
          </button>
          <button
            onClick={() => toggleSavedCareer(career.id)}
            className={`flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-2 border active:scale-95 transition-transform ${
              saved ? "bg-accent/20 text-accent border-accent/30" : "border-border bg-muted/30 text-muted-foreground"
            }`}
          >
            <Heart size={12} className={saved ? "fill-accent" : ""} />
            {saved ? "Saved" : "Save"}
          </button>
          {!isActivePath ? (
            <button
              onClick={handleSetActivePath}
              className="flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-2 bg-primary text-primary-foreground active:scale-95 transition-transform"
            >
              <Shield size={12} /> Set Active Path
            </button>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-2 bg-primary/15 text-primary border border-primary/30">
              <Shield size={12} /> Active Path 🟢
            </span>
          )}
        </div>

        {/* I'm done exploring — only when active */}
        {isActivePath && (
          <button
            onClick={() => {
              setSelectedCareerPath(null);
              toast.success("You've exited this path. Your progress is saved!");
              navigate(-1);
            }}
            className="w-full text-xs text-muted-foreground underline py-2"
          >
            I'm done exploring this path
          </button>
        )}
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

      <SetActivePathModal
        open={showSetActiveModal}
        onClose={() => setShowSetActiveModal(false)}
        onSetActive={handleSetActivePath}
        careerTitle={career.title}
        careerEmoji={career.emoji}
      />

      <SwitchPathModal
        open={showSwitchModal}
        onClose={() => setShowSwitchModal(false)}
        onSwitch={handleSwitchPath}
        onSaveAndContinue={handleSaveAndContinue}
        currentCareerTitle={currentActiveCareer?.title || "another career"}
        newCareerTitle={career.title}
        newCareerEmoji={career.emoji}
      />
    </div>
  );
}

/* --- Sub-components --- */

function RoleModelSwipeCard({ profile }: { profile: RoleModelProfile }) {
  return (
    <div className="flex-shrink-0 w-[160px] glass-card rounded-2xl overflow-hidden">
      <img
        src={profile.photoUrl}
        alt={profile.name}
        className="w-full h-32 object-cover"
        loading="lazy"
      />
      <div className="p-2.5 space-y-0.5">
        <p className="text-xs font-bold text-foreground truncate">{profile.name}</p>
        <p className="text-[10px] text-muted-foreground truncate">{profile.title}</p>
        <p className="text-[10px] text-glow-purple font-semibold truncate">{profile.company}</p>
      </div>
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
