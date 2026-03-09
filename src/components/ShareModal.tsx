import { useState } from "react";
import { X, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  careerTitle: string;
  careerEmoji: string;
  score?: number;
  archetype?: string;
}

export default function ShareModal({ isOpen, onClose, careerTitle, careerEmoji, score, archetype }: ShareModalProps) {
  const shareText = score
    ? `I'm a Future ${careerTitle} ${careerEmoji} with ${score}% match on SpringBoard! 🚀`
    : archetype
    ? `I'm ${archetype} ${careerEmoji} according to SpringBoard! ✨`
    : `Check out ${careerTitle} ${careerEmoji} on SpringBoard! 🔥`;

  const shareUrl = window.location.origin;

  const platforms = [
    {
      name: "WhatsApp",
      emoji: "💬",
      color: "from-[#25D366] to-[#128C7E]",
      url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
    },
    {
      name: "Instagram",
      emoji: "📸",
      color: "from-[#E4405F] to-[#833AB4]",
      action: () => {
        navigator.clipboard.writeText(shareText);
        alert("Copied to clipboard! Paste in your Instagram story ✨");
      },
    },
    {
      name: "TikTok",
      emoji: "🎵",
      color: "from-[#00f2ea] to-[#ff0050]",
      action: () => {
        navigator.clipboard.writeText(shareText);
        alert("Copied to clipboard! Share on TikTok 🔥");
      },
    },
    {
      name: "Snapchat",
      emoji: "👻",
      color: "from-[#FFFC00] to-[#FFE600]",
      action: () => {
        navigator.clipboard.writeText(shareText);
        alert("Copied to clipboard! Share on Snapchat 💛");
      },
    },
    {
      name: "Copy Link",
      emoji: "🔗",
      color: "from-primary to-secondary",
      action: () => {
        navigator.clipboard.writeText(shareText + " " + shareUrl);
        alert("Copied! ✅");
      },
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md glass-heavy rounded-t-3xl p-6 space-y-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Share2 size={20} className="text-primary" /> Share Your Results
              </h3>
              <button onClick={onClose} className="p-2 rounded-full bg-muted">
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>

            <div className="glass-card p-4 rounded-xl text-center">
              <p className="text-sm text-foreground font-medium">{shareText}</p>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {platforms.map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    if (p.url) window.open(p.url, "_blank");
                    else p.action?.();
                  }}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl transition-transform group-active:scale-90`}>
                    {p.emoji}
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium">{p.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
