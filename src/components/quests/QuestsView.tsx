import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Clock, CheckCircle, Flame, ChevronRight, Loader2, ExternalLink, Play } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface Quest {
  id: string;
  career_id: string;
  family_id: string;
  title: string;
  brief: string | null;
  instructions: string | null;
  quest_type: "research" | "challenge" | "create" | "watch" | "explore";
  resource_url: string | null;
  estimated_minutes: number;
  xp_reward: number;
  skill_tag: string;
  badge_id: string | null;
  week_number: number;
  grade_band: string;
  is_active: boolean;
  flagged: boolean;
  created_by: string;
}

interface QuestProgress {
  quest_id: string;
  status: string;
  response_text: string | null;
}

const typeEmojis: Record<string, string> = {
  research: "🔬",
  challenge: "🏆",
  create: "✨",
  watch: "🎬",
  explore: "🌍",
};

function getCurrentWeekNumber(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  return Math.ceil(diff / (7 * 24 * 60 * 60 * 1000));
}

export default function QuestsView() {
  const navigate = useNavigate();
  const { selectedCareerPath, matchedCareers, user, addXp, addBadge, profile } = useApp();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [progress, setProgress] = useState<Map<string, QuestProgress>>(new Map());
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const careerId = selectedCareerPath || matchedCareers[0]?.careerId || null;
  const weekNumber = getCurrentWeekNumber();

  // Determine grade band from profile
  const gradeBand = (() => {
    const g = profile?.grade;
    if (!g) return "9-10";
    if (g === "uni-1" || g === "uni-2") return "university-1-2";
    const num = parseInt(g);
    if (num <= 10) return "9-10";
    return "11-12";
  })();

  useEffect(() => {
    if (!careerId || !user) return;
    const fetchData = async () => {
      setLoading(true);
      const [questsRes, progressRes] = await Promise.all([
        supabase
          .from("quests")
          .select("*")
          .eq("is_active", true)
          .eq("flagged", false)
          .eq("grade_band", gradeBand)
          .or(`career_id.eq.${careerId},career_id.eq.`)
          .order("week_number", { ascending: false })
          .limit(20),
        supabase
          .from("user_quest_progress")
          .select("quest_id, status, response_text")
          .eq("user_id", user.id),
      ]);
      setQuests((questsRes.data as Quest[]) || []);
      const progMap = new Map<string, QuestProgress>();
      (progressRes.data || []).forEach((p: any) => progMap.set(p.quest_id, p));
      setProgress(progMap);
      setLoading(false);
    };
    fetchData();
  }, [careerId, user, gradeBand]);

  if (!careerId) {
    return (
      <div className="flex items-center justify-center px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 max-w-xs">
          <Lock size={48} className="text-muted-foreground mx-auto" />
          <h2 className="text-xl font-bold text-foreground">Set Your Active Path</h2>
          <p className="text-sm text-muted-foreground">Set a career as your Active Path to unlock weekly quests</p>
          <button onClick={() => navigate("/universe")} className="btn-primary-glow w-full">Explore Careers</button>
        </motion.div>
      </div>
    );
  }

  const startOrCompleteQuest = async (quest: Quest, text?: string) => {
    if (!user) return;
    setSubmitting(true);
    const existing = progress.get(quest.id);

    if (!existing) {
      // Start quest
      await supabase.from("user_quest_progress").insert({
        user_id: user.id,
        quest_id: quest.id,
        status: "in_progress",
        started_at: new Date().toISOString(),
      } as any);
      setProgress((prev) => {
        const next = new Map(prev);
        next.set(quest.id, { quest_id: quest.id, status: "in_progress", response_text: null });
        return next;
      });
      toast.success("Quest started! 🚀");
    } else if (existing.status === "in_progress") {
      // Complete quest
      await supabase
        .from("user_quest_progress")
        .update({
          status: "completed",
          response_text: text || null,
          completed_at: new Date().toISOString(),
        } as any)
        .eq("user_id", user.id)
        .eq("quest_id", quest.id);
      setProgress((prev) => {
        const next = new Map(prev);
        next.set(quest.id, { quest_id: quest.id, status: "completed", response_text: text || null });
        return next;
      });
      addXp(quest.xp_reward);
      toast.success(`+${quest.xp_reward} XP! Quest completed! 🎉`);
      if (quest.badge_id) addBadge(quest.badge_id);
    }
    setSubmitting(false);
    setResponseText("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-primary" />
      </div>
    );
  }

  const thisWeek = quests.filter((q) => q.week_number === weekNumber);
  const pastWeeks = quests.filter((q) => q.week_number !== weekNumber);

  return (
    <div className="space-y-6">
      {/* This Week */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Flame size={16} className="text-glow-pink" /> This Week's Quests
          </h2>
          <span className="text-[10px] font-bold text-primary">
            {thisWeek.filter((q) => progress.get(q.id)?.status === "completed").length}/{thisWeek.length} done
          </span>
        </div>

        {thisWeek.length > 0 ? (
          <div className="space-y-3">
            {thisWeek.map((quest, idx) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                index={idx}
                progress={progress.get(quest.id)}
                expanded={expandedId === quest.id}
                onToggle={() => setExpandedId(expandedId === quest.id ? null : quest.id)}
                onStart={() => startOrCompleteQuest(quest)}
                onComplete={(text) => startOrCompleteQuest(quest, text)}
                responseText={responseText}
                setResponseText={setResponseText}
                submitting={submitting}
                isNewThisWeek
              />
            ))}
          </div>
        ) : (
          <div className="glass-card p-6 rounded-2xl text-center">
            <span className="text-3xl">🎉</span>
            <p className="text-sm font-semibold text-foreground mt-2">No quests this week</p>
            <p className="text-[10px] text-muted-foreground">Check back next Monday for new challenges</p>
          </div>
        )}
      </div>

      {/* Past quests */}
      {pastWeeks.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-foreground mb-3">Past Quests</h2>
          <div className="space-y-2">
            {pastWeeks.map((quest, idx) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                index={idx}
                progress={progress.get(quest.id)}
                expanded={expandedId === quest.id}
                onToggle={() => setExpandedId(expandedId === quest.id ? null : quest.id)}
                onStart={() => startOrCompleteQuest(quest)}
                onComplete={(text) => startOrCompleteQuest(quest, text)}
                responseText={responseText}
                setResponseText={setResponseText}
                submitting={submitting}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function QuestCard({
  quest,
  index,
  progress,
  expanded,
  onToggle,
  onStart,
  onComplete,
  responseText,
  setResponseText,
  submitting,
  isNewThisWeek,
}: {
  quest: Quest;
  index: number;
  progress?: QuestProgress;
  expanded: boolean;
  onToggle: () => void;
  onStart: () => void;
  onComplete: (text?: string) => void;
  responseText: string;
  setResponseText: (t: string) => void;
  submitting: boolean;
  isNewThisWeek?: boolean;
}) {
  const done = progress?.status === "completed";
  const inProgress = progress?.status === "in_progress";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`glass-card rounded-2xl overflow-hidden ${done ? "border-primary/30 bg-primary/5" : ""}`}
    >
      <div className={`h-1.5 w-full ${done ? "gradient-bg" : inProgress ? "bg-accent" : "bg-muted"}`} />

      <button onClick={onToggle} className="w-full p-4 flex items-start gap-3 text-left">
        <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-xl shrink-0">
          {typeEmojis[quest.quest_type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`text-sm font-bold ${done ? "text-primary" : "text-foreground"}`}>{quest.title}</p>
            {isNewThisWeek && !done && (
              <span className="px-1.5 py-0.5 rounded-full bg-glow-pink/15 text-glow-pink text-[9px] font-bold">New this week 🎯</span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            {quest.skill_tag && (
              <span className="px-2 py-0.5 rounded-full bg-muted text-[9px] font-medium text-muted-foreground">{quest.skill_tag}</span>
            )}
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock size={10} /> {quest.estimated_minutes} min
            </span>
            <span className="text-[10px] font-bold text-primary">💎 {quest.xp_reward} XP</span>
            <span className="text-[9px] text-muted-foreground capitalize">{quest.quest_type}</span>
          </div>
        </div>
        {done ? <CheckCircle size={20} className="text-primary mt-1 shrink-0" /> : <ChevronRight size={14} className="text-muted-foreground mt-2 shrink-0" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          {/* Brief */}
          {quest.brief && (
            <div className="prose prose-sm prose-invert max-w-none text-xs text-muted-foreground">
              <ReactMarkdown>{quest.brief}</ReactMarkdown>
            </div>
          )}

          {/* Instructions */}
          {quest.instructions && (
            <div className="bg-muted/30 rounded-xl p-3">
              <p className="text-[10px] font-bold text-foreground mb-1">📋 Instructions</p>
              <div className="prose prose-sm prose-invert max-w-none text-xs text-muted-foreground">
                <ReactMarkdown>{quest.instructions}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Resource URL for watch/explore */}
          {quest.resource_url && (quest.quest_type === "watch" || quest.quest_type === "explore") && (
            <a
              href={quest.resource_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-primary font-semibold"
            >
              {quest.quest_type === "watch" ? <Play size={14} /> : <ExternalLink size={14} />}
              {quest.quest_type === "watch" ? "Watch Video" : "Open Resource"}
            </a>
          )}

          {/* Action buttons */}
          {!progress && (
            <button onClick={onStart} disabled={submitting} className="w-full btn-primary-glow text-sm flex items-center justify-center gap-2">
              {submitting ? <Loader2 size={16} className="animate-spin" /> : "Start Quest →"}
            </button>
          )}

          {inProgress && (
            <div className="space-y-2">
              {(quest.quest_type === "research" || quest.quest_type === "create" || quest.quest_type === "watch" || quest.quest_type === "explore") && (
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder={
                    quest.quest_type === "research" ? "Write your reflections here..."
                      : quest.quest_type === "watch" ? "What did you learn from the video?"
                      : "Describe what you created or observed..."
                  }
                  className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary min-h-[100px]"
                />
              )}
              <button
                onClick={() => onComplete(responseText)}
                disabled={submitting}
                className="w-full btn-primary-glow text-sm flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <><CheckCircle size={16} /> Complete Quest</>}
              </button>
            </div>
          )}

          {done && (
            <div className="bg-primary/10 rounded-xl p-3 text-center">
              <p className="text-xs font-bold text-primary">✅ Quest completed!</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
