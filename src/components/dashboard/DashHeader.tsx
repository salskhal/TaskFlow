// import { useAuthStore } from "@/store/authStore";
import ComboBox from "./ComboBox";
import Notification from "./Notification";
import User from "./User";

interface DashHeaderProps {
  onWorkspaceChange: (workspaceId: string) => void;
}

export default function DashHeader({ onWorkspaceChange }: DashHeaderProps) {
  return (
    <div className="p-4 flex items-center justify-between border-b">
      <ComboBox onWorkspaceChange={onWorkspaceChange} />
      <div className="flex items-center gap-4">
        
        <Notification count={5} />
        <User />
      </div>
    </div>
  );
}
