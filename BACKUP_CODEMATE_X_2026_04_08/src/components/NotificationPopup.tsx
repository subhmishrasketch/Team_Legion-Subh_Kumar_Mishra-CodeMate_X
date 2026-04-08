import { useNotifications } from "@/contexts/NotificationContext";
import { AnimatePresence, motion } from "framer-motion";
import { X, Bell } from "lucide-react";

export function NotificationPopup() {
  const { latestPopup, clearPopup } = useNotifications();

  return (
    <AnimatePresence>
      {latestPopup && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed right-4 top-16 z-50 w-80 rounded-xl border border-border bg-card p-4 shadow-2xl"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-primary">
              <Bell className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{latestPopup.title}</p>
              <p className="text-xs text-muted-foreground">{latestPopup.message}</p>
            </div>
            <button onClick={clearPopup} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
