import { ReservationStatus, UpdateReservationStatusBody, MyActivitiesBody } from '@/types/myActivities';

import instance from './axios';

import {
  MY_ACTIVITIES_API,
  RESERVATION_DASHBOARD_API,
  RESERVED_SCHEDULE_API,
  RESERVATIONS_API,
} from '@/constants/apiPaths';

export const MyActivities = {
  getList: (accessToken: string) =>
    instance.get(`${MY_ACTIVITIES_API}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  getMonthlyReservationList: (accessToken: string, activityId: number, year: string, month: string) =>
    instance.get(`${MY_ACTIVITIES_API}/${activityId}${RESERVATION_DASHBOARD_API}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        year,
        month,
      },
    }),

  getDailyReservationList: (accessToken: string, activityId: number, date: string) =>
    instance.get(`${MY_ACTIVITIES_API}/${activityId}${RESERVED_SCHEDULE_API}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        date,
      },
    }),

  getHourlyReservationList: (accessToken: string, activityId: number, scheduleId: number, status: ReservationStatus) =>
    instance.get(`${MY_ACTIVITIES_API}/${activityId}${RESERVATIONS_API}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        scheduleId,
        status,
      },
    }),

  patchReservationStatus: (
    accessToken: string,
    activityId: number,
    reservationId: number,
    status: UpdateReservationStatusBody,
  ) =>
    instance.patch(`${MY_ACTIVITIES_API}/${activityId}${RESERVATIONS_API}/${reservationId}`, status, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  delete: (accessToken: string, activityId: number) =>
    instance.delete(`${MY_ACTIVITIES_API}/${activityId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  patch: (accessToken: string, activityId: number, myActivities: MyActivitiesBody) =>
    instance.patch(`${MY_ACTIVITIES_API}/${activityId}`, myActivities, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};
