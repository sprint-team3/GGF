import { MY_RESERVATIONS_API, PAGE_SIZE, REVIEWS_API } from '@/constants';

import { MyReservationscreateReviewParams, MyReservationsStatus } from '@/types';

import instance from './axios';

export const MyReservations = {
  get: (status: MyReservationsStatus) =>
    instance.get(MY_RESERVATIONS_API, {
      params: {
        size: PAGE_SIZE,
        status,
      },
    }),

  cancel: (reservationId: number) =>
    instance.patch(`${MY_RESERVATIONS_API}/${reservationId}`, {
      status: 'canceled',
    }),

  createReview: (reservationId: number, value: MyReservationscreateReviewParams) =>
    instance.post(`${MY_RESERVATIONS_API}/${reservationId}${REVIEWS_API}`, value),
};
