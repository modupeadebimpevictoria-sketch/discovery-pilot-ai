import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { useTheme } from "@/hooks/useTheme";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  User, Camera, Backpack, Heart, BookOpen, MapPin,
  Sun, Moon, Monitor, Bell, Shield, RefreshCw, KeyRound,
  LogOut, Trash2, ChevronRight, Zap, Edit3, Check, X,
  ExternalLink, Bookmark,
} from "lucide-react";
import FeedbackSheet from "@/components/FeedbackSheet";

const XP_LEVELS = [
  { name: "Curious", min: 0, max: 199, emoji: "🔍" },
  { name: "Explorer", min: 200, max: 599, emoji: "🧭" },
  { name: "Trailblazer", min: 600, max: 1199, emoji: "🔥" },
  { name: "Achiever", min: 1200, max: 2499, emoji: "⭐" },
  { name: "Springboarder", min: 2500, max: Infinity, emoji: "🚀" },
];

function getLevel(xp: number) {
  return XP_LEVELS.find((l) => xp >= l.min && xp <= l.max) || XP_LEVELS[0];
}

export default function Me() {
  const navigate = useNavigate();
  const {
    user, profile, setProfile, signOut, xp,
    savedCareers, journalEntries,
  } = useApp();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(profile?.name || "");
  const [editGrade, setEditGrade] = useState(profile?.grade || "");
  const [editCountry, setEditCountry] = useState(profile?.country || "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [savedOpps, setSavedOpps] = useState<any[]>([]);
  const [savedOppsLoading, setSavedOppsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const level = getLevel(xp);
  const nextLevel = XP_LEVELS[XP_LEVELS.indexOf(level) + 1];
  const levelProgress = nextLevel ? ((xp - level.min) / (nextLevel.min - level.min)) * 100 : 100;
  const initial = profile?.name?.[0]?.toUpperCase() || "?";

  // Load avatar URL
  useState(() => {
    if (user) {
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(`${user.id}/avatar`);
      setAvatarUrl(`${data.publicUrl}?t=${Date.now()}`);
    }
  });

  // Load saved opportunities
  useEffect(() => {
    if (!user) return;
    const fetchSaved = async () => {
      setSavedOppsLoading(true);
      const { data: saves } = await supabase
        .from("user_saved_opportunities")
        .select("opportunity_id, saved_at")
        .eq("user_id", user.id)
        .order("saved_at", { ascending: false });

      if (!saves || saves.length === 0) {
        setSavedOpps([]);
        setSavedOppsLoading(false);
        return;
      }

      const ids = saves.map((s: any) => s.opportunity_id);
      const { data: opps } = await supabase
        .from("admin_opportunities")
        .select("id, title, organisation, type, application_url, is_link_dead")
        .in("id", ids);

      setSavedOpps(opps || []);
      setSavedOppsLoading(false);
    };
    fetchSaved();
  }, [user]);

  const handleUnsave = async (oppId: string) => {
    if (!user) return;
    await supabase
      .from("user_saved_opportunities")
      .delete()
      .eq("user_id", user.id)
      .eq("opportunity_id", oppId);
    setSavedOpps((prev) => prev.filter((o) => o.id !== oppId));
    toast.success("Removed from saved ♡");
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    setUploading(true);
    try {
      const { error } = await supabase.storage
        .from("avatars")
        .upload(`${user.id}/avatar`, file, { upsert: true });

      if (error) throw error;

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(`${user.id}/avatar`);
      setAvatarUrl(`${data.publicUrl}?t=${Date.now()}`);
      toast.success("Avatar updated! 📸");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = () => {
    if (!profile) return;
    setProfile({
      ...profile,
      name: editName || profile.name,
      grade: editGrade || profile.grade,
      country: editCountry || profile.country,
    });
    setEditing(false);
    toast.success("Profile updated! ✨");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("Signed out — see you next time! 👋");
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password changed! 🔐");
      setChangingPassword(false);
      setNewPassword("");
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteText !== "DELETE") return;
    toast.error("Account deletion requires admin support. Please contact us.");
    setShowDeleteConfirm(false);
    setDeleteText("");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background pb-28 flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 max-w-xs">
          <User size={48} className="text-muted-foreground mx-auto" />
          <h2 className="text-xl font-bold text-foreground">Sign in to view your profile</h2>
          <button onClick={() => navigate("/auth")} className="btn-primary-glow w-full">Sign In</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="px-5 pt-6 space-y-5">
        {/* ═══ Profile Section ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 rounded-2xl"
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="relative group shrink-0"
              disabled={uploading}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                    onError={() => setAvatarUrl(null)}
                  />
                ) : (
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                    {initial}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-background">
                <Camera size={12} className="text-primary-foreground" />
              </div>
              {uploading && (
                <div className="absolute inset-0 rounded-full bg-background/60 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />

            {/* Name & Info */}
            <div className="flex-1 min-w-0">
              {editing ? (
                <div className="space-y-2">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-muted/50 rounded-lg px-3 py-1.5 text-sm text-foreground border border-glass-border focus:border-primary outline-none"
                  />
                  <div className="flex gap-2">
                    <input
                      value={editGrade}
                      onChange={(e) => setEditGrade(e.target.value)}
                      placeholder="Grade"
                      className="w-20 bg-muted/50 rounded-lg px-3 py-1.5 text-xs text-foreground border border-glass-border focus:border-primary outline-none"
                    />
                    <input
                      value={editCountry}
                      onChange={(e) => setEditCountry(e.target.value)}
                      placeholder="Country"
                      className="flex-1 bg-muted/50 rounded-lg px-3 py-1.5 text-xs text-foreground border border-glass-border focus:border-primary outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleSaveProfile} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
                      <Check size={12} /> Save
                    </button>
                    <button onClick={() => setEditing(false)} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-muted text-muted-foreground text-xs font-semibold">
                      <X size={12} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground truncate">{profile?.name || "Student"}</h2>
                    <button onClick={() => {
                      setEditName(profile?.name || "");
                      setEditGrade(profile?.grade || "");
                      setEditCountry(profile?.country || "");
                      setEditing(true);
                    }}>
                      <Edit3 size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {profile?.grade ? `Grade ${profile.grade}` : ""}
                    {profile?.grade && profile?.country ? " · " : ""}
                    {profile?.country || ""}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </>
              )}
            </div>
          </div>

          {/* XP Level */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{level.emoji}</span>
                <span className="text-xs font-bold text-foreground">Level {XP_LEVELS.indexOf(level) + 1} — {level.name}</span>
              </div>
              <span className="text-xs font-bold text-primary">{xp} XP</span>
            </div>
            <div className="progress-bar">
              <motion.div
                className="progress-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(levelProgress, 100)}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            {nextLevel && (
              <p className="text-[10px] text-muted-foreground">{nextLevel.min - xp} XP to {nextLevel.name} {nextLevel.emoji}</p>
            )}
          </div>
        </motion.div>

        {/* ═══ Quick Links ═══ */}
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1 mb-2">Quick Links</h3>
          {[
            { icon: Backpack, label: "My Passport", desc: "Your career achievements", path: "/passport", color: "text-primary" },
            { icon: Heart, label: "My Wishlist", desc: `${savedCareers.length} saved careers`, path: "/universe", color: "text-glow-pink" },
            { icon: BookOpen, label: "My Journal", desc: `${journalEntries.length} entries`, path: "/dashboard", color: "text-glow-purple" },
            { icon: MapPin, label: "My Location", desc: profile?.country || "Not set", path: null, color: "text-secondary" },
          ].map((link) => (
            <button
              key={link.label}
              onClick={() => link.path && navigate(link.path)}
              className="w-full glass-card p-3.5 rounded-xl flex items-center gap-3 text-left"
            >
              <link.icon size={18} className={link.color} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{link.label}</p>
                <p className="text-[10px] text-muted-foreground">{link.desc}</p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* ═══ Saved Opportunities ═══ */}
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1 mb-2">Saved Opportunities</h3>
          {savedOppsLoading ? (
            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">Loading...</p>
            </div>
          ) : savedOpps.length === 0 ? (
            <div className="glass-card p-5 rounded-xl text-center space-y-2">
              <Bookmark size={24} className="text-muted-foreground mx-auto" />
              <p className="text-xs text-muted-foreground">Tap the ♡ on any opportunity to save it here</p>
              <button onClick={() => navigate("/opportunities")} className="text-xs font-semibold text-primary">
                Browse Opportunities →
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              {savedOpps.map((opp) => (
                <div key={opp.id} className="glass-card p-3.5 rounded-xl flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{opp.title}</p>
                    <p className="text-[10px] text-muted-foreground">{opp.organisation}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {!opp.is_link_dead && (
                      <a
                        href={opp.application_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
                      >
                        <ExternalLink size={14} className="text-primary" />
                      </a>
                    )}
                    <button
                      onClick={() => handleUnsave(opp.id)}
                      className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center"
                    >
                      <Heart size={14} className="text-destructive fill-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1 mb-2">Settings</h3>

          {/* Theme */}
          <div className="glass-card p-3.5 rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              {resolvedTheme === "dark" ? <Moon size={18} className="text-glow-purple" /> : <Sun size={18} className="text-primary" />}
              <p className="text-sm font-semibold text-foreground flex-1">Theme</p>
            </div>
            <div className="flex gap-1 p-1 rounded-xl bg-muted/50">
              {[
                { value: "light" as const, label: "Light", icon: Sun },
                { value: "dark" as const, label: "Dark", icon: Moon },
                { value: "system" as const, label: "System", icon: Monitor },
              ].map((opt) => {
                const active = theme === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                      active ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <opt.icon size={12} />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notifications */}
          <button
            onClick={() => toast.info("Notification preferences coming soon!")}
            className="w-full glass-card p-3.5 rounded-xl flex items-center gap-3 text-left"
          >
            <Bell size={18} className="text-primary" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Notifications</p>
              <p className="text-[10px] text-muted-foreground">Quest nudges, streaks, deadlines</p>
            </div>
            <ChevronRight size={14} className="text-muted-foreground" />
          </button>

          {/* Privacy */}
          <button
            onClick={() => toast.info("Privacy settings coming soon!")}
            className="w-full glass-card p-3.5 rounded-xl flex items-center gap-3 text-left"
          >
            <Shield size={18} className="text-secondary" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Privacy</p>
              <p className="text-[10px] text-muted-foreground">Passport visibility, data sharing</p>
            </div>
            <ChevronRight size={14} className="text-muted-foreground" />
          </button>

          {/* Retake Assessment */}
          <button
            onClick={() => navigate("/assessment")}
            className="w-full glass-card p-3.5 rounded-xl flex items-center gap-3 text-left"
          >
            <RefreshCw size={18} className="text-glow-purple" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Retake Assessment</p>
              <p className="text-[10px] text-muted-foreground">Rediscover your career matches</p>
            </div>
            <ChevronRight size={14} className="text-muted-foreground" />
          </button>

          {/* Change Password */}
          <div className="glass-card p-3.5 rounded-xl">
            <button
              onClick={() => setChangingPassword(!changingPassword)}
              className="w-full flex items-center gap-3 text-left"
            >
              <KeyRound size={18} className="text-secondary" />
              <p className="text-sm font-semibold text-foreground flex-1">Change Password</p>
              <ChevronRight size={14} className={`text-muted-foreground transition-transform ${changingPassword ? "rotate-90" : ""}`} />
            </button>
            <AnimatePresence>
              {changingPassword && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-2">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password (min 6 chars)"
                      className="w-full bg-muted/50 rounded-lg px-3 py-2 text-sm text-foreground border border-glass-border focus:border-primary outline-none"
                    />
                    <button onClick={handleChangePassword} className="btn-primary-glow w-full text-sm py-2.5">
                      Update Password
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ═══ Account Actions ═══ */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleSignOut}
            className="w-full glass-card p-3.5 rounded-xl flex items-center gap-3 text-left"
          >
            <LogOut size={18} className="text-glow-pink" />
            <p className="text-sm font-semibold text-foreground">Log Out</p>
          </button>

          <div className="glass-card p-3.5 rounded-xl">
            <button
              onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
              className="w-full flex items-center gap-3 text-left"
            >
              <Trash2 size={18} className="text-destructive" />
              <p className="text-sm font-semibold text-destructive">Delete Account</p>
            </button>
            <AnimatePresence>
              {showDeleteConfirm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-2">
                    <p className="text-[10px] text-muted-foreground">This will permanently delete all your data. Type <strong className="text-destructive">DELETE</strong> to confirm.</p>
                    <input
                      value={deleteText}
                      onChange={(e) => setDeleteText(e.target.value)}
                      placeholder="Type DELETE"
                      className="w-full bg-muted/50 rounded-lg px-3 py-2 text-sm text-foreground border border-destructive/30 focus:border-destructive outline-none"
                    />
                    <button
                      onClick={handleDeleteAccount}
                      disabled={deleteText !== "DELETE"}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold bg-destructive text-destructive-foreground disabled:opacity-40 transition-all"
                    >
                      Permanently Delete Account
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-[10px] text-muted-foreground pb-4">SpringBoard v1.0 · Made with 💚</p>
      </div>
    </div>
  );
}
