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
import { alarmData, USER_DATA } from '@/constants/mockData/headerMockData';
import { useDeviceType } from '@/hooks/useDeviceType';
import useTogglePopup from '@/hooks/useTogglePopup';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.drawerMenu;

const Header = () => {
  const currentDeviceType = useDeviceType();
  const isMobileHidden = currentDeviceType !== 'Mobile';
  const [isVisible, setIsVisible] = useState<boolean>();
  const [isAlarmExisted, setIsAlarmExisted] = useState(false);

  useEffect(() => {
    if (isMobileHidden) {
      setIsVisible(undefined);
    }
  }, [isMobileHidden]);

  const handleToggleDrawerMenu = () => {
    setIsVisible((prev) => !prev);
  };

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

  const { email, nickname, profileImageUrl } = USER_DATA;
  const { totalCount, notifications } = alarmData;

  useEffect(() => {
    setIsAlarmExisted(totalCount > 0);
  }, [totalCount]);

  return (
    <>
      <div className={cx('container')}>
        <header className={cx('header')}>
          <button className={cx('header-menu-button', 'sm-only')} onClick={handleToggleDrawerMenu}>
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
        </header>
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
      <div className={cx('drawer-menu', { open: isVisible }, { close: isVisible === false })}>
        <DrawerMenu onClick={handleToggleDrawerMenu} />
      </div>
    </>
  );
};

export default Header;
