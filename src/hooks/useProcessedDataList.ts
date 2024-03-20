import { Dispatch, SetStateAction } from 'react';

import useFilteredDataList from '@/hooks/useFilteredDataList';
import usePaginatedDataList from '@/hooks/usePaginatedDataList';
import useSortedDataList from '@/hooks/useSortedDataList';

import { SortOption } from '@/types';

type Params<T> = {
  initialDataList: T[];
  selectFilter?: {
    [K in keyof T]?: T[K];
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
  const { filteredDataList, totalCount } = useFilteredDataList({
    initialDataList,
    selectFilter,
    searchFilter,
  });

  const sortedDataList = useSortedDataList({
    initialDataList: filteredDataList,
    sortOption,
  });

  const pagedDataList = usePaginatedDataList({
    initialDataList: sortedDataList,
    page,
    setPage,
    postsPerPage: postsPerPage,
  });

  return { pagedDataList, totalCount };
};

export default useProcessedDataList;
