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

export const Avatar = ({ size, profileImageUrl, isActivated }: AvatarProps) => {
  const imageSize = size === 'large' ? 32 : 20;

  return (
    <div className={cx('outer-frame', `outer-${size}`)}>
      <div className={cx('dot', 'top', { 'is-activated': isActivated })}></div>
      <div className={cx('dot', 'right', { 'is-activated': isActivated })}></div>
      <div className={cx('dot', 'bottom', { 'is-activated': isActivated })}></div>
      <div className={cx('dot', 'left', { 'is-activated': isActivated })}></div>
      <div className={cx('inner-frame', `inner-${size}`, { 'is-activated': isActivated })}>
        {profileImageUrl ? (
          <Image src={profileImageUrl} alt='profileImage' layout='fill' />
        ) : (
          <Image src={SVGS.profile.url} alt={SVGS.profile.alt} width={imageSize} height={imageSize} />
        )}
      </div>
    </div>
  );
};
