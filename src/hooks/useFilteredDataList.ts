import { useEffect, useState } from 'react';

type Params<T> = {
  initialDataList: T[];
  initialTotalCount: number;
  filter?: {
    [K in keyof T]?: T[K];
  };
  filterType?: {
    [K in keyof T]?: 'select' | 'input';
  };
};

type Returns<T> = {
  filteredDataList: T[];
  totalCount: number;
};

const useFilteredDataList = <T>({ initialDataList, initialTotalCount, filter, filterType }: Params<T>): Returns<T> => {
  const [filteredDataList, setFilteredDataList] = useState<T[]>([]);
  const [totalCount, setTotalCount] = useState(initialTotalCount);

  useEffect(() => {
    let newDataList = [...initialDataList];

    if (filter) {
      const filterKeyList = Object.keys(filter) as Array<keyof T>;

      filterKeyList.forEach((key) => {
        if (filterType?.[key] === 'select') {
          newDataList = newDataList.filter((data) => data[key] === filter[key]);
        }
        if (filterType?.[key] === 'input') {
          newDataList = newDataList.filter((data) => String(data[key]).includes(String(filter[key])));
        }
      });
    }

    setFilteredDataList(newDataList);
    setTotalCount(newDataList.length);
  }, [initialDataList, filter, filterType]);

  return {
    filteredDataList,
    totalCount,
  };
};

export default useFilteredDataList;
