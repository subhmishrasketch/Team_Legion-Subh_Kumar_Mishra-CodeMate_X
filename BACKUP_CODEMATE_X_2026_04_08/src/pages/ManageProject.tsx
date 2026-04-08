import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function ManageProject() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-primary hover:underline mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <h1 className="font-heading text-2xl font-bold">Manage Project</h1>
        <p className="mt-2 text-muted-foreground">Slug: <code>{slug}</code></p>
        <p className="mt-4">This is a placeholder page for managing a project. Replace with actual form or controls as needed.</p>
      </motion.div>
    </DashboardLayout>
  );
}
