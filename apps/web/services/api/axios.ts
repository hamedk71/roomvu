import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT || 10000);

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
  code?: string;
  status?: number;
}

const config: AxiosRequestConfig = {
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

const apiClient: AxiosInstance = axios.create(config);

apiClient.interceptors.request.use(
  (config) => {   
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Token refresh logic would go here
      } catch (refreshError) {
        if (typeof window !== 'undefined') {
          // Auth redirect logic would go here
        }
        return Promise.reject(refreshError);
      }
    }
    
    if (error.message === 'Network Error') {
      console.error('API is unavailable or you are offline');
      if (typeof window !== 'undefined') {
        toast.error('Network error. Please check your internet connection.');
      }
    }
    
    const errorData = (error.response?.data as ApiErrorResponse) || {};
    const errorMessage = errorData.message || error.message || 'An unexpected error occurred';
    
    if (typeof window !== 'undefined') {
      if (error.response?.status === 404) {
        toast.error(`Not found: ${errorMessage}`);
      } else if (error.response?.status === 403) {
        toast.error(`Access denied: ${errorMessage}`);
      } else if (error.response?.status === 500) {
        toast.error(`Server error: ${errorMessage}`);
      } else {
        toast.error(errorMessage);
      }
    }
    
    return Promise.reject({
      status: error.response?.status || 500,
      message: errorMessage,
      data: errorData,
      originalError: error,
    });
  }
);

export default apiClient; 