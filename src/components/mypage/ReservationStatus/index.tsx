import { useState } from 'react';

import classNames from 'classnames/bind';

import Calendar from '@/components/calendar';
import Dropdown from '@/components/commons/Dropdown';
import MockActivityDatas from '@/constants/mockData/myActivitiesMockData.json';

import styles from './ReservationStatus.module.scss';

const cx = classNames.bind(styles);

const postDropdownOptions = MockActivityDatas.map(({ id, title }) => ({ title, value: id }));

const ReservationStatus = () => {
  const [gameId, setGameId] = useState(postDropdownOptions[0].value);

  const handlePostChange = (value: number | string) => {
    setGameId(value as number);
  };

  return (
    <div className={cx('.status-container')}>
      <Dropdown options={postDropdownOptions} onChange={handlePostChange} label='모집명' color='yellow' />
      <Calendar gameId={gameId} />
    </div>
  );
};

export default ReservationStatus;
