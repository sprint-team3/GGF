import Image from 'next/image';

import { useState } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import { Avatar } from '@/components/commons/Avatar';
import { useDeviceType } from '@/hooks/useDeviceType';

import styles from './HeaderProfile.module.scss';

const cx = classNames.bind(styles);

type HeaderProfileProps = {
  nickname: string;
  profileImageUrl: string;
};

export const HeaderProfile = ({ nickname, profileImageUrl }: HeaderProfileProps) => {
  const deviceType = useDeviceType();

  const [isActive, setIsActive] = useState(false);

  const handleToggleProfileActivation = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div>
      <button className={cx('container')} onClick={handleToggleProfileActivation}>
        <Avatar size='small' isActive={isActive} profileImageUrl={profileImageUrl} />
        <div className={cx('inner-container')}>
          {deviceType === 'PC' && <p>{nickname}</p>}
          {deviceType !== 'Mobile' && (
            <Image
              src={isActive ? SVGS.arrow.top.url : SVGS.arrow.bottom.url}
              alt={isActive ? SVGS.arrow.top.alt : SVGS.arrow.bottom.alt}
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
