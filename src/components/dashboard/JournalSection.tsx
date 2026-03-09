import { useState } from "react";
import { PenLine, Plus, Send } from "lucide-react";
import type { JournalEntry } from "@/contexts/AppContext";

interface JournalSectionProps {
  entries: JournalEntry[];
  careerId: string;
  onAdd: (entry: JournalEntry) => void;
}

export default function JournalSection({ entries, careerId, onAdd }: JournalSectionProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState("");

  const careerEntries = entries.filter((e) => e.careerId === careerId);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd({
      id: `journal-${Date.now()}`,
      careerId,
      text: text.trim(),
      date: new Date().toISOString(),
    });
    setText("");
    setIsAdding(false);
  };

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
        <PenLine size={14} className="text-accent" /> Journal
      </h2>

      <div className="glass-card p-4 rounded-2xl space-y-3">
        {/* Recent entries */}
        {careerEntries.slice(0, 2).map((entry) => (
          <div key={entry.id} className="p-2.5 rounded-xl bg-muted/30 space-y-1">
            <p className="text-xs text-foreground leading-relaxed">{entry.text}</p>
            <p className="text-[10px] text-muted-foreground">
              {new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </p>
          </div>
        ))}

        {/* Add thought */}
        {isAdding ? (
          <div className="space-y-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What are you thinking about this career path?"
              className="w-full bg-muted/30 border border-glass-border rounded-xl p-3 text-xs text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/40"
              rows={3}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setIsAdding(false); setText(""); }}
                className="text-[10px] text-muted-foreground px-3 py-1.5 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!text.trim()}
                className="flex items-center gap-1 text-[10px] font-bold text-primary-foreground bg-primary px-3 py-1.5 rounded-lg disabled:opacity-40"
              >
                <Send size={10} /> Save
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-dashed border-glass-border text-xs text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
          >
            <Plus size={12} /> Add a thought →
          </button>
        )}
      </div>
    </div>
  );
}
