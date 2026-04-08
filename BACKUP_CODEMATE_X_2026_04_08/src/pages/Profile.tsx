import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { User, Mail, Phone, Github, Linkedin, BookOpen, GraduationCap, Wrench, Save, RefreshCw, Calendar, Camera } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ALL_SKILLS = [
  "React", "Node.js", "Python", "Java", "TypeScript", "MongoDB", "PostgreSQL",
  "Flutter", "ML/AI", "IoT", "DevOps", "UI/UX", "Figma", "Docker", "AWS",
  "TensorFlow", "C++", "Rust", "Go",
];

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [department, setDepartment] = useState(user?.department || "");
  const [semester, setSemester] = useState(user?.semester?.toString() || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [linkedin, setLinkedin] = useState(user?.linkedin || "");
  const [github, setGithub] = useState(user?.github || "");
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [adopted, setAdopted] = useState<any[]>([]);
  const [photo, setPhoto] = useState(user?.photo || "");

  const toggleSkill = (skill: string) => {
    setSkills((prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setPhoto(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile({ name, department, semester: parseInt(semester) || undefined, phone, linkedin, github, skills, photo });
    toast.success("Profile updated successfully! ✅");
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem("adoptedIdeas");
      const list = raw ? JSON.parse(raw) : [];
      const mine = user?.email ? list.filter((a: any) => a.adoptedBy === user.email) : [];
      setAdopted(mine);
    } catch (e) {
      setAdopted([]);
    }
  }, [user?.email]);

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <Avatar className="h-20 w-20">
              {photo ? (
                <img src={photo} alt="Profile" className="h-full w-full object-cover rounded-full" />
              ) : (
                <AvatarFallback className="gradient-primary text-2xl font-bold text-primary-foreground">{user?.initials}</AvatarFallback>
              )}
            </Avatar>
            <label htmlFor="photo-upload" className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer hover:bg-primary/80 transition-colors">
              <Camera className="h-3 w-3 text-primary-foreground" />
            </label>
            <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </motion.div>
          <div>
            <h1 className="font-heading text-2xl font-bold">{user?.name}</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role} · {user?.department}</p>
          </div>
        </div>

        {/* Form */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-6 space-y-5">
          <h2 className="font-heading text-lg font-bold">Personal Information</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-sm font-medium"><User className="h-3.5 w-3.5" /> Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-sm font-medium"><Mail className="h-3.5 w-3.5" /> Email</label>
              <input value={email} disabled
                className="h-10 w-full rounded-lg border border-border bg-muted px-3 text-sm text-muted-foreground" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-sm font-medium"><BookOpen className="h-3.5 w-3.5" /> Department</label>
              <select value={department} onChange={(e) => setDepartment(e.target.value)}
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                <option value="">Select</option>
                {["CSE", "IT", "ECE", "ME", "CE", "EE", "Administration"].map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            {user?.role === "student" && (
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-sm font-medium"><GraduationCap className="h-3.5 w-3.5" /> Semester</label>
                <select value={semester} onChange={(e) => setSemester(e.target.value)}
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="">Select</option>
                  {[1,2,3,4,5,6,7,8].map((s) => <option key={s} value={s}>Semester {s}</option>)}
                </select>
              </div>
            )}
          </div>

          <h2 className="font-heading text-lg font-bold pt-2">Contact Details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-sm font-medium"><Phone className="h-3.5 w-3.5" /> Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210"
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-sm font-medium"><Linkedin className="h-3.5 w-3.5" /> LinkedIn</label>
              <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="linkedin.com/in/..."
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
            </div>
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-sm font-medium"><Github className="h-3.5 w-3.5" /> GitHub</label>
            <input value={github} onChange={(e) => setGithub(e.target.value)} placeholder="github.com/..."
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>

          {user?.role === "student" && (
            <>
              <h2 className="font-heading text-lg font-bold pt-2 flex items-center gap-2"><Wrench className="h-5 w-5" /> Skills</h2>
              <div className="flex flex-wrap gap-2">
                {ALL_SKILLS.map((s) => (
                  <motion.button 
                    key={s} 
                    type="button" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleSkill(s)}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                      skills.includes(s) ? "gradient-primary text-primary-foreground shadow-md" : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}>{s}</motion.button>
                ))}
              </div>
            </>
          )}

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex items-center gap-2 rounded-lg gradient-cta px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            <Save className="h-4 w-4" /> Save Changes
          </motion.button>
        </motion.div>

        {/* Adopted Ideas */}
        {adopted.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="rounded-xl border-2 border-success/20 bg-gradient-to-br from-success/5 to-success/10 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-success" />
              <h2 className="font-heading text-lg font-bold">Adopted Ideas</h2>
              <Badge variant="secondary" className="ml-auto">{adopted.length} total</Badge>
            </div>
            <div className="grid gap-4">
              {adopted.map((a, idx) => (
                <motion.div 
                  key={a.title + a.adoptedAt} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                  className="rounded-lg border border-border bg-card p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-heading font-semibold">{a.title}</p>
                        <Badge variant="outline" className="text-[10px] text-success">Active</Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{a.desc}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {(a.tags || []).map((t: string) => (
                          <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground shrink-0">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(a.adoptedAt).toLocaleDateString()}
                      </div>
                      <div className="mt-1 text-[10px]">by {a.author || "unknown"}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Profile;
