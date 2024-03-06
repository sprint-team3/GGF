import Cookies from 'js-cookie';

import { replaceToPage } from './router';

export const signout = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  replaceToPage('/signin');
};
