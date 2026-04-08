import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { NotificationPopup } from "./NotificationPopup";
import { motion } from "framer-motion";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <AppHeader />
          <motion.main 
            className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-background to-background/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="max-w-7xl mx-auto space-y-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {children}
            </motion.div>
          </motion.main>
        </div>
      </div>
      <NotificationPopup />
    </SidebarProvider>
  );
}
