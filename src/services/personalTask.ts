import api from "./api"
import { PersonalTask, CreatePersonalTaskInput, CreateSubTaskInput } from "@/types/PTask";

export const createPersonalTask = async (taskData: CreatePersonalTaskInput): Promise<PersonalTask> => {
    try {
        const response = await api.post('/personalTask', taskData);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to create task');
    }
}


export const getPersonalTasks = async () => {
    try {
        const response = await api.get(`/personalTask`)
        return response.data.tasks
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch tasks');
    }
}

export const createSubtask = async (personalTaskId: string, subtaskData: CreateSubTaskInput) => {
    try {
        const response = await api.post(`/personalTask/${personalTaskId}`, subtaskData)
        return response.data.task
    } catch (error) {
        throw new Error(error instanceof  Error ? error.message : 'Failed to create subtask');
    }
}

export const updateSubtask = async (personalTaskId: string, subtaskId: string, updates) => {
    try {
        const response = await api.put(`/personalTask/${personalTaskId}/subtask/${subtaskId}`, updates)
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}


export const deleteSubtask = async (personalTaskId: string, subtaskId: string): Promise<PersonalTask> => {
    try {
        const response = await api.delete(`/personalTask/${personalTaskId}/subtask/${subtaskId}`);
        return response.data.task;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to delete subtask');
    }
};