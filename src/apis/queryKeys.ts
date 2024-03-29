import { ReservationStatus } from '@/types';

export const QUERY_KEYS = {
  activities: {
    get: 'activityDetail',
    getList: 'activities',
    getScheduleList: (activityId: number, year: string, month: string) => ['getScheduleList', activityId, year, month],
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
    getDetailReservationList: (activityId: number, scheduleId: number, status: ReservationStatus) => [
      'myActivities',
      activityId,
      scheduleId,
      status,
    ],
  },

  users: {
    get: 'users',
    edit: (userId: number) => ['myInfomations', userId],
  },

  myNotifications: {
    get: 'alarms',
  },
};
