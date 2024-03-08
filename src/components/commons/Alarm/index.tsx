import Image from 'next/image';

import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import { ALARM_SIZE, SVGS } from '@/constants';

import styles from './Alarm.module.scss';

const cx = classNames.bind(styles);

type AlarmProps = {
  isExistedAlarm: boolean;
  isActive: boolean;
  handleToggleActivation: MouseEventHandler<HTMLButtonElement>;
};

export const Alarm = ({ isExistedAlarm, isActive, handleToggleActivation }: AlarmProps) => {
  return (
    <button onClick={handleToggleActivation}>
      <div className={cx('outer-frame')}>
        <div className={cx('dot', 'top', { isActive })}></div>
        <div className={cx('dot', 'right', { isActive })}></div>
        <div className={cx('dot', 'bottom', { isActive })}></div>
        <div className={cx('dot', 'left', { isActive })}></div>
        <div className={cx('inner-frame', { isActive })}>
          {isExistedAlarm ? (
            <Image
              src={SVGS.alarm.full.url}
              alt={SVGS.alarm.full.alt}
              width={ALARM_SIZE}
              height={ALARM_SIZE}
              priority
            />
          ) : (
            <Image
              src={SVGS.alarm.empty.url}
              alt={SVGS.alarm.empty.alt}
              width={ALARM_SIZE}
              height={ALARM_SIZE}
              priority
            />
          )}
        </div>
      </div>
    </button>
  );
};
