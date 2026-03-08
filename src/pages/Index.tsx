import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Compass, Zap } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center overflow-hidden relative">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6 relative z-10 max-w-md">
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
          <Compass size={64} className="text-primary mx-auto" strokeWidth={1.5} />
        </motion.div>

        <h1 className="text-5xl font-bold gradient-text leading-tight">Pathfinder</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Discover careers you'll love. AI-powered guidance for your future — fun, inspiring, and made for you. ✨
        </p>

        <div className="flex flex-wrap gap-2 justify-center">
          {["🤖 AI-Powered", "🎯 Personalized", "🎮 Interactive", "🌍 30+ Careers"].map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-full text-xs font-medium glass-card text-muted-foreground">{t}</span>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/onboarding")}
          className="w-full btn-primary-glow text-lg flex items-center justify-center gap-2 py-4 animate-pulse-glow"
        >
          <Sparkles size={20} /> Start Your Journey <ArrowRight size={20} />
        </motion.button>

        <div className="grid grid-cols-3 gap-3 pt-4">
          {[
            { icon: <Zap size={18} />, label: "Quick Assessment", sub: "5 min" },
            { icon: <Sparkles size={18} />, label: "Smart Matching", sub: "AI-driven" },
            { icon: <Compass size={18} />, label: "Deep Explore", sub: "30+ careers" },
          ].map((f) => (
            <div key={f.label} className="glass-card p-3 text-center space-y-1">
              <div className="text-primary flex justify-center">{f.icon}</div>
              <p className="text-xs font-medium text-foreground">{f.label}</p>
              <p className="text-xs text-muted-foreground">{f.sub}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
