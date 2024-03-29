import { ReservationStatus } from '@/types';

export const QUERY_KEYS = {
  activities: {
    get: 'activityDetail',
    getSchedules: (activityId: number) => ['getSchedules', activityId],
    getReviewList: 'reviewList',
  },

  myReservations: {
    get: ['myReservation'],
    cancel: (reservationId: number) => ['myReservation', reservationId],
    createReview: (reservationId: number) => ['createReview', reservationId],
  },

  myActivities: {
    getList: ['myActivities'],
    getMonthlyReservationList: (activityId: number, year: string, month: string) => [
      'myActivities',
      activityId,
      year,
      month,
    ],
    getDailyReservationList: (activityId: number, date: string) => ['myActivities', activityId, date],
    getHourlyReservationList: (activityId: number, scheduleId: number, status: ReservationStatus) => [
      'myActivities',
      activityId,
      scheduleId,
      status,
    ],
  },
};
