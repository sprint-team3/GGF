import Image from 'next/image';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';

import Activities from '@/apis/activities';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { SVGS } from '@/constants';
import { formatPadWithZero, getDayDiff } from '@/utils';

import NoAvailableSchedule from '@/components/postDetail/reservationPanel/NoAvailableSchedule';
import useToggleButton from '@/hooks/useToggleButton';

import { ReservationAvailableSchedule, AvailableScheduleTimes } from '@/types';

import styles from './Calendar.module.scss';

const cx = classNames.bind(styles);
const { left, right } = SVGS.arrow;

type CalenderProps = {
  activityId: number;
  setAvailableTimes: Dispatch<SetStateAction<AvailableTimesOptions[]>>;
  setIsNoSchedule: Dispatch<SetStateAction<boolean>>;
};

type AvailableTimesOptions = {
  title: string;
  value: number;
};

const Calendar = ({ activityId, setAvailableTimes, setIsNoSchedule }: CalenderProps) => {
  const today = dayjs();

  const [selectedYear, setSelectedYear] = useState(today.year());
  const [selectedMonth, setSelectedMonth] = useState(today.month() + 1);

  const year = formatPadWithZero(selectedYear);
  const month = formatPadWithZero(selectedMonth);

  const { data: initialScheduleData } = useQuery({
    queryKey: QUERY_KEYS.activities.getScheduleList(activityId, year, month),
    queryFn: () => Activities.getScheduleList({ activityId, year, month }),
  });

  const availableSchedules: ReservationAvailableSchedule[] = Array.isArray(initialScheduleData)
    ? initialScheduleData
    : initialScheduleData?.data || [];

  const [monthName, setMonthName] = useState('');
  const monthNameFormat = dayjs()
    .month(selectedMonth - 1)
    .format('MMMM');
  const maxDate = today.add(30, 'day');

  const [selectedDate, setSelectedDate] = useState((availableSchedules && availableSchedules[0]?.date) || '');

  const { isVisible: arrowLeftHover, handleToggleClick: arrowLeftClick } = useToggleButton();
  const { isVisible: arrowRightHover, handleToggleClick: arrowRightClick } = useToggleButton();

  const { url: arrowLeftUrl, alt: arrowLeftAlt } = arrowLeftHover ? left.active : left.default;
  const { url: arrowRightUrl, alt: arrowRightAlt } = arrowRightHover ? right.active : right.default;

  const isAllSchedulesReserved = availableSchedules.length === 0;
  const isReservationProhibited = getDayDiff(selectedDate) > 0;

  const updateAvailableTimes = (value: string) => {
    setSelectedDate(value);
    let updatedTimes: AvailableTimesOptions[] = [];

    if (!isReservationProhibited && availableSchedules.length > 0) {
      const selectedDateSchedule = availableSchedules.find((a) => a.date === selectedDate);
      if (selectedDateSchedule) {
        updatedTimes = selectedDateSchedule.times.map((item: AvailableScheduleTimes) => ({
          value: item.id,
          title: `${item.startTime}-${item.endTime}`,
        }));
      }
    } else {
      updatedTimes = [
        {
          title: '예약 가능한 시간대가 없습니다.',
          value: 0,
        },
      ];
    }

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
    if (availableSchedules.length > 0) {
      setSelectedDate(availableSchedules[0]?.date);
    }
    if (selectedDate) {
      updateAvailableTimes(selectedDate);
    }
    setIsNoSchedule(isAllSchedulesReserved);
    setMonthName(monthNameFormat);
  }, [availableSchedules, selectedDate, isAllSchedulesReserved, monthNameFormat, selectedDate]);

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
        {isReservationProhibited || isAllSchedulesReserved ? (
          <NoAvailableSchedule />
        ) : (
          <ul className={cx('available-schedule-list')}>
            {availableSchedules &&
              availableSchedules.map(({ date, times }) => {
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
