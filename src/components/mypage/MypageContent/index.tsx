import { useState, ReactNode } from 'react';

import classNames from 'classnames/bind';

import { MYPAGE_TAB_OPTIONS } from '@/constants';

import ProfileSummary from '@/components/commons/ProfileSummary';
import Tab from '@/components/commons/Tab';
import MyPosts from '@/components/mypage/MyPosts';
import ReservedTabContent from '@/components/mypage/MyReservations/ReservedTabContent';
import { USER_DATA } from '@/constants/mockData/headerMockData';
import { MY_ACTIVITIES, MY_RESERVATIONS } from '@/constants/mockData/profileSummaryMockData';

import styles from './MypageContent.module.scss';

const cx = classNames.bind(styles);

const tabContentMap: TabContent = {
  myPost: <MyPosts />,
  myReservation: <ReservedTabContent />,
  reservationsStatus: <div>ReservationsStatusTabContent component here</div>,
};

type TabContent = {
  [key: string]: ReactNode;
};

const MypageContent = () => {
  const [selectedTabId, setSelectedTabId] = useState<string | number>(MYPAGE_TAB_OPTIONS[0].id);

  return (
    <div className={cx('container')}>
      <ProfileSummary
        nickname={USER_DATA.nickname}
        email={USER_DATA.email}
        profileImageUrl={USER_DATA.profileImageUrl}
        recruitmentTotalCount={MY_ACTIVITIES.totalCount}
        reservationTotalCount={MY_RESERVATIONS.totalCount}
      />
      <div className={cx('tab-content')}>
        <Tab items={MYPAGE_TAB_OPTIONS} size='medium' selectedTabId={selectedTabId} onClick={setSelectedTabId} />
        {tabContentMap[selectedTabId]}
      </div>
    </div>
  );
};

export default MypageContent;
