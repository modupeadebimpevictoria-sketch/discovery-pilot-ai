import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

const steps = [
  { key: "name", question: "Hey! What's your name? 👋", placeholder: "Enter your name", emoji: "😊" },
  { key: "age", question: "How old are you?", placeholder: "Your age", emoji: "🎂", type: "number" },
  { key: "grade", question: "What grade are you in?", emoji: "📚", options: ["Year 9 / Grade 8", "Year 10 / Grade 9", "Year 11 / Grade 10", "Year 12 / Grade 11", "Year 13 / Grade 12"] },
  { key: "country", question: "Where are you from?", placeholder: "Your country", emoji: "🌍" },
  { key: "subjects", question: "What subjects are you taking?", emoji: "📖", multi: true, options: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "English", "History", "Geography", "Art & Design", "Music", "Drama", "Economics", "Business Studies", "Psychology", "Physical Education", "Languages", "Media Studies", "Design Technology"] },
  { key: "dreamCareer", question: "Dream career? (Optional!)", placeholder: "e.g., Astronaut, Chef, or 'no idea!'", emoji: "💭" },
  { key: "interests", question: "What are you into?", emoji: "🎮", multi: true, options: ["Gaming", "Sports", "Music", "Art & Drawing", "Reading", "Coding", "Science", "Cooking", "Photography", "Travel", "Social Media", "Volunteering", "Writing", "Fashion", "Animals", "Nature", "Debate", "Entrepreneurship"] },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { setProfile } = useApp();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, any>>({
    name: "", age: "", grade: "", country: "", subjects: [], dreamCareer: "", interests: [],
  });

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const canNext = () => {
    const val = data[current.key];
    if (current.multi) return val.length > 0;
    if (current.key === "dreamCareer") return true;
    return val !== "" && val !== undefined;
  };

  const handleNext = () => {
    if (isLast) {
      setProfile({
        name: data.name,
        age: Number(data.age),
        grade: data.grade,
        country: data.country,
        subjects: data.subjects,
        dreamCareer: data.dreamCareer,
        interests: data.interests,
      });
      navigate("/assessment");
    } else {
      setStep((s) => s + 1);
    }
  };

  const selectOption = (opt: string) => {
    setData((d) => ({ ...d, [current.key]: opt }));
    // Auto-advance for single-select
    setTimeout(() => {
      if (!isLast) setStep((s) => s + 1);
    }, 250);
  };

  const toggleMulti = (key: string, val: string) => {
    setData((d) => ({
      ...d,
      [key]: d[key].includes(val) ? d[key].filter((v: string) => v !== val) : [...d[key], val],
    }));
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress - thin top bar */}
      <div className="h-1 bg-muted">
        <motion.div className="h-full gradient-bg" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
      </div>

      <div className="px-5 pt-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{step + 1} of {steps.length}</span>
        <span className="text-xs font-bold text-primary">{Math.round(progress)}%</span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-5 pb-8">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 10 }} className="text-5xl block">
              {current.emoji}
            </motion.span>
            <h2 className="text-2xl font-bold text-foreground leading-snug">{current.question}</h2>
          </div>

          {/* Single select */}
          {current.options && !current.multi && (
            <div className="space-y-2">
              {current.options.map((opt) => (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => selectOption(opt)}
                  className={`w-full p-4 rounded-2xl text-left font-medium transition-all duration-200 text-sm ${
                    data[current.key] === opt
                      ? "neon-border bg-primary/10 text-primary"
                      : "glass-card text-foreground active:bg-muted/60"
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          )}

          {/* Multi select */}
          {current.multi && current.options && (
            <div className="flex flex-wrap gap-2">
              {current.options.map((opt) => (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleMulti(current.key, opt)}
                  className={`category-chip ${
                    data[current.key].includes(opt)
                      ? "gradient-bg text-primary-foreground"
                      : "glass-card text-muted-foreground"
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          )}

          {/* Text input */}
          {!current.options && (
            <input
              type={current.type || "text"}
              value={data[current.key]}
              onChange={(e) => setData((d) => ({ ...d, [current.key]: e.target.value }))}
              placeholder={current.placeholder}
              className="w-full p-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-lg"
              onKeyDown={(e) => e.key === "Enter" && canNext() && handleNext()}
              autoFocus
            />
          )}
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="px-5 pb-8 flex gap-3">
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)} className="btn-glass flex items-center gap-2 px-4">
            <ArrowLeft size={18} />
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canNext()}
          className={`flex-1 btn-primary-glow flex items-center justify-center gap-2 ${!canNext() ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          {isLast ? (
            <><Sparkles size={18} /> Start Discovery</>
          ) : (
            <><span>Continue</span> <ArrowRight size={18} /></>
          )}
        </button>
      </div>
    </div>
  );
}
