import { useEffect, useState } from 'react';

type Params<T> = {
  initialDataList: T[];
  selectFilter?: {
    [K in keyof T]?: string | number;
  };
  searchFilter?: {
    [K in keyof T]?: T[K];
  };
};

type Returns<T> = {
  filteredDataList: T[];
  totalCount: number;
};

const useFilteredDataList = <T>({ initialDataList, selectFilter, searchFilter }: Params<T>): Returns<T> => {
  const [filteredDataList, setFilteredDataList] = useState<T[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let newDataList = [...initialDataList];

    for (const selectKey in selectFilter) {
      if (selectFilter[selectKey] !== 'all') {
        newDataList = newDataList.filter((data) => data[selectKey] === selectFilter[selectKey]);
      }
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
