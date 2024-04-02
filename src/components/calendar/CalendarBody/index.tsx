import classNames from 'classnames/bind';

import { getCalendarDates, getDateRange, getJoinedDateString } from '@/utils';

import CalendarItem from '@/components/calendar/CalendarItem';
import { CALENDAR_WEEKS } from '@/constants/date';

import { ReservationsByDate } from '@/types';

import styles from './CalendarBody.module.scss';

const cx = classNames.bind(styles);

const START_OF_MONTH = 1;

type CalendarBodyProps = {
  today: {
    year: number;
    month: number;
    date: number;
  };
  currentYear: number;
  currentMonth: number;
  schedules?: ReservationsByDate;
  onClick: (date: string) => void;
};

const CalendarBody = ({ today, currentYear, currentMonth, schedules, onClick }: CalendarBodyProps) => {
  const { startOfCalendar, endOfPrevMonth, endOfThisMonth, endOfCalendar } = getCalendarDates(
    currentYear,
    currentMonth,
  );

  const prevMonthDates = startOfCalendar !== START_OF_MONTH ? getDateRange(startOfCalendar, endOfPrevMonth) : [];
  const thisMonthDates = getDateRange(START_OF_MONTH, endOfThisMonth);
  const nextMonthDates = endOfCalendar !== endOfThisMonth ? getDateRange(START_OF_MONTH, endOfCalendar) : [];

  const isToday = (date: number) => currentYear === today.year && currentMonth === today.month && date === today.date;

  return (
    <div className={cx('calendar-body-container')}>
      <ul className={cx('calendar-body-week')}>
        {CALENDAR_WEEKS.map((day) => {
          const isWeekends = day === 'SUNDAY';

          return (
            <li className={cx('calendar-body-day', { weekends: isWeekends })} key={`day-${day}`}>
              {day}
            </li>
          );
        })}
      </ul>
      <ul className={cx('calendar-body-dates')}>
        {prevMonthDates.map((date, index) => (
          <li className={cx('date-item')} key={`date-prev-${index}`}>
            <CalendarItem date={date} isDisabled />
          </li>
        ))}
        {thisMonthDates.map((date, index) => {
          const formattedDate = getJoinedDateString(currentYear, currentMonth, date);
          const hasReservation = schedules?.[formattedDate] !== undefined;
          const handleClick = () => {
            if (!hasReservation) return;
            onClick(formattedDate);
          };

          return (
            <li className={cx('date-item', 'hover')} key={`date-${index}`}>
              <button className={cx('date-item-button', { clickable: hasReservation })} onClick={handleClick}>
                <CalendarItem date={date} isToday={isToday(date)} reservations={schedules?.[formattedDate]} />
              </button>
            </li>
          );
        })}
        {nextMonthDates.map((date, index) => (
          <li className={cx('date-item')} key={`date-next-${index}`}>
            <CalendarItem date={date} isDisabled />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarBody;
