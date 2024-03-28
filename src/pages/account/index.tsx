import { GetServerSidePropsContext } from 'next';

import { PAGE_PATHS } from '@/constants';
import { getAuthCookie, requiresLogin, setAuthCookie } from '@/utils';

import AccountForm from '@/components/AccountForm';
import Layout from '@/components/layout/Layout';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { accessToken, refreshToken } = getAuthCookie(context);

  const res = await requiresLogin(context, accessToken, refreshToken, PAGE_PATHS.mainList);
  if (res) {
    const { newAccessToken, newRefreshToken } = res;
    setAuthCookie(context, newAccessToken, newRefreshToken);
  }

  return {
    props: {},
  };
}
const AccountPage = () => {
  return <AccountForm />;
};

export default AccountPage;

AccountPage.FullLayout = Layout;
