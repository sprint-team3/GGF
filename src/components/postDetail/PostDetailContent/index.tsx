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
import { useDeviceType } from '@/hooks/useDeviceType';
import useUserStore from '@/stores/useUserStore';

import styles from './PostDetailContent.module.scss';

const cx = classNames.bind(styles);

const PostDetailContent = ({ isLoggedIn }: PostPageProps) => {
  const { userData } = useUserStore();
  const userId = userData?.id;

  const router = useRouter();
  const { postId } = router.query;
  const activityId = Number(postId);

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

  const { data: postDetailData } = useQuery({
    queryKey: [QUERY_KEYS.activities.get, activityId],
    queryFn: getActivityDetail,
  });

  const { data: reviewListData } = useQuery({
    queryKey: [QUERY_KEYS.activities.getReviewList, activityId],
    queryFn: getReviewList,
  });

  const postUserId = postDetailData?.userId || 0;
  const unrefinedTitle = postDetailData?.title || '';
  const subImages = postDetailData?.subImages || [];
  const bannerImageUrl = postDetailData?.bannerImageUrl || '';
  const category = postDetailData?.category || '';
  const price = postDetailData?.price || 0;
  const unrefinedDescription = postDetailData?.description || '';
  const address = postDetailData?.address || '';

  const isImageSlide = subImages?.length > 0;
  const imageUrls = isImageSlide
    ? [bannerImageUrl, ...subImages.map((item: { id: number; imageUrl: string }) => item.imageUrl)]
    : [bannerImageUrl];

  const isOffline = price === 0;
  const isOnline = price === 1;
  const isStrategy = price === 3;
  const isReservationAvailable = isOffline || isOnline;

  const { title, MaxCount } = splitTitleByDelimiter(unrefinedTitle);
  const { description, profileImageUrl, nickname, email, discordLink } = splitDescByDelimiter(unrefinedDescription);

  return (
    <>
      <section className={cx('main-banner')}>
        <Banner />
      </section>
      <section className={cx('main-section')}>
        <div className={cx('container')}>
          <section className={cx('section-top')}>
            <PostTitle price={price} title={title} />
            {isImageSlide && imageUrls ? (
              <ImageSlide imageList={imageUrls} />
            ) : (
              <DefaultBanner url={bannerImageUrl} price={price} gameName={formatCategoryToGameNameEN(category)} />
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
              {isReservationAvailable && reviewListData && (
                <ReviewList list={reviewListData} profileImageUrl={profileImageUrl} nickname={nickname} email={email} />
              )}
            </section>
            {postUserId !== userId && isReservationAvailable && (
              <section>
                {isReservationPanelOpen && (
                  <ReservationPanel
                    isLoggedIn={isLoggedIn}
                    activityId={activityId}
                    maxCount={+MaxCount}
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
