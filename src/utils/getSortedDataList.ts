import { getSortCondition } from '@/utils';

import { SortOption } from '@/types';

type Params<T> = {
  initialDataList: T[];
  sortOption: SortOption<T>;
};

export const getSortedDataList = <T>({ initialDataList, sortOption }: Params<T>): T[] => {
  return initialDataList.toSorted((a, b) => getSortCondition(a, b, sortOption));
};
