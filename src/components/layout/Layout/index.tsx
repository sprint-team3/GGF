import { ReactNode, useEffect } from 'react';

import classNames from 'classnames/bind';

import { getCSRLoggedIn } from '@/utils';

import { Chatbot } from '@/components/commons/chatbot';
import Header from '@/components/layout/header/Header';
import useAlarmData from '@/hooks/useAlarmData';
import useUserData from '@/hooks/useUserData';
import useUserStore from '@/stores/useUserStore';

import styles from './Layout.module.scss';

const cx = classNames.bind(styles);

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const isLoggedIn = getCSRLoggedIn();
  const { setUserData } = useUserStore();

  const { userData } = useUserData();
  const { alarmData } = useAlarmData();

  useEffect(() => {
    setUserData(userData);
  }, [userData]);

  return (
    <>
      <div className={cx('header')}>
        <Header userData={userData} alarmData={alarmData} isLoggedIn={isLoggedIn} />
      </div>
      <div className={cx('content')}>
        {children}
        <Chatbot />
      </div>
    </>
  );
};

export default Layout;
