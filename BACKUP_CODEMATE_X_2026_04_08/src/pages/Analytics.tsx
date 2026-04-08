import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, FolderOpen, Calendar, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const deptStats = [
  { dept: "CSE", students: 420, projects: 58, active: 82 },
  { dept: "IT", students: 310, projects: 42, active: 76 },
  { dept: "ECE", students: 280, projects: 35, active: 71 },
  { dept: "ME", students: 238, projects: 21, active: 55 },
];

const monthlyData = [
  { month: "Jan", projects: 12, events: 2 },
  { month: "Feb", projects: 18, events: 3 },
  { month: "Mar", projects: 24, events: 5 },
];

const Analytics = () => (
  <DashboardLayout>
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="h-7 w-7 text-primary" /> Campus Analytics
        </h1>
        <p className="mt-1 text-muted-foreground">Comprehensive overview of campus project activity.</p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Students", value: "1,248", icon: Users, color: "text-primary" },
          { label: "Active Projects", value: "156", icon: FolderOpen, color: "text-success" },
          { label: "Events This Month", value: "8", icon: Calendar, color: "text-warning" },
          { label: "Avg Engagement", value: "78%", icon: TrendingUp, color: "text-primary" },
        ].map((s) => (
          <div key={s.label} className="flex items-center justify-between rounded-xl border border-border bg-card p-5">
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-heading text-3xl font-bold">{s.value}</p>
            </div>
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Department Breakdown */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-heading text-lg font-bold flex items-center gap-2"><Award className="h-5 w-5 text-warning" /> Department Performance</h2>
        <div className="space-y-4">
          {deptStats.map((d) => (
            <div key={d.dept} className="flex items-center gap-4">
              <span className="w-12 font-heading font-bold text-sm">{d.dept}</span>
              <div className="flex-1">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{d.students} students · {d.projects} projects</span>
                  <span className="font-semibold text-primary">{d.active}% active</span>
                </div>
                <Progress value={d.active} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-heading text-lg font-bold">Monthly Trends (2026)</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {monthlyData.map((m) => (
            <div key={m.month} className="rounded-lg border border-border p-4 text-center">
              <p className="font-heading text-lg font-bold">{m.month}</p>
              <p className="text-2xl font-bold text-primary mt-1">{m.projects}</p>
              <p className="text-xs text-muted-foreground">projects · {m.events} events</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </DashboardLayout>
);

export default Analytics;
