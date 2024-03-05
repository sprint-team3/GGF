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
  getList: (accessToken: string, cursorId?: number, size: number = PAGE_SIZE) =>
    instance.get(`${MY_ACTIVITIES_API}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        cursorId,
        size,
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

  getHourlyReservationList: (
    accessToken: string,
    activityId: number,
    scheduleId: number,
    status: ReservationStatus,
    cursorId?: number,
    size: number = PAGE_SIZE,
  ) =>
    instance.get(`${MY_ACTIVITIES_API}/${activityId}${RESERVATIONS_API}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        cursorId,
        size,
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
