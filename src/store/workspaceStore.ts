import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createWorkspace } from "@/services/workspaces";
import { CreateWorkspaceInput } from "@/types/Workspace";



interface WorkspaceResponse {
    _id: string;
    name: string;
    // Add other response fields as needed
}

interface WorkspaceState {
    currentWorkspace: string;
    isLoading: boolean,
    error: string | null,
    setWorkspace: (workspaceId: string) => void;
    addWorkspace: (workspaceData: CreateWorkspaceInput) => Promise<WorkspaceResponse>
}

export const useWorkspaceStore = create<WorkspaceState>()(
    persist(
        (set) => ({
            isLoading: false,
            error: null,
            currentWorkspace: "personal",
            setWorkspace: (workspaceId: string) =>
                set(() => ({ currentWorkspace: workspaceId })),
            addWorkspace: async (workspaceData: CreateWorkspaceInput) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await createWorkspace(workspaceData);
                    set({ isLoading: false });
                    return response;
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                    set({ error: errorMessage, isLoading: false });
                    throw error;
                }
            },
        }),
        {
            name: "workspace-storage", // name of the item in localStorage
        }
    )
);