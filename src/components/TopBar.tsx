import { useLocation } from "react-router-dom";
import NotificationBell from "@/components/NotificationBell";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

const showOn = ["/dashboard", "/feed", "/quests", "/universe", "/opportunities", "/passport", "/auth", "/me", "/mentor", "/jobs"];

export default function TopBar() {
  const location = useLocation();
  const { theme, toggle } = useTheme();

  if (!showOn.some((p) => location.pathname.startsWith(p)) || location.pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-5 py-3 bg-background/80 backdrop-blur-xl border-b border-border/30 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <img src="/findr-logo.png" alt="Findr" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle theme={theme} toggle={toggle} />
        <NotificationBell />
      </div>
    </div>
  );
}
