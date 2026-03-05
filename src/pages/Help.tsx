import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import {
  HelpCircle, BookOpen, Shield, MessageSquare, ChevronDown, ChevronUp,
  FolderPlus, Users, Sparkles, Trophy, RefreshCw, Bell,
} from "lucide-react";

const guides = [
  { icon: FolderPlus, title: "Post a Project", desc: "Go to 'Post Project' from the sidebar. Fill in your idea, select required skills, team size, and deadline. Your project will be visible to all students and can be edited or deleted later via My Projects." },
  { icon: Users, title: "Join a Team", desc: "Browse recommended projects on the Dashboard. Click 'Ask to Join' on any project that interests you. The team lead will review your request." },
  { icon: Sparkles, title: "Smart Matching", desc: "Select your skills in Smart Matching to find teammates with complementary abilities. The AI calculates skill overlap and collaboration scores." },
  { icon: RefreshCw, title: "Revival Hub", desc: "Discover abandoned projects that need new teams. Click 'Adopt Idea' to take over and give the project a second chance." },
  { icon: Trophy, title: "Earn Points", desc: "Complete projects, participate in events, and collaborate with teammates to earn activity points and climb the leaderboard." },
  { icon: Bell, title: "Stay Updated", desc: "Notifications keep you informed about team invites, event updates, and deadlines. Admins receive event team notifications." },
];

const faqs = [
  { q: "How do I change my skills?", a: "Go to your Profile (click your avatar → View Profile) and update your skills in the Skills section." },
  { q: "Can I leave a project?", a: "Yes. Go to My Projects, click 'Manage' on the project, and select 'Leave Project'." },
  { q: "How are leaderboard points calculated?", a: "Points are based on project completions, event participation, peer reviews, and collaboration ratings." },
  { q: "Who can see my contact details?", a: "Only team members and project creators you've interacted with can view your phone and social links." },
];

const Help = () => {
  const { user } = useAuth();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [complaintType, setComplaintType] = useState("");
  const [complaintDesc, setComplaintDesc] = useState("");

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintType || !complaintDesc) { toast.error("Please fill all fields"); return; }
    
    // Store complaint in localStorage
    try {
      const complaintId = `complaint_${Date.now()}`;
      const complaint = {
        id: complaintId,
        studentName: user?.name || "Anonymous Student",
        studentEmail: user?.email || "unknown@college.edu",
        studentPhone: user?.phone || "N/A",
        type: complaintType,
        description: complaintDesc,
        date: new Date().toLocaleString(),
        status: "pending",
        resolved: false
      };
      
      const complaintsKey = "complaints";
      const existingComplaints = localStorage.getItem(complaintsKey);
      const allComplaints = existingComplaints ? JSON.parse(existingComplaints) : [];
      allComplaints.push(complaint);
      localStorage.setItem(complaintsKey, JSON.stringify(allComplaints));
      
      // Add admin notification
      const notificationsKey = "adminNotifications";
      const existingNotifs = localStorage.getItem(notificationsKey);
      const allNotifs = existingNotifs ? JSON.parse(existingNotifs) : [];
      allNotifs.push({
        id: complaintId,
        title: `📋 New Complaint: ${complaintType}`,
        message: `From ${user?.name || "Student"}: ${complaintDesc.slice(0, 50)}...`,
        type: "complaint",
        timestamp: new Date().toLocaleString(),
        read: false
      });
      localStorage.setItem(notificationsKey, JSON.stringify(allNotifs));
      
      toast.success("Your report has been submitted. We'll look into it! 🛡️");
      setComplaintType(""); 
      setComplaintDesc("");
    } catch (err) {
      console.error("Error submitting complaint:", err);
      toast.error("Failed to submit complaint");
    }
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="font-heading text-3xl font-bold flex items-center gap-2">
            <HelpCircle className="h-7 w-7 text-primary" /> Help & Support
          </h1>
          <p className="mt-1 text-muted-foreground">Learn how to use CodeMate and report issues. Need more help? Email <a href="mailto:support@codemate.app" className="text-primary hover:underline">support@codemate.app</a> or join our community chat.</p>
        </div>

        {/* How to Use */}
        <div>
          <h2 className="mb-4 font-heading text-xl font-bold flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> How to Use CodeMate</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {guides.map((g) => (
              <div key={g.title} className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <g.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading text-sm font-semibold">{g.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="mb-4 font-heading text-xl font-bold flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> FAQs</h2>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-muted/30 transition-colors">
                  {f.q}
                  {expandedFaq === i ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>
                {expandedFaq === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                    {f.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Complaint / Report */}
        <div>
          <h2 className="mb-4 font-heading text-xl font-bold flex items-center gap-2"><Shield className="h-5 w-5 text-destructive" /> Report an Issue</h2>
          <form onSubmit={handleSubmitComplaint} className="rounded-xl border border-border bg-card p-5 space-y-4">
            <p className="text-sm text-muted-foreground">If someone is trolling, harassing, or violating community guidelines, please report it here.</p>
            <div>
              <label className="mb-1 block text-sm font-medium">Issue Type</label>
              <select value={complaintType} onChange={(e) => setComplaintType(e.target.value)}
                className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                <option value="">Select type</option>
                <option>Harassment / Trolling</option>
                <option>Spam / Fake Project</option>
                <option>Inappropriate Content</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Description</label>
              <textarea value={complaintDesc} onChange={(e) => setComplaintDesc(e.target.value)} rows={4}
                placeholder="Describe the issue in detail..."
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none resize-y focus:border-primary focus:ring-1 focus:ring-primary" />
            </div>
            <button type="submit"
              className="rounded-lg gradient-cta px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              Submit Report
            </button>
          </form>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Help;
