import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';
import { signout } from '@/utils';

import { Avatar } from '@/components/commons/Avatar';

import styles from './UserMenu.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.button.setting;

type UserMenuProps = {
  profileImageUrl: string;
  nickname: string;
  email: string;
  userMenuRef: React.RefObject<HTMLDivElement>;
};

export const UserMenu = ({ profileImageUrl, nickname, email, userMenuRef }: UserMenuProps) => {
  return (
    <div className={cx('container')} ref={userMenuRef}>
      <div className={cx('container-user')}>
        <Avatar size='medium' profileImageUrl={profileImageUrl} />
        <div className={cx('container-user-info')}>
          <div className={cx('container-nickname')}>
            <p className={cx('nickname')}>{nickname}</p>
            <Link href={'/user/account'}>
              <Image src={url} alt={alt} width={16} height={16} />
            </Link>
          </div>
          <div className={cx('email')}>{email}</div>
        </div>
      </div>
      <div className={cx('container-button')}>
        <Link className={cx('button', 'mypage')} href={'/mypage'}>
          My Page
        </Link>
        <button className={cx('button', 'logout')} onClick={signout}>
          Logout
        </button>
      </div>
    </div>
  );
};