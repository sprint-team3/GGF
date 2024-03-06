export type MyReservations = {
  cursorId: number;
  reservations: MyReservationsReservation[];
  totalCount: number;
};

export type MyReservationsReservation = {
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

export type MyReservationscreateReviewParams = {
  rating: number;
  content: string;
};

export type MyReservationsStatus = 'pending' | 'confirmed' | 'completed' | 'declined' | 'canceled';
