import { ActivityResponse } from './myActivities';

export type ActivitiesMockData = {
  activities: ActivityResponse[];
};

export type SelectFilter = {
  price?: number | string;
};

export type SearchFilter = {
  title?: string;
};
