import { ActivityResponse, SortOption } from '@/types';

export const POST_TYPES_FOR_LISTPAGE = [
  { id: 'all', text: '전체' },
  { id: 0, text: '오프라인 모집' },
  { id: 1, text: '온라인 모집' },
  { id: 2, text: '클랜 모집' },
  { id: 3, text: '게임 공략' },
];

export const initialSelectFilter = {
  price: POST_TYPES_FOR_LISTPAGE[0].id,
};

export const initialSortOption: SortOption<ActivityResponse> = {
  key: 'createdAt',
  order: 'desc',
  type: 'date',
};
