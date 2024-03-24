import { Order } from '@/types';

export const SORT_OPTIONS = [
  { title: '최신순', value: 'desc' as Order },
  { title: '오래된순', value: 'asc' as Order },
];

export const REVIEW_SORT_OPTIONS = [
  { title: '평점 높은순', value: 'desc' as Order },
  { title: '평점 낮은순', value: 'asc' as Order },
];
