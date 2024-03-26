import classNames from 'classnames/bind';

import styles from './CalendarItem.module.scss';

const cx = classNames.bind(styles);

type CalendarItemProps = {
  date: number;
  isToday?: boolean;
  isDisabled?: boolean;
};

const CalendarItem = ({ date, isToday, isDisabled }: CalendarItemProps) => {
  return (
    <div className={cx('calendar-item', { disabled: isDisabled })}>
      <div className={cx('calendar-number-area')}>
        <span className={cx('calendar-number', { today: isToday })}>{date}</span>
      </div>
    </div>
  );
};

export default CalendarItem;
