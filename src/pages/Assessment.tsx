import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { assessmentQuestions } from "@/data/questions";
import { matchCareers, determineArchetype } from "@/data/questions";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Assessment() {
  const navigate = useNavigate();
  const { setAssessmentAnswers, setMatchedCareers, setArchetype, addBadge } = useApp();
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [sliderValue, setSliderValue] = useState(50);

  const q = assessmentQuestions[qIndex];
  const total = assessmentQuestions.length;
  const isLast = qIndex === total - 1;

  const hasAnswer = q.type === "slider" || answers[q.id] !== undefined;

  const handleSelect = (value: string) => {
    setAnswers((a) => ({ ...a, [q.id]: value }));
  };

  const handleNext = () => {
    // Save slider value
    if (q.type === "slider") {
      setAnswers((a) => ({ ...a, [q.id]: sliderValue }));
    }

    if (isLast) {
      const finalAnswers = { ...answers };
      if (q.type === "slider") finalAnswers[q.id] = sliderValue;
      
      setAssessmentAnswers(finalAnswers);
      const matched = matchCareers(finalAnswers);
      setMatchedCareers(matched);
      const arch = determineArchetype(finalAnswers);
      setArchetype(arch);
      addBadge("Career Explorer");
      navigate("/results");
    } else {
      setQIndex((i) => i + 1);
      setSliderValue(50);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress */}
      <div className="px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Question {qIndex + 1}/{total}</span>
          <span className="text-sm text-primary font-medium">{Math.round(((qIndex + 1) / total) * 100)}%</span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-bar-fill"
            animate={{ width: `${((qIndex + 1) / total) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center px-4 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={qIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-3">
              <span className="text-5xl">{q.emoji}</span>
              <h2 className="text-xl font-bold text-foreground leading-tight">{q.question}</h2>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                {q.category.replace("-", " ")}
              </span>
            </div>

            {/* Options */}
            {q.options && (
              <div className="grid gap-3">
                {q.options.map((opt) => (
                  <motion.button
                    key={opt.value}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(opt.value)}
                    className={`p-4 rounded-xl text-left font-medium transition-all duration-200 flex items-center gap-3 ${
                      answers[q.id] === opt.value
                        ? "neon-border bg-primary/10 text-primary"
                        : "glass-card text-foreground hover:border-primary/20"
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span>{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Slider */}
            {q.type === "slider" && q.sliderLabels && (
              <div className="space-y-4 px-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) ${sliderValue}%, hsl(var(--muted)) ${sliderValue}%)`,
                  }}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{q.sliderLabels.left}</span>
                  <span>{q.sliderLabels.right}</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-4 pb-8 flex gap-3">
        {qIndex > 0 && (
          <button onClick={() => { setQIndex((i) => i - 1); setSliderValue(50); }} className="btn-glass flex items-center gap-2">
            <ArrowLeft size={18} /> Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!hasAnswer}
          className={`flex-1 btn-primary-glow flex items-center justify-center gap-2 ${!hasAnswer ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          {isLast ? "See My Matches 🎯" : <><span>Next</span> <ArrowRight size={18} /></>}
        </button>
      </div>
    </div>
  );
}
