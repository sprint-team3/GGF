import { useState, ReactNode } from 'react';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getMyActivitiesList, getMyReservations } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { MYPAGE_TAB_OPTIONS } from '@/constants';

import ProfileSummary from '@/components/commons/ProfileSummary';
import Tab from '@/components/commons/Tab';
import MyPosts from '@/components/mypage/MyPosts';
import ReservedTabContent from '@/components/mypage/MyReservations/ReservedTabContent';
import ReservationStatus from '@/components/mypage/ReservationStatus';
import useUserStore from '@/stores/useUserStore';

import styles from './MypageContent.module.scss';

const cx = classNames.bind(styles);

const tabContentMap: TabContent = {
  myPost: <MyPosts />,
  myReservation: <ReservedTabContent />,
  reservationsStatus: <ReservationStatus />,
};

type TabContent = {
  [key: string]: ReactNode;
};

const MypageContent = () => {
  const { userData } = useUserStore();
  const email = userData?.email;
  const nickname = userData?.nickname;
  const profileImage = userData?.profileImageUrl;

  const { data: myPosts } = useQuery({ queryKey: QUERY_KEYS.myActivities.getList, queryFn: getMyActivitiesList });
  const recruitmentTotalCount = myPosts?.length;

  const { data: myReservations } = useQuery({ queryKey: QUERY_KEYS.myReservations.get, queryFn: getMyReservations });
  const reservationTotalCount = myReservations?.length;

  const [selectedTabId, setSelectedTabId] = useState<string | number>(MYPAGE_TAB_OPTIONS[0].id);

  return (
    <div className={cx('container')}>
      <ProfileSummary
        nickname={nickname}
        email={email}
        profileImageUrl={profileImage}
        recruitmentTotalCount={recruitmentTotalCount}
        reservationTotalCount={reservationTotalCount}
      />
      <div className={cx('tab-content')}>
        <Tab items={MYPAGE_TAB_OPTIONS} size='medium' selectedTabId={selectedTabId} onClick={setSelectedTabId} />
        {tabContentMap[selectedTabId]}
      </div>
    </div>
  );
};

export default MypageContent;
