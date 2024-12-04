import axiosInstance from '../config/axios';
import { SignupPayload, SigninPayload, User } from '../types';

export const authService = {
    signup: async (payload: SignupPayload): Promise<{ user: User }> => {
        const { data } = await axiosInstance.post('/auth/signup', payload);
        return { user: data as User };
    },

    signin: async (payload: SigninPayload): Promise<{ user: User }> => {
        const { data } = await axiosInstance.post('/auth/signin', payload);
        return { user: data as User };
    },          

    signout: async (): Promise<void> => {
        await axiosInstance.get('/auth/signout');
    },

    verifyToken: async (): Promise<void> => {
        await axiosInstance.get('/auth/verify-token');
    }
};
