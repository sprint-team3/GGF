import Image from 'next/image';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import classNames from 'classnames/bind';

import { deleteMyNotification } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { API_ERROR_MESSAGE, SVGS } from '@/constants';
import { getElapsedTimeToKST, splitTitleByDelimiter } from '@/utils';

import { ConfirmModal, ModalButton } from '@/components/commons/modals';
import useToggleButton from '@/hooks/useToggleButton';

import styles from './AlarmCard.module.scss';

const cx = classNames.bind(styles);
const { normal, hover } = SVGS.trashcan;

type AlarmCardProps = {
  id: number;
  content: string;
  createdAt: string;
};

const AlarmCard = ({ id, content, createdAt }: AlarmCardProps) => {
  const { isVisible: hoverState, handleToggleClick: handleToggleState } = useToggleButton();
  const { isVisible: is404Open, handleToggleClick: handle404Click } = useToggleButton();

  const { title, MaxCount } = splitTitleByDelimiter(content);
  const refinedContent = title + (MaxCount.match(/\(.*$/)?.[0] ?? '');

  const queryClient = useQueryClient();

  const { mutate: deleteAlarmMutation } = useMutation({
    mutationFn: deleteMyNotification,
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

  const handleDeleteNotification = (id: number) => {
    deleteAlarmMutation(id);
  };

  return (
    <>
      <div className={cx('alarm-card')}>
        <div className={cx('alarm-card-container')}>
          <p className={cx('alarm-card-content')}>{refinedContent}</p>
          <button
            className={cx('alarm-card-delete')}
            onMouseEnter={handleToggleState}
            onMouseLeave={handleToggleState}
            onClick={() => handleDeleteNotification(id)}
          >
            <Image
              src={hoverState ? hover.url : normal.url}
              alt={hoverState ? hover.alt : normal.alt}
              width={24}
              height={24}
            />
          </button>
        </div>
        <span className={cx('alarm-card-created-at')}>{getElapsedTimeToKST(createdAt)}</span>
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

export default AlarmCard;
