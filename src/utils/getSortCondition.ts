import { SortOption } from '@/types';

export const getSortCondition = <T>(a: T, b: T, sortOption: SortOption<T>): number => {
  const { key, type, order } = sortOption;

  if (type === 'number' && order === 'asc') return +a[key] - +b[key];
  if (type === 'number' && order === 'desc') return +b[key] - +a[key];
  if (type === 'date' && order === 'asc') return +new Date(a[key] as string) - +new Date(b[key] as string);
  if (type === 'date' && order === 'desc') return +new Date(b[key] as string) - +new Date(a[key] as string);

  return 0;
};
