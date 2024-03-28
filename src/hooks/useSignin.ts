import { useMutation } from '@tanstack/react-query';

import { Auth } from '@/apis/auth';
import { setAuthCookie } from '@/utils';

import useUserStore from '@/stores/useUserStore';

import { Account } from '@/types';

const useSignin = () => {
  const { error, mutate } = useMutation({
    mutationFn: (value: Account) => Auth.signin(value),
    onSuccess(data) {
      const { accessToken, refreshToken, user } = data.data;
      setAuthCookie(null, accessToken, refreshToken);
      useUserStore.setState({ user: user });
    },
  });

  return { error, mutate };
};

export default useSignin;
