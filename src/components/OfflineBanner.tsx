import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { motion, AnimatePresence } from "framer-motion";

export default function OfflineBanner() {
  const isOnline = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed top-[53px] left-0 right-0 z-50 overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2 bg-destructive/90 text-destructive-foreground text-xs font-medium py-1.5 px-4 backdrop-blur-sm">
            <WifiOff size={14} />
            <span>You're offline — showing cached data</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
