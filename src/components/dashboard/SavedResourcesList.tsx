import { Bookmark, X, FileText, Video, User } from "lucide-react";
import type { SavedResource } from "@/contexts/AppContext";

interface SavedResourcesListProps {
  resources: SavedResource[];
  onRemove: (id: string) => void;
}

const typeIcons = {
  article: <FileText size={14} className="text-primary" />,
  video: <Video size={14} className="text-secondary" />,
  profile: <User size={14} className="text-accent" />,
};

export default function SavedResourcesList({ resources, onRemove }: SavedResourcesListProps) {
  if (resources.length === 0) {
    return (
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Bookmark size={14} className="text-muted-foreground" /> Saved Resources
        </h2>
        <div className="glass-card p-4 rounded-2xl text-center">
          <p className="text-xs text-muted-foreground">
            Bookmark articles, videos, and profiles as you explore. They'll show up here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
        <Bookmark size={14} className="text-primary" /> Saved Resources
      </h2>
      <div className="glass-card p-3 rounded-2xl space-y-1.5">
        {resources.slice(0, 4).map((r) => (
          <div key={r.id} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted/30 transition-colors">
            {typeIcons[r.type]}
            <span className="text-xs text-foreground flex-1 truncate">{r.title}</span>
            <button
              onClick={() => onRemove(r.id)}
              className="w-5 h-5 rounded-full flex items-center justify-center text-muted-foreground hover:text-secondary transition-colors"
            >
              <X size={10} />
            </button>
          </div>
        ))}
        {resources.length > 4 && (
          <p className="text-[10px] text-muted-foreground text-center pt-1">
            +{resources.length - 4} more saved
          </p>
        )}
      </div>
    </div>
  );
}
