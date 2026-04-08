import { Bell, Search, User, LogOut, Sun, Moon, X, Zap } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { getTestUsersForSelector, switchTestUser } from "@/lib/testUsers";

const SEARCHABLE = [
  { label: "Dashboard", path: "/dashboard", tags: "home overview stats" },
  { label: "Post Project", path: "/post-project", tags: "create new idea" },
  { label: "My Projects", path: "/my-projects", tags: "projects list" },
  { label: "Smart Matching", path: "/smart-matching", tags: "skills teammates find" },
  { label: "Revival Hub", path: "/revival-hub", tags: "abandoned revive adopt" },
  { label: "Leaderboard", path: "/leaderboard", tags: "ranking trophy points" },
  { label: "Notifications", path: "/notifications", tags: "alerts updates" },
  { label: "Help & Support", path: "/help", tags: "guide tutorial complain report" },
  { label: "Profile", path: "/profile", tags: "account settings department skills" },
  { label: "Analytics", path: "/analytics", tags: "admin stats data" },
  { label: "React", path: "/smart-matching", tags: "skill react frontend" },
  { label: "Python", path: "/smart-matching", tags: "skill python backend" },
  { label: "ML/AI", path: "/smart-matching", tags: "skill machine learning ai" },
  { label: "AI Campus Navigator", path: "/dashboard", tags: "project ai navigation" },
  { label: "Green Energy Dashboard", path: "/dashboard", tags: "project energy iot" },
];

export function AppHeader() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showTestUsers, setShowTestUsers] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const testUsersRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false);
      if (testUsersRef.current && !testUsersRef.current.contains(e.target as Node)) setShowTestUsers(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const searchResults = searchQuery.length > 1
    ? SEARCHABLE.filter((s) => `${s.label} ${s.tags}`.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/50 bg-card/80 backdrop-blur-md px-4 transition-all duration-300">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
      <motion.div className="hidden sm:flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <motion.div 
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          className="h-8 w-8 rounded-md flex items-center justify-center bg-gradient-to-br from-sky-500 via-purple-500 to-pink-500 text-white font-bold text-sm shadow-lg shadow-purple-500/50 cursor-pointer transition-all"
        >
          CM
        </motion.div>
        <motion.span 
          className="text-sm font-semibold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          CodeMate
        </motion.span>
      </motion.div>

      {/* Search */}
      <div ref={searchRef} className="relative hidden max-w-md flex-1 sm:block">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <motion.input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
            onFocus={() => setShowSearch(true)}
            placeholder="Search projects, skills, students..."
            className="h-9 w-full rounded-xl border border-border/50 bg-muted/30 backdrop-blur-sm pl-9 pr-8 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 hover:bg-muted/50"
            whileFocus={{ scale: 1.02 }}
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button 
                onClick={() => { setSearchQuery(""); setShowSearch(false); }} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <X className="h-3.5 w-3.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {showSearch && searchResults.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -8, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute left-0 top-11 w-full rounded-xl border border-border/50 bg-card/95 backdrop-blur-md shadow-2xl z-50 overflow-hidden"
            >
              {searchResults.map((r, i) => (
                <motion.button 
                  key={i} 
                  onClick={() => { navigate(r.path); setSearchQuery(""); setShowSearch(false); }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-primary/5 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span>{r.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 sm:hidden" />

      <div className="flex items-center gap-2 ml-auto">
        {/* Mobile search */}
        <motion.button 
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground sm:hidden hover:bg-primary/10 hover:text-primary transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { /* Could expand mobile search */ }}
        >
          <Search className="h-5 w-5" />
        </motion.button>

        {/* Test Users Switcher (Dev only) */}
        {import.meta.env.DEV && (
          <div ref={testUsersRef} className="relative">
            <motion.button 
              onClick={() => setShowTestUsers(!showTestUsers)}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-amber-500/20 hover:text-amber-600 dark:hover:text-amber-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Test Users (Dev)"
            >
              <Zap className="h-5 w-5" />
            </motion.button>
            <AnimatePresence>
              {showTestUsers && (
                <motion.div 
                  initial={{ opacity: 0, y: -12, scale: 0.92 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: -12, scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute right-0 top-11 w-56 rounded-lg border border-amber-500/30 bg-card/95 backdrop-blur-md shadow-2xl z-50 overflow-hidden"
                >
                  <div className="border-b border-amber-500/20 px-3 py-2 bg-amber-500/10">
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">🧪 TEST USERS</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-1 p-1">
                    {getTestUsersForSelector().map((user) => (
                      <motion.button 
                        key={user.email}
                        onClick={() => {
                          switchTestUser(user.email);
                          setShowTestUsers(false);
                        }}
                        className="flex w-full items-start gap-2 rounded-md px-3 py-2 text-xs text-left hover:bg-amber-500/20 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{user.name}</p>
                          <p className="text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

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

        {/* Theme switch */}
        <motion.button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
          whileHover={{ scale: 1.1, rotate: 20 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.div key="sun" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
                <Sun className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
                <Moon className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

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
