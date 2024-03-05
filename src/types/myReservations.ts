export type MyReservations = {
  cursorId: number;
  reservations: Reservation[];
  totalCount: number;
};

export type Reservation = {
  id: number;
  teamId: string;
  userId: number;
  activity: {
    bannerImageUrl: string;
    title: string;
    id: number;
  };
  scheduleId: number;
  status: MyReservationsStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type MyReservationsStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'declined'
  | 'canceled';

export type MyReservationsParams = {
  reservationId: number;
  rating: number;
  content: string;
};
