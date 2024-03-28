export const QUERY_KEYS = {
  activities: {
    get: 'activityDetail',
    getSchedules: (activityId: number) => ['getSchedules', activityId],
    getReviewList: 'reviewList',
  },
  myReservations: {
    get: ['myReservation'],
    cancel: (reservationId: number) => ['myReservation', reservationId],
    createReview: (reservationId: number) => ['createReview', reservationId],
  },
};
