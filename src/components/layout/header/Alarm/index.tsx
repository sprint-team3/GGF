import Image from 'next/image';

import { MouseEventHandler, RefObject } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './Alarm.module.scss';

const cx = classNames.bind(styles);
const { full, empty } = SVGS.alarm;

type AlarmProps = {
  isAlarmExisted: boolean;
  isActivated: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  alarmRef: RefObject<HTMLButtonElement>;
};

const Alarm = ({ isAlarmExisted, isActivated, onClick, alarmRef }: AlarmProps) => {
  return (
    <button className={cx('frame-outer')} onClick={onClick} ref={alarmRef}>
      <div className={cx('dot', 'dot-top', { 'dot-activated': isActivated })}></div>
      <div className={cx('dot', 'dot-right', { 'dot-activated': isActivated })}></div>
      <div className={cx('dot', 'dot-bottom', { 'dot-activated': isActivated })}></div>
      <div className={cx('dot', 'dot-left', { 'dot-activated': isActivated })}></div>
      <div className={cx('frame-inner', { 'frame-inner-activated': isActivated })}>
        {isAlarmExisted ? (
          <Image src={full.url} alt={full.alt} width={20} height={20} priority />
        ) : (
          <Image src={empty.url} alt={empty.alt} width={20} height={20} priority />
        )}
      </div>
    </button>
  );
};

export default Alarm;
