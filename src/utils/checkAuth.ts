import { GetServerSidePropsContext } from 'next';

import { Auth } from '@/apis/auth';
import ssrInstance from '@/apis/ssrInstance';

import { getAuthCookie, setAuthCookie } from './cookieUtils';

export type TokenResponse = {
  newAccessToken: string;
  newRefreshToken: string;
};

/**
 * 비로그인 유저 접근시 토큰 확인하여 리다이렉트 혹은 토큰 갱신
 * @param context
 * @param accessToken
 * @param refreshToken
 * @param url
 * @returns 갱신 성공시 새로운 토큰 반환
 */
export const requiresLogin = async (context: GetServerSidePropsContext, url: string) => {
  const { res } = context;
  const { accessToken, refreshToken } = getAuthCookie(context);

  if (!accessToken && !refreshToken) {
    res.writeHead(302, { location: url });
    res.end();
  } else if (accessToken === undefined && refreshToken) {
    ssrInstance.interceptors.request.use(
      (config) => {
        config.headers['Authorization'] = `Bearer ${refreshToken}`;
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );
    try {
      const res = await Auth.renewToken('SSR');
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;
      ssrInstance.interceptors.request.use(
        (config) => {
          config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return config;
        },
        (error) => {
          Promise.reject(error);
        },
      );
      setAuthCookie(context, newAccessToken, newRefreshToken);
    } catch (error) {
      console.error('renewToken', error);
    }
  }
};

export const setAuthorization = (accessToken: string) => {
  ssrInstance.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );
};

/**
 * SSR에서 토큰 갱신하여 쿠키에 저장
 * @param context
 */
export const renewAccess = async (context: GetServerSidePropsContext) => {
  const { accessToken, refreshToken } = getAuthCookie(context);

  if (accessToken === undefined && refreshToken) {
    ssrInstance.interceptors.request.use(
      (config) => {
        config.headers['Authorization'] = `Bearer ${refreshToken}`;
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );
    try {
      const res = await Auth.renewToken('SSR');
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;
      ssrInstance.interceptors.request.use(
        (config) => {
          config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return config;
        },
        (error) => {
          Promise.reject(error);
        },
      );
      setAuthCookie(context, newAccessToken, newRefreshToken);
    } catch (error) {
      console.error('renewAccess', error);
    }
  }
};
