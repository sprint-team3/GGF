import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { Auth } from '@/apis/auth';
import { ACCESS_TOKEN_EXPIRED_TIME, REFRESH_TOKEN_EXPIRED_TIME } from '@/constants';

import { Account } from '@/types';

const useSignin = (value: Account) => {
  const { data, error } = useQuery({
    queryKey: ['login-result'],
    queryFn: () => Auth.signin(value),
  });

  if (data) {
    const { accessToken, refreshToken } = data.data;
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
  }

  return { error };
};

export default useSignin;
