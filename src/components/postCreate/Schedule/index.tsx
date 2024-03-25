import classNames from 'classnames/bind';

import { createTimeRange } from '@/utils';

import { OperationButton } from '@/components/commons/buttons';
import { DateField, FormDropdown } from '@/components/commons/inputs';

import styles from './Schedule.module.scss';

const cx = classNames.bind(styles);

type ScheduleProps = {
  isScheduleSelected: boolean;
  onClick: () => void;
};

const Schedule = ({ isScheduleSelected, onClick }: ScheduleProps) => {
  const SCHEDULES_TIME = {
    start: createTimeRange(0, 23),
    end: createTimeRange(1, 24),
  };

  return (
    <div className={cx('schedules')}>
      <div className={cx('schedules-group')}>
        <div className={cx('schedules-date')}>
          <DateField name='date' label='날짜' />
        </div>
        <div className={cx('schedules-time')}>
          <div className={cx('schedules-time-start')}>
            <FormDropdown name='startTime' label='시작 시간' options={SCHEDULES_TIME.start} />
          </div>
          <div className={cx('schedules-time-hyphen')}>-</div>
          <div className={cx('schedules-time-end')}>
            <FormDropdown name='endTime' label='종료 시간' options={SCHEDULES_TIME.end} />
          </div>
        </div>
      </div>
      <div className={cx('schedules-button')}>
        <OperationButton type='add' onClick={onClick} isDisabled={!isScheduleSelected} />
      </div>
    </div>
  );
};

export default Schedule;
