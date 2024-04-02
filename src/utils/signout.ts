import { destroyCookie } from 'nookies';

import { USER_INITIAL_DATA } from '@/constants';
import { reloadPage } from '@/utils/router';

import useUserStore from '@/stores/useUserStore';

export const signout = () => {
  destroyCookie(null, 'accessToken');
  destroyCookie(null, 'refreshToken');
  useUserStore.setState({ userData: USER_INITIAL_DATA });
  reloadPage();
};
