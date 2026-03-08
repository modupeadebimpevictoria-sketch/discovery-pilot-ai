import { useLocation } from "react-router-dom";

const showOn = ["/dashboard", "/feed", "/quests", "/universe", "/opportunities", "/passport"];

export default function TopBar() {
  const location = useLocation();
  
  if (!showOn.some((p) => location.pathname.startsWith(p))) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-5 py-3 bg-background/80 backdrop-blur-xl border-b border-glass-border/30">
      <span className="text-lg font-bold font-display text-primary tracking-tight">Orbit</span>
    </div>
  );
}
