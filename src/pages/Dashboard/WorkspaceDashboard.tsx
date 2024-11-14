import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { fetchUserWorkspaceById } from "@/services/workspaces";
import { Button } from "@/components/ui/button";
// import WorkspaceMemberDisplay from "@/components/dashboard/Workspace/WorkspaceMemberDisplay";
import Sidebar from "@/components/dashboard/Workspace/Sidebar";
import MobileNav from "@/components/dashboard/Workspace/MobileNav";

export default function WorkspaceDashboard() {
  const { workspaceId } = useParams(); // Get the workspace ID from the URL
  const [workspaceData, setWorkspaceData] = useState(null); // To store fetched workspace data
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  // Fetch workspace data or display based on the workspaceId

  useEffect(() => {
    const fetchWorkspace = async () => {
      setLoading(true);
      try {
        const data = await fetchUserWorkspaceById(workspaceId);
        setWorkspaceData(data.workspace); // Store the fetched workspace data
        setLoading(false);
        console.log(data.workspace.name);
      } catch (err) {
        setError(err.message); // Handle any errors
        setLoading(false);
      }
    };

    fetchWorkspace(); // Call the fetch function
  }, [workspaceId]);

  // const handleClick = () => {
  //   console.log(workspaceData);
  // };

  // Render loading, error, or workspace data
  if (loading) return <p>Loading workspace...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    // <main className="p-10">
    //   <div className="flex items-center justify-between">
    //     <h1 className="font-bold text-4xl">{workspaceData.name} Dashboard</h1>
    //     <Button onClick={handleClick}>Create Project</Button>
    //   </div>
    //   <p>Currently viewing workspace: {workspaceId}</p>
    //   {/* Display workspace-specific content */}
    //   {workspaceData.name}

    //   <Sidebar />

    //   {/* {workspaceData.members.map((member) => (
    //     <div>
    //       <img src={member.profile} alt="me" />
    //     </div>
    //   ))} */}

    //   {/* <Outlet /> */}

    //   <WorkspaceMemberDisplay workspaceData={workspaceData} />
    // </main>
    <div className="flex h-full">
      {/* Mobile Navigation - Only shown in workspace view */}
      <div className="lg:hidden fixed top-16 left-0 p-4 z-50">
        <MobileNav />
      </div>

      {/* Desktop Sidebar - Only shown in workspace view */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
