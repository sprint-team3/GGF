import { useRouter } from 'next/router';

import { formatLinkToGame, isValidGameName, redirectToPage } from '@/utils';

import PostList from '../PostList/PostList';

import Banner from '@/components/layout/Banner';

import { GameNameEN, LinkName } from '@/types';

const ListPageContent = () => {
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
      <PostList />
    </>
  );
};

export default ListPageContent;
