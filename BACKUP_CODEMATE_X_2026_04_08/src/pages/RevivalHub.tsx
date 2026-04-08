import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, ArrowRight, Users, Calendar, Mail, Phone, Github, X, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

const defaultProjects = [
  { title: "Virtual Lab Simulator", desc: "A VR-based virtual lab for physics and chemistry experiments with 3D molecule rendering and interactive simulations.", tags: ["Unity", "C#", "WebGL"], author: "Karan J.", reason: "Team disbanded", date: "Jan 2026", interested: 12, authorEmail: "karan@college.edu", authorPhone: "+91 99887 43210", github: "https://github.com/karanj/virtual-lab", technologies: "Unity, C#, WebGL, VR", difficulty: "Hard", skills: ["Unity", "C#", "3D Graphics", "VR"], status: "abandoned" },
  { title: "College Carpooling App", desc: "Ride-sharing platform exclusively for college students with route matching, fare splitting, and safety features.", tags: ["React Native", "Node.js", "Maps API"], author: "Divya S.", reason: "Deadline missed", date: "Dec 2025", interested: 8, authorEmail: "divya@college.edu", authorPhone: "+91 91234 56789", github: "https://github.com/divyas/carpooling", technologies: "React Native, Node.js, Maps API, MongoDB", difficulty: "Medium", skills: ["React Native", "Node.js", "Maps API", "Payments"], status: "abandoned" },
  { title: "Research Paper Finder", desc: "AI-powered tool to find and summarize relevant research papers with citation management and reading lists.", tags: ["Python", "NLP", "FastAPI"], author: "Amit P.", reason: "Scope too large", date: "Nov 2025", interested: 15, authorEmail: "amit@college.edu", authorPhone: "+91 88776 12345", github: "https://github.com/amitp/research-finder", technologies: "Python, NLP, FastAPI, TensorFlow", difficulty: "Hard", skills: ["Python", "NLP", "ML", "FastAPI"], status: "abandoned" },
  { title: "Student Marketplace", desc: "Buy and sell used textbooks, lab equipment, and study materials within campus with verified student profiles.", tags: ["React", "Node.js", "Stripe", "MongoDB"], author: "Sneha K.", reason: "Team graduated", date: "Feb 2026", interested: 20, authorEmail: "sneha@college.edu", authorPhone: "+91 77665 44332", github: "https://github.com/snehak/marketplace", technologies: "React, Node.js, Stripe, MongoDB", difficulty: "Medium", skills: ["React", "Node.js", "Stripe", "Database Design"], status: "abandoned" },
  { title: "AI Study Buddy", desc: "Personalized study companion that creates flashcards, quizzes, and summaries from lecture notes using AI.", tags: ["Python", "TensorFlow", "React", "GPT API"], author: "Rohan G.", reason: "Funding issues", date: "Jan 2026", interested: 25, authorEmail: "rohan@college.edu", authorPhone: "+91 66554 33221", github: "https://github.com/rohang/study-buddy", technologies: "Python, TensorFlow, React, GPT API", difficulty: "Hard", skills: ["Python", "ML", "React", "API Integration"], status: "abandoned" },
];

const ALL_SKILLS = ["React", "Node.js", "Python", "Java", "TypeScript", "MongoDB", "PostgreSQL", "Flutter", "ML/AI", "IoT", "DevOps", "UI/UX", "Docker", "TensorFlow", "Figma"];

const RevivalHub = () => {
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>(defaultProjects);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "", desc: "", reason: "Team size issue", tags: [] as string[], 
    github: "", technologies: "", difficulty: "Medium", skills: [] as string[]
  });

  useEffect(() => {
    const userProjects = localStorage.getItem("abandonedProjects");
    if (userProjects) {
      try {
        const parsed = JSON.parse(userProjects);
        setProjects([...parsed, ...defaultProjects]);
      } catch (e) {
        console.error("Failed to load abandoned projects:", e);
      }
    }
  }, []);

  const handleAddProject = () => {
    if (!formData.title.trim() || !formData.desc.trim()) {
      toast.error("Please fill title and description");
      return;
    }
    
    const newProject = {
      title: formData.title,
      desc: formData.desc,
      reason: formData.reason,
      tags: formData.tags,
      author: user?.name || "Student",
      authorEmail: user?.email || "student@college.edu",
      authorPhone: user?.phone || "+91 00000 00000",
      github: formData.github,
      technologies: formData.technologies || formData.tags.join(", "),
      difficulty: formData.difficulty,
      skills: formData.skills.length > 0 ? formData.skills : formData.tags,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short" }),
      interested: 0,
      status: "student_added"
    };

    try {
      const existing = localStorage.getItem("abandonedProjects");
      const list = existing ? JSON.parse(existing) : [];
      list.push(newProject);
      localStorage.setItem("abandonedProjects", JSON.stringify(list));
      setProjects([newProject, ...projects]);
      setFormData({ title: "", desc: "", reason: "Team size issue", tags: [], github: "", technologies: "", difficulty: "Medium", skills: [] });
      setShowAddForm(false);
      toast.success("Project added to Revival Hub! 🎉");
    } catch (e) {
      toast.error("Failed to add project");
    }
  };

  const adopt = (p: any) => {
    try {
      const key = "adoptedIdeas";
      const raw = localStorage.getItem(key);
      const list = raw ? JSON.parse(raw) : [];
      list.push({ ...p, adoptedBy: user?.email || "anonymous", adoptedAt: Date.now() });
      localStorage.setItem(key, JSON.stringify(list));
      toast.success(`You've adopted "${p.title}"! Start building your team. 🚀`);
      setSelectedProject(null);
    } catch (e) {
      toast.error("Unable to adopt idea. Please try again.");
    }
  };

  const deleteStudentProject = (projectTitle: string) => {
    try {
      const existing = localStorage.getItem("abandonedProjects");
      const list = existing ? JSON.parse(existing) : [];
      const filtered = list.filter((p: any) => p.title !== projectTitle);
      localStorage.setItem("abandonedProjects", JSON.stringify(filtered));
      setProjects(projects.filter(p => p.title !== projectTitle));
      toast.success("Project deleted successfully");
      setSelectedProject(null);
    } catch (e) {
      toast.error("Failed to delete project");
    }
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <h1 className="font-heading text-3xl font-bold flex items-center gap-2">
              <RefreshCw className="h-7 w-7 text-primary" /> Revival Hub
            </h1>
            <p className="mt-1 text-muted-foreground">Give abandoned project ideas a second chance or add your own.</p>
          </div>
          <motion.button
            onClick={() => setShowAddForm(!showAddForm)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-lg gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 whitespace-nowrap">
            <Plus className="h-4 w-4" /> Add Project
          </motion.button>
        </div>

        {/* Add Project Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-xl border border-primary/30 bg-card p-6 space-y-4">
              <h2 className="font-heading text-lg font-bold">Add Your Abandoned Project</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
                <select
                  title="Reason for abandonment"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none">
                  <option>Team size issue</option>
                  <option>Lack of funding</option>
                  <option>Scope too large</option>
                  <option>Team graduated</option>
                  <option>Time constraint</option>
                </select>
              </div>
              <textarea
                placeholder="Project Description"
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none min-h-24"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="GitHub Link (optional)"
                  value={formData.github}
                  onChange={(e) => setFormData({...formData, github: e.target.value})}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Technologies (optional)"
                  value={formData.technologies}
                  onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">Technologies</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {ALL_SKILLS.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => {
                        const newTags = formData.tags.includes(skill) 
                          ? formData.tags.filter(t => t !== skill)
                          : [...formData.tags, skill];
                        setFormData({...formData, tags: newTags, skills: newTags});
                      }}
                      className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                        formData.tags.includes(skill)
                          ? "gradient-primary text-primary-foreground"
                          : "border border-border bg-card text-muted-foreground hover:border-primary"
                      }`}>
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={handleAddProject}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
                  Add Project
                </motion.button>
                <motion.button
                  onClick={() => setShowAddForm(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-colors">
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
          {projects.map((p, idx) => (
            <motion.div 
              key={p.title + idx} 
              className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 transition-all hover:shadow-lg hover:bg-card cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedProject(p)}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="mb-2 flex items-center gap-2 flex-wrap">
                    <Badge variant="destructive" className="text-[10px]">{p.status === "student_added" ? "Revival Idea" : "Abandoned"}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
                    <span className="text-xs text-muted-foreground">· Reason: {p.reason}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <motion.span 
                        key={t} 
                        className="rounded-md border border-border/50 px-2 py-0.5 text-xs text-muted-foreground bg-primary/5"
                        whileHover={{ scale: 1.05 }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                    <span>Originally by <strong>{p.author}</strong></span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {p.interested} interested</span>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <motion.button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(p);
                    }}
                    className="flex items-center gap-1 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details <ArrowRight className="h-4 w-4" />
                  </motion.button>
                  {p.status === "student_added" && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteStudentProject(p.title);
                      }}
                      className="flex items-center gap-1 rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-500/20 transition-colors"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      title="Delete this project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-2xl rounded-2xl border border-border/50 bg-card backdrop-blur-xl shadow-2xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6 border-b border-border/50 p-6 sticky top-0 bg-card/95 backdrop-blur-sm">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="destructive">{selectedProject.status === "student_added" ? "Revival Idea" : "Abandoned"}</Badge>
                    <span className="text-xs text-muted-foreground">{selectedProject.date}</span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold">{selectedProject.title}</h2>
                </div>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="space-y-6 p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                {/* Description */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">Description</h3>
                  <p className="text-foreground">{selectedProject.desc}</p>
                </motion.div>

                {/* Project Details Grid */}
                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">Difficulty</p>
                    <p className="font-semibold text-foreground">{selectedProject.difficulty}</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">Technologies</p>
                    <p className="text-sm font-medium">{selectedProject.technologies}</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 col-span-2">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">Reason Abandoned</p>
                    <p className="text-sm font-medium">{selectedProject.reason}</p>
                  </div>
                </motion.div>

                {/* Skills Required */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Skills Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.skills.map((skill: string) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/30"
                        whileHover={{ scale: 1.1 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Contact & Links Section */}
                <motion.div 
                  className="border-t border-border/50 pt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4">Original Creator</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                        {selectedProject.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{selectedProject.author}</p>
                        <p className="text-xs text-muted-foreground">{selectedProject.reason}</p>
                      </div>
                    </div>

                    {/* Contact Methods */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      <motion.a
                        href={`mailto:${selectedProject.authorEmail}`}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium border border-primary/30"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail className="h-4 w-4" /> Email
                      </motion.a>
                      <motion.a
                        href={`tel:${selectedProject.authorPhone}`}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium border border-primary/30"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Phone className="h-4 w-4" /> Call
                      </motion.a>
                      {selectedProject.github && (
                        <motion.a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium border border-primary/30"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="h-4 w-4" /> GitHub
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex gap-3 pt-4 border-t border-border/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    onClick={() => adopt(selectedProject)}
                    className="flex-1 rounded-lg gradient-primary px-6 py-3 text-white font-semibold transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CheckCircle2 className="h-5 w-5" /> Adopt This Idea
                  </motion.button>
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-lg border border-border/50 px-6 py-3 font-semibold hover:bg-muted transition-colors"
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
    </DashboardLayout>
  );
};

export default RevivalHub;
