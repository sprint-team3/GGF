import {
  ACTIVITIES_API,
  AVAILABLE_SCHEDULE_API,
  REVIEWS_API,
  RESERVATIONS_API,
  IMAGE_API,
  PAGE_SIZE,
  PAGE_METHOD,
} from '@/constants';

import { ActivityCreateBody, ReservationCreateBody } from '@/types';

import instance from './axios';

const Activities = {
  get: (activityId: number) => instance.get(`${ACTIVITIES_API}/${activityId}`),

  getList: () =>
    instance.get(ACTIVITIES_API, {
      params: { size: PAGE_SIZE, method: PAGE_METHOD },
    }),

  getScheduleList: (activityId: number, year: string, month: string) =>
    instance.get(`${ACTIVITIES_API}/${activityId}${AVAILABLE_SCHEDULE_API}`, {
      params: { year, month },
    }),

  getReviewList: (activityId: number) =>
    instance.get(`${ACTIVITIES_API}/${activityId}${REVIEWS_API}`, {
      params: { size: PAGE_SIZE },
    }),

  create: (value: ActivityCreateBody) => instance.post(ACTIVITIES_API, value),

  createReservation: (activityId: number, value: ReservationCreateBody) =>
    instance.post(`${ACTIVITIES_API}/${activityId}${RESERVATIONS_API}`, value),

  createImage: (value: string) => instance.post(`${ACTIVITIES_API}${IMAGE_API}`, value),
};

export default Activities;
