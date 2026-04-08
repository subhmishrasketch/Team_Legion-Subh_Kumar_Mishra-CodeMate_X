import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Users, Clock, Tag, UserCheck, UserX, TrendingUp, AlertCircle, CheckCircle2, Zap, Brain, Target, BarChart3, Github, Linkedin, Mail, Phone, ExternalLink, MessageSquare, Award, BookOpen, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { projects as sharedProjects } from "@/lib/projects";

// User profiles database
const userProfiles: Record<string, any> = {
  "Priya Sharma": { avatar: "P", email: "priya@college.edu", phone: "+91 99887 11223", department: "CSE", semester: "7", skills: ["React", "Python", "TensorFlow", "AR", "UI/UX Design"], github: "https://github.com/priya", linkedin: "https://linkedin.com/in/priya", activityPoints: 285, pastProjects: 8, connections: 42 },
  "Rahul Mehta": { avatar: "R", email: "rahul@college.edu", phone: "+91 98765 44332", department: "CSE", semester: "6", skills: ["React", "Node.js", "IoT", "D3.js", "System Design"], github: "https://github.com/rahul", linkedin: "https://linkedin.com/in/rahul", activityPoints: 215, pastProjects: 6, connections: 38 },
  "Neha Rao": { avatar: "N", email: "neha@college.edu", phone: "+91 91234 56789", department: "IT", semester: "7", skills: ["Python", "OpenCV", "Flask", "React", "ML"], github: "https://github.com/neha", linkedin: "https://linkedin.com/in/neha", activityPoints: 198, pastProjects: 5, connections: 35 },
  "Vikram Patel": { avatar: "V", email: "vikram@college.edu", phone: "+91 88776 55443", department: "CSE", semester: "5", skills: ["React Native", "Node.js", "MongoDB", "Stripe", "AWS"], github: "https://github.com/vikram", linkedin: "https://linkedin.com/in/vikram", activityPoints: 156, pastProjects: 4, connections: 28 },
  "Ananya Iyer": { avatar: "A", email: "ananya@college.edu", phone: "+91 77665 44332", department: "IT", semester: "8", skills: ["TypeScript", "PostgreSQL", "React", "IoT", "DevOps"], github: "https://github.com/ananya", linkedin: "https://linkedin.com/in/ananya", activityPoints: 312, pastProjects: 9, connections: 51 },
  "Rohan Gupta": { avatar: "R", email: "rohan@college.edu", phone: "+91 66554 33221", department: "CSE", semester: "6", skills: ["React", "Node.js", "Docker", "ML/AI", "System Architecture"], github: "https://github.com/rohan", linkedin: "https://linkedin.com/in/rohan", activityPoints: 241, pastProjects: 7, connections: 44 },
};

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showAllMembers, setShowAllMembers] = useState(false);

  useEffect(() => {
    if (!slug || !user) return;

    const title = decodeURIComponent(slug);
    try {
      const posted = localStorage.getItem("postedProjects");
      const postedProjects = posted ? JSON.parse(posted) : [];
      
      // First, try to find in user's posted projects
      let found = postedProjects.find((p: any) => p.title === title && p.owner?.email === user.email);
      
      // If not found, try shared projects
      if (!found) {
        found = sharedProjects.find((p: any) => p.title === title);
      }
      
      setProject(found || null);
    } catch (err) {
      console.error("Error loading project:", err);
      setProject(null);
    }
  }, [slug, user]);

  if (!project) {
    return (
      <DashboardLayout>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="font-heading text-2xl font-bold">Project Not Found</h1>
          <p className="mt-2 text-muted-foreground">No project matches "{slug}"</p>
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-primary hover:underline font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        {/* Hero Header with Gradient */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
          className="rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-3xl rounded-full" />
          </div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className={`text-xs px-3 py-1.5 ${
                    project.status === "Active" ? "bg-green-500/20 text-green-600 border-green-500/30" :
                    project.status === "Planning" ? "bg-blue-500/20 text-blue-600 border-blue-500/30" :
                    "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
                  }`}>
                    {project.status || "Planning"}
                  </Badge>
                  <Badge className={`text-xs px-3 py-1.5 ${
                    project.details?.difficulty === "Hard" ? "bg-red-500/20 text-red-600 border-red-500/30" :
                    project.details?.difficulty === "Easy" ? "bg-green-500/20 text-green-600 border-green-500/30" :
                    "bg-purple-500/20 text-purple-600 border-purple-500/30"
                  }`}>
                    {project.details?.difficulty || "Medium"}
                  </Badge>
                </div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3 text-foreground">{project.title}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{project.desc}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags?.slice(0, 4).map((tag: string, idx: number) => (
                <Badge key={idx} className="text-xs px-3 py-1.5 bg-primary/20 text-primary border-primary/30">{tag}</Badge>
              ))}
              {project.tags?.length > 4 && <Badge className="text-xs px-3 py-1.5 bg-primary/20 text-primary border-primary/30">+{project.tags.length - 4}</Badge>}
            </div>
          </div>
        </motion.div>

        {/* Key Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Difficulty</p>
            <p className="text-sm font-semibold">{project.details?.difficulty || "Medium"}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Technologies</p>
            <p className="text-sm font-semibold">{project.details?.technologies || project.tags?.join(", ")}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Team Members</p>
            <p className="text-sm font-semibold">{(project.acceptedMembers?.length || 0) + 1} members</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Deadline</p>
            <p className="text-sm font-semibold">{project.deadline}</p>
          </div>
        </div>

        {/* 🎯 PROJECT SUCCESS PREDICTOR */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} 
          className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-lg font-bold">💡 Project Success Predictor</h2>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            {/* Success Rate */}
            <motion.div whileHover={{ y: -4 }} className="rounded-lg border border-primary/30 bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold">Success Rate</p>
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
              <div className="mb-2">
                <p className="text-3xl font-bold text-success">78%</p>
                <p className="text-xs text-muted-foreground mt-1">Based on team composition &amp; tech stack</p>
              </div>
              <Progress value={78} className="h-2" />
            </motion.div>

            {/* Difficulty Level */}
            <motion.div whileHover={{ y: -4 }} className="rounded-lg border border-warning/30 bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold">Difficulty</p>
                <BarChart3 className="h-4 w-4 text-warning" />
              </div>
              <div className="mb-2">
                <p className="text-2xl font-bold uppercase">{project.details?.difficulty || "Medium"}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {project.details?.difficulty === "Hard" && "Requires expert-level skills"}
                  {project.details?.difficulty === "Medium" && "Good learning opportunity"}
                  {project.details?.difficulty === "Easy" && "Great for beginners"}
                </p>
              </div>
              <Badge variant={
                project.details?.difficulty === "Hard" ? "destructive" :
                project.details?.difficulty === "Medium" ? "default" : "secondary"
              } className="w-full justify-center mt-2">
                {project.details?.difficulty === "Hard" ? "⚡ Challenging" : 
                 project.details?.difficulty === "Medium" ? "🎯 Balanced" : "✨ Accessible"}
              </Badge>
            </motion.div>

            {/* Risk Factors */}
            <motion.div whileHover={{ y: -4 }} className="rounded-lg border border-destructive/30 bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold">Risk Assessment</p>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  <span>Team size adequate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  <span>Timeline realistic</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-3 w-3 text-warning" />
                  <span>Skill gap detected</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 🤖 AI TEAM BUILDER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-purple-500" />
            <h2 className="font-heading text-lg font-bold">🤖 AI Team Builder Analysis</h2>
          </div>

          <div className="space-y-4">
            {/* Team Composition */}
            <div className="grid gap-4 md:grid-cols-3">
              {/* Frontend Role */}
              <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg border border-blue-500/30 bg-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Frontend Developer</h3>
                  <Zap className="h-4 w-4 text-blue-500" />
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Compatibility Score</span>
                      <span className="font-bold text-blue-500">92%</span>
                    </div>
                    <Progress value={92} className="h-1.5" />
                  </div>
                  <Badge variant="secondary" className="w-full justify-center text-xs">Role Detected ✓</Badge>
                  <p className="text-xs text-muted-foreground">Current: React, TypeScript, Tailwind</p>
                </div>
              </motion.div>

              {/* Backend Role */}
              <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg border border-green-500/30 bg-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Backend Developer</h3>
                  <Zap className="h-4 w-4 text-green-500" />
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Compatibility Score</span>
                      <span className="font-bold text-blue-500">85%</span>
                    </div>
                    <Progress value={85} className="h-1.5" />
                  </div>
                  <Badge variant="secondary" className="w-full justify-center text-xs">Role Detected ✓</Badge>
                  <p className="text-xs text-muted-foreground">Current: Node.js, MongoDB</p>
                </div>
              </motion.div>

              {/* AI/ML Role */}
              <motion.div whileHover={{ scale: 1.02 }} className="rounded-lg border border-purple-500/30 bg-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">AI/ML Specialist</h3>
                  <Zap className="h-4 w-4 text-purple-500" />
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Compatibility Score</span>
                      <span className="font-bold text-purple-500">68%</span>
                    </div>
                    <Progress value={68} className="h-1.5" />
                  </div>
                  <Badge variant="outline" className="w-full justify-center text-xs">🔴 Skills Gap</Badge>
                  <p className="text-xs text-muted-foreground">Needed: TensorFlow, Python</p>
                </div>
              </motion.div>
            </div>

            {/* Missing Skills Alerts */}
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <div className="flex items-start gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm">Missing Skill Alerts</h3>
                  <p className="text-xs text-muted-foreground mt-1">These skills would improve project success:</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-card/50 p-3">
                  <div>
                    <p className="text-sm font-medium">TensorFlow / ML</p>
                    <p className="text-xs text-muted-foreground">Required for AI features</p>
                  </div>
                  <Badge variant="destructive" className="text-xs">Critical</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-card/50 p-3">
                  <div>
                    <p className="text-sm font-medium">DevOps / Docker</p>
                    <p className="text-xs text-muted-foreground">For deployment &amp; scaling</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">Important</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-card/50 p-3">
                  <div>
                    <p className="text-sm font-medium">System Design</p>
                    <p className="text-xs text-muted-foreground">For architecture planning</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">Recommended</Badge>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Ratings & Reviews */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <ProjectRating projectId={project.id || slug} projectTitle={project.title} />
        </motion.div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Tag className="h-4 w-4" /> Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string, idx: number) => (
                <Badge key={idx} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Join Requests */}
        {project.joinRequests && project.joinRequests.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg">
              <UserX className="h-5 w-5 text-warning" /> Pending Join Requests ({project.joinRequests.length})
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {project.joinRequests.map((request: any, idx: number) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                  className="rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-5 hover:border-warning/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{request.name}</p>
                      <p className="text-sm text-muted-foreground">{request.department || 'CSE'}</p>
                    </div>
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">Pending</Badge>
                  </div>
                  <div className="space-y-3 text-sm">
                    {request.email && <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /> {request.email}</div>}
                    {request.phone && <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> {request.phone}</div>}
                  </div>
                  {request.skills && request.skills.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">SKILLS</p>
                      <div className="flex flex-wrap gap-1">
                        {request.skills.map((skill: string, sidx: number) => (
                          <Badge key={sidx} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Team Members with GitHub Links */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          {/* Project Lead */}
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-primary" /> Project Team
          </h3>
          
          {/* Project Owner Card */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <motion.div whileHover={{ y: -4 }} className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold text-lg">
                    {project.author?.charAt(0) || project.owner?.name?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{project.author || project.owner?.name}</p>
                    <Badge className="text-xs bg-primary/20 text-primary border-primary/30">👑 Project Lead</Badge>
                  </div>
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /> {project.authorEmail || project.owner?.email}</div>
                  {project.authorPhone && <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> {project.authorPhone}</div>}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedMember({ name: project.author || project.owner?.name, email: project.authorEmail || project.owner?.email, phone: project.authorPhone, ...userProfiles[project.author] })}
                  className="w-full py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors text-sm font-medium">
                  View Profile
                </motion.button>
              </div>
            </motion.div>

            {/* Accepted Members */}
            {project.acceptedMembers?.map((member: any, idx: number) => (
              <motion.div key={idx} whileHover={{ y: -4 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (idx + 1) * 0.1 }}
                className="rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/50 p-6 hover:border-primary/50 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                    {member.name?.charAt(0) || 'M'}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{member.name}</p>
                    <Badge className="text-xs bg-success/20 text-success border-success/30">✓ Team Member</Badge>
                  </div>
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  {member.email && <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /> {member.email}</div>}
                  {member.phone && <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> {member.phone}</div>}
                </div>
                {member.department && (
                  <p className="text-xs text-muted-foreground mb-3">{member.department}</p>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedMember({ ...member, ...userProfiles[member.name] })}
                  className="w-full py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-colors text-sm font-medium">
                  View Profile
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Accepted Members */}
        {project.acceptedMembers && project.acceptedMembers.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-lg">
              <UserCheck className="h-5 w-5 text-success" /> All Team Members ({(project.acceptedMembers?.length || 0) + 1})
            </h3>
            {/* Grid already shown above, this is just for reference */}
          </motion.div>
        )}

        {/* Member Profile Modal */}
        <AnimatePresence mode="wait">
          {selectedMember && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
              <motion.div 
                initial={{ scale: 0.85, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.85, y: 40, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl rounded-2xl border border-border/50 bg-card backdrop-blur-xl overflow-hidden shadow-2xl">
                
                {/* Header with gradient background */}
                <div className="h-32 bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-blue-500/20 relative">
                  <motion.button
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ✕
                  </motion.button>
                </div>

                <div className="px-6 pb-6">
                  {/* Avatar */}
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-end gap-4 -mt-16 mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-card shadow-lg">
                      {selectedMember.avatar || selectedMember.name?.charAt(0)}
                    </div>
                    <div className="flex-1 pb-2">
                      <h1 className="text-2xl font-bold">{selectedMember.name}</h1>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        {selectedMember.department && <Badge variant="outline">{selectedMember.department}</Badge>}
                        {selectedMember.semester && <span>Sem {selectedMember.semester}</span>}
                      </div>
                    </div>
                  </motion.div>

                  {/* Stats */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="grid grid-cols-3 gap-4 mb-6">
                    <div className="rounded-lg bg-primary/10 border border-primary/30 p-4 text-center">
                      <p className="text-3xl font-bold text-primary">{selectedMember.activityPoints || 0}</p>
                      <p className="text-xs text-muted-foreground mt-1">Activity Points</p>
                    </div>
                    <div className="rounded-lg bg-primary/10 border border-primary/30 p-4 text-center">
                      <p className="text-3xl font-bold text-primary">{selectedMember.pastProjects || 0}</p>
                      <p className="text-xs text-muted-foreground mt-1">Past Projects</p>
                    </div>
                    <div className="rounded-lg bg-primary/10 border border-primary/30 p-4 text-center">
                      <p className="text-3xl font-bold text-primary">{selectedMember.connections || 0}</p>
                      <p className="text-xs text-muted-foreground mt-1">Connections</p>
                    </div>
                  </motion.div>

                  {/* Skills */}
                  {selectedMember.skills && selectedMember.skills.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" /> Skills & Expertise
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedMember.skills.map((skill: string) => (
                          <motion.span
                            key={skill}
                            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-500/10 to-blue-500/10 text-primary text-sm font-medium border border-primary/30"
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Contact Information */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" /> Get in Touch
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                      {selectedMember.email && (
                        <motion.a
                          href={`mailto:${selectedMember.email}`}
                          className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted hover:border-primary/50 transition-all"
                          whileHover={{ x: 4 }}
                        >
                          <Mail className="h-5 w-5 text-primary" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">Email</p>
                            <p className="text-sm font-medium truncate">{selectedMember.email}</p>
                          </div>
                        </motion.a>
                      )}
                      {selectedMember.phone && (
                        <motion.a
                          href={`tel:${selectedMember.phone}`}
                          className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted hover:border-primary/50 transition-all"
                          whileHover={{ x: 4 }}
                        >
                          <Phone className="h-5 w-5 text-primary" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">Phone</p>
                            <p className="text-sm font-medium truncate">{selectedMember.phone}</p>
                          </div>
                        </motion.a>
                      )}
                    </div>
                  </motion.div>

                  {/* Social Links */}
                  {(selectedMember.github || selectedMember.linkedin) && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" /> Profiles & Links
                      </h3>
                      <div className="flex gap-3 mb-6">
                        {selectedMember.github && (
                          <motion.a
                            href={selectedMember.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold transition-opacity hover:opacity-90"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="h-5 w-5" /> GitHub
                          </motion.a>
                        )}
                        {selectedMember.linkedin && (
                          <motion.a
                            href={selectedMember.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-500/20 transition-all"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Linkedin className="h-5 w-5" /> LinkedIn
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Action Button */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="flex gap-3">
                    <motion.button
                      onClick={() => {
                        toast.success(`Interested in ${selectedMember.name}! 💬`);
                        setSelectedMember(null);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-semibold transition-opacity hover:opacity-90"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageSquare className="h-5 w-5" /> Send Message
                    </motion.button>
                    <motion.button
                      onClick={() => setSelectedMember(null)}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border/50 font-semibold hover:bg-muted transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Close
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </DashboardLayout>
  );
}
