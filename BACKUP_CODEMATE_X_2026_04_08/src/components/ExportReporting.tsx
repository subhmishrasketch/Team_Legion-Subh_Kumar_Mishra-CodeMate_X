import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Sheet, BarChart3, CheckCircle2, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface ExportReport {
  id: string;
  title: string;
  type: "pdf" | "csv" | "excel";
  generatedDate: string;
  size: string;
  pages?: number;
}

interface ProjectStats {
  name: string;
  status: string;
  completion: number;
  members: number;
  startDate: string;
  deadline: string;
}

const ExportReporting = () => {
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "csv" | "excel" | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [exports, setExports] = useState<ExportReport[]>([
    {
      id: "1",
      title: "Annual Project Report 2024",
      type: "pdf",
      generatedDate: "Dec 15, 2024",
      size: "2.4 MB",
      pages: 24,
    },
    {
      id: "2",
      title: "Activity Summary Q4",
      type: "csv",
      generatedDate: "Dec 10, 2024",
      size: "145 KB",
    },
    {
      id: "3",
      title: "Team Performance Analysis",
      type: "excel",
      generatedDate: "Dec 8, 2024",
      size: "512 KB",
    },
  ]);

  const [projects] = useState<ProjectStats[]>([
    {
      name: "AI Campus Navigator",
      status: "In Progress",
      completion: 85,
      members: 5,
      startDate: "Jan 10, 2024",
      deadline: "Mar 15, 2024",
    },
    {
      name: "Smart Attendance System",
      status: "In Progress",
      completion: 92,
      members: 4,
      startDate: "Feb 1, 2024",
      deadline: "Apr 1, 2024",
    },
    {
      name: "RevivalHub Platform",
      status: "Planning",
      completion: 65,
      members: 3,
      startDate: "Mar 1, 2024",
      deadline: "May 30, 2024",
    },
  ]);

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
  const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

  const generateReport = (format: string) => {
    setIsGenerating(true);
    setSelectedFormat(format as "pdf" | "csv" | "excel");

    setTimeout(() => {
      const newReport: ExportReport = {
        id: `${Date.now()}`,
        title: `Project Report - ${new Date().toLocaleDateString()}`,
        type: format as "pdf" | "csv" | "excel",
        generatedDate: new Date().toLocaleDateString(),
        size: format === "pdf" ? "1.8 MB" : format === "csv" ? "234 KB" : "456 KB",
        pages: format === "pdf" ? 18 : undefined,
      };

      setExports((prev) => [newReport, ...prev]);
      setIsGenerating(false);
      setSelectedFormat(null);
      toast.success(`${format.toUpperCase()} report generated successfully! 📊`, {
        description: `File size: ${newReport.size}`,
      });
    }, 2000);
  };

  const downloadReport = (report: ExportReport) => {
    toast.success(`Downloading ${report.type.toUpperCase()} file...`, {
      description: report.title,
    });
  };

  const deleteReport = (id: string) => {
    setExports((prev) => prev.filter((r) => r.id !== id));
    toast.success("Report deleted");
  };

  const getFormatIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "csv":
        return <Sheet className="h-4 w-4 text-cyan-500" />;
      case "excel":
        return <Sheet className="h-4 w-4 text-cyan-500" />;
      default:
        return <Download className="h-4 w-4" />;
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" /> Export & Reporting
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Generate and download project reports in your preferred format
          </p>
        </div>
      </motion.div>

      {/* Export Format Selection */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-4">Generate New Report</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {/* PDF Export */}
          <motion.button
            onClick={() => generateReport("pdf")}
            disabled={isGenerating}
            whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className={`relative overflow-hidden rounded-xl border-2 p-6 text-center transition-all ${
              isGenerating && selectedFormat === "pdf"
                ? "border-primary bg-primary/10"
                : "border-red-300/50 bg-red-500/5 hover:border-red-400 hover:bg-red-500/10"
            }`}
          >
            {isGenerating && selectedFormat === "pdf" && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <div className="relative">
              <FileText className="h-10 w-10 text-red-500 mx-auto mb-2" />
              <p className="font-semibold text-sm">PDF Report</p>
              <p className="text-xs text-muted-foreground mt-1">
                Formatted document with charts
              </p>
            </div>
          </motion.button>

          {/* CSV Export */}
          <motion.button
            onClick={() => generateReport("csv")}
            disabled={isGenerating}
            whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className={`relative overflow-hidden rounded-xl border-2 p-6 text-center transition-all ${
              isGenerating && selectedFormat === "csv"
                ? "border-primary bg-primary/10"
                : "border-cyan-300/50 bg-cyan-500/5 hover:border-cyan-400 hover:bg-cyan-500/10"
            }`}
          >
            {isGenerating && selectedFormat === "csv" && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <div className="relative">
              <Sheet className="h-10 w-10 text-cyan-500 mx-auto mb-2" />
              <p className="font-semibold text-sm">CSV Export</p>
              <p className="text-xs text-muted-foreground mt-1">
                Spreadsheet format
              </p>
            </div>
          </motion.button>

          {/* Excel Export */}
          <motion.button
            onClick={() => generateReport("excel")}
            disabled={isGenerating}
            whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className={`relative overflow-hidden rounded-xl border-2 p-6 text-center transition-all ${
              isGenerating && selectedFormat === "excel"
                ? "border-primary bg-primary/10"
                : "border-emerald-300/50 bg-emerald-500/5 hover:border-emerald-400 hover:bg-emerald-500/10"
            }`}
          >
            {isGenerating && selectedFormat === "excel" && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <div className="relative">
              <Sheet className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
              <p className="font-semibold text-sm">Excel Export</p>
              <p className="text-xs text-muted-foreground mt-1">
                Advanced spreadsheet
              </p>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Project Summary for Export */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" /> Projects Summary
        </h3>
        <div className="space-y-3">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-lg border border-border/50 bg-muted/30 p-4"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{proj.name}</p>
                  <p className="text-xs text-muted-foreground">{proj.startDate} → {proj.deadline}</p>
                </div>
                <Badge
                  variant={
                    proj.status === "Completed"
                      ? "secondary"
                      : proj.status === "In Progress"
                      ? "default"
                      : "outline"
                  }
                >
                  {proj.status}
                </Badge>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-semibold text-primary">{proj.completion}%</span>
                  </div>
                  <Progress value={proj.completion} className="h-1.5" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{proj.members} members</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Generated Reports */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" /> Downloaded Reports ({exports.length})
        </h3>

        {exports.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-muted-foreground">No reports generated yet</p>
          </div>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
            {exports.map((report, idx) => (
              <motion.div
                key={report.id}
                variants={item}
                whileHover={{ x: 4, backgroundColor: "rgba(0,0,0,0.02)" }}
                className="flex items-center justify-between rounded-lg border border-border/50 p-3 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    {getFormatIcon(report.type)}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{report.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {report.generatedDate}
                      {report.pages && ` · ${report.pages} pages`}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {report.size}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <motion.button
                    onClick={() => downloadReport(report)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-primary hover:bg-primary/10 transition-colors"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => deleteReport(report.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-destructive/60 hover:bg-destructive/10 hover:text-destructive transition-colors"
                    title="Delete"
                  >
                    ✕
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Export Statistics */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-3">
        <motion.div whileHover={{ y: -2 }} className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1 flex items-center gap-2">
            <BarChart3 className="h-3 w-3" /> Total Exports
          </p>
          <p className="text-2xl font-bold text-primary">{exports.length}</p>
          <p className="text-xs text-muted-foreground mt-1">reports generated</p>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1 flex items-center gap-2">
            <FileText className="h-3 w-3 text-red-500" /> PDF Files
          </p>
          <p className="text-2xl font-bold text-red-500">
            {exports.filter((e) => e.type === "pdf").length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">formatted documents</p>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1 flex items-center gap-2">
            <Sheet className="h-3 w-3 text-green-500" /> Data Exports
          </p>
          <p className="text-2xl font-bold text-green-500">
            {exports.filter((e) => e.type !== "pdf").length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">spreadsheet files</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ExportReporting;
