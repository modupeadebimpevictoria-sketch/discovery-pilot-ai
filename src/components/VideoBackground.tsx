import { useState, useRef } from "react";

interface VideoBackgroundProps {
  videoUrl: string;
  fallbackImage: string;
  overlayClassName?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function VideoBackground({
  videoUrl,
  fallbackImage,
  overlayClassName = "bg-gradient-to-t from-background via-background/60 to-background/30",
  className = "",
  children,
}: VideoBackgroundProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!videoFailed ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ playbackRate: 0.75 }}
          onError={() => setVideoFailed(true)}
          onLoadedMetadata={() => {
            if (videoRef.current) videoRef.current.playbackRate = 0.75;
          }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <img
          src={fallbackImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClassName}`} />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
