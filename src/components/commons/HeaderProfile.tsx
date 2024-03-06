import Image from 'next/image';

import { useState } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import { useDeviceType } from '@/hooks/useDeviceType';

import { Avatar } from './Avatar';
import styles from './HeaderProfile.module.scss';

const cx = classNames.bind(styles);

export const HeaderProfile = () => {
  const deviceType = useDeviceType();

  const [isActive, setIsActive] = useState(false);

  const handleToggleProfileActivation = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div>
      <button className={cx('container')} onClick={handleToggleProfileActivation}>
        <Avatar type={'popup'} isActive={isActive} profileImageUrl={SVGS.dog.url} />
        <div className={cx('container2')}>
          {deviceType === 'PC' && <p>BattleMan</p>}
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
