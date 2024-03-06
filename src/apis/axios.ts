import axios from 'axios';
import Cookies from 'js-cookie';

import { ACCESS_TOKEN_EXPIRED_TIME, REFRESH_TOKEN_EXPIRED_TIME } from '@/constants';

import { Auth } from './auth';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    if (!accessToken && refreshToken) {
      try {
        const res = await Auth.renewToken();
        const { accessToken, refreshToken } = res.data;
        Cookies.set('accessToken', accessToken, {
          expires: ACCESS_TOKEN_EXPIRED_TIME,
          secure: true,
          sameSite: 'strict',
        });
        Cookies.set('refreshToken', refreshToken, {
          expires: REFRESH_TOKEN_EXPIRED_TIME,
          secure: true,
          sameSite: 'strict',
        });
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
