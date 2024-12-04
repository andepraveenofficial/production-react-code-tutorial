import axiosInstance from '../config/axios';
import { User, UserUpdatePayload, PaginationParams, PaginatedResponse } from '../types';

export const userService = {
    getUsers: async (params?: PaginationParams): Promise<PaginatedResponse<User>> => {
        const { data } = await axiosInstance.get('/users', { params });
        return data as PaginatedResponse<User>;
    },

    getUserById: async (id: string): Promise<User> => {
        const { data } = await axiosInstance.get(`/users/${id}`);
        return data as User;
    },

    updateUser: async (id: string, payload: UserUpdatePayload): Promise<User> => {
        const { data } = await axiosInstance.put(`/users/${id}`, payload);
        return data as User;
    },

    deleteUser: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/users/${id}`);
    }
};
