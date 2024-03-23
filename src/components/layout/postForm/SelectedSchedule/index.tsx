import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import { OperationButton } from '@/components/commons/buttons';

import styles from './SelectedSchedule.module.scss';

const cx = classNames.bind(styles);

type SelectedScheduleProps = {
  value: {
    date: string;
    startTime: string;
    endTime: string;
  };
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const SelectedSchedule = ({ value, onClick }: SelectedScheduleProps) => {
  return (
    <div className={cx('selected-schedule')}>
      <div className={cx('selected-schedule-group')}>
        <div className={cx('selected-schedule-date')}>{value.date}</div>
        <div className={cx('selected-schedule-time')}>
          <div className={cx('selected-schedule-time-start')}>{value.startTime}</div>
          <div className={cx('selected-schedule-time-hyphen')}>-</div>
          <div className={cx('selected-schedule-time-end')}>{value.endTime}</div>
        </div>
      </div>
      <div className={cx('selected-schedule-button')}>
        <OperationButton type='remove' onClick={onClick} />
      </div>
    </div>
  );
};

export default SelectedSchedule;
