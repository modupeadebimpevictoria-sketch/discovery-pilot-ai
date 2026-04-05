import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply saved theme before React renders to prevent flash
const stored = localStorage.getItem("findr-theme");
if (stored === "day") {
  document.documentElement.setAttribute("data-theme", "day");
} else {
  document.documentElement.removeAttribute("data-theme");
}

createRoot(document.getElementById("root")!).render(<App />);
