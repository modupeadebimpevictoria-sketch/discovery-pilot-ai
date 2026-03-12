import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, Sparkles, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useApp } from "@/contexts/AppContext";
import { useCareers } from "@/contexts/CareersContext";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/career-mentor`;

const suggestedQuestions = [
  "What subjects should I take if I want to be a doctor? 🩺",
  "Is coding hard to learn? 💻",
  "What careers pay the most? 💰",
  "I like art — what jobs can I do? 🎨",
  "How do I know what career is right for me? 🤔",
];

function useStudentContext() {
  const {
    profile, selectedCareerPath, matchedCareers, xp, streak,
    completedQuests, completedMissions, badges, archetype,
  } = useApp();
  const { getCareerById } = useCareers();

  const careerId = selectedCareerPath || matchedCareers[0]?.careerId;
  const career = careerId ? getCareerById(careerId) : null;

  return {
    name: profile?.name,
    age: profile?.age,
    grade: profile?.grade,
    country: profile?.country,
    subjects: profile?.subjects,
    interests: profile?.interests,
    dreamCareer: profile?.dreamCareer,
    activeCareer: career?.title,
    xp,
    streak,
    completedQuests: completedQuests.length,
    completedMissions: completedMissions.length,
    badges,
    archetype,
  };
}

export default function OrbitChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
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
  const dynamicSuggestions = activeCareer
    ? [
        `What does a day in the life of a ${activeCareer} look like? 🌅`,
        `What WAEC subjects do I need for ${activeCareer}? 📚`,
        `How much does a ${activeCareer} earn in Nigeria? 💰`,
        ...suggestedQuestions.slice(3),
      ]
    : suggestedQuestions;

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 25 }}
      className="fixed inset-0 z-[100] bg-background flex flex-col"
    >
      {/* Header */}
      <div className="glass-heavy border-b border-glass-border/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center">
            <Bot size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">SpringBoard AI</h2>
            <p className="text-[10px] text-muted-foreground">
              {activeCareer ? `Helping you become a ${activeCareer} 🎯` : "Your career launchpad 🚀"}
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl bg-muted/50">
          <X size={18} className="text-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="space-y-4 pt-8">
            <div className="text-center space-y-2">
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 2, ease: [0.34, 1.56, 0.64, 1] }} className="text-6xl">
                🚀
              </motion.div>
              <h3 className="text-lg font-bold gradient-text">
                {studentContext.name ? `Hey ${studentContext.name}! 👋` : "Hey there! I'm SpringBoard AI"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {activeCareer
                  ? `I know you're exploring ${activeCareer} — ask me anything about it or any other career! 💬`
                  : "I'm here to springboard you into the right career. Ask me anything about your future! 💬"}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Try asking:</p>
              {dynamicSuggestions.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="w-full text-left glass-card p-3 rounded-xl text-sm text-foreground hover:border-primary/30 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles size={14} className="text-primary-foreground" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "gradient-bg text-primary-foreground rounded-br-md"
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
              <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                <User size={14} className="text-muted-foreground" />
              </div>
            )}
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
              <Sparkles size={14} className="text-primary-foreground" />
            </div>
            <div className="glass-card px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="glass-heavy border-t border-glass-border/30 px-4 py-3">
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={activeCareer ? `Ask about ${activeCareer} or anything...` : "Ask me anything about careers..."}
            className="flex-1 px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center disabled:opacity-40 transition-opacity"
          >
            <Send size={18} className="text-primary-foreground" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
