import { MyReservationsStatus } from '@/types/myReservations';

export type ReservationStatus = Exclude<MyReservationsStatus, 'canceled' | 'completed'>;

export type EditReservationStatusBody = {
  status: Extract<MyReservationsStatus, 'confirmed' | 'declined'>;
};

export type MyActivitiesBody = {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: string[];
};
