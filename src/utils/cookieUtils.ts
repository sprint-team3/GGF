import { GetServerSidePropsContext } from 'next';

import { parseCookies, setCookie } from 'nookies';

import { ACCESS_TOKEN_EXPIRED_TIME, REFRESH_TOKEN_EXPIRED_TIME } from '@/constants';

export const setAuthCookie = (context: GetServerSidePropsContext | null, accessToken: string, refreshToken: string) => {
  setCookie(context, 'accessToken', accessToken, {
    maxAge: ACCESS_TOKEN_EXPIRED_TIME,
    path: '/',
    secure: true,
    sameSite: 'strict',
  });
  setCookie(context, 'refreshToken', refreshToken, {
    maxAge: REFRESH_TOKEN_EXPIRED_TIME,
    path: '/',
    secure: true,
    sameSite: 'strict',
  });
};

export const getAuthCookie = (context: GetServerSidePropsContext) => {
  const cookies = parseCookies(context);
  const accessToken = cookies?.accessToken;
  const refreshToken = cookies?.refreshToken;
  return { accessToken, refreshToken };
};

export const getCSRCookie = () => {
  const cookies = parseCookies();
  const accessToken = cookies?.accessToken;
  const refreshToken = cookies?.refreshToken;
  return { accessToken, refreshToken };
};
