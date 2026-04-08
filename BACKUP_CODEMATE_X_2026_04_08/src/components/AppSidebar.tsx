import {
  LayoutDashboard, FolderPlus, FolderOpen, Sparkles, RefreshCw,
  Trophy, BarChart3, Code2, HelpCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
// ...existing code...

const studentItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Post Project", url: "/post-project", icon: FolderPlus },
  { title: "My Projects", url: "/my-projects", icon: FolderOpen },
  { title: "Smart Matching", url: "/smart-matching", icon: Sparkles },
  { title: "Revival Hub", url: "/revival-hub", icon: RefreshCw },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Help & Support", url: "/help", icon: HelpCircle },
];

const adminItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Help & Support", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user } = useAuth();

  const mainItems = user?.role === "admin" ? adminItems : studentItems;

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <div className="flex items-center gap-2 px-4 py-4">
        <motion.div
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="h-9 w-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-xs font-bold text-white shadow-lg shadow-purple-500/50"
        >CM</motion.div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-heading text-sm font-bold text-sidebar-primary-foreground leading-tight">CodeMate</span>
            <span className="text-[10px] text-sidebar-foreground/60 leading-tight">Code together. Build better.</span>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-label text-xs font-semibold uppercase tracking-wider">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
