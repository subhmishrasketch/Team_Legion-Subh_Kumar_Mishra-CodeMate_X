import { DashboardLayout } from "@/components/DashboardLayout";
import { FolderOpen, Users, Clock, Plus, Copy, Trash2, X, Share2, UserX, Info, Check, User as UserIcon, Mail, Phone, Github, Linkedin, ThumbsUp, ThumbsDown, UserPlus, Search, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { projects as defaultProjects } from "@/lib/projects";
import { toast } from "sonner";

interface JoinRequest {
  name: string;
  email: string;
  phone?: string;
  department: string;
  skills?: string[];
  github?: string;
  linkedin?: string;
  requestedDate: string;
  invited?: boolean;
}

// Mock user database for inviting
const allUsers = [
  { name: "Priya Sharma", email: "priya@college.edu", department: "CSE", skills: ["React", "Python", "TensorFlow"], avatar: "P" },
  { name: "Rahul Mehta", email: "rahul@college.edu", department: "CSE", skills: ["React", "Node.js", "IoT"], avatar: "R" },
  { name: "Neha Rao", email: "neha@college.edu", department: "IT", skills: ["Python", "OpenCV", "Flask"], avatar: "N" },
  { name: "Vikram Patel", email: "vikram@college.edu", department: "CSE", skills: ["React Native", "Node.js", "MongoDB"], avatar: "V" },
  { name: "Ananya Iyer", email: "ananya@college.edu", department: "IT", skills: ["TypeScript", "PostgreSQL", "React"], avatar: "A" },
  { name: "Rohan Gupta", email: "rohan@college.edu", department: "CSE", skills: ["React", "Node.js", "Docker"], avatar: "R" },
  { name: "Karan Singh", email: "karan@college.edu", department: "IT", skills: ["JavaScript", "Vue.js", "Firebase"], avatar: "K" },
  { name: "Maya Krishnan", email: "maya@college.edu", department: "CSE", skills: ["C++", "Data Structures", "Algorithms"], avatar: "M" },
  { name: "Arjun Reddy", email: "arjun@college.edu", department: "IT", skills: ["PHP", "MySQL", "Laravel"], avatar: "A" },
  { name: "Sneha Patel", email: "sneha@college.edu", department: "CSE", skills: ["Java", "Spring Boot", "Microservices"], avatar: "S" },
  { name: "Divya Sharma", email: "divya@college.edu", department: "IT", skills: ["Python", "Django", "PostgreSQL", "AWS"], avatar: "D" },
  { name: "Amit Kumar", email: "amit@college.edu", department: "CSE", skills: ["React", "Redux", "TypeScript", "Testing"], avatar: "A" },
  { name: "Isha Verma", email: "isha@college.edu", department: "IT", skills: ["Full Stack", "MERN", "MongoDB", "GraphQL"], avatar: "I" },
  { name: "Nitin Desai", email: "nitin@college.edu", department: "CSE", skills: ["Android", "Kotlin", "Firebase", "REST APIs"], avatar: "N" },
  { name: "Pooja Singh", email: "pooja@college.edu", department: "IT", skills: ["UI/UX Design", "Figma", "CSS", "React"], avatar: "P" },
  { name: "Sanjay Kumar", email: "sanjay@college.edu", department: "CSE", skills: ["Machine Learning", "Python", "TensorFlow", "Data Analysis"], avatar: "S" },
];

const MyProjects = () => {
  const navigate = useNavigate();
  const { user, demoMode } = useAuth();
  const [allProjects, setAllProjects] = useState(defaultProjects);
  const [myPostedProjects, setMyPostedProjects] = useState<any[]>([]);
  const [joinedProjects, setJoinedProjects] = useState<any[]>([]);
  const [recommendedProjects, setRecommendedProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [modalMode, setModalMode] = useState<"manage" | "details" | "profile" | null>(null);
  const [appliedProjects, setAppliedProjects] = useState<string[]>([]);
  const [inviteSearch, setInviteSearch] = useState("");
  const [showInviteSection, setShowInviteSection] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load posted projects from localStorage
    try {
      const postedKey = "postedProjects";
      let posted = localStorage.getItem(postedKey);
      let postedProjects = posted ? JSON.parse(posted) : [];

      // If no posted projects, add some sample ones
      if (postedProjects.length === 0) {
        const sampleProjects = [
          {
            title: "AI Campus Navigator",
            desc: "An intelligent campus navigation system using computer vision and AR.",
            owner: { name: user?.name || "Demo User", email: user?.email || "demo@college.edu" },
            joinRequests: [
              {
                name: "Priya Sharma",
                email: "priya@college.edu",
                phone: "+91 99887 11223",
                department: "CSE",
                skills: ["React", "Python", "TensorFlow"],
                github: "https://github.com/priya",
                linkedin: "https://linkedin.com/in/priya",
                requestedDate: new Date().toLocaleString()
              },
              {
                name: "Rahul Mehta",
                email: "rahul@college.edu",
                phone: "+91 98765 44332",
                department: "CSE",
                skills: ["React", "Node.js", "IoT"],
                github: "https://github.com/rahul",
                linkedin: "https://linkedin.com/in/rahul",
                requestedDate: new Date().toLocaleString()
              }
            ],
            acceptedMembers: [],
            tags: ["React", "Python", "AI"],
            deadline: "Mar 15, 2026"
          }
        ];
        postedProjects = sampleProjects;
        localStorage.setItem(postedKey, JSON.stringify(postedProjects));
      }
      
      // Categorize projects for current user
      // If no projects match the current user, show all sample projects
      const myPosted = postedProjects.filter((p:  any) => p.owner?.email === user?.email);
      const joined = postedProjects.filter((p: any) => 
        p.acceptedMembers?.some((m: any) => m.email === user?.email)
      );
      const recommended = postedProjects.filter((p: any) => 
        p.owner?.email !== user?.email && 
        !p.acceptedMembers?.some((m: any) => m.email === user?.email) &&
        !p.joinRequests?.some((r: any) => r.email === user?.email)
      );
      
      // If user has no posted projects yet, show all projects as examples
      setMyPostedProjects(myPosted.length > 0 ? myPosted : postedProjects);
      setJoinedProjects(joined);
      setRecommendedProjects(recommended.length > 0 ? recommended : []);
      setAllProjects([...postedProjects, ...defaultProjects]);
      setIsLoading(false);
    } catch (err) {
      console.error("Error loading projects:", err);
      setIsLoading(false);
    }

    // Load user's applications (legacy)
    try {
      const applicationsKey = `applications_${user?.email}`;
      const apps = localStorage.getItem(applicationsKey);
      const appliedList = apps ? JSON.parse(apps) : [];
      setAppliedProjects(appliedList);
    } catch (err) {
      console.error("Error loading applications:", err);
    }
  }, [user]);

  // reload all project-related state from localStorage (mirrors logic in useEffect)
  const refreshProjects = () => {
    try {
      const postedKey = "postedProjects";
      const posted = localStorage.getItem(postedKey);
      const postedProjects = posted ? JSON.parse(posted) : [];

      const myPosted = postedProjects.filter((p: any) => p.owner?.email === user?.email);
      const joined = postedProjects.filter((p: any) =>
        p.acceptedMembers?.some((m: any) => m.email === user?.email)
      );
      const recommended = postedProjects.filter((p: any) =>
        p.owner?.email !== user?.email &&
        !p.acceptedMembers?.some((m: any) => m.email === user?.email) &&
        !p.joinRequests?.some((r: any) => r.email === user?.email)
      );

      setMyPostedProjects(myPosted.length > 0 ? myPosted : postedProjects);
      setJoinedProjects(joined);
      setRecommendedProjects(recommended.length > 0 ? recommended : []);
      setAllProjects([...postedProjects, ...defaultProjects]);
    } catch (err) {
      console.error("Error refreshing projects:", err);
    }
  };

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
    refreshProjects();
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
      const postedKey = "postedProjects";
      const posted = localStorage.getItem(postedKey);
      const postedProjects = posted ? JSON.parse(posted) : [];
      
      const updateIdx = postedProjects.findIndex((p: any) => p.title === selectedProject.title);
      if (updateIdx >= 0) {
        if (!postedProjects[updateIdx].joinRequests) {
          postedProjects[updateIdx].joinRequests = [];
        }
        
        if (postedProjects[updateIdx].joinRequests.some((r: any) => r.email === user.email)) {
          toast.error("Already applied to this project");
          return;
        }
        
        postedProjects[updateIdx].joinRequests.push({
          name: user.name,
          email: user.email,
          phone: user.phone,
          department: user.department,
          skills: user.skills,
          github: user.github,
          linkedin: user.linkedin,
          requestedDate: new Date().toLocaleString()
        });
        
        localStorage.setItem(postedKey, JSON.stringify(postedProjects));
        setRecommendedProjects(recommendedProjects.filter(p => p.title !== selectedProject.title));
        
        // Notify project owner
        const ownerNotifKey = `ownerNotifs_${selectedProject.owner.email}`;
        const ownerNotifs = JSON.parse(localStorage.getItem(ownerNotifKey) || "[]");
        ownerNotifs.push({
          type: "joinRequest",
          projectTitle: selectedProject.title,
          applicantName: user.name,
          applicantEmail: user.email,
          timestamp: new Date().toLocaleString()
        });
        localStorage.setItem(ownerNotifKey, JSON.stringify(ownerNotifs));
        
        toast.success("✓ Request sent!");
        setModalMode(null);
      }
    } catch (err) {
      console.error("Error applying:", err);
      toast.error("Failed to apply");
    }
  };

  const acceptJoinRequest = (request: JoinRequest) => {
    if (!selectedProject) return;

    try {
      const postedKey = "postedProjects";
      const posted = localStorage.getItem(postedKey);
      const postedProjects = posted ? JSON.parse(posted) : [];
      
      const updateIdx = postedProjects.findIndex((p: any) => p.title === selectedProject.title);
      if (updateIdx >= 0) {
        postedProjects[updateIdx].joinRequests = postedProjects[updateIdx].joinRequests?.filter((r: any) => r.email !== request.email) || [];
        
        if (!postedProjects[updateIdx].acceptedMembers) {
          postedProjects[updateIdx].acceptedMembers = [];
        }
        postedProjects[updateIdx].acceptedMembers.push(request);
        
        // Notify accepted user
        const notifKey = `joinAccepted_${request.email}`;
        const notifs = JSON.parse(localStorage.getItem(notifKey) || "[]");
        notifs.push({
          type: "joinAccepted",
          projectTitle: selectedProject.title,
          projectOwner: user?.name,
          timestamp: new Date().toLocaleString()
        });
        localStorage.setItem(notifKey, JSON.stringify(notifs));
        
        localStorage.setItem(postedKey, JSON.stringify(postedProjects));
        setSelectedProject(postedProjects[updateIdx]);
        toast.success(`✓ ${request.name} accepted!`);
        // refresh overall lists so counts update everywhere
        refreshProjects();
      }
    } catch (err) {
      console.error("Error accepting:", err);
      toast.error("Failed to accept");
    }
  };

  const rejectJoinRequest = (request: JoinRequest) => {
    if (!selectedProject) return;

    try {
      const postedKey = "postedProjects";
      const posted = localStorage.getItem(postedKey);
      const postedProjects = posted ? JSON.parse(posted) : [];
      
      const updateIdx = postedProjects.findIndex((p: any) => p.title === selectedProject.title);
      if (updateIdx >= 0) {
        postedProjects[updateIdx].joinRequests = postedProjects[updateIdx].joinRequests?.filter((r: any) => r.email !== request.email) || [];
        localStorage.setItem(postedKey, JSON.stringify(postedProjects));
        setSelectedProject(postedProjects[updateIdx]);
        toast.success(`Rejected`);
      }
    } catch (err) {
      console.error("Error rejecting:", err);
      toast.error("Failed to reject");
    }
  };

  const removeMember = (memberEmail: string) => {
    if (!selectedProject) return;

    try {
      const postedKey = "postedProjects";
      const posted = localStorage.getItem(postedKey);
      const postedProjects = posted ? JSON.parse(posted) : [];
      
      const updateIdx = postedProjects.findIndex((p: any) => p.title === selectedProject.title);
      if (updateIdx >= 0) {
        postedProjects[updateIdx].acceptedMembers = (postedProjects[updateIdx].acceptedMembers || []).filter((m: any) => m.email !== memberEmail);
        localStorage.setItem(postedKey, JSON.stringify(postedProjects));
        setSelectedProject(postedProjects[updateIdx]);
        toast.success("Member removed from project");
        refreshProjects();
      }
    } catch (err) {
      console.error("Error removing member:", err);
      toast.error("Failed to remove member");
    }
  };

  const inviteMember = (member: any) => {
    // when we "invite" a user we now add them straight into the project
    // rather than creating a pending request.  this mirrors the logic from
    // acceptJoinRequest but without the notification step.
    if (!selectedProject) return;

    try {
      const postedKey = "postedProjects";
      const posted = localStorage.getItem(postedKey);
      const postedProjects = posted ? JSON.parse(posted) : [];

      const updateIdx = postedProjects.findIndex((p: any) => p.title === selectedProject.title);
      if (updateIdx >= 0) {
        const alreadyMember = selectedProject.acceptedMembers?.some((m: any) => m.email === member.email);
        if (alreadyMember) {
          toast.error(`${member.name} is already a member`);
          return;
        }

        // ensure acceptedMembers array exists
        if (!postedProjects[updateIdx].acceptedMembers) {
          postedProjects[updateIdx].acceptedMembers = [];
        }

        // push the new member object (same shape as JoinRequest)
        postedProjects[updateIdx].acceptedMembers.push({
          name: member.name,
          email: member.email,
          department: member.department,
          skills: member.skills,
          requestedDate: new Date().toLocaleString(),
        });

        // remove from joinRequests if somehow they were there
        postedProjects[updateIdx].joinRequests = postedProjects[updateIdx].joinRequests?.filter((r: any) => r.email !== member.email) || [];

        localStorage.setItem(postedKey, JSON.stringify(postedProjects));
        setSelectedProject(postedProjects[updateIdx]);
        toast.success(`${member.name} has been added to the project`);
        // rebuild state arrays so that counts in recommended/my lists reflect change
        refreshProjects();
      }
    } catch (err) {
      console.error("Error adding member:", err);
      toast.error("Failed to add member");
    }
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 w-full">
        {/* Header */}
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <h1 className="font-heading text-3xl font-bold flex items-center gap-2">
              <FolderOpen className="h-7 w-7 text-primary" /> My Projects
            </h1>
            <p className="mt-1 text-muted-foreground">Post, manage, and collaborate on projects.</p>
          </div>
          <motion.button 
            onClick={() => navigate("/post-project")}
            className="flex items-center gap-2 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 whitespace-nowrap"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="h-4 w-4" /> New Project
          </motion.button>
        </div>

        {/* Posted Projects */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-xl font-bold">Posted Projects</h2>
            <Badge variant="secondary">{myPostedProjects.length}</Badge>
          </div>

          {myPostedProjects.length === 0 ? (
            <motion.div className="rounded-xl border border-border/50 bg-card/50 p-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-muted-foreground">No projects posted. <button onClick={() => navigate("/post-project")} className="text-primary hover:underline font-semibold">Post one!</button></p>
            </motion.div>
          ) : (
            <motion.div className="space-y-3" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }}>
              {myPostedProjects.map((p, idx) => (
                <motion.div key={`${p.title}-${idx}`} className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 transition-all hover:shadow-lg hover:bg-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} whileHover={{ y: -2 }}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-semibold">{p.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{p.desc}</p>
                      {p.joinRequests && p.joinRequests.length > 0 && <p className="text-xs text-orange-500 font-medium mt-2">🔔 {p.joinRequests.length} join request(s)</p>}
                    </div>
                    <div className="flex gap-2">
                      <motion.button onClick={() => { setSelectedProject(p); setModalMode("details"); }} className="flex items-center gap-1 rounded-lg border border-border/50 px-3 py-2 text-xs font-medium hover:bg-primary/10" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Eye className="h-3.5 w-3.5" /> Open
                      </motion.button>
                      <motion.button onClick={() => { setSelectedProject(p); setModalMode("manage"); setInviteSearch(""); setShowInviteSection(false); }} className="flex items-center gap-1 rounded-lg border border-border/50 px-3 py-2 text-xs font-medium hover:bg-primary/10" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Users className="h-3.5 w-3.5" /> Manage
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Joined Projects */}
        {joinedProjects.length > 0 && (
          <div className="space-y-3 pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-blue-500" />
              <h2 className="font-heading text-xl font-bold">Joined Projects</h2>
              <Badge variant="outline">{joinedProjects.length}</Badge>
            </div>

            <motion.div className="space-y-3" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }}>
              {joinedProjects.map((p, idx) => (
                <motion.div key={`joined-${p.title}-${idx}`} className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} whileHover={{ y: -2 }}>
                  <h3 className="font-heading text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">By <span className="font-semibold cursor-pointer hover:text-primary" onClick={() => { setSelectedProfile(p.owner); setModalMode("profile"); }}>{p.owner?.name}</span></p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.desc}</p>
                  <motion.button onClick={() => { setSelectedProfile(p.owner); setModalMode("profile"); }} className="mt-3 flex items-center gap-1 rounded-lg border border-border/50 px-3 py-2 text-xs font-medium hover:bg-primary/10" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <UserIcon className="h-3.5 w-3.5" /> View Owner
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Recommended Projects */}
        {recommendedProjects.length > 0 && (
          <div className="space-y-3 pt-6 border-t border-border">
            <h2 className="font-heading text-xl font-bold">Discover Projects</h2>

            <motion.div className="space-y-3" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }}>
              {recommendedProjects.slice(0, 5).map((p, idx) => (
                <motion.div key={`recommended-${p.title}-${idx}`} className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} whileHover={{ y: -2 }}>
                  <h3 className="font-heading text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">By <span className="font-semibold cursor-pointer hover:text-primary" onClick={() => { setSelectedProfile(p.owner); setModalMode("profile"); }}>{p.owner?.name}</span></p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.desc}</p>
                  <div className="flex gap-2 mt-3">
                    <motion.button onClick={() => { setSelectedProject(p); applyToProject(); }} className="flex-1 flex items-center justify-center gap-1 rounded-lg gradient-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Check className="h-3.5 w-3.5" /> Apply to Join
                    </motion.button>
                    <motion.button onClick={() => { setSelectedProfile(p.owner); setModalMode("profile"); }} className="flex items-center gap-1 rounded-lg border border-border/50 px-3 py-2 text-xs font-medium hover:bg-primary/10" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <UserIcon className="h-3.5 w-3.5" /> Profile
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedProfile && modalMode === "profile" && (
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="w-full max-w-md rounded-2xl border border-border/50 bg-card p-8 shadow-2xl fixed inset-0 z-50 m-auto">
              <div className="flex items-start justify-between mb-6">
                <h2 className="font-heading text-2xl font-bold">Student Profile</h2>
                <motion.button onClick={() => setModalMode(null)} className="p-2 hover:bg-muted rounded-lg" whileHover={{ scale: 1.1 }}>
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div className="text-center py-4 border-b border-border/50">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50">
                    {selectedProfile?.photo ? (
                      <img src={selectedProfile.photo} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <span className="text-2xl font-bold text-white">{selectedProfile?.name?.split(' ').map((n: string) => n[0]).join('')}</span>
                    )}
                  </div>
                  <h3 className="font-heading text-xl font-bold mt-3">{selectedProfile?.name}</h3>
                </div>

                {selectedProfile?.department && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground text-sm font-medium">Department:</span>
                    <span className="font-semibold">{selectedProfile.department}</span>
                  </div>
                )}

                {selectedProfile?.email && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${selectedProfile.email}`} className="text-primary hover:underline text-sm">{selectedProfile.email}</a>
                  </div>
                )}

                {selectedProfile?.phone && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedProfile.phone}</span>
                  </div>
                )}

                {selectedProfile?.github && (
                  <motion.a href={selectedProfile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-primary/10" whileHover={{ scale: 1.02 }}>
                    <Github className="h-4 w-4 text-muted-foreground" />
                    <span className="text-primary hover:underline text-sm font-medium">GitHub</span>
                  </motion.a>
                )}

                {selectedProfile?.linkedin && (
                  <motion.a href={selectedProfile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-primary/10" whileHover={{ scale: 1.02 }}>
                    <Linkedin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-primary hover:underline text-sm font-medium">LinkedIn</span>
                  </motion.a>
                )}
              </div>

              <motion.button onClick={() => setModalMode(null)} className="w-full mt-6 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted" whileHover={{ scale: 1.02 }}>
                Close
              </motion.button>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && modalMode === "details" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalMode(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl border border-border/50 bg-card shadow-2xl">
              
              {/* Header */}
              <div className="sticky top-0 border-b border-border bg-card p-6 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="font-heading text-2xl font-bold">{selectedProject.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{selectedProject.desc}</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setModalMode(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    ✕
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Project Details */}
                <div>
                  <h3 className="font-semibold mb-3">Project Details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Difficulty</p>
                      <p className="text-sm font-semibold">{selectedProject.details?.difficulty || "Medium"}</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Technologies</p>
                      <p className="text-sm font-semibold">{selectedProject.details?.technologies || selectedProject.tags?.join(", ")}</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Team Members</p>
                      <p className="text-sm font-semibold">{(selectedProject.acceptedMembers?.length || 0) + 1} members</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Deadline</p>
                      <p className="text-sm font-semibold">{selectedProject.deadline}</p>
                    </div>
                  </div>
                </div>

                {/* Join Requests */}
                {selectedProject.joinRequests && selectedProject.joinRequests.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Pending Join Requests ({selectedProject.joinRequests.length})</h3>
                    <div className="space-y-2">
                      {selectedProject.joinRequests.map((request: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                          <div>
                            <p className="font-medium text-sm">{request.name}</p>
                            <p className="text-xs text-muted-foreground">{request.email}</p>
                          </div>
                          <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded">Pending</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Accepted Members */}
                {selectedProject.acceptedMembers && selectedProject.acceptedMembers.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Team Members ({selectedProject.acceptedMembers.length})</h3>
                    <div className="space-y-2">
                      {selectedProject.acceptedMembers.map((member: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                          <span className="text-xs bg-success/20 text-success px-2 py-1 rounded">Accepted</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 border-t border-border bg-card p-6">
                <div className="flex gap-3">
                  <motion.button onClick={() => setModalMode(null)} className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted" whileHover={{ scale: 1.02 }}>
                    Close
                  </motion.button>
                  <motion.button onClick={() => { setModalMode("manage"); }} className="flex-1 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90" whileHover={{ scale: 1.02 }}>
                    Manage Project
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manage Project Modal */}
      <AnimatePresence>
        {selectedProject && modalMode === "manage" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalMode(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
          >
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl rounded-2xl border border-border/50 bg-card shadow-2xl">
              <div className="flex items-start justify-between p-6 border-b border-border/50">
                <div>
                  <h2 className="font-heading text-2xl font-bold">{selectedProject.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{selectedProject.desc}</p>
                </div>
                <motion.button onClick={() => setModalMode(null)} className="p-2 hover:bg-muted rounded-lg" whileHover={{ scale: 1.1 }}>
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="space-y-6 p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                {/* Join Requests */}
                {selectedProject.joinRequests && selectedProject.joinRequests.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4">Join Requests ({selectedProject.joinRequests.length})</h3>
                    <div className="space-y-3">
                      {selectedProject.joinRequests.map((request: JoinRequest, idx: number) => (
                        <motion.div key={`request-${idx}`} className="flex items-center justify-between rounded-lg bg-muted/50 p-4 border border-border/50" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold">{request.name}</p>
                              {request.invited && <span className="text-xs bg-blue-500/20 text-blue-600 px-2 py-0.5 rounded">Invited</span>}
                            </div>
                            <p className="text-xs text-muted-foreground">{request.email} • {request.department}</p>
                            {request.skills && request.skills.length > 0 && (
                              <div className="flex gap-1 mt-2 flex-wrap">
                                {request.skills.slice(0, 3).map(s => (
                                  <span key={s} className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">{s}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <motion.button onClick={() => acceptJoinRequest(request)} className="p-2 rounded-lg bg-blue-500/20 text-blue-600 hover:bg-blue-500/30" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} title="Accept">
                              <ThumbsUp className="h-4 w-4" />
                            </motion.button>
                            <motion.button onClick={() => rejectJoinRequest(request)} className="p-2 rounded-lg bg-red-500/20 text-red-600 hover:bg-red-500/30" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} title="Reject">
                              <ThumbsDown className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Accepted Members */}
                {selectedProject.acceptedMembers && selectedProject.acceptedMembers.length > 0 && (
                  <div className="border-t border-border/50 pt-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4">Team Members ({selectedProject.acceptedMembers.length})</h3>
                    <div className="space-y-2">
                      {selectedProject.acceptedMembers.map((member: any, idx: number) => (
                        <motion.div key={`member-${member.email}`} className="flex items-center justify-between rounded-lg bg-muted/50 p-3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                          <motion.button 
                            onClick={() => removeMember(member.email)} 
                            className="p-2 rounded-lg bg-red-500/20 text-red-600 hover:bg-red-500/30 transition-colors" 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.95 }}
                            title="Remove member">
                            <UserX className="h-4 w-4" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Invite Members */}
                <div className="border-t border-border/50 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase">Invite Team Members</h3>
                    <motion.button 
                      onClick={() => setShowInviteSection(!showInviteSection)}
                      className="flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80"
                      whileHover={{ scale: 1.05 }}
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      {showInviteSection ? 'Hide' : 'Show'} Available Members
                    </motion.button>
                  </div>

                  {showInviteSection && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          value={inviteSearch}
                          onChange={(e) => setInviteSearch(e.target.value)}
                          placeholder="🔍 Search by name, email, or skills (e.g., Priya, React)..."
                          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-primary/30 bg-primary/5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-xs text-blue-700 dark:text-blue-300">
                        <strong>✨ How to search:</strong> Type any member's name (e.g., "Priya", "Rahul"), email, or skills (e.g., "React", "Python") to find and add them
                      </div>

                      <div className="max-h-96 overflow-y-auto space-y-2 border border-border/50 rounded-lg p-3 bg-muted/20">
                        {allUsers
                          .filter(member => 
                            member.email !== user?.email && // Don't show current user
                            !selectedProject.acceptedMembers?.some((m: any) => m.email === member.email) && // Not already a member
                            !selectedProject.joinRequests?.some((r: any) => r.email === member.email) && // Not already invited/applied
                            (inviteSearch === '' || 
                             member.name.toLowerCase().includes(inviteSearch.toLowerCase()) ||
                             member.email.toLowerCase().includes(inviteSearch.toLowerCase()) ||
                             member.skills.some(skill => skill.toLowerCase().includes(inviteSearch.toLowerCase())))
                          )
                          .slice(0, 10)
                          .map((member, idx) => (
                            <motion.div 
                              key={member.email}
                              className="flex items-center justify-between rounded-lg bg-white dark:bg-slate-800 border border-border/50 hover:border-primary/50 p-4 transition-all hover:shadow-md"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <div className="flex-1 min-w-0 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-md">
                                  {member.avatar}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-bold text-sm text-foreground">{member.name}</p>
                                  <p className="text-xs text-muted-foreground">{member.email}</p>
                                  <p className="text-xs text-muted-foreground font-medium">{member.department}</p>
                                  <div className="flex gap-1 mt-1 flex-wrap">
                                    {member.skills.slice(0, 3).map(skill => (
                                      <span key={skill} className="text-xs bg-primary/15 text-primary px-2 py-1 rounded font-medium">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <motion.button 
                                onClick={() => inviteMember(member)}
                                className="ml-3 flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all whitespace-nowrap shadow-sm"
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                title={`Invite ${member.name} to this project`}
                              >
                                <UserPlus className="h-4 w-4" />
                                Add
                              </motion.button>
                            </motion.div>
                          ))}
                      </div>

                      {inviteSearch && allUsers.filter(user => 
                        user.email !== user?.email &&
                        !selectedProject.acceptedMembers?.some((m: any) => m.email === user.email) &&
                        !selectedProject.joinRequests?.some((r: any) => r.email === user.email) &&
                        (user.name.toLowerCase().includes(inviteSearch.toLowerCase()) ||
                         user.email.toLowerCase().includes(inviteSearch.toLowerCase()) ||
                         user.skills.some(skill => skill.toLowerCase().includes(inviteSearch.toLowerCase())))
                      ).length === 0 && (
                        <div className="text-center py-6 text-muted-foreground text-sm">
                          <p>😔 No members found for "{inviteSearch}"</p>
                          <p className="text-xs mt-1">Try searching with a name (e.g., Priya), email, or skill (e.g., React)</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Delete */}
                <div className="border-t border-border/50 pt-6">
                  <motion.button onClick={() => deleteProject(selectedProject.title)} className="w-full flex items-center justify-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-500/20" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Trash2 className="h-4 w-4" /> Delete Project
                  </motion.button>
                </div>
              </div>

              <div className="flex gap-3 p-6 border-t border-border/50">
                <motion.button onClick={() => { setModalMode(null); setInviteSearch(""); setShowInviteSection(false); }} className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-muted" whileHover={{ scale: 1.02 }}>
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
