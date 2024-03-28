import { MouseEventHandler, useState } from 'react';

import classNames from 'classnames/bind';

import { getDateStringKR, getScheduleDropdownOption, getStatusCountByScheduleId } from '@/utils';

import ModalCard from '@/components/calendar/ModalCard';
import { BaseButton } from '@/components/commons/buttons';
import Dropdown from '@/components/commons/Dropdown';
import Tab from '@/components/commons/Tab';
import DailyScheduleMockData from '@/constants/mockData/reservedScheduleMockData.json';

import { DailyReservationResponse, MyReservationsStatus, StatusTabOptions } from '@/types';

import styles from './ModalContents.module.scss';

const cx = classNames.bind(styles);

type ModalContentsProps = {
  gameId: number;
  activeDate: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const ModalContents = ({ gameId, activeDate, onClick }: ModalContentsProps) => {
  const DailyMockData: Record<string, DailyReservationResponse[]> = {
    '2024-03-27': DailyScheduleMockData['2024-03-27'],
    '2024-03-30': DailyScheduleMockData['2024-03-30'],
    '2024-04-01': DailyScheduleMockData['2024-04-01'],
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
          <span className={cx('schedule-modal-reservation-count')}>0</span>
        </h3>
        <div className={cx('schedule-modal-reservation-card')}>
          <ModalCard nickName={'닉네임a'} headCount={1} status={'pending'} />
          <ModalCard nickName={'닉네임s'} headCount={2} status={'declined'} />
          <ModalCard nickName={'닉네임d'} headCount={3} status={'confirmed'} />
          <ModalCard nickName={'닉네임f'} headCount={4} status={'pending'} />
        </div>
      </div>
      <div className={cx('schedule-modal-close')}>
        <BaseButton theme='outline' size='medium' onClick={onClick}>
          닫기
        </BaseButton>
      </div>
    </div>
  );
};

export default ModalContents;
