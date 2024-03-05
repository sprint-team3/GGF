import { Acount } from '@/types/auth';

import instance from './axios';

import { AUTH_API, LOGIN_API, TOKENS_API } from '@/constants/apiPaths';

export const Auth = {
  signin: (value: Acount) => instance.post(`${AUTH_API}${LOGIN_API}`, value),

  renewToken: (refreshToken: string) =>
    instance.post(`${AUTH_API}${TOKENS_API}`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }),
};
