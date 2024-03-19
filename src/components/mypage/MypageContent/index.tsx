import { useState, ReactNode } from 'react';

import classNames from 'classnames/bind';

import { MYPAGE_TAB_OPTIONS } from '@/constants';

import ProfileSummary from '@/components/commons/ProfileSummary';
import Tab from '@/components/commons/Tab';
import { userData } from '@/constants/mockData/headerMockData';
import { MY_ACTIVITIES, MY_RESERVATIONS } from '@/constants/mockData/profileSummaryMockData';

import styles from './MypageContent.module.scss';

const cx = classNames.bind(styles);

type TabContent = {
  [key: string]: ReactNode;
};

const MypageContent = () => {
  const [selectedTabId, setSelectedTabId] = useState(MYPAGE_TAB_OPTIONS[0].id);

  const tabContentMap: TabContent = {
    myPost: <div>MyPostTabContent</div>,
    myReservation: <div>ReservedTabContent</div>,
    reservationsStatus: <div>ReservationsStatusTabContent</div>,
  };

  return (
    <div className={cx('container')}>
      <ProfileSummary
        nickname={userData.nickname}
        email={userData.email}
        profileImageUrl={userData.profileImageUrl}
        recruitmentTotalCount={MY_ACTIVITIES.totalCount}
        reservationTotalCount={MY_RESERVATIONS.totalCount}
      />
      <div className={cx('tab-content')}>
        <Tab
          items={MYPAGE_TAB_OPTIONS}
          size='medium'
          selectedTabId={selectedTabId}
          setSelectedTabId={setSelectedTabId}
        />
        {tabContentMap[selectedTabId]}
      </div>
    </div>
  );
};

export default MypageContent;
