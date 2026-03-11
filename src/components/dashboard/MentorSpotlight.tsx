import { Star } from "lucide-react";

const mentors = [
  {
    name: "Ngozi A.",
    role: "Software Engineer at Google",
    quote: "I started coding at 17 with no laptop — just a phone. Now I build products used by millions.",
    photoUrl: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=200&h=200&fit=crop&crop=face&q=90",
    pathway: "AI Engineer",
  },
  {
    name: "Kweku M.",
    role: "Architect at Adjaye Associates",
    quote: "Architecture is art you can walk through. I design spaces that tell African stories.",
    photoUrl: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&h=200&fit=crop&crop=face&q=90",
    pathway: "Architect",
  },
  {
    name: "Amira K.",
    role: "Biomedical Engineer",
    quote: "I build devices that save lives in rural hospitals. Engineering meets empathy.",
    photoUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&q=90",
    pathway: "Biomedical Engineer",
  },
  {
    name: "Temi O.",
    role: "Founder, HealthTech Startup",
    quote: "I turned a school project into a company that now serves 50,000 patients.",
    photoUrl: "https://images.unsplash.com/photo-1507152927220-18c1d754d44f?w=200&h=200&fit=crop&crop=face&q=90",
    pathway: "Entrepreneur",
  },
];

export default function MentorSpotlight() {
  // Rotate based on day
  const today = new Date().getDay();
  const mentor = mentors[today % mentors.length];

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
        <Star size={14} className="text-glow-purple" /> Mentor Spotlight
      </h2>
      <div className="glass-card p-4 rounded-2xl border-glow-purple/20">
        <div className="flex items-start gap-3">
          <img
            src={mentor.photoUrl}
            alt={mentor.name}
            className="w-12 h-12 rounded-xl object-cover"
            loading="lazy"
          />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-bold text-foreground">{mentor.name}</p>
            <p className="text-[10px] text-glow-purple font-semibold">{mentor.role}</p>
            <p className="text-xs text-muted-foreground italic leading-relaxed">"{mentor.quote}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
