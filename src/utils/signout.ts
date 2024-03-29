import { destroyCookie } from 'nookies';

import useUserStore from '@/stores/useUserStore';

export const signout = () => {
  destroyCookie(null, 'accessToken');
  destroyCookie(null, 'refreshToken');
  useUserStore.setState({ userData: null });
};
