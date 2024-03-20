export type SortOption<T> = {
  key: keyof T;
  type?: 'number' | 'date';
  order?: 'asc' | 'desc';
};
