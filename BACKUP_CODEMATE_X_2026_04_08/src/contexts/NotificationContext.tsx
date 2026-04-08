import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
  projectTitle?: string; // for joinAccepted
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  latestPopup: Notification | null;
  clearPopup: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const STUDENT_NOTIFICATIONS = [
  { title: "🎉 Hackathon 2026", message: "Registration opens tomorrow! Don't miss out.", type: "info" as const },
  { title: "📢 Workshop Alert", message: "ML/AI workshop this Friday at Lab 3.", type: "success" as const },
  { title: "🏆 Leaderboard Update", message: "You moved up to #12 this week!", type: "info" as const },
  { title: "⚡ New Project Posted", message: "AI Campus Navigator needs React devs.", type: "warning" as const },
  { title: "🎓 Seminar Tomorrow", message: "Guest lecture on Cloud Computing at 2 PM.", type: "info" as const },
  { title: "📝 Deadline Reminder", message: "Green Energy Dashboard submission in 3 days.", type: "warning" as const },
  { title: "🤝 Team Invite", message: "Priya S. invited you to Smart Parking project.", type: "success" as const },
  { title: "🔔 Event Update", message: "Code Sprint venue changed to Auditorium B.", type: "info" as const },
];

const ADMIN_NOTIFICATIONS = [
  { title: "📋 Event Proposal", message: "Tech fest committee submitted budget proposal.", type: "info" as const },
  { title: "🏗️ Venue Request", message: "Event team requests Main Hall for Mar 15.", type: "warning" as const },
  { title: "✅ Event Approved", message: "Annual Hackathon approved by Dean's office.", type: "success" as const },
  { title: "📊 Attendance Report", message: "Workshop attendance: 145/200 registered.", type: "info" as const },
  { title: "🔧 Infra Request", message: "Event team needs 50 extra workstations.", type: "warning" as const },
  { title: "📢 Sponsorship Update", message: "TechCorp confirmed Gold sponsorship.", type: "success" as const },
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [latestPopup, setLatestPopup] = useState<Notification | null>(null);
  const [notifIndex, setNotifIndex] = useState(0);

  const NOTIF_INTERVAL = 30000; // 30 seconds

  const pool = user?.role === "admin" ? ADMIN_NOTIFICATIONS : STUDENT_NOTIFICATIONS;

  useEffect(() => {
    if (!user) { setNotifications([]); return; }
    // Seed 2 initial notifications
    const initial = pool.slice(0, 2).map((n, i) => ({
      ...n, id: `init-${i}`, time: "Just now", read: false,
    }));

    // Load joinAccepted and owner notifications
    try {
      const notifKey = `joinAccepted_${user.email}`;
      const storedNotifs = localStorage.getItem(notifKey);
      const joinNotifs = storedNotifs ? JSON.parse(storedNotifs).map((n: any, i: number) => ({
        id: `join-${i}`,
        title: "🎉 Team Invite Accepted!",
        message: `You were accepted to join "${n.projectTitle}" by ${n.projectOwner}`,
        time: n.timestamp,
        read: false,
        type: "success" as const,
        projectTitle: n.projectTitle
      })) : [];

      const ownerNotifKey = `ownerNotifs_${user.email}`;
      const ownerStored = localStorage.getItem(ownerNotifKey);
      const ownerNotifs = ownerStored ? JSON.parse(ownerStored).map((n: any, i: number) => ({
        id: `owner-${i}`,
        title: "👥 New Join Request",
        message: `${n.applicantName} wants to join "${n.projectTitle}"`,
        time: n.timestamp,
        read: false,
        type: "warning" as const,
        projectTitle: n.projectTitle,
        applicantEmail: n.applicantEmail
      })) : [];

      setNotifications([...initial, ...joinNotifs, ...ownerNotifs]);
    } catch (err) {
      console.error("Error loading notifications:", err);
      setNotifications(initial);
    }

    setNotifIndex(2);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      setNotifIndex((prev) => {
        const idx = prev % pool.length;
        const n: Notification = {
          ...pool[idx],
          id: `notif-${Date.now()}`,
          time: "Just now",
          read: false,
        };
        setNotifications((old) => [n, ...old].slice(0, 20));
        setLatestPopup(n);
        setTimeout(() => setLatestPopup(null), 4000);
        return prev + 1;
      });
    }, NOTIF_INTERVAL);
    return () => clearInterval(interval);
  }, [user, pool]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAsRead = useCallback((id: string) => {
    setNotifications((old) => old.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);
  const markAllRead = useCallback(() => {
    setNotifications((old) => old.map((n) => ({ ...n, read: true })));
  }, []);
  const clearPopup = useCallback(() => setLatestPopup(null), []);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllRead, latestPopup, clearPopup }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be inside NotificationProvider");
  return ctx;
}
