// utils/api.js
import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:3001'; 
// const API_BASE_URL = process.env.API_BASE_URL; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  async (error: { response: { status: number; }; config: { headers: { Authorization: string; }; }; }) => {
    // Xử lý lỗi 401 (Unauthorized) - Ví dụ: refresh token
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          // Gọi API refresh token
          const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
          
          // Lưu token mới
          localStorage.setItem('token', refreshResponse.data.token); 

          // Gửi lại request ban đầu với token mới
          error.config.headers.Authorization = `Bearer ${refreshResponse.data.token}`;
          return axios(error.config);
        } else {
          // Xử lý trường hợp không có refresh token (đăng xuất, ...)
          console.error('Không có refresh token');
          // ...
        }
      } catch (refreshError) {
        console.error('Lỗi refresh token:', refreshError);
        // ...
      }
    }
    return Promise.reject(error);
  }
);

// Các phương thức tiện ích
const apiClient = {
  get: (url: string, config?: AxiosRequestConfig<any> | undefined) => api.get(url, config),
  post: (url: string, data: any, config: AxiosRequestConfig<any> | undefined) => api.post(url, data, config),
  put: (url: string, data: any, config: AxiosRequestConfig<any> | undefined) => api.put(url, data, config),
  patch: (url: string, data: any, config: AxiosRequestConfig<any> | undefined) => api.patch(url, data, config),
  delete: (url: string, config: AxiosRequestConfig<any> | undefined) => api.delete(url, config),
};

export default apiClient;