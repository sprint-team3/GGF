import { MY_RESERVATIONS_API, DEFAULT_PAGE_SIZE, REVIEWS_API } from '@/constants';

import instance from './axios';

export const MyReservations = {
  get: () =>
    instance.get(MY_RESERVATIONS_API, {
      params: {
        size: DEFAULT_PAGE_SIZE,
      },
    }),

  cancel: (reservationId: number) =>
    instance.patch(`${MY_RESERVATIONS_API}/${reservationId}`, {
      status: 'canceled',
    }),

  createReview: ({ reservationId, value }: { reservationId: number; value: object }) => {
    return instance.post(`${MY_RESERVATIONS_API}/${reservationId}${REVIEWS_API}`, value);
  },
};
