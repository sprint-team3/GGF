import Image from 'next/image';

import classNames from 'classnames/bind';

import { SIZE, SVGS } from '@/constants';

import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

type AvatarProps = {
  size: 'small' | 'medium' | 'large';
  profileImageUrl: string;
  isActivated?: boolean;
};

export const Avatar = ({ size, profileImageUrl, isActivated }: AvatarProps) => {
  const imageSize = size === 'large' ? SIZE.profile.large : SIZE.profile.small;

  return (
    <div className={cx('outer-frame', `outer-${size}`)}>
      <div className={cx('dot', 'top', { isActivated })}></div>
      <div className={cx('dot', 'right', { isActivated })}></div>
      <div className={cx('dot', 'bottom', { isActivated })}></div>
      <div className={cx('dot', 'left', { isActivated })}></div>
      <div className={cx('inner-frame', `inner-${size}`, { isActivated })}>
        {profileImageUrl ? (
          <Image src={profileImageUrl} alt='profileImage' layout='fill' />
        ) : (
          <Image src={SVGS.profile.default.url} alt={SVGS.profile.default.alt} width={imageSize} height={imageSize} />
        )}
      </div>
    </div>
  );
};
