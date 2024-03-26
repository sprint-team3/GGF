import { ReactNode } from 'react';

import classNames from 'classnames/bind';

import { Chatbot } from '@/components/commons/chatbot';
import Header from '@/components/layout/header/Header';

import styles from './Layout.module.scss';

const cx = classNames.bind(styles);

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className={cx('header')}>
        <Header />
      </div>
      <div className={cx('content')}>
        {children}
        <Chatbot />
      </div>
    </>
  );
};

export default Layout;
