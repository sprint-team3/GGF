import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getActivityDetail, getReviewList } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { PostPageProps } from '@/pages/[game]/[postId]';
import { formatCategoryToGameNameEN, splitDescByDelimiter, splitTitleByDelimiter } from '@/utils';

import Banner from '@/components/layout/Banner';
import ConfirmScheduleButton from '@/components/postDetail/ConfirmScheduleButton';
import DefaultBanner from '@/components/postDetail/DefaultBanner';
import ImageSlide from '@/components/postDetail/ImageSlide';
import MapPreview from '@/components/postDetail/MapPreview';
import PostDescription from '@/components/postDetail/PostDesciption';
import PostTitle from '@/components/postDetail/PostTitle';
import ReservationPanel from '@/components/postDetail/reservationPanel/ReservationPanel';
import ReviewList from '@/components/postDetail/ReviewList';
import { POST_DETAIL_DATA } from '@/constants/mockData/postDetail';
import { REVIEW_LIST_DATA } from '@/constants/mockData/reviewList';
import { useDeviceType } from '@/hooks/useDeviceType';

import styles from './PostDetailContent.module.scss';

const cx = classNames.bind(styles);

const nickname = '주인장';
const email = 'test@test.com';

const PostDetailContent = ({ isLoggedIn }: PostPageProps) => {
  const router = useRouter();
  const { postId } = router.query;
  const activityId = Number(postId);

  const { data: postDetailData = POST_DETAIL_DATA } = useQuery({
    queryKey: [QUERY_KEYS.activities.get, activityId],
    queryFn: getActivityDetail,
  });

  const { data: reviewListData = REVIEW_LIST_DATA } = useQuery({
    queryKey: [QUERY_KEYS.activities.getReviewList, activityId],
    queryFn: getReviewList,
  });

  const {
    title: unrefinedTitle,
    subImages,
    price,
    bannerImageUrl,
    category,
    description: unrefinedDescription,
    address,
  } = postDetailData;

  const isImageSlide = subImages?.length > 0;
  const imageUrls = isImageSlide
    ? [bannerImageUrl, ...subImages.map((item: { id: number; imageUrl: string }) => item.imageUrl)]
    : [bannerImageUrl];

  const isOffline = price === 0;
  const isOnline = price === 1;
  const isStrategy = price === 3;
  const isReservationAvailable = isOffline || isOnline;

  const { title } = splitTitleByDelimiter(unrefinedTitle);
  const { description, discordLink } = splitDescByDelimiter(unrefinedDescription);

  const [isReservationPanelOpen, setIsReservationPanelOpen] = useState(true);

  const handlePanelToggleClick = () => {
    setIsReservationPanelOpen((prev) => !prev);
  };

  const currentDeviceType = useDeviceType();

  const isTablet = currentDeviceType === 'Tablet';
  const isMobile = currentDeviceType === 'Mobile';

  useEffect(() => {
    if (isTablet || isMobile) {
      setIsReservationPanelOpen(false);
    } else {
      setIsReservationPanelOpen(true);
    }
  }, [isTablet, isMobile]);

  return (
    <>
      <section className={cx('main-banner')}>
        <Banner gameName={formatCategoryToGameNameEN(category)} />
      </section>
      <section className={cx('main-section')}>
        <div className={cx('container')}>
          <section className={cx('section-top')}>
            <PostTitle price={price} title={title} />
            {isImageSlide ? (
              <ImageSlide imageList={imageUrls} />
            ) : (
              <DefaultBanner url={bannerImageUrl} gameName={formatCategoryToGameNameEN(category)} />
            )}
          </section>
          <section className={cx('section-bottom', { 'no-flex': !isReservationAvailable })}>
            <section className={cx('section-left', { 'no-flex': !isReservationAvailable })}>
              {isStrategy ? (
                <PostDescription description={description} />
              ) : (
                <PostDescription description={description} discordLink={discordLink} />
              )}
              {isOffline && <MapPreview address={address} />}
              {isReservationAvailable && <ReviewList list={reviewListData} nickname={nickname} email={email} />}
            </section>
            {isReservationAvailable && (
              <section>
                {isReservationPanelOpen && (
                  <ReservationPanel
                    isLoggedIn={isLoggedIn}
                    activityId={activityId}
                    maxCount={3}
                    onClick={handlePanelToggleClick}
                  />
                )}
                <ConfirmScheduleButton isPanelOpen={isReservationPanelOpen} onClick={handlePanelToggleClick} />
              </section>
            )}
          </section>
        </div>
      </section>
    </>
  );
};

export default PostDetailContent;
