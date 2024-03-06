import { AUTH_API, LOGIN_API, TOKENS_API } from '@/constants';

import { Account } from '@/types';

import instance from './axios';

export const Auth = {
  signin: (value: Account) => instance.post(`${AUTH_API}${LOGIN_API}`, value),

  renewToken: () => instance.post(`${AUTH_API}${TOKENS_API}`),
};
