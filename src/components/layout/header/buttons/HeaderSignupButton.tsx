import Link from 'next/link';

import classNames from 'classnames/bind';

import { PAGE_PATHS } from '@/constants';

import styles from './HeaderSignButton.module.scss';

const cx = classNames.bind(styles);

export const HeaderSignupButton = () => {
  return (
    <Link href={PAGE_PATHS.signup}>
      <button className={cx('signup-btn')}>
        <div className={cx('text')}>SIGNUP</div>
      </button>
    </Link>
  );
};
