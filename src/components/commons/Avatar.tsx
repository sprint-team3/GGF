import Image from 'next/image';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

interface AvatarProps {
  type: string;
  profileImageUrl: string;
  isActive?: boolean;
}

export const Avatar = ({ type, profileImageUrl, isActive }: AvatarProps) => {
  let frameSize = 42;
  let imageSize = 30;

  if (type === 'header') {
    frameSize = 42;
    imageSize = 30;
  } else if (type === 'review') {
    frameSize = 56;
    imageSize = 40;
  } else if (type === 'popup') {
    frameSize = 80;
    imageSize = 58;
  }

  return (
    <div className={cx('container')}>
      <Image
        src={isActive ? SVGS.profileActive.url : SVGS.profileDefault.url}
        alt='profile'
        width={frameSize}
        height={frameSize}
        priority
      />
      {profileImageUrl && (
        <Image
          className={cx(type)}
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
