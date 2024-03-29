export type SortOption<T> = {
  key: keyof T;
  type?: 'number' | 'date';
  order?: Order;
};

export type Order = 'asc' | 'desc';
