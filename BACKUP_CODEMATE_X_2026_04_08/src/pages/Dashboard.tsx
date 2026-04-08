import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import StudentDashboard from "./StudentDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <DashboardLayout>
      {user?.role === "admin" ? <AdminDashboard /> : <StudentDashboard />}
    </DashboardLayout>
  );
};

export default Dashboard;
