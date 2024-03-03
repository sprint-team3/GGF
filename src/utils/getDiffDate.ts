import dayjs, { extend, locale } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';

export const getDiffDate = (data: Date) => {
  extend(utc);
  extend(relativeTime);
  locale('en');

  return dayjs().to(dayjs(data).utc().format('YYYY-MM-DD HH:mm:ss'));
};
