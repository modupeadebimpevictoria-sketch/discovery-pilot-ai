import { useState, useRef } from "react";

interface CategoryVideoTileProps {
  label: string;
  emoji: string;
  videoUrl: string;
  fallbackImage: string;
  onClick?: () => void;
}

export default function CategoryVideoTile({
  label,
  emoji,
  videoUrl,
  fallbackImage,
  onClick,
}: CategoryVideoTileProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <button
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden border border-glass-border group cursor-pointer h-[140px] sm:h-[180px] w-full transition-transform duration-200 hover:-translate-y-1"
    >
      {!videoFailed ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoFailed(true)}
          onLoadedMetadata={() => {
            if (videoRef.current) videoRef.current.playbackRate = 0.7;
          }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <img
          src={fallbackImage}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
      {/* Dark + subtle lime scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-background/20" />
      {/* Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-10">
        <span className="text-3xl">{emoji}</span>
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </div>
    </button>
  );
}
