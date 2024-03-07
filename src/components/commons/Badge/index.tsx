import classNames from 'classnames/bind';

import { formatStatusToKorea } from '@/utils';

import { MyReservationsStatus } from '@/types';

import styles from './Badge.module.scss';

const cx = classNames.bind(styles);

type BadgeProps = {
  status: MyReservationsStatus;
};

const Badge = ({ status }: BadgeProps) => {
  return <div className={cx(`badge-${status}`)}>{formatStatusToKorea(status)}</div>;
};

export default Badge;
