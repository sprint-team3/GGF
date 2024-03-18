import { MyReservationsStatus } from '@/types';

export const MY_RESERVATIONS_STATUS: Record<MyReservationsStatus, string> = {
  pending: '신청',
  confirmed: '승인',
  declined: '거절',
  canceled: '취소',
  completed: '종료',
};
