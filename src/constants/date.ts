import { MonthlyReservationCount } from '@/types';

export const CALENDAR_WEEKS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THUSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

export const SCHEDULE_ORDER: (keyof MonthlyReservationCount)[] = ['pending', 'confirmed', 'completed'];
