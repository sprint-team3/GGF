import { MyReservationsStatus, MyReservationsStatusKR } from '@/types';

export const MY_RESERVATIONS_STATUS_EN: MyReservationsStatus[] = [
  'pending',
  'confirmed',
  'declined',
  'canceled',
  'completed',
];

export const MY_RESERVATIONS_STATUS_KR: MyReservationsStatusKR[] = ['신청', '승인', '거절', '취소', '종료'];

export const MY_RESERVATIONS_STATUS: Record<string, MyReservationsStatusKR> = {
  pending: '신청',
  confirmed: '승인',
  declined: '거절',
  canceled: '취소',
  completed: '종료',
};

export const MY_RESERVATIONS_STATUS_FILTERS = [
  { id: 'all', text: '전체' },
  { id: 'pending', text: '신청' },
  { id: 'confirmed', text: '승인' },
  { id: 'declined', text: '거절' },
  { id: 'canceled', text: '취소' },
  { id: 'completed', text: '종료' },
];
