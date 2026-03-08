import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Briefcase, Bot, Award, Rocket, Sparkles, ChevronRight, Star } from "lucide-react";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import OrbitChat from "@/components/PathfinderChat";
import confetti from "canvas-confetti";

const floatingEmojis = ["🚀", "🎯", "🧬", "🎨", "💻", "🌍", "🏗️", "🎵", "🔬", "⚡"];

const featureCards = [
  {
    icon: <Zap size={28} />,
    title: "Interactive Career Missions",
    desc: "Try mini challenges that show what a career is really like.",
    color: "text-landing-pink",
    bg: "bg-landing-pink/10",
  },
  {
    icon: <Briefcase size={28} />,
    title: "Internship Opportunities",
    desc: "Get access to real-life internships for your dream path.",
    color: "text-landing-orange",
    bg: "bg-landing-orange/10",
  },
  {
    icon: <Bot size={28} />,
    title: "AI Career Mentor",
    desc: "Ask your personal guide anything about your future career.",
    color: "text-landing-teal",
    bg: "bg-landing-teal/10",
  },
  {
    icon: <Award size={28} />,
    title: "Skill Builder & Career Passport",
    desc: "Track your growth and unlock achievements as you go.",
    color: "text-landing-coral",
    bg: "bg-landing-coral/10",
  },
];

const careerPreviews = [
  { emoji: "🤖", title: "AI Engineer", match: 94, color: "from-landing-pink to-landing-orange" },
  { emoji: "🦷", title: "Dentist", match: 87, color: "from-landing-teal to-landing-orange" },
  { emoji: "🚀", title: "Aerospace Engineer", match: 82, color: "from-landing-orange to-landing-coral" },
  { emoji: "🎵", title: "Music Producer", match: 79, color: "from-landing-coral to-landing-pink" },
  { emoji: "🏗️", title: "Architect", match: 76, color: "from-landing-yellow/80 to-landing-teal" },
];

export default function Index() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const handleCTA = () => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 }, colors: ["#7B61FF", "#4F7CFF", "#23D5FF", "#FF6B6B", "#C6FF4A"] });
    setTimeout(() => navigate("/onboarding"), 400);
  };

  return (
    <div className="min-h-screen bg-landing-bg overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-5 text-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 hero-gradient-animated" />
        
        {/* Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-landing-bg/50" />

        {/* Floating emoji badges */}
        {floatingEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl pointer-events-none opacity-40"
            style={{
              left: `${10 + (i * 9) % 80}%`,
              top: `${15 + (i * 13) % 60}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, i % 2 === 0 ? 10 : -10, 0],
              rotate: [0, i % 2 === 0 ? 10 : -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + i * 0.4,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            <span className="badge-lime text-lg">{emoji}</span>
          </motion.div>
        ))}

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-lg w-full space-y-6"
          style={{ opacity: heroOpacity }}
        >
          {/* Trending badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <span className="badge-lime">
              <Rocket size={14} /> Trending — 10,000+ Students
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight"
          >
            Discover <span className="neon-glow-cyan">YOUR</span> Future.{" "}
            <span className="block">Today.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-2"
          >
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              Take our quick quiz. Explore your strengths.<br />
              See where your passions could take you.
            </p>
            <p className="text-sm text-white/60">
              Dentist. AI Engineer. Space Explorer. Music Creator.<br />
              <span className="text-landing-lime font-semibold">Your future is waiting.</span>
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCTA}
              className="btn-coral text-lg w-full sm:w-auto sm:px-12 flex items-center justify-center gap-3 mx-auto"
            >
              Start Your Journey <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          {/* Accent badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {["🧭 AI Mentor", "🎮 Fun Missions", "🏆 Earn Badges", "🌍 30+ Careers"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs font-medium border border-white/10">
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full bg-white/70"
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
            <span className="badge-lime">✨ What You Get</span>
            <h2 className="text-3xl md:text-4xl font-bold text-landing-charcoal">
              Everything you need to<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-hero)" }}>
                find your dream career
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featureCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="landing-card group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center ${card.color} mb-4 group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-landing-charcoal mb-1">{card.title}</h3>
                <p className="text-sm text-landing-charcoal/60 leading-relaxed">{card.desc}</p>
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
            <span className="badge-lime">🔥 Hot Careers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-landing-charcoal">
              Careers you didn't know<br />you'd love
            </h2>
            <p className="text-sm text-landing-charcoal/50">Swipe through 30+ career paths. Which one is yours?</p>
          </motion.div>

          {/* Swipeable preview cards */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5">
            {careerPreviews.map((career, idx) => (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex-shrink-0 w-[160px] sm:w-[200px] rounded-3xl overflow-hidden shadow-lg cursor-pointer group"
                onClick={() => navigate("/onboarding")}
              >
                <div className={`bg-gradient-to-br ${career.color} p-6 pb-8 text-center`}>
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: idx * 0.3 }}
                    className="text-5xl block mb-2"
                  >
                    {career.emoji}
                  </motion.span>
                  <p className="text-white font-bold text-sm">{career.title}</p>
                </div>
                <div className="bg-white p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star size={12} className="text-landing-coral fill-landing-coral" />
                    <span className="text-sm font-bold text-landing-charcoal">{career.match}% match</span>
                  </div>
                  <p className="text-[10px] text-landing-charcoal/40 mt-0.5">Based on your profile</p>
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
            className="rounded-3xl overflow-hidden"
          >
            <div className="hero-gradient-animated p-10 text-center space-y-6">
              {/* Avatars */}
              <div className="flex justify-center">
                <div className="flex -space-x-3">
                  {["🧑‍💻", "👩‍🎨", "👨‍⚕️", "👩‍🔬", "🧑‍🚀"].map((e, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg border-2 border-white/30"
                    >
                      {e}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  Join 10,000+ students<br />
                  exploring careers they love.
                </h2>
                <p className="text-white/70 text-sm mt-2">
                  Your future starts with one quiz. Are you ready?
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleCTA}
                className="btn-coral text-base px-10 mx-auto flex items-center gap-2"
              >
                <Sparkles size={18} /> Take the Quiz <ArrowRight size={18} />
              </motion.button>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 justify-center">
                {["⚡ 5-min quiz", "🔒 100% free", "🎯 Personalized"].map((t) => (
                  <span key={t} className="text-[10px] text-white/60 font-medium">{t}</span>
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
            whileHover={{ scale: 1.02 }}
            onClick={() => setChatOpen(true)}
            className="w-full landing-card flex items-center gap-4 !p-5 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 hero-gradient-animated">
              <Bot size={28} className="text-white" />
            </div>
            <div className="text-left flex-1">
              <p className="text-base font-bold text-landing-charcoal group-hover:text-landing-purple transition-colors">
                Chat with Orbit AI 🚀
              </p>
              <p className="text-xs text-landing-charcoal/50">
                Got career questions? Your AI mentor has answers.
              </p>
            </div>
            <ChevronRight size={20} className="text-landing-charcoal/30 group-hover:text-landing-purple transition-colors" />
          </motion.button>
        </div>
      </section>

      <AnimatePresence>
        {chatOpen && <OrbitChat onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
