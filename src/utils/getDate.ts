import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const getDiffDate = (date: string | Date) => {
  const newDate = dayjs();
  const endDateTime = dayjs(date);
  const getDiffDate = endDateTime.diff(newDate, 'second');

  return getDiffDate;
};

/**
 *
 * @param date
 * @returns 'YYYY-MM-DD'
 */
export const getFormatDate = (date: string | Date) => {
  return dayjs(date).format('YYYY-MM-DD');
};
