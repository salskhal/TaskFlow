// import { useAuthStore } from "@/store/authStore";
import ComboBox from "./ComboBox";
import Notification from "./Notification";
import User from "./User";

interface DashHeaderProps {
  onWorkspaceChange: (workspaceId: string) => void;
}

import { useWorkspaceStore } from "@/store/workspaceStore";

export default function DashHeader({ onWorkspaceChange }: DashHeaderProps) {
  const { currentWorkspace } = useWorkspaceStore();
  return (
    <div className="p-4 flex items-center justify-between border-b">
      <ComboBox onWorkspaceChange={onWorkspaceChange} />

      {currentWorkspace}
      <div className="flex items-center gap-4">
        <Notification count={5} />
        <User />
      </div>
    </div>
  );
}
