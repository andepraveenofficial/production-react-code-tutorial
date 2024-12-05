import { AxiosResponse } from 'axios';
import axiosInstance from '../config/axios.config';
import { PaginatedResponse } from '../types/common.types';
import { User, UserUpdatePayload } from '../types/user.types';

/* Helper function to create URL parameters */
const createUrlParams = (page: number, limit: number, sort?: string): URLSearchParams => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (sort) params.append('sort', sort);
    return params;
};

/* User API Functions */
export const getUsers = async (
    page: number = 1,
    limit: number = 10,
    sort?: string
): Promise<PaginatedResponse<User>> => {
    const params = createUrlParams(page, limit, sort);
    const response: AxiosResponse<PaginatedResponse<User>> = await axiosInstance.get(
        '/api/v1/users',
        { params }
    );
    return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
    const response: AxiosResponse<User> = await axiosInstance.get(
        `/api/v1/users/${id}`
    );
    return response.data;
};

export const updateUser = async (id: string, data: UserUpdatePayload): Promise<User> => {
    const response: AxiosResponse<User> = await axiosInstance.put(
        `/api/v1/users/${id}`,
        data
    );
    return response.data;
};

export const patchUser = async (id: string, data: Partial<UserUpdatePayload>): Promise<User> => {
    const response: AxiosResponse<User> = await axiosInstance.patch(
        `/api/v1/users/${id}`,
        data
    );
    return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/api/v1/users/${id}`);
};

/* Export all user functions */
export const users = {
    getUsers,
    getUserById,
    updateUser,
    patchUser,
    deleteUser
};
