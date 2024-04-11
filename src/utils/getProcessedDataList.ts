import { getFilteredDataList, getSortedDataList, getPaginatedDataList } from '@/utils';

import { SortOption } from '@/types';

type Params<T> = {
  initialDataList: T[];
  selectFilter?: {
    [K in keyof T]?: string | number;
  };
  searchFilter?: {
    [K in keyof T]?: T[K];
  };
  sortOption: SortOption<T>;
  page: number;
  postsPerPage: number;
};

type Returns<T> = {
  pagedDataList: T[];
  totalCount: number;
};

export const getProcessedDataList = <T>({
  initialDataList,
  selectFilter,
  searchFilter,
  sortOption,
  page,
  postsPerPage,
}: Params<T>): Returns<T> => {
  const { filteredDataList, totalCount } = getFilteredDataList({
    initialDataList,
    selectFilter,
    searchFilter,
  });

  const sortedDataList = getSortedDataList({
    initialDataList: filteredDataList,
    sortOption,
  });

  const pagedDataList = getPaginatedDataList({
    initialDataList: sortedDataList,
    page,
    postsPerPage,
  });

  return { pagedDataList, totalCount };
};
