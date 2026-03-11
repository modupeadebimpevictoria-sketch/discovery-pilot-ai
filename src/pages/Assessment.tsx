import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { assessmentQuestions, roundIntros, roundCelebrations, matchCareers, determineArchetype } from "@/data/questions";
import { ArrowRight, ChevronLeft, Sparkles, GripVertical } from "lucide-react";
import { fireBurst } from "@/lib/confetti";

type Screen = { type: "intro"; round: number } | { type: "question"; qIndex: number } | { type: "celebration"; round: number } | { type: "loading" };

function buildScreens(): Screen[] {
  const screens: Screen[] = [];
  let lastRound = 0;
  assessmentQuestions.forEach((q, i) => {
    if (q.round !== lastRound) {
      // Add celebration for previous round (except before round 1)
      if (lastRound > 0) screens.push({ type: "celebration", round: lastRound });
      screens.push({ type: "intro", round: q.round });
      lastRound = q.round;
    }
    screens.push({ type: "question", qIndex: i });
  });
  // Final celebration not needed — goes to loading
  screens.push({ type: "loading" });
  return screens;
}

const allScreens = buildScreens();

export default function Assessment() {
  const navigate = useNavigate();
  const { setAssessmentAnswers, setMatchedCareers, setArchetype, addBadge, addXp } = useApp();
  const [screenIdx, setScreenIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [sliderValue, setSliderValue] = useState(3);
  const [dragItems, setDragItems] = useState<string[]>([]);
  const [freeText, setFreeText] = useState("");
  const [selectedPulse, setSelectedPulse] = useState<string | null>(null);

  const screen = allScreens[screenIdx];
  const totalQuestions = assessmentQuestions.length;

  // Count how many questions answered so far
  const questionsAnswered = allScreens.slice(0, screenIdx + 1).filter(s => s.type === "question").length;
  const progress = (questionsAnswered / totalQuestions) * 100;

  const currentQuestion = screen.type === "question" ? assessmentQuestions[(screen as any).qIndex] : null;

  const advance = useCallback(() => {
    if (screenIdx < allScreens.length - 1) {
      setScreenIdx(i => i + 1);
      setSliderValue(3);
      setSelectedPulse(null);
    }
  }, [screenIdx]);

  const goBack = useCallback(() => {
    if (screenIdx > 0) setScreenIdx(i => i - 1);
    else navigate(-1);
  }, [screenIdx, navigate]);

  const handleSelect = useCallback((qId: number, value: string, isMulti = false, maxSelect?: number) => {
    if (isMulti) {
      setAnswers(prev => {
        const current: string[] = prev[qId] || [];
        let next: string[];
        if (current.includes(value)) {
          next = current.filter(v => v !== value);
        } else {
          next = maxSelect && current.length >= maxSelect ? [...current.slice(1), value] : [...current, value];
        }
        return { ...prev, [qId]: next };
      });
      return; // Don't auto-advance for multi-select
    }

    setSelectedPulse(value);
    setAnswers(prev => ({ ...prev, [qId]: value }));
    setTimeout(() => advance(), 400);
  }, [advance]);

  const handleSlider = useCallback((qId: number) => {
    setAnswers(prev => ({ ...prev, [qId]: sliderValue }));
    advance();
  }, [sliderValue, advance]);

  const handleDragRank = useCallback((qId: number, items: string[]) => {
    setAnswers(prev => ({ ...prev, [qId]: items }));
  }, []);

  const handleFreeText = useCallback((qId: number) => {
    if (freeText.trim()) {
      setAnswers(prev => ({ ...prev, [qId]: freeText.trim() }));
    }
    finalize({ ...answers, [qId]: freeText.trim() || undefined });
  }, [freeText, answers]);

  const handleSkip = useCallback((qId: number) => {
    finalize({ ...answers });
  }, [answers]);

  const finalize = useCallback((finalAnswers: Record<number, any>) => {
    setAssessmentAnswers(finalAnswers);
    const matched = matchCareers(finalAnswers);
    setMatchedCareers(matched);
    const arch = determineArchetype(finalAnswers);
    setArchetype(arch);
    addBadge("Career Explorer");
    addXp(25);
    fireBurst();
    // Show loading screen, then navigate
    setScreenIdx(allScreens.length - 1);
    setTimeout(() => navigate("/results"), 3500);
  }, [setAssessmentAnswers, setMatchedCareers, setArchetype, addBadge, addXp, navigate]);

  // Celebration auto-advance
  const handleCelebration = useCallback(() => {
    fireBurst();
    setTimeout(advance, 2000);
  }, [advance]);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      {/* Progress bar — always visible */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-muted">
          <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
        </div>
        <div className="px-4 py-2 flex items-center justify-between bg-background/80 backdrop-blur-sm">
          <button onClick={goBack} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={20} />
          </button>
          <span className="text-xs font-medium text-muted-foreground">
            Question {Math.min(questionsAnswered, totalQuestions)} of {totalQuestions}
          </span>
          <div className="w-6" />
        </div>
      </div>

      <div className="flex-1 pt-14">
        <AnimatePresence mode="wait">
          {screen.type === "intro" && (
            <RoundIntroScreen
              key={`intro-${(screen as any).round}`}
              round={(screen as any).round}
              onContinue={advance}
            />
          )}
          {screen.type === "celebration" && (
            <CelebrationScreen
              key={`celeb-${(screen as any).round}`}
              round={(screen as any).round}
              onDone={handleCelebration}
            />
          )}
          {screen.type === "loading" && (
            <LoadingScreen key="loading" />
          )}
          {screen.type === "question" && currentQuestion && (
            <QuestionScreen
              key={`q-${currentQuestion.id}`}
              question={currentQuestion}
              answers={answers}
              selectedPulse={selectedPulse}
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
              dragItems={dragItems}
              setDragItems={setDragItems}
              freeText={freeText}
              setFreeText={setFreeText}
              onSelect={handleSelect}
              onSliderSubmit={handleSlider}
              onDragRank={handleDragRank}
              onFreeTextSubmit={handleFreeText}
              onSkip={handleSkip}
              onMultiSubmit={advance}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Round Intro Screen ───
function RoundIntroScreen({ round, onContinue }: { round: number; onContinue: () => void }) {
  const intro = roundIntros.find(r => r.round === round)!;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center px-8 text-center min-h-[80vh]"
    >
      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 8 }} className="text-7xl mb-6">
        {intro.emoji}
      </motion.span>
      <h1 className="text-2xl font-bold text-foreground mb-3">Round {round}: {intro.headline}</h1>
      <p className="text-muted-foreground text-sm mb-8 max-w-xs">{intro.subtext}</p>
      <button onClick={onContinue} className="btn-primary-glow text-sm px-8">
        {intro.cta}
      </button>
    </motion.div>
  );
}

// ─── Celebration Screen ───
function CelebrationScreen({ round, onDone }: { round: number; onDone: () => void }) {
  const message = roundCelebrations[round] || "Great job! Keep going! 🔥";
  // Auto-trigger on mount
  useState(() => { setTimeout(onDone, 100); });
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center px-8 text-center min-h-[80vh]"
    >
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.6 }}
        className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6"
      >
        <span className="text-4xl">🎉</span>
      </motion.div>
      <h2 className="text-xl font-bold text-foreground">{message}</h2>
    </motion.div>
  );
}

// ─── Loading Screen ───
function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center px-8 text-center min-h-[80vh]"
    >
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 rounded-2xl bg-primary/20 border-2 border-primary/40 flex items-center justify-center mb-6"
      >
        <Sparkles size={28} className="text-primary" />
      </motion.div>
      <h2 className="text-xl font-bold text-foreground mb-2">You're all done! 🎉</h2>
      <p className="text-sm text-muted-foreground">Finding your Top 3 matches...</p>
    </motion.div>
  );
}

// ─── Question Screen ───
interface QuestionScreenProps {
  question: typeof assessmentQuestions[0];
  answers: Record<number, any>;
  selectedPulse: string | null;
  sliderValue: number;
  setSliderValue: (v: number) => void;
  dragItems: string[];
  setDragItems: (items: string[]) => void;
  freeText: string;
  setFreeText: (t: string) => void;
  onSelect: (qId: number, value: string, isMulti?: boolean, maxSelect?: number) => void;
  onSliderSubmit: (qId: number) => void;
  onDragRank: (qId: number, items: string[]) => void;
  onFreeTextSubmit: (qId: number) => void;
  onSkip: (qId: number) => void;
  onMultiSubmit: () => void;
}

function QuestionScreen({ question: q, answers, selectedPulse, sliderValue, setSliderValue, dragItems, setDragItems, freeText, setFreeText, onSelect, onSliderSubmit, onDragRank, onFreeTextSubmit, onSkip, onMultiSubmit }: QuestionScreenProps) {
  const currentAnswer = answers[q.id];
  const isMulti = q.type === "emoji-grid" || q.type === "pill-grid";
  const multiAnswer: string[] = isMulti ? (currentAnswer || []) : [];

  // Init drag items
  if (q.type === "drag-rank" && dragItems.length === 0 && q.options) {
    setTimeout(() => setDragItems(q.options!.map(o => o.value)), 0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col px-5 pb-8 min-h-[80vh]"
    >
      {/* Prompt */}
      <h2 className="text-lg font-bold text-foreground leading-snug pt-4 pb-5">{q.prompt}</h2>

      {/* ── Swipe Cards ── */}
      {q.type === "swipe-cards" && q.options && (
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto pb-4">
          {q.options.map((opt, i) => (
            <motion.button key={opt.value} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              onClick={() => onSelect(q.id, opt.value)}
              className={`relative rounded-2xl overflow-hidden h-24 flex items-end transition-all ${
                selectedPulse === opt.value ? "ring-2 ring-primary scale-[0.98]" : currentAnswer === opt.value ? "ring-2 ring-primary" : "ring-1 ring-border"
              }`}
            >
              {opt.photoUrl && <img src={opt.photoUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              <div className="relative z-10 p-3 flex items-center gap-2">
                <span className="text-xl">{opt.emoji}</span>
                <span className="text-sm font-medium text-foreground">{opt.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* ── Emoji Grid (multi-select) ── */}
      {q.type === "emoji-grid" && q.options && (
        <>
          <div className="grid grid-cols-3 gap-2 pb-4">
            {q.options.map((opt, i) => (
              <motion.button key={opt.value} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
                onClick={() => onSelect(q.id, opt.value, true, q.maxSelect)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl text-center transition-all ${
                  multiAnswer.includes(opt.value) ? "bg-primary/15 border-2 border-primary" : "bg-card border border-border"
                }`}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className="text-[11px] leading-tight text-foreground">{opt.label}</span>
              </motion.button>
            ))}
          </div>
          {multiAnswer.length > 0 && (
            <button onClick={onMultiSubmit} className="btn-primary-glow text-sm mt-2">
              Continue ({multiAnswer.length}/{q.maxSelect}) <ArrowRight size={16} />
            </button>
          )}
          <p className="text-xs text-muted-foreground text-center mt-2">Pick up to {q.maxSelect}</p>
        </>
      )}

      {/* ── Photo Grid ── */}
      {(q.type === "photo-grid" || q.type === "tap-photo-cards") && q.options && (
        <div className="grid grid-cols-2 gap-3 pb-4">
          {q.options.map((opt, i) => (
            <motion.button key={opt.value} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(q.id, opt.value)}
              className={`rounded-2xl overflow-hidden relative aspect-square transition-all ${
                selectedPulse === opt.value ? "ring-2 ring-primary scale-[0.97]" : currentAnswer === opt.value ? "ring-2 ring-primary" : "ring-1 ring-border"
              }`}
            >
              {opt.photoUrl && <img src={opt.photoUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-xl mb-1 block">{opt.emoji}</span>
                <span className="text-xs font-medium text-foreground leading-tight">{opt.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* ── Two Cards ── */}
      {q.type === "two-cards" && q.options && (
        <div className="space-y-3 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {q.options.slice(0, 2).map((opt, i) => (
              <motion.button key={opt.value} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => onSelect(q.id, opt.value)}
                className={`rounded-2xl overflow-hidden relative aspect-[3/4] transition-all ${
                  selectedPulse === opt.value ? "ring-2 ring-primary scale-[0.97]" : currentAnswer === opt.value ? "ring-2 ring-primary" : "ring-1 ring-border"
                }`}
              >
                {opt.photoUrl && <img src={opt.photoUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="text-lg mb-1 block">{opt.emoji}</span>
                  <span className="text-xs font-medium text-foreground leading-tight">{opt.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
          {q.options[2] && (
            <button onClick={() => onSelect(q.id, q.options![2].value)} className="text-xs text-muted-foreground text-center w-full py-2 hover:text-foreground transition-colors">
              {q.options[2].emoji} {q.options[2].label}
            </button>
          )}
        </div>
      )}

      {/* ── Three-Way ── */}
      {q.type === "three-way" && q.options && (
        <div className="space-y-3 pb-4">
          {q.options.map((opt, i) => (
            <motion.button key={opt.value} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(q.id, opt.value)}
              className={`w-full p-4 rounded-2xl text-left flex items-center gap-3 transition-all ${
                selectedPulse === opt.value ? "bg-primary/15 border-2 border-primary scale-[0.98]" : currentAnswer === opt.value ? "bg-primary/10 border-2 border-primary" : "bg-card border border-border"
              }`}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span className="text-sm font-medium text-foreground">{opt.label}</span>
            </motion.button>
          ))}
        </div>
      )}

      {/* ── Tap Select ── */}
      {q.type === "tap-select" && q.options && (
        <div className="space-y-2.5 pb-4">
          {q.options.map((opt, i) => (
            <motion.button key={opt.value} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              onClick={() => onSelect(q.id, opt.value)}
              className={`w-full p-4 rounded-2xl text-left flex items-center gap-3 transition-all ${
                selectedPulse === opt.value ? "bg-primary/15 border-2 border-primary scale-[0.98]" : currentAnswer === opt.value ? "bg-primary/10 border-2 border-primary" : "bg-card border border-border"
              }`}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span className="text-sm font-medium text-foreground">{opt.label}</span>
            </motion.button>
          ))}
        </div>
      )}

      {/* ── Pill Grid (multi-select) ── */}
      {q.type === "pill-grid" && q.options && (
        <>
          <div className="flex flex-wrap gap-2 pb-4">
            {q.options.map((opt, i) => (
              <motion.button key={opt.value} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.02 }}
                onClick={() => onSelect(q.id, opt.value, true, q.maxSelect)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  multiAnswer.includes(opt.value) ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground"
                }`}
              >
                {opt.emoji} {opt.label}
              </motion.button>
            ))}
          </div>
          {multiAnswer.length > 0 && (
            <button onClick={onMultiSubmit} className="btn-primary-glow text-sm mt-2">
              Continue ({multiAnswer.length}/{q.maxSelect}) <ArrowRight size={16} />
            </button>
          )}
          <p className="text-xs text-muted-foreground text-center mt-2">Pick up to {q.maxSelect}</p>
        </>
      )}

      {/* ── Slider / Emoji Slider ── */}
      {(q.type === "slider" || q.type === "emoji-slider") && q.sliderLabels && (
        <div className="space-y-6 px-1 pb-4">
          <div className="flex justify-between text-3xl">
            <span>{q.sliderLabels.leftEmoji || "📋"}</span>
            <span>{q.sliderLabels.rightEmoji || "🌊"}</span>
          </div>
          <input type="range" min={1} max={5} value={sliderValue}
            onChange={e => setSliderValue(Number(e.target.value))}
            className="w-full"
            style={{ background: `linear-gradient(to right, hsl(var(--primary)) ${(sliderValue - 1) / 4 * 100}%, hsl(var(--muted)) ${(sliderValue - 1) / 4 * 100}%)` }}
          />
          <div className="flex justify-between text-xs text-muted-foreground font-medium">
            <span className="max-w-[45%]">{q.sliderLabels.left}</span>
            <span className="max-w-[45%] text-right">{q.sliderLabels.right}</span>
          </div>
          <button onClick={() => onSliderSubmit(q.id)} className="btn-primary-glow text-sm w-full flex items-center justify-center gap-2">
            Next <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ── Drag to Rank ── */}
      {q.type === "drag-rank" && q.options && (
        <DragRankInput
          options={q.options}
          items={dragItems.length > 0 ? dragItems : q.options.map(o => o.value)}
          onChange={(items) => { setDragItems(items); onDragRank(q.id, items); }}
          onSubmit={onMultiSubmit}
        />
      )}

      {/* ── Free Text ── */}
      {q.type === "free-text" && (
        <div className="space-y-4 pb-4">
          <textarea
            value={freeText}
            onChange={e => setFreeText(e.target.value)}
            placeholder={q.placeholder}
            className="w-full bg-card border border-border rounded-2xl p-4 text-foreground text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button onClick={() => onFreeTextSubmit(q.id)} className="btn-primary-glow text-sm w-full flex items-center justify-center gap-2">
            {freeText.trim() ? "See my results" : "Skip"} <Sparkles size={16} />
          </button>
          {q.skippable && !freeText.trim() && (
            <button onClick={() => onSkip(q.id)} className="text-xs text-muted-foreground text-center w-full hover:text-foreground transition-colors">
              Skip →
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

// ─── Drag Rank Input (simplified with buttons) ───
function DragRankInput({ options, items, onChange, onSubmit }: {
  options: { label: string; value: string; emoji?: string }[];
  items: string[];
  onChange: (items: string[]) => void;
  onSubmit: () => void;
}) {
  const moveUp = (i: number) => {
    if (i === 0) return;
    const next = [...items];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    onChange(next);
  };

  const moveDown = (i: number) => {
    if (i === items.length - 1) return;
    const next = [...items];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-2 pb-4">
      {items.map((val, i) => {
        const opt = options.find(o => o.value === val);
        if (!opt) return null;
        return (
          <motion.div key={val} layout className="flex items-center gap-2 bg-card border border-border rounded-2xl p-3">
            <span className="text-xs font-bold text-primary w-5 text-center">{i + 1}</span>
            <span className="text-lg">{opt.emoji}</span>
            <span className="text-sm font-medium text-foreground flex-1">{opt.label}</span>
            <div className="flex flex-col gap-0.5">
              <button onClick={() => moveUp(i)} disabled={i === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-20 text-xs">▲</button>
              <button onClick={() => moveDown(i)} disabled={i === items.length - 1} className="text-muted-foreground hover:text-foreground disabled:opacity-20 text-xs">▼</button>
            </div>
          </motion.div>
        );
      })}
      <button onClick={onSubmit} className="btn-primary-glow text-sm w-full flex items-center justify-center gap-2 mt-3">
        Lock it in <ArrowRight size={16} />
      </button>
    </div>
  );
}
