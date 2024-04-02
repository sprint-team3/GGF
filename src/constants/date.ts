import { MonthlyReservationCount } from '@/types';

export const CALENDAR_WEEKS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THUSDAY', 'FRIDAY', 'SATURDAY'];

export const SCHEDULE_ORDER: (keyof MonthlyReservationCount)[] = ['pending', 'confirmed', 'completed'];
