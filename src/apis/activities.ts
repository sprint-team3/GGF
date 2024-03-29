import {
  ACTIVITIES_API,
  AVAILABLE_SCHEDULE_API,
  REVIEWS_API,
  RESERVATIONS_API,
  IMAGE_API,
  DEFAULT_PAGE_SIZE,
  PAGE_METHOD,
} from '@/constants';

import { ActivityCreateBody, ReservationCreateBody } from '@/types';

import instance from './axios';
import ssrInstance from './ssrInstance';

const Activities = {
  /**
   * 체험 상세 조회
   * @param activityId
   * @returns
   */
  get: (activityId: number) => instance.get(`${ACTIVITIES_API}/${activityId}`),

  /**
   * 체험 리스트 조회
   * @param category
   * @returns
   */
  getList: (category: string) =>
    ssrInstance.get(ACTIVITIES_API, {
      params: { size: DEFAULT_PAGE_SIZE, method: PAGE_METHOD, category: category },
    }),

  getScheduleList: (activityId: number, year: string, month: string) =>
    instance.get(`${ACTIVITIES_API}/${activityId}${AVAILABLE_SCHEDULE_API}`, {
      params: { year, month },
    }),

  /**
   * 리뷰 목록 조회
   * @param activityId
   * @returns
   */
  getReviewList: (activityId: number) =>
    instance.get(`${ACTIVITIES_API}/${activityId}${REVIEWS_API}`, {
      params: { size: DEFAULT_PAGE_SIZE },
    }),

  /**
   * 체험 등록
   * @param value
   * @returns
   */
  create: (value: ActivityCreateBody) => instance.post(ACTIVITIES_API, value),

  createReservation: (activityId: number, value: ReservationCreateBody) =>
    instance.post(`${ACTIVITIES_API}/${activityId}${RESERVATIONS_API}`, value),

  createImage: (value: string) => instance.post(`${ACTIVITIES_API}${IMAGE_API}`, value),
};

export default Activities;
