import axios from 'axios';
import { API_BASE_URL } from '../constants';
import useAuthStore from '../stores/AuthStore';

export default class ProjectLogic {

    private static updateToken = () => {
        const token = useAuthStore.getState().token;
        axios.defaults.headers = {
            'Authorization': `Bearer ${token?.access}`
        };
    }

    public static getAllProjects = async (): Promise<Project[]> => {
        try {
            ProjectLogic.updateToken();
            const resp = await axios.get(`${API_BASE_URL}projects/`);
            return resp && resp.data;
        }
        catch (err) {
            throw err;
        }
    }

    public static getProject = async (projectId: string): Promise<Project> => {
        try {
            ProjectLogic.updateToken();
            const resp = await axios.get(`${API_BASE_URL}projects/${projectId}/`);
            return resp && resp.data;
        }
        catch (err) {
            throw err;
        }
    }

    public static editProject = async (projectId: number, body: Object): Promise<Project> => {
        try {
            ProjectLogic.updateToken();
            const resp = await axios.put(`${API_BASE_URL}projects/${projectId}/`, body);
            return resp && resp.data;
        }
        catch (err) {
            throw err;
        }
    }

    public static createProject = async (body: Object): Promise<Project> => {
        try {
            ProjectLogic.updateToken();
            const resp = await axios.post(`${API_BASE_URL}projects/`, body);
            return resp && resp.data;
        }
        catch (err) {
            throw err;
        }
    }

    public static deleteProject = async (projectId: string): Promise<void> => {
        try {
            ProjectLogic.updateToken();
            await axios.delete(`${API_BASE_URL}projects/${projectId}/`);
        }
        catch (err) {
            throw err;
        }
    }

    public static getAllTasks = async (projectId: string): Promise<Task[]> => {
        try {
            ProjectLogic.updateToken();
            const resp = await axios.get(`${API_BASE_URL}projects/${projectId}/tasks/`);
            return resp && resp.data;
        }
        catch (err) {
            throw err;
        }
    }

    public static getTask = async (projectId: string, taskId: string): Promise<Task> => {
        try {
            ProjectLogic.updateToken();
            const resp = await axios.get(`${API_BASE_URL}projects/${projectId}/tasks/${taskId}/`);
            return resp && resp.data;
        }
        catch (err) {
            throw err;
        }
    }


    public static editTask = async (projectId: string, taskId: string, body: Object): Promise<Project> => {
        try {
            ProjectLogic.updateToken();
            const resp = await axios.put(`${API_BASE_URL}projects/${projectId}/tasks/${taskId}/`, body);
            return resp && resp.data;
        }
        catch (err) {
            throw err;
        }
    }

    public static createTask = async (projectId: string, body: Object): Promise<Project> => {
        try {
            ProjectLogic.updateToken();
            const resp = await axios.post(`${API_BASE_URL}projects/${projectId}/tasks/`, body);
            return resp && resp.data;
        }
        catch (err) {
            throw err;
        }
    }


    public static deleteTask = async (projectId: string, taskId: string): Promise<void> => {
        try {
            ProjectLogic.updateToken();
            await axios.delete(`${API_BASE_URL}projects/${projectId}/tasks/${taskId}/`);
        }
        catch (err) {
            throw err;
        }
    }

    public static getAllSubtasks = async (projectId: string, taskId: string): Promise<Subtask[]> => {
        try {
            ProjectLogic.updateToken();
            const resp = await axios.get(`${API_BASE_URL}projects/${projectId}/tasks/${taskId}/subtasks/`);
            return resp && resp.data;
        }
        catch (err) {
            throw err;
        }
    }

    public static getSubtask = async (projectId: string, taskId: string, subtaskId: string): Promise<Subtask> => {
        try {
            ProjectLogic.updateToken();
            const resp = await axios.get(`${API_BASE_URL}projects/${projectId}/tasks/${taskId}/subtasks/${subtaskId}/`);
            return resp && resp.data;
        }
        catch (err) {
            throw err;
        }
    }

    public static editSubtask = async (projectId: string, taskId: string, subtaskId: string, body: Object): Promise<Subtask> => {
        try {
            ProjectLogic.updateToken();
            const resp = await axios.put(`${API_BASE_URL}projects/${projectId}/tasks/${taskId}/subtasks/${subtaskId}/`, body);
            return resp && resp.data;
        }
        catch (err) {
            throw err;
        }
    }

    public static createSubtask = async (projectId: string, taskId: string, body: Object): Promise<Subtask> => {
        try {
            ProjectLogic.updateToken();
            const resp = await axios.post(`${API_BASE_URL}projects/${projectId}/tasks/${taskId}/subtasks/`, body);
            return resp && resp.data;
        }
        catch (err) {
            throw err;
        }
    }

    public static deleteSubtask = async (projectId: string, taskId: string, subtaskId: string): Promise<Subtask> => {
        try {
            ProjectLogic.updateToken();
            const resp = await axios.delete(`${API_BASE_URL}projects/${projectId}/tasks/${taskId}/subtasks/${subtaskId}/`);
            return resp && resp.data;
        }
        catch (err) {
            throw err;
        }
    }
}