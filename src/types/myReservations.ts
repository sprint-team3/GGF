export type MyReservations = {
  cursorId: number;
  reservations: ReservationResponse[];
  totalCount: number;
};

export type ReservationResponse = {
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

export type CreateReviewParams = {
  rating: number;
  content: string;
};

export type MyReservationsStatus = 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
