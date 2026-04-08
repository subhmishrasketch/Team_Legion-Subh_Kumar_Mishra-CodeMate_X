import { motion } from "framer-motion";
import { Users, FolderOpen, Calendar, TrendingUp, Award, BarChart3, PieChart, Activity, ArrowUp, ArrowDown, ShieldAlert, CheckCircle2, Clock, X, Globe, Building2, Layers } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import AdvancedAnalytics from "@/components/AdvancedAnalytics";
import CrossCollegeNetwork from "@/components/CrossCollegeNetwork";
import DetailedEventCards from "@/components/DetailedEventCards";
import { THEME_COLORS, ANIMATION_CONFIG, LAYOUT_CLASSES } from "@/lib/designTheme";

const stats = [
  { label: "Total Students", value: "1,248", sub: "+32 this month", icon: Users, color: "text-primary", trend: "up" },
  { label: "Active Projects", value: "156", sub: "12 new this week", icon: FolderOpen, color: "text-success", trend: "up" },
  { label: "Upcoming Events", value: "8", sub: "3 this week", icon: Calendar, color: "text-warning", trend: "neutral" },
  { label: "Avg. Activity", value: "78%", sub: "+5% vs last month", icon: TrendingUp, color: "text-primary", trend: "up" },
];

const events = [
  { name: "Annual Hackathon 2026", date: "Mar 15, 2026", status: "Approved", registrations: 342, capacity: 400, budget: "₹2,00,000" },
  { name: "ML/AI Workshop Series", date: "Mar 20, 2026", status: "Planning", registrations: 89, capacity: 150, budget: "₹50,000" },
  { name: "Code Sprint Challenge", date: "Apr 05, 2026", status: "Approved", registrations: 210, capacity: 300, budget: "₹1,50,000" },
  { name: "Open Source Contribution Day", date: "Apr 12, 2026", status: "Pending", registrations: 45, capacity: 100, budget: "₹25,000" },
];

const topStudents = [
  { name: "Priya Sharma", dept: "CSE", points: 285, projects: 8, performance: "Excellent" },
  { name: "Rahul Mehta", dept: "IT", points: 240, projects: 6, performance: "Excellent" },
  { name: "Sneha Kulkarni", dept: "ECE", points: 210, projects: 5, performance: "Very Good" },
];

const departments = [
  { name: "CSE", students: 320, projects: 45, avgPoints: 85, topperPoints: 285 },
  { name: "IT", students: 280, projects: 38, avgPoints: 78, topperPoints: 240 },
  { name: "ECE", students: 250, projects: 32, avgPoints: 72, topperPoints: 210 },
  { name: "ME", students: 198, projects: 25, avgPoints: 65, topperPoints: 180 },
  { name: "CE", students: 120, projects: 12, avgPoints: 60, topperPoints: 155 },
  { name: "EE", students: 80, projects: 4, avgPoints: 55, topperPoints: 120 },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const AdminDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [showComplaintDetail, setShowComplaintDetail] = useState(false);
  const [showEventsModal, setShowEventsModal] = useState(false);

  useEffect(() => {
    // Load complaints from localStorage
    try {
      const complaintsKey = "complaints";
      const stored = localStorage.getItem(complaintsKey);
      const allComplaints = stored ? JSON.parse(stored) : [];
      setComplaints(allComplaints);
    } catch (err) {
      console.error("Error loading complaints:", err);
    }
  }, []);

  const resolveComplaint = (complaintId: string) => {
    try {
      const updated = complaints.map(c => 
        c.id === complaintId ? { ...c, resolved: true, status: "resolved" } : c
      );
      setComplaints(updated);
      localStorage.setItem("complaints", JSON.stringify(updated));
      toast.success("Complaint marked as resolved! ✓");
      setShowComplaintDetail(false);
      setSelectedComplaint(null);
    } catch (err) {
      console.error("Error resolving complaint:", err);
      toast.error("Failed to resolve complaint");
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 min-h-screen">
      {/* Premium Header with Modern Gradient Design */}
      <motion.div 
        variants={item}
        className="relative min-h-60 rounded-3xl border border-border/50 bg-gradient-to-br dark:from-slate-800/50 dark:via-slate-900/50 dark:to-slate-950/50 from-gradient-to-br from-slate-50 via-slate-100 to-slate-50 p-12 overflow-hidden backdrop-blur-sm"
        whileHover={{ borderColor: "rgba(34, 211, 238, 0.3)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated gradient background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-1/4 w-96 h-96 dark:bg-cyan-500/15 bg-cyan-300/25 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-1/4 w-96 h-96 dark:bg-blue-500/15 bg-blue-300/25 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 right-0 w-80 h-80 dark:bg-purple-500/10 bg-purple-300/15 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-0 group-hover:opacity-5 dark:bg-gradient-to-br dark:from-cyan-500/20 dark:to-blue-500/20 pointer-events-none"
          />
        </div>

        <div className="relative z-10">
          <motion.div variants={item} className="mb-4">
            <Badge className="gap-2 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 border-cyan-400/50 text-cyan-200">
              <span>📊 Admin Control Center</span>
            </Badge>
          </motion.div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">
            Welcome, <span className="text-gradient">{user?.name}</span> 🎓
          </h1>
          <p className="text-lg text-muted-foreground/90 max-w-2xl">
            Campus project & event overview with intelligent analytics. Monitor all activities and engagement.
          </p>
          <motion.div initial={{ width: 0 }} animate={{ width: "120px" }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-6 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full" />
        </div>
      </motion.div>

      {/* Enhanced Stats */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, idx) => (
          <motion.div 
            key={s.label}
            onClick={() => s.label === "Upcoming Events" && setShowEventsModal(true)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12, duration: 0.6, type: "spring", stiffness: 100 }}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.25)", transition: { duration: 0.3 } }}
            className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-6 transition-all backdrop-blur-sm group ${s.label === "Upcoming Events" ? "cursor-pointer" : ""}`}>
            {/* Background gradient effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-cyan-500/10 to-transparent" />
            
            {/* Animated corner accent */}
            <motion.div
              className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-5 dark:bg-cyan-500 bg-cyan-400 blur-lg -z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <motion.p 
                className="text-sm text-muted-foreground font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.12 + 0.2 }}
              >
                {s.label}
              </motion.p>
              <motion.p 
                className="mt-2 font-heading text-3xl font-bold"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.12 + 0.3, type: "spring", stiffness: 100 }}
              >
                {s.value}
              </motion.p>
              <motion.div 
                className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.12 + 0.4 }}
              >
                <span>{s.sub}</span>
                {s.trend === "up" && <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 1, repeat: Infinity }}><ArrowUp className="h-3 w-3 text-success" /></motion.div>}
                {s.trend === "down" && <ArrowDown className="h-3 w-3 text-destructive" />}
              </motion.div>
            </div>
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 12 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-cyan-500/20 ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>



      {/* Cross-College Network */}
      <motion.div variants={item}>
        <CrossCollegeNetwork />
      </motion.div>

      {/* Complaints / Reports */}
      <motion.div variants={item} className="rounded-xl border border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-destructive" /> Student Complaints & Reports
          </h2>
          <Badge variant={complaints.filter(c => !c.resolved).length > 0 ? "destructive" : "outline"}>
            {complaints.filter(c => !c.resolved).length} pending
          </Badge>
        </div>

        {complaints.length === 0 ? (
          <p className="text-sm text-muted-foreground">No complaints yet. Great community! 🎉</p>
        ) : (
          <div className="space-y-3">
            {complaints.slice(-5).reverse().map((complaint) => (
              <motion.button
                key={complaint.id}
                onClick={() => { setSelectedComplaint(complaint); setShowComplaintDetail(true); }}
                whileHover={{ x: 4 }}
                className={`w-full text-left rounded-lg border p-3 transition-all ${
                  complaint.resolved 
                    ? "border-border bg-card/30 opacity-60" 
                    : "border-destructive/30 bg-destructive/10 hover:bg-destructive/15"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{complaint.type}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">From {complaint.studentName}</p>
                    <p className="text-xs text-muted-foreground">{complaint.date}</p>
                  </div>
                  {complaint.resolved ? (
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                  ) : (
                    <Clock className="h-5 w-5 text-destructive shrink-0" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Complaint Detail Modal */}
      <AnimatePresence>
        {showComplaintDetail && selectedComplaint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowComplaintDetail(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-heading text-lg font-bold">Complaint Details</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowComplaintDetail(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">ISSUE TYPE</p>
                  <p className="text-sm font-semibold">{selectedComplaint.type}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">FROM</p>
                  <p className="text-sm font-semibold">{selectedComplaint.studentName}</p>
                  <p className="text-xs text-muted-foreground">{selectedComplaint.studentEmail}</p>
                  <p className="text-xs text-muted-foreground">{selectedComplaint.studentPhone}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">DESCRIPTION</p>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">{selectedComplaint.description}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">SUBMITTED ON</p>
                  <p className="text-sm">{selectedComplaint.date}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">STATUS</p>
                  <Badge variant={selectedComplaint.resolved ? "secondary" : "destructive"}>
                    {selectedComplaint.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                {!selectedComplaint.resolved && (
                  <motion.button
                    onClick={() => resolveComplaint(selectedComplaint.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Mark as Resolved
                  </motion.button>
                )}
                <motion.button
                  onClick={() => setShowComplaintDetail(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>





      {/* Events Modal */}
      <AnimatePresence>
        {showEventsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEventsModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-heading text-2xl font-bold flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-warning" />
                  All Events
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEventsModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              <DetailedEventCards />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced Analytics Dashboard */}
      <motion.div variants={item}>
        <AdvancedAnalytics />
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
