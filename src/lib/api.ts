// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.sadaradan.com', // ✅ FIXED: remove "/admin"
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
