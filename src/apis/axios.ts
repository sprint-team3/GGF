import axios from 'axios';

import { getCSRCookie, setAuthCookie } from '@/utils';

import { Auth } from './auth';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config) => {
    const { accessToken, refreshToken } = getCSRCookie();

    if (!accessToken && refreshToken) {
      try {
        const res = await Auth.renewToken('CSR');
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;
        setAuthCookie(null, newAccessToken, newRefreshToken);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    const { accessToken: reAccessToken } = getCSRCookie();
    if (reAccessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default instance;
