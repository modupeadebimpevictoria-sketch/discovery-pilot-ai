import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { assessmentQuestions } from "@/data/questions";
import { matchCareers, determineArchetype } from "@/data/questions";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { fireBurst } from "@/lib/confetti";

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
    // Auto-advance on selection for non-slider questions
    if (q.type !== "slider") {
      setTimeout(() => {
        const newAnswers = { ...answers, [q.id]: value };
        if (isLast) {
          finalize(newAnswers);
        } else {
          setQIndex((i) => i + 1);
          setSliderValue(50);
        }
      }, 300);
    }
  };

  const finalize = (finalAnswers: Record<number, string | number>) => {
    if (q.type === "slider") finalAnswers[q.id] = sliderValue;
    setAssessmentAnswers(finalAnswers);
    const matched = matchCareers(finalAnswers);
    setMatchedCareers(matched);
    const arch = determineArchetype(finalAnswers);
    setArchetype(arch);
    addBadge("Career Explorer");
    fireBurst();
    navigate("/results");
  };

  const handleNext = () => {
    if (q.type === "slider") {
      setAnswers((a) => ({ ...a, [q.id]: sliderValue }));
    }
    if (isLast) {
      const finalAnswers = { ...answers };
      if (q.type === "slider") finalAnswers[q.id] = sliderValue;
      finalize(finalAnswers);
    } else {
      setQIndex((i) => i + 1);
      setSliderValue(50);
    }
  };

  const progress = ((qIndex + 1) / total) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar - thin and clean */}
      <div className="px-0 pt-0">
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full gradient-bg"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          {qIndex + 1} / {total}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: Math.min(total, 20) }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i <= qIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-bold text-primary">{Math.round(progress)}%</span>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center px-5 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={qIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="text-5xl block"
              >
                {q.emoji}
              </motion.span>
              <h2 className="text-xl font-bold text-foreground leading-snug">{q.question}</h2>
            </div>

            {/* Options */}
            {q.options && (
              <div className="space-y-2.5">
                {q.options.map((opt, i) => (
                  <motion.button
                    key={opt.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full p-4 rounded-2xl text-left font-medium transition-all duration-200 flex items-center gap-3 ${
                      answers[q.id] === opt.value
                        ? "neon-border bg-primary/10 text-primary"
                        : "glass-card text-foreground active:bg-muted/60"
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-sm">{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Slider */}
            {q.type === "slider" && q.sliderLabels && (
              <div className="space-y-6 px-1">
                <div className="text-center">
                  <span className="text-4xl font-bold text-primary">{sliderValue}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) ${sliderValue}%, hsl(var(--muted)) ${sliderValue}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                  <span className="max-w-[45%]">{q.sliderLabels.left}</span>
                  <span className="max-w-[45%] text-right">{q.sliderLabels.right}</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation — only show for sliders (multiple choice auto-advances) */}
      {q.type === "slider" && (
        <div className="px-5 pb-8 flex gap-3">
          {qIndex > 0 && (
            <button onClick={() => { setQIndex((i) => i - 1); setSliderValue(50); }} className="btn-glass flex items-center gap-2 px-4">
              <ArrowLeft size={18} />
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 btn-primary-glow flex items-center justify-center gap-2"
          >
            {isLast ? (
              <><Sparkles size={18} /> See My Matches</>
            ) : (
              <><span>Next</span> <ArrowRight size={18} /></>
            )}
          </button>
        </div>
      )}

      {/* Back button for non-slider */}
      {q.type !== "slider" && qIndex > 0 && (
        <div className="px-5 pb-8">
          <button onClick={() => { setQIndex((i) => i - 1); setSliderValue(50); }} className="text-sm text-muted-foreground">
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}
