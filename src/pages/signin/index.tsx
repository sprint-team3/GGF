import { GetServerSidePropsContext } from 'next';

import { META_DATA, PAGE_PATHS } from '@/constants';
import { getLoggedIn, renewAccess } from '@/utils';

import SigninForm from '@/components/auth/SigninForm';
import MetaData from '@/components/MetaData';

const { title, description, keywords } = META_DATA.signin;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const loggedIn = getLoggedIn(context);

  if (loggedIn) {
    return {
      redirect: {
        destination: PAGE_PATHS.mainList,
        permanent: false,
      },
    };
  }
  if (!loggedIn) {
    const isRenewed = await renewAccess(context);
    if (isRenewed) {
      return {
        redirect: {
          destination: PAGE_PATHS.mainList,
          permanent: false,
        },
      };
    } else {
      return {
        props: {},
      };
    }
  }
}

const SigninPage = () => {
  return (
    <>
      <MetaData title={title} description={description} keywords={keywords} isRobotsNoIndex />
      <SigninForm />
    </>
  );
};

export default SigninPage;
