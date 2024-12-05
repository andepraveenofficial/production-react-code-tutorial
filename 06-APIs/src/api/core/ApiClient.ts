import {  AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance, { 
  
} from '../config/axios.config';


/* API request functions */
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosInstance.get<T>(url, config);
};

export const post = async <T, D = Record<string, unknown>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
    return axiosInstance.post<T>(url, data, config);
};

export const put = async <T, D = Record<string, unknown>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
    return axiosInstance.put<T>(url, data, config);
};

export const patch = async <T, D = Record<string, unknown>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
    return axiosInstance.patch<T>(url, data, config);
};

export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosInstance.delete<T>(url, config);
};

/* Export all API functions */
export const api = {
    get,
    post,
    put,
    patch,
    delete: del
};
