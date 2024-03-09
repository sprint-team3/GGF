import dayjs, { extend, locale } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';

export const getDiffDate = (date: string | Date) => {
  extend(utc);
  extend(relativeTime);
  locale('ko');

  return dayjs().to(dayjs(date).utc().format('YYYY-MM-DD HH:mm:ss'));
};

export const getFormatDate = (date: string | Date) => {
  return dayjs(date).format('YYYY년 MM월 DD일');
};
