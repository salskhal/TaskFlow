import { create } from "zustand"
import { createPersonalTask, getPersonalTasks, updateSubtask, createSubtask, deleteSubtask, delelePersonalTask } from "@/services/personalTask"

import { PersonalTask, CreatePersonalTaskInput } from "@/types/PTask"

interface PersonalTaskState {
    tasks: PersonalTask[],
    currentTask: PersonalTask | null,
    isLoading: boolean,
    error: string | null;
    fetchTasks: () => Promise<void>;
    addTask: (taskData: CreatePersonalTaskInput) => Promise<void>;
    deletePTask: (taskId: string) => Promise<void>;
    addSubTask: (taskId: string, title: string) => Promise<void>;
    toggleSubtask: (taskId: string, subtaskId: string) => Promise<void>;
    deleteSubtask: (taskId: string, subtaskId: string) => Promise<void>;
    setCurrentTask: (task: PersonalTask | null) => void;
}

export const usePersonalTaskStore = create<PersonalTaskState>(
    (set, get) => ({
        tasks: [],
        currentTask: null,
        isLoading: false,
        error: null,

        setCurrentTask: (task) => set({ currentTask: task }),

        fetchTasks: async () => {
            set({ isLoading: true, error: null });
            try {
                const tasks = await getPersonalTasks();
                set({ tasks, isLoading: false });
            } catch (error) {
                set({ error: error.message, isLoading: false });
            }
        },

        addTask: async (taskData) => {
            set({ isLoading: true, error: null });
            try {
                await createPersonalTask(taskData);

                await get().fetchTasks();
                set({ isLoading: false });
            } catch (error) {
                set({ error: error.message, isLoading: false });
            }
        },

        deletePTask: async (taskId: string) => {
            set({ isLoading: true, error: null });
            try {
                await delelePersonalTask(taskId);
                const { tasks, currentTask } = get();

                // Remove the task from the tasks array
                const updatedTasks = tasks.filter(task => task._id !== taskId);

                // If the deleted task was the current task, reset currentTask to null
                if (currentTask && currentTask._id === taskId) {
                    set({
                        tasks: updatedTasks,
                        currentTask: null,
                        isLoading: false
                    });
                } else {
                    set({
                        tasks: updatedTasks,
                        isLoading: false
                    });
                }
            } catch (error) {
                set({
                    error: error instanceof Error ? error.message : 'Failed to delete task',
                    isLoading: false
                });
            }
        },


        addSubTask: async (taskId: string, title: string) => {
            // set({ isLoading: true, error: null });
            try {
                const updatedTask = await createSubtask(taskId, { title });
                const { tasks } = get();

                set({
                    tasks: tasks.map(task =>
                        task._id === taskId ? updatedTask : task
                    )
                });
            } catch (error) {
                set({
                    error: error instanceof Error ? error.message : 'Failed to create subtask'
                });
            } finally {
                set({ isLoading: false });
            }
        },

        deleteSubtask: async (taskId: string, subtaskId: string) => {
            try {
                const updatedTask = await deleteSubtask(taskId, subtaskId);
                const { tasks } = get();

                // Update the tasks array, replacing the modified task
                set({
                    tasks: tasks.map(task =>
                        task._id === taskId ? updatedTask : task
                    ),
                    isLoading: false
                });

                // If this is the current task, update it as well
                const { currentTask } = get();
                if (currentTask && currentTask._id === taskId) {
                    set({ currentTask: updatedTask });
                }
            } catch (error) {
                set({
                    error: error instanceof Error ? error.message : 'Failed to delete subtask',
                    isLoading: false
                });
            }

        },

        toggleSubtask: async (taskId: string, subtaskId: string) => {
            const { tasks } = get();
            const task = tasks.find(t => t._id === taskId);
            if (!task) return;

            const subtask = task.subTasks.find(st => st._id === subtaskId);
            if (!subtask) return;

            try {
                await updateSubtask(taskId, subtaskId, {
                    isChecked: !subtask.isChecked
                });

                set({
                    tasks: tasks.map(t =>
                        t._id === taskId
                            ? {
                                ...t,
                                subTasks: t.subTasks.map(st =>
                                    st._id === subtaskId
                                        ? { ...st, isChecked: !st.isChecked }
                                        : st
                                )
                            }
                            : t
                    )
                });
            } catch (error) {
                set({
                    error: error instanceof Error ? error.message : 'Failed to toggle subtask'
                });
            }
        },

    })
)