import axios, { InternalAxiosRequestConfig } from 'axios';

import { AXIOS_TIMEOUT } from '@/constants';
import { getCSRCookie, setAuthCookie } from '@/utils';

import { Auth } from './auth';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: AXIOS_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthorizationHeader = async (config: InternalAxiosRequestConfig) => {
  const { accessToken, refreshToken } = getCSRCookie();

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  } else if (!accessToken && refreshToken) {
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
    config.headers['Authorization'] = `Bearer ${reAccessToken}`;
  }
  return config;
};

instance.interceptors.request.use(setAuthorizationHeader, (error) => Promise.reject(error));

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default instance;
