export type ActivityCreateBody = {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: AvailableSchedule[];
  bannerImageUrl: string;
  subImageUrls: string[];
};

export type AvailableSchedule = {
  date: string;
  startTime: string;
  endTime: string;
};

export type ReservationCreateBody = {
  scheduleId: number;
  headCount: number;
};
