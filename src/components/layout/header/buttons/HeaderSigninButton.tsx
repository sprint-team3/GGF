import Link from 'next/link';

import classNames from 'classnames/bind';

import { PAGE_PATHS } from '@/constants';

import styles from './HeaderSignButton.module.scss';

const cx = classNames.bind(styles);

export const HeaderSigninButton = () => {
  return (
    <Link href={PAGE_PATHS.signin}>
      <button className={cx('signin-btn')}>
        <span className={cx('text')}>SIGNIN</span>
      </button>
    </Link>
  );
};
