import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

const steps = [
  { key: "name", question: "Hey! What's your name? 👋", placeholder: "Enter your name", emoji: "😊" },
  { key: "age", question: "How old are you?", placeholder: "Your age", emoji: "🎂", type: "number" },
  { key: "grade", question: "What grade are you in?", emoji: "📚", options: ["Year 9 / Grade 8", "Year 10 / Grade 9", "Year 11 / Grade 10", "Year 12 / Grade 11", "Year 13 / Grade 12"] },
  { key: "country", question: "Where are you from?", placeholder: "Your country", emoji: "🌍" },
  { key: "subjects", question: "What subjects are you taking? (Pick all that apply)", emoji: "📖", multi: true, options: ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "English", "History", "Geography", "Art & Design", "Music", "Drama", "Economics", "Business Studies", "Psychology", "Physical Education", "Languages", "Media Studies", "Design Technology"] },
  { key: "dreamCareer", question: "Do you have a dream career? (Totally optional!)", placeholder: "e.g., Astronaut, Chef, or 'no idea yet!'", emoji: "💭" },
  { key: "interests", question: "What are your hobbies and interests?", emoji: "🎮", multi: true, options: ["Gaming", "Sports", "Music", "Art & Drawing", "Reading", "Coding", "Science Experiments", "Cooking", "Photography", "Travel", "Social Media", "Volunteering", "Writing", "Fashion", "Animals", "Nature", "Debate", "Entrepreneurship"] },
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

  const toggleMulti = (key: string, val: string) => {
    setData((d) => ({
      ...d,
      [key]: d[key].includes(val) ? d[key].filter((v: string) => v !== val) : [...d[key], val],
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress */}
      <div className="px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Step {step + 1} of {steps.length}</span>
          <span className="text-sm text-primary font-medium">{Math.round(((step + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-bar-fill"
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-4 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <span className="text-5xl">{current.emoji}</span>
              <h2 className="text-2xl font-bold text-foreground leading-tight">
                {current.key === "name" ? current.question : data.name ? `${current.question.replace("your", data.name + "'s")}` : current.question}
              </h2>
            </div>

            {/* Input types */}
            {current.options && !current.multi && (
              <div className="grid gap-3">
                {current.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setData((d) => ({ ...d, [current.key]: opt }))}
                    className={`p-4 rounded-xl text-left font-medium transition-all duration-200 ${
                      data[current.key] === opt
                        ? "neon-border bg-primary/10 text-primary"
                        : "glass-card text-foreground hover:border-primary/20"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {current.multi && current.options && (
              <div className="flex flex-wrap gap-2 justify-center">
                {current.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => toggleMulti(current.key, opt)}
                    className={`category-chip ${
                      data[current.key].includes(opt)
                        ? "gradient-bg text-primary-foreground"
                        : "glass-card text-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {!current.options && (
              <input
                type={current.type || "text"}
                value={data[current.key]}
                onChange={(e) => setData((d) => ({ ...d, [current.key]: e.target.value }))}
                placeholder={current.placeholder}
                className="w-full p-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-lg"
                onKeyDown={(e) => e.key === "Enter" && canNext() && handleNext()}
                autoFocus
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-4 pb-8 flex gap-3">
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)} className="btn-glass flex items-center gap-2">
            <ArrowLeft size={18} /> Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canNext()}
          className={`flex-1 btn-primary-glow flex items-center justify-center gap-2 ${!canNext() ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          {isLast ? (
            <>
              Start Discovery <Sparkles size={18} />
            </>
          ) : (
            <>
              Continue <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
