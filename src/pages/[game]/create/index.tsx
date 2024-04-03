import { GetServerSidePropsContext } from 'next';

import { META_DATA, GAME_T0_CATEGORY, PAGE_PATHS } from '@/constants';
import { formatLinkToGame, isValidGameName, isValidPostType, requiresLogin } from '@/utils';

import CreatePageContent from '@/components/createPage/CreatePageContent';
import Layout from '@/components/layout/Layout';
import MetaData from '@/components/MetaData';

import { Category, GameNameEN, LinkName } from '@/types';

const { title, description, keywords } = META_DATA.create;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const game = context.params?.game;
  const isValidParam = isValidGameName(game as string);
  const query = context.query;
  const isValidQuery = isValidPostType(String(query.postType));

  if (!isValidParam || !isValidQuery) {
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
  return (
    <>
      <MetaData title={title} description={description} keywords={keywords} />
      <CreatePageContent category={category} />
    </>
  );
};

export default CreatePage;

CreatePage.FullLayout = Layout;
