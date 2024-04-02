import Image from 'next/image';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './ConfirmScheduleButton.module.scss';

const cx = classNames.bind(styles);
const { active } = SVGS.calendar;

type ConfirmScheduleButtonProps = {
  isPanelOpen: boolean;
  onClick: () => void;
};

const ConfirmScheduleButton = ({ isPanelOpen, onClick }: ConfirmScheduleButtonProps) => {
  return (
    <div className={cx('lg-hidden')}>
      <div className={cx('schedule-button-content')}>
        <button className={cx('schedule-button', { 'panel-active': isPanelOpen })} onClick={onClick}>
          <div className={cx('schedule-button-icon')}>
            <Image src={active.url} alt={active.alt} width={24} height={24} />
          </div>
          <span className={cx('schedule-button-text')}>예약 일정 확인</span>
        </button>
      </div>
    </div>
  );
};

export default ConfirmScheduleButton;
