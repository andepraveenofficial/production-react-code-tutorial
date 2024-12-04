import axios from 'axios';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    timeout: 10000,
    withCredentials: true, // Important for cookies/session handling
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add common headers here
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/json',
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;
