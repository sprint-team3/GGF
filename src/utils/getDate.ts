import dayjs, { extend, locale } from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';

/**
 *
 * @param date
 * @param endTime
 * @returns boolean
 */
export const isExpirationDate = (date: string | Date, endTime: string) => {
  const expirationTime = dayjs(`${date} ${endTime}`);
  return expirationTime.diff(dayjs(), 'second') < 0;
};

/**
 *
 * @param date
 * @returns 'YYYY-MM-DD'
 */
export const getFormatDate = (date: string | Date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const getDayPickerFormatDate = (originalDate: Date) => {
  return originalDate
    ?.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\s/g, '')
    .replace(/\.$/, '')
    .replace(/\./g, '-')
    .split('T')[0];
};

export const getElapsedTimeToKST = (createdAt: string | Date): string => {
  locale('ko');
  extend(utcPlugin);
  extend(timezone);
  extend(relativeTime);
  const kstTime = dayjs(createdAt).utc().tz('Asia/Seoul');

  return kstTime.fromNow();
};

/**
 *
 * @returns 'HH:mm'
 */
export const getCurrentTime = () => {
  const currentTime = dayjs().format('HH:mm');
  return currentTime;
};

/**
 * @param timestamp
 * @returns 'HH:mm'
 */
export const formatTimestamp = (timestamp: number) => {
  const formattedTime = dayjs(timestamp).format('HH:mm');
  return formattedTime;
};

export const getYesterday = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

export const getAfter61Days = () => {
  const after60Days = new Date();
  const day = after60Days.getDate();
  after60Days.setDate(day + 61);
  return after60Days;
};
