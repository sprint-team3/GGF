import { ScheduleTabOptions } from '@/types';

export const MYPAGE_TAB_OPTIONS = [
  { id: 'myPost', text: '등록한 게시글' },
  { id: 'myReservation', text: '신청한 예약' },
  { id: 'reservationsStatus', text: '예약 현황' },
];

export const SCHEDULE_TAB_OPTIONS: ScheduleTabOptions[] = [
  { id: 'pending', text: '신청' },
  { id: 'confirmed', text: '승인' },
  { id: 'declined', text: '거절' },
];
