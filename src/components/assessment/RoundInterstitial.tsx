import { motion } from "framer-motion";

interface InterstitialConfig {
  bg: string;
  accent: string;
  message: string;
  cta: string;
}

const interstitialConfigs: Record<number, InterstitialConfig> = {
  1: { bg: "#EEEDFE", accent: "#534AB7", message: "Good start. Now let's go deeper.", cta: "Keep going" },
  2: { bg: "#E1F5EE", accent: "#1D9E75", message: "You think different. That's kind of the whole point.", cta: "Keep going" },
  3: { bg: "#FAEEDA", accent: "#BA7517", message: "Halfway there. Don't stop now.", cta: "Almost there" },
  4: { bg: "#EAF3DE", accent: "#3B6D11", message: "Almost done. This part actually matters.", cta: "Almost there" },
  5: { bg: "#FBEAF0", accent: "#D4537E", message: "Last round. You've got this.", cta: "Finish it" },
};

function OrbitingSVG({ accent }: { accent: string }) {
  const lightAccent = accent + "33";
  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40" aria-hidden>
      {/* Central shape */}
      <rect x="70" y="70" width="60" height="60" rx="14" fill={accent} opacity={0.18} />
      <rect x="80" y="80" width="40" height="40" rx="10" fill={accent} opacity={0.5} />
      {/* Orbit path */}
      <circle cx="100" cy="100" r="80" fill="none" stroke={lightAccent} strokeWidth="1.5" />
      {/* Orbiting circle */}
      <motion.circle
        cx="100"
        cy="20"
        r="10"
        fill={accent}
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        style={{ originX: "100px", originY: "100px", transformOrigin: "100px 100px" }}
      />
      {/* Small decorative dot on opposite side */}
      <motion.circle
        cx="100"
        cy="180"
        r="5"
        fill={accent}
        opacity={0.35}
        animate={{ rotate: -360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        style={{ originX: "100px", originY: "100px", transformOrigin: "100px 100px" }}
      />
    </svg>
  );
}

function SegmentedProgress({ completedRounds, accent }: { completedRounds: number; accent: string }) {
  return (
    <div className="flex gap-1.5 w-full max-w-[240px]">
      {[1, 2, 3, 4, 5, 6].map((r) => (
        <div
          key={r}
          className="flex-1 h-2 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: r <= completedRounds ? accent : accent + "22",
          }}
        />
      ))}
    </div>
  );
}

export default function RoundInterstitial({
  round,
  onContinue,
}: {
  round: number;
  onContinue: () => void;
}) {
  const config = interstitialConfigs[round];
  if (!config) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-8"
      style={{ backgroundColor: config.bg }}
    >
      {/* Animated SVG */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mb-8"
      >
        <OrbitingSVG accent={config.accent} />
      </motion.div>

      {/* Progress segments */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <SegmentedProgress completedRounds={round} accent={config.accent} />
      </motion.div>

      {/* One-liner */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="text-base font-semibold text-center max-w-xs mb-10"
        style={{ color: config.accent }}
      >
        {config.message}
      </motion.p>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={onContinue}
        className="px-8 py-3 rounded-full text-sm font-semibold text-white transition-transform active:scale-95"
        style={{ backgroundColor: config.accent }}
      >
        {config.cta}
      </motion.button>
    </motion.div>
  );
}
