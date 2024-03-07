import { MyReservationsStatus } from '@/types';

export const formatStatusToKorea = (status: MyReservationsStatus) => {
  if (status === 'pending') return '신청';
  if (status === 'confirmed') return '승인';
  if (status === 'declined') return '거절';
  if (status === 'canceled') return '취소';
  if (status === 'completed') return '종료';
};
