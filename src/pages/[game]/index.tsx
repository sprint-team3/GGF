import { useRouter } from 'next/router';

import { formatLinkToGame, isValidGameName, redirectToPage } from '@/utils';

import Banner from '@/components/layout/Banner';
import Layout from '@/components/layout/Layout';
import PostList from '@/components/PostList/PostList';

import { GameNameEN, LinkName } from '@/types';

const ListPage = () => {
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

export default ListPage;

ListPage.FullLayout = Layout;
