import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getMyActivitiesList } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { splitTitleByDelimiter } from '@/utils';

import Calendar from '@/components/calendar';
import Dropdown from '@/components/commons/Dropdown';

import { MyActivitiesResponse } from '@/types';

import styles from './ReservationStatus.module.scss';

const cx = classNames.bind(styles);

const ReservationStatus = () => {
  const { data: myActivityDatas } = useQuery({
    queryKey: QUERY_KEYS.myActivities.getList,
    queryFn: getMyActivitiesList,
  });

  const postDropdownOptions = myActivityDatas.map((data: MyActivitiesResponse) => ({
    title: splitTitleByDelimiter(data.title).title,
    value: data.id,
  }));

  const [gameId, setGameId] = useState(postDropdownOptions[0].value);

  const handlePostChange = (value: number | string) => {
    setGameId(value as number);
  };

  return (
    <div className={cx('status-container')}>
      <Dropdown options={postDropdownOptions} onChange={handlePostChange} label='모집명' color='yellow' />
      <Calendar gameId={gameId} />
    </div>
  );
};

export default ReservationStatus;
