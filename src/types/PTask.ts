export interface SubTask {
    _id: string;
    title: string;
    isChecked: boolean;
}

export interface PersonalTask {
    _id: string;
    title: string;
    description: string;
    date?: Date;
    priority?: 'low' | 'medium' | 'high';
    status?: 'todo' | 'in progress' | 'completed';
    user?: string;
    subTasks?: SubTask[];
    createdAt?: Date;
    updatedAt?: Date;
}

// Create a type for the form input that matches what we're collecting from the user
export type CreatePersonalTaskInput = Pick<
    PersonalTask,
    'title' | 'description' | 'date' | 'priority' | 'status'
>;


export interface CreateSubTaskInput {
    title: string;
}