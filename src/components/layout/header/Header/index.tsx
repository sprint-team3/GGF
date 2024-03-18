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
import useMultipleTogglePopup from '@/hooks/useMultipleTogglePopup';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.drawerMenu;

const Header = () => {
  const [isAlarmExisted, setIsAlarmExisted] = useState(false);
  const multipleTogglePopupResults = useMultipleTogglePopup(3);

  const { email, nickname, profileImageUrl } = userData;
  const { totalCount, notifications } = alarmData;

  useEffect(() => {
    setIsAlarmExisted(totalCount > 0);
  }, [totalCount]);

  return (
    <>
      <div className={cx('header')}>
        <button
          className={cx('header-menu-button', 'sm-only')}
          ref={multipleTogglePopupResults[0].buttonRef}
          onClick={multipleTogglePopupResults[0].togglePopup}
        >
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
              isActivated={multipleTogglePopupResults[1].isOpen}
              isAlarmExisted={isAlarmExisted}
              onClick={multipleTogglePopupResults[1].togglePopup}
              alarmRef={multipleTogglePopupResults[1].buttonRef}
            />
            <HeaderProfile
              nickname={nickname}
              profileImageUrl={profileImageUrl}
              isActivated={multipleTogglePopupResults[2].isOpen}
              onClick={multipleTogglePopupResults[2].togglePopup}
              headerProfileRef={multipleTogglePopupResults[2].buttonRef}
            />
          </div>
        </div>
        {multipleTogglePopupResults[1].isOpen && (
          <div className={cx('header-alarm-list')}>
            <AlarmList
              notifications={notifications}
              totalCount={totalCount}
              alarmListRef={multipleTogglePopupResults[1].popupRef}
            />
          </div>
        )}
        {multipleTogglePopupResults[2].isOpen && (
          <div className={cx('header-user-menu')}>
            <UserMenu
              profileImageUrl={profileImageUrl}
              nickname={nickname}
              email={email}
              userMenuRef={multipleTogglePopupResults[2].popupRef}
            />
          </div>
        )}
      </div>
      {multipleTogglePopupResults[0].isOpen && (
        <div className={cx('header-drawer-menu')}>
          <DrawerMenu
            drawerMenuRef={multipleTogglePopupResults[0].popupRef}
            onClick={multipleTogglePopupResults[0].togglePopup}
          />
        </div>
      )}
    </>
  );
};

export default Header;
