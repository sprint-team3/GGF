import { destroyCookie } from 'nookies';

import { USER_INITIAL_DATA } from '@/constants';

import useUserStore from '@/stores/useUserStore';

import useRouteToPage from './useRouteToPage';

const useSignout = () => {
  const { reloadPage } = useRouteToPage();

  const signout = () => {
    destroyCookie(null, 'accessToken', { path: '/' });
    destroyCookie(null, 'refreshToken', { path: '/' });
    useUserStore.setState({ userData: USER_INITIAL_DATA });
    reloadPage();
  };

  return signout;
};
export default useSignout;
