import { GetServerSidePropsContext } from 'next';

import { dehydrate } from '@tanstack/react-query';

import { getActivities } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { GAME_T0_CATEGORY, PAGE_PATHS } from '@/constants';
import { formatLinkToGame, getAuthCookie, isValidGameName, queryClient } from '@/utils';

import Layout from '@/components/layout/Layout';
import ListPageContent from '@/components/listPage/ListPageContent';

import { Category, GameNameEN, LinkName } from '@/types';

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { accessToken } = getAuthCookie(context);
  const isLoggedIn = !!accessToken;

  const game = context.params?.game;
  const isValid = isValidGameName(game as string);

  if (!isValid) {
    return {
      redirect: {
        destination: PAGE_PATHS.landing,
        permanent: false,
      },
    };
  }

  const gameName = formatLinkToGame(game as LinkName) as GameNameEN;
  const category = GAME_T0_CATEGORY[gameName];

  queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.activities.getList, category],
    queryFn: getActivities,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      category,
      isLoggedIn,
    },
  };
}

export type ListPageProps = {
  category: Category;
  isLoggedIn: boolean;
};

const ListPage = ({ category, isLoggedIn }: ListPageProps) => {
  return <ListPageContent category={category} isLoggedIn={isLoggedIn} />;
};

export default ListPage;

ListPage.FullLayout = Layout;
