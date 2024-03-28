import { GetServerSidePropsContext } from 'next';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import { getMyReservations } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { PAGE_PATHS } from '@/constants';
import { getAuthCookie, requiresLogin, setAuthCookie } from '@/utils';

import Layout from '@/components/layout/Layout';
import MypageContent from '@/components/mypage/MypageContent';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { accessToken, refreshToken } = getAuthCookie(context);

  const res = await requiresLogin(context, accessToken, refreshToken, PAGE_PATHS.landing);
  if (res) {
    const { newAccessToken, newRefreshToken } = res;
    setAuthCookie(context, newAccessToken, newRefreshToken);
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: QUERY_KEYS.myReservations.get, queryFn: getMyReservations });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Mypage = () => {
  return <MypageContent />;
};

export default Mypage;

Mypage.FullLayout = Layout;
