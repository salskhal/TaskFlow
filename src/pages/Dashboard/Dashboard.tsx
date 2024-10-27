import { Outlet, useNavigate } from "react-router-dom";
import DashHeader from "@/components/dashboard/DashHeader";
// import { useWorkspaceStore } from "@/store/workspaceStore";

export default function Dashboard() {
  // const { currentWorkspace } = useWorkspaceStore();
  const navigate = useNavigate();

  const handleWorkspaceChange = (workspaceId: string) => {
    if (workspaceId === "personal") {
      navigate("/dashboard"); // Navigate to personal dashboard
    } else {
      navigate(`/dashboard/${workspaceId}`); // Navigate to workspace dashboard
    }
  };

  return (
    <main>
      <DashHeader onWorkspaceChange={handleWorkspaceChange} />

      {/* Main content */}
      <div className="dashboard-content">
        {/* The Outlet will render the appropriate dashboard based on the route */}
        <Outlet />
      </div>
    </main>
  );
}
