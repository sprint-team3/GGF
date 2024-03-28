import { MyReservations } from '@/apis/myReservations';

export const getMyReservations = async () => {
  const response = await MyReservations.get();
  return response.data.reservations;
};
