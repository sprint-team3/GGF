import { GetServerSidePropsContext } from 'next';

import { dehydrate } from '@tanstack/react-query';

import { getActivityDetail, getReviewList } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { getAuthCookie, queryClient } from '@/utils';

import Layout from '@/components/layout/Layout';
import PostConent from '@/components/postDetail/PostDetailContent';

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { accessToken } = getAuthCookie(context);
  const isLoggedIn = !!accessToken;

  const { params } = context;
  const postId = Number(params?.postId);
  const game = params?.game;

  if (!postId) {
    return {
      redirect: {
        destination: `/${game}`,
        permanent: false,
      },
    };
  }

  queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.activities.get, postId],
    queryFn: getActivityDetail,
  });

  queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.activities.getReviewList, postId],
    queryFn: getReviewList,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      isLoggedIn,
    },
  };
}

export type PostPageProps = {
  isLoggedIn: boolean;
};

const PostPage = ({ isLoggedIn }: PostPageProps) => {
  return <PostConent isLoggedIn={isLoggedIn} />;
};

export default PostPage;

PostPage.FullLayout = Layout;
