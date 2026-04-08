import { motion } from "framer-motion";
import { FolderOpen, Users, Calendar, Code2, Eye, Star, Github, ExternalLink, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProjectDetail {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Completed" | "Planning";
  progress: number;
  teamSize: number;
  startDate: string;
  technologies: string[];
  lead: string;
  college: string;
  views: number;
  stars: number;
  repoLink?: string;
}

const detailedProjects: ProjectDetail[] = [
  {
    id: "1",
    name: "AI Campus Navigator",
    description: "Intelligent campus navigation system with AI-powered route optimization and real-time updates",
    status: "Active",
    progress: 85,
    teamSize: 4,
    startDate: "Jan 2024",
    technologies: ["React", "Python", "TensorFlow", "Maps API"],
    lead: "Priya Sharma",
    college: "IIT Bombay",
    views: 1240,
    stars: 156,
    repoLink: "github.com/codemate/ai-navigator",
  },
  {
    id: "2",
    name: "Smart Attendance System",
    description: "Automated attendance tracking using facial recognition and blockchain verification",
    status: "Active",
    progress: 92,
    teamSize: 3,
    startDate: "Dec 2023",
    technologies: ["OpenCV", "Blockchain", "Node.js", "React"],
    lead: "Rahul Mehta",
    college: "VJTI Mumbai",
    views: 987,
    stars: 124,
    repoLink: "github.com/codemate/smart-attendance",
  },
  {
    id: "3",
    name: "RevivalHub Platform",
    description: "Platform to revive and complete abandoned open-source projects with community support",
    status: "Active",
    progress: 65,
    teamSize: 5,
    startDate: "Oct 2023",
    technologies: ["Next.js", "PostgreSQL", "Docker", "AWS"],
    lead: "Sneha Kulkarni",
    college: "KKWIEER",
    views: 2156,
    stars: 289,
    repoLink: "github.com/codemate/revivalhub",
  },
  {
    id: "4",
    name: "IoT Weather Station",
    description: "Distributed IoT-based weather monitoring system with real-time data visualization",
    status: "Active",
    progress: 78,
    teamSize: 3,
    startDate: "Feb 2024",
    technologies: ["Arduino", "MQTT", "InfluxDB", "Grafana"],
    lead: "Arjun Singh",
    college: "MAEU",
    views: 654,
    stars: 87,
    repoLink: "github.com/codemate/iot-weather",
  },
  {
    id: "5",
    name: "Mobile Learning App",
    description: "Cross-platform educational app with gamification and personalized learning paths",
    status: "Active",
    progress: 72,
    teamSize: 4,
    startDate: "Nov 2023",
    technologies: ["Flutter", "Firebase", "Dart", "Machine Learning"],
    lead: "Aisha Khan",
    college: "Symbiosis",
    views: 1823,
    stars: 212,
    repoLink: "github.com/codemate/mobile-learning",
  },
  {
    id: "6",
    name: "DevOps Automation",
    description: "Comprehensive CI/CD pipeline and infrastructure automation toolkit for teams",
    status: "Completed",
    progress: 100,
    teamSize: 2,
    startDate: "Aug 2023",
    technologies: ["Kubernetes", "Terraform", "GitLab CI", "Docker"],
    lead: "Vikram Patel",
    college: "IIT Bombay",
    views: 2945,
    stars: 358,
    repoLink: "github.com/codemate/devops-toolkit",
  },
];

export default function DetailedProjectCards() {
  const statusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-600 border-green-500/30";
      case "Completed":
        return "bg-cyan-500/20 text-cyan-600 border-cyan-500/30";
      case "Planning":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  const activeCount = detailedProjects.filter((p) => p.status === "Active").length;
  const completedCount = detailedProjects.filter((p) => p.status === "Completed").length;

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
          <FolderOpen className="h-6 w-6 text-violet-500" />
          <h2 className="font-heading text-2xl font-bold">Active Projects</h2>
          <Badge variant="secondary">{detailedProjects.length} Total</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Complete project portfolio with team details and progress tracking
        </p>
      </div>

      {/* Project Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Active Projects", value: activeCount, icon: "🚀" },
          { label: "Completed", value: completedCount, icon: "✅" },
          { label: "Avg Team Size", value: "3.8", icon: "👥" },
          { label: "Avg Progress", value: "82%", icon: "📈" },
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

      {/* Project Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {detailedProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="relative rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-6 overflow-hidden group cursor-pointer transition-all"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Content */}
            <div className="relative z-10 space-y-4">
              {/* Header with title and status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-bold text-base mb-1">{project.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                </div>
                <Badge className={statusColor(project.status)}>{project.status}</Badge>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-2 gap-3 text-xs py-3 border-t border-b border-border/50">
                {/* Team Size */}
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Team</p>
                    <p className="font-semibold">{project.teamSize} members</p>
                  </div>
                </div>

                {/* Start Date */}
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Started</p>
                    <p className="font-semibold">{project.startDate}</p>
                  </div>
                </div>

                {/* Views */}
                <div className="flex items-center gap-2">
                  <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Views</p>
                    <p className="font-semibold">{project.views.toLocaleString()}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-2">
                  <Star className="h-3.5 w-3.5 text-amber-500" />
                  <div>
                    <p className="text-muted-foreground">Stars</p>
                    <p className="font-semibold text-amber-500">{project.stars}</p>
                  </div>
                </div>
              </div>

              {/* Lead & College */}
              <div className="space-y-2 text-xs">
                <div>
                  <p className="text-muted-foreground mb-1">Project Lead</p>
                  <p className="font-semibold">{project.lead}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">College</p>
                  <Badge variant="outline" className="text-[10px]">
                    {project.college}
                  </Badge>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2 pt-2 border-t border-border/50">
                <p className="text-xs font-semibold text-muted-foreground">Technologies</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-[9px] py-0 px-2">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 border-t border-border/50">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 flex items-center justify-center gap-1 text-xs font-medium py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <Github className="h-3 w-3" />
                  Repo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 flex items-center justify-center gap-1 text-xs font-medium py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <ExternalLink className="h-3 w-3" />
                  Visit
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
        className="w-full py-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 font-medium transition-all text-sm flex items-center justify-center gap-2"
      >
        <Zap className="h-4 w-4" />
        View All {detailedProjects.length}+ Projects
      </motion.button>
    </motion.div>
  );
}
