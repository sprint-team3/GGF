import { AUTH_API, LOGIN_API, TOKENS_API } from '@/constants';

import { Account } from '@/types';

import instance from './axios';
import ssrInstance from './ssrInstance';
import userInstance from './userInstance';

export const Auth = {
  /**
   * 로그인
   * @param value
   * @returns 액세스토큰, 리프레시토큰, 유저정보
   */
  signin: (value: Account) => instance.post(`${AUTH_API}${LOGIN_API}`, value),

  /**
   * 토큰 갱신
   * @param isCsr CSR인지 아닌지
   * @returns 새로운 액세스토큰, 리프레시토큰
   */
  renewToken: (type: 'CSR' | 'SSR') => {
    if (type === 'CSR') {
      return userInstance.post(`${AUTH_API}${TOKENS_API}`);
    } else {
      return ssrInstance.post(`${AUTH_API}${TOKENS_API}`);
    }
  },
};
