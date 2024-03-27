import { MonthlyReservationCount } from '@/types';

export const MONTHS: Record<number, string> = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const DAYS: Record<number, string> = {
  0: 'SUNDAY',
  1: 'MONDAY',
  2: 'TUESDAY',
  3: 'WEDNESDAY',
  4: 'THUSDAY',
  5: 'FRIDAY',
  6: 'SATURDAY',
};

export const ONE_WEEK = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THUSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

export const SCHEDULE_ORDER: (keyof MonthlyReservationCount)[] = ['pending', 'confirmed', 'completed'];
