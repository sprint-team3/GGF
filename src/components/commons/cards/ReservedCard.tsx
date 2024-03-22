import Image from 'next/image';
import Link from 'next/link';

import { MouseEvent } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { MyReservations } from '@/apis/myReservations';
import { SVGS } from '@/constants';
import { isExpirationDate, getFormatDate } from '@/utils';

import Badge from '@/components/commons/Badge';
import { CardButton } from '@/components/commons/buttons';
import { CommonModal, ConfirmModal, ModalButton } from '@/components/commons/modals';
import Tag from '@/components/commons/Tag';
import ReviewModalContent from '@/components/mypage/MyReservations/ReviewModalContent';
import useMultiState from '@/hooks/useMultiState';

import { MyReservationsStatus, ReservedPostTypesEN, GameNameKR } from '@/types';

import styles from './ReservedCard.module.scss';

const cx = classNames.bind(styles);
const { location, calendar } = SVGS;

export type ReservedCardProps = {
  reservationId: number;
  path: string;
  status: MyReservationsStatus | string;
  postType: ReservedPostTypesEN | string;
  title: string;
  address: string;
  category: GameNameKR | string;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
};

export const ReservedCard = ({
  reservationId,
  path,
  status,
  postType,
  title,
  address,
  category,
  date,
  startTime,
  endTime,
  createdAt,
}: ReservedCardProps) => {
  const { multiState, toggleClick } = useMultiState(['cancelReservationModal', 'submitReviewModal']);
  const isOffline = postType === 'offline';
  const isPending = status === 'pending';
  const isReviewWritable = status === 'completed' && isExpirationDate(date, endTime);
  const MyReservationDate = `${date} | ${startTime}-${endTime}`;

  const queryClient = useQueryClient();
  const { mutate: cancelReservationMutation } = useMutation({
    mutationFn: MyReservations.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myReservations', reservationId] });
    },
  });

  const handleModalToggleClick = (modalKey: string) => {
    toggleClick(modalKey);
  };

  const handleButtonClick = (event: MouseEvent, modalKey: string) => {
    event.preventDefault();
    toggleClick(modalKey);
  };

  const handleCancelReservation = (reservationId: number, modalKey: string) => {
    cancelReservationMutation(reservationId);
    toggleClick(modalKey);
  };

  return (
    <>
      <article className={cx('card')}>
        <Link href={path} className={cx('card-inner')}>
          <div className={cx('card-content')}>
            <div className={cx('card-content-label')}>
              <div className={cx('card-content-label-category')}>
                <Badge status={status} />
                <Tag postType={postType} />
                <span className={cx('card-content-label-category-game')}>{category}</span>
              </div>
            </div>
            <h2 className={cx('card-content-title')}>{title}</h2>
            {isOffline && (
              <div className={cx('card-content-location')}>
                <Image src={location.default.url} alt={location.default.alt} width={18} height={18} />
                <span className={cx('card-content-location-address')}>{address}</span>
              </div>
            )}
            <div className={cx('card-content-calendar')}>
              <Image src={calendar.default.url} alt={calendar.default.alt} width={20} height={20} />
              <span className={cx('card-content-calendar-date')}>{getFormatDate(createdAt)}</span>
            </div>
          </div>
          <div className={cx('card-button')}>
            {isPending && (
              <CardButton color='red' onClick={(event) => handleButtonClick(event, 'cancelReservationModal')}>
                취소
              </CardButton>
            )}
            {isReviewWritable && (
              <CardButton onClick={(event) => handleButtonClick(event, 'submitReviewModal')}>리뷰</CardButton>
            )}
          </div>
        </Link>
      </article>

      <ConfirmModal
        warning
        openModal={multiState.cancelReservationModal}
        onClose={() => handleModalToggleClick('cancelReservationModal')}
        state='STOP'
        title='예약을 취소하시겠습니까?'
        desc='한 번 취소한 예약은 되돌릴 수 없습니다'
        renderButton={
          <>
            <ModalButton
              variant='warning'
              onClick={() => handleCancelReservation(reservationId, 'cancelReservationModal')}
            >
              예약 취소
            </ModalButton>
            <ModalButton onClick={() => handleModalToggleClick('cancelReservationModal')}>닫기</ModalButton>
          </>
        }
      ></ConfirmModal>

      <CommonModal
        openModal={multiState.submitReviewModal}
        onClose={() => handleModalToggleClick('submitReviewModal')}
        title='리뷰 등록'
        renderContent={
          <ReviewModalContent
            reservationId={reservationId}
            title={title}
            date={MyReservationDate}
            handleModalClose={toggleClick}
          />
        }
      />
    </>
  );
};
