import { Dispatch, SetStateAction } from 'react';

import { getFilteredDataList, getSortedDataList } from '@/utils';

import usePaginatedDataList from '@/hooks/usePaginatedDataList';

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
  setPage: Dispatch<SetStateAction<number>>;
  postsPerPage: number;
};

type Returns<T> = {
  pagedDataList: T[];
  totalCount: number;
};

const useProcessedDataList = <T>({
  initialDataList,
  selectFilter,
  searchFilter,
  sortOption,
  page,
  setPage,
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

  const pagedDataList = usePaginatedDataList({
    initialDataList: sortedDataList,
    page,
    setPage,
    postsPerPage,
  });

  return { pagedDataList, totalCount };
};

export default useProcessedDataList;
