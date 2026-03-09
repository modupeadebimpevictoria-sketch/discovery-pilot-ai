import { useLocation } from "react-router-dom";
import NotificationBell from "@/components/NotificationBell";

const showOn = ["/dashboard", "/feed", "/quests", "/universe", "/opportunities", "/passport", "/auth"];

export default function TopBar() {
  const location = useLocation();
  
  if (!showOn.some((p) => location.pathname.startsWith(p))) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-5 py-3 bg-background/80 backdrop-blur-xl border-b border-glass-border/30 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="18" width="24" height="3" rx="1.5" fill="hsl(72, 100%, 50%)" />
          <rect x="14" y="20" width="4" height="10" rx="1" fill="hsl(164, 100%, 48%)" />
          <rect x="8" y="28" width="16" height="3" rx="1.5" fill="hsl(271, 91%, 65%)" />
          <circle cx="16" cy="10" r="3" fill="hsl(72, 100%, 50%)" opacity="0.9" />
          <path d="M16 13 L13 17 M16 13 L19 17 M14 15 L18 15" stroke="hsl(72, 100%, 50%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        </svg>
        <span className="text-lg font-bold font-display tracking-tight">
          <span className="text-primary">Spring</span><span className="text-[hsl(164,100%,48%)]">Board</span>
        </span>
      </div>
      <NotificationBell />
    </div>
  );
}
