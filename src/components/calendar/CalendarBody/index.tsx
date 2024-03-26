import classNames from 'classnames/bind';

import { ONE_WEEK } from '@/constants/date';

import styles from './CalendarBody.module.scss';

const cx = classNames.bind(styles);

const NUM_OF_WEEKDAY = 5;

const CalendarBody = () => {
  return (
    <div className={cx('calendar-body-container')}>
      <ul className={cx('calendar-body-week')}>
        {ONE_WEEK.map((day, index) => {
          const isWeekends = index >= NUM_OF_WEEKDAY;

          return (
            <li className={cx('calendar-body-day', { weekends: isWeekends })} key={`day-${index}`}>
              {day}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CalendarBody;
