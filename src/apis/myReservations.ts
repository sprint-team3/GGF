import { MY_RESERVATIONS_API, DEFAULT_PAGE_SIZE, REVIEWS_API } from '@/constants';

import { MyReservationsStatus } from '@/types';

import instance from './axios';

export const MyReservations = {
  get: (status: MyReservationsStatus) =>
    instance.get(MY_RESERVATIONS_API, {
      params: {
        size: DEFAULT_PAGE_SIZE,
        status,
      },
    }),

  cancel: (reservationId: number) =>
    instance.patch(`${MY_RESERVATIONS_API}/${reservationId}`, {
      status: 'canceled',
    }),

  createReview: (newReview: { reservationId: number; value: object }) => {
    const { reservationId } = newReview;
    const { value } = newReview;
    return instance.post(`${MY_RESERVATIONS_API}/${reservationId}${REVIEWS_API}`, value);
  },
};
