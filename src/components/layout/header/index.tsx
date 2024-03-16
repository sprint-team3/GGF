import Image from 'next/image';

import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';
import { redirectToPage } from '@/utils';

import { Alarm } from '@/components/layout/header/Alarm';
import { AlarmList } from '@/components/layout/header/AlarmList';
import { DrawerMenu } from '@/components/layout/header/DrawerMenu';
import { HeaderProfile } from '@/components/layout/header/HeaderProfile';
import { Menu } from '@/components/layout/header/Menu';
import { UserMenu } from '@/components/layout/header/UserMenu';
import { alarmData, userData } from '@/constants/mockData/headerMockData';
import { useDeviceType } from '@/hooks/useDeviceType';
import useTogglePopup from '@/hooks/useTogglePopup';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.drawerMenu;

export const Header = () => {
  const deviceType = useDeviceType();
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
    isOpen: isDrawerMenuOpened,
    popupRef: drawerMenuRef,
    buttonRef: menuRef,
    togglePopup: handleToggleDrawerMenu,
  } = useTogglePopup();

  const { email, nickname, profileImageUrl } = userData;
  const { totalCount, notifications } = alarmData;

  useEffect(() => {
    setIsAlarmExisted(totalCount > 0);
  }, [totalCount]);

  return deviceType !== 'Mobile' ? (
    <div className={cx('header')}>
      <button className={cx('header-logo')} onClick={() => redirectToPage('/')}>
        GGF
      </button>
      <div className={cx('header-outer-container')}>
        <Menu />
        <div className={cx('header-inner-container')}>
          <Alarm
            isActivated={isAlarmActivated}
            isAlarmExisted={isAlarmExisted}
            onClick={handleAlarmActivation}
            alarmRef={alarmRef}
          />
          <HeaderProfile
            nickname={nickname}
            profileImageUrl={profileImageUrl}
            deviceType={deviceType}
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
  ) : (
    <div className={cx('header')}>
      <button className={cx('header-menu-button')} ref={menuRef} onClick={handleToggleDrawerMenu}>
        <Image src={url} alt={alt} width={24} height={24}></Image>
      </button>
      {isDrawerMenuOpened && (
        <div className={cx('header-drawer-menu')}>
          <DrawerMenu drawerMenuRef={drawerMenuRef} onClick={handleToggleDrawerMenu} />
        </div>
      )}
      <button className={cx('header-logo', 'header-logo-mobile-size')} onClick={() => redirectToPage('/')}>
        GGF
      </button>
      <div className={cx('header-inner-container')}>
        <Alarm
          isActivated={isAlarmActivated}
          isAlarmExisted={isAlarmExisted}
          onClick={handleAlarmActivation}
          alarmRef={alarmRef}
        />
        <HeaderProfile
          nickname={nickname}
          profileImageUrl={profileImageUrl}
          deviceType={deviceType}
          isActivated={isHeaderProfileActivated}
          onClick={handleHeaderProfileActivation}
          headerProfileRef={headerProfileRef}
        />
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
  );
};
