import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { getCareerById } from "@/data/careers";
import { missions } from "@/data/missions";
import { internships } from "@/data/internships";
import { weeklyQuests } from "@/data/weeklyQuests";
import { skillDetails } from "@/data/skillDetails";
import { supabase } from "@/integrations/supabase/client";
import {
  ChevronLeft, Award, Briefcase, Trophy, Target,
  Zap, CheckCircle, Share2, Download, Link2, Stamp, Sparkles, ExternalLink, Compass
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import ShareModal from "@/components/ShareModal";

const LEVEL_TITLES = ["Starter", "Explorer", "Discoverer", "Orbiter", "Navigator", "Trailblazer", "Pioneer", "Visionary", "Master", "Legend"];

const STAMP_MILESTONES = [
  { id: "first-quest", label: "First Quest", emoji: "⚡", condition: (ctx: any) => ctx.completedQuests.length >= 1 },
  { id: "first-mission", label: "First Mission", emoji: "🎯", condition: (ctx: any) => ctx.completedMissions.length >= 1 },
  { id: "explorer-5", label: "5 Careers Saved", emoji: "🔭", condition: (ctx: any) => ctx.savedCareers.length >= 5 },
  { id: "mission-3", label: "3 Missions Done", emoji: "🚀", condition: (ctx: any) => ctx.completedMissions.length >= 3 },
  { id: "quest-5", label: "5 Quests Done", emoji: "🔥", condition: (ctx: any) => ctx.completedQuests.length >= 5 },
  { id: "applied-1", label: "First Application", emoji: "💼", condition: (ctx: any) => ctx.appliedInternships.length >= 1 },
  { id: "badge-1", label: "First Badge", emoji: "🏆", condition: (ctx: any) => ctx.badges.length >= 1 },
  { id: "xp-500", label: "500 XP Club", emoji: "⭐", condition: (ctx: any) => ctx.xp >= 500 },
  { id: "path-set", label: "Path Chosen", emoji: "🧭", condition: (ctx: any) => !!ctx.selectedCareerPath },
  { id: "milestone-10", label: "10 Milestones", emoji: "🎖️", condition: (ctx: any) => ctx.completedMilestones.length >= 10 },
  { id: "quest-10", label: "10 Quests Done", emoji: "💎", condition: (ctx: any) => ctx.completedQuests.length >= 10 },
  { id: "xp-1000", label: "1K XP Legend", emoji: "👑", condition: (ctx: any) => ctx.xp >= 1000 },
];

export default function CareerPassport() {
  const navigate = useNavigate();
  const ctx = useApp();
  const {
    profile, matchedCareers, archetype, savedCareers, badges,
    completedMissions, completedQuests, completedMilestones,
    xp, appliedInternships, selectedCareerPath, skillXp
  } = ctx;
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exploredOpps, setExploredOpps] = useState<any[]>([]);

  // Fetch explored opportunities
  useEffect(() => {
    if (!ctx.user) return;
    const fetch = async () => {
      const { data: apps } = await supabase
        .from("user_opportunity_applications")
        .select("opportunity_id, applied_at")
        .eq("user_id", ctx.user!.id)
        .order("applied_at", { ascending: false });
      if (!apps || apps.length === 0) return;
      const ids = apps.map((a: any) => a.opportunity_id);
      const { data: opps } = await supabase
        .from("admin_opportunities")
        .select("id, title, organisation, type, application_url")
        .in("id", ids);
      setExploredOpps(opps || []);
    };
    fetch();
  }, [ctx.user]);

  const careerId = selectedCareerPath || matchedCareers[0]?.careerId;
  const career = careerId ? getCareerById(careerId) : null;
  const level = Math.min(10, Math.floor(xp / 100) + 1);

  // Stamp book
  const stamps = STAMP_MILESTONES.map((s) => ({ ...s, earned: s.condition(ctx) }));
  const earnedCount = stamps.filter((s) => s.earned).length;

  // Skill tags cloud — gather from career skills + skillXp keys
  const skillTags = useMemo(() => {
    const tags: { name: string; xp: number }[] = [];
    const seen = new Set<string>();

    // From skillXp
    Object.entries(skillXp).forEach(([key, val]) => {
      if (!seen.has(key)) { seen.add(key); tags.push({ name: key, xp: val }); }
    });

    // From career skills
    if (career) {
      career.skills.forEach((s) => {
        const k = s.toLowerCase();
        if (!seen.has(k)) { seen.add(k); tags.push({ name: s, xp: 0 }); }
      });
    }

    // From skill details for careerId
    if (careerId && skillDetails[careerId]) {
      skillDetails[careerId].forEach((sd) => {
        const k = sd.name.toLowerCase();
        if (!seen.has(k)) { seen.add(k); tags.push({ name: sd.name, xp: 0 }); }
      });
    }

    return tags.sort((a, b) => b.xp - a.xp);
  }, [skillXp, career, careerId]);

  const completedMissionData = missions.filter((m) => completedMissions.includes(m.id));
  const completedQuestData = weeklyQuests.filter((q) => completedQuests.includes(q.id));
  const appliedInternshipData = internships.filter((i) => appliedInternships.includes(i.id));

  const stats = [
    { icon: "🎯", label: "Milestones", value: completedMilestones.length },
    { icon: "⚡", label: "Missions", value: completedMissions.length },
    { icon: "🔥", label: "Quests", value: completedQuests.length },
    { icon: "🏆", label: "Badges", value: badges.length },
    { icon: "💼", label: "Applications", value: appliedInternships.length },
    { icon: "⭐", label: "Total XP", value: xp },
  ];

  const handleCopyLink = () => {
    const summaryText = [
      `🎒 ${profile?.name || "Student"}'s SpringBoard Career Passport`,
      career ? `🧭 Active Path: ${career.emoji} ${career.title}` : "",
      `⭐ Level ${level} ${LEVEL_TITLES[level - 1]} • ${xp} XP`,
      `📊 ${completedMissions.length} missions • ${completedQuests.length} quests • ${badges.length} badges`,
      `🔗 ${window.location.origin}/passport`,
    ].filter(Boolean).join("\n");
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    const hr = "═══════════════════════════════════════════";
    const lines = [
      hr,
      "        🎒 SPRINGBOARD CAREER PASSPORT",
      hr,
      "",
      `👤 Name:       ${profile?.name || "Student"}`,
      `📚 Grade:      ${profile?.grade || "N/A"}`,
      `🌍 Country:    ${profile?.country || "N/A"}`,
      career ? `🧭 Active Path: ${career.emoji} ${career.title}` : "",
      `🎭 Archetype:  ${archetype || "N/A"}`,
      `⭐ Level:      ${level} — ${LEVEL_TITLES[level - 1]}`,
      `💫 Total XP:   ${xp}`,
      "",
      "── 📊 Achievement Summary ──",
      `  Milestones Completed: ${completedMilestones.length}`,
      `  Missions Completed:   ${completedMissions.length}`,
      `  Quests Completed:     ${completedQuests.length}`,
      `  Badges Earned:        ${badges.length}`,
      `  Applications Sent:    ${appliedInternships.length}`,
      "",
      `── 🎫 Stamps Earned (${earnedCount}/${stamps.length}) ──`,
      ...stamps.filter((s) => s.earned).map((s) => `  ${s.emoji} ${s.label}`),
      "",
    ];

    if (badges.length > 0) {
      lines.push("── 🏆 Badges ──");
      badges.forEach((b) => lines.push(`  🏆 ${b}`));
      lines.push("");
    }

    if (skillTags.length > 0) {
      lines.push("── 🏷️ Skills ──");
      skillTags.slice(0, 12).forEach((t) =>
        lines.push(`  • ${t.name}${t.xp > 0 ? ` (${t.xp} XP)` : ""}`)
      );
      lines.push("");
    }

    if (completedMissionData.length > 0) {
      lines.push("── 🎯 Missions Completed ──");
      completedMissionData.forEach((m) => lines.push(`  ${m.emoji} ${m.title}`));
      lines.push("");
    }

    if (completedQuestData.length > 0) {
      lines.push("── ⚡ Quests Completed ──");
      completedQuestData.forEach((q) => lines.push(`  ${q.emoji} ${q.title} (+${q.xpReward} XP)`));
      lines.push("");
    }

    if (appliedInternshipData.length > 0) {
      lines.push("── 💼 Applications ──");
      appliedInternshipData.forEach((i) => lines.push(`  ${i.emoji} ${i.title} @ ${i.company}`));
      lines.push("");
    }

    lines.push(hr);
    lines.push(`Generated by SpringBoard • ${new Date().toLocaleDateString()}`);
    lines.push("Share with universities, mentors, or employers!");
    lines.push(hr);

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SpringBoard_Passport_${profile?.name || "Student"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground text-sm">
            <ChevronLeft size={18} /> Back
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleCopyLink}
              className="h-9 px-3 rounded-xl bg-card border border-border flex items-center gap-1.5 text-xs font-medium text-foreground"
            >
              <Link2 size={14} />
              {copied ? "Copied! ✅" : "Share"}
            </button>
            <button
              onClick={handleDownloadPDF}
              className="h-9 px-3 rounded-xl bg-primary text-primary-foreground flex items-center gap-1.5 text-xs font-medium"
            >
              <Download size={14} /> Download
            </button>
            <button onClick={() => setShareOpen(true)} className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center">
              <Share2 size={16} className="text-foreground" />
            </button>
          </div>
        </div>

        {/* Passport Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border p-6 rounded-2xl text-center space-y-3 relative overflow-hidden"
        >
          {/* Decorative corner stamps */}
          <div className="absolute top-2 left-2 text-primary/10 text-4xl">🎒</div>
          <div className="absolute bottom-2 right-2 text-primary/10 text-4xl">✈️</div>

          <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center text-2xl font-bold text-primary-foreground">
            {profile?.name?.[0]?.toUpperCase() || "?"}
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{profile?.name || "Student"}</h1>
            <p className="text-sm text-muted-foreground">Career Passport</p>
          </div>
          {career && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">{career.emoji}</span>
              <span className="text-sm font-semibold text-primary">Future {career.title}</span>
            </div>
          )}
          <div className="flex items-center justify-center gap-2">
            <div className="px-3 py-1 rounded-full bg-primary text-xs font-bold text-primary-foreground">
              Level {level} • {LEVEL_TITLES[level - 1]}
            </div>
            <div className="px-3 py-1 rounded-full bg-accent/10 text-xs font-bold text-accent-foreground">
              {xp} XP
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="bg-card border border-border p-3 text-center rounded-2xl">
              <span className="text-lg">{s.icon}</span>
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ STAMP BOOK ═══ */}
      <div className="px-5 mb-6">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2 mb-1">
          <Stamp size={16} className="text-primary" /> Stamp Book
        </h2>
        <p className="text-xs text-muted-foreground mb-3">
          {earnedCount}/{stamps.length} stamps collected
        </p>
        <div className="grid grid-cols-4 gap-2">
          {stamps.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className={`relative aspect-square rounded-xl flex flex-col items-center justify-center gap-1 border transition-all ${
                s.earned
                  ? "bg-primary/10 border-primary/30"
                  : "bg-muted/50 border-border opacity-40"
              }`}
            >
              <span className={`text-xl ${s.earned ? "" : "grayscale"}`}>{s.emoji}</span>
              <span className="text-[8px] font-medium text-foreground text-center leading-tight px-1">
                {s.label}
              </span>
              {s.earned && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                >
                  <CheckCircle size={10} className="text-primary-foreground" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ SKILL TAGS CLOUD ═══ */}
      {skillTags.length > 0 && (
        <div className="px-5 mb-6">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-primary" /> Skill Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {skillTags.map((tag, i) => {
              const intensity = tag.xp > 0 ? Math.min(1, tag.xp / 100) : 0;
              return (
                <motion.span
                  key={tag.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    tag.xp > 0
                      ? "bg-primary/10 border-primary/30 text-foreground"
                      : "bg-muted border-border text-muted-foreground"
                  }`}
                  style={tag.xp > 0 ? { boxShadow: `0 0 ${intensity * 12}px hsl(var(--primary) / ${intensity * 0.3})` } : {}}
                >
                  {tag.name}
                  {tag.xp > 0 && (
                    <span className="text-[10px] font-bold text-primary">{tag.xp}</span>
                  )}
                </motion.span>
              );
            })}
          </div>
        </div>
      )}

      {/* Badges */}
      {badges.length > 0 && (
        <div className="px-5 mb-6">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 mb-3">
            <Award size={16} className="text-primary" /> Badges Earned
          </h2>
          <div className="flex gap-2 flex-wrap">
            {badges.map((b, i) => (
              <motion.span
                key={b}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="px-3 py-2 rounded-full text-xs font-bold bg-primary text-primary-foreground"
              >
                🏆 {b}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Completed Missions */}
      {completedMissionData.length > 0 && (
        <div className="px-5 mb-6">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 mb-3">
            <Target size={16} className="text-accent-foreground" /> Missions Completed
          </h2>
          <div className="space-y-2">
            {completedMissionData.map((m) => (
              <div key={m.id} className="bg-card border border-border p-3 rounded-xl flex items-center gap-3">
                <span className="text-xl">{m.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{m.title}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{m.description}</p>
                </div>
                <CheckCircle size={16} className="text-primary shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Quests */}
      {completedQuestData.length > 0 && (
        <div className="px-5 mb-6">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 mb-3">
            <Zap size={16} className="text-secondary" /> Quests Completed
          </h2>
          <div className="space-y-2">
            {completedQuestData.map((q) => (
              <div key={q.id} className="bg-card border border-border p-3 rounded-xl flex items-center gap-3">
                <span className="text-xl">{q.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{q.title}</p>
                  <p className="text-[10px] text-muted-foreground">{q.skillTag}</p>
                </div>
                <span className="text-[10px] font-bold text-primary shrink-0">+{q.xpReward} XP</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Applications */}
      {appliedInternshipData.length > 0 && (
        <div className="px-5 mb-6">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2 mb-3">
            <Briefcase size={16} className="text-secondary" /> Applications
          </h2>
          <div className="space-y-2">
            {appliedInternshipData.map((i) => (
              <div key={i.id} className="bg-card border border-border p-3 rounded-xl flex items-center gap-3">
                <span className="text-xl">{i.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{i.title}</p>
                  <p className="text-[10px] text-muted-foreground">{i.company}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/10 text-primary shrink-0">Applied ✓</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {completedMissionData.length === 0 && completedQuestData.length === 0 && badges.length === 0 && earnedCount === 0 && (
        <div className="px-5">
          <div className="bg-card border border-border p-8 rounded-2xl text-center space-y-3">
            <span className="text-5xl">🎒</span>
            <h2 className="text-lg font-bold text-foreground">Your Passport is Empty!</h2>
            <p className="text-sm text-muted-foreground">
              Complete missions, quests, and milestones to fill your stamp book and build your Career Passport.
            </p>
            <button onClick={() => navigate("/quests")} className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
              Start a Quest
            </button>
          </div>
        </div>
      )}

      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        careerTitle={career?.title || "career"}
        careerEmoji={career?.emoji || "🎯"}
        score={matchedCareers[0]?.score}
        archetype={archetype}
      />
    </div>
  );
}
