import { Link, useParams, useLocation } from "react-router-dom";
import { Folder, Plus, BarChart3, Settings, Users, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NavItem = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 w-full p-2 rounded-lg",
        "text-sm font-medium transition-colors",
        isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
      )}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  );
};

export default function Sidebar() {
  // const { workspaceId } = useParams();

  // // Example projects data - replace with your actual data
  // const projects = [
  //   { id: 1, name: "Project 1", workspaceId },
  //   { id: 2, name: "Project 2", workspaceId },
  //   // Add more projects as needed
  // ];

  // return (
  //   <div className="h-[calc(100vh-64px)] w-64 border-r bg-background">
  //     <div className="p-4 space-y-4">
  //       {/* Projects Section */}
  //       <div>
  //         <div className="flex items-center justify-between mb-2">
  //           <h2 className="text-sm font-semibold">Projects</h2>
  //           <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
  //             <Plus className="h-4 w-4" />
  //           </Button>
  //         </div>
  //         <div className="space-y-1">
  //           {projects.map((project) => (
  //             <NavItem
  //               key={project.id}
  //               to={`/dashboard/${workspaceId}/projects/${project.id}`}
  //               icon={Folder}
  //             >
  //               {project.name}
  //             </NavItem>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  const { workspaceId } = useParams();

  // Example projects data - replace with your actual data
  const projects = [
    { id: 1, name: "Project 1", workspaceId },
    { id: 2, name: "Project 2", workspaceId },
  ];

  return (
    <div className="h-[calc(100vh-64px)] w-64 border-r bg-background">
      <div className="p-4 space-y-6">
        {/* Workspace Overview Section */}
        <div className="space-y-1">
          <NavItem to={`/dashboard/${workspaceId}`} icon={Home}>
            Overview
          </NavItem>
          <NavItem to={`/dashboard/${workspaceId}/analytics`} icon={BarChart3}>
            Analytics
          </NavItem>
        </div>

        {/* Projects Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold">Projects</h2>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {projects.map((project) => (
              <NavItem
                key={project.id}
                to={`/dashboard/${workspaceId}/projects/${project.id}`}
                icon={Folder}
              >
                {project.name}
              </NavItem>
            ))}
          </div>
        </div>

        {/* Workspace Management Section */}
        <div className="space-y-1">
          <div className="text-sm font-semibold mb-2">Workspace</div>
          <NavItem to={`/dashboard/${workspaceId}/members`} icon={Users}>
            Members
          </NavItem>
          <NavItem to={`/dashboard/${workspaceId}/settings`} icon={Settings}>
            Settings
          </NavItem>
        </div>
      </div>
    </div>
  );
}
