import axios from 'axios';

import { getCSRCookie } from '@/utils';

const userInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

userInstance.interceptors.request.use(
  (config) => {
    const { accessToken, refreshToken } = getCSRCookie();

    if (!accessToken && refreshToken) {
      config.headers['Authorization'] = `Bearer ${refreshToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default userInstance;
