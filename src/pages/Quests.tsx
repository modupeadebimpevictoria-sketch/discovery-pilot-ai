import { useState } from "react";
import { motion } from "framer-motion";
import { Map, Zap, Target, BarChart3, Flame } from "lucide-react";
import GradeRoadmap from "@/components/quests/GradeRoadmap";
import MissionsView from "@/components/quests/MissionsView";
import QuestsView from "@/components/quests/QuestsView";
import SkillsView from "@/components/quests/SkillsView";
import ProgressView from "@/components/quests/ProgressView";

const tabs = [
  { id: "roadmap", label: "Roadmap", icon: Map },
  { id: "missions", label: "Missions", icon: Target },
  { id: "quests", label: "Quests", icon: Flame },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "progress", label: "Progress", icon: BarChart3 },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Quests() {
  const [activeTab, setActiveTab] = useState<TabId>("roadmap");

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="px-5 pt-6 pb-2">
        <h1 className="text-xl font-bold text-foreground mb-4">Your Journey</h1>

        {/* Horizontal scrollable sub-tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  active
                    ? "gradient-bg text-primary-foreground"
                    : "glass-card text-muted-foreground"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-5 pt-4">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "roadmap" && <GradeRoadmap />}
          {activeTab === "missions" && <MissionsView />}
          {activeTab === "quests" && <QuestsView />}
          {activeTab === "skills" && <SkillsView />}
          {activeTab === "progress" && <ProgressView />}
        </motion.div>
      </div>
    </div>
  );
}
