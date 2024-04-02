import { GetServerSidePropsContext } from 'next';

import { PAGE_PATHS } from '@/constants';
import { getLoggedIn, renewAccess } from '@/utils';

import SignupForm from '@/components/auth/SignupForm';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await renewAccess(context);

  if (getLoggedIn(context)) {
    return {
      redirect: {
        destination: PAGE_PATHS.mainList,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const SignupPage = () => {
  return <SignupForm />;
};

export default SignupPage;
