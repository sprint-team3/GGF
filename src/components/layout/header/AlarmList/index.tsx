import { RefObject } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import classNames from 'classnames/bind';

import { deleteMyNotifications } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { API_ERROR_MESSAGE } from '@/constants';

import { ConfirmModal, ModalButton } from '@/components/commons/modals';
import AlarmCard from '@/components/layout/header/AlarmCard';
import EmptyAlarm from '@/components/layout/header/EmptyAlarm';
import useToggleButton from '@/hooks/useToggleButton';

import { NotificationResponse } from '@/types';

import styles from './AlarmList.module.scss';

const cx = classNames.bind(styles);

type AlarmListProps = {
  notifications: NotificationResponse[];
  totalCount: number;
  alarmListRef: RefObject<HTMLDivElement>;
};

const AlarmList = ({ notifications, totalCount, alarmListRef }: AlarmListProps) => {
  const { isVisible: is404Open, handleToggleClick: handle404Click } = useToggleButton();

  const queryClient = useQueryClient();

  const { mutate: deleteAlarmMutations } = useMutation({
    mutationFn: deleteMyNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.myNotifications.get],
      });
    },
    onError: (error) => {
      if ((error as AxiosError)?.response?.status === 404) {
        handle404Click();
      }
    },
  });

  const extractednotificationIds = (notifications: NotificationResponse[]): number[] => {
    return notifications.map((notification) => notification.id);
  };

  const handleDeleteAllNotifications = () => {
    if (notifications.length > 0) {
      deleteAlarmMutations(extractednotificationIds(notifications));
    }
  };

  return (
    <>
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
          {notifications[0] ? (
            <ul className={cx('alarm-list-contents')}>
              {notifications.map(({ id, content, createdAt }) => (
                <li key={id}>
                  <AlarmCard id={id} content={content} createdAt={createdAt} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyAlarm />
          )}
        </div>
      </div>
      <ConfirmModal
        warning
        openModal={is404Open}
        onClose={handle404Click}
        state='ERROR'
        title={'알림 삭제에 실패하였습니다'}
        desc={API_ERROR_MESSAGE.notification[404]}
        renderButton={<ModalButton onClick={handle404Click}>닫기</ModalButton>}
      ></ConfirmModal>
    </>
  );
};

export default AlarmList;
