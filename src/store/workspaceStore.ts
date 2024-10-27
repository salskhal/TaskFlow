import { create } from "zustand"
// import { fetchUserWorkspaces } from "@/services/workspaces"

interface WorkspaceState {
    currentWorkspace: string; // Holds the current workspace ID, or 'personal' for personal dashboard
    setWorkspace: (workspaceId: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
    currentWorkspace: "personal",
    setWorkspace: (workspaceId: string) =>
        set(() => ({ currentWorkspace: workspaceId }))
}))

 