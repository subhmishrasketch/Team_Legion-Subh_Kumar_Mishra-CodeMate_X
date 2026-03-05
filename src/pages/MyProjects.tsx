import { DashboardLayout } from "@/components/DashboardLayout";
import { FolderOpen, Users, Clock, Plus, Copy, Trash2, X, Share2, UserX, Info, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { projects as defaultProjects } from "@/lib/projects";
import { toast } from "sonner";


const MyProjects = () => {
  const navigate = useNavigate();
  const { user, demoMode } = useAuth();
  const [allProjects, setAllProjects] = useState(defaultProjects);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [modalMode, setModalMode] = useState<"manage" | "details" | null>(null);
  const [appliedProjects, setAppliedProjects] = useState<string[]>([]);

  useEffect(() => {
    // Load posted projects from localStorage
    try {
      const postedKey = "postedProjects";
      const posted = localStorage.getItem(postedKey);
      const postedProjects = posted ? JSON.parse(posted) : [];
      setAllProjects([...postedProjects, ...defaultProjects]);
    } catch (err) {
      console.error("Error loading posted projects:", err);
    }

    // Load user's applications
    try {
      const applicationsKey = `applications_${user?.email}`;
      const apps = localStorage.getItem(applicationsKey);
      const appliedList = apps ? JSON.parse(apps) : [];
      setAppliedProjects(appliedList);
    } catch (err) {
      console.error("Error loading applications:", err);
    }
  }, [user]);

  const deleteProject = (title: string) => {
    setAllProjects(allProjects.filter(p => p.title !== title));
    try {
      const postedKey = "postedProjects";
      const posted = localStorage.getItem(postedKey);
      const postedProjects = posted ? JSON.parse(posted) : [];
      const updated = postedProjects.filter((p: any) => p.title !== title);
      localStorage.setItem(postedKey, JSON.stringify(updated));
      toast.success("Project deleted successfully");
    } catch (err) {
      console.error("Error deleting project:", err);
    }
    setSelectedProject(null);
    setModalMode(null);
  };

  const shareProject = () => {
    // if we're running on localhost use a deploy URL or dummy
    const origin = window.location.origin;
    const base = origin.includes("localhost") ? "https://codemate.vercel.app" : origin;
    const url = `${base}/dashboard?project=${encodeURIComponent(selectedProject.title)}`;
    navigator.clipboard.writeText(url);
    toast.success("Project link copied to clipboard!");
  };

  const applyToProject = () => {
    if (!user) {
      toast.error("Please sign in to apply");
      return;
    }

    try {
      const applicationsKey = `applications_${user.email}`;
      const updated = [...appliedProjects, selectedProject.title];
      setAppliedProjects(updated);
      localStorage.setItem(applicationsKey, JSON.stringify(updated));
      
      // Notify project owner
      const projectNotifKey = `projectApplications_${selectedProject.title}`;
      const existingApps = localStorage.getItem(projectNotifKey);
      const allApps = existingApps ? JSON.parse(existingApps) : [];
      allApps.push({
        applicantName: user.name,
        applicantEmail: user.email,
        applicantPhone: user.phone || "N/A",
        appliedDate: new Date().toLocaleString()
      });
      localStorage.setItem(projectNotifKey, JSON.stringify(allApps));
      
      toast.success(`✓ Application sent to ${selectedProject.title}!`);
      setModalMode(null);
    } catch (err) {
      console.error("Error applying to project:", err);
      toast.error("Failed to apply");
    }
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center justify-between flex-col sm:flex-row">
          <div>
            <h1 className="font-heading text-3xl font-bold flex items-center gap-2">
              <FolderOpen className="h-7 w-7 text-primary" /> My Projects
            </h1>
            <p className="mt-1 text-muted-foreground">Manage and track your active projects.</p>
          </div>
          <motion.button 
            onClick={() => navigate("/post-project")}
            className="flex items-center gap-2 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="h-4 w-4" /> New Project
          </motion.button>
        </div>

        <motion.div 
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
        >
          {allProjects.length === 0 ? (
            <motion.div 
              className="rounded-xl border border-border/50 bg-card p-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground">No projects yet. <button onClick={() => navigate("/post-project")} className="text-primary hover:underline font-semibold">Post one now!</button></p>
            </motion.div>
          ) : (
            allProjects.map((p, idx) => (
              <motion.div 
                key={`${p.title}-${idx}`} 
                className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 transition-all hover:shadow-lg hover:bg-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="mb-2 flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading text-lg font-semibold">{p.title}</h3>
                      <Badge variant={p.status === "In Progress" ? "default" : "secondary"} className="text-[10px]">{p.status || "Active"}</Badge>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{p.role || "Team Member"}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{p.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 4).map((t) => (
                        <motion.span 
                          key={t} 
                          className="rounded-md border border-border/50 px-2 py-0.5 text-xs text-muted-foreground bg-primary/5"
                          whileHover={{ scale: 1.05 }}
                        >
                          {t}
                        </motion.span>
                      ))}
                      {p.tags.length > 4 && <span className="text-xs text-muted-foreground">+{p.tags.length - 4}</span>}
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Team Members</span>
                        <span className="font-semibold text-foreground">{p.members}</span>
                      </div>
                      <Progress value={(parseInt(p.members.split("/")[0]) / parseInt(p.members.split("/")[1])) * 100} className="h-2" />
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Due: {p.deadline}</span>
                      <span>Match: <strong className="text-primary">{p.match}%</strong></span>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0 flex-wrap justify-end">
                    <motion.button 
                      onClick={() => {
                        setSelectedProject(p);
                        setModalMode("details");
                      }}
                      className="flex items-center gap-1 rounded-lg border border-border/50 px-3 py-2 text-xs font-medium hover:bg-primary/10 hover:border-primary/50 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="View project details and share"
                    >
                      <Info className="h-3.5 w-3.5" /> Open
                    </motion.button>
                    <motion.button 
                      onClick={() => {
                        setSelectedProject(p);
                        setModalMode("manage");
                      }}
                      className="flex items-center gap-1 rounded-lg border border-border/50 px-3 py-2 text-xs font-medium hover:bg-primary/10 hover:border-primary/50 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Manage team or delete"
                    >
                      <Users className="h-3.5 w-3.5" /> Manage
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && modalMode === "details" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => {
              setSelectedProject(null);
              setModalMode(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-2xl rounded-2xl border border-border/50 bg-card backdrop-blur-xl shadow-2xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between p-6 border-b border-border/50">
                <div>
                  <h2 className="font-heading text-2xl font-bold">{selectedProject.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{selectedProject.desc}</p>
                </div>
                <motion.button
                  onClick={() => {
                    setSelectedProject(null);
                    setModalMode(null);
                  }}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="space-y-6 p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                {/* Project Info Grid */}
                <motion.div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">Team Size</p>
                    <p className="font-semibold text-foreground">{selectedProject.members}</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">Deadline</p>
                    <p className="font-semibold text-foreground">{selectedProject.deadline}</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">Project Match</p>
                    <p className="font-semibold text-foreground">{selectedProject.match}%</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">Status</p>
                    <p className="font-semibold text-foreground">{selectedProject.status || "Active"}</p>
                  </div>
                </motion.div>

                {/* Technologies */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((t: string) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>

                {/* Share Project */}
                <div className="border-t border-border/50 pt-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Share Project</h3>
                  <p className="text-sm text-muted-foreground mb-3">Copy the link below to share this project:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={`${window.location.origin}/dashboard?project=${selectedProject.title}`}
                      readOnly
                      placeholder="Project share link"
                      className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                    />
                    <motion.button
                      onClick={shareProject}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 rounded-lg gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
                      <Share2 className="h-4 w-4" /> Copy
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 p-6 border-t border-border/50">
                {!appliedProjects.includes(selectedProject?.title) ? (
                  <>
                    <motion.button
                      onClick={applyToProject}
                      className="flex-1 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Check className="h-4 w-4" /> Apply to Join
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setSelectedProject(null);
                        setModalMode(null);
                      }}
                      className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      Close
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    disabled
                    className="flex-1 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground opacity-60 cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Check className="h-4 w-4" /> Already Applied
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manage Modal */}
      <AnimatePresence>
        {selectedProject && modalMode === "manage" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => {
              setSelectedProject(null);
              setModalMode(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-md rounded-2xl border border-border/50 bg-card backdrop-blur-xl p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-heading text-2xl font-bold mb-6">Manage "{selectedProject.title}"</h2>

              {/* Team Members Section */}
              <div className="space-y-4 mb-8 pb-8 border-b border-border/50">
                {selectedProject && (
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                    Team Members ({parseInt(selectedProject.members.split("/")[0])})
                  </h3>
                )}
                <div className="space-y-2">
                  {/* create placeholder member names based on count */}
                  {selectedProject &&
                    Array.from({ length: parseInt(selectedProject.members.split("/")[0]) || 0 }, (_, i) => `Member ${i + 1}`).map((member) => (
                      <div key={member} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                        <span className="text-sm font-medium">{member}</span>
                        <motion.button
                          onClick={() => toast.success(`${member} removed from project`)}
                          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title="Remove team member"
                        >
                          <UserX className="h-4 w-4" /> Remove
                        </motion.button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Delete Section */}
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Danger Zone</p>
                <motion.button
                  onClick={() => deleteProject(selectedProject.title)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-500/20 transition-colors">
                  <Trash2 className="h-4 w-4" /> Delete Project
                </motion.button>
              </div>

              <div className="flex gap-3 mt-8">
                <motion.button
                  onClick={() => {
                    setSelectedProject(null);
                    setModalMode(null);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-colors">
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default MyProjects;
