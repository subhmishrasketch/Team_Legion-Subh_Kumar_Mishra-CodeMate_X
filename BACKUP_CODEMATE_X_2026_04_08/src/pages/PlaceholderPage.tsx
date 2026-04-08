import { DashboardLayout } from "@/components/DashboardLayout";
import { Construction } from "lucide-react";
import { useLocation } from "react-router-dom";

const PlaceholderPage = () => {
  const { pathname } = useLocation();
  const name = pathname.slice(1).split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Construction className="mb-4 h-12 w-12 text-muted-foreground" />
        <h1 className="font-heading text-2xl font-bold">{name}</h1>
        <p className="mt-2 text-muted-foreground">This page is coming soon.</p>
      </div>
    </DashboardLayout>
  );
};

export default PlaceholderPage;
