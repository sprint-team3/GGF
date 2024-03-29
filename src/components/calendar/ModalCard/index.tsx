import { Fragment } from 'react';

import classNames from 'classnames/bind';

import Badge from '@/components/commons/Badge';
import { BaseButton } from '@/components/commons/buttons';

import { ReservationStatus } from '@/types';

import styles from './ModalCard.module.scss';

const cx = classNames.bind(styles);

type ModalCardProps = {
  scheduleId: number;
  reservationId: number;
  nickName: string;
  headCount: number;
  status: ReservationStatus;
  onClickButton: (scheduleId: number, reservationId: number, status: ReservationStatus) => void;
};

const ModalCard = ({ scheduleId, reservationId, nickName, headCount, status, onClickButton }: ModalCardProps) => {
  const handleClickDeclineButton = () => {
    onClickButton(scheduleId, reservationId, 'declined');
  };

  const handleClickConfirmButton = () => {
    onClickButton(scheduleId, reservationId, 'confirmed');
  };

  return (
    <div className={cx('modal-card-container')}>
      <div className={cx('modal-card-text')}>
        <div className={cx('modal-card-text-line')}>
          <span className={cx('modal-card-text-title')}>닉네임</span>
          <span className={cx('modal-card-text-value')}>{nickName}</span>
        </div>
        <div className={cx('modal-card-text-line')}>
          <span className={cx('modal-card-text-title')}>인원</span>
          <span className={cx('modal-card-text-value')}>{headCount}명</span>
        </div>
      </div>
      <div className={cx('modal-card-button')}>
        {status === 'pending' ? (
          <Fragment>
            <BaseButton theme='outline' size='small' onClick={handleClickDeclineButton}>
              거절
            </BaseButton>
            <BaseButton theme='ghost' size='small' onClick={handleClickConfirmButton}>
              승인
            </BaseButton>
          </Fragment>
        ) : (
          <Badge status={status} />
        )}
      </div>
    </div>
  );
};

export default ModalCard;
