import { MY_RESERVATIONS_API, PAGE_SIZE, REVIEWS_API } from '@/constants';

import {
  MyReservationsParams,
  MyReservationsStatus,
} from '@/types/myReservations';

import instance from './axios';

export const MyReservations = {
  get: (status: MyReservationsStatus) =>
    instance.get(MY_RESERVATIONS_API, {
      params: {
        size: PAGE_SIZE,
        status,
      },
    }),

  edit: (reservationId: number) =>
    instance.patch(`${MY_RESERVATIONS_API}/${reservationId}`, {
      status: 'canceled',
    }),

  addReview: ({ reservationId, rating, content }: MyReservationsParams) =>
    instance.post(`${MY_RESERVATIONS_API}/${reservationId}${REVIEWS_API}`, {
      rating,
      content,
    }),
};
