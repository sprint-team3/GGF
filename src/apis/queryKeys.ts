export const QUERY_KEYS = {
  activities: {
    getSchedules: (activityId: number) => ['getSchedules', activityId],
  },
  myReservations: {
    get: ['myReservation'],
    cancel: (reservationId: number) => ['myReservation', reservationId],
    createReview: (reservationId: number) => ['createReview', reservationId],
  },
};
