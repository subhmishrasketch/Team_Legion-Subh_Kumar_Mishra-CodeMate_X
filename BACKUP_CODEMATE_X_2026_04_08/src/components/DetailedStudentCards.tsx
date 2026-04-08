import { motion } from "framer-motion";
import { Users, Mail, Building2, Zap, TrendingUp, Award, Github, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface StudentDetail {
  id: string;
  name: string;
  email: string;
  dept: string;
  semester: string;
  points: number;
  projects: number;
  skills: string[];
  performance: string;
  joinDate: string;
  contributions: number;
  avatar: string;
}

const detailedStudents: StudentDetail[] = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.sharma@iitb.edu",
    dept: "CSE",
    semester: "7th",
    points: 285,
    projects: 8,
    skills: ["React", "Python", "AI/ML"],
    performance: "Excellent",
    joinDate: "Aug 2023",
    contributions: 124,
    avatar: "PS",
  },
  {
    id: "2",
    name: "Rahul Mehta",
    email: "rahul.mehta@vjti.edu",
    dept: "IT",
    semester: "6th",
    points: 240,
    projects: 6,
    skills: ["Node.js", "React", "Cloud"],
    performance: "Excellent",
    joinDate: "Sep 2023",
    contributions: 98,
    avatar: "RM",
  },
  {
    id: "3",
    name: "Sneha Kulkarni",
    email: "sneha.kulkarni@kkw.edu",
    dept: "ECE",
    semester: "5th",
    points: 210,
    projects: 5,
    skills: ["IoT", "Embedded", "C++"],
    performance: "Very Good",
    joinDate: "Oct 2023",
    contributions: 76,
    avatar: "SK",
  },
  {
    id: "4",
    name: "Arjun Singh",
    email: "arjun.singh@maeu.edu",
    dept: "ME",
    semester: "4th",
    points: 185,
    projects: 4,
    skills: ["CAD", "Python", "Automation"],
    performance: "Good",
    joinDate: "Nov 2023",
    contributions: 62,
    avatar: "AS",
  },
  {
    id: "5",
    name: "Aisha Khan",
    email: "aisha.khan@symb.edu",
    dept: "CSE",
    semester: "6th",
    points: 195,
    projects: 5,
    skills: ["Flutter", "Dart", "Firebase"],
    performance: "Excellent",
    joinDate: "Sep 2023",
    contributions: 88,
    avatar: "AK",
  },
  {
    id: "6",
    name: "Vikram Patel",
    email: "vikram.patel@iitb.edu",
    dept: "CSE",
    semester: "8th",
    points: 265,
    projects: 7,
    skills: ["System Design", "Java", "AWS"],
    performance: "Excellent",
    joinDate: "Jul 2023",
    contributions: 115,
    avatar: "VP",
  },
];

export default function DetailedStudentCards() {
  const performanceColor = (perf: string) => {
    switch (perf) {
      case "Excellent":
        return "bg-green-500/20 text-green-600 border-green-500/30";
      case "Very Good":
        return "bg-cyan-500/20 text-cyan-600 border-cyan-500/30";
      case "Good":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-600 border-gray-500/30";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-6 w-6 text-cyan-500" />
          <h2 className="font-heading text-2xl font-bold">Student Details</h2>
          <Badge variant="secondary">{detailedStudents.length} Active</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Comprehensive student profiles with achievements and contributions
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Students", value: "1,248", icon: "👥" },
          { label: "Avg Points", value: "234", icon: "⭐" },
          { label: "Avg Projects", value: "5.8", icon: "📊" },
          { label: "Avg Contrib.", value: "93", icon: "🚀" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-lg border border-border bg-muted/30 p-3 text-center"
          >
            <p className="text-lg mb-1">{stat.icon}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-sm font-bold text-primary mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Student Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {detailedStudents.map((student, idx) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="relative rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-6 overflow-hidden group cursor-pointer transition-all"
          >
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Content */}
            <div className="relative z-10 space-y-4">
              {/* Header with avatar and status */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-sm"
                  >
                    {student.avatar}
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.dept} • Sem {student.semester}</p>
                  </div>
                </div>
                <Badge className={performanceColor(student.performance)}>{student.performance}</Badge>
              </div>

              {/* Contact & Location */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{student.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-3 w-3" />
                  <span>Joined {student.joinDate}</span>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50">
                <div className="text-center">
                  <p className="text-lg font-bold text-cyan-400">{student.points}</p>
                  <p className="text-[10px] text-muted-foreground">Points</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-violet-400">{student.projects}</p>
                  <p className="text-[10px] text-muted-foreground">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-emerald-400">{student.contributions}</p>
                  <p className="text-[10px] text-muted-foreground">Contrib.</p>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="space-y-2 pt-2 border-t border-border/50">
                <p className="text-xs font-semibold text-muted-foreground">Top Skills</p>
                <div className="flex flex-wrap gap-1">
                  {student.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-[10px] py-0 px-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-2 pt-2 border-t border-border/50">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="flex-1 flex items-center justify-center gap-1 text-xs font-medium py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <Github className="h-3 w-3" />
                  GitHub
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="flex-1 flex items-center justify-center gap-1 text-xs font-medium py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <Linkedin className="h-3 w-3" />
                  LinkedIn
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 font-medium transition-all text-sm"
      >
        View All {detailedStudents.length}+ Students
      </motion.button>
    </motion.div>
  );
}
