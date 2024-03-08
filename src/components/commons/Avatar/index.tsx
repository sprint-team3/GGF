import Image from 'next/image';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

type AvatarProps = {
  size: 'small' | 'medium' | 'large';
  profileImageUrl: string;
  isActive?: boolean;
};

export const Avatar = ({ size, profileImageUrl, isActive }: AvatarProps) => {
  const imageSize = size === 'large' ? 32 : 20;

  return (
    <div className={cx('outer-frame', `outer-${size}`)}>
      <div className={cx('dot', 'top', { isActive })}></div>
      <div className={cx('dot', 'right', { isActive })}></div>
      <div className={cx('dot', 'bottom', { isActive })}></div>
      <div className={cx('dot', 'left', { isActive })}></div>
      <div className={cx('inner-frame', `inner-${size}`, { isActive })}>
        {profileImageUrl ? (
          <Image src={profileImageUrl} alt='profileImage' layout='fill' />
        ) : (
          <Image src={SVGS.profile.default.url} alt={SVGS.profile.default.alt} width={imageSize} height={imageSize} />
        )}
      </div>
    </div>
  );
};
