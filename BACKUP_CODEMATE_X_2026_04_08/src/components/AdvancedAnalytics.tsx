import { motion } from "framer-motion";
import { BarChart3, Users, Zap, Target, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AdvancedAnalytics() {
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  const analyticsData = [
    { label: "Success Rate", value: 78, icon: Award, color: "from-cyan-500/20 to-blue-500/20", trend: "+5%" },
    { label: "Collaboration Score", value: 85, icon: Users, color: "from-blue-500/20 to-cyan-500/20", trend: "+8%" },
    { label: "Project Completion", value: 92, icon: Target, color: "from-purple-500/20 to-pink-500/20", trend: "+3%" },
    { label: "Team Productivity", value: 88, icon: Zap, color: "from-yellow-500/20 to-orange-500/20", trend: "+12%" },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Key Metrics */}
      <motion.div variants={item} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsData.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            className={`rounded-xl border border-border bg-gradient-to-br ${metric.color} p-6 backdrop-blur-sm`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-white/10">
                <metric.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-cyan-600 bg-cyan-500/20 px-2 py-1 rounded">
                {metric.trend}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
            <p className="text-3xl font-bold">{metric.value}%</p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
              className="origin-left mt-3"
            >
              <Progress value={metric.value} className="h-1.5" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Project Metrics */}
      <motion.div
        variants={item}
        className="rounded-xl border border-border bg-card p-6 space-y-4"
      >
        <h3 className="font-heading text-lg font-bold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" /> Project Summary
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg bg-muted/30 p-4 text-center"
          >
            <p className="text-sm text-muted-foreground mb-1">Total Projects</p>
            <p className="text-2xl font-bold text-primary">156</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg bg-muted/30 p-4 text-center"
          >
            <p className="text-sm text-muted-foreground mb-1">Completion Rate</p>
            <p className="text-2xl font-bold text-success">82%</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg bg-muted/30 p-4 text-center"
          >
            <p className="text-sm text-muted-foreground mb-1">Avg Team Size</p>
            <p className="text-2xl font-bold text-primary">4.2</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
