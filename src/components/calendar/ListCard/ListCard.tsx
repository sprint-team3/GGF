import classNames from 'classnames/bind';

import { getDay, getSeparatedDate } from '@/utils';

import ScheduleBadge from '@/components/calendar/ScheduleBadge';
import { DAYS, MONTHS, SCHEDULE_ORDER } from '@/constants/date';

import { MonthlyReservationCount } from '@/types';

import styles from './ListCard.module.scss';

const cx = classNames.bind(styles);

type ListCardProps = {
  date: string;
  reservations: MonthlyReservationCount;
};

const ListCard = ({ date, reservations }: ListCardProps) => {
  const { year, month, date: dateNumber } = getSeparatedDate(date);

  return (
    <div className={cx('card-container')}>
      <div className={cx('card-header')}>
        <span>{DAYS[getDay(date)]}</span>
        <span className={cx('card-date')}>
          {MONTHS[month]} {dateNumber}, {year}
        </span>
      </div>
      <div className={cx('card-body')}>
        <ul className={cx('card-badge-area')}>
          {SCHEDULE_ORDER.map((status) =>
            reservations?.[status] ? (
              <li key={`badge-${status}`}>
                <ScheduleBadge type={status} count={reservations[status]} />
              </li>
            ) : undefined,
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListCard;
