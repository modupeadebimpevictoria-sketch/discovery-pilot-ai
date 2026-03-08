import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Compass, Flame, Zap, Star } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 text-center overflow-hidden relative pb-24">
      {/* Ambient glow effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-40 -right-20 w-[300px] h-[300px] rounded-full bg-secondary/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-40 -left-20 w-[200px] h-[200px] rounded-full bg-glow-purple/8 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8 relative z-10 max-w-sm w-full"
      >
        {/* Animated icon */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative"
        >
          <Compass size={72} className="text-primary mx-auto" strokeWidth={1.2} />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-full border-2 border-primary/30" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-5xl font-bold gradient-text leading-tight">Orbit</h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Discover careers you'll actually love. <br />
            AI-powered, fun, and built for you. ✨
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { emoji: "🤖", label: "AI-Powered" },
            { emoji: "🎯", label: "Personalized" },
            { emoji: "🔥", label: "TikTok-Style Feed" },
            { emoji: "🌍", label: "30+ Careers" },
          ].map((t) => (
            <motion.span
              key={t.label}
              whileHover={{ scale: 1.05 }}
              className="fact-pill"
            >
              {t.emoji} {t.label}
            </motion.span>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/onboarding")}
          className="w-full btn-primary-glow text-lg flex items-center justify-center gap-2 py-4 animate-pulse-glow"
        >
          <Sparkles size={20} /> Start Your Journey <ArrowRight size={20} />
        </motion.button>

        {/* Feature cards */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <Zap size={20} />, label: "5-Min Quiz", desc: "Quick & fun assessment", color: "text-primary" },
            { icon: <Flame size={20} />, label: "Swipe Feed", desc: "TikTok-style explore", color: "text-accent" },
            { icon: <Star size={20} />, label: "Smart Match", desc: "AI career matching", color: "text-secondary" },
            { icon: <Compass size={20} />, label: "30+ Careers", desc: "Deep dive into each", color: "text-glow-purple" },
          ].map((f) => (
            <motion.div
              key={f.label}
              whileHover={{ scale: 1.03 }}
              className="glass-card p-4 text-center space-y-1.5 rounded-2xl"
            >
              <div className={`${f.color} flex justify-center`}>{f.icon}</div>
              <p className="text-sm font-bold text-foreground">{f.label}</p>
              <p className="text-[10px] text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="flex -space-x-2">
            {["🧑‍💻", "👩‍🎨", "👨‍⚕️", "👩‍🔬"].map((e, i) => (
              <div key={i} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-sm border-2 border-background">
                {e}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Join thousands of students</p>
        </div>
      </motion.div>
    </div>
  );
}
