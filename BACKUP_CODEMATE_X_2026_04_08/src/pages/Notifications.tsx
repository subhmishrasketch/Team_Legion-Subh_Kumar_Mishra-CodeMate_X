import { DashboardLayout } from "@/components/DashboardLayout";
import { useNotifications } from "@/contexts/NotificationContext";
import { Bell, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const { notifications, markAsRead, markAllRead } = useNotifications();
  const navigate = useNavigate();

  const handleNotificationClick = (n: any) => {
    markAsRead(n.id);
    if (n.type === "warning" && n.projectTitle) {
      // For join requests, navigate to my-projects
      navigate("/my-projects");
    }
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold flex items-center gap-2">
              <Bell className="h-7 w-7 text-primary" /> Notifications
            </h1>
            <p className="mt-1 text-muted-foreground">Stay updated with the latest activity.</p>
          </div>
          <button onClick={markAllRead} className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted">
            <Check className="h-4 w-4" /> Mark all read
          </button>
        </div>

        <div className="rounded-xl border border-border bg-card">
          {notifications.length === 0 ? (
            <p className="p-8 text-center text-muted-foreground">No notifications yet. They'll appear here automatically!</p>
          ) : (
            notifications.map((n, i) => (
              <button
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={`flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/50 ${
                  i < notifications.length - 1 ? "border-b border-border" : ""
                } ${!n.read ? "bg-primary/5" : ""}`}
              >
                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${!n.read ? "bg-primary" : "bg-transparent"}`} />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
                  {n.type === "warning" && n.projectTitle && (
                    <p className="mt-1 text-xs text-primary">Click to manage</p>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Notifications;
