import classNames from 'classnames/bind';

import { MY_RESERVATIONS_STATUS } from '@/constants';

import { MonthlyReservationCount } from '@/types';

import styles from './ScheduleBadge.module.scss';

const cx = classNames.bind(styles);

type ScheduleBadgeProps = {
  type: keyof MonthlyReservationCount;
  count: number;
};

const ScheduleBadge = ({ type, count }: ScheduleBadgeProps) => {
  return (
    <div className={cx('badge-wrapper')}>
      <div className={cx('badge-circle', type)} />
      <div className={cx('badge-text', type)}>
        <span>{MY_RESERVATIONS_STATUS[type]}</span>
        <span className={cx('badge-count')}>{count}</span>
      </div>
    </div>
  );
};

export default ScheduleBadge;
