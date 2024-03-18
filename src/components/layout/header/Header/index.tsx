import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import Alarm from '@/components/layout/header/Alarm';
import AlarmList from '@/components/layout/header/AlarmList';
import DrawerMenu from '@/components/layout/header/DrawerMenu';
import HeaderProfile from '@/components/layout/header/HeaderProfile';
import Menu from '@/components/layout/header/Menu';
import UserMenu from '@/components/layout/header/UserMenu';
import { alarmData, userData } from '@/constants/mockData/headerMockData';
import useTogglePopup from '@/hooks/useTogglePopup';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.drawerMenu;

const Header = () => {
  const [isAlarmExisted, setIsAlarmExisted] = useState(false);

  const {
    isOpen: isAlarmActivated,
    popupRef: alarmListRef,
    buttonRef: alarmRef,
    togglePopup: handleAlarmActivation,
  } = useTogglePopup();

  const {
    isOpen: isHeaderProfileActivated,
    popupRef: userMenuRef,
    buttonRef: headerProfileRef,
    togglePopup: handleHeaderProfileActivation,
  } = useTogglePopup();

  const {
    isOpen: isDrawerMenuActivated,
    popupRef: drawerMenuRef,
    buttonRef: menuRef,
    togglePopup: handleDrawerMenuActivation,
  } = useTogglePopup();

  const { email, nickname, profileImageUrl } = userData;
  const { totalCount, notifications } = alarmData;

  useEffect(() => {
    setIsAlarmExisted(totalCount > 0);
  }, [totalCount]);

  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <button className={cx('header-menu-button', 'sm-only')} ref={menuRef} onClick={handleDrawerMenuActivation}>
          <Image src={url} alt={alt} width={24} height={24}></Image>
        </button>
        <Link className={cx('header-logo')} href={'/'}>
          GGF
        </Link>
        <div className={cx('header-container-outer')}>
          <div className={cx('sm-hidden')}>
            <Menu />
          </div>
          <div className={cx('header-container-inner')}>
            <Alarm
              isActivated={isAlarmActivated}
              isAlarmExisted={isAlarmExisted}
              onClick={handleAlarmActivation}
              alarmRef={alarmRef}
            />
            <HeaderProfile
              nickname={nickname}
              profileImageUrl={profileImageUrl}
              isActivated={isHeaderProfileActivated}
              onClick={handleHeaderProfileActivation}
              headerProfileRef={headerProfileRef}
            />
          </div>
        </div>
        {isAlarmActivated && (
          <div className={cx('header-alarm-list')}>
            <AlarmList notifications={notifications} totalCount={totalCount} alarmListRef={alarmListRef} />
          </div>
        )}
        {isHeaderProfileActivated && (
          <div className={cx('header-user-menu')}>
            <UserMenu profileImageUrl={profileImageUrl} nickname={nickname} email={email} userMenuRef={userMenuRef} />
          </div>
        )}
      </div>
      {isDrawerMenuActivated && (
        <div className={cx('header-drawer-menu')}>
          <DrawerMenu drawerMenuRef={drawerMenuRef} onClick={handleDrawerMenuActivation} />
        </div>
      )}
    </div>
  );
};

export default Header;
