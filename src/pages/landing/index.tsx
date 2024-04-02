import Head from 'next/head';

import { dehydrate } from '@tanstack/react-query';

import { getActivities } from '@/apis/queryFunctions';
import { queryClient } from '@/utils';

import ClanRecruitment from '@/components/landing/ClanRecruitment/ClanRecruitment';
import CreatorRecuritment from '@/components/landing/CreatorRecuritment';
import Echo from '@/components/landing/Echo';
import MatchTeam from '@/components/landing/MatchTeam/MatchTeam';
import Layout from '@/components/layout/Layout';

import { Category } from '@/types';

export const getServerSideProps = () => {
  queryClient.prefetchQuery({ queryKey: ['activities', ''], queryFn: getActivities });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export type LandingPageProps = {
  category: Category;
};

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>GGF | Good Game Friends</title>
      </Head>
      <div>
        <Echo />
        <MatchTeam />
        <ClanRecruitment />
        <CreatorRecuritment />
      </div>
    </>
  );
};

export default LandingPage;

LandingPage.FullLayout = Layout;
