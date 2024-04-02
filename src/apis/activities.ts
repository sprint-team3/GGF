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

  /**
   * 체험 등록
   * @param value
   * @returns
   */
  create: (value: ActivityCreateBody) => instance.post(ACTIVITIES_API, value),

  /**
   * 체험 예약 신청
   * @param activityId
   * @param value
   * @returns
   */
  createReservation: ({ activityId, value }: { activityId: number; value: ReservationCreateBody }) =>
    instance.post(`${ACTIVITIES_API}/${activityId}${RESERVATIONS_API}`, value),

  /**
   * 체험 이미지 url 생성
   * @param updatedFiles
   * @returns
   */
  createImage: async (updatedFiles: File[]) => {
    const uploadPromises = updatedFiles.map(async (file) => {
      const formData = new FormData();
      formData.append('image', file);

      const response = await instance.post(`${ACTIVITIES_API}${IMAGE_API}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    });

    const uploadedImageUrls = await Promise.all(uploadPromises);
    return uploadedImageUrls;
  },
};

export default Activities;
