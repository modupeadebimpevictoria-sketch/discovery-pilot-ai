import { useState, useRef } from "react";
import { Star } from "lucide-react";

interface CareerProfileCardProps {
  name: string;
  title: string;
  quote: string;
  photoUrl: string;
  videoUrl?: string;
  match: number;
  onClick?: () => void;
}

export default function CareerProfileCard({
  name,
  title,
  quote,
  photoUrl,
  videoUrl,
  match,
  onClick,
}: CareerProfileCardProps) {
  const [hovering, setHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setHovering(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setHovering(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  return (
    <div
      className="flex-shrink-0 w-[180px] sm:w-[220px] rounded-2xl overflow-hidden cursor-pointer border border-border bg-card transition-transform duration-200 hover:-translate-y-1"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Photo / Video area */}
      <div className="relative h-[200px] sm:h-[240px] overflow-hidden rounded-t-[16px]">
        <img
          src={photoUrl}
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            hovering && videoUrl ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
        />
        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              hovering ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        {/* Bottom gradient scrim */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card to-transparent" />
        {/* Match badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-card/90 border border-border">
          <Star size={10} className="text-accent fill-accent" />
          <span className="text-[11px] font-bold text-foreground">{match}%</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-1">
        <p className="text-xs text-muted-foreground">{name}</p>
        <p className="text-sm font-semibold text-foreground leading-tight">{title}</p>
        <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">"{quote}"</p>
      </div>
    </div>
  );
}