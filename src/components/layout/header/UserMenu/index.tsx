import Image from 'next/image';
import Link from 'next/link';

import { MouseEventHandler, RefObject } from 'react';

import classNames from 'classnames/bind';

import { PAGE_PATHS, SVGS } from '@/constants';

import Avatar from '@/components/commons/Avatar';
import useSignout from '@/hooks/useSignout';

import styles from './UserMenu.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.button.setting;
const { account, mypage } = PAGE_PATHS;

type UserMenuProps = {
  profileImageUrl: string;
  nickname: string;
  email: string;
  userMenuRef: RefObject<HTMLDivElement>;
  onClick: MouseEventHandler<HTMLElement>;
};

const UserMenu = ({ profileImageUrl, nickname, email, userMenuRef, onClick }: UserMenuProps) => {
  const signout = useSignout();

  const handleClickSignout = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onClick(event);
    signout();
  };

  return (
    <div className={cx('container')} ref={userMenuRef}>
      <div className={cx('container-user')}>
        <Avatar size='medium' profileImageUrl={profileImageUrl} />
        <div className={cx('container-user-info')}>
          <div className={cx('container-nickname')}>
            <p className={cx('nickname')}>{nickname}</p>
            <Link onClick={onClick} href={account}>
              <Image src={url} alt={alt} width={18} height={18} />
            </Link>
          </div>
          <div className={cx('email')}>{email}</div>
        </div>
      </div>
      <div className={cx('container-button')}>
        <Link className={cx('container-button-mypage')} onClick={onClick} href={mypage}>
          My Page
        </Link>
        <button className={cx('container-button-logout')} onClick={handleClickSignout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
