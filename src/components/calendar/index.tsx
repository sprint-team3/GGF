import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getMyActivitiesDailyReservationList, getMyActivitiesMonthlyReservationList } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { getCurrentDate, getScheduleByDate, getScheduleDropdownOption, getStatusCountByScheduleId } from '@/utils';

import CalendarBody from '@/components/calendar/CalendarBody';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import ListBody from '@/components/calendar/ListBody';
import ModalContents from '@/components/calendar/ModalContents';
import { CommonModal, ConfirmModal, ModalButton } from '@/components/commons/modals';
import { useDeviceType } from '@/hooks/useDeviceType';
import useMultiState from '@/hooks/useMultiState';

import styles from './Calendar.module.scss';

const cx = classNames.bind(styles);

const MONTH_START = 1;
const MONTH_END = 12;

type CalendarProps = {
  gameId: number;
};

const Calendar = ({ gameId }: CalendarProps) => {
  const today = getCurrentDate();

  const [isCalendar, setIsCalendar] = useState(true);
  const [currentYear, setCurrentYear] = useState(today.year);
  const [currentMonth, setCurrentMonth] = useState(today.month);
  const [activeDate, setActiveDate] = useState('');
  const [confirmText, setConfirmText] = useState('승인');

  const { multiState, toggleClick } = useMultiState(['scheduleModal, confirmModal']);
  const currentDeviceType = useDeviceType();

  const yearString = currentYear.toString();
  const monthString = currentMonth.toString().padStart(2, '0');

  const { data: monthlySchedule } = useQuery({
    queryKey: QUERY_KEYS.myActivities.getMonthlyReservationList(gameId, yearString, monthString),
    queryFn: () => getMyActivitiesMonthlyReservationList(gameId, yearString, monthString),
  });

  const { data: dailySchedules, isSuccess } = useQuery({
    queryKey: QUERY_KEYS.myActivities.getDailyReservationList(gameId, activeDate),
    queryFn: () => getMyActivitiesDailyReservationList(gameId, activeDate),
    enabled: !!activeDate,
  });

  const dropdownOptions = getScheduleDropdownOption(dailySchedules);
  const statusCountByScheduleId = getStatusCountByScheduleId(dailySchedules);

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

  const handleConfirmClick = (text: string) => {
    setConfirmText(text);
    toggleClick('confirmModal');
  };

  useEffect(() => {
    if (currentDeviceType !== 'PC') setIsCalendar(false);
  }, [currentDeviceType]);

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
      {isSuccess && (
        <CommonModal
          openModal={multiState.scheduleModal}
          onClose={() => toggleClick('scheduleModal')}
          title={'예약 정보'}
          isResponsive
          renderContent={
            <ModalContents
              gameId={gameId}
              activeDate={activeDate}
              dropdownOptions={dropdownOptions}
              statusCountByScheduleId={statusCountByScheduleId}
              onClickCloseButton={() => toggleClick('scheduleModal')}
              onClickCardButton={handleConfirmClick}
            />
          }
        />
      )}
      <ConfirmModal
        warning
        openModal={multiState.confirmModal}
        onClose={() => toggleClick('confirmModal')}
        state='WARNING'
        title={`예약 신청을 ${confirmText}하시겠습니까?`}
        desc={`한번 ${confirmText}한 예약은 되돌릴 수 없습니다.`}
        renderButton={
          <>
            <ModalButton variant='warning' onClick={() => toggleClick('confirmModal')}>
              확인
            </ModalButton>
            <ModalButton onClick={() => toggleClick('confirmModal')}>취소</ModalButton>
          </>
        }
      />
    </>
  );
};

export default Calendar;
