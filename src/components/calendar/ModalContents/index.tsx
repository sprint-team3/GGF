import { MouseEventHandler, useState } from 'react';

import classNames from 'classnames/bind';

import { getDateStringKR, getScheduleDropdownOption, getStatusCountByScheduleId } from '@/utils';

import ModalCard from '@/components/calendar/ModalCard';
import { BaseButton } from '@/components/commons/buttons';
import Dropdown from '@/components/commons/Dropdown';
import Tab from '@/components/commons/Tab';
import EmptyCard from '@/components/layout/empty/EmptyCard';
import reservationDetailMockDataConfirmed from '@/constants/mockData/reservationDetailMockDataConfirmed.json';
import reservationDetailMockDataDeclined from '@/constants/mockData/reservationDetailMockDataDeclined.json';
import reservationDetailMockDataPending from '@/constants/mockData/reservationDetailMockDataPending.json';
import reservationDetailMockDataPendingNoData from '@/constants/mockData/reservationDetailMockDataPendingNoData.json';
import DailyScheduleMockData from '@/constants/mockData/reservedScheduleMockData.json';
import { useDeviceType } from '@/hooks/useDeviceType';

import { DailyReservationResponse, DetailReservationResponse, MyReservationsStatus, StatusTabOptions } from '@/types';

import styles from './ModalContents.module.scss';

const cx = classNames.bind(styles);

type ModalContentsProps = {
  gameId: number;
  activeDate: string;
  onClickCloseButton: MouseEventHandler<HTMLButtonElement>;
  onClickCardButton: (text: string) => void;
};

const ModalContents = ({ gameId, activeDate, onClickCloseButton, onClickCardButton }: ModalContentsProps) => {
  const DailyMockData: Record<string, DailyReservationResponse[]> = {
    '2024-03-27': DailyScheduleMockData['2024-03-27'],
    '2024-03-30': DailyScheduleMockData['2024-03-30'],
    '2024-04-01': DailyScheduleMockData['2024-04-01'],
  };

  const ReservationMockData: Record<string, DetailReservationResponse> = {
    '0-confirmed': reservationDetailMockDataConfirmed as DetailReservationResponse,
    '0-declined': reservationDetailMockDataDeclined as DetailReservationResponse,
    '0-pending': reservationDetailMockDataPending as DetailReservationResponse,
    '1-pending': reservationDetailMockDataPendingNoData as DetailReservationResponse,
  };

  const dropdownOptions = getScheduleDropdownOption(DailyMockData[activeDate]);
  const statusCountByScheduleId = getStatusCountByScheduleId(DailyMockData[activeDate]);

  const [scheduleId, setScheduleId] = useState(dropdownOptions[0].value as number);

  const statusCount = statusCountByScheduleId[scheduleId];

  const statusTabOptions: StatusTabOptions[] = [
    { id: 'pending', text: '신청', count: statusCount.pending },
    { id: 'confirmed', text: '승인', count: statusCount.confirmed },
    { id: 'declined', text: '거절', count: statusCount.declined },
  ];

  const [selectedStatus, setSelectedStatus] = useState<MyReservationsStatus>(statusTabOptions[0].id);

  const currentDeviceType = useDeviceType();

  const { totalCount, reservations } = ReservationMockData[`${scheduleId}-${selectedStatus}`];

  const handleChangeScheduleId = (value: string | number) => {
    setScheduleId(value as number);
  };

  console.log(gameId);

  return (
    <div className={cx('schedule-modal-container')}>
      <Tab
        items={statusTabOptions}
        size='small'
        selectedTabId={selectedStatus}
        onClick={(selectedId) => setSelectedStatus(selectedId as MyReservationsStatus)}
      />
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
            {reservations.map(({ nickname, headCount, status, id }) => (
              <li key={`card-${id}`}>
                <ModalCard
                  nickName={nickname}
                  headCount={headCount}
                  status={status as MyReservationsStatus}
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
