import {
  MY_ACTIVITIES_API,
  RESERVATION_DASHBOARD_API,
  RESERVED_SCHEDULE_API,
  RESERVATIONS_API,
  PAGE_SIZE,
} from '@/constants';
import { ReservationStatus, UpdateReservationStatusBody, MyActivitiesBody } from '@/types';

import instance from './axios';

export const MyActivities = {
  getList: () =>
    instance.get(`${MY_ACTIVITIES_API}`, {
      params: {
        size: PAGE_SIZE,
      },
    }),

  getMonthlyReservationList: (activityId: number, year: string, month: string) =>
    instance.get(`${MY_ACTIVITIES_API}/${activityId}${RESERVATION_DASHBOARD_API}`, {
      params: {
        year,
        month,
      },
    }),

  getDailyReservationList: (activityId: number, date: string) =>
    instance.get(`${MY_ACTIVITIES_API}/${activityId}${RESERVED_SCHEDULE_API}`, {
      params: {
        date,
      },
    }),

  getHourlyReservationList: (activityId: number, scheduleId: number, status: ReservationStatus) =>
    instance.get(`${MY_ACTIVITIES_API}/${activityId}${RESERVATIONS_API}`, {
      params: {
        size: PAGE_SIZE,
        scheduleId,
        status,
      },
    }),

  editReservationStatus: (activityId: number, reservationId: number, status: UpdateReservationStatusBody) =>
    instance.patch(`${MY_ACTIVITIES_API}/${activityId}${RESERVATIONS_API}/${reservationId}`, status),

  delete: (activityId: number) => instance.delete(`${MY_ACTIVITIES_API}/${activityId}`),

  edit: (activityId: number, myActivities: MyActivitiesBody) =>
    instance.patch(`${MY_ACTIVITIES_API}/${activityId}`, myActivities),
};
