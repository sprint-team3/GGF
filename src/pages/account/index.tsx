import { GetServerSidePropsContext } from 'next';

import { PAGE_PATHS, META_DATA } from '@/constants';
import { requiresLogin } from '@/utils';

import AccountForm from '@/components/AccountForm';
import Layout from '@/components/layout/Layout';
import MetaData from '@/components/MetaData';

const { title, description, keywords } = META_DATA.account;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await requiresLogin(context, PAGE_PATHS.signin);

  return {
    props: {},
  };
}
const AccountPage = () => {
  return (
    <>
      <MetaData title={title} description={description} keywords={keywords} isRobotsNoIndex />
      <AccountForm />
    </>
  );
};

export default AccountPage;

AccountPage.FullLayout = Layout;
