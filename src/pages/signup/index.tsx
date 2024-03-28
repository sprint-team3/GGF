import { GetServerSidePropsContext } from 'next';

import { getAuthCookie } from '@/utils';

import SignupForm from '@/components/auth/SignupForm';

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { accessToken } = getAuthCookie(context);

  if (accessToken) {
    return {
      redirect: {
        destination: `/league-of-legends`,
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
