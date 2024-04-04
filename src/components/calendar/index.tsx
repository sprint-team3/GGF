import { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import {
  editMyActivitiesReservationStatus,
  getMyActivitiesDailyReservationList,
  getMyActivitiesMonthlyReservationList,
} from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { MY_RESERVATIONS_STATUS } from '@/constants';
import { getCurrentDate, getScheduleByDate, getScheduleDropdownOption, getStatusCountByScheduleId } from '@/utils';

import CalendarBody from '@/components/calendar/CalendarBody';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import ListBody from '@/components/calendar/ListBody';
import ModalContents from '@/components/calendar/ModalContents';
import { CustomCommonModal, ConfirmModal, ModalButton } from '@/components/commons/modals';
import { useDeviceType } from '@/hooks/useDeviceType';
import useMultiState from '@/hooks/useMultiState';

import { ReservationStatus } from '@/types';

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
  const [reservationId, setReservationId] = useState<number>();
  const [reservationStatus, setReservationStatus] = useState<ReservationStatus>('pending');
  const [scheduleId, setScheduleId] = useState<number>();

  const { multiState, toggleClick } = useMultiState(['scheduleModal', 'confirmModal', 'errorModal']);
  const currentDeviceType = useDeviceType();

  const modalRef = useRef<HTMLDivElement>(null);

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

  const queryClient = useQueryClient();
  const { mutate: changeStatusMutation } = useMutation({
    mutationFn: editMyActivitiesReservationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.myActivities.getMonthlyReservationList(gameId, yearString, monthString),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.myActivities.getDailyReservationList(gameId, activeDate),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.myActivities.getDetailReservationList(gameId, scheduleId!, 'pending'),
      });
    },
    onError: () => handleToggleErrorModal(),
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

    handleToggleScheduleModal();
  };

  const handleConfirmClick = (scheduleId: number, reservationId: number, status: ReservationStatus) => {
    setScheduleId(scheduleId);
    setReservationId(reservationId);
    setReservationStatus(status);

    handleToggleScheduleModal();
    handleToggleConfirmModal();
  };

  const handleChangeReservationStatus = () => {
    changeStatusMutation({ activityId: gameId, reservationId: reservationId!, status: { status: reservationStatus } });
    handleToggleConfirmModal();
  };

  const handleToggleScheduleModal = () => {
    toggleClick('scheduleModal');
  };

  const handleToggleConfirmModal = () => {
    toggleClick('confirmModal');
  };

  const handleToggleErrorModal = () => {
    toggleClick('errorModal');
  };

  useEffect(() => {
    if (currentDeviceType !== 'PC') setIsCalendar(false);
  }, [currentDeviceType]);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!modalRef.current || modalRef.current.contains(event.target as Node)) return;
      handleToggleScheduleModal();
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [modalRef, handleToggleScheduleModal]);

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
        {isSuccess && dropdownOptions.length !== 0 && (
          <CustomCommonModal
            openModal={multiState.scheduleModal}
            onClose={handleToggleScheduleModal}
            title={'예약 정보'}
            isCalendar={isCalendar}
            modalRef={modalRef}
            renderContent={
              <ModalContents
                gameId={gameId}
                activeDate={activeDate}
                dropdownOptions={dropdownOptions}
                statusCountByScheduleId={statusCountByScheduleId}
                onClickCloseButton={handleToggleScheduleModal}
                onClickCardButton={handleConfirmClick}
              />
            }
          />
        )}
      </div>
      <ConfirmModal
        warning
        openModal={multiState.confirmModal}
        onClose={handleToggleConfirmModal}
        state='CONFIRM'
        title={`예약 신청을 ${MY_RESERVATIONS_STATUS[reservationStatus]}하시겠습니까?`}
        desc={`한번 ${MY_RESERVATIONS_STATUS[reservationStatus]}한 예약은 되돌릴 수 없습니다`}
        renderButton={
          <>
            <ModalButton variant='warning' onClick={handleChangeReservationStatus}>
              확인
            </ModalButton>
            <ModalButton onClick={handleToggleConfirmModal}>취소</ModalButton>
          </>
        }
      />
      <ConfirmModal
        warning
        openModal={multiState.errorModal}
        onClose={handleToggleErrorModal}
        state='ERROR'
        title={`예약 ${MY_RESERVATIONS_STATUS[reservationStatus]}에 실패하였습니다.`}
        renderButton={<ModalButton onClick={handleToggleErrorModal}>닫기</ModalButton>}
      ></ConfirmModal>
    </>
  );
};

export default Calendar;
