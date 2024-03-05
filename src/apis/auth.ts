import Instance from 'axios';

import { AUTH_API, LOGIN_API, TOKENS_API } from '@/constants/apiPaths';
import { Acount } from '@/types/auth';

export const Auth = {
  signin: (value: Acount) => Instance.post(`${AUTH_API}${LOGIN_API}`, value),

  renewToken: (refreshToken: string) =>
    Instance.post(`${AUTH_API}${TOKENS_API}`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }),
};
