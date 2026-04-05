import { useLocation } from "react-router-dom";
import NotificationBell from "@/components/NotificationBell";
import FindrLogo from "@/components/FindrLogo";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

const showOn = ["/dashboard", "/feed", "/quests", "/universe", "/opportunities", "/passport", "/auth", "/me", "/mentor", "/jobs"];

export default function TopBar() {
  const location = useLocation();
  const { theme, toggle } = useTheme();

  if (!showOn.some((p) => location.pathname.startsWith(p)) || location.pathname.startsWith("/admin")) return null;

  const isNight = theme === "night";

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-5 py-3 bg-background/80 backdrop-blur-xl border-b border-border/30 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <FindrLogo size={32} darkBackground={isNight} />
        <span className="text-lg font-bold tracking-tight">
          <span className="text-primary">Fin</span><span className="text-foreground">dr</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle theme={theme} toggle={toggle} />
        <NotificationBell />
      </div>
    </div>
  );
}
