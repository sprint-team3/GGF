import { GetServerSidePropsContext } from 'next';

import Head from 'next/head';

import { dehydrate } from '@tanstack/react-query';

import { getActivities } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { CATEGORY_TO_GAME, GAME_T0_CATEGORY, PAGE_PATHS } from '@/constants';
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
  return (
    <>
      <Head>
        <title>GGF | {CATEGORY_TO_GAME[category]} 모집 게시판</title>
        <meta name='description' content={`${CATEGORY_TO_GAME[category]} 모집 등록하기 페이지입니다.`} />
        <meta name='keywords' content='게임 모집 게시판, 게임 모집 리스트' />
      </Head>
      <ListPageContent category={category} isLoggedIn={isLoggedIn} />
    </>
  );
};

export default ListPage;

ListPage.FullLayout = Layout;
