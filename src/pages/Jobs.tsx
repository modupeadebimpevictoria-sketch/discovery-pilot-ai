import { Briefcase } from "lucide-react";

export default function Jobs() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 pb-24 pt-16">
      <div className="text-center max-w-sm space-y-4">
        <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto">
          <Briefcase size={28} className="text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold text-foreground">
          Your first job is closer than you think.
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Internships, part-time roles, and holiday jobs for teenagers, all in one place. Coming soon on Findr.
        </p>
        <p className="text-xs text-muted-foreground/70 leading-relaxed">
          Add Findr to your home screen so you're the first to know when Jobs drops.
        </p>
      </div>
    </div>
  );
}
