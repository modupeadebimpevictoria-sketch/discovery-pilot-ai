import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Briefcase, Bot, Award, Sparkles, ChevronRight } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import OrbitChat from "@/components/PathfinderChat";
import VideoBackground from "@/components/VideoBackground";
import CareerProfileCard from "@/components/CareerProfileCard";
import CategoryVideoTile from "@/components/CategoryVideoTile";
import TestimonialCard from "@/components/TestimonialCard";
import confetti from "canvas-confetti";

// Subtle fade-in only — no looping or bouncing
const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const stagger = (delay: number) => ({
  ...fadeIn,
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const, delay },
});

// Feature data
const featureCards = [
  {
    icon: <Zap size={24} />,
    title: "Launch Pad Missions",
    desc: "Try mini challenges that show what careers actually feel like.",
    color: "text-primary-foreground",
    bg: "bg-primary/20",
  },
  {
    icon: <Briefcase size={24} />,
    title: "Internship Launchpad",
    desc: "Find real internships matched to your strengths and interests.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: <Bot size={24} />,
    title: "AI Career Coach",
    desc: "Ask anything about your future — get honest, personalized answers.",
    color: "text-primary-foreground",
    bg: "bg-highlight",
  },
  {
    icon: <Award size={24} />,
    title: "Skill Builder & Passport",
    desc: "Level up, earn badges, and track your career readiness.",
    color: "text-accent-foreground",
    bg: "bg-accent/20",
  },
];

// Career profile cards — young professionals at work
const careerProfiles = [
  {
    name: "Nia O.",
    title: "AI Engineer",
    quote: "I build apps used by millions — and I started in my bedroom.",
    photoUrl: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=400&h=500&fit=crop&crop=face&q=90",
    videoUrl: "https://videos.pexels.com/video-files/5765610/5765610-sd_640_360_25fps.mp4",
    match: 94,
  },
  {
    name: "Kwame A.",
    title: "Dentist",
    quote: "Every day I help someone smile again. That never gets old.",
    photoUrl: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=500&fit=crop&crop=face&q=90",
    match: 87,
  },
  {
    name: "Adaeze N.",
    title: "Aerospace Engineer",
    quote: "I'm designing things that will fly beyond Earth. How cool is that?",
    photoUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop&crop=face&q=90",
    match: 82,
  },
  {
    name: "Jamal T.",
    title: "Music Producer",
    quote: "I turned beats in my garage into a full-time career.",
    photoUrl: "https://images.unsplash.com/photo-1507152927220-18c1d754d44f?w=400&h=500&fit=crop&crop=face&q=90",
    match: 79,
  },
  {
    name: "Amara D.",
    title: "Architect",
    quote: "I design the spaces where life happens.",
    photoUrl: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=400&h=500&fit=crop&crop=face&q=90",
    match: 76,
  },
];

// Category tiles with video backgrounds — young professionals in action
const categoryTiles = [
  {
    label: "Technology",
    emoji: "💻",
    videoUrl: "https://videos.pexels.com/video-files/5765610/5765610-sd_640_360_25fps.mp4",
    fallback: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&q=90",
  },
  {
    label: "Healthcare",
    emoji: "🏥",
    videoUrl: "https://videos.pexels.com/video-files/7579956/7579956-sd_640_360_25fps.mp4",
    fallback: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=400&fit=crop&q=90",
  },
  {
    label: "Creative Arts",
    emoji: "🎨",
    videoUrl: "https://videos.pexels.com/video-files/3209265/3209265-sd_640_360_25fps.mp4",
    fallback: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop&q=90",
  },
  {
    label: "Business",
    emoji: "💼",
    videoUrl: "https://videos.pexels.com/video-files/3205567/3205567-sd_640_360_25fps.mp4",
    fallback: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&h=400&fit=crop&q=90",
  },
  {
    label: "Engineering",
    emoji: "⚙️",
    videoUrl: "https://videos.pexels.com/video-files/3205828/3205828-sd_640_360_25fps.mp4",
    fallback: "https://images.unsplash.com/photo-1581092160607-ee67df30d1a2?w=600&h=400&fit=crop&q=90",
  },
  {
    label: "Science",
    emoji: "🔬",
    videoUrl: "https://videos.pexels.com/video-files/3209214/3209214-sd_640_360_25fps.mp4",
    fallback: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop&q=90",
  },
];

// Testimonials — young Black and African professionals
const testimonials = [
  {
    name: "Zara O.",
    role: "UX Designer, 23",
    quote: "I had no idea UX design existed until SpringBoard showed me. Now I'm designing apps at a startup. This literally changed my life.",
    photoUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&q=90",
  },
  {
    name: "Marcus A.",
    role: "Data Analyst, 24",
    quote: "The quiz nailed it. I always liked patterns and numbers but never connected that to a career. Now I'm a data analyst and I love it.",
    photoUrl: "https://images.unsplash.com/photo-1507152927220-18c1d754d44f?w=200&h=200&fit=crop&crop=face&q=90",
  },
  {
    name: "Aisha K.",
    role: "Biomedical Researcher, 22",
    quote: "SpringBoard gave me the roadmap I needed. My school counselor couldn't tell me any of this.",
    photoUrl: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&h=200&fit=crop&crop=face&q=90",
  },
  {
    name: "Tunde B.",
    role: "Filmmaker, 25",
    quote: "I was stuck between law and art. SpringBoard showed me I could make films. Best decision I ever made.",
    photoUrl: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop&crop=face&q=90",
  },
];

// SpringBoard logo — clean, no animation
function SpringBoardLogo({ size = "text-2xl" }: { size?: string }) {
  return (
    <span className={`font-bold font-display text-secondary tracking-tight ${size}`}>
      Spring<span className="text-primary-foreground">Board</span>
    </span>
  );
}

export default function Index() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);

  const handleCTA = () => {
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 }, colors: ["#AAED4E", "#2D6A00", "#FFE14D", "#1A1A1A"] });
    setTimeout(() => navigate("/onboarding"), 400);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ===== HERO SECTION — Video Background ===== */}
      <VideoBackground
        videoUrl="https://videos.pexels.com/video-files/3205828/3205828-sd_960_506_25fps.mp4"
        fallbackImage="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&h=1080&fit=crop&q=90"
        overlayClassName="bg-gradient-to-t from-background via-background/70 to-background/40"
        className="min-h-screen flex flex-col items-center justify-center px-5 text-center"
      >
        {/* Logo — top left */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="18" width="24" height="3" rx="1.5" fill="#AAED4E" />
            <rect x="14" y="20" width="4" height="10" rx="1" fill="#2D6A00" />
            <rect x="8" y="28" width="16" height="3" rx="1.5" fill="#2D6A00" />
            <circle cx="16" cy="10" r="3" fill="#AAED4E" opacity="0.9" />
            <path d="M16 13 L13 17 M16 13 L19 17 M14 15 L18 15" stroke="#AAED4E" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
          </svg>
          <SpringBoardLogo />
        </div>

        {/* Hero content */}
        <div className="max-w-lg w-full space-y-6">
          <motion.div {...stagger(0)}>
            <span className="badge-lime text-xs">10,000+ students launched</span>
          </motion.div>

          <motion.h1
            {...stagger(0.1)}
            className="text-4xl md:text-5xl font-bold text-foreground leading-[1.1] tracking-tight font-display"
          >
            Find the career{" "}
            <span className="text-primary">you'll actually love.</span>
          </motion.h1>

          <motion.p {...stagger(0.2)} className="text-base text-foreground/70 leading-relaxed">
            Take a quick quiz. Discover your strengths.
            <br />
            Get a personalized career roadmap — for free.
          </motion.p>

          <motion.div {...stagger(0.3)}>
            <button
              onClick={handleCTA}
              className="btn-coral text-base w-full sm:w-auto sm:px-10 flex items-center justify-center gap-2 mx-auto"
            >
              Get Started <ArrowRight size={18} />
            </button>
          </motion.div>

          <motion.div {...stagger(0.4)} className="flex flex-wrap gap-2 justify-center">
            {["⚡ 5-min quiz", "🔒 100% free", "🎯 Personalized"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-card/40 backdrop-blur-sm text-foreground/60 text-xs border border-glass-border">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </VideoBackground>

      {/* ===== CAREER PROFILES — Social-style cards ===== */}
      <section className="py-10 px-5">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-6 space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display">
              Real people. Real careers.
            </h2>
            <p className="text-sm text-muted-foreground">
              Hover to see them in action. Tap to explore the path.
            </p>
          </motion.div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5">
            {careerProfiles.map((profile, idx) => (
              <motion.div key={profile.name} {...stagger(idx * 0.05)}>
                <CareerProfileCard
                  {...profile}
                  onClick={() => navigate("/onboarding")}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CAREER CATEGORIES — Dark section ===== */}
      <section className="py-10 px-5 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-6 space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground font-display">
              Explore career worlds
            </h2>
            <p className="text-sm text-secondary-foreground/60">
              See what each field looks like from the inside.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categoryTiles.map((tile) => (
              <CategoryVideoTile
                key={tile.label}
                label={tile.label}
                emoji={tile.emoji}
                videoUrl={tile.videoUrl}
                fallbackImage={tile.fallback}
                onClick={() => navigate("/career-universe")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES — Dark section ===== */}
      <section className="py-10 px-5 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-6 space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground font-display">
              Everything you need to get started
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featureCards.map((card, idx) => (
              <motion.div
                key={card.title}
                {...stagger(idx * 0.05)}
                className="rounded-2xl border border-secondary-foreground/10 bg-secondary-foreground/5 p-5 group hover:bg-secondary-foreground/10 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl ${card.bg} flex items-center justify-center ${card.color} mb-3`}>
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-secondary-foreground mb-1 font-display">{card.title}</h3>
                <p className="text-sm text-secondary-foreground/60 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-10 px-5">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-6 space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display">
              Students who took the leap
            </h2>
            <p className="text-sm text-muted-foreground">
              Their words, not ours.
            </p>
          </motion.div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA — Dark ===== */}
      <section className="py-10 px-5 bg-secondary">
        <div className="max-w-md mx-auto text-center space-y-5">
          {/* Faces */}
          <div className="flex justify-center -space-x-2">
            {testimonials.slice(0, 4).map((t, i) => (
              <img
                key={i}
                src={t.photoUrl}
                alt={t.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-secondary"
                loading="lazy"
              />
            ))}
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-secondary-foreground font-display leading-tight">
              Join 10,000+ students<br />
              who found their path.
            </h2>
            <p className="text-secondary-foreground/60 text-sm mt-2">
              One quiz. One roadmap. A clearer future.
            </p>
          </div>

          <button
            onClick={handleCTA}
            className="btn-coral text-base px-8 mx-auto flex items-center gap-2"
          >
            <Sparkles size={16} /> Take the Quiz <ArrowRight size={16} />
          </button>

          <div className="flex flex-wrap gap-3 justify-center">
            {["⚡ 5-min quiz", "🔒 100% free", "🎯 Personalized"].map((t) => (
              <span key={t} className="text-[11px] text-secondary-foreground/50">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI MENTOR ===== */}
      <section className="py-6 px-5 pb-24">
        <div className="max-w-md mx-auto">
          <motion.button
            {...fadeIn}
            onClick={() => setChatOpen(true)}
            className="w-full landing-card flex items-center gap-4 !p-4 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary">
              <Bot size={24} className="text-primary-foreground" />
            </div>
            <div className="text-left flex-1">
              <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors font-display">
                Chat with SpringBoard AI
              </p>
              <p className="text-xs text-muted-foreground">
                Got career questions? Your AI coach is ready.
              </p>
            </div>
            <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.button>
        </div>
      </section>

      <AnimatePresence>
        {chatOpen && <OrbitChat onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
