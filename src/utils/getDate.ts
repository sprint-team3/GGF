import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const getExpirationDate = (date: string | Date, endTime: string) => {
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
