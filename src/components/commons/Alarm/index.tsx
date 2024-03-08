import Image from 'next/image';

import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import { SIZE, SVGS } from '@/constants';

import styles from './Alarm.module.scss';

const cx = classNames.bind(styles);

type AlarmProps = {
  isExistedAlarm: boolean;
  isActivated: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const Alarm = ({ isExistedAlarm, isActivated, onClick }: AlarmProps) => {
  return (
    <button onClick={onClick}>
      <div className={cx('outer-frame')}>
        <div className={cx('dot', 'top', { isActivated })}></div>
        <div className={cx('dot', 'right', { isActivated })}></div>
        <div className={cx('dot', 'bottom', { isActivated })}></div>
        <div className={cx('dot', 'left', { isActivated })}></div>
        <div className={cx('inner-frame', { isActivated })}>
          {isExistedAlarm ? (
            <Image
              src={SVGS.alarm.full.url}
              alt={SVGS.alarm.full.alt}
              width={SIZE.alarm}
              height={SIZE.alarm}
              priority
            />
          ) : (
            <Image
              src={SVGS.alarm.empty.url}
              alt={SVGS.alarm.empty.alt}
              width={SIZE.alarm}
              height={SIZE.alarm}
              priority
            />
          )}
        </div>
      </div>
    </button>
  );
};
