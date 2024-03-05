export type ReservationStatus = 'pending' | 'confirmed' | 'declined ';

export type EditReservationStatusBody = { status: 'confirmed' | 'declined ' };

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
