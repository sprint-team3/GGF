import { Order } from '@/types';

export const SORT_OPTIONS = [
  { title: '최신순', value: 'desc' as Order },
  { title: '오래된 순', value: 'asc' as Order },
];

export const REVIEW_SORT_OPTIONS = [
  { title: '평점 높은 순', value: 'desc' as Order },
  { title: '평점 낮은 순', value: 'asc' as Order },
];
