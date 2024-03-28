import { useMutation } from '@tanstack/react-query';

import { Auth } from '@/apis/auth';
import { Users } from '@/apis/users';
import { setAuthCookie } from '@/utils';

import useUserStore from '@/stores/useUserStore';

import { Account, SignupParams } from '@/types';

export const useSignin = () => {
  const { mutate } = useMutation({
    mutationFn: (value: Account) => Auth.signin(value),
    onSuccess(data) {
      const { accessToken, refreshToken, user } = data.data;
      setAuthCookie(null, accessToken, refreshToken);
      useUserStore.setState({ user: user });
    },
  });

  return { mutate };
};

export const useSignup = () => {
  const { mutate } = useMutation({
    mutationFn: (value: SignupParams) => Users.signup(value),
  });

  return { mutate };
};
