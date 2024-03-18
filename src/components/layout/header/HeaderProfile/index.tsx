import Image from 'next/image';

import { MouseEventHandler, RefObject } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import Avatar from '@/components/commons/Avatar';

import styles from './HeaderProfile.module.scss';

const cx = classNames.bind(styles);

const { top, bottom } = SVGS.arrow;

type HeaderProfileProps = {
  nickname: string;
  profileImageUrl: string;
  isActivated: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  headerProfileRef: RefObject<HTMLButtonElement>;
};

const HeaderProfile = ({ nickname, profileImageUrl, isActivated, onClick, headerProfileRef }: HeaderProfileProps) => {
  return (
    <div>
      <button className={cx('header-profile')} onClick={onClick} ref={headerProfileRef}>
        <Avatar size='small' isActivated={isActivated} profileImageUrl={profileImageUrl} />
        <div className={cx('header-profile-container-inner')}>
          <span className={cx('lg-only')}>{nickname}</span>
          <Image
            className={cx('sm-hidden')}
            src={isActivated ? top.url : bottom.url}
            alt={isActivated ? top.alt : bottom.alt}
            width={16}
            height={16}
          />
        </div>
      </button>
    </div>
  );
};

export default HeaderProfile;
