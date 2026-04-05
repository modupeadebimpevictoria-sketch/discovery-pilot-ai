import { useState, useEffect, useCallback } from "react";

type Theme = "night" | "day";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem("findr-theme") as Theme) || "night";
  });

  useEffect(() => {
    if (theme === "day") {
      document.documentElement.setAttribute("data-theme", "day");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("findr-theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setThemeState((t) => (t === "night" ? "day" : "night"));
  }, []);

  return { theme, toggle };
}
