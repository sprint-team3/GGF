import Image from 'next/image';

import classNames from 'classnames/bind';

import { MyNotifications } from '@/apis/myNotifications';
import { SVGS } from '@/constants';
import { getElapsedTimeToKST } from '@/utils';

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

  const handleDeleteNotification = (id: number) => {
    MyNotifications.delete(id);
  };

  return (
    <div className={cx('alarm-card')}>
      <div className={cx('alarm-card-container')}>
        <p className={cx('alarm-card-content')}>{content}</p>
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
  );
};

export default AlarmCard;
