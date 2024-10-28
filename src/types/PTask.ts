export interface User {
    firstName: string;
    lastName: string;
    profile: string;
    email: string;
    workspaces: Array<{
        workspaceId: string;
        name: string;
    }>;
}


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
export interface CreatePersonalTaskInput {
    title: string;
    description: string;
    status: 'todo' | 'in progress' | 'completed';
    priority: 'high' | 'medium' | 'low';
    date: Date;
}

export interface CreateSubTaskInput {
    title: string;
}