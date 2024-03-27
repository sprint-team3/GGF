import classNames from 'classnames/bind';

import ListCard from '@/components/calendar/ListCard/ListCard';

import { MonthlySchedule } from '@/types';

import styles from './ListBody.module.scss';

const cx = classNames.bind(styles);

type ListBodyProps = {
  schedules?: MonthlySchedule[];
  onClick: (date: string) => void;
};

const ListBody = ({ schedules, onClick }: ListBodyProps) => {
  return (
    <ul>
      {schedules?.map(({ date, reservations }) => {
        const handleClick = () => onClick(date);

        return (
          <li className={cx('card-container')} key={`schedule-${date}`}>
            <button className={cx('card-container-button')} onClick={handleClick}>
              <ListCard date={date} reservations={reservations} />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ListBody;
