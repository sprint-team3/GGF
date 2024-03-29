import { MouseEventHandler, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getMyActivitiesDailyReservationList, getMyActivitiesDetailReservationList } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { getDateStringKR, getScheduleDropdownOption, getStatusCountByScheduleId } from '@/utils';

import ModalCard from '@/components/calendar/ModalCard';
import { BaseButton } from '@/components/commons/buttons';
import Dropdown from '@/components/commons/Dropdown';
import Tab from '@/components/commons/Tab';
import EmptyCard from '@/components/layout/empty/EmptyCard';
import { useDeviceType } from '@/hooks/useDeviceType';

import { ReservationDetail, ReservationStatus, StatusTabOptions } from '@/types';

import styles from './ModalContents.module.scss';

const cx = classNames.bind(styles);

type ModalContentsProps = {
  gameId: number;
  activeDate: string;
  onClickCloseButton: MouseEventHandler<HTMLButtonElement>;
  onClickCardButton: (text: string) => void;
};

const ModalContents = ({ gameId, activeDate, onClickCloseButton, onClickCardButton }: ModalContentsProps) => {
  const { data: dailySchedules } = useQuery({
    queryKey: QUERY_KEYS.myActivities.getDailyReservationList(gameId, activeDate),
    queryFn: () => getMyActivitiesDailyReservationList(gameId, activeDate),
  });

  const dropdownOptions = getScheduleDropdownOption(dailySchedules);
  const statusCountByScheduleId = getStatusCountByScheduleId(dailySchedules);

  const [scheduleId, setScheduleId] = useState(dropdownOptions[0].value as number);

  const statusCount = statusCountByScheduleId[scheduleId];

  const statusTabOptions: StatusTabOptions[] = [
    { id: 'pending', text: '신청', count: statusCount.pending },
    { id: 'confirmed', text: '승인', count: statusCount.confirmed },
    { id: 'declined', text: '거절', count: statusCount.declined },
  ];

  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus>(statusTabOptions[0].id);

  const currentDeviceType = useDeviceType();

  const { data: detailReservations } = useQuery({
    queryKey: QUERY_KEYS.myActivities.getDetailReservationList(gameId, scheduleId, selectedStatus),
    queryFn: () => getMyActivitiesDetailReservationList(gameId, scheduleId, selectedStatus),
  });

  const { totalCount, reservations } = detailReservations;

  const handleChangeTabId = (selectedId: string | number) => {
    setSelectedStatus(selectedId as ReservationStatus);
  };

  const handleChangeScheduleId = (value: string | number) => {
    setScheduleId(value as number);
  };

  return (
    <div className={cx('schedule-modal-container')}>
      <Tab items={statusTabOptions} size='small' selectedTabId={selectedStatus} onClick={handleChangeTabId} />
      <div className={cx('schedule-modal-date')}>
        <h3 className={cx('schedule-modal-date-title')}>예약 날짜</h3>
        <span className={cx('schedule-modal-date-korean')}>{getDateStringKR(activeDate)}</span>
        <Dropdown options={dropdownOptions} onChange={handleChangeScheduleId} color='yellow' isSmall />
      </div>
      <div className={cx('schedule-modal-reservation')}>
        <h3 className={cx('schedule-modal-reservation-title')}>
          <span>예약 내역</span>
          <span className={cx('schedule-modal-reservation-count')}>{totalCount}</span>
        </h3>
        {totalCount !== 0 ? (
          <ul className={cx('schedule-modal-reservation-card', { scroll: totalCount > 2 })}>
            {reservations.map(({ id, nickname, headCount, status }: ReservationDetail) => (
              <li key={`card-${id}`}>
                <ModalCard
                  nickName={nickname}
                  headCount={headCount}
                  status={status as ReservationStatus}
                  onClickButton={onClickCardButton}
                />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyCard text='No Reservation' isSmall />
        )}
      </div>
      <div className={cx('schedule-modal-close')}>
        <BaseButton theme='outline' size={currentDeviceType === 'PC' ? 'medium' : 'large'} onClick={onClickCloseButton}>
          닫기
        </BaseButton>
      </div>
    </div>
  );
};

export default ModalContents;
