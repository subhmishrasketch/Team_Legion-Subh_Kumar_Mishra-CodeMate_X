import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, Users, Trophy, TrendingUp, Zap, Clock, Mail, Phone, UserPlus, Eye, Star, CheckCircle2, ArrowRight, ArrowLeft, Github, Linkedin, Award, BookOpen, MessageSquare, X, ExternalLink, Search, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeSampleData } from "@/lib/initSampleData";
import SocialFeatures from "@/components/SocialFeatures";
import { ANIMATIONS, VARIANTS } from "@/lib/animations";
import { projects as sharedProjects, Project } from "@/lib/projects";

const stats = [
  { label: "Active Projects", value: "24", sub: "+3 this week", icon: FolderOpen, color: "text-primary" },
  { label: "Team Requests", value: "8", sub: "5 pending", icon: Users, color: "text-warning" },
  { label: "Activity Points", value: "145", sub: "+15 this month", icon: Trophy, color: "text-success" },
  { label: "Skill Matches", value: "12", sub: "3 new today", icon: TrendingUp, color: "text-primary" },
];

// User profiles database
const userProfiles: Record<string, any> = {
  "Priya Sharma": { avatar: "P", email: "priya@college.edu", phone: "+91 99887 11223", department: "CSE", semester: "7", skills: ["React", "Python", "TensorFlow", "AR", "UI/UX Design"], github: "https://github.com/priya", linkedin: "https://linkedin.com/in/priya", activityPoints: 285, pastProjects: 8, connections: 42, followers: 234, likes: 512, avgCapability: 92 },
  "Rahul Mehta": { avatar: "R", email: "rahul@college.edu", phone: "+91 98765 44332", department: "CSE", semester: "6", skills: ["React", "Node.js", "IoT", "D3.js", "System Design"], github: "https://github.com/rahul", linkedin: "https://linkedin.com/in/rahul", activityPoints: 215, pastProjects: 6, connections: 38, followers: 189, likes: 456, avgCapability: 88 },
  "Neha Rao": { avatar: "N", email: "neha@college.edu", phone: "+91 91234 56789", department: "IT", semester: "7", skills: ["Python", "OpenCV", "Flask", "React", "ML"], github: "https://github.com/neha", linkedin: "https://linkedin.com/in/neha", activityPoints: 198, pastProjects: 5, connections: 35, followers: 167, likes: 389, avgCapability: 85 },
  "Vikram Patel": { avatar: "V", email: "vikram@college.edu", phone: "+91 88776 55443", department: "CSE", semester: "5", skills: ["React Native", "Node.js", "MongoDB", "Stripe", "AWS"], github: "https://github.com/vikram", linkedin: "https://linkedin.com/in/vikram", activityPoints: 156, pastProjects: 4, connections: 28, followers: 145, likes: 321, avgCapability: 80 },
  "Ananya Iyer": { avatar: "A", email: "ananya@college.edu", phone: "+91 77665 44332", department: "IT", semester: "8", skills: ["TypeScript", "PostgreSQL", "React", "IoT", "DevOps"], github: "https://github.com/ananya", linkedin: "https://linkedin.com/in/ananya", activityPoints: 312, pastProjects: 9, connections: 51, followers: 298, likes: 623, avgCapability: 95 },
  "Rohan Gupta": { avatar: "R", email: "rohan@college.edu", phone: "+91 66554 33221", department: "CSE", semester: "6", skills: ["React", "Node.js", "Docker", "ML/AI", "System Architecture"], github: "https://github.com/rohan", linkedin: "https://linkedin.com/in/rohan", activityPoints: 241, pastProjects: 7, connections: 44, followers: 212, likes: 478, avgCapability: 90 },
};

// Use shared projects from lib/projects
const projects = sharedProjects;

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string[]>([]);
  const [realStats, setRealStats] = useState([
    { label: "Active Projects", value: "3", sub: "2 pending requests", icon: FolderOpen, color: "text-primary" },
    { label: "Team Requests", value: "8", sub: "5 pending", icon: Users, color: "text-warning" },
    { label: "Activity Points", value: "0", sub: "0 activities", icon: Trophy, color: "text-success" },
    { label: "Skill Matches", value: "12", sub: "3 new today", icon: TrendingUp, color: "text-primary" },
  ]);
  const [teamRequests, setTeamRequests] = useState<any[]>([]);
  const [activeProjects, setActiveProjects] = useState<any[]>([]);

  // Filter projects based on search, difficulty, and skills
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || p.details.difficulty === selectedDifficulty;
    const matchesSkills = selectedSkillFilter.length === 0 || 
                         selectedSkillFilter.some(skill => p.tags.includes(skill));
    return matchesSearch && matchesDifficulty && matchesSkills;
  });

  useEffect(() => {
    // Update activity points from user data
    if (user?.activityPoints) {
      setRealStats(prev => [
        prev[0],
        prev[1],
        { ...prev[2], value: user.activityPoints.toString(), sub: `${user.activityHistory?.length || 0} activities` },
        prev[3],
      ]);
    }
  }, [user?.activityPoints, user?.activityHistory?.length]);

  useEffect(() => {
    // Initialize sample data for first-time users
    if (user?.email && user?.name) {
      initializeSampleData(user.email, user.name);
    }

    // Calculate real stats from localStorage data
    try {
      const postedKey = "postedProjects";
      const posted = localStorage.getItem(postedKey);
      const postedProjects = posted ? JSON.parse(posted) : [];

      // Get projects owned by current user
      const myProjects = postedProjects.filter((p: any) => p.owner?.email === user?.email);
      setActiveProjects(myProjects);

      // Calculate team requests
      const requests: any[] = [];
      myProjects.forEach((project: any) => {
        if (project.joinRequests && project.joinRequests.length > 0) {
          project.joinRequests.forEach((request: any) => {
            requests.push({
              ...request,
              projectTitle: project.title,
              projectMembers: (project.acceptedMembers?.length || 0) + 1 // +1 for owner
            });
          });
        }
      });
      setTeamRequests(requests);

      // Update stats with real data
      const updatedStats = [
        { 
          label: "Active Projects", 
          value: myProjects.length.toString(), 
          sub: `${requests.length} pending requests`, 
          icon: FolderOpen, 
          color: "text-primary" 
        },
        { 
          label: "Team Requests", 
          value: requests.length.toString(), 
          sub: `${requests.length > 0 ? requests.length : 'No'} pending`, 
          icon: Users, 
          color: "text-warning" 
        },
        { 
          label: "Activity Points", 
          value: user?.activityPoints?.toString() || "0", 
          sub: `${user?.activityHistory?.length || 0} activities`, 
          icon: Trophy, 
          color: "text-success" 
        },
        { 
          label: "Skill Matches", 
          value: projects.length.toString(), 
          sub: "projects available", 
          icon: TrendingUp, 
          color: "text-primary" 
        },
      ];
      setRealStats(updatedStats);
    } catch (err) {
      console.error("Error calculating stats:", err);
    }
  }, [user]);

  const handleJoin = (projectTitle: string) => {
    toast.success(`Request sent to join "${projectTitle}"! 🎉`);
    setSelectedProject(null);
  };

  // keep the stats tiles in sync when the list of pending requests changes
  useEffect(() => {
    setRealStats(prev => {
      const updated = [...prev];
      // active projects sub was already set earlier, only update request-related fields
      updated[0] = {
        ...updated[0],
        sub: `${teamRequests.length} pending requests`
      };
      updated[1] = {
        ...updated[1],
        value: teamRequests.length.toString(),
        sub: `${teamRequests.length > 0 ? teamRequests.length : 'No'} pending`
      };
      return updated;
    });
  }, [teamRequests]);

  const openProfile = (author: string) => {
    setSelectedProfile(userProfiles[author] ? { name: author, ...userProfiles[author] } : null);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 min-h-screen">
      {/* Premium Header with Modern Gradient Design */}
      <motion.div 
        variants={item}
        className="relative min-h-60 rounded-3xl border border-border/50 bg-gradient-to-br dark:from-slate-800/50 dark:via-slate-900/50 dark:to-slate-950/50 from-gradient-to-br from-slate-50 via-slate-100 to-slate-50 p-12 overflow-hidden backdrop-blur-sm"
        whileHover={{ borderColor: "rgba(139, 92, 246, 0.3)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 w-80 h-80 dark:bg-blue-500/15 bg-blue-300/25 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-1/4 w-80 h-80 dark:bg-purple-500/15 bg-purple-300/25 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-0 group-hover:opacity-5 dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-purple-500/20 pointer-events-none"
          />
        </div>

        <div className="relative z-10">
          <motion.div variants={item} className="mb-4 inline-block">
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Badge className="gap-2 bg-gradient-to-r dark:from-blue-400/30 dark:to-purple-400/30 from-blue-100 to-purple-100 dark:border-blue-400/50 border-blue-400/30 dark:text-blue-200 text-blue-700">
                <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity }}>
                  ✨
                </motion.span>
                <span>Welcome to Your Dashboard</span>
              </Badge>
            </motion.div>
          </motion.div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3 dark:text-white text-slate-900">
            Welcome back, <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">{user?.name?.split(" ")[0]}</span> 👋
          </h1>
          <p className="text-lg dark:text-muted-foreground/90 text-slate-600 max-w-2xl">
            Find your next team, collaborate on amazing projects, and grow your skills with CodeMate X community.
          </p>
          <motion.div initial={{ width: 0 }} animate={{ width: "120px" }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-6 h-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 rounded-full" />
        </div>
      </motion.div>

      {/* Enhanced Stats */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {realStats.map((s, idx) => (
          <motion.div 
            key={s.label} 
            onClick={() => setSelectedStat(s.label)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12, duration: 0.6, type: "spring", stiffness: 100 }}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.25)", transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-2xl border dark:border-border/50 border-cyan-100 dark:bg-gradient-to-br dark:from-card dark:to-card/50 bg-gradient-to-br from-cyan-50 to-blue-50 p-6 transition-all cursor-pointer backdrop-blur-sm group hover:dark:border-cyan-500/30 hover:border-cyan-300">
            {/* Background gradient effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity dark:bg-gradient-to-br dark:from-primary/10 dark:to-transparent bg-gradient-to-br from-sky-100/50 to-transparent" />
            
            {/* Animated corner accent */}
            <motion.div
              className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-5 dark:bg-cyan-500 bg-cyan-400 blur-lg -z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <motion.p 
                className="text-sm dark:text-muted-foreground text-slate-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.12 + 0.2 }}
              >
                {s.label}
              </motion.p>
              <motion.p 
                className="mt-2 font-heading text-3xl font-bold dark:text-white text-slate-900"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.12 + 0.3, type: "spring", stiffness: 100 }}
              >
                {s.value}
              </motion.p>
              <motion.p 
                className="mt-1 text-xs dark:text-muted-foreground/90 text-slate-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.12 + 0.4 }}
              >
                {s.sub}
              </motion.p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 12 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-xl dark:bg-gradient-to-br dark:from-primary/30 dark:to-blue-500/20 bg-gradient-to-br from-sky-200 to-blue-200 ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Search & Filter Section */}
      <motion.div variants={item} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
          {/* Animated Search Bar */}
          <motion.div 
            className="lg:col-span-2 relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/20 group-hover:via-cyan-500/10 group-hover:to-cyan-500/0 rounded-xl transition-all duration-300 -z-10"
              animate={{ 
                boxShadow: ["0 0 0px rgba(6, 182, 212, 0)", "0 0 20px rgba(6, 182, 212, 0.1)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative flex items-center">
              <motion.div 
                animate={searchQuery ? { rotate: [0, 360] } : {}}
                transition={{ duration: 0.8, repeat: searchQuery ? Infinity : 0 }}
                className="absolute left-4 text-cyan-500 pointer-events-none">
                <Search className="h-5 w-5" />
              </motion.div>
              <input
                type="text"
                placeholder="🔍 Search amazing projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-white border border-cyan-200 text-slate-900 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all duration-300 shadow-sm"
              />
            </div>
          </motion.div>

          {/* Animated Difficulty Filter */}
          <motion.div 
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:via-blue-500/10 group-hover:to-blue-500/0 rounded-xl transition-all duration-300 -z-10"
            />
            <select
              aria-label="Filter by difficulty"
              value={selectedDifficulty || ""}
              onChange={(e) => setSelectedDifficulty(e.target.value || null)}
              className="w-full px-4 py-3.5 rounded-xl dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-white border border-blue-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 appearance-none cursor-pointer shadow-sm font-medium"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </motion.div>
        </div>

        {/* Animated Skill Filter Tags */}
        <div className="space-y-3">
          <motion.p 
            animate={{ 
              textShadow: searchQuery || selectedSkillFilter.length > 0 ? "0 0 10px rgba(6, 182, 212, 0.3)" : "0 0 0px rgba(6, 182, 212, 0)"
            }}
            className="text-xs font-semibold dark:text-muted-foreground text-slate-600 transition-all">
            Filter by Skills:
          </motion.p>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence mode="popLayout">
              {["React", "Node.js", "Python", "TensorFlow", "AR", "IoT", "D3.js", "Docker", "ML/AI", "System Design"].map((skill) => (
                <motion.button
                  key={skill}
                  layout
                  {...ANIMATIONS.filterTag}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedSkillFilter(prev =>
                      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
                    );
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer relative overflow-hidden ${
                    selectedSkillFilter.includes(skill)
                      ? "dark:bg-blue-500/30 dark:text-blue-300 dark:border-blue-500/50 bg-blue-200 text-blue-900 border border-blue-400 shadow-lg shadow-blue-500/20"
                      : "dark:bg-slate-700/50 dark:text-muted-foreground dark:border-slate-600 bg-slate-100 text-slate-600 border border-slate-300 hover:dark:bg-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <motion.span 
                    initial={selectedSkillFilter.includes(skill) ? { scale: 1.2 } : {}}
                    animate={selectedSkillFilter.includes(skill) ? { scale: 1 } : {}}
                  >
                    {skill}
                  </motion.span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
          {selectedSkillFilter.length > 0 && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedSkillFilter([])}
              className="text-xs dark:text-cyan-400 text-cyan-600 hover:underline font-medium transition-all">
              ✕ Clear all filters
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Recommended Projects */}
      <motion.div variants={item}>
        <div className="mb-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-heading text-2xl font-bold flex items-center gap-2 dark:text-white text-slate-900">
              <motion.span
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔥
              </motion.span>
              Trending Projects
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm dark:text-muted-foreground text-slate-600 mt-1"
            >
              {filteredProjects.length} of {projects.length} opportunities
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Badge className="text-sm dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/50 bg-blue-100 border-blue-300 font-semibold">
              {filteredProjects.length} available
            </Badge>
          </motion.div>
        </div>
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12">
            <p className="text-muted-foreground text-lg">No projects match your filters.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setSearchQuery("");
                setSelectedDifficulty(null);
                setSelectedSkillFilter([]);
              }}
              className="mt-4 px-4 py-2 rounded-lg dark:bg-blue-500/20 dark:text-blue-300 bg-blue-100 text-blue-700 hover:opacity-80 transition-all text-sm font-medium">
              Clear all filters
            </motion.button>
          </motion.div>
        )}
        <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 relative z-10">
          {filteredProjects.map((p, idx) => (
            <motion.div 
              key={p.title} 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.12, duration: 0.6, type: "spring", stiffness: 100 }}
              whileHover={{ y: -12, boxShadow: "0 30px 60px rgba(0,0,0,0.3)", transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProject(p)}
              className="relative rounded-2xl dark:border-blue-500/30 dark:bg-gradient-to-br dark:from-slate-800/90 dark:to-slate-900/70 border-blue-200/70 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 p-6 transition-all flex flex-col cursor-pointer group dark:hover:border-blue-400 hover:border-blue-400 shadow-lg hover:shadow-2xl backdrop-blur-sm">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-gradient-to-br dark:from-blue-500/15 dark:to-transparent bg-gradient-to-br from-sky-200/50 to-transparent" />
              
              {/* Animated corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 rounded-2xl opacity-0 group-hover:opacity-10 dark:bg-blue-500 bg-blue-400 blur-lg -z-10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <div className="relative z-20 space-y-4">
                <motion.div 
                  className="flex items-center gap-2 flex-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.12 + 0.2 }}
                >
                  {p.urgent && (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Badge className="text-[10px] animate-pulse dark:bg-red-500/20 dark:text-red-300 bg-red-100 text-red-700">
                        <Zap className="mr-1 h-3 w-3" /> Urgent
                      </Badge>
                    </motion.div>
                  )}
                  <Badge className={`text-[10px] border-0 ${
                    p.status === "Active" ? "dark:bg-cyan-500/30 dark:text-cyan-300 bg-cyan-100 text-cyan-700" :
                    p.status === "Planning" ? "dark:bg-blue-500/30 dark:text-blue-300 bg-blue-100 text-blue-700" :
                    "dark:bg-yellow-500/30 dark:text-yellow-300 bg-yellow-100 text-yellow-700"
                  }`}>
                    {p.status || "Planning"}
                  </Badge>
                  <Badge className={`text-[10px] ml-auto border-0 ${
                    p.details?.difficulty === "Hard" ? "dark:bg-red-500/30 dark:text-red-300 bg-red-100 text-red-700" :
                    p.details?.difficulty === "Easy" ? "dark:bg-cyan-500/30 dark:text-cyan-300 bg-cyan-100 text-cyan-700" :
                    "dark:bg-purple-500/30 dark:text-purple-300 bg-purple-100 text-purple-700"
                  }`}>
                    {p.details?.difficulty || "Medium"}
                  </Badge>
                </motion.div>
                
                <div>
                  <h3 className="font-heading text-lg font-semibold dark:group-hover:text-cyan-300 group-hover:text-sky-600 transition-colors dark:text-white text-slate-900">{p.title}</h3>
                  <p className="text-sm dark:text-slate-400 text-slate-700 line-clamp-2 mt-2">{p.desc}</p>
                </div>

                <motion.div 
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.12 + 0.3 }}
                >
                  {p.tags.slice(0, 3).map((t) => (
                    <motion.div
                      key={t}
                      whileHover={{ scale: 1.08, y: -2 }}
                    >
                      <Badge className="text-[10px] dark:bg-slate-700 dark:text-slate-200 bg-slate-100 text-slate-700 border-0 font-medium">{t}</Badge>
                    </motion.div>
                  ))}
                  {p.tags.length > 3 && <Badge className="text-[10px] dark:bg-slate-700 bg-slate-100 text-slate-700 border-0 font-medium">+{p.tags.length - 3}</Badge>}
                </motion.div>
                <Badge variant="secondary" className="text-[10px] ml-auto dark:bg-primary/20 bg-sky-100">
                  {p.match >= 90 ? "⭐ Perfect" : p.match >= 80 ? "⭐ Great" : "Good match"}
                </Badge>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs dark:text-muted-foreground text-slate-600">
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {p.members}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.deadline}</span>
              </div>

              {/* Author */}
              <motion.div whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }} className="mt-3 rounded-lg dark:bg-muted/50 bg-white/80 p-2.5 transition-colors dark:hover:bg-blue-500/10 hover:bg-blue-100">
                <p className="text-xs font-medium mb-1 flex items-center gap-1 dark:text-white text-slate-900">
                  <Star className="h-3 w-3 text-warning" /> {p.author}
                </p>
                <div className="flex items-center gap-2 text-[10px] dark:text-muted-foreground text-slate-600">
                  <span className="flex items-center gap-0.5"><Mail className="h-3 w-3" /> {p.authorEmail}</span>
                </div>
              </motion.div>

              {/* Match */}
              <div className="mt-3 flex-1" />
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Skill Match</span>
                  <span className={`font-semibold ${p.match >= 90 ? "text-success" : p.match >= 80 ? "text-primary" : "text-warning"}`}>{p.match}%</span>
                </div>
                <Progress value={p.match} className="mt-1 h-2" />
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex gap-2">
                <motion.button 
                  whileHover={{ scale: 1.08, y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.92 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(p);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-border py-2 text-sm font-medium hover:bg-muted/50 transition-all relative overflow-hidden group">
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <motion.div animate={{ x: ["100%", "-100%"] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent to-white/20 opacity-0 group-hover:opacity-100" />
                  <Eye className="h-4 w-4 relative z-10" /> <span className="relative z-10">Details</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.08, y: -2, boxShadow: "0 15px 35px rgba(56, 189, 248, 0.4)" }}
                  whileTap={{ scale: 0.92 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleJoin(p.title);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 py-2 text-sm font-semibold text-white transition-all shadow-lg shadow-sky-400/40 relative overflow-hidden group">
                  <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100" style={{ backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)" }} />
                  <UserPlus className="h-4 w-4 relative z-10" /> <span className="relative z-10">Join</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Social Features & Recommendations */}
      <motion.div variants={item}>
        <SocialFeatures />
      </motion.div>

      {/* Enhanced Project Details Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
            <motion.div 
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl">
              
              {/* Header with gradient and Back Button */}
              <div className="sticky top-0 border-b border-border bg-gradient-to-r from-primary/10 to-primary/5 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    whileHover={{ scale: 1.05, x: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-semibold">Back</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedProject(null)}
                    className="text-2xl text-muted-foreground hover:text-foreground transition-colors">
                    ✕
                  </motion.button>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  {selectedProject.urgent && (
                    <Badge variant="destructive" className="text-[11px] font-semibold px-3 py-1">
                      <Zap className="mr-1.5 h-3.5 w-3.5" /> Urgent
                    </Badge>
                  )}
                  <Badge className={`text-[11px] font-semibold px-3 py-1 ${
                    selectedProject.match >= 90 ? "bg-cyan-500/20 text-cyan-700 border-cyan-500/30" :
                    selectedProject.match >= 80 ? "bg-primary/20 text-primary border-primary/30" :
                    "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
                  }`}>
                    {selectedProject.match >= 90 ? "⭐⭐⭐ Perfect" : selectedProject.match >= 80 ? "⭐⭐ Great" : "⭐ Good"}
                  </Badge>
                </div>
                <h2 className="font-heading text-3xl font-bold text-foreground">{selectedProject.title}</h2>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8 max-h-[calc(80vh-180px)] overflow-y-auto">
                {/* Project Overview */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Project Overview</h3>
                  </div>
                  <p className="text-base text-foreground leading-relaxed mb-3">{selectedProject.desc}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.details.description}</p>
                </div>

                {/* Project Details Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <motion.div whileHover={{ y: -4 }} className="rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 p-5">
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wide">Difficulty</p>
                    <p className={`text-lg font-bold ${
                      selectedProject.details.difficulty === "Hard" ? "text-red-600 dark:text-red-400" :
                      selectedProject.details.difficulty === "Easy" ? "text-cyan-600 dark:text-cyan-400" :
                      "text-amber-600 dark:text-amber-400"
                    }`}>
                      {selectedProject.details.difficulty}
                    </p>
                  </motion.div>
                  <motion.div whileHover={{ y: -4 }} className="rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 p-5">
                    <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2 uppercase tracking-wide">Team Slots</p>
                    <p className="text-lg font-bold text-purple-700 dark:text-purple-300">{selectedProject.members}</p>
                  </motion.div>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((t) => (
                      <Badge key={t} className="text-sm px-3 py-1.5 bg-teal-500/20 text-teal-700 dark:bg-teal-500/30 dark:text-teal-300 border-0 font-medium">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Timeline & Skill Match */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">DEADLINE</p>
                    <p className="text-base font-semibold flex items-center gap-2 text-foreground">
                      <Clock className="h-4 w-4 text-amber-500" /> {selectedProject.deadline}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">SKILL MATCH</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <Progress value={selectedProject.match} className="h-3 rounded-full" />
                      </div>
                      <span className={`text-lg font-bold ${selectedProject.match >= 90 ? "text-cyan-600 dark:text-cyan-400" : selectedProject.match >= 80 ? "text-primary" : "text-amber-600 dark:text-amber-400"}`}>
                        {selectedProject.match}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Lead */}
                <motion.div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700 p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Project Lead</h3>
                  </div>
                  <div className="space-y-3">
                    <motion.p className="font-semibold text-base text-primary hover:opacity-80 transition-opacity cursor-pointer">{selectedProject.author}</motion.p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 text-primary/70" /> 
                        <span>{selectedProject.authorEmail}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 text-primary/70" /> 
                        <span>{selectedProject.authorPhone}</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.08, y: -2, boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)" }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => openProfile(selectedProject.author)}
                    className="w-full py-2.5 px-4 mt-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white hover:shadow-lg transition-all text-sm font-semibold relative overflow-hidden group">
                    <motion.div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      👤 View Profile
                    </span>
                  </motion.button>
                </motion.div>
                
                {/* GitHub Repository Link */}
                {selectedProject.github && (
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="flex items-center justify-between rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 p-5 text-white hover:border-primary/50 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <Github className="h-6 w-6 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="font-semibold text-sm">GitHub Repository</p>
                        <p className="text-xs text-slate-400">View source code and contribute</p>
                      </div>
                    </div>
                    <ExternalLink className="h-5 w-5" />
                  </motion.a>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 border-t border-border bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6 flex gap-3 backdrop-blur-sm">
                <motion.button 
                  whileHover={{ scale: 1.08, y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 rounded-lg border border-border text-foreground py-3 text-sm font-semibold hover:bg-muted transition-all">
                  Cancel
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.08, y: -2, boxShadow: "0 15px 35px rgba(20, 184, 166, 0.4)" }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleJoin(selectedProject.title)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-3 text-sm font-semibold shadow-lg hover:shadow-teal-500/50 transition-all relative overflow-hidden group">
                  <motion.div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                  <UserPlus className="h-4 w-4 relative z-10" /> <span className="relative z-10">Ask to Join Project</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile Modal */}
      <AnimatePresence mode="wait">
        {selectedProfile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedProfile(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
            <motion.div 
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] rounded-2xl border border-border/50 bg-card backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col">
              
              {/* Header with gradient background */}
              <div className="h-40 flex-shrink-0 bg-gradient-to-r from-cyan-400/30 via-blue-400/30 to-purple-400/30 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30" />
                <motion.button
                  onClick={() => setSelectedProfile(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-black/20 rounded-lg transition-colors z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="h-6 w-6 text-foreground" />
                </motion.button>
              </div>

              <div className="px-8 pb-8 flex-1 overflow-y-auto">
                {/* Avatar & Name */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-end gap-5 -mt-20 mb-8">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-28 h-28 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white dark:border-slate-900 shadow-xl">
                    {selectedProfile.avatar}
                  </motion.div>
                  <div className="flex-1 pb-2">
                    <h1 className="text-3xl font-bold text-foreground">{selectedProfile.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mt-2">
                      <Badge variant="outline" className="text-xs">{selectedProfile.department}</Badge>
                      <span className="font-medium">Sem {selectedProfile.semester}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="grid grid-cols-3 gap-4 mb-8">
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.05, boxShadow: "0 15px 35px rgba(6, 182, 212, 0.3)" }}
                    className="rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-50 dark:from-cyan-500/20 dark:to-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 p-5 text-center transition-all">
                    <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">{selectedProfile.activityPoints}</p>
                    <p className="text-xs text-cyan-700 dark:text-cyan-300 mt-1 font-semibold">Activity Points</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.05, boxShadow: "0 15px 35px rgba(59, 130, 246, 0.3)" }}
                    className="rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-500/20 dark:to-blue-500/10 border border-blue-200 dark:border-blue-500/30 p-5 text-center transition-all">
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{selectedProfile.pastProjects}</p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 font-semibold">Past Projects</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.05, boxShadow: "0 15px 35px rgba(168, 85, 247, 0.3)" }}
                    className="rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-500/20 dark:to-purple-500/10 border border-purple-200 dark:border-purple-500/30 p-5 text-center transition-all">
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{selectedProfile.connections}</p>
                    <p className="text-xs text-purple-700 dark:text-purple-300 mt-1 font-semibold">Connections</p>
                  </motion.div>
                  
                  {/* New stat cards */}
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.05, boxShadow: "0 15px 35px rgba(236, 72, 153, 0.3)" }}
                    className="rounded-2xl bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-500/20 dark:to-pink-500/10 border border-pink-200 dark:border-pink-500/30 p-5 text-center transition-all">
                    <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">{selectedProfile.followers}</p>
                    <p className="text-xs text-pink-700 dark:text-pink-300 mt-1 font-semibold">Followers</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.05, boxShadow: "0 15px 35px rgba(250, 204, 21, 0.3)" }}
                    className="rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-500/20 dark:to-amber-500/10 border border-amber-200 dark:border-amber-500/30 p-5 text-center transition-all">
                    <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{selectedProfile.likes}</p>
                    <p className="text-xs text-amber-700 dark:text-amber-300 mt-1 font-semibold">Likes</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.05, boxShadow: "0 15px 35px rgba(34, 197, 94, 0.3)" }}
                    className="rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-500/20 dark:to-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 p-5 text-center transition-all">
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{selectedProfile.avgCapability}%</p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1 font-semibold">Avg Capability</p>
                  </motion.div>
                </motion.div>

                {/* Skills */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    <h3 className="font-semibold text-lg text-foreground">Skills & Expertise</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.skills.map((skill: string) => (
                      <motion.span
                        key={skill}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-500/20 dark:to-blue-500/20 text-cyan-700 dark:text-cyan-300 text-sm font-medium border border-cyan-200 dark:border-cyan-500/30"
                        whileHover={{ scale: 1.15, y: -3, boxShadow: "0 10px 25px rgba(6, 182, 212, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    <h3 className="font-semibold text-lg text-foreground">Get in Touch</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.a
                      href={`mailto:${selectedProfile.email}`}
                      whileHover={{ x: 6, y: -4, scale: 1.05, boxShadow: "0 15px 35px rgba(6, 182, 212, 0.2)" }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all cursor-pointer group">
                      <Mail className="h-6 w-6 text-cyan-600 dark:text-cyan-400 flex-shrink-0 group-hover:scale-125 transition-transform" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground font-semibold">Email</p>
                        <p className="text-sm font-semibold text-foreground truncate">{selectedProfile.email}</p>
                      </div>
                    </motion.a>
                    <motion.a
                      href={`tel:${selectedProfile.phone}`}
                      whileHover={{ x: 6, y: -4, scale: 1.05, boxShadow: "0 15px 35px rgba(59, 130, 246, 0.2)" }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all cursor-pointer group">
                      <Phone className="h-6 w-6 text-cyan-600 dark:text-cyan-400 flex-shrink-0 group-hover:scale-125 transition-transform" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground font-semibold">Phone</p>
                        <p className="text-sm font-semibold text-foreground truncate">{selectedProfile.phone}</p>
                      </div>
                    </motion.a>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    <h3 className="font-semibold text-lg text-foreground">Profiles & Links</h3>
                  </div>
                  <div className="flex gap-3">
                    <motion.a
                      href={selectedProfile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all group">
                      <Github className="h-5 w-5 group-hover:scale-110 transition-transform" /> GitHub
                    </motion.a>
                    <motion.a
                      href={selectedProfile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border-2 border-blue-500/50 bg-blue-50/50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold hover:bg-blue-100/50 dark:hover:bg-blue-500/20 transition-all group">
                      <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" /> LinkedIn
                    </motion.a>
                  </div>
                </motion.div>

                {/* Action Button */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="flex gap-3">
                  <motion.button
                    onClick={() => {
                      toast.success(`Message sent to ${selectedProfile.name}! 💬`);
                      setSelectedProfile(null);
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                    <UserPlus className="h-5 w-5" /> Send Connection Request
                  </motion.button>
                  <motion.button
                    onClick={() => setSelectedProfile(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3.5 rounded-xl border border-border/50 text-foreground font-semibold hover:bg-muted transition-all">
                    Close
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stat Details Modal */}
      <AnimatePresence mode="wait">
        {selectedStat && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedStat(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
            <motion.div 
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full ${selectedStat === "Active Projects" || selectedStat === "Team Requests" ? "max-w-2xl" : "max-w-md"} rounded-2xl border border-border bg-card shadow-2xl max-h-[80vh] overflow-y-auto`}>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-2xl font-bold">{selectedStat}</h2>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedStat(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    ✕
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {selectedStat === "Active Projects" && (
                    <div className="space-y-4">
                      {activeProjects.length > 0 ? (
                        <>
                          <p className="text-sm text-muted-foreground mb-4">You have {activeProjects.length} active projects. {realStats[0].sub}</p>
                          <div className="space-y-3">
                            {activeProjects.map((proj, idx) => (
                              <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-4 rounded-lg border border-border bg-muted/30">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-sm">{proj.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">You're the Lead</p>
                                  </div>
                                  <Badge className="text-xs">In Progress</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mb-2">{proj.desc}</p>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {(proj.acceptedMembers?.length || 0) + 1}/5 members</span>
                                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {proj.deadline}</span>
                                </div>
                                <div className="flex gap-2">
                                  <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => {
                                      setSelectedStat(null);
                                      navigate(`/my-projects/${encodeURIComponent(proj.title)}`);
                                    }}
                                    className="flex-1 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                                    View Project
                                  </motion.button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <FolderOpen className="h-16 w-16 text-primary mx-auto mb-4" />
                          <p className="text-muted-foreground">No active projects yet. Join a project to get started!</p>
                        </div>
                      )}
                    </div>
                  )}
                  {selectedStat === "Team Requests" && (
                    <div className="space-y-4">
                      {teamRequests.length > 0 ? (
                        <>
                          <p className="text-sm text-muted-foreground mb-4">You have {teamRequests.length} pending join requests. Accept to add them to your project team.</p>
                          <div className="space-y-3 max-h-96">
                            {teamRequests.map((request, idx) => (
                              <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-4 rounded-lg border border-border bg-muted/30">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1">
                                    <p className="font-semibold text-sm">{request.name}</p>
                                    <p className="text-xs text-muted-foreground">{request.email} • {request.department}</p>
                                  </div>
                                  <Badge variant="outline" className="text-xs">{request.skills?.slice(0, 2).join(", ")}</Badge>
                                </div>
                                <div className="bg-muted/50 p-3 rounded-lg my-3 border border-border/50">
                                  <p className="text-xs font-semibold text-primary mb-1">📁 {request.projectTitle}</p>
                                  <p className="text-xs text-muted-foreground">👥 Current team: {request.projectMembers} members</p>
                                </div>
                                <div className="flex gap-2">
                                  <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                      // remove the request from the local state so it disappears immediately
                                      setTeamRequests(prev => prev.filter(r => r.email !== request.email || r.projectTitle !== request.projectTitle));
                                      toast.success(`${request.name} has been added to ${request.projectTitle}! 🎉`);

                                      // persist change to localStorage so the request is gone on refresh too
                                      const postedKey = "postedProjects";
                                      const posted = localStorage.getItem(postedKey);
                                      if (posted) {
                                        const updated = JSON.parse(posted).map((proj: any) => {
                                          if (proj.title === request.projectTitle) {
                                            proj.acceptedMembers = [
                                              ...(proj.acceptedMembers || []),
                                              { name: request.name, email: request.email }
                                            ];
                                            proj.joinRequests = (proj.joinRequests || []).filter(
                                              (jr: any) => jr.email !== request.email
                                            );
                                          }
                                          return proj;
                                        });
                                        localStorage.setItem(postedKey, JSON.stringify(updated));
                                      }
                                    }}
                                    className="flex-1 px-3 py-1.5 text-xs bg-success text-white rounded-lg hover:bg-success/90 transition-colors font-medium">
                                    ✓ Accept
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                      // remove request locally so it doesn't show up without refresh
                                      setTeamRequests(prev => prev.filter(r => r.email !== request.email || r.projectTitle !== request.projectTitle));
                                      toast.success(`Request from ${request.name} declined.`);

                                      const postedKey = "postedProjects";
                                      const posted = localStorage.getItem(postedKey);
                                      if (posted) {
                                        const updated = JSON.parse(posted).map((proj: any) => {
                                          if (proj.title === request.projectTitle) {
                                            proj.joinRequests = (proj.joinRequests || []).filter(
                                              (jr: any) => jr.email !== request.email
                                            );
                                          }
                                          return proj;
                                        });
                                        localStorage.setItem(postedKey, JSON.stringify(updated));
                                      }
                                    }}
                                    className="flex-1 px-3 py-1.5 text-xs bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium border border-border">
                                    ✕ Decline
                                  </motion.button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <Users className="h-16 w-16 text-warning mx-auto mb-4" />
                          <p className="text-muted-foreground">No pending team requests at the moment.</p>
                        </div>
                      )}
                    </div>
                  )}
                  {selectedStat === "Activity Points" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center mb-4">
                        <Trophy className="h-12 w-12 text-success mx-auto" />
                      </div>
                      <div className="text-center mb-4">
                        <p className="text-3xl font-bold text-success">{user?.activityPoints || 0}</p>
                        <p className="text-sm text-muted-foreground mt-1">Total Activity Points</p>
                      </div>
                      <div className="border-t border-border pt-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Activity History</p>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {user?.activityHistory && user.activityHistory.length > 0 ? (
                            user.activityHistory.map((activity) => (
                              <motion.div
                                key={activity.id}
                                className="flex items-start gap-3 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                              >
                                <div className="flex-shrink-0 mt-1">
                                  <div className={`w-2 h-2 rounded-full ${
                                    activity.source === "project_completed" ? "bg-success" :
                                    activity.source === "rating_given" ? "bg-primary" :
                                    activity.source === "team_joined" ? "bg-warning" :
                                    "bg-info"
                                  }`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{activity.label}</p>
                                  <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                                    <span>+{activity.points} pts</span>
                                    <span>•</span>
                                    <span>{activity.date}</span>
                                  </p>
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">No activity history yet</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedStat === "Skill Matches" && (
                    <div className="text-center py-8">
                      <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">{realStats[3].value} projects match your skills perfectly.</p>
                      <p className="text-sm text-muted-foreground mt-2">{realStats[3].sub}</p>
                    </div>
                  )}
                </div>

                <motion.button 
                  onClick={() => setSelectedStat(null)}
                  className="w-full mt-6 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
                  whileHover={{ scale: 1.02 }}>
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default StudentDashboard;
