export type ReservationStatus = 'pending' | 'confirmed' | 'declined ';

export type UpdateReservationStatusBody = { status: 'confirmed' | 'declined ' };

export type MyActivitiesBody = {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: [];
  subImageUrlsToAdd: [];
  scheduleIdsToRemove: [];
  schedulesToAdd: [];
};
