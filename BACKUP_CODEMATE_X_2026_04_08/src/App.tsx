import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SmartMatching from "./pages/SmartMatching";
import RevivalHub from "./pages/RevivalHub";
import Leaderboard from "./pages/Leaderboard";
import Notifications from "./pages/Notifications";
import PostProject from "./pages/PostProject";
import MyProjects from "./pages/MyProjects";
import ProjectDetails from "./pages/ProjectDetails";
import ManageProject from "./pages/ManageProject";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/smart-matching" element={<ProtectedRoute><SmartMatching /></ProtectedRoute>} />
    <Route path="/revival-hub" element={<ProtectedRoute><RevivalHub /></ProtectedRoute>} />
    <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
    <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
    <Route path="/post-project" element={<ProtectedRoute><PostProject /></ProtectedRoute>} />
    <Route path="/my-projects" element={<ProtectedRoute><MyProjects /></ProtectedRoute>} />
    <Route path="/my-projects/:slug" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
    <Route path="/my-projects/:slug/manage" element={<ProtectedRoute><ManageProject /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
    <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <NotificationProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </NotificationProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
