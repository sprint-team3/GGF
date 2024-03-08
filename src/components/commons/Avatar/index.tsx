import Image from 'next/image';

import classNames from 'classnames/bind';

import { AVATAR_SIZE, SVGS } from '@/constants';

import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

type AvatarProps = {
  size: 'small' | 'medium' | 'large';
  profileImageUrl: string;
  isActive?: boolean;
};

export const Avatar = ({ size, profileImageUrl, isActive }: AvatarProps) => {
  return (
    <div className={cx('container')}>
      <Image
        src={isActive ? SVGS.profile.active.url : SVGS.profile.inactive.url}
        alt={isActive ? SVGS.profile.active.alt : SVGS.profile.inactive.alt}
        width={AVATAR_SIZE.frame[size]}
        height={AVATAR_SIZE.frame[size]}
        priority
      />
      {profileImageUrl && (
        <Image
          className={cx(size)}
          src={profileImageUrl}
          alt='profileImage'
          width={AVATAR_SIZE.image[size]}
          height={AVATAR_SIZE.image[size]}
          priority
        />
      )}
    </div>
  );
};
