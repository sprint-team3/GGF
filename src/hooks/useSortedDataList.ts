import { useEffect, useState } from 'react';

import { getSortCondition } from '@/utils';

import { SortOption } from '@/types';

type Params<T> = {
  initialDataList: T[];
  sortOption: SortOption<T>;
};

const useSortedDataList = <T>({ initialDataList, sortOption }: Params<T>): T[] => {
  const [sortedDataList, setSortedDataList] = useState<T[]>([]);

  useEffect(() => {
    setSortedDataList(initialDataList.toSorted((a, b) => getSortCondition(a, b, sortOption)));
  }, [initialDataList, sortOption]);

  return sortedDataList;
};

export default useSortedDataList;
