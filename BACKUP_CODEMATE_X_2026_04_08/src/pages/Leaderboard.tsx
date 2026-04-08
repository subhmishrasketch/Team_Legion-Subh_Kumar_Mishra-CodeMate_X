import { DashboardLayout } from "@/components/DashboardLayout";
import { Trophy, Mail, Phone, X, Zap, Target, CheckCircle2, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Student {
  name: string; initials: string; dept: string;
  basePoints?: number; events?: number; completedProjects?: number;
  semester?: number; skills?: string[]; email?: string; phone?: string; projects?: number; github?: string;
}

const seed: Student[] = [
  { name: "Priya Sharma", initials: "PS", dept: "CSE", basePoints: 200, events: 10, completedProjects: 42, semester: 6, skills: ["React", "Python", "TensorFlow", "ML/AI"], email: "priya@college.edu", phone: "+91 99887 11223", projects: 8, github: "https://github.com/priyasharma" },
  { name: "Rahul Mehta", initials: "RM", dept: "IT", basePoints: 150, events: 20, completedProjects: 15, semester: 7, skills: ["Node.js", "React", "MongoDB"], email: "rahul@college.edu", phone: "+91 98765 44332", projects: 6, github: "https://github.com/rahulmehta" },
  { name: "Sneha Kulkarni", initials: "SK", dept: "ECE", basePoints: 120, events: 5, completedProjects: 40, semester: 6, skills: ["Python", "TensorFlow", "Docker"], email: "sneha@college.edu", phone: "+91 55443 22110", projects: 5, github: "https://github.com/snehakulkarni" },
  { name: "Amit Desai", initials: "AD", dept: "CSE", basePoints: 90, events: 8, completedProjects: 30, projects: 5, semester: 5, skills: ["React", "Node.js", "TypeScript"], email: "amit@college.edu", phone: "+91 88776 12345" },
  { name: "Neha Rao", initials: "NR", dept: "ME", basePoints: 80, events: 12, completedProjects: 24, projects: 6, semester: 7, skills: ["Python", "IoT", "Docker"], email: "neha@college.edu", phone: "+91 91234 56789" },
  { name: "Vikram Patel", initials: "VP", dept: "CSE", basePoints: 70, events: 6, completedProjects: 25, projects: 4, semester: 6, skills: ["React", "TypeScript", "AWS"], email: "vikram@college.edu", phone: "+91 88776 55443" },
  { name: "Ananya Iyer", initials: "AI", dept: "IT", basePoints: 60, events: 4, completedProjects: 45, projects: 5, points: 150, semester: 5, skills: ["Flutter", "UI/UX", "Figma"], email: "ananya@college.edu", phone: "+91 77665 44332" },
  { name: "Rohan Gupta", initials: "RG", dept: "ECE", basePoints: 50, events: 3, completedProjects: 20, projects: 3, points: 140, semester: 7, skills: ["IoT", "C++", "Python"], email: "rohan@college.edu", phone: "+91 66554 33221" },
];

const computePoints = (s: Student) => (s.basePoints || 0) + (s.events || 0) * 1 + (s.completedProjects || 0) * 2;

const allStudents = seed
  .map((s) => ({ ...s, derivedPoints: computePoints(s) }))
  .sort((a: any, b: any) => (b.derivedPoints || 0) - (a.derivedPoints || 0));

const top3 = allStudents.slice(0, 3);
const rest = allStudents.slice(3);

const medalColors = ["from-yellow-400 to-yellow-600", "from-gray-300 to-gray-500", "from-amber-600 to-amber-800"];
const medalEmojis = ["🥇", "🥈", "🥉"];

const Leaderboard = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <div>
          <h1 className="font-heading text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-7 w-7 text-warning" /> Leaderboard
          </h1>
          <p className="mt-1 text-muted-foreground">Top contributors this semester - Activity Points Breakdown</p>
        </div>

        {/* Points Breakdown Info */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-5">
          <p className="text-sm font-semibold text-foreground mb-3">📊 How Points Are Calculated:</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-1 shrink-0" />
              <div>
                <p className="text-xs font-medium">Project Completion</p>
                <p className="text-[10px] text-muted-foreground">2 points per project</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Zap className="h-4 w-4 text-warning mt-1 shrink-0" />
              <div>
                <p className="text-xs font-medium">Event Participation</p>
                <p className="text-[10px] text-muted-foreground">1 point per event</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Target className="h-4 w-4 text-primary mt-1 shrink-0" />
              <div>
                <p className="text-xs font-medium">Base Points</p>
                <p className="text-[10px] text-muted-foreground">Ongoing participation</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top 3 */}
        <div className="grid gap-4 md:grid-cols-3">
          {top3.map((s, i) => (
            <motion.div key={s.name} 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              onClick={() => setSelectedStudent(s)}
              className={`relative flex cursor-pointer flex-col items-center rounded-xl border-2 bg-card p-6 transition-all ${i === 0 ? "border-warning/40 shadow-xl" : "border-border"}`}>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className={`absolute -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b ${medalColors[i]} text-sm font-bold text-foreground shadow-lg`}>
                {medalEmojis[i]}
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className={`mb-2 h-6 w-6 ${i === 0 ? "text-warning" : i === 1 ? "text-muted-foreground" : "text-amber-700"}`}>
                <Trophy className="h-6 w-6" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="mb-2 flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-lg font-bold text-primary-foreground">
                {s.initials}
              </motion.div>
              <p className="font-heading font-semibold text-center">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.dept} · Semester {s.semester}</p>
              
              {/* Points breakdown mini */}
              <div className="mt-3 text-center text-[11px] text-muted-foreground space-y-1">
                {(s as any).completedProjects > 0 && <div>✓ {(s as any).completedProjects} projects</div>}
                {(s as any).events > 0 && <div>⚡ {(s as any).events} events</div>}
              </div>

              <p className="mt-3 font-heading text-3xl font-bold text-primary">{(s as any).derivedPoints}</p>
              <p className="text-xs text-muted-foreground">activity points</p>
              <motion.span whileHover={{ x: 4 }} className="mt-2 text-[10px] text-primary hover:underline">View Profile →</motion.span>
            </motion.div>
          ))}
        </div>

        {/* Rest - Enhanced */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="rounded-xl border border-border bg-card overflow-hidden">
          {rest.map((s, i) => (
            <motion.div key={s.name} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.03)", paddingRight: 20 }}
              onClick={() => setSelectedStudent(s)}
              className={`flex cursor-pointer items-center gap-4 px-5 py-4 transition-colors ${i < rest.length - 1 ? "border-b border-border" : ""}`}>
              <motion.span whileHover={{ scale: 1.1 }} className="w-8 text-center font-heading text-lg font-bold text-muted-foreground">#{i + 4}</motion.span>
              <motion.div whileHover={{ scale: 1.1 }} className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-semibold text-sm">{s.initials}</motion.div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.dept} · Semester {s.semester}</p>
                <div className="mt-1 flex items-center gap-2">
                  {(s as any).completedProjects > 0 && (
                    <Badge variant="outline" className="text-[10px]">
                      ✓ {(s as any).completedProjects} projects
                    </Badge>
                  )}
                  {(s as any).events > 0 && (
                    <Badge variant="outline" className="text-[10px]">
                      ⚡ {(s as any).events} events
                    </Badge>
                  )}
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} className="text-right">
                <p className="font-heading text-lg font-bold text-primary">{(s as any).derivedPoints}</p>
                <p className="text-[10px] text-muted-foreground">points</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedStudent(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-heading text-lg font-bold">Student Profile</h3>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} 
                  onClick={() => setSelectedStudent(null)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></motion.button>
              </div>
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-16 w-16 mb-3">
                  <AvatarFallback className="gradient-primary text-xl font-bold text-primary-foreground">{selectedStudent.initials}</AvatarFallback>
                </Avatar>
                <p className="font-heading text-lg font-bold">{selectedStudent.name}</p>
                <p className="text-sm text-muted-foreground">{selectedStudent.dept} · Semester {selectedStudent.semester}</p>
                
                {/* Points breakdown */}
                <div className="mt-4 w-full rounded-lg bg-muted/50 p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Points:</span>
                    <span className="font-semibold">{(selectedStudent as any).basePoints}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">From Projects:</span>
                    <span className="font-semibold text-success">+{((selectedStudent as any).completedProjects || 0) * 2}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">From Events:</span>
                    <span className="font-semibold text-warning">+{(selectedStudent as any).events || 0}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between text-sm font-bold">
                    <span>Total:</span>
                    <span className="text-primary text-lg">{(selectedStudent as any).derivedPoints} pts</span>
                  </div>
                </div>

                <p className="mt-3 font-heading text-2xl font-bold text-primary">{(selectedStudent as any).derivedPoints}</p>
                {selectedStudent.projects && <p className="text-xs text-muted-foreground">{selectedStudent.projects} projects · {(selectedStudent as any).completedProjects} completed</p>}

                {selectedStudent.skills && (
                  <div className="mt-4 w-full">
                    <p className="text-xs font-semibold mb-2">Skills</p>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {selectedStudent.skills.map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 w-full space-y-2 text-left">
                  {selectedStudent.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 shrink-0" /> {selectedStudent.email}
                    </div>
                  )}
                  {selectedStudent.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 shrink-0" /> {selectedStudent.phone}
                    </div>
                  )}
                  {selectedStudent.github && (
                    <div className="flex items-center gap-2 text-sm">
                      <a
                        href={selectedStudent.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                      >
                        <Github className="h-5 w-5" /> GitHub
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default Leaderboard;
