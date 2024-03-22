import { MY_RESERVATIONS_API, DEFAULT_PAGE_SIZE, REVIEWS_API } from '@/constants';

import { CreateReviewParams, MyReservationsStatus } from '@/types';

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

  createReview: (reservationId: number, value: CreateReviewParams) =>
    instance.post(`${MY_RESERVATIONS_API}/${reservationId}${REVIEWS_API}`, value),
};
