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
        <div className={cx('container2')}>
          {deviceType === 'PC' && <p>{nickname || 'BattleMan'}</p>}
          {deviceType !== 'Mobile' && (
            <Image
              src={isActive ? SVGS.arrowActive.url : SVGS.arrowDefault.url}
              alt='profile'
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
