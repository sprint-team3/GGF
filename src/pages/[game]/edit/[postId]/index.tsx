import { GetServerSidePropsContext } from 'next';

import { dehydrate } from '@tanstack/react-query';

import { getActivityDetail } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { META_DATA, GAME_T0_CATEGORY, PAGE_PATHS } from '@/constants';
import { formatLinkToGame, isValidGameName, queryClient, requiresLogin } from '@/utils';

import EditPageContent from '@/components/editPage/EditPageContent';
import Layout from '@/components/layout/Layout';
import MetaData from '@/components/MetaData';

import { Category, GameNameEN, LinkName } from '@/types';

const { title, description, keywords } = META_DATA.edit;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const game = context.params?.game;
  const paramPostId = context.params?.postId;
  const postId = Number(paramPostId);
  const isValid = isValidGameName(game as string);

  if (!isValid) {
    return {
      redirect: {
        destination: PAGE_PATHS.mypage,
        permanent: false,
      },
    };
  }

  await requiresLogin(context, PAGE_PATHS.signin);

  const gameName = formatLinkToGame(game as LinkName) as GameNameEN;
  const category = GAME_T0_CATEGORY[gameName];

  queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.activities.get, postId],
    queryFn: getActivityDetail,
  });

  return {
    props: { dehydratedState: dehydrate(queryClient), postId, gameName, category },
  };
}

export type EditPageContentProps = {
  postId: number;
  gameName: GameNameEN;
  category: Category;
};

const EditPage = ({ postId, gameName, category }: EditPageContentProps) => {
  return (
    <>
      <MetaData title={title} description={description} keywords={keywords} />
      <EditPageContent postId={postId} gameName={gameName} category={category} />
    </>
  );
};

export default EditPage;

EditPage.FullLayout = Layout;
