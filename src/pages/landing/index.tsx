import { dehydrate } from '@tanstack/react-query';

import { getActivities } from '@/apis/queryFunctions';
import { queryClient } from '@/utils';

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
  return <div>LandingPage</div>;
};

export default LandingPage;

LandingPage.FullLayout = Layout;
