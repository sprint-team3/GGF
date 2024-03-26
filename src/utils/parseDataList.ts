import { MonthlySchedule, ParsedMonthlySchedule } from '@/types';

export const parseMonthlySchedule = (scheduleData: MonthlySchedule[] | undefined) => {
  const result: ParsedMonthlySchedule = {};

  scheduleData?.forEach((schedule) => (result[schedule.date] = schedule.reservations));

  return result;
};
