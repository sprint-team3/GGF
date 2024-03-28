import { QueryFunction } from '@tanstack/react-query';

import { MyReservations } from '@/apis/myReservations';

import { ActivityDetailResponse, ReviewResponse } from '@/types';

import Activities from './activities';

export const getMyReservations = async () => {
  const response = await MyReservations.get();
  return response.data.reservations;
};

export const getActivityDetail: QueryFunction<ActivityDetailResponse, [string, number]> = async ({ queryKey }) => {
  const postId = queryKey[1];
  const response = await Activities.get(postId);
  return response.data;
};

export const getReviewList: QueryFunction<ReviewResponse, [string, number]> = async ({ queryKey }) => {
  const postId = queryKey[1];
  const response = await Activities.getReviewList(postId);
  return response.data;
};
