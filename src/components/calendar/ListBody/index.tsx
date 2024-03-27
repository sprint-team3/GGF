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
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <li className={cx('card-container')} key={`schedule-${date}`} onClick={handleClick}>
            <ListCard date={date} reservations={reservations} />
          </li>
        );
      })}
    </ul>
  );
};

export default ListBody;
