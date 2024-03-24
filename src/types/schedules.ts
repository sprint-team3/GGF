import { ReservationResponse } from '@/types';

export type AvailableSchedule = {
  date: string;
  startTime: string;
  endTime: string;
};

export type MonthlySchedule = {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
};

export type DailySchedule = {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
};

export type DetailSchedule = {
  cursorId: 0;
  totalCount: 0;
  reservations: Omit<ReservationResponse, 'activity'>[];
};
