import Image from 'next/image';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames/bind';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { ReservationSchema } from '@/apis/myReservations/schema';
import { API_ERROR_MESSAGE, INITIAL_DATA, SVGS } from '@/constants';

import { BaseButton, CountButton } from '@/components/commons/buttons';
import { FormDropdown } from '@/components/commons/inputs/FormDropdown';
import { ConfirmModal, ModalButton } from '@/components/commons/modals';
import Calendar from '@/components/postDetail/reservationPanel/Calendar';
import { useCreateReservation } from '@/components/postDetail/reservationPanel/ReservationPanel/data-access/useCreateReservation';
import useMultiState from '@/hooks/useMultiState';
import useRouteToPage from '@/hooks/useRouteToPage';

import { ReservationCreateBody, AvailableTimesOptions } from '@/types';

import styles from './ReservationPanel.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.arrow.chevron;

type ReservationPanelProps = {
  activityId: number;
  maxCount: number;
  isLoggedIn: boolean;
  onClick: () => void;
};

const ReservationPanel = ({ activityId, maxCount, onClick, isLoggedIn = false }: ReservationPanelProps) => {
  const { redirectToPage } = useRouteToPage();

  const methods = useForm<ReservationCreateBody>({
    mode: 'all',
    resolver: zodResolver(ReservationSchema),
  });

  const {
    handleSubmit,
    formState: { isValid },
    setValue,
  } = methods;

  const { multiState, toggleClick } = useMultiState([
    'submitSuccessModal',
    'pastScheduleAlertModal',
    'reservationUnavailableAlertModal',
  ]);

  const handleToggleModal = (modalKey: string) => {
    toggleClick(modalKey);
  };

  const { reservationMutation } = useCreateReservation({ handleToggleModal });

  const [headCount, setHeadCount] = useState(0);
  const [availableTimes, setAvailableTimes] = useState<AvailableTimesOptions[]>([INITIAL_DATA.reservation.times]);
  const [isNoSchedule, setIsNoSchedule] = useState(true);

  const setCount = (count: number) => {
    setHeadCount(count);
    setValue('headCount', count, { shouldValidate: true });
  };

  const handleReservationSubmit: SubmitHandler<ReservationCreateBody> = (formData) => {
    reservationMutation({ activityId, value: formData });
  };

  return (
    <>
      <article className={cx('panel')}>
        <div className={cx('lg-hidden')}>
          <nav className={cx('panel-mobile-nav')}>
            <button onClick={onClick}>
              <Image src={url} alt={alt} width={48} height={48} />
            </button>
          </nav>
        </div>
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
                      count={isNoSchedule ? 0 : headCount}
                      setCount={setCount}
                      maxPlayMember={isNoSchedule ? 0 : maxCount}
                      isDisabled={isNoSchedule}
                    />
                  </div>
                  <div className={cx('panel-content-submit')}>
                    {isLoggedIn ? (
                      <BaseButton theme='fill' size='large' type='submit' isDisabled={!isValid}>
                        예약하기
                      </BaseButton>
                    ) : (
                      <BaseButton theme='fill' size='large' type='button' onClick={() => redirectToPage('/signin')}>
                        로그인하기
                      </BaseButton>
                    )}
                  </div>
                </fieldset>
              </form>
            </FormProvider>
          </div>
        </div>
      </article>

      <ConfirmModal
        openModal={multiState.submitSuccessModal}
        onClose={() => handleToggleModal('submitSuccessModal')}
        state='SUCCESS'
        title='예약이 완료되었습니다'
        desc='팀을 이룬 동료들과 함께 미션을 격파하세요'
        renderButton={
          <ModalButton variant='success' onClick={() => handleToggleModal('submitSuccessModal')}>
            닫기
          </ModalButton>
        }
      />

      <ConfirmModal
        warning
        openModal={multiState.pastScheduleAlertModal}
        onClose={() => handleToggleModal('pastScheduleAlertModal')}
        state='ALERT'
        title='예약 실패했습니다.'
        desc={API_ERROR_MESSAGE.reservation[400]}
        renderButton={
          <ModalButton onClick={() => handleToggleModal('pastScheduleAlertModal')} variant='warning'>
            확인
          </ModalButton>
        }
      />

      <ConfirmModal
        warning
        openModal={multiState.reservationUnavailableAlertModal}
        onClose={() => handleToggleModal('reservationUnavailableAlertModal')}
        state='ALERT'
        title='예약 실패했습니다.'
        desc={API_ERROR_MESSAGE.reservation[409]}
        renderButton={
          <ModalButton onClick={() => handleToggleModal('reservationUnavailableAlertModal')} variant='warning'>
            확인
          </ModalButton>
        }
      />
    </>
  );
};

export default ReservationPanel;
