import classNames from 'classnames/bind';

import { getCalendarDates, getDateRange } from '@/utils';

import CalendarItem from '@/components/calendar/CalendarItem';
import { ONE_WEEK } from '@/constants/date';

import styles from './CalendarBody.module.scss';

const cx = classNames.bind(styles);

const NUM_OF_WEEKDAY = 5;
const START_OF_MONTH = 1;

type CalendarBodyProps = {
  today: {
    year: number;
    month: number;
    day: number;
  };
  currentYear: number;
  currentMonth: number;
};

const CalendarBody = ({ today, currentYear, currentMonth }: CalendarBodyProps) => {
  const { startOfCalendar, endOfPrevMonth, endOfThisMonth, endOfCalendar } = getCalendarDates(
    currentYear,
    currentMonth,
  );

  const prevMonthDates = startOfCalendar !== START_OF_MONTH ? getDateRange(startOfCalendar, endOfPrevMonth) : [];
  const thisMonthDates = getDateRange(START_OF_MONTH, endOfThisMonth);
  const nextMonthDates = endOfCalendar !== endOfThisMonth ? getDateRange(START_OF_MONTH, endOfCalendar) : [];

  const isToday = (date: number) => currentYear === today.year && currentMonth === today.month && date === today.day;

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
      <div className={cx('calendar-body-dates')}>
        {prevMonthDates.map((date, index) => (
          <div className={cx('date-item')} key={`date-prev-${index}`}>
            <CalendarItem date={date} isDisabled />
          </div>
        ))}
        {thisMonthDates.map((date, index) => (
          <div className={cx('date-item', 'hover')} key={`date-${index}`}>
            <CalendarItem date={date} isToday={isToday(date)} />
          </div>
        ))}
        {nextMonthDates.map((date, index) => (
          <div className={cx('date-item')} key={`date-next-${index}`}>
            <CalendarItem date={date} isDisabled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarBody;
