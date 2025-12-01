// src/api/axiosInstance.js
// Mục tiêu: gom cấu hình HTTP request để không lặp lại

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // lấy từ .env
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
