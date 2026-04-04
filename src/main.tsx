import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initPostHog } from "./lib/posthog";

// Initialize PostHog analytics
initPostHog();

// Apply saved theme before React renders to prevent flash
const stored = localStorage.getItem("findr-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const isDark = stored === "dark" || (!stored) || (stored === "system" && prefersDark);
document.documentElement.classList.toggle("dark", isDark);

createRoot(document.getElementById("root")!).render(<App />);
