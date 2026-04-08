import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import TransitionAnimation from "@/components/TransitionAnimation";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";
import {
  Zap, Users, GitBranch, Trophy, Rocket, Brain,
  Activity, Globe, TrendingUp, Sparkles
} from "lucide-react";
import Navbar from "@/components/Landing/Navbar";
import ActivityTicker from "@/components/Landing/ActivityTicker";
import FeatureCard from "@/components/Landing/FeatureCard";
import TestimonialCard from "@/components/Landing/TestimonialCard";
import LeaderboardCard from "@/components/Landing/LeaderboardCard";
import StatsCard from "@/components/Landing/StatsCard";
import HeroSection from "@/components/Landing/HeroSection";
import CTASection from "@/components/Landing/CTASection";

/* ════════════════════════════════════════════════════ */
/*  CONFIGURATION & DATA                               */
/* ════════════════════════════════════════════════════ */

const PARTICLES_CONFIG = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.5 } },
      push: { quantity: 2 },
    },
  },
  particles: {
    color: { value: ["#0ea5e9", "#3b82f6", "#6366f1"] },
    links: {
      color: "#3b82f6",
      distance: 130,
      enable: true,
      opacity: 0.18,
      width: 1,
    },
    move: {
      direction: "none" as const,
      enable: true,
      outModes: { default: "bounce" as const },
      random: true,
      speed: 0.6,
      straight: false,
    },
    number: { density: { enable: true }, value: 90 },
    opacity: { value: { min: 0.2, max: 0.7 } },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};

const FEATURES = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Our engine analyzes your skills, interests, and project goals to find teammates with up to 97% compatibility.",
    color: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/30",
  },
  {
    icon: Users,
    title: "Smart Team Building",
    description: "Auto-assemble balanced teams based on complementary skill sets, timezones, and work styles.",
    color: "from-blue-500 to-purple-600",
    glow: "shadow-blue-500/30",
  },
  {
    icon: GitBranch,
    title: "Project Discovery",
    description: "Browse hundreds of student-led projects — from web apps to ML models — and join teams mid-flight.",
    color: "from-cyan-400 to-teal-500",
    glow: "shadow-cyan-500/30",
  },
  {
    icon: Trophy,
    title: "Revival Hub",
    description: "Revive abandoned projects with fresh contributors. Give ideas a second life.",
    color: "from-purple-500 to-pink-600",
    glow: "shadow-purple-500/30",
  },
  {
    icon: Activity,
    title: "Real-Time Analytics",
    description: "Track team velocity, contribution graphs, skill evolution, and project health in one dashboard.",
    color: "from-blue-400 to-cyan-500",
    glow: "shadow-blue-500/30",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Connect with students across 50+ colleges. Build your dev network before you even graduate.",
    color: "from-indigo-500 to-blue-600",
    glow: "shadow-indigo-500/30",
  },
];

const STATS = [
  { value: "2,400+", label: "Students" },
  { value: "380+", label: "Projects" },
  { value: "97%", label: "Match Accuracy" },
  { value: "50+", label: "Colleges" },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "3rd Year, CSE",
    message: "CodeMate X helped me find the perfect team for my AI project. We shipped in 8 weeks!",
    avatar: "PS",
    projects: 3
  },
  {
    name: "Arjun Singh",
    role: "2nd Year, IT",
    message: "The AI matching is insanely accurate. Found teammates I click with instantly.",
    avatar: "AS",
    projects: 5
  },
  {
    name: "Rahul Patel",
    role: "Final Year, CSE",
    message: "From idea to reality. CodeMate X made collaboration seamless. Highly recommend!",
    avatar: "RP",
    projects: 7
  }
];

const LEADERBOARD = [
  { rank: 1, name: "Priya Sharma", dept: "CSE", points: 285, medal: "🥇", color: "from-yellow-400 to-yellow-600" },
  { rank: 2, name: "Rahul Mehta", dept: "IT", points: 240, medal: "🥈", color: "from-gray-300 to-gray-500" },
  { rank: 3, name: "Sneha Kulkarni", dept: "ECE", points: 210, medal: "🥉", color: "from-amber-600 to-amber-800" },
];

/* ════════════════════════════════════════════════════ */
/*  DASHBOARD MOCK COMPONENT                           */
/* ════════════════════════════════════════════════════ */

function DashboardMockComponent({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const [matchPct] = useState(92);

  const skills = [
    { name: "React", pct: 88, color: "from-cyan-400 to-blue-500" },
    { name: "Python", pct: 74, color: "from-indigo-400 to-purple-500" },
    { name: "TypeScript", pct: 81, color: "from-sky-400 to-blue-500" },
    { name: "ML/AI", pct: 65, color: "from-cyan-400 to-indigo-500" },
  ];

  const teamCards = [
    { name: "Subh M.", role: "Frontend", avatar: "SM", color: "from-cyan-500 to-blue-600" },
    { name: "Shivam M.", role: "ML Eng.", avatar: "ShM", color: "from-sky-500 to-blue-600" },
    { name: "Harsh M.", role: "Backend", avatar: "HM", color: "from-indigo-500 to-blue-600" },
  ];

  const rotateX = (mouseY - 0.5) * -12;
  const rotateY = (mouseX - 0.5) * 14;

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="relative w-full max-w-[520px] mx-auto"
    >
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 border-b border-white/5 bg-white/[0.03]">
          <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-red-400/80" />
          <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-yellow-400/80" />
          <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-cyan-400/80" />
          <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-white/30 font-mono">codemate.x / dashboard</span>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] text-cyan-400">live</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          {/* Match Score */}
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-sky-600/20 to-cyan-600/20 border border-sky-500/20 p-3 sm:p-4">
            <div>
              <p className="text-[10px] sm:text-xs text-white/50 mb-1">AI Team Match Score</p>
              <motion.p
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {matchPct}%
              </motion.p>
            </div>
            <motion.div
              className="w-12 sm:w-16 h-12 sm:h-16 rounded-full border-4 border-violet-500/30 flex items-center justify-center relative dashboard-spinner-outer"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-400 border-r-cyan-400 dashboard-spinner-inner" />
              <Brain className="w-5 sm:w-6 h-5 sm:h-6 text-violet-300" />
            </motion.div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <p className="text-[10px] sm:text-xs font-semibold text-white/40 uppercase tracking-wider">Skill Radar</p>
            {skills.map((s, i) => (
              <div key={s.name} className="space-y-1">
                <div className="flex justify-between text-[10px] sm:text-xs">
                  <span className="text-white/60">{s.name}</span>
                  <span className="text-white/40">{s.pct}%</span>
                </div>
                <div className="h-1 sm:h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ delay: 0.6 + i * 0.15, duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Team */}
          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Your Team</p>
            <div className="flex gap-2">
              {teamCards.map((tc, i) => (
                <motion.div
                  key={tc.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="flex-1 rounded-xl bg-white/5 border border-white/5 p-2 text-center"
                  whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.15)" }}
                >
                  <div className={`w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-gradient-to-br ${tc.color} flex items-center justify-center text-[8px] sm:text-xs font-bold text-white mx-auto mb-1`}>
                    {tc.avatar}
                  </div>
                  <p className="text-[9px] sm:text-[10px] font-semibold text-white/80">{tc.name}</p>
                  <p className="text-[8px] text-white/40">{tc.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════ */
/*  MAIN LANDING PAGE COMPONENT                        */
/* ════════════════════════════════════════════════════ */

export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [particlesInit, setParticlesInit] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const [rawMouseX, setRawMouseX] = useState(0.5);
  const [rawMouseY, setRawMouseY] = useState(0.5);

  // Redirect if logged in
  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleStartBuilding = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAnimation(true);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    navigate("/login");
  };

  // Initialize particles
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesInit(true));
  }, []);

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mouse tracking
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const mx = e.clientX / window.innerWidth;
    const my = e.clientY / window.innerHeight;
    mouseX.set(mx);
    mouseY.set(my);
    setRawMouseX(mx);
    setRawMouseY(my);
  }, [mouseX, mouseY]);

  const particlesLoaded = useCallback(async (_container: Container | undefined) => {}, []);

  return (
    <div
      className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ══════════════════════════════════════════════ */}
      {/* BACKGROUND EFFECTS                           */}
      {/* ══════════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient blobs */}
        <motion.div
          style={{
            x: useTransform(springX, [0, 1], [-40, 40]),
            y: useTransform(springY, [0, 1], [-40, 40]),
          }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-violet-600/15 blur-[120px]"
        />
        <motion.div
          style={{
            x: useTransform(springX, [0, 1], [40, -40]),
            y: useTransform(springY, [0, 1], [40, -40]),
          }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[120px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-indigo-600/8 blur-[140px]" />
      </div>

      {/* Particles */}
      {particlesInit && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={PARTICLES_CONFIG}
          className="fixed inset-0 pointer-events-none"
        />
      )}

      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none grid-overlay" />
      
      <style>{`
        .grid-overlay {
          background-image: 
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>

      {/* Animation overlay */}
      {showAnimation && <TransitionAnimation onComplete={handleAnimationComplete} />}

      {/* Navbar */}
      <Navbar scrolled={scrolled} />

      {/* ══════════════════════════════════════════════ */}
      {/* HERO SECTION                                 */}
      {/* ══════════════════════════════════════════════ */}
      <HeroSection
        onStartBuilding={handleStartBuilding}
        stats={STATS}
        activityTicker={<ActivityTicker />}
        dashboardMock={<DashboardMockComponent mouseX={rawMouseX} mouseY={rawMouseY} />}
      />

      {/* ══════════════════════════════════════════════ */}
      {/* FEATURES SECTION                             */}
      {/* ══════════════════════════════════════════════ */}
      <section id="features" className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4"
            >
              Everything you need
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            >
              Built for student{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                builders
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              From idea to shipped product — CodeMate X gives your team every tool to collaborate, ship, and grow.
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {FEATURES.map((feature, idx) => (
              <FeatureCard key={feature.title} {...feature} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* CTA SECTION                                  */}
      {/* ══════════════════════════════════════════════ */}
      <CTASection
        badge={{ icon: Zap, text: "Join 2,400+ Students" }}
        title={
          <>
            Your next great project{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              starts here.
            </span>
          </>
        }
        description="Stop searching for teammates on Discord. Let AI find your perfect match in seconds."
        primaryCTA={{
          text: "Create Free Account",
          href: "/signup",
          icon: Rocket,
        }}
        secondaryCTA={{
          text: "Sign In",
          href: "/login",
        }}
      />

      {/* ══════════════════════════════════════════════ */}
      {/* LEADERBOARD SECTION                          */}
      {/* ══════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Top Performers on{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                CodeMate X
              </span>
            </h2>
            <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
              Meet the top contributors and builders in our community
            </p>
          </motion.div>

          {/* Leaderboard Grid */}
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {LEADERBOARD.map((leader, idx) => (
              <LeaderboardCard key={leader.name} {...leader} index={idx} />
            ))}
          </div>

          {/* View Full CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              onClick={handleStartBuilding}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/45 hover:scale-105 active:scale-95 transition-all"
            >
              View Full Leaderboard
              <Trophy className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* TESTIMONIALS SECTION                         */}
      {/* ══════════════════════════════════════════════ */}
      <section className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sky-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4"
            >
              Community Impact
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            >
              What Our{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                Users Say
              </span>
            </motion.h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {TESTIMONIALS.map((testimonial, idx) => (
              <TestimonialCard key={testimonial.name} {...testimonial} index={idx} />
            ))}
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {[
              { value: "2.4K+", label: "Active Students", icon: "👥" },
              { value: "380+", label: "Projects Built", icon: "🚀" },
              { value: "97%", label: "Match Accuracy", icon: "🎯" },
              { value: "50+", label: "Colleges", icon: "🏫" }
            ].map((stat, i) => (
              <StatsCard key={i} {...stat} index={i} variant={i % 2 === 0 ? "default" : "highlight"} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* FOOTER                                       */}
      {/* ══════════════════════════════════════════════ */}
      <footer className="relative border-t border-white/5 py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div>
            <p className="text-sm text-white/50">
              © 2024 CodeMate X. Building the future of student collaboration.
            </p>
          </div>
          <div className="flex gap-4 sm:gap-6">
            {["Twitter", "Discord", "GitHub"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
