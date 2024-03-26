import { useRouter } from 'next/router';

import { GAME_T0_CATEGORY } from '@/constants';
import { formatLinkToGame, isValidGameName, redirectToPage } from '@/utils';

import Banner from '@/components/layout/Banner';
import Layout from '@/components/layout/Layout';
import PostForm from '@/components/postCreate/PostForm';

import { Category, GameNameEN, LinkName } from '@/types';

const CreatePage = () => {
  const router = useRouter();
  const { game } = router.query;

  const isValid = isValidGameName(game as string);

  if (!isValid) {
    redirectToPage('/landing');
    return null;
  }

  const gameName = formatLinkToGame(game as LinkName) as GameNameEN;

  return (
    <>
      <Banner gameName={gameName} />
      <PostForm type='등록' category={GAME_T0_CATEGORY[gameName] as Category} />
    </>
  );
};

export default CreatePage;

CreatePage.FullLayout = Layout;
