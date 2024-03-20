import { useEffect, useState } from 'react';

type Params<T> = {
  initialDataList: T[];
  initialTotalCount: number;
  selectFilter?: {
    [K in keyof T]?: T[K];
  };
  searchFilter?: {
    [K in keyof T]?: T[K];
  };
};

type Returns<T> = {
  filteredDataList: T[];
  totalCount: number;
};

const useFilteredDataList = <T>({
  initialDataList,
  initialTotalCount,
  selectFilter,
  searchFilter,
}: Params<T>): Returns<T> => {
  const [filteredDataList, setFilteredDataList] = useState<T[]>([]);
  const [totalCount, setTotalCount] = useState(initialTotalCount);

  useEffect(() => {
    let newDataList = [...initialDataList];

    for (const selectKey in selectFilter) {
      newDataList = newDataList.filter((data) => data[selectKey] === selectFilter[selectKey]);
    }

    for (const searchKey in searchFilter) {
      newDataList = newDataList.filter((data) => String(data[searchKey]).includes(String(searchFilter[searchKey])));
    }

    setFilteredDataList(newDataList);
    setTotalCount(newDataList.length);
  }, [initialDataList, selectFilter, searchFilter]);

  return {
    filteredDataList,
    totalCount,
  };
};

export default useFilteredDataList;
