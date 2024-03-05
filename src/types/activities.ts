export type Activity = {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: Schedule[];
  bannerImageUrl: string;
  subImageUrls: string[];
};

export type Schedule = {
  date: string;
  startTime: string;
  endTime: string;
};

export type ReservationBody = {
  scheduleId: number;
  headCount: number;
};
