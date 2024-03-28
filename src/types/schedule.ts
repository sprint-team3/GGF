import { MyReservationsStatus, MyReservationsStatusKR, ReservationResponse } from '@/types';

export type AvailableSchedule = {
  date: string;
  startTime: string;
  endTime: string;
};

export type MonthlyReservationCount = {
  completed: number;
  confirmed: number;
  pending: number;
};

export type DailyReservationCount = {
  declined: number;
  confirmed: number;
  pending: number;
};

export type MonthlyReservationResponse = {
  date: string;
  reservations: MonthlyReservationCount;
};

export type DailyReservationResponse = {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: DailyReservationCount;
};

export type DetailReservationResponse = {
  cursorId: 0;
  totalCount: 0;
  reservations: Omit<ReservationResponse, 'activity'>[];
};

export type ReservationsByDate = Record<string, MonthlyReservationCount>;

export type StatusTabOptions = {
  id: MyReservationsStatus;
  text: MyReservationsStatusKR;
  count: number;
};
