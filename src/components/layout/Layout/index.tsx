import { ReactNode } from 'react';

import classNames from 'classnames/bind';

import Header from '@/components/layout/header/Header';

import styles from './Layout.module.scss';

const cx = classNames.bind(styles);

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className={cx('content')}>{children}</div>
    </>
  );
};

export default Layout;