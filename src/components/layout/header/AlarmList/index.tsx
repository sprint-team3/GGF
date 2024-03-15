import { RefObject } from 'react';

import classNames from 'classnames/bind';

import { MyNotifications } from '@/apis/myNotifications';

import { AlarmCard } from '../AlarmCard';

import { NotificationResponse } from '@/types';

import styles from './AlarmList.module.scss';

const cx = classNames.bind(styles);

type AlarmListProps = {
  notifications: NotificationResponse[];
  totalCount: number;
  alarmListRef: RefObject<HTMLDivElement>;
};

export const AlarmList = ({ notifications, totalCount, alarmListRef }: AlarmListProps) => {
  const handleDeleteAllNotifications = () => {
    notifications.forEach(({ id }) => MyNotifications.delete(id));
  };

  return (
    <div className={cx('container')} ref={alarmListRef}>
      <div className={cx('container-top')}>
        <div className={cx('container-alarm-count')}>
          <p className={cx('alarm')}>알림</p>
          <p className={cx('total-count')}>{totalCount}</p>
        </div>
        <button className={cx('delete-all')} onClick={handleDeleteAllNotifications}>
          전체 삭제
        </button>
      </div>
      <div className={cx('container-bottom')}>
        <ul className={cx('container-contents')}>
          {notifications.map(({ id, content, createdAt }) => (
            <AlarmCard key={id} id={id} content={content} createdAt={createdAt} />
          ))}
        </ul>
      </div>
    </div>
  );
};
