import Cookies from 'js-cookie';

import useUserStore from '@/stores/useUserStore';

export const signout = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  useUserStore.setState({ user: null });
};
