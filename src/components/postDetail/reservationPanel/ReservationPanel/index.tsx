import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames/bind';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ERROR_MESSAGE } from '@/constants';

import { BaseButton, CountButton } from '@/components/commons/buttons';
import { FormDropdown } from '@/components/commons/inputs/FormDropdown';
import { ConfirmModal, ModalButton } from '@/components/commons/modals';
import Calendar from '@/components/postDetail/reservationPanel/Calendar';
import useToggleButton from '@/hooks/useToggleButton';

import styles from './ReservationPanel.module.scss';

const cx = classNames.bind(styles);
const { minPlayMember, availableSchedule } = ERROR_MESSAGE;

type ReservationPanelProps = {
  activityId: number;
  maxCount: number;
};

type AvailableTimesOptions = {
  title: string;
  value: number;
};

const ReservationPanel = ({ activityId, maxCount }: ReservationPanelProps) => {
  const ReservationSchema = z.object({
    headCount: z.number().min(1, { message: minPlayMember.min }),
    scheduleId: z.number().refine((id) => id !== 0, { message: availableSchedule.min }),
  });

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(ReservationSchema),
  });

  const {
    handleSubmit,
    formState: { isValid },
    setValue,
  } = methods;

  const [headCount, setHeadCount] = useState(0);
  const [availableTimes, setAvailableTimes] = useState<AvailableTimesOptions[]>([]);
  const [isNoSchedule, setIsNoSchedule] = useState(true);

  const { isVisible, handleToggleClick } = useToggleButton();

  useEffect(() => {
    setValue('headCount', headCount, { shouldValidate: true });
  }, [headCount, setValue]);

  const handleReservationSubmit = (formData: object) => {
    console.log(formData);
    handleToggleClick();
  };

  return (
    <>
      <article className={cx('panel')}>
        <div className={cx('panel-inner')}>
          <header className={cx('panel-header')}>
            <h2 className={cx('panel-header-title')}>모집 예약</h2>
          </header>
          <div className={cx('panel-content')}>
            <div className={cx('panel-content-calendar')}>
              <Calendar
                activityId={activityId}
                setAvailableTimes={setAvailableTimes}
                setIsNoSchedule={setIsNoSchedule}
              />
            </div>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handleReservationSubmit)}>
                <fieldset>
                  <legend>모집 예약하기</legend>
                  <div className={cx('panel-content-dropdown')}>
                    <FormDropdown name='scheduleId' label='접속 시간' options={availableTimes} isSmall color='yellow' />
                  </div>
                  <div className={cx('panel-content-count')}>
                    <CountButton
                      label='참여 인원'
                      count={headCount}
                      setCount={setHeadCount}
                      maxPlayMember={maxCount}
                      isDisabled={isNoSchedule}
                    />
                  </div>
                  <div className={cx('panel-content-submit')}>
                    <BaseButton theme='fill' size='large' type='submit' isDisabled={!isValid}>
                      예약하기
                    </BaseButton>
                  </div>
                </fieldset>
              </form>
            </FormProvider>
          </div>
        </div>
      </article>

      <ConfirmModal
        openModal={isVisible}
        onClose={handleToggleClick}
        state='SUCCESS'
        title='예약이 완료되었습니다.'
        desc='팀을 이룬 동료들과 함께 미션을 격파하세요'
        renderButton={<ModalButton onClick={handleToggleClick}>닫기</ModalButton>}
      />
    </>
  );
};

export default ReservationPanel;
