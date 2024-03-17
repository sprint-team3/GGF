import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';
import { isExpirationDate, getFormatDate } from '@/utils';

import Badge from '@/components/commons/Badge';
import { BaseButton } from '@/components/commons/buttons';
import { CommonModal, ConfirmModal, ModalButton } from '@/components/commons/modals';
import Tag from '@/components/commons/Tag';
import { useDeviceType } from '@/hooks/useDeviceType';
import useMultiState from '@/hooks/useMultiState';

import { MyReservationsStatus, GameNameKR, PostTypes } from '@/types';

import styles from './CardCommonStyle.module.scss';

const cx = classNames.bind(styles);
const { location, calendar } = SVGS;

export type ReservedCardProps = {
  path: string;
  status: MyReservationsStatus;
  postType: PostTypes;
  title: string;
  address: string;
  createdAt: string;
  category: GameNameKR;
  date: string;
  endTime: string;
};

const ReservedCard = ({
  path,
  status,
  postType,
  title,
  address,
  category,
  createdAt,
  date,
  endTime,
}: ReservedCardProps) => {
  const { multiState, toggleClick } = useMultiState(['cancelReservationModal', 'submitReviewModal']);
  const currentDeviceType = useDeviceType();
  const isMobile = currentDeviceType === 'Mobile';
  const isOffline = postType === 'offline';
  const isPending = status === 'pending';
  const isReviewWritable = status === 'completed' && isExpirationDate(date, endTime);

  const handleCommonModal = (modalKey: string) => {
    toggleClick(modalKey);
  };

  return (
    <>
      <article className={cx('card')}>
        <Link href={path} className={cx('card-inner')}>
          <div className={cx('card-content')}>
            <header className={cx('card-content-header')}>
              <div className={cx('card-content-header-category')}>
                <Badge status={status} />
                <Tag postType={postType} />
                <span className={cx('card-content-header-category-game')}>{category}</span>
              </div>
            </header>
            <h2 className={cx('card-content-title')}>{title}</h2>
            {isOffline && (
              <div className={cx('card-content-location')}>
                <Image src={location.default.url} alt={location.default.alt} width={18} height={18} />
                <span className={cx('card-content-location-address')}>{address}</span>
              </div>
            )}
          </div>
          <footer className={cx('card-footer', 'reserved-footer')}>
            <div className={cx('card-footer-calendar')}>
              <Image src={calendar.default.url} alt={calendar.default.alt} width={20} height={20} />
              <span className={cx('card-footer-calendar-date')}>{getFormatDate(createdAt)}</span>
            </div>
            {isPending && (
              <div className={cx('card-footer-button')}>
                <BaseButton
                  size={isMobile ? 'large' : 'small'}
                  theme='ghost'
                  color='red'
                  onClick={() => handleCommonModal('cancelReservationModal')}
                >
                  취소
                </BaseButton>
              </div>
            )}
            {isReviewWritable && (
              <div className={cx('card-footer-button')}>
                <BaseButton
                  size={isMobile ? 'large' : 'small'}
                  theme='ghost'
                  onClick={() => handleCommonModal('submitReviewModal')}
                >
                  리뷰
                </BaseButton>
              </div>
            )}
          </footer>
        </Link>
      </article>

      <ConfirmModal
        warning
        openModal={multiState.cancelReservationModal}
        onClose={() => handleCommonModal('cancelReservationModal')}
        state='STOP'
        title='예약을 취소하시겠습니까?'
        desc='한 번 취소한 예약은 되돌릴 수 없습니다'
      >
        <ModalButton variant='warning' onClick={() => handleCommonModal('cancelReservationModal')}>
          예약 취소
        </ModalButton>
        <ModalButton onClick={() => handleCommonModal('cancelReservationModal')}>닫기</ModalButton>
      </ConfirmModal>

      <CommonModal
        openModal={multiState.submitReviewModal}
        onClose={() => handleCommonModal('submitReviewModal')}
        title='리뷰 등록'
        renderContent='review content'
      />
    </>
  );
};

export default ReservedCard;
