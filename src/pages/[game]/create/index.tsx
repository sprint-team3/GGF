import { GetServerSidePropsContext } from 'next';

import { GAME_T0_CATEGORY, PAGE_PATHS } from '@/constants';
import { formatLinkToGame, isValidGameName, requiresLogin } from '@/utils';

import CreatePageContent from '@/components/createPage/CreatePageContent';
import Layout from '@/components/layout/Layout';

import { Category, GameNameEN, LinkName } from '@/types';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const game = context.params?.game;
  const isValid = isValidGameName(game as string);

  if (!isValid) {
    return {
      redirect: {
        destination: PAGE_PATHS.mainList,
        permanent: false,
      },
    };
  }

  await requiresLogin(context, PAGE_PATHS.signin);

  const gameName = formatLinkToGame(game as LinkName) as GameNameEN;
  const category = GAME_T0_CATEGORY[gameName];

  return {
    props: { gameName, category },
  };
}

export type CreatePageContentProps = {
  category: Category;
};

const CreatePage = ({ category }: CreatePageContentProps) => {
  return <CreatePageContent category={category} />;
};

export default CreatePage;

CreatePage.FullLayout = Layout;
