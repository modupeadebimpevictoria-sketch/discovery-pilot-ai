import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquarePlus, Send, Star } from "lucide-react";
import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CATEGORIES = ["Bug 🐛", "Feature 💡", "Content 📝", "Other"];
const RATINGS = [1, 2, 3, 4, 5];

interface FeedbackSheetProps {
  userId: string;
}

export default function FeedbackSheet({ userId }: FeedbackSheetProps) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const reset = () => {
    setCategory("");
    setRating(0);
    setMessage("");
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Please write a message");
      return;
    }
    setSending(true);
    try {
      // Store as a notification to admin for now
      await supabase.from("notifications").insert({
        user_id: userId,
        type: "feedback",
        title: `Feedback: ${category || "General"}`,
        message: `[Rating: ${rating || "N/A"}/5] ${message.trim()}`,
      });
      toast.success("Thanks for your feedback! 💚");
      reset();
      setOpen(false);
    } catch {
      toast.error("Couldn't send — try again later");
    } finally {
      setSending(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="w-full glass-card p-3.5 rounded-xl flex items-center gap-3 text-left">
          <MessageSquarePlus size={18} className="text-primary" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Send Feedback</p>
            <p className="text-[10px] text-muted-foreground">Bugs, ideas, or just say hi</p>
          </div>
          <Send size={14} className="text-muted-foreground" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="px-5 pb-8">
        <DrawerHeader className="px-0">
          <DrawerTitle className="text-lg font-bold text-foreground">Send Feedback</DrawerTitle>
        </DrawerHeader>

        <div className="space-y-5">
          {/* Category */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">What's this about?</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c === category ? "" : c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    category === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">How's your experience?</p>
            <div className="flex gap-2">
              {RATINGS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRating(r === rating ? 0 : r)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={28}
                    className={r <= rating ? "text-primary fill-primary" : "text-muted-foreground/40"}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Your message</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what's on your mind…"
              rows={4}
              className="w-full bg-muted/30 border border-border rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={sending || !message.trim()}
            className="w-full py-3 rounded-xl text-sm font-bold bg-primary text-primary-foreground disabled:opacity-40 transition-all flex items-center justify-center gap-2"
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send size={14} /> Send Feedback
              </>
            )}
          </motion.button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
