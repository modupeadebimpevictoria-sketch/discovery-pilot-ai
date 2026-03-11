import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useApp } from "@/contexts/AppContext";
import { getCareerById } from "@/data/careers";
import SpringBoardLogo from "@/components/SpringBoardLogo";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/career-mentor`;

function useStudentContext() {
  const {
    profile, selectedCareerPath, matchedCareers, xp, streak,
    completedQuests, completedMissions, badges, archetype,
    pulseCheck, journalEntries,
  } = useApp();

  const careerId = selectedCareerPath || matchedCareers[0]?.careerId;
  const career = careerId ? getCareerById(careerId) : null;
  const lastJournal = journalEntries.length > 0 ? journalEntries[journalEntries.length - 1] : null;

  return {
    name: profile?.name,
    age: profile?.age,
    grade: profile?.grade,
    country: profile?.country,
    subjects: profile?.subjects,
    interests: profile?.interests,
    dreamCareer: profile?.dreamCareer,
    activeCareer: career?.title,
    activeCareerPath: selectedCareerPath,
    matchedCareers: matchedCareers.map(m => {
      const c = getCareerById(m.careerId);
      return { title: c?.title || m.careerId, score: m.score };
    }),
    xp,
    streak,
    completedQuests: completedQuests.length,
    completedMissions: completedMissions.length,
    badges,
    archetype,
    pulseCheck,
    lastJournalEntry: lastJournal?.text,
  };
}

function getTimeGreeting(name?: string) {
  const hour = new Date().getHours();
  const n = name || "there";
  if (hour < 12) return `Good morning ${n} ☀️`;
  if (hour < 17) return `Good afternoon ${n} 🌤️`;
  return `Good evening ${n} 🌙`;
}

export default function MentorPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const studentContext = useStudentContext();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const allMessages = [...messages, userMsg];

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages, studentContext }),
      });

      if (resp.status === 429) {
        toast.error("Too many messages — try again in a minute!");
        setIsLoading(false);
        return;
      }
      if (resp.status === 402) {
        toast.error("AI mentor temporarily unavailable. Try again later!");
        setIsLoading(false);
        return;
      }

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to connect");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { streamDone = true; break; }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch { /* ignore */ }
        }
      }
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Oops! ${e.message || "Something went wrong."} Try asking again! 😊` },
      ]);
    }

    setIsLoading(false);
  };

  const activeCareer = studentContext.activeCareer;

  const suggestedPrompts = [
    "What should I focus on this week?",
    activeCareer
      ? `Is ${activeCareer} right for me if I'm bad at maths?`
      : "Is this career right for me if I'm bad at maths?",
    activeCareer
      ? `What does a day as a ${activeCareer} actually look like?`
      : "What does a day as a doctor actually look like?",
    "How do I stand out when applying for internships?",
    "I'm thinking of switching careers — what do I do?",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <div className="glass-heavy border-b border-glass-border/30 px-4 py-3 flex items-center gap-3 sticky top-[52px] z-30">
        <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center overflow-hidden">
          <SpringBoardLogo size={28} />
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-bold text-foreground">SpringBoard AI Mentor</h2>
          <p className="text-[10px] text-muted-foreground">
            {activeCareer ? `Helping you explore ${activeCareer} 🎯` : "Your career guide — ask anything 🚀"}
          </p>
        </div>
        {studentContext.streak > 0 && (
          <span className="text-[10px] font-bold text-glow-pink px-2 py-1 rounded-full bg-glow-pink/10 border border-glow-pink/20">
            🔥 {studentContext.streak}
          </span>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="space-y-5 pt-6">
            {/* Welcome */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-glow-purple/10 border border-glow-purple/20 mx-auto flex items-center justify-center">
                <SpringBoardLogo size={36} />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {getTimeGreeting(studentContext.name)}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                {activeCareer
                  ? `I know you're exploring ${activeCareer}. Ask me anything — career advice, subject choices, interview tips, or just life stuff. 💬`
                  : "I'm your personal career mentor. Ask me anything about your future — no question is too random! 💬"}
              </p>
            </div>

            {/* Suggested prompts as pills */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-1">Try asking</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="px-3 py-2 rounded-full border border-border/60 text-xs text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all active:scale-95"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Context cards */}
            {(activeCareer || studentContext.xp > 0) && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {activeCareer && (
                  <div className="flex-shrink-0 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20">
                    <p className="text-[10px] text-muted-foreground">Active Path</p>
                    <p className="text-xs font-bold text-primary">{activeCareer}</p>
                  </div>
                )}
                {studentContext.xp > 0 && (
                  <div className="flex-shrink-0 px-3 py-2 rounded-xl bg-glow-purple/10 border border-glow-purple/20">
                    <p className="text-[10px] text-muted-foreground">XP Level</p>
                    <p className="text-xs font-bold text-glow-purple">⚡ {studentContext.xp} XP</p>
                  </div>
                )}
                {studentContext.completedQuests > 0 && (
                  <div className="flex-shrink-0 px-3 py-2 rounded-xl bg-glow-pink/10 border border-glow-pink/20">
                    <p className="text-[10px] text-muted-foreground">Quests</p>
                    <p className="text-xs font-bold text-glow-pink">✅ {studentContext.completedQuests} done</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden">
                <SpringBoardLogo size={18} />
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "glass-card text-foreground rounded-bl-md"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="prose prose-sm max-w-none dark:prose-invert [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:mb-2 [&>ol]:mb-2">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <User size={14} className="text-primary" />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center flex-shrink-0 overflow-hidden">
              <SpringBoardLogo size={18} />
            </div>
            <div className="glass-card px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-glow-purple animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-glow-pink animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="glass-heavy border-t border-glass-border/30 px-4 py-3 sticky bottom-20">
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={activeCareer ? `Ask about ${activeCareer} or anything...` : "Ask me anything about careers..."}
            className="flex-1 px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center disabled:opacity-40 transition-opacity active:scale-95"
          >
            <Send size={18} className="text-primary-foreground" />
          </button>
        </form>
      </div>
    </div>
  );
}
