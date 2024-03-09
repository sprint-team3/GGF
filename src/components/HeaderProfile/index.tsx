import Image from 'next/image';

import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import { Avatar } from '@/components/commons/Avatar';

import { DeviceType } from '@/types';

import styles from './HeaderProfile.module.scss';

const cx = classNames.bind(styles);

type HeaderProfileProps = {
  nickname: string;
  profileImageUrl: string;
  deviceType: DeviceType;
  isActivated: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const HeaderProfile = ({ nickname, profileImageUrl, deviceType, isActivated, onClick }: HeaderProfileProps) => {
  return (
    <div>
      <button className={cx('container')} onClick={onClick}>
        <Avatar size='small' isActivated={isActivated} profileImageUrl={profileImageUrl} />
        <div className={cx('inner-container')}>
          {deviceType === 'PC' && <p>{nickname}</p>}
          {deviceType !== 'Mobile' && (
            <Image
              src={isActivated ? SVGS.arrow.top.url : SVGS.arrow.bottom.url}
              alt={isActivated ? SVGS.arrow.top.alt : SVGS.arrow.bottom.alt}
              width={16}
              height={16}
              priority
            />
          )}
        </div>
      </button>
    </div>
  );
};
