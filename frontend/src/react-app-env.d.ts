interface AuthToken {
    refresh: string;
    access: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    duration: number;
    avatar: string;
}

interface Task {
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    project: number;
}

interface Subtask {
    id: number;
    title: string;
    description: string;
    status: string;
    task: number;
}