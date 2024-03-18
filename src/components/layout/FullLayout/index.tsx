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
      <div className={cx('container')}>{children}</div>
      <Footer />
    </div>
  );
};

export default FullLayout;
