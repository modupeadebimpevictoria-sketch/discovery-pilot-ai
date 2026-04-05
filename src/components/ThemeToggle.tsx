import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  theme: "night" | "day";
  toggle: () => void;
}

export default function ThemeToggle({ theme, toggle }: ThemeToggleProps) {
  const isNight = theme === "night";

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-9 h-9 rounded-full bg-card border border-[hsl(var(--border-strong))] text-muted-foreground hover:text-foreground transition-colors"
      aria-label={`Switch to ${isNight ? "day" : "night"} theme`}
    >
      {isNight ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
