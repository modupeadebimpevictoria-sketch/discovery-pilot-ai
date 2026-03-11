import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Clock, CheckCircle, Loader2, Zap } from "lucide-react";
import { toast } from "sonner";

interface SkillPrompt {
  id: string;
  career_id: string;
  family_id: string;
  skill_name: string;
  level: number;
  prompt_text: string;
  prompt_format: "write" | "observe" | "analyse";
  estimated_minutes: number;
  xp_reward: number;
  sort_order: number;
}

interface UserSkillProgress {
  skill_name: string;
  career_id: string;
  level_reached: number;
  prompts_completed: number;
}

const levelLabels = ["Beginner", "Developing", "Practising"];
const levelEmojis = ["🌱", "📈", "⭐"];
const formatEmojis: Record<string, string> = { write: "✍️", observe: "👀", analyse: "🔍" };
const formatLabels: Record<string, string> = { write: "Write", observe: "Observe", analyse: "Analyse" };

export default function SkillsView() {
  const navigate = useNavigate();
  const { selectedCareerPath, matchedCareers, user, addXp, addBadge } = useApp();
  const [prompts, setPrompts] = useState<SkillPrompt[]>([]);
  const [skillProgress, setSkillProgress] = useState<Map<string, UserSkillProgress>>(new Map());
  const [completedPromptIds, setCompletedPromptIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const careerId = selectedCareerPath || matchedCareers[0]?.careerId || null;

  useEffect(() => {
    if (!careerId || !user) return;
    const fetchData = async () => {
      setLoading(true);
      const [promptsRes, progressRes, missionProgressRes] = await Promise.all([
        supabase
          .from("skill_prompts")
          .select("*")
          .eq("is_active", true)
          .or(`career_id.eq.${careerId},career_id.eq.`)
          .order("skill_name")
          .order("level")
          .order("sort_order"),
        supabase
          .from("user_skill_progress")
          .select("*")
          .eq("user_id", user.id)
          .eq("career_id", careerId),
        // We track which prompts are done via user_mission_progress (reuse pattern)
        // For now, track via skill_progress prompts_completed count
        supabase
          .from("user_skill_progress")
          .select("skill_name, prompts_completed, level_reached")
          .eq("user_id", user.id),
      ]);
      setPrompts((promptsRes.data as SkillPrompt[]) || []);
      const progMap = new Map<string, UserSkillProgress>();
      (progressRes.data || []).forEach((p: any) => progMap.set(p.skill_name, p));
      setSkillProgress(progMap);
      setLoading(false);
    };
    fetchData();
  }, [careerId, user]);

  if (!careerId) {
    return (
      <div className="flex items-center justify-center px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 max-w-xs">
          <Lock size={48} className="text-muted-foreground mx-auto" />
          <h2 className="text-xl font-bold text-foreground">Set Your Active Path</h2>
          <p className="text-sm text-muted-foreground">Set a career as your Active Path to unlock skill development</p>
          <button onClick={() => navigate("/universe")} className="btn-primary-glow w-full">Explore Careers</button>
        </motion.div>
      </div>
    );
  }

  const submitPrompt = async (prompt: SkillPrompt) => {
    if (!user || !responseText.trim()) return;
    setSubmitting(true);

    const existing = skillProgress.get(prompt.skill_name);
    const newCompleted = (existing?.prompts_completed || 0) + 1;

    // Upsert skill progress
    if (existing) {
      await supabase
        .from("user_skill_progress")
        .update({
          prompts_completed: newCompleted,
          level_reached: prompt.level,
          last_completed_at: new Date().toISOString(),
        } as any)
        .eq("user_id", user.id)
        .eq("skill_name", prompt.skill_name)
        .eq("career_id", careerId);
    } else {
      await supabase.from("user_skill_progress").insert({
        user_id: user.id,
        skill_name: prompt.skill_name,
        career_id: careerId,
        level_reached: prompt.level,
        prompts_completed: 1,
        last_completed_at: new Date().toISOString(),
      } as any);
    }

    setSkillProgress((prev) => {
      const next = new Map(prev);
      next.set(prompt.skill_name, {
        skill_name: prompt.skill_name,
        career_id: careerId!,
        level_reached: prompt.level,
        prompts_completed: newCompleted,
      });
      return next;
    });
    setCompletedPromptIds((prev) => new Set([...prev, prompt.id]));
    addXp(prompt.xp_reward);
    toast.success(`+${prompt.xp_reward} XP! Skill prompt completed! 🎉`);

    // Check for badge (all prompts at a level done)
    const levelPrompts = prompts.filter((p) => p.skill_name === prompt.skill_name && p.level === prompt.level);
    const levelCompleted = levelPrompts.filter((p) => completedPromptIds.has(p.id) || p.id === prompt.id).length;
    if (levelCompleted >= levelPrompts.length) {
      const badge = `${prompt.skill_name} — ${levelLabels[prompt.level - 1]} ✓`;
      addBadge(badge);
      toast.success(`🏅 Badge earned: ${badge}`);
    }

    setSubmitting(false);
    setExpandedPrompt(null);
    setResponseText("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-primary" />
      </div>
    );
  }

  // Group by skill name
  const skillGroups = new Map<string, SkillPrompt[]>();
  prompts.forEach((p) => {
    const existing = skillGroups.get(p.skill_name) || [];
    existing.push(p);
    skillGroups.set(p.skill_name, existing);
  });

  if (skillGroups.size === 0) {
    return (
      <div className="glass-card p-8 rounded-2xl text-center">
        <span className="text-3xl">⚡</span>
        <p className="text-sm font-semibold text-foreground mt-2">No skill prompts available yet</p>
        <p className="text-[10px] text-muted-foreground">Skill prompts will appear here once an admin creates them for your career path</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-bold text-foreground mb-1">Skill Development ⚡</h2>
        <p className="text-[10px] text-muted-foreground mb-3">Build real skills with guided prompts — 3 levels per skill</p>
      </div>

      {Array.from(skillGroups.entries()).map(([skillName, skillPrompts]) => {
        const prog = skillProgress.get(skillName);
        const currentLevel = prog?.level_reached || 0;

        return (
          <div key={skillName} className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-primary" />
              <p className="text-sm font-bold text-foreground">{skillName}</p>
              {currentLevel > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-bold">
                  {levelEmojis[currentLevel - 1]} {levelLabels[currentLevel - 1]}
                </span>
              )}
            </div>

            {[1, 2, 3].map((level) => {
              const levelPromptsForSkill = skillPrompts.filter((p) => p.level === level);
              if (levelPromptsForSkill.length === 0) return null;
              const isLocked = level > (currentLevel || 0) + 1;

              return (
                <div key={level} className={`ml-4 ${isLocked ? "opacity-40" : ""}`}>
                  <p className="text-[10px] font-bold text-muted-foreground mb-1">
                    {levelEmojis[level - 1]} Level {level}: {levelLabels[level - 1]}
                  </p>
                  <div className="space-y-2">
                    {levelPromptsForSkill.map((prompt) => {
                      const isDone = completedPromptIds.has(prompt.id);
                      const expanded = expandedPrompt === prompt.id;

                      return (
                        <motion.div
                          key={prompt.id}
                          className={`glass-card rounded-xl overflow-hidden ${isDone ? "border-primary/30 bg-primary/5" : ""}`}
                        >
                          <button
                            onClick={() => !isLocked && setExpandedPrompt(expanded ? null : prompt.id)}
                            disabled={isLocked}
                            className="w-full p-3 flex items-start gap-3 text-left"
                          >
                            <span className="text-lg">{formatEmojis[prompt.prompt_format]}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-foreground">{prompt.prompt_text}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[9px] text-muted-foreground capitalize">{formatLabels[prompt.prompt_format]}</span>
                                <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                                  <Clock size={9} /> {prompt.estimated_minutes} min
                                </span>
                                <span className="text-[10px] font-bold text-primary">💎 {prompt.xp_reward} XP</span>
                              </div>
                            </div>
                            {isDone && <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />}
                          </button>

                          {expanded && !isDone && !isLocked && (
                            <div className="px-3 pb-3 space-y-2">
                              <textarea
                                value={responseText}
                                onChange={(e) => setResponseText(e.target.value)}
                                placeholder={
                                  prompt.prompt_format === "write"
                                    ? "Write 2–5 sentences..."
                                    : prompt.prompt_format === "observe"
                                    ? "Describe what you observed..."
                                    : "Break it down and analyse..."
                                }
                                className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary min-h-[80px]"
                              />
                              <button
                                onClick={() => submitPrompt(prompt)}
                                disabled={submitting || !responseText.trim()}
                                className="w-full btn-primary-glow text-xs flex items-center justify-center gap-2 py-2"
                              >
                                {submitting ? <Loader2 size={14} className="animate-spin" /> : <><CheckCircle size={14} /> Submit</>}
                              </button>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
