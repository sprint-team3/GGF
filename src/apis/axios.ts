import axios from 'axios';
import { parseCookies } from 'nookies';

import { setAuthCookie } from '@/utils';

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
    const cookies = parseCookies();
    const accessToken = cookies?.accessToken;
    const refreshToken = cookies?.refreshToken;

    if (!accessToken && refreshToken) {
      config.headers['Authorization'] = `Bearer ${refreshToken}`;
      try {
        const res = await Auth.renewToken('CSR');
        const { accessToken, refreshToken } = res.data;
        setAuthCookie(null, accessToken, refreshToken);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    if (accessToken) {
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
