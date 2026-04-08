import { motion, AnimatePresence } from "framer-motion";
import { Bell, Mail, MessageSquare, CheckCircle2, Settings, Eye, EyeOff, Send } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "email" | "in-app" | "sms";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: "project" | "team" | "event" | "system";
}

interface NotificationPreference {
  category: string;
  email: boolean;
  inApp: boolean;
  sms: boolean;
}

const NotificationHub = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "email",
      title: "New Team Invitation",
      message: "Priya invited you to join 'AI Campus Navigator' project",
      timestamp: "2 hours ago",
      read: false,
      category: "team",
    },
    {
      id: "2",
      type: "in-app",
      title: "Project Deadline",
      message: "Smart Attendance System project deadline in 3 days",
      timestamp: "1 day ago",
      read: true,
      category: "project",
    },
    {
      id: "3",
      type: "email",
      title: "Event Registration Confirmation",
      message: "Your registration for Annual Hackathon 2026 is confirmed",
      timestamp: "3 days ago",
      read: true,
      category: "event",
    },
  ]);

  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    { category: "Projects", email: true, inApp: true, sms: false },
    { category: "Teams", email: true, inApp: true, sms: true },
    { category: "Events", email: false, inApp: true, sms: false },
    { category: "System", email: true, inApp: true, sms: false },
  ]);

  const [showSettings, setShowSettings] = useState(false);
  const [email, setEmail] = useState("student@codemate.com");

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
  const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const togglePreference = (index: number, field: "email" | "inApp" | "sms") => {
    setPreferences((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: !updated[index][field] };
      return updated;
    });
    toast.success("Preferences updated!");
  };

  const subscribeEmail = () => {
    if (email) {
      toast.success(`Subscribed ${email} to notifications! 📧`);
      setShowSettings(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-500" />;
      case "sms":
        return <MessageSquare className="h-4 w-4 text-cyan-500" />;
      default:
        return <Bell className="h-4 w-4 text-primary" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      project: "bg-blue-500/10 text-blue-600 border-blue-200",
      team: "bg-purple-500/10 text-purple-600 border-purple-200",
      event: "bg-orange-500/10 text-orange-600 border-orange-200",
      system: "bg-gray-500/10 text-gray-600 border-gray-200",
    };
    return colors[category] || colors.system;
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header with stats */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" /> Notification Hub
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your notifications and email preferences
          </p>
        </div>
        <motion.button
          onClick={() => setShowSettings(!showSettings)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/30 hover:bg-primary/20 transition-colors"
        >
          <Settings className="h-4 w-4" /> Preferences
        </motion.button>
      </motion.div>

      {/* Notification Stats */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-3">
        <motion.div whileHover={{ y: -2 }} className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Unread</p>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold text-primary">{unreadCount}</p>
            <p className="text-xs text-muted-foreground mb-1">notifications</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Total</p>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold text-success">{notifications.length}</p>
            <p className="text-xs text-muted-foreground mb-1">all time</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Email</p>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold text-blue-500">
              {notifications.filter((n) => n.type === "email").length}
            </p>
            <p className="text-xs text-muted-foreground mb-1">received</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Preferences Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 overflow-hidden"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5" /> Notification Preferences
            </h3>

            {/* Email Subscription */}
            <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-200">
              <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email Subscription
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 rounded-lg border border-blue-200 bg-white/50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                />
                <motion.button
                  onClick={subscribeEmail}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Send className="h-4 w-4" /> Subscribe
                </motion.button>
              </div>
            </div>

            {/* Category Preferences */}
            <div className="space-y-3">
              <p className="text-sm font-semibold mb-3">Notification by Category:</p>
              {preferences.map((pref, idx) => (
                <motion.div
                  key={pref.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/30 hover:bg-card/60 transition-colors"
                >
                  <p className="text-sm font-medium">{pref.category}</p>
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => togglePreference(idx, "email")}
                      whileHover={{ scale: 1.1 }}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                        pref.email
                          ? "bg-blue-500/20 text-blue-600 border border-blue-200"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                      title="Email"
                    >
                      {pref.email ? <Mail className="h-4 w-4" /> : <EyeOff className="h-3 w-3" />}
                    </motion.button>
                    <motion.button
                      onClick={() => togglePreference(idx, "inApp")}
                      whileHover={{ scale: 1.1 }}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                        pref.inApp
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                      title="In-App"
                    >
                      {pref.inApp ? <Bell className="h-4 w-4" /> : <EyeOff className="h-3 w-3" />}
                    </motion.button>
                    <motion.button
                      onClick={() => togglePreference(idx, "sms")}
                      whileHover={{ scale: 1.1 }}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                        pref.sms
                          ? "bg-cyan-500/20 text-cyan-600 border border-cyan-200"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                      title="SMS"
                    >
                      {pref.sms ? (
                        <MessageSquare className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-3 w-3" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications List */}
      <motion.div variants={item} className="space-y-2">
        <h3 className="font-semibold mb-3">Recent Notifications</h3>
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notif, idx) => (
              <motion.button
                key={notif.id}
                variants={item}
                onClick={() => markAsRead(notif.id)}
                className={`w-full text-left rounded-xl border transition-all p-4 ${
                  notif.read
                    ? "border-border/30 bg-card/30 hover:bg-card/60"
                    : "border-primary/30 bg-primary/5 hover:bg-primary/10"
                }`}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    className="mt-1 flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    {getIcon(notif.type)}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-sm font-semibold ${notif.read ? "text-muted-foreground" : "text-foreground"}`}>
                        {notif.title}
                      </p>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${getCategoryColor(notif.category)}`}
                      >
                        {notif.category}
                      </Badge>
                      {!notif.read && (
                        <motion.div
                          className="ml-auto flex h-2 w-2 rounded-full bg-primary"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {notif.message}
                    </p>
                    <p className="text-[10px] text-muted-foreground/60">
                      {notif.timestamp}
                    </p>
                  </div>
                  {!notif.read && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex-shrink-0"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary/40 hover:text-primary transition-colors" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NotificationHub;
