import {
  ACTIVITIES_API,
  AVAILABLE_SCHEDULE_API,
  REVIEWS_API,
  RESERVATIONS_API,
  IMAGE_API,
  DEFAULT_PAGE_SIZE,
  PAGE_METHOD,
} from '@/constants';

import { ActivityCreateBody } from '@/types';

import instance from './axios';

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
    instance.get(ACTIVITIES_API, {
      params: { size: DEFAULT_PAGE_SIZE, method: PAGE_METHOD, category: category },
    }),

  /**
   * 체험 예약 가능일 조회
   * @param activityId
   * @param year
   * @param month
   * @returns
   */
  getScheduleList: ({ activityId, year, month }: { activityId: number; year: string; month: string }) =>
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

  create: (value: ActivityCreateBody) => instance.post(ACTIVITIES_API, value),

  /**
   * @param activityId
   * @param value
   * @returns
   */
  createReservation: ({ activityId, value }: { activityId: number; value: object }) =>
    instance.post(`${ACTIVITIES_API}/${activityId}${RESERVATIONS_API}`, value),

  createImage: (value: string) => instance.post(`${ACTIVITIES_API}${IMAGE_API}`, value),
};

export default Activities;
