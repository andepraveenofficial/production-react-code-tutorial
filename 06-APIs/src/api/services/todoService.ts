import axiosInstance from '../config/axios';
import { Todo, TodoCreatePayload, TodoUpdatePayload, PaginationParams, PaginatedResponse } from '../types';

export const todoService = {
    getTodos: async (params?: PaginationParams): Promise<PaginatedResponse<Todo>> => {
        const { data } = await axiosInstance.get('/todos', { params });
        return data as PaginatedResponse<Todo>;
    },

    getTodoById: async (id: string): Promise<Todo> => {
        const { data } = await axiosInstance.get(`/todos/${id}`);
        return data as Todo;
    },

    createTodo: async (payload: TodoCreatePayload): Promise<Todo> => {
        const { data } = await axiosInstance.post('/todos', payload);
        return data as Todo;
    },

    updateTodo: async (id: string, payload: TodoUpdatePayload): Promise<Todo> => {
        const { data } = await axiosInstance.put(`/todos/${id}`, payload);
        return data as Todo;
    },

    deleteTodo: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/todos/${id}`);
    }
};
