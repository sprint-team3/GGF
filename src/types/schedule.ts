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

export type MonthlySchedule = {
  date: string;
  reservations: MonthlyReservationCount;
};

export type DailySchedule = {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: DailyReservationCount;
};

export type DetailSchedule = {
  cursorId: 0;
  totalCount: 0;
  reservations: Omit<ReservationResponse, 'activity'>[];
};

export type ReservationsByDate = Record<string, MonthlyReservationCount>;

export type ScheduleTabOptions = {
  id: MyReservationsStatus;
  text: MyReservationsStatusKR;
};
