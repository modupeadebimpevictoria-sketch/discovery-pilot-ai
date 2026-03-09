import { Users } from "lucide-react";

const anonymizedPeople = [
  { label: "Student in Lagos", pathway: "AI Engineer", emoji: "🤖", daysAgo: 2 },
  { label: "Student in Nairobi", pathway: "Architect", emoji: "🏗️", daysAgo: 1 },
  { label: "Student in Accra", pathway: "UX Designer", emoji: "🎨", daysAgo: 3 },
  { label: "Student in Cape Town", pathway: "Entrepreneur", emoji: "🚀", daysAgo: 1 },
  { label: "Student in Johannesburg", pathway: "Data Scientist", emoji: "📊", daysAgo: 4 },
];

export default function PeopleLikeYou() {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
        <Users size={14} className="text-accent" /> People Like You
      </h2>
      <div className="glass-card p-4 rounded-2xl space-y-2.5">
        {anonymizedPeople.slice(0, 3).map((p, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-sm">
              {p.emoji}
            </div>
            <div className="flex-1">
              <p className="text-xs text-foreground">
                <span className="font-semibold">{p.label}</span>{" "}
                <span className="text-muted-foreground">is exploring</span>{" "}
                <span className="text-primary font-semibold">{p.pathway}</span>
              </p>
              <p className="text-[10px] text-muted-foreground">{p.daysAgo}d ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
