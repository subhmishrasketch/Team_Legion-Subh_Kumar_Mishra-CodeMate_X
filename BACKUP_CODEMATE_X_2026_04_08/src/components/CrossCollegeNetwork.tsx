import { motion } from "framer-motion";
import { useState } from "react";
import { Globe, Building2, Users, TrendingUp, Zap, Award, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence } from "framer-motion";

interface College {
  id: string;
  name: string;
  students: number;
  activeProjects: number;
  collaborations: number;
  topSkill: string;
  color: string;
}

const collegeData: College[] = [
  {
    id: "1",
    name: "IIT Bombay",
    students: 240,
    activeProjects: 34,
    collaborations: 12,
    topSkill: "AI/ML",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "2",
    name: "VJTI Mumbai",
    students: 185,
    activeProjects: 28,
    collaborations: 8,
    topSkill: "Web Dev",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "3",
    name: "KKWIEER",
    students: 156,
    activeProjects: 22,
    collaborations: 6,
    topSkill: "Cloud",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "4",
    name: "MAEU",
    students: 128,
    activeProjects: 18,
    collaborations: 5,
    topSkill: "DevOps",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "5",
    name: "Symbiosis",
    students: 95,
    activeProjects: 14,
    collaborations: 4,
    topSkill: "Mobile",
    color: "from-pink-500 to-rose-600",
  },
];

export default function CrossCollegeNetwork() {
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [showModal, setShowModal] = useState(false);

  const totalStudents = collegeData.reduce((sum, c) => sum + c.students, 0);
  const totalProjects = collegeData.reduce((sum, c) => sum + c.activeProjects, 0);
  const totalCollaborations = collegeData.reduce((sum, c) => sum + c.collaborations, 0);

  const handleViewDetails = (college: College) => {
    setSelectedCollege(college);
    setShowModal(true);
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
          <Globe className="h-6 w-6 text-cyan-500" />
          <h2 className="font-heading text-2xl font-bold">Cross College Collaboration Network</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Real-time collaboration data across multiple institutions
        </p>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-xl border border-border bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Total Students</p>
              <p className="text-2xl font-bold text-cyan-400">{totalStudents}+</p>
              <p className="text-xs text-muted-foreground mt-2">Across all colleges</p>
            </div>
            <Users className="h-8 w-8 text-cyan-500 opacity-20" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-xl border border-border bg-gradient-to-br from-violet-500/10 to-purple-500/10 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Active Projects</p>
              <p className="text-2xl font-bold text-violet-400">{totalProjects}+</p>
              <p className="text-xs text-muted-foreground mt-2">In progress</p>
            </div>
            <Zap className="h-8 w-8 text-violet-500 opacity-20" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-xl border border-border bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">Inter-College</p>
              <p className="text-2xl font-bold text-cyan-400">{totalCollaborations}+</p>
              <p className="text-xs text-muted-foreground mt-2">Active partnerships</p>
            </div>
            <TrendingUp className="h-8 w-8 text-cyan-500 opacity-20" />
          </div>
        </motion.div>
      </div>

      {/* College Network Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {collegeData.map((college, idx) => (
          <motion.div
            key={college.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative rounded-xl border border-border bg-card p-5 overflow-hidden group cursor-pointer transition-all"
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${college.color} opacity-0 group-hover:opacity-5 transition-opacity`}
            />

            {/* Content */}
            <div className="relative z-10 space-y-4">
              {/* College Name & Icon */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm line-clamp-2">{college.name}</h3>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${college.color} text-white text-xs font-bold`}>
                  {college.name.split(" ")[0][0]}
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                {/* Students */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Students</span>
                    <span className="text-xs font-semibold">{college.students}</span>
                  </div>
                  <Progress value={(college.students / 250) * 100} className="h-1.5" />
                </div>

                {/* Projects */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Projects</span>
                    <span className="text-xs font-semibold">{college.activeProjects}</span>
                  </div>
                  <Progress value={(college.activeProjects / 40) * 100} className="h-1.5" />
                </div>

                {/* Collaborations */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Partnerships</span>
                    <span className="text-xs font-semibold">{college.collaborations}</span>
                  </div>
                  <Progress value={(college.collaborations / 15) * 100} className="h-1.5" />
                </div>
              </div>

              {/* Top Skill Badge */}
              <Badge variant="secondary" className="w-full text-center justify-center text-xs py-1">
                ⭐ {college.topSkill}
              </Badge>

              {/* Action Link */}
              <motion.button
                onClick={() => handleViewDetails(college)}
                whileHover={{ x: 2 }}
                className="w-full text-xs font-medium py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                View Details →
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Network Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="rounded-xl border border-border bg-card p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            Network Highlights
          </h3>
          <Badge variant="outline" className="text-xs">Live</Badge>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              title: "Fastest Growing",
              value: "VJTI Mumbai",
              metric: "+28% this month",
              icon: "🚀",
            },
            {
              title: "Most Collaborative",
              value: "IIT Bombay",
              metric: "12 active partnerships",
              icon: "🤝",
            },
            {
              title: "Innovation Leader",
              value: "Symbiosis",
              metric: "AI/ML initiatives",
              icon: "💡",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              className="rounded-lg border border-border/50 bg-muted/30 p-4 text-center"
            >
              <p className="text-2xl mb-2">{item.icon}</p>
              <p className="text-xs font-semibold text-muted-foreground mb-1">{item.title}</p>
              <p className="text-sm font-bold mb-1">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.metric}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* College Details Modal */}
      <AnimatePresence>
        {showModal && selectedCollege && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${selectedCollege.color} text-white text-lg font-bold`}
                  >
                    {selectedCollege.name.split(" ").map(w => w[0]).join("")}
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl font-bold">{selectedCollege.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1">Connected Institution</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-lg border border-border bg-muted/30 p-4 text-center"
                >
                  <p className="text-2xl font-bold text-cyan-400 mb-1">{selectedCollege.students}</p>
                  <p className="text-xs text-muted-foreground">Active Students</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-lg border border-border bg-muted/30 p-4 text-center"
                >
                  <p className="text-2xl font-bold text-violet-400 mb-1">{selectedCollege.activeProjects}</p>
                  <p className="text-xs text-muted-foreground">Active Projects</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-lg border border-border bg-muted/30 p-4 text-center"
                >
                  <p className="text-2xl font-bold text-cyan-400 mb-1">{selectedCollege.collaborations}</p>
                  <p className="text-xs text-muted-foreground">Partnerships</p>
                </motion.div>
              </div>

              {/* Detailed Metrics */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-cyan-500" />
                      <p className="font-semibold">Student Distribution</p>
                    </div>
                    <span className="text-sm font-bold text-cyan-400">{selectedCollege.students} students</span>
                  </div>
                  <Progress value={(selectedCollege.students / 250) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">{Math.round((selectedCollege.students / totalStudents) * 100)}% of total network</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-violet-500" />
                      <p className="font-semibold">Project Activity</p>
                    </div>
                    <span className="text-sm font-bold text-violet-400">{selectedCollege.activeProjects} projects</span>
                  </div>
                  <Progress value={(selectedCollege.activeProjects / 40) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">{Math.round((selectedCollege.activeProjects / totalProjects) * 100)}% of network projects</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-cyan-500" />
                      <p className="font-semibold">Collaborations</p>
                    </div>
                    <span className="text-sm font-bold text-cyan-400">{selectedCollege.collaborations} active</span>
                  </div>
                  <Progress value={(selectedCollege.collaborations / 15) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">Active partnerships across institutions</p>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                onClick={() => setShowModal(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 py-3 rounded-lg border border-border hover:bg-muted/50 font-medium transition-colors"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
