import { QueryFunction } from '@tanstack/react-query';

import { MyActivities } from '@/apis/myActivities';
import { MyReservations } from '@/apis/myReservations';

import {
  ActivityDetailResponse,
  ReviewResponse,
  EditReservationStatusBody,
  MyActivitiesBody,
  ReservationStatus,
} from '@/types';

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

export const getMyActivitiesList = async () => {
  const response = await MyActivities.getList();
  return response.data;
};

export const getMyActivitiesMonthlyReservationList = async (activityId: number, year: string, month: string) => {
  const response = await MyActivities.getMonthlyReservationList(activityId, year, month);
  return response.data;
};

export const getMyActivitiesDailyReservationList = async (activityId: number, date: string) => {
  const response = await MyActivities.getDailyReservationList(activityId, date);
  return response.data;
};

export const getMyActivitiesHourlyReservationList = async (
  activityId: number,
  scheduleId: number,
  status: ReservationStatus,
) => {
  const response = await MyActivities.getHourlyReservationList(activityId, scheduleId, status);
  return response.data;
};

export const editMyActivitiesReservationStatus = async (
  activityId: number,
  reservationId: number,
  status: EditReservationStatusBody,
) => {
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
