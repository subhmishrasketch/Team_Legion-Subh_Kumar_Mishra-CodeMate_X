import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Sparkles, Zap, Users, Trophy, ArrowRight, Settings, Bell, LogOut } from "lucide-react";
import Navbar from "@/components/Landing/Navbar";
import ParticleBackground from "@/components/Landing/ParticleBackground";

export default function DashboardLanding() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userRole = user?.role === "admin" ? "Administrator" : "Student";
  const userStats = user?.role === "admin" 
    ? [
        { label: "Total Students", value: "1,248", icon: Users },
        { label: "Active Projects", value: "156", icon: Zap },
        { label: "Avg. Activity", value: "78%", icon: Trophy },
      ]
    : [
        { label: "Projects Active", value: "3", icon: Zap },
        { label: "Team Connections", value: "12", icon: Users },
        { label: "Activity Points", value: "285", icon: Trophy },
      ];

  const quickActions = user?.role === "admin"
    ? [
        { title: "Manage Students", icon: Users, color: "from-blue-500 to-cyan-500", route: "/analytics" },
        { title: "View Events", icon: Sparkles, color: "from-purple-500 to-pink-500", route: "/analytics" },
        { title: "Analytics", icon: Trophy, color: "from-orange-500 to-red-500", route: "/analytics" },
      ]
    : [
        { title: "Find Teams", icon: Users, color: "from-blue-500 to-cyan-500", route: "/smart-matching" },
        { title: "Explore Projects", icon: Sparkles, color: "from-purple-500 to-pink-500", route: "/revival-hub" },
        { title: "Leaderboard", icon: Trophy, color: "from-orange-500 to-red-500", route: "/leaderboard" },
      ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Navbar */}
      <Navbar scrolled={scrolled} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto w-full">
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">{user?.initials}</span>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">Welcome back, {user?.name?.split(" ")[0]}!</h1>
                <p className="text-gray-400 text-lg">{userRole} Dashboard</p>
              </div>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Ready to build something amazing? Explore new opportunities, connect with talented peers, and create impact.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {userStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-xl p-8 text-center"
                >
                  <Icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-400" />
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(action.route)}
                    className={`relative group rounded-2xl overflow-hidden border border-white/10 p-8 text-left cursor-pointer transition-all hover:border-white/20`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-5 group-hover:opacity-20 transition-opacity`} />
                    <div className="relative z-10">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${action.color} text-white mb-3`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{action.title}</h3>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {"Time to "}<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Build Impact</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              {user?.role === "admin" 
                ? "Manage students, organize events, and track platform growth from your dashboard."
                : "Connect with talented students, collaborate on real projects, and get discovered."}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(user?.role === "admin" ? "/analytics" : "/smart-matching")}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 border border-blue-400/50 inline-flex items-center gap-2"
            >
              {user?.role === "admin" ? "Go to Analytics" : "Find Your Team"}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Menu */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="fixed bottom-8 right-8 flex flex-col gap-3 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/notifications")}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          <Bell className="w-6 h-6 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/profile")}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          <Settings className="w-6 h-6 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={handleLogout}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-orange-600 flex items-center justify-center hover:shadow-lg hover:shadow-red-500/50 transition-all"
        >
          <LogOut className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-8 px-6 text-center text-gray-400">
        <p>© 2026 CodeMate X · Empowering student collaboration</p>
      </footer>
    </div>
  );
}
