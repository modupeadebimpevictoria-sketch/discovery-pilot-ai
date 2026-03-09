import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Briefcase, Bot, Award, Rocket, Sparkles, ChevronRight, Star, TrendingUp } from "lucide-react";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import OrbitChat from "@/components/PathfinderChat";
import confetti from "canvas-confetti";

const floatingEmojis = ["🏊", "🎯", "🧬", "🎨", "💻", "🌍", "🏗️", "🎵", "🔬", "⚡"];

const featureCards = [
  {
    icon: <Zap size={28} />,
    title: "Launch Pad Missions",
    desc: "Bounce into mini challenges that reveal what careers actually feel like.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: <Briefcase size={28} />,
    title: "Internship Launchpad",
    desc: "Spring into real-life internships matched to your dream path.",
    color: "text-landing-coral",
    bg: "bg-landing-coral/10",
  },
  {
    icon: <Bot size={28} />,
    title: "AI Career Coach",
    desc: "Your personal springboard — ask anything about your future career.",
    color: "text-landing-mint",
    bg: "bg-landing-mint/10",
  },
  {
    icon: <Award size={28} />,
    title: "Skill Builder & Career Passport",
    desc: "Level up, earn badges, and build momentum for the big leap.",
    color: "text-landing-violet",
    bg: "bg-landing-violet/10",
  },
];

const careerPreviews = [
  { emoji: "🤖", title: "AI Engineer", match: 94, color: "from-landing-violet to-landing-lime" },
  { emoji: "🦷", title: "Dentist", match: 87, color: "from-landing-mint to-landing-violet" },
  { emoji: "🚀", title: "Aerospace Engineer", match: 82, color: "from-landing-coral to-landing-violet" },
  { emoji: "🎵", title: "Music Producer", match: 79, color: "from-landing-violet to-landing-coral" },
  { emoji: "🏗️", title: "Architect", match: 76, color: "from-landing-mint to-landing-lime" },
];

// Springboard SVG logo component
function SpringBoardLogo({ className = "", size = "text-2xl" }: { className?: string; size?: string }) {
  return (
    <span className={`font-bold font-display text-primary tracking-tight ${size} ${className}`}>
      Spring<span className="text-landing-mint">Board</span>
    </span>
  );
}

export default function Index() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const handleCTA = () => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 }, colors: ["#C8FF00", "#FF4D6D", "#A855F7", "#00F5C4", "#FFD93D"] });
    setTimeout(() => navigate("/onboarding"), 400);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-5 text-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 hero-gradient-animated" />
        
        {/* Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />

        {/* App logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-6 left-6 z-20 flex items-center gap-2"
        >
          {/* Springboard icon */}
          <motion.div
            animate={{ rotate: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Board */}
              <rect x="4" y="18" width="24" height="3" rx="1.5" fill="hsl(72, 100%, 50%)" />
              {/* Support */}
              <rect x="14" y="20" width="4" height="10" rx="1" fill="hsl(164, 100%, 48%)" />
              {/* Base */}
              <rect x="8" y="28" width="16" height="3" rx="1.5" fill="hsl(271, 91%, 65%)" />
              {/* Person launching */}
              <circle cx="16" cy="10" r="3" fill="hsl(72, 100%, 50%)" opacity="0.9" />
              <path d="M16 13 L13 17 M16 13 L19 17 M14 15 L18 15" stroke="hsl(72, 100%, 50%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
            </svg>
          </motion.div>
          <SpringBoardLogo />
        </motion.div>

        {/* Floating emoji badges with bounce animation */}
        {floatingEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl pointer-events-none opacity-30"
            style={{
              left: `${10 + (i * 9) % 80}%`,
              top: `${15 + (i * 13) % 60}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + i * 0.3,
              delay: i * 0.2,
              ease: [0.34, 1.56, 0.64, 1], // springy bounce
            }}
          >
            <span className="badge-lime text-lg">{emoji}</span>
          </motion.div>
        ))}

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", damping: 12, stiffness: 100 }}
          className="relative z-10 max-w-lg w-full space-y-6"
          style={{ opacity: heroOpacity }}
        >
          {/* Trending badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <span className="badge-lime">
              <TrendingUp size={14} /> 10,000+ Students Launched
            </span>
          </motion.div>

          {/* Headline — springboard themed */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", damping: 10, stiffness: 100 }}
            className="text-5xl md:text-6xl font-bold text-foreground leading-[1.1] tracking-tight font-display"
          >
            Leap Into{" "}
            <motion.span
              className="neon-glow-cyan inline-block"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
            >
              YOUR
            </motion.span>{" "}
            Future.
          </motion.h1>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-2"
          >
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              Take a quick quiz. Discover your strengths.<br />
              Let us springboard you to the career you'll love.
            </p>
            <p className="text-sm text-muted-foreground">
              Dentist. AI Engineer. Space Explorer. Music Creator.<br />
              <span className="text-primary font-semibold">Ready to take the leap?</span>
            </p>
          </motion.div>

          {/* CTA Button with bounce */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96, y: 4 }}
              onClick={handleCTA}
              className="btn-coral text-lg w-full sm:w-auto sm:px-12 flex items-center justify-center gap-3 mx-auto"
            >
              Launch Your Journey <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          {/* Accent badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {["🤖 AI Coach", "🎮 Fun Missions", "🏆 Earn Badges", "🌍 30+ Careers"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-card/40 backdrop-blur-sm text-foreground/70 text-xs font-medium border border-glass-border">
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator — bouncing like a springboard */}
        <motion.div
          animate={{ y: [0, 12, -4, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center pt-2">
            <motion.div
              animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full bg-primary/70"
            />
          </div>
        </motion.div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 space-y-3"
          >
            <span className="badge-lime">🏊 Your Launchpad</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
              Everything you need to<br />
              <span className="gradient-text">
                springboard into your dream career
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featureCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 150, damping: 15 }}
                whileHover={{ y: -6 }}
                className="landing-card group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center ${card.color} mb-4 group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1 font-display">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CAREER PREVIEW SECTION ===== */}
      <section className="py-16 px-5 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 space-y-3"
          >
            <span className="badge-lime">🔥 Where Will You Land?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
              Careers you didn't know<br />you'd love
            </h2>
            <p className="text-sm text-muted-foreground">Explore 30+ paths. Find where you'll make your biggest splash.</p>
          </motion.div>

          {/* Swipeable preview cards */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5">
            {careerPreviews.map((career, idx) => (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="flex-shrink-0 w-[160px] sm:w-[200px] rounded-3xl overflow-hidden cursor-pointer group border border-glass-border"
                style={{ boxShadow: "var(--shadow-card)" }}
                onClick={() => navigate("/onboarding")}
              >
                <div className={`bg-gradient-to-br ${career.color} p-6 pb-8 text-center`}>
                  <motion.span
                    animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: idx * 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                    className="text-5xl block mb-2"
                  >
                    {career.emoji}
                  </motion.span>
                  <p className="text-foreground font-bold text-sm">{career.title}</p>
                </div>
                <div className="bg-card p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star size={12} className="text-primary fill-primary" />
                    <span className="text-sm font-bold text-foreground">{career.match}% match</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Based on your profile</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF / CTA SECTION ===== */}
      <section className="py-20 px-5">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden border border-glass-border"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="hero-gradient-animated p-10 text-center space-y-6">
              {/* Avatars */}
              <div className="flex justify-center">
                <div className="flex -space-x-3">
                  {["🧑‍💻", "👩‍🎨", "👨‍⚕️", "👩‍🔬", "🧑‍🚀"].map((e, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                      className="w-10 h-10 rounded-full bg-card/30 backdrop-blur-sm flex items-center justify-center text-lg border-2 border-glass-border"
                    >
                      {e}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight font-display">
                  Join 10,000+ students<br />
                  who took the leap.
                </h2>
                <p className="text-muted-foreground text-sm mt-2">
                  One quiz. One springboard. A whole new future.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96, y: 4 }}
                onClick={handleCTA}
                className="btn-coral text-base px-10 mx-auto flex items-center gap-2"
              >
                <Sparkles size={18} /> Take the Leap <ArrowRight size={18} />
              </motion.button>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 justify-center">
                {["⚡ 5-min quiz", "🔒 100% free", "🎯 Personalized"].map((t) => (
                  <span key={t} className="text-[10px] text-muted-foreground font-medium">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== AI MENTOR TEASER ===== */}
      <section className="py-16 px-5 pb-32">
        <div className="max-w-lg mx-auto">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -2 }}
            onClick={() => setChatOpen(true)}
            className="w-full landing-card flex items-center gap-4 !p-5 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-landing-violet to-landing-mint">
              <Bot size={28} className="text-foreground" />
            </div>
            <div className="text-left flex-1">
              <p className="text-base font-bold text-foreground group-hover:text-primary transition-colors font-display">
                Chat with SpringBoard AI 🏊
              </p>
              <p className="text-xs text-muted-foreground">
                Got career questions? Your AI coach is ready to launch you forward.
              </p>
            </div>
            <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.button>
        </div>
      </section>

      <AnimatePresence>
        {chatOpen && <OrbitChat onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
