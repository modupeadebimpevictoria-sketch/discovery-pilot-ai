import { useLocation, useNavigate } from "react-router-dom";
import { Compass, Home, Sparkles, User, Flame } from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/feed", icon: Flame, label: "Feed" },
  { path: "/universe", icon: Compass, label: "Explore" },
  { path: "/results", icon: Sparkles, label: "Matches" },
  { path: "/dashboard", icon: User, label: "Me" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on onboarding and assessment
  const hideOn = ["/onboarding", "/assessment"];
  if (hideOn.some((p) => location.pathname.startsWith(p))) return null;

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around px-2 pt-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`bottom-nav-item ${active ? "bottom-nav-item-active" : ""}`}
            >
              <div className={`relative ${active ? "scale-110" : ""} transition-transform duration-200`}>
                <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
                {active && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
