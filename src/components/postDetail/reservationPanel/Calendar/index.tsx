import Image from 'next/image';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import dayjs from 'dayjs';

import { SVGS } from '@/constants';
import { formatPadWithZero, getMonthString } from '@/utils';

import { useGetScheduleList } from '@/components/postDetail/reservationPanel/Calendar/data-access/useGetScheduleList';
import NoAvailableSchedule from '@/components/postDetail/reservationPanel/NoAvailableSchedule';
import useToggleButton from '@/hooks/useToggleButton';

import { ReservationAvailableSchedule, AvailableScheduleTimes, AvailableTimesOptions } from '@/types';

import styles from './Calendar.module.scss';

const cx = classNames.bind(styles);
const { left, right } = SVGS.arrow;
const MAX_RESERVATION_DATE = 30;

type CalenderProps = {
  activityId: number;
  setAvailableTimes: Dispatch<SetStateAction<AvailableTimesOptions[]>>;
  setIsNoSchedule: Dispatch<SetStateAction<boolean>>;
};

const Calendar = ({ activityId, setAvailableTimes, setIsNoSchedule }: CalenderProps) => {
  const { isVisible: arrowLeftHover, handleToggleClick: arrowLeftClick } = useToggleButton();
  const { isVisible: arrowRightHover, handleToggleClick: arrowRightClick } = useToggleButton();

  const { url: arrowLeftUrl, alt: arrowLeftAlt } = arrowLeftHover ? left.active : left.default;
  const { url: arrowRightUrl, alt: arrowRightAlt } = arrowRightHover ? right.active : right.default;

  const today = dayjs();
  const maxDate = today.add(MAX_RESERVATION_DATE, 'day');

  const [selectedYear, setSelectedYear] = useState(today.year());
  const [selectedMonth, setSelectedMonth] = useState(today.month() + 1);

  const { initialScheduleData, isSuccess } = useGetScheduleList({
    activityId,
    year: String(selectedYear),
    month: formatPadWithZero(selectedMonth),
  });

  const monthName = getMonthString(selectedMonth);
  const availableSchedules: ReservationAvailableSchedule[] = initialScheduleData?.data || [];
  const isAllSchedulesReserved = availableSchedules.length === 0;
  const initialDate = availableSchedules[0]?.date || '';

  const [selectedDate, setSelectedDate] = useState(initialDate);

  const updateAvailableTimes = (value: string) => {
    setSelectedDate(value);
    const selectedDateSchedule = availableSchedules.find((schedule) => schedule.date === value);
    const updatedTimes = selectedDateSchedule
      ? selectedDateSchedule.times.map((item: AvailableScheduleTimes) => ({
          value: item.id,
          title: `${item.startTime}-${item.endTime}`,
        }))
      : [{ title: '예약 가능한 시간대가 없습니다.', value: 0 }];

    setAvailableTimes(updatedTimes);
  };

  const handlePrevMonthClick = () => {
    if (selectedMonth === today.month() + 1 && selectedYear === today.year()) return;

    const newMonth = selectedMonth === 1 ? 12 : selectedMonth - 1;
    const newYear = selectedYear === 1 ? selectedYear - 1 : selectedYear;

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const handleNextMonthClick = () => {
    if (selectedMonth === maxDate.month() + 1 && selectedYear === maxDate.year()) return;

    const newMonth = selectedMonth === 12 ? 1 : selectedMonth + 1;
    const newYear = selectedYear === 12 ? selectedYear + 1 : selectedYear;

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  useEffect(() => {
    if (isSuccess) updateAvailableTimes(initialDate);

    setIsNoSchedule(isAllSchedulesReserved);
  }, [isSuccess, initialDate, isAllSchedulesReserved]);

  useEffect(() => {
    if (selectedDate) {
      updateAvailableTimes(selectedDate);
    }
  }, [selectedDate]);

  return (
    <article className={cx('calender')}>
      <header className={cx('calender-header')}>
        <div className={cx('calender-header-date')}>
          {monthName} {selectedYear}
        </div>
        <div className={cx('calender-header-control')}>
          <button
            className={cx('calender-header-control-prev')}
            onMouseEnter={arrowLeftClick}
            onMouseLeave={arrowLeftClick}
            onClick={handlePrevMonthClick}
          >
            <Image src={arrowLeftUrl} alt={arrowLeftAlt} width={16} height={16} />
          </button>
          <button
            className={cx('calender-header-control-next')}
            onMouseEnter={arrowRightClick}
            onMouseLeave={arrowRightClick}
            onClick={handleNextMonthClick}
          >
            <Image src={arrowRightUrl} alt={arrowRightAlt} width={16} height={16} />
          </button>
        </div>
      </header>
      <div className={cx('available-schedule')}>
        {isAllSchedulesReserved ? (
          <NoAvailableSchedule />
        ) : (
          <ul className={cx('available-schedule-list')}>
            {availableSchedules?.map(({ date, times }) => {
              const formatDay = date.slice(-2);
              const isActive = date === selectedDate;
              return (
                <li key={`key-${date}`}>
                  <button
                    className={cx('available-schedule-item', { active: isActive })}
                    onClick={() => updateAvailableTimes(date)}
                  >
                    <div className={cx('available-schedule-item-day')}>{formatDay}일</div>
                    <div className={cx('available-schedule-item-times')}>{times.length}건</div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </article>
  );
};

export default Calendar;
