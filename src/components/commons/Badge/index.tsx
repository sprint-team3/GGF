import classNames from 'classnames/bind';

import { formatStatusToKR } from '@/utils';

import { MyReservationsStatus } from '@/types';

import styles from './Badge.module.scss';

const cx = classNames.bind(styles);

type BadgeProps = {
  status: MyReservationsStatus | string;
};

const Badge = ({ status }: BadgeProps) => {
  return <div className={cx(`badge-${status}`)}>{formatStatusToKR(status)}</div>;
};

export default Badge;
