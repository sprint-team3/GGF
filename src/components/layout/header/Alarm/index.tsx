import Image from 'next/image';

import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './Alarm.module.scss';

const cx = classNames.bind(styles);

type AlarmProps = {
  isAlarmExisted: boolean;
  isActivated: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const Alarm = ({ isAlarmExisted, isActivated, onClick }: AlarmProps) => {
  const { full, empty } = SVGS.alarm;

  return (
    <button onClick={onClick}>
      <div className={cx('outer-frame')}>
        <div className={cx('dot', 'top', { 'is-activated': isActivated })}></div>
        <div className={cx('dot', 'right', { 'is-activated': isActivated })}></div>
        <div className={cx('dot', 'bottom', { 'is-activated': isActivated })}></div>
        <div className={cx('dot', 'left', { 'is-activated': isActivated })}></div>
        <div className={cx('inner-frame', { 'is-activated': isActivated })}>
          {isAlarmExisted ? (
            <Image src={full.url} alt={full.alt} width={20} height={20} priority />
          ) : (
            <Image src={empty.url} alt={empty.alt} width={20} height={20} priority />
          )}
        </div>
      </div>
    </button>
  );
};
