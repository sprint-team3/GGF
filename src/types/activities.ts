import { AvailableSchedule } from '@/types/schedule';

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

export type ReservationCreateBody = {
  scheduleId: number;
  headCount: number;
};
