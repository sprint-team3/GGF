import { RefObject } from 'react';

import classNames from 'classnames/bind';

import { MyNotifications } from '@/apis/myNotifications';

import AlarmCard from '@/components/layout/header/AlarmCard';

import { NotificationResponse } from '@/types';

import styles from './AlarmList.module.scss';

const cx = classNames.bind(styles);

type AlarmListProps = {
  notifications: NotificationResponse[];
  totalCount: number;
  alarmListRef: RefObject<HTMLDivElement>;
};

const AlarmList = ({ notifications, totalCount, alarmListRef }: AlarmListProps) => {
  const handleDeleteAllNotifications = () => {
    notifications.forEach(({ id }) => MyNotifications.delete(id));
  };

  return (
    <div className={cx('alarm-list')} ref={alarmListRef}>
      <div className={cx('alarm-list-top')}>
        <div className={cx('alarm-list-count')}>
          <span className={cx('alarm')}>알림</span>
          <span className={cx('total-count')}>{totalCount}</span>
        </div>
        <button className={cx('delete-all')} onClick={handleDeleteAllNotifications}>
          전체 삭제
        </button>
      </div>
      <div className={cx('alarm-list-bottom')}>
        <ul className={cx('alarm-list-contents')}>
          {notifications.map(({ id, content, createdAt }) => (
            <li key={id}>
              <AlarmCard id={id} content={content} createdAt={createdAt} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlarmList;
