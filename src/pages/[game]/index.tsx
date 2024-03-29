import { GetServerSidePropsContext } from 'next';

import { dehydrate } from '@tanstack/react-query';

import { getActivities } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { GAME_T0_CATEGORY } from '@/constants';
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
        destination: `/landing`,
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
      gameName,
      category,
      isLoggedIn,
    },
  };
}

export type ListPageProps = {
  gameName: GameNameEN;
  category: Category;
  isLoggedIn: boolean;
};

const ListPage = ({ gameName, category, isLoggedIn }: ListPageProps) => {
  return <ListPageContent gameName={gameName} category={category} isLoggedIn={isLoggedIn} />;
};

export default ListPage;

ListPage.FullLayout = Layout;
