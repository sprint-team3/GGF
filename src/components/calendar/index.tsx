import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { getCurrentDate } from '@/utils';

import CalendarBody from '@/components/calendar/CalendarBody';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import ListBody from '@/components/calendar/ListBody';
import { useDeviceType } from '@/hooks/useDeviceType';

import styles from './Calendar.module.scss';

const cx = classNames.bind(styles);

type CalendarProps = {
  gameId: number;
};

const MONTH_START = 1;
const MONTH_END = 12;

const today = getCurrentDate();

const Calendar = ({ gameId }: CalendarProps) => {
  const [isCalendar, setIsCalendar] = useState(true);
  const [currentYear, setCurrentYear] = useState(today.year);
  const [currentMonth, setCurrentMonth] = useState(today.month);

  const currentDeviceType = useDeviceType();

  const handleChangeMonth = (addNumber: number) => {
    const newMonth = currentMonth + addNumber;
    const isYearChanged = newMonth < MONTH_START || newMonth > MONTH_END;

    if (isYearChanged) {
      setCurrentYear(currentYear + addNumber);
      setCurrentMonth(Math.abs(newMonth - MONTH_END));

      return;
    }

    setCurrentMonth(newMonth);
  };

  useEffect(() => {
    if (currentDeviceType !== 'PC') setIsCalendar(false);
  }, [currentDeviceType]);

  console.log(gameId);

  return (
    <div className={cx('calendar-container')}>
      <CalendarHeader
        currentYear={currentYear}
        currentMonth={currentMonth}
        onChangeMonth={handleChangeMonth}
        isCalendar={isCalendar}
        setIsCalendar={setIsCalendar}
      />
      {isCalendar ? <CalendarBody currentYear={currentYear} currentMonth={currentMonth} /> : <ListBody />}
    </div>
  );
};

export default Calendar;
