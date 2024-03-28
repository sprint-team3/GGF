import { useState } from 'react';

import classNames from 'classnames/bind';

import { SCHEDULE_TAB_OPTIONS } from '@/constants';

import Tab from '@/components/commons/Tab';

import { MyReservationsStatus } from '@/types';

import styles from './ModalContents.module.scss';

const cx = classNames.bind(styles);

type ModalContentsProps = {
  gameId: number;
  activeDate: string;
};

const ModalContents = ({ gameId, activeDate }: ModalContentsProps) => {
  const [selectedTabId, setSelectedTabId] = useState<MyReservationsStatus>(SCHEDULE_TAB_OPTIONS[0].id);

  console.log(gameId);
  console.log(activeDate);

  return (
    <div className={cx('schedule-modal-container')}>
      <Tab
        items={SCHEDULE_TAB_OPTIONS}
        size='small'
        selectedTabId={selectedTabId}
        onClick={(selectedId) => setSelectedTabId(selectedId as MyReservationsStatus)}
      />
    </div>
  );
};

export default ModalContents;
