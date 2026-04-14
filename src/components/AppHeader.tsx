import { Bell, User, LogOut, Trophy, HelpCircle } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

export function AppHeader() {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/50 bg-card/80 backdrop-blur-md px-4 transition-all duration-300">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
      <motion.div className="hidden sm:flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <motion.img 
          src="/logo.svg"
          alt="Codemate X"
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          className="h-8 w-8 transition-all cursor-pointer"
        />
        <motion.span 
          className="text-sm font-semibold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Codemate X
        </motion.span>
      </motion.div>

      {/* Search removed - dark mode only, streamlined UI */}


      <div className="flex-1 sm:hidden" />

      <div className="flex items-center gap-2 ml-auto">
        {/* Mobile search removed - streamlined header */}

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <motion.button 
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="h-5 w-5" />
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span 
                  className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-1 text-[10px] font-bold text-white shadow-lg shadow-pink-500/50 animate-pulse-soft"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {unreadCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <AnimatePresence>
            {showNotifs && (
              <motion.div 
                initial={{ opacity: 0, y: -12, scale: 0.92 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={{ opacity: 0, y: -12, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute right-0 top-11 w-80 rounded-xl border border-border/50 bg-card/95 backdrop-blur-md p-0 shadow-2xl z-50 overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-border/50 px-4 py-3 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <h3 className="font-heading text-sm font-semibold">Notifications</h3>
                  <motion.button 
                    onClick={markAllRead} 
                    className="text-xs text-primary hover:underline transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Mark all read
                  </motion.button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 text-center text-sm text-muted-foreground">
                      No notifications yet
                    </motion.div>
                  ) : notifications.slice(0, 8).map((n, idx) => (
                    <motion.button 
                      key={n.id} 
                      onClick={() => markAsRead(n.id)}
                      className={`flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-all hover:bg-primary/5 ${!n.read ? "bg-primary/5 border-l-2 border-primary" : ""}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-sm font-medium">{n.title}</span>
                      <span className="text-xs text-muted-foreground">{n.message}</span>
                      <span className="text-[10px] text-muted-foreground">{n.time}</span>
                    </motion.button>
                  ))}
                </div>
                <motion.button 
                  onClick={() => { navigate("/notifications"); setShowNotifs(false); }}
                  className="w-full border-t border-border/50 py-2.5 text-center text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
                  whileHover={{ backgroundColor: "var(--primary-light)" }}
                >
                  View all notifications
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme toggle removed - dark mode only */}

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <motion.button 
            onClick={() => setShowProfile(!showProfile)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-primary/20 hover:ring-primary/50 transition-all shadow-lg">
              <AvatarFallback className="bg-gradient-to-br from-sky-500 to-purple-500 text-xs font-bold text-white">
                {user?.initials || "?"}
              </AvatarFallback>
            </Avatar>
          </motion.button>
          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, y: -12, scale: 0.92 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={{ opacity: 0, y: -12, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute right-0 top-11 w-64 rounded-xl border border-border/50 bg-card/95 backdrop-blur-md shadow-2xl z-50 overflow-hidden"
              >
                <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/30">
                    <AvatarFallback className="bg-gradient-to-br from-sky-500 to-purple-500 text-sm font-bold text-white">{user?.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    <p className="text-[10px] text-muted-foreground">{user?.department}{user?.semester ? ` · Sem ${user.semester}` : ""}</p>
                  </div>
                </div>
                {user?.skills && user.skills.length > 0 && (
                  <div className="border-b border-border/50 px-4 py-2">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {user.skills.map((s, idx) => (
                        <motion.span 
                          key={s} 
                          className="rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 px-2 py-0.5 text-[10px] font-medium text-primary border border-primary/30"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="p-1.5 space-y-1">
                  <motion.button 
                    onClick={() => { navigate("/profile"); setShowProfile(false); }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-all hover:bg-primary/10"
                    whileHover={{ x: 4 }}
                  >
                    <User className="h-4 w-4" /> View Profile
                  </motion.button>
                  <motion.button 
                    onClick={() => { navigate("/leaderboard"); setShowProfile(false); }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-all hover:bg-primary/10"
                    whileHover={{ x: 4 }}
                  >
                    <Trophy className="h-4 w-4" /> Leaderboard
                  </motion.button>
                  <motion.button 
                    onClick={() => { navigate("/help"); setShowProfile(false); }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-all hover:bg-primary/10"
                    whileHover={{ x: 4 }}
                  >
                    <HelpCircle className="h-4 w-4" /> Help & Support
                  </motion.button>
                  <motion.button 
                    onClick={logout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive transition-all hover:bg-destructive/10"
                    whileHover={{ x: 4 }}
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
