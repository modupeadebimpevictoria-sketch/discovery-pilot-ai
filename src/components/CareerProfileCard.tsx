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
      className="flex-shrink-0 w-[180px] sm:w-[220px] rounded-2xl overflow-hidden cursor-pointer border border-glass-border bg-card transition-transform duration-200 hover:-translate-y-1"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Photo / Video area */}
      <div className="relative h-[200px] sm:h-[240px] overflow-hidden">
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
      </div>

      {/* Info */}
      <div className="p-3 space-y-1">
        <p className="text-xs text-muted-foreground">{name}</p>
        <p className="text-sm font-semibold text-foreground leading-tight">{title}</p>
        <p className="text-[11px] text-foreground/60 leading-snug line-clamp-2">"{quote}"</p>
      </div>
    </div>
  );
}
