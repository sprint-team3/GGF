import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { formatCategoryToGameNameEN, splitDescByDelimiter, splitTitleByDelimiter } from '@/utils';

import ConfirmScheduleButton from '../ConfirmScheduleButton';
import ReservationPanel from '../reservationPanel/ReservationPanel';

import Banner from '@/components/layout/Banner';
import DefaultBanner from '@/components/postDetail/DefaultBanner';
import ImageSlide from '@/components/postDetail/ImageSlide';
import MapPreview from '@/components/postDetail/MapPreview';
import PostDescription from '@/components/postDetail/PostDesciption';
import PostTitle from '@/components/postDetail/PostTitle';
import ReviewList from '@/components/postDetail/ReviewList';
import { POST_DETAIL_DATA } from '@/constants/mockData/postDetail';
import { REVIEW_LIST_DATA } from '@/constants/mockData/reviewList';
import { useDeviceType } from '@/hooks/useDeviceType';

import styles from './PostDetailContent.module.scss';

const cx = classNames.bind(styles);

const {
  title: unrefinedTitle,
  description: unrefinedDescription,
  category,
  price,
  address,
  bannerImageUrl,
  subImageUrls,
} = POST_DETAIL_DATA;

const nickname = '주인장';
const email = 'test@test.com';

const PostContent = () => {
  const isImageSlide = subImageUrls.length > 0;
  const imageUrls = isImageSlide
    ? [bannerImageUrl, ...subImageUrls.map((item: { id: number; imageUrl: string }) => item.imageUrl)]
    : [bannerImageUrl];

  const isOffline = price === 0;
  const isOnline = price === 1;
  const isStrategy = price === 3;
  const isReservationAvailable = isOffline || isOnline;

  const { title } = splitTitleByDelimiter(unrefinedTitle);
  const { description, discordLink } = splitDescByDelimiter(unrefinedDescription);

  const router = useRouter();
  const currentDeviceType = useDeviceType();

  const isTablet = currentDeviceType === 'Tablet';
  const isMobile = currentDeviceType === 'Mobile';

  const { postId } = router.query;
  const activityId = Number(postId);

  const [isReservationPanelOpen, setIsReservationPanelOpen] = useState(true);

  const handlePanelToggleClick = () => {
    setIsReservationPanelOpen((prev) => !prev);
  };

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
              {isReservationAvailable && <ReviewList list={REVIEW_LIST_DATA} nickname={nickname} email={email} />}
            </section>
            {isReservationAvailable && (
              <section>
                {isReservationPanelOpen && (
                  <ReservationPanel isLoggedIn activityId={activityId} maxCount={3} onClick={handlePanelToggleClick} />
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

export default PostContent;
