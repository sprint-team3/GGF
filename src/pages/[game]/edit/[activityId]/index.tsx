import { GetServerSidePropsContext } from 'next';

import { dehydrate } from '@tanstack/react-query';

import { getActivityDetail } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { GAME_T0_CATEGORY, PAGE_PATHS } from '@/constants';
import { formatLinkToGame, getAuthCookie, isValidGameName, queryClient } from '@/utils';

import EditPageContent from '@/components/editPage/EditPageContent';
import Layout from '@/components/layout/Layout';

import { Category, GameNameEN, LinkName } from '@/types';

export function getServerSideProps(context: GetServerSidePropsContext) {
  const game = context.params?.game;
  const paramActivityId = context.params?.activityId;
  const activityId = Number(paramActivityId);
  const isValid = isValidGameName(game as string);
  const { accessToken } = getAuthCookie(context);
  const isLoggedIn = !!accessToken;

  if (!isValid) {
    return {
      redirect: {
        destination: PAGE_PATHS.mypage,
        permanent: false,
      },
    };
  } else if (!isLoggedIn) {
    return {
      redirect: {
        destination: PAGE_PATHS.signin,
        permanent: false,
      },
    };
  }

  const gameName = formatLinkToGame(game as LinkName) as GameNameEN;
  const category = GAME_T0_CATEGORY[gameName];

  queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.activities.get, activityId],
    queryFn: getActivityDetail,
  });

  return {
    props: { dehydratedState: dehydrate(queryClient), activityId, gameName, category },
  };
}

export type EditPageContentProps = {
  activityId: number;
  gameName: GameNameEN;
  category: Category;
};

const EditPage = ({ activityId, gameName, category }: EditPageContentProps) => {
  return <EditPageContent activityId={activityId} gameName={gameName} category={category} />;
};

export default EditPage;

EditPage.FullLayout = Layout;
