import { useRouter } from 'next/router';

import { GAME_T0_CATEGORY } from '@/constants';
import { formatLinkToGame, isValidGameName, redirectToPage } from '@/utils';

import PostForm from '@/components/createPage/PostForm';
import Banner from '@/components/layout/Banner';

import { Category, GameNameEN, LinkName } from '@/types';

const CreatePageContent = () => {
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

export default CreatePageContent;
