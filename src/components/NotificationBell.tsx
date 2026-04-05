import { useState, useEffect } from "react";
import { Bell, X, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useApp } from "@/contexts/AppContext";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

export default function NotificationBell() {
  const { user } = useApp();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);
      if (data) setNotifications(data as Notification[]);
    };

    load();

    // Poll for new notifications every 30 seconds
    const interval = setInterval(load, 30000);

    return () => { clearInterval(interval); };
  }, [user]);

  const markAllRead = async () => {
    if (!user) return;
    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", user.id)
      .eq("read", false);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const typeEmoji: Record<string, string> = {
    streak: "🔥",
    quest: "⚡",
    badge: "🏆",
    milestone: "🎯",
    tip: "💡",
    welcome: "👋",
  };

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative w-9 h-9 rounded-xl glass-card flex items-center justify-center"
      >
        <Bell size={16} className="text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full gradient-bg text-[10px] font-bold text-primary-foreground flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background border-l border-border flex flex-col"
            >
              <div className="px-4 py-4 border-b border-border flex items-center justify-between">
                <h2 className="text-base font-bold text-foreground">Notifications</h2>
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-primary flex items-center gap-1">
                      <CheckCheck size={14} /> Mark all read
                    </button>
                  )}
                  <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg bg-muted/50">
                    <X size={16} className="text-foreground" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center space-y-2">
                    <span className="text-4xl">🔔</span>
                    <p className="text-sm text-muted-foreground">No notifications yet!</p>
                    <p className="text-xs text-muted-foreground">Complete quests and missions to earn updates.</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 border-b border-border/50 ${!n.read ? "bg-primary/5" : ""}`}
                    >
                      <div className="flex gap-3">
                        <span className="text-lg">{typeEmoji[n.type] || "📌"}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${!n.read ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                            {n.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                          <p className="text-[10px] text-muted-foreground/60 mt-1">
                            {n.created_at ? new Date(n.created_at).toLocaleDateString() : ""}
                          </p>
                        </div>
                        {!n.read && <div className="w-2 h-2 rounded-full gradient-bg mt-2 flex-shrink-0" />}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
