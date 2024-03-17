import Image from 'next/image';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

type AvatarProps = {
  size: 'small' | 'medium' | 'large';
  profileImageUrl: string | null;
  isActivated?: boolean;
};

const Avatar = ({ size, profileImageUrl, isActivated }: AvatarProps) => {
  const { url, alt } = SVGS.profile;
  const imageSize = size === 'large' ? 32 : 20;

  return (
    <div className={cx('avatar', `frame-outer-${size}`)}>
      <div className={cx('dot', 'dot-top', { 'dot-activated': isActivated })}></div>
      <div className={cx('dot', 'dot-right', { 'dot-activated': isActivated })}></div>
      <div className={cx('dot', 'dot-bottom', { 'dot-activated': isActivated })}></div>
      <div className={cx('dot', 'dot-left', { 'dot-activated': isActivated })}></div>
      <div className={cx('frame-inner', `frame-inner-${size}`, { 'frame-inner-activated': isActivated })}>
        {profileImageUrl ? (
          <Image src={profileImageUrl} alt='profileImage' layout='fill' />
        ) : (
          <Image src={url} alt={alt} width={imageSize} height={imageSize} />
        )}
      </div>
    </div>
  );
};

export default Avatar;
