import { GetServerSidePropsContext } from 'next';

import { META_DATA, PAGE_PATHS } from '@/constants';
import { getLoggedIn, renewAccess } from '@/utils';

import SignupForm from '@/components/auth/SignupForm';
import MetaData from '@/components/MetaData';

const { title, description, keywords } = META_DATA.signup;

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

const SignupPage = () => {
  return (
    <>
      <MetaData title={title} description={description} keywords={keywords} isRobotsNoIndex />
      <SignupForm />
    </>
  );
};

export default SignupPage;
