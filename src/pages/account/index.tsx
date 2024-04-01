import { GetServerSidePropsContext } from 'next';

import { PAGE_PATHS } from '@/constants';
import { requiresLogin } from '@/utils';

import AccountForm from '@/components/AccountForm';
import Layout from '@/components/layout/Layout';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await requiresLogin(context, PAGE_PATHS.signin);

  return {
    props: {},
  };
}
const AccountPage = () => {
  return <AccountForm />;
};

export default AccountPage;

AccountPage.FullLayout = Layout;
