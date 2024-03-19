import { ReactNode } from 'react';

import classNames from 'classnames/bind';

import Footer from '@/components/layout/Footer';

import styles from './FullLayout.module.scss';

const cx = classNames.bind(styles);

type FullLayoutProps = {
  children: ReactNode;
};

const FullLayout = ({ children }: FullLayoutProps) => {
  return (
    <div className={cx('layout')}>
      <main className={cx('main')}>{children}</main>
      <Footer />
    </div>
  );
};

export default FullLayout;
