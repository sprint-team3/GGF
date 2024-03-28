import { Fragment } from 'react';

import classNames from 'classnames/bind';

import Badge from '@/components/commons/Badge';
import { BaseButton } from '@/components/commons/buttons';

import { MyReservationsStatus } from '@/types';

import styles from './ModalCard.module.scss';

const cx = classNames.bind(styles);

type ModalCardProps = {
  nickName: string;
  headCount: number;
  status: MyReservationsStatus;
};

const ModalCard = ({ nickName, headCount, status }: ModalCardProps) => {
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
            <BaseButton theme='outline' size='small'>
              거절
            </BaseButton>
            <BaseButton theme='ghost' size='small'>
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
