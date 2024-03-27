import classNames from 'classnames/bind';

import ScheduleBadge from '@/components/calendar/ScheduleBadge';
import { SCHEDULE_ORDER } from '@/constants/date';

import { MonthlyReservationCount } from '@/types';

import styles from './CalendarItem.module.scss';

const cx = classNames.bind(styles);

type CalendarItemProps = {
  date: number;
  isToday?: boolean;
  isDisabled?: boolean;
  reservations?: MonthlyReservationCount;
};

const CalendarItem = ({ date, isToday, isDisabled, reservations }: CalendarItemProps) => {
  const hasReservation = reservations !== undefined;

  return (
    <div className={cx('calendar-item', { disabled: isDisabled }, { clickable: hasReservation })}>
      <div className={cx('calendar-number-area')}>
        <span className={cx('calendar-number', { today: isToday })}>{date}</span>
      </div>
      <ul className={cx('calendar-badge-area')}>
        {SCHEDULE_ORDER.map((status) =>
          reservations?.[status] ? (
            <li key={`badge-${status}`}>
              <ScheduleBadge type={status} count={reservations[status]} />
            </li>
          ) : undefined,
        )}
      </ul>
    </div>
  );
};

export default CalendarItem;
