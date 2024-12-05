/* 
 * Import required types and libraries for axios configuration
 * and cookie management
 */
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';

/* API base URL for all requests */
const BASE_URL = 'http://localhost:5000/api/v1';

/* 
 * Create a custom axios instance with default settings
 * - baseURL: prefix for all API requests
 * - timeout: maximum time to wait for response (10 seconds)
 * - headers: default content type for all requests
 */
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

/* 
 * Request Interceptor: Runs before every request
 * - Gets authentication token from cookies
 * - Adds token to request headers if it exists
 * - Handles any errors during this process
 */
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

/* 
 * Response Interceptor: Runs after every response
 * - Handles different types of API responses and errors
 * - Manages authentication failures
 * - Provides specific error messages for different HTTP status codes
 */
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        /* Check if error is due to network issues (no response received) */
        if (!error.response) {
            throw new Error('Network error occurred');
        }

        /* Handle different HTTP error status codes */
        switch (error.response.status) {
            case 401: /* Unauthorized */
                /* Remove auth token and redirect to login page */
                Cookies.remove('token', { path: '/' });
                window.location.href = '/login';
                break;
            case 403: /* Forbidden */
                throw new Error('Access forbidden');
            case 404: /* Not Found */
                throw new Error('Resource not found');
            case 422: /* Validation Error */
                throw new Error('Validation failed');
            case 500: /* Server Error */
                throw new Error('Internal server error');
            default:
                throw new Error('An unexpected error occurred');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
