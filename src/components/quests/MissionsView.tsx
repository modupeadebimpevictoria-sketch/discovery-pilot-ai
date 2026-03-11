import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Clock, CheckCircle, Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Mission {
  id: string;
  career_id: string;
  family_id: string;
  title: string;
  description: string;
  task: string;
  mission_type: "do" | "observe" | "reflect" | "share";
  estimated_minutes: number;
  xp_reward: number;
}

const typeEmojis: Record<string, string> = {
  do: "🎯",
  observe: "👀",
  reflect: "💭",
  share: "📸",
};

const typeLabels: Record<string, string> = {
  do: "Do it",
  observe: "Observe",
  reflect: "Reflect",
  share: "Share",
};

export default function MissionsView() {
  const navigate = useNavigate();
  const { selectedCareerPath, matchedCareers, user, addXp } = useApp();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [reflectText, setReflectText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const careerId = selectedCareerPath || matchedCareers[0]?.careerId || null;

  useEffect(() => {
    if (!careerId || !user) return;
    const fetch = async () => {
      setLoading(true);
      const [missionsRes, progressRes] = await Promise.all([
        supabase
          .from("missions")
          .select("*")
          .eq("is_active", true)
          .eq("reviewed_by_admin", true)
          .or(`career_id.eq.${careerId},career_id.eq.`)
          .limit(10),
        supabase
          .from("user_mission_progress")
          .select("mission_id")
          .eq("user_id", user.id),
      ]);
      setMissions((missionsRes.data as Mission[]) || []);
      setCompletedIds(new Set((progressRes.data || []).map((p: any) => p.mission_id)));
      setLoading(false);
    };
    fetch();
  }, [careerId, user]);

  if (!careerId) {
    return (
      <div className="flex items-center justify-center px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 max-w-xs">
          <Lock size={48} className="text-muted-foreground mx-auto" />
          <h2 className="text-xl font-bold text-foreground">Set Your Active Path</h2>
          <p className="text-sm text-muted-foreground">Set a career as your Active Path to unlock daily missions</p>
          <button onClick={() => navigate("/universe")} className="btn-primary-glow w-full">Explore Careers</button>
        </motion.div>
      </div>
    );
  }

  const completeMission = async (mission: Mission, responseText?: string, photoUrl?: string) => {
    if (!user || completedIds.has(mission.id)) return;
    setSubmitting(true);
    const { error } = await supabase.from("user_mission_progress").insert({
      user_id: user.id,
      mission_id: mission.id,
      status: "completed",
      response_text: responseText || null,
      photo_url: photoUrl || null,
    } as any);
    if (error) {
      toast.error("Failed to save progress");
    } else {
      setCompletedIds((prev) => new Set([...prev, mission.id]));
      addXp(mission.xp_reward);
      toast.success(`+${mission.xp_reward} XP! Mission complete! 🎉`);
    }
    setSubmitting(false);
    setExpandedId(null);
    setReflectText("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-primary" />
      </div>
    );
  }

  const activeMissions = missions.filter((m) => !completedIds.has(m.id));
  const doneMissions = missions.filter((m) => completedIds.has(m.id));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-bold text-foreground mb-1">Today's Missions 🎯</h2>
        <p className="text-[10px] text-muted-foreground mb-3">Quick activities under 10 minutes — tied to your Active Path</p>
      </div>

      {activeMissions.length === 0 && doneMissions.length === 0 ? (
        <div className="glass-card p-8 rounded-2xl text-center">
          <span className="text-3xl">🎯</span>
          <p className="text-sm font-semibold text-foreground mt-2">No missions available yet</p>
          <p className="text-[10px] text-muted-foreground">Missions will appear here once an admin creates them for your career path</p>
        </div>
      ) : (
        <>
          {activeMissions.map((mission, idx) => {
            const expanded = expandedId === mission.id;
            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expanded ? null : mission.id)}
                  className="w-full p-4 flex items-start gap-3 text-left"
                >
                  <span className="text-2xl">{typeEmojis[mission.mission_type]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground">{mission.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{mission.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-bold">
                        {typeLabels[mission.mission_type]}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock size={10} /> {mission.estimated_minutes} min
                      </span>
                      <span className="text-[10px] font-bold text-primary">💎 {mission.xp_reward} XP</span>
                    </div>
                  </div>
                </button>

                {expanded && (
                  <div className="px-4 pb-4 space-y-3">
                    <div className="bg-muted/30 rounded-xl p-3">
                      <p className="text-xs text-foreground font-medium">{mission.task}</p>
                    </div>

                    {/* Type-specific completion input */}
                    {(mission.mission_type === "do" || mission.mission_type === "observe") && (
                      <button
                        onClick={() => completeMission(mission)}
                        disabled={submitting}
                        className="w-full btn-primary-glow text-sm flex items-center justify-center gap-2"
                      >
                        {submitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                        Done ✓
                      </button>
                    )}

                    {mission.mission_type === "reflect" && (
                      <div className="space-y-2">
                        <textarea
                          value={reflectText}
                          onChange={(e) => setReflectText(e.target.value)}
                          placeholder="Write your reflection (1–3 sentences)..."
                          className="w-full bg-card border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary min-h-[80px]"
                        />
                        <button
                          onClick={() => completeMission(mission, reflectText)}
                          disabled={submitting || !reflectText.trim()}
                          className="w-full btn-primary-glow text-sm flex items-center justify-center gap-2"
                        >
                          {submitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                          Submit Reflection
                        </button>
                      </div>
                    )}

                    {mission.mission_type === "share" && (
                      <div className="space-y-2">
                        <div className="glass-card p-4 rounded-xl text-center space-y-2">
                          <Camera size={24} className="text-muted-foreground mx-auto" />
                          <p className="text-[10px] text-muted-foreground">Photo upload coming soon — mark as done for now</p>
                        </div>
                        <button
                          onClick={() => completeMission(mission)}
                          disabled={submitting}
                          className="w-full btn-primary-glow text-sm flex items-center justify-center gap-2"
                        >
                          {submitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                          Done ✓
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}

          {doneMissions.length > 0 && (
            <div>
              <p className="text-xs font-bold text-muted-foreground mb-2">Completed ({doneMissions.length})</p>
              {doneMissions.map((m) => (
                <div key={m.id} className="glass-card p-3 rounded-xl flex items-center gap-3 opacity-50 mb-2">
                  <span className="text-lg">{typeEmojis[m.mission_type]}</span>
                  <p className="text-xs font-semibold text-foreground line-through flex-1">{m.title}</p>
                  <CheckCircle size={16} className="text-primary" />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
