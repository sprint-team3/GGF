import Image from 'next/image';

import { RefObject, useState } from 'react';

import classNames from 'classnames/bind';

import { MyNotifications } from '@/apis/myNotifications';
import { SVGS } from '@/constants';

import { NotificationResponse } from '@/types';

import styles from './AlarmList.module.scss';

const cx = classNames.bind(styles);
const { normal, hover } = SVGS.trashcan;

type AlarmListProps = {
  notifications: NotificationResponse[];
  totalCount: number;
  alarmListRef: RefObject<HTMLDivElement>;
};

export const AlarmList = ({ notifications, totalCount, alarmListRef }: AlarmListProps) => {
  const [hoverStates, setHoverStates] = useState(Array(notifications.length).fill(false));

  const handleStateToTrue = (id: number) => {
    setHoverStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[id] = true;
      return newStates;
    });
  };

  const handleStateToFalse = (id: number) => {
    setHoverStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[id] = false;
      return newStates;
    });
  };

  const handleDeleteNotification = (id: number) => {
    MyNotifications.delete(id);
  };

  const handleDeleteAllNotifications = () => {
    const notificationIds = notifications.map((notification) => notification.id);

    notificationIds.forEach((id) => MyNotifications.delete(id));
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
        <div className={cx('container-contents')}>
          {notifications.map(({ id, content, createdAt }) => (
            <div key={id} className={cx('container-content-outer')}>
              <div className={cx('container-content')}>
                <p className={cx('content')}>{content}</p>
                <button
                  className={cx('delete')}
                  onMouseEnter={() => handleStateToTrue(id)}
                  onMouseLeave={() => handleStateToFalse(id)}
                  onClick={() => handleDeleteNotification(id)}
                >
                  <Image
                    src={hoverStates[id] ? hover.url : normal.url}
                    alt={hoverStates[id] ? hover.alt : normal.alt}
                    width={24}
                    height={24}
                  />
                </button>
              </div>
              <p className={cx('created-at')}>{createdAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
