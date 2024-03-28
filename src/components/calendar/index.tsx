import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { getCurrentDate, getScheduleByDate } from '@/utils';

import CalendarBody from '@/components/calendar/CalendarBody';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import ListBody from '@/components/calendar/ListBody';
import ModalContents from '@/components/calendar/ModalContents';
import { CommonModal } from '@/components/commons/modals';
import MockMonthlySchedule1 from '@/constants/mockData/myScheduleMockDataMonth1.json';
import MockMonthlySchedule2 from '@/constants/mockData/myScheduleMockDataMonth2.json';
import MockMonthlySchedule3 from '@/constants/mockData/myScheduleMockDataMonth3.json';
import MockMonthlySchedule4 from '@/constants/mockData/myScheduleMockDataMonth4.json';
import { useDeviceType } from '@/hooks/useDeviceType';
import useMultiState from '@/hooks/useMultiState';

import { MonthlyReservationResponse } from '@/types';

import styles from './Calendar.module.scss';

const cx = classNames.bind(styles);

const MONTH_START = 1;
const MONTH_END = 12;

const getMonthlyMockData = (year: number, month: number) => {
  const yearText = year.toString();
  const monthText = month.toString().padStart(2, '0');

  const MonthlyMockData: Record<string, MonthlyReservationResponse[]> = {
    '2024/01': MockMonthlySchedule1,
    '2024/02': MockMonthlySchedule2,
    '2024/03': MockMonthlySchedule3,
    '2024/04': MockMonthlySchedule4,
  };

  return MonthlyMockData[`${yearText}/${monthText}`];
};

type CalendarProps = {
  gameId: number;
};

const Calendar = ({ gameId }: CalendarProps) => {
  const today = getCurrentDate();

  const [isCalendar, setIsCalendar] = useState(true);
  const [currentYear, setCurrentYear] = useState(today.year);
  const [currentMonth, setCurrentMonth] = useState(today.month);
  const [monthlySchedule, setMonthlySchedule] = useState<MonthlyReservationResponse[]>([]);
  const [activeDate, setActiveDate] = useState('');

  const { multiState, toggleClick } = useMultiState(['scheduleModal, confirmModal']);
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

  const handleScheduleClick = (date: string) => {
    setActiveDate(date);
    toggleClick('scheduleModal');
  };

  useEffect(() => {
    if (currentDeviceType !== 'PC') setIsCalendar(false);
  }, [currentDeviceType]);

  useEffect(() => {
    const scheduleData = getMonthlyMockData(currentYear, currentMonth);

    setMonthlySchedule(scheduleData);
  }, [currentYear, currentMonth]);

  return (
    <>
      <div className={cx('calendar-container')}>
        <CalendarHeader
          currentYear={currentYear}
          currentMonth={currentMonth}
          onChangeMonth={handleChangeMonth}
          isCalendar={isCalendar}
          setIsCalendar={setIsCalendar}
        />
        {isCalendar ? (
          <CalendarBody
            today={today}
            currentYear={currentYear}
            currentMonth={currentMonth}
            schedules={getScheduleByDate(monthlySchedule)}
            onClick={handleScheduleClick}
          />
        ) : (
          <ListBody schedules={monthlySchedule} onClick={handleScheduleClick} />
        )}
      </div>
      <CommonModal
        openModal={multiState.scheduleModal}
        onClose={() => toggleClick('scheduleModal')}
        title={'예약 정보'}
        renderContent={
          <ModalContents gameId={gameId} activeDate={activeDate} onClick={() => toggleClick('scheduleModal')} />
        }
      />
    </>
  );
};

export default Calendar;
