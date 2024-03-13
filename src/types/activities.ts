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

export type PostTypes = 'offline' | 'online' | 'clan-recruitment' | 'game-strategy';

export type GameCategory = '리그오브레전드' | '배틀그라운드' | '오버워치 2' | '마인크프트';
