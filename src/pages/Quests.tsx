import { useState } from "react";
import { motion } from "framer-motion";
import { Map, Flame } from "lucide-react";
import GradeRoadmap from "@/components/quests/GradeRoadmap";
import QuestsView from "@/components/quests/QuestsView";

const tabs = [
  { id: "roadmap", label: "My Roadmap", icon: Map },
  { id: "quests", label: "Quests", icon: Flame },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Quests() {
  const [activeTab, setActiveTab] = useState<TabId>("roadmap");

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="px-5 pt-6 pb-2">
        <h1 className="text-xl font-bold text-foreground mb-4">Your Journey</h1>

        {/* Sub-tabs */}
        <div className="flex gap-1 p-1 rounded-2xl bg-muted/50">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active ? "text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="quest-tab-bg"
                    className="absolute inset-0 gradient-bg rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={16} />
                  {tab.label}
                </span>
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
          {activeTab === "roadmap" ? <GradeRoadmap /> : <QuestsView />}
        </motion.div>
      </div>
    </div>
  );
}
