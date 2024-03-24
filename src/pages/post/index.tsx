// import dynamic from 'next/dynamic';

import Banner from '@/components/layout/Banner';
import Layout from '@/components/layout/Layout';
// import KaKaoMap from '@/components/postDetail/KaKaoMap';
// import MapPreview from '@/components/postDetail/MapPreview';
import ReviewList from '@/components/postDetail/ReviewList';

// const MapPreviewNoSSR = dynamic(() => import('@/components/postDetail/MapPreview'), { ssr: false });

const PostPage = () => {
  return (
    <>
      <section>
        <Banner gameName={'BATTLEGROUNDS'} />
      </section>
      <ReviewList />
      {/* <MapPreviewNoSSR /> */}
    </>
  );
};

export default PostPage;

PostPage.FullLayout = Layout;
