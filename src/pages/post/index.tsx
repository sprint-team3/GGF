import Banner from '@/components/layout/Banner';
import Layout from '@/components/layout/Layout';
import MapPreview from '@/components/postDetail/MapPreview';
import ReviewList from '@/components/postDetail/ReviewList';
import { REVIEW_LIST_DATA } from '@/constants/mockData/reviewList';

const PostPage = () => {
  return (
    <>
      <Banner gameName={'BATTLEGROUNDS'} />
      <ReviewList list={REVIEW_LIST_DATA} />
      <MapPreview />
    </>
  );
};

export default PostPage;

PostPage.FullLayout = Layout;
