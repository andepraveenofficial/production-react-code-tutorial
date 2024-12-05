import axios, { AxiosResponse, AxiosError } from 'axios';
import axiosInstance from '../config/axios.config';
import { AuthResponse, SigninRequestPayload, SignupRequestPayload } from '../types';

/* Token Management */
const setToken = (token: string): void => {
    localStorage.setItem('token', token);
};

const clearToken = (): void => {
    localStorage.removeItem('token');
};

const getToken = (): string | null => {
    return localStorage.getItem('token');
};

/* Error Handling */
const handleError = (error: unknown): Error => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        switch (axiosError.response?.status) {
            case 401:
                return new Error('Invalid credentials');
            case 422:
                return new Error('Invalid input data');
            default:
                return new Error('Authentication failed');
        }
    }
    return new Error('An unknown error occurred');
};

/* Auth Functions */
export const signup = async (data: SignupRequestPayload): Promise<AuthResponse> => {
    try {
        const response: AxiosResponse<AuthResponse> = await axiosInstance.post(
            '/auth/signup',
            data
        );
        setToken(response.data.accessToken);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const signin = async (data: SigninRequestPayload): Promise<AuthResponse> => {
    try {
        const response: AxiosResponse<AuthResponse> = await axiosInstance.post(
            '/auth/signin',
            data
        );
        setToken(response.data.accessToken);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const signout = async (): Promise<void> => {
    try {
        await axiosInstance.get('/auth/signout');
        clearToken();
    } catch (error) {
        throw handleError(error);
    }
};

export const isAuthenticated = (): boolean => {
    return !!getToken();
};

/* Export all auth functions */
export const auth = {
    signup,
    signin,
    signout,
    isAuthenticated,
    getToken
};
