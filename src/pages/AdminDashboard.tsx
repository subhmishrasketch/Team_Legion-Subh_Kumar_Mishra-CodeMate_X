import { motion } from "framer-motion";
import { Users, FolderOpen, Calendar, TrendingUp, Award, BarChart3, PieChart, Activity, ArrowUp, ArrowDown, ShieldAlert, CheckCircle2, Clock, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";

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
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <h1 className="font-heading text-3xl font-bold">
          Welcome, <span className="text-gradient">{user?.name}</span> 🎓
        </h1>
        <p className="mt-1 text-muted-foreground">Campus project & event overview with analytics.</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <motion.div 
            key={s.label} 
            whileHover={{ y: -4, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-heading text-3xl font-bold">{s.value}</p>
              <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <span>{s.sub}</span>
                {s.trend === "up" && <ArrowUp className="h-3 w-3 text-success" />}
                {s.trend === "down" && <ArrowDown className="h-3 w-3 text-destructive" />}
              </div>
            </div>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Events & Analytics Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Events */}
        <motion.div variants={item} className="lg:col-span-2 rounded-xl border border-border bg-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-warning" /> Upcoming Events
            </h2>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Open create event modal (placeholder)')}
              className="rounded-md px-3 py-1 text-sm font-medium border border-border hover:bg-muted/50 transition-colors">
              + New Event
            </motion.button>
          </div>
          <div className="space-y-3">
            {events.map((e, i) => (
              <motion.div key={e.name}
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 4, backgroundColor: "rgba(0,0,0,0.03)" }}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{e.name}</h3>
                    <Badge variant={
                      e.status === "Approved" ? "default" :
                      e.status === "Planning" ? "secondary" :
                      "outline"
                    } className="text-[10px]">
                      {e.status}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] ml-auto">{e.budget}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{e.date}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>{e.registrations}/{e.capacity} registered</span>
                    <span className="font-semibold text-primary">{Math.round((e.registrations / e.capacity) * 100)}%</span>
                  </div>
                  <Progress value={(e.registrations / e.capacity) * 100} className="h-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Students */}
        <motion.div variants={item} className="rounded-xl border border-border bg-card p-5 space-y-4">
          <h2 className="font-heading text-lg font-bold flex items-center gap-2">
            <Award className="h-5 w-5 text-warning" /> Top Students
          </h2>
          <div className="space-y-3">
            {topStudents.map((s, i) => (
              <motion.div 
                key={s.name} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: -4, backgroundColor: "rgba(0,0,0,0.03)" }}
                className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground shrink-0">
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.dept}</p>
                  <Badge variant="outline" className="text-[9px] mt-0.5">{s.performance}</Badge>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-heading text-lg font-bold text-primary">{s.points}</p>
                  <p className="text-[10px] text-muted-foreground">{s.projects} proj</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Department Analytics */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-heading text-lg font-bold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" /> Department Analysis
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept, idx) => (
            <motion.div 
              key={dept.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-lg border border-border bg-muted/30 p-4 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{dept.name} Department</h3>
                <Badge variant="secondary" className="text-xs">{dept.students} students</Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Active Projects</span>
                    <span className="font-semibold">{dept.projects} projects</span>
                  </div>
                  <Progress value={(dept.projects / 50) * 100} className="h-1.5" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Avg Points</span>
                    <span className="font-semibold text-primary">{dept.avgPoints}</span>
                  </div>
                  <Progress value={dept.avgPoints} className="h-1.5" />
                </div>

                <div className="rounded-md bg-primary/10 p-2 text-center">
                  <p className="text-[10px] text-muted-foreground">Top Scorer</p>
                  <p className="text-sm font-bold text-primary">{dept.topperPoints} pts</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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

      {/* Key Insights */}
      <motion.div variants={item} className="rounded-xl border border-success/20 bg-gradient-to-br from-success/5 to-success/10 p-6">
        <h2 className="font-heading text-lg font-bold flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-success" /> Key Insights & Metrics
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-card/50 dark:bg-card/30 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Average Team Size</p>
            <p className="text-2xl font-bold">4.2 members</p>
            <p className="text-xs text-muted-foreground mt-1">+0.3 vs last semester</p>
          </div>
          <div className="rounded-lg bg-card/50 dark:bg-card/30 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Project Success Rate</p>
            <p className="text-2xl font-bold text-success">84%</p>
            <p className="text-xs text-muted-foreground mt-1">Completed on schedule</p>
          </div>
          <div className="rounded-lg bg-card/50 dark:bg-card/30 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Student Engagement</p>
            <p className="text-2xl font-bold text-primary">92%</p>
            <p className="text-xs text-muted-foreground mt-1">Active participation</p>
          </div>
          <div className="rounded-lg bg-card/50 dark:bg-card/30 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Collaboration Score</p>
            <p className="text-2xl font-bold">8.7/10</p>
            <p className="text-xs text-muted-foreground mt-1">Team effectiveness</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
