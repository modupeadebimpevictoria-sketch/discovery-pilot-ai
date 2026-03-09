interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  photoUrl: string;
}

export default function TestimonialCard({ name, role, quote, photoUrl }: TestimonialCardProps) {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-glass-border bg-card p-5 space-y-4">
      <div className="flex items-center gap-3">
        <img
          src={photoUrl}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
          loading="lazy"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed italic">"{quote}"</p>
    </div>
  );
}
