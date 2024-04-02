import { QueryFunction } from '@tanstack/react-query';

import { MyActivities } from '@/apis/myActivities';
import { MyReservations } from '@/apis/myReservations';

import {
  ActivityDetailResponse,
  ReviewResponse,
  MyActivitiesBody,
  ReservationStatus,
  ActivitiesResponse,
  changeStatusMutationParams,
} from '@/types';

import Activities from './activities';
import { MyNotifications } from './myNotifications';
import { Users } from './users';

export const getMyReservations = async () => {
  const response = await MyReservations.get();
  return response.data.reservations;
};

export const getActivityDetail: QueryFunction<ActivityDetailResponse, [string, number]> = async ({ queryKey }) => {
  const postId = queryKey[1];
  const response = await Activities.get(postId);
  return response.data;
};

export const getActivities: QueryFunction<ActivitiesResponse, [string, string]> = async ({ queryKey }) => {
  const category = queryKey[1];
  const response = await Activities.getList(category);
  return response.data;
};

export const getReviewList: QueryFunction<ReviewResponse, [string, number]> = async ({ queryKey }) => {
  const postId = queryKey[1];
  const response = await Activities.getReviewList(postId);
  return response.data;
};

export const getMyActivitiesList = async () => {
  const response = await MyActivities.getList();
  return response.data.activities;
};

export const getMyActivitiesMonthlyReservationList = async (activityId: number, year: string, month: string) => {
  const response = await MyActivities.getMonthlyReservationList(activityId, year, month);
  return response.data;
};

export const getMyActivitiesDailyReservationList = async (activityId: number, date: string) => {
  const response = await MyActivities.getDailyReservationList(activityId, date);
  return response.data;
};

export const getMyActivitiesDetailReservationList = async (
  activityId: number,
  scheduleId: number,
  status: ReservationStatus,
) => {
  const response = await MyActivities.getDetailReservationList(activityId, scheduleId, status);
  return response.data;
};

export const editMyActivitiesReservationStatus = async ({
  activityId,
  reservationId,
  status,
}: changeStatusMutationParams) => {
  const response = await MyActivities.editReservationStatus(activityId, reservationId, status);
  return response.status;
};

export const deleteMyActivities = async (activityId: number) => {
  const response = await MyActivities.delete(activityId);
  return response.status;
};

export const editMyActivities = async (activityId: number, myActivities: MyActivitiesBody) => {
  const response = await MyActivities.edit(activityId, myActivities);
  return response.status;
};

export const getUser = async () => {
  const response = await Users.get();
  return response.data;
};

export const getMyNotifications = async () => {
  const response = await MyNotifications.get();
  return response.data;
};

export const deleteMyNotification = async (notificationId: number) => {
  const response = await MyNotifications.delete(notificationId);
  return response.data;
};

export const deleteMyNotifications = async (notificationIds: number[]) => {
  const response = await Promise.all(
    notificationIds.map(async (notificationId) => {
      return await deleteMyNotification(notificationId);
    }),
  );
  return response;
};
