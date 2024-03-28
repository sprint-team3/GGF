import { GetServerSidePropsContext } from 'next';

import { getAuthCookie } from '@/utils';

import SigninForm from '@/components/auth/SigninForm';

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

const SigninPage = () => {
  return <SigninForm />;
};

export default SigninPage;
