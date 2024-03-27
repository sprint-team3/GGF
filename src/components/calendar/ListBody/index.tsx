import classNames from 'classnames/bind';

import ListCard from '@/components/calendar/ListCard/ListCard';

import { MonthlySchedule } from '@/types';

import styles from './ListBody.module.scss';

const cx = classNames.bind(styles);

type ListBodyProps = {
  schedules?: MonthlySchedule[];
};

const ListBody = ({ schedules }: ListBodyProps) => {
  return (
    <ul>
      {schedules?.map(({ date, reservations }) => (
        <li className={cx('card-container')} key={`schedule-${date}`}>
          <ListCard date={date} reservations={reservations} />
        </li>
      ))}
    </ul>
  );
};

export default ListBody;
