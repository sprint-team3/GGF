import { Dispatch, SetStateAction } from 'react';

import classNames from 'classnames/bind';

import { getMonthString } from '@/utils';

import ArrowButton from '@/components/calendar/ArrowButton';
import SwitchButton from '@/components/calendar/SwitchButton';

import styles from './CalendarHeader.module.scss';

const cx = classNames.bind(styles);

type CalendarHeaderProps = {
  currentYear: number;
  currentMonth: number;
  onChangeMonth: (addNumber: number) => void;
  isCalendar: boolean;
  setIsCalendar: Dispatch<SetStateAction<boolean>>;
};

const CalendarHeader = ({
  currentYear,
  currentMonth,
  onChangeMonth,
  isCalendar,
  setIsCalendar,
}: CalendarHeaderProps) => {
  const handleSwitchClick = (isCalendar: boolean) => setIsCalendar(isCalendar);

  return (
    <div className={cx('calendar-header-container')}>
      <div className={cx('arrow-area')}>
        <ArrowButton onClick={onChangeMonth} />
      </div>
      <div className={cx('calendar-header-date')}>
        {getMonthString(currentMonth)} <span className={cx('calendar-header-year')}>{currentYear}</span>
      </div>
      <div className={cx('lg-only')}>
        <SwitchButton isCalendar={isCalendar} onClick={handleSwitchClick} />
      </div>
    </div>
  );
};

export default CalendarHeader;
