import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const ALL_SKILLS = [
  "React", "Node.js", "Python", "Java", "TypeScript", "MongoDB", "PostgreSQL",
  "Flutter", "ML/AI", "IoT", "DevOps", "UI/UX", "Figma", "Docker", "AWS",
  "TensorFlow", "C++", "Rust", "Go", "Kotlin", "Swift",
];

const TEAM_SIZES = ["2 members", "3 members", "4 members", "5 members", "6+ members"];

const PostProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState("");
  const [deadline, setDeadline] = useState("");
  const [pitchVideo, setPitchVideo] = useState("");
  const [githubLink, setGithubLink] = useState("");

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || selectedSkills.length === 0 || !teamSize) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const newProject = {
        title,
        desc: description,
        tags: selectedSkills,
        members: "1/" + teamSize.split(" ")[0],
        deadline,
        match: 100,
        author: user?.name || "Anonymous",
        authorEmail: user?.email || "",
        authorPhone: user?.phone || "",
        urgent: false,
        details: {
          technologies: selectedSkills.join(", "),
          difficulty: "Medium",
          description,
        },
        owner: {
          name: user?.name || "Anonymous",
          email: user?.email || ""
        },
        joinRequests: [],
        acceptedMembers: [],
        postedBy: user?.email,
        postedAt: new Date().toISOString(),
        github: githubLink,
        status: "In Progress",
        role: "Project Owner"
      };

      const key = "postedProjects";
      const existing = localStorage.getItem(key);
      const projects = existing ? JSON.parse(existing) : [];
      projects.push(newProject);
      localStorage.setItem(key, JSON.stringify(projects));

      toast.success("Project posted successfully! 🎉");
      navigate("/my-projects");
    } catch (err) {
      toast.error("Failed to post project");
    }
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl space-y-2">
        <h1 className="font-heading text-3xl font-bold">
          Post a <span className="text-gradient">New Project</span>
        </h1>
        <p className="text-muted-foreground">Share your idea and find the perfect teammates.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6 rounded-xl border border-border bg-card p-6">
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Project Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., AI-Powered Campus Navigator"
              className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5}
              placeholder="Describe your project idea, goals, and what you're looking to build..."
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary resize-y" />
          </div>

          {/* Skills */}
          <div>
            <label className="mb-2 block text-sm font-semibold">Required Skills</label>
            <div className="flex flex-wrap gap-2">
              {ALL_SKILLS.map((s) => (
                <button key={s} type="button" onClick={() => toggleSkill(s)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                    selectedSkills.includes(s)
                      ? "gradient-primary text-primary-foreground shadow-sm"
                      : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Team Size & Deadline */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Team Size</label>
              <select value={teamSize} onChange={(e) => setTeamSize(e.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary">
                <option value="">Select</option>
                {TEAM_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Deadline</label>
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary" />
            </div>
          </div>

          {/* GitHub */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold">GitHub Link (optional)</label>
            <input type="url" value={githubLink} onChange={(e) => setGithubLink(e.target.value)}
              placeholder="https://github.com/..."
              className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>

          {/* Pitch Video */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold">Pitch Video (optional)</label>
            <input value={pitchVideo} onChange={(e) => setPitchVideo(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <button type="submit"
              className="h-11 rounded-lg gradient-cta px-8 font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              Post Project
            </button>
            <button type="button" onClick={() => navigate("/dashboard")}
              className="h-11 rounded-lg border border-border px-6 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
              Cancel
            </button>
          </div>
        </form>

        {/* Pro Tip */}
        <div className="rounded-xl gradient-primary p-4 text-primary-foreground">
          <p className="text-sm font-semibold">🚀 Pro Tip</p>
          <p className="text-xs opacity-90">Complete projects to earn activity points and climb the leaderboard!</p>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default PostProject;
