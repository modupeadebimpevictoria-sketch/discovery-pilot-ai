import { useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import NotificationBell from "@/components/NotificationBell";
import SpringBoardLogo from "@/components/SpringBoardLogo";
import { useTheme } from "@/hooks/useTheme";

const showOn = ["/dashboard", "/feed", "/quests", "/universe", "/opportunities", "/passport", "/auth"];

export default function TopBar() {
  const location = useLocation();
  const { resolvedTheme, toggleTheme } = useTheme();

  if (!showOn.some((p) => location.pathname.startsWith(p))) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-5 py-3 bg-background/80 backdrop-blur-xl border-b border-border/30 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <SpringBoardLogo size={32} darkBackground={isDark} />
        <span className="text-lg font-bold tracking-tight">
          <span className="text-primary">Spring</span><span className="text-foreground">Board</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <NotificationBell />
      </div>
    </div>
  );
}
