import { PRICE_TO_POST_TYPES } from '@/constants';

import {
  DailyReservationCount,
  DailyReservationResponse,
  MonthlyReservationResponse,
  ReservationsByDate,
} from '@/types';

import { formatCategoryToGameNameKR } from './gameFormatter';

const DELIMITER = '&iquest';

export const joinTitleByDelimiter = (array: string[]) => array.join(DELIMITER);

export const splitTitleByDelimiter = (inputString: string) => {
  const [category, title, postType, address, MaxCount] = inputString.split(DELIMITER);

  return {
    category: formatCategoryToGameNameKR(category),
    title,
    postType: PRICE_TO_POST_TYPES[+postType],
    address,
    MaxCount,
  };
};

export const splitTitleByDelimiterForEditForm = (inputString: string) => {
  const [category, title, postType, address, headcount] = inputString.split(DELIMITER);

  return {
    category,
    title,
    postType: Number(postType),
    address,
    headcount: Number(headcount),
  };
};

export const splitDescByDelimiter = (inputString: string) => {
  const [description, discordLink] = inputString.split(DELIMITER);

  return {
    description,
    discordLink,
  };
};

export const getScheduleByDate = (scheduleData: MonthlyReservationResponse[] | undefined) => {
  const result: ReservationsByDate = {};

  scheduleData?.forEach((schedule) => {
    result[schedule.date] = schedule.reservations;
  });

  return result;
};

export const getStatusCountByScheduleId = (scheduleData: DailyReservationResponse[] | undefined) => {
  const result: { [id: number]: DailyReservationCount } = {};

  scheduleData?.forEach((schedule) => {
    result[schedule.scheduleId] = schedule.count;
  });

  return result;
};

export const getScheduleDropdownOption = (scheduleData: DailyReservationResponse[] | undefined) => {
  const result: { title: string; value: number | string }[] = [];

  scheduleData?.forEach((schedule) => {
    result.push({
      title: `${schedule.startTime} - ${schedule.endTime}`,
      value: schedule.scheduleId,
    });
  });

  return result;
};
