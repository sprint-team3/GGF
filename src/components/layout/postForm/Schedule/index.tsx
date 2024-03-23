import classNames from 'classnames/bind';

import { schedulesTime } from '@/constants';

import { OperationButton } from '@/components/commons/buttons';
import { DateField, FormDropdown } from '@/components/commons/inputs';

import styles from './Schedule.module.scss';

const cx = classNames.bind(styles);

type ScheduleProps = {
  onClick: () => void;
};

const Schedule = ({ onClick }: ScheduleProps) => {
  return (
    <div className={cx('schedules')}>
      <div className={cx('schedules-group')}>
        <div className={cx('schedules-date')}>
          <DateField name='date' label='날짜' />
        </div>
        <div className={cx('schedules-time')}>
          <div className={cx('schedules-time-start')}>
            <FormDropdown name='startTime' label='시작 시간' options={schedulesTime.start} />
          </div>
          <div className={cx('schedules-time-hyphen')}>-</div>
          <div className={cx('schedules-time-end')}>
            <FormDropdown name='endTime' label='종료 시간' options={schedulesTime.end} />
          </div>
        </div>
      </div>
      <div className={cx('schedules-button')}>
        <OperationButton type='add' onClick={onClick} />
      </div>
    </div>
  );
};

export default Schedule;
