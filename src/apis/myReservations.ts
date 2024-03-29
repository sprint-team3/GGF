import { MY_RESERVATIONS_API, DEFAULT_PAGE_SIZE, REVIEWS_API } from '@/constants';

import instance from './axios';

export const MyReservations = {
  /**
   * 내 예약 리스트 조회
   * @returns
   */
  get: () =>
    instance.get(MY_RESERVATIONS_API, {
      params: {
        size: DEFAULT_PAGE_SIZE,
      },
    }),

  /**
   * 내 예약 취소
   * @param reservationId
   * @returns
   */
  cancel: (reservationId: number) =>
    instance.patch(`${MY_RESERVATIONS_API}/${reservationId}`, {
      status: 'canceled',
    }),

  /**
   * 내 예약 리뷰 작성
   * @param reservationId
   * @param value
   * @returns
   */
  createReview: ({ reservationId, value }: { reservationId: number; value: object }) => {
    return instance.post(`${MY_RESERVATIONS_API}/${reservationId}${REVIEWS_API}`, value);
  },
};
