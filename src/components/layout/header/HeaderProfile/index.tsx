import Image from 'next/image';

import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import { Avatar } from '@/components/commons/Avatar';

import { DeviceType } from '@/types';

import styles from './HeaderProfile.module.scss';

const cx = classNames.bind(styles);

const { top, bottom } = SVGS.arrow;

type HeaderProfileProps = {
  nickname: string;
  profileImageUrl: string;
  deviceType: DeviceType;
  isActivated: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  headerProfileRef: React.RefObject<HTMLButtonElement>;
};

export const HeaderProfile = ({
  nickname,
  profileImageUrl,
  deviceType,
  isActivated,
  onClick,
  headerProfileRef,
}: HeaderProfileProps) => {
  return (
    <div>
      <button className={cx('container')} onClick={onClick} ref={headerProfileRef}>
        <Avatar size='small' isActivated={isActivated} profileImageUrl={profileImageUrl} />
        <div className={cx('inner-container')}>
          {deviceType === 'PC' && <p>{nickname}</p>}
          {deviceType !== 'Mobile' && (
            <Image
              src={isActivated ? top.url : bottom.url}
              alt={isActivated ? top.alt : bottom.alt}
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
