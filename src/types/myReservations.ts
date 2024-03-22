export type MyReservationsResponse = {
  cursorId: number | null;
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
  status: MyReservationsStatus | string;
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

export type MyReservationsStatusKR = '신청' | '승인' | '거절' | '취소' | '종료';
