import { GetServerSidePropsContext } from 'next';

import { Auth } from '@/apis/auth';
import ssrInstance from '@/apis/ssrInstance';

/**
 * 비로그인 상태로 페이지 접근 시 원하는 주소로 리다이렉트
 * @param context
 * @param accessToken
 * @param refreshToken
 * @param url
 * @returns
 */

export type TokenResponse = {
  newAccessToken: string;
  newRefreshToken: string;
};

export const requiresLogin = async (
  context: GetServerSidePropsContext,
  accessToken: string | undefined,
  refreshToken: string | undefined,
  url: string,
): Promise<TokenResponse | undefined> => {
  const { res } = context;

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
      return { newAccessToken, newRefreshToken };
    } catch (error) {
      console.log('renewToken', error);
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
