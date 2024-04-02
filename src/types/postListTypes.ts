import { MyActivitiesResponse } from './myActivities';

export type ActivitiesMockData = {
  activities: MyActivitiesResponse[];
};

export type SelectFilter = {
  price?: number | string;
};

export type SearchFilter = {
  title?: string;
};
