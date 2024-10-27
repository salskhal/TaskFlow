import api from "./api"

export const fetchUserWorkspaces = async () => {
    try {
        const response = await api.get("/users/workspaces");
        return response.data.workspaces;  // Return the workspaces
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch workspaces");
    }
}

export const fetchUserWorkspaceById = async (workspaceId: string) => {
    try{
        const response = await api.get(`/workspaces/${workspaceId}`)
        return response.data
    } catch(error){
        throw new Error(error)
    }
}