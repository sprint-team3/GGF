import { GetServerSidePropsContext } from 'next';

import { dehydrate } from '@tanstack/react-query';

import { getMyActivitiesList, getMyReservations } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { PAGE_PATHS } from '@/constants';
import { queryClient, requiresLogin } from '@/utils';

import Layout from '@/components/layout/Layout';
import MypageContent from '@/components/mypage/MypageContent';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await requiresLogin(context, PAGE_PATHS.landing);

  await queryClient.prefetchQuery({ queryKey: QUERY_KEYS.myActivities.getList, queryFn: getMyActivitiesList });

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
