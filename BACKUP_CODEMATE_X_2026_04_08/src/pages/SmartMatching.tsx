import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Users, Mail, Phone, CheckCircle2, TrendingUp, Filter, Zap, Star, Github, Linkedin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const ALL_SKILLS = [
  "React", "Node.js", "Python", "Java", "TypeScript", "MongoDB", "PostgreSQL",
  "Flutter", "ML/AI", "IoT", "DevOps", "UI/UX", "Docker", "TensorFlow", "Figma",
  "C++", "Rust", "Go", "Kotlin", "AWS",
];

const DEPARTMENTS = [
  "All Departments",
  "CSE", "IT", "ME", "ECE", "EEE", "CE"
];

const allCandidates = [
  {
    name: "Priya Sharma", initials: "PS", dept: "CSE", semester: 6, points: 285,
    skills: ["React", "Python", "TensorFlow", "ML/AI"], collab: 89, available: true,
    email: "priya@college.edu", phone: "+91 99887 11223", previousProjects: 12,
  },
  {
    name: "Neha Rao", initials: "NR", dept: "ME", semester: 7, points: 180,
    skills: ["Python", "ML/AI", "IoT", "Docker"], collab: 76, available: true,
    email: "neha@college.edu", phone: "+91 91234 56789", previousProjects: 8,
  },
  {
    name: "Amit Desai", initials: "AD", dept: "CSE", semester: 5, points: 195,
    skills: ["React", "Node.js", "TypeScript", "Docker"], collab: 82, available: false,
    email: "amit@college.edu", phone: "+91 88776 12345", previousProjects: 6,
  },
  {
    name: "Vikram Patel", initials: "VP", dept: "CSE", semester: 6, points: 165,
    skills: ["React", "TypeScript", "PostgreSQL", "AWS"], collab: 91, available: true,
    email: "vikram@college.edu", phone: "+91 88776 55443", previousProjects: 10,
  },
  {
    name: "Ananya Iyer", initials: "AI", dept: "IT", semester: 5, points: 150,
    skills: ["Flutter", "UI/UX", "Figma", "Kotlin"], collab: 85, available: true,
    email: "ananya@college.edu", phone: "+91 77665 44332", previousProjects: 7,
  },
  {
    name: "Rohan Gupta", initials: "RG", dept: "ECE", semester: 7, points: 140,
    skills: ["IoT", "C++", "Python", "DevOps"], collab: 72, available: true,
    email: "rohan@college.edu", phone: "+91 66554 33221", previousProjects: 5,
  },
  {
    name: "Sneha Kulkarni", initials: "SK", dept: "ECE", semester: 6, points: 210,
    skills: ["Python", "TensorFlow", "ML/AI", "Docker"], collab: 88, available: false,
    email: "sneha@college.edu", phone: "+91 55443 22110", previousProjects: 11,
  },
  {
    name: "Karan Joshi", initials: "KJ", dept: "CSE", semester: 4, points: 120,
    skills: ["React", "Node.js", "MongoDB", "DevOps"], collab: 78, available: true,
    email: "karan@college.edu", phone: "+91 44332 11009", previousProjects: 3,
  },
];

const SmartMatching = () => {
  const [selected, setSelected] = useState<string[]>(["React", "Python", "ML/AI"]);
  const [selectedDept, setSelectedDept] = useState<string>("All Departments");
  const [minSemester, setMinSemester] = useState<number>(3);
  const [maxSemester, setMaxSemester] = useState<number>(8);
  const [showQuickMatch, setShowQuickMatch] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  const toggleSkill = (skill: string) => {
    setSelected((prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]);
  };

  const getSkillOverlap = (skills: string[]) => {
    if (selected.length === 0) return 0;
    const matching = skills.filter((s) => selected.includes(s)).length;
    return (matching / selected.length);
  };

  const calculateMatchScore = (candidate: any) => {
    const skillOverlap = getSkillOverlap(candidate.skills) * 100;
    const availabilityBonus = candidate.available ? 20 : 0;
    const activityScore = (candidate.points / 312) * 30;
    const collabScore = (candidate.collab / 100) * 30; // Collaboration history
    const departmentBonus = selectedDept !== "All Departments" && candidate.dept === selectedDept ? 10 : 0;
    const projectExperienceScore = Math.min((candidate.previousProjects / 12) * 20, 20);

    return {
      skillScore: skillOverlap,
      availabilityBonus,
      activityScore,
      collabScore,
      departmentBonus,
      projectExperienceScore,
      total: skillOverlap + activityScore + collabScore + availabilityBonus + departmentBonus + projectExperienceScore
    };
  };

  const filteredCandidates = allCandidates.filter((c) => {
    const deptMatch = selectedDept === "All Departments" || c.dept === selectedDept;
    const semesterMatch = c.semester >= minSemester && c.semester <= maxSemester;
    const skillMatch = selected.length === 0 || c.skills.some((s: string) => selected.includes(s));
    return deptMatch && semesterMatch && skillMatch;
  });

  const candidates = filteredCandidates
    .map((c) => ({ 
      ...c, 
      overlap: Math.round(getSkillOverlap(c.skills) * 100),
      matchedSkills: c.skills.filter(s => selected.includes(s)),
      score: calculateMatchScore(c)
    }))
    .sort((a, b) => b.score.total - a.score.total);

  const skillGap = selected.map((s) => ({
    skill: s,
    count: allCandidates.filter((c) => c.skills.includes(s)).length,
  }));

  const topMatches = candidates.slice(0, 3);
  const perfectMatches = candidates.filter((c) => c.overlap === 100 && c.available);
  const goodMatches = candidates.filter((c) => c.overlap >= 50 && c.overlap < 100);
  const otherMatches = candidates.filter((c) => c.overlap < 50);

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-start justify-between flex-col md:flex-row gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold flex items-center gap-2">
              <Sparkles className="h-7 w-7 text-primary" /> Smart Matching
            </h1>
            <p className="mt-1 text-muted-foreground">Find the perfect teammates with advanced matching algorithm.</p>
          </div>
          <motion.button
            onClick={() => setShowQuickMatch(!showQuickMatch)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-lg gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 whitespace-nowrap">
            <Zap className="h-4 w-4" /> Quick Match
          </motion.button>
        </div>

        {/* Quick Match Section */}
        <AnimatePresence>
          {showQuickMatch && topMatches.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-6">
              <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" /> Top Recommendations for You
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {topMatches.map((c, idx) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-lg border border-primary/30 bg-card p-4 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                        {c.initials}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.dept} • Sem {c.semester}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold">Match Score</span>
                        <span className="text-sm font-bold text-primary">{Math.round(c.score.total)}%</span>
                      </div>
                      <Progress value={Math.round(c.score.total)} className="h-2" />
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {c.matchedSkills.slice(0, 2).map((s: string) => (
                        <Badge key={s} className="text-[10px]">{s}</Badge>
                      ))}
                      {c.matchedSkills.length > 2 && (
                        <Badge variant="outline" className="text-[10px]">+{c.matchedSkills.length - 2}</Badge>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        toast.success(`Invitation sent to ${c.name}! 📩`);
                        setShowQuickMatch(false);
                      }}
                      className="w-full rounded-lg bg-primary text-primary-foreground text-sm font-semibold py-2 hover:opacity-90 transition-opacity">
                      Connect Now
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skills Filter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} 
          className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 font-heading text-base font-semibold flex items-center gap-2">⚙️ Filter & Customize</h2>
          
          {/* Department Filter */}
          <div className="mb-5">
            <label className="text-sm font-semibold text-muted-foreground mb-2 block">
              <Filter className="inline h-4 w-4 mr-1" /> Department
            </label>
            <div className="flex flex-wrap gap-2">
              {DEPARTMENTS.map((dept) => (
                <motion.button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    selectedDept === dept
                      ? "gradient-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                  }`}>
                  {dept}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Semester Filter */}
          <div className="mb-5">
            <label className="text-sm font-semibold text-muted-foreground mb-2 block">
              Semester Range: {minSemester} - {maxSemester}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                title="Minimum semester"
                aria-label="Minimum semester"
                min="1"
                max="8"
                value={minSemester}
                onChange={(e) => setMinSemester(Math.min(parseInt(e.target.value), maxSemester))}
                className="flex-1"
              />
              <input
                type="range"
                title="Maximum semester"
                aria-label="Maximum semester"
                min="1"
                max="8"
                value={maxSemester}
                onChange={(e) => setMaxSemester(Math.max(parseInt(e.target.value), minSemester))}
                className="flex-1"
              />
            </div>
          </div>

          {/* Skills Filter */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {ALL_SKILLS.map((s) => (
                <motion.button 
                  key={s} 
                  onClick={() => toggleSkill(s)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                    selected.includes(s)
                      ? "gradient-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                  }`}>
                  {s}
                </motion.button>
              ))}
            </div>
            {selected.length > 0 && (
              <p className="mt-3 text-xs text-muted-foreground">
                🎯 {selected.length} skill{selected.length > 1 ? "s" : ""} selected · 
                <span className="text-success ml-1">✓ {candidates.filter((c) => c.overlap > 0).length} matches found</span>
              </p>
            )}
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Skill Gap Analysis */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 font-heading text-base font-semibold flex items-center gap-2">⚡ Skill Availability</h2>
            {skillGap.length === 0 ? (
              <p className="text-sm text-muted-foreground">Select skills to see availability</p>
            ) : skillGap.map((s, idx) => (
              <motion.div key={s.skill} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + idx * 0.05 }} 
                className="mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{s.skill}</span>
                  <span className="text-primary font-semibold">{s.count}/{allCandidates.length}</span>
                </div>
                <Progress value={Math.min((s.count / allCandidates.length) * 100, 100)} className="mt-1 h-2" />
              </motion.div>
            ))}
          </motion.div>

          {/* Candidates */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {perfectMatches.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-sm font-semibold text-success">Perfect Matches ({perfectMatches.length})</span>
                  </div>
                  <div className="space-y-3">
                    {perfectMatches.map((c, idx) => (
                      <CandidateCard key={c.name} candidate={c} selected={selected} index={idx} onProfileClick={setSelectedProfile} />
                    ))}
                  </div>
                </motion.div>
              )}

              {goodMatches.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mt-6 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-warning" />
                    <span className="text-sm font-semibold text-warning">Good Matches ({goodMatches.length})</span>
                  </div>
                  <div className="space-y-3">
                    {goodMatches.map((c, idx) => (
                      <CandidateCard key={c.name} candidate={c} selected={selected} index={idx} onProfileClick={setSelectedProfile} />
                    ))}
                  </div>
                </motion.div>
              )}

              {otherMatches.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mt-6 mb-3 flex items-center gap-2">
                    <span className="text-sm font-semibold text-muted-foreground">Other Candidates ({otherMatches.length})</span>
                  </div>
                  <div className="space-y-3">
                    {otherMatches.map((c, idx) => (
                      <CandidateCard key={c.name} candidate={c} selected={selected} index={idx} onProfileClick={setSelectedProfile} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {selected.length > 0 && candidates.length === 0 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center text-muted-foreground py-8">No matches found with current filters. Try adjusting your criteria.</motion.p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Profile Detail Modal */}
      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setSelectedProfile(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-2xl rounded-2xl border border-border/50 bg-card backdrop-blur-xl shadow-2xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between p-6 border-b border-border/50 sticky top-0 bg-card/95 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
                    {selectedProfile.initials}
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl font-bold">{selectedProfile.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedProfile.dept} • Semester {selectedProfile.semester}</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setSelectedProfile(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="space-y-6 p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                {/* Quick Stats */}
                <motion.div className="grid grid-cols-3 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">Activity Points</p>
                    <p className="font-semibold text-foreground text-lg">{selectedProfile.points}</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">Collaboration Score</p>
                    <p className="font-semibold text-foreground text-lg">{selectedProfile.collab}/100</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">Past Projects</p>
                    <p className="font-semibold text-foreground text-lg">{selectedProfile.previousProjects}</p>
                  </div>
                </motion.div>

                {/* Status */}
                <motion.div className="rounded-lg bg-muted/50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                  <div className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full ${selectedProfile.available ? "bg-success" : "bg-muted-foreground"}`} />
                    <div>
                      <p className="text-sm font-semibold">{selectedProfile.available ? "Available for collaboration" : "Busy, not available"}</p>
                      <p className="text-xs text-muted-foreground">{selectedProfile.available ? "Open to joining new projects" : "Currently working on existing projects"}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Skills */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.skills.map((skill: string) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div className="border-t border-border/50 pt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <motion.div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <Mail className="h-4 w-4 text-primary" />
                      <a href={`mailto:${selectedProfile.email}`} className="text-sm hover:text-primary transition-colors">
                        {selectedProfile.email}
                      </a>
                    </motion.div>
                    <motion.div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <Phone className="h-4 w-4 text-primary" />
                      <a href={`tel:${selectedProfile.phone}`} className="text-sm hover:text-primary transition-colors">
                        {selectedProfile.phone}
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              <div className="flex gap-3 p-6 border-t border-border/50">
                <motion.button
                  onClick={() => {
                    toast.success(`Invitation sent to ${selectedProfile.name}! 📩`);
                    setSelectedProfile(null);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                  <Users className="h-4 w-4 inline mr-2" /> Send Invitation
                </motion.button>
                <motion.button
                  onClick={() => setSelectedProfile(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 rounded-lg border border-border/50 px-4 py-2.5 text-sm font-semibold hover:bg-muted transition-colors">
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

function CandidateCard({ candidate, selected, index, onProfileClick }: any) {
  const orderedSkills = [
    ...candidate.skills.filter((s: string) => selected.includes(s)),
    ...candidate.skills.filter((s: string) => !selected.includes(s)),
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-primary";
    if (score >= 50) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
      onClick={() => onProfileClick(candidate)}
      className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md cursor-pointer">
      <div className="flex items-start gap-4">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full gradient-primary font-bold text-primary-foreground">
          {candidate.initials}
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold hover:text-primary transition-colors">{candidate.name}</h3>
            {candidate.overlap === 100 && candidate.available && (
              <Badge className="bg-success text-white text-[10px]">Perfect Match!</Badge>
            )}
            <span className={`flex items-center gap-1 text-xs ${candidate.available ? "text-success" : "text-muted-foreground"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${candidate.available ? "bg-success" : "bg-muted-foreground"}`} />
              {candidate.available ? "Available" : "Busy"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{candidate.dept} · Semester {candidate.semester} · {candidate.points} pts</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {orderedSkills.map((s: string) => (
              <motion.div key={s} whileHover={{ scale: 1.05 }}>
                <Badge 
                  variant={selected.includes(s) ? "default" : "secondary"} 
                  className={`text-[10px] ${selected.includes(s) ? "ring-2 ring-primary/50" : ""}`}>
                  {s}
                </Badge>
              </motion.div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {candidate.email}</span>
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {candidate.phone}</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-4 text-xs">
            <div>
              Skill Match: <strong className={candidate.overlap >= 75 ? "text-success" : "text-primary"}>{candidate.overlap}%</strong>
            </div>
            <div>
              Collab Score: <strong className="text-primary">{candidate.collab}/100</strong>
            </div>
            <div>
              Overall: <strong className={`font-bold ${getScoreColor(Math.round(candidate.score.total))}`}>{Math.round(candidate.score.total)}%</strong>
            </div>
          </div>
        </div>
        <motion.button 
          onClick={(e) => {
            e.stopPropagation();
            toast.success(`Invitation sent to ${candidate.name}! 📩`);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex shrink-0 items-center gap-1 rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          <Users className="h-4 w-4" /> Invite
        </motion.button>
      </div>
    </motion.div>
  );
}

export default SmartMatching;
