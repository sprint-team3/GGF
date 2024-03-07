import Image from 'next/image';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

type AvatarProps = {
  size: 'small' | 'middle' | 'large';
  profileImageUrl: string;
  isActive?: boolean;
};

export const Avatar = ({ size, profileImageUrl, isActive }: AvatarProps) => {
  let frameSize;
  let imageSize;

  if (size === 'small') {
    frameSize = 42;
    imageSize = 30;
  } else if (size === 'middle') {
    frameSize = 56;
    imageSize = 40;
  } else if (size === 'large') {
    frameSize = 80;
    imageSize = 58;
  }

  return (
    <div className={cx('container')}>
      <Image
        src={isActive ? SVGS.profileActive.url : SVGS.profileDefault.url}
        alt='profileDefaultImage'
        width={frameSize}
        height={frameSize}
        priority
      />
      {profileImageUrl && (
        <Image
          className={cx(size)}
          src={profileImageUrl}
          alt='profileImage'
          width={imageSize}
          height={imageSize}
          priority
        />
      )}
    </div>
  );
};
