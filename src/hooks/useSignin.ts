import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { Auth } from '@/apis/auth';
import { ACCESS_TOKEN_EXPIRED_TIME, REFRESH_TOKEN_EXPIRED_TIME } from '@/constants';

import useUserStore from '@/stores/useUserStore';

import { Account } from '@/types';

const useSignin = (value: Account) => {
  const { error, mutate } = useMutation({
    mutationFn: () => Auth.signin(value),
    onSuccess(data) {
      const { accessToken, refreshToken, user } = data.data;
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
      useUserStore.setState({ user: user });
    },
    onError(error) {
      console.error('useSignin', error);
    },
  });

  return { error, mutate };
};

export default useSignin;
