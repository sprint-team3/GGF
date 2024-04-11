import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import Activities from '@/apis/activities';

type useCreateReservationProps = {
  handleToggleModal: (modalKey: string) => void;
};

export const useCreateReservation = ({ handleToggleModal }: useCreateReservationProps) => {
  const { mutate: reservationMutation } = useMutation({
    mutationFn: Activities.createReservation,
    onSuccess: () => {
      handleToggleModal('submitSuccessModal');
    },
    onError: (error) => {
      if ((error as AxiosError)?.response?.status === 400) {
        handleToggleModal('pastScheduleAlertModal');
      }

      if ((error as AxiosError)?.response?.status === 409) {
        handleToggleModal('reservationUnavailableAlertModal');
      }
    },
  });

  return { reservationMutation };
};
