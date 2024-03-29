import { GetServerSidePropsContext } from 'next';

import { GAME_T0_CATEGORY, PAGE_PATHS } from '@/constants';
import { formatLinkToGame, getAuthCookie, isValidGameName } from '@/utils';

import CreatePageContent from '@/components/createPage/CreatePageContent';
import Layout from '@/components/layout/Layout';

import { Category, GameNameEN, LinkName } from '@/types';

export function getServerSideProps(context: GetServerSidePropsContext) {
  const game = context.params?.game;
  const isValid = isValidGameName(game as string);
  const { accessToken } = getAuthCookie(context);
  const isLoggedIn = !!accessToken;

  if (!isValid) {
    return {
      redirect: {
        destination: PAGE_PATHS.mainList,
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

  return {
    props: { gameName, category },
  };
}

export type CreatePageContentProps = {
  gameName: GameNameEN;
  category: Category;
};

const CreatePage = ({ gameName, category }: CreatePageContentProps) => {
  return <CreatePageContent gameName={gameName} category={category} />;
};

export default CreatePage;

CreatePage.FullLayout = Layout;
