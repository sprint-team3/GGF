import { useEffect, useState } from 'react';

type Params<T> = {
  initialDataList: T[];
  sortOption: {
    key: keyof T;
    order: 'asc' | 'desc';
    type: 'number' | 'date';
  };
};

const useSortedDataList = <T>({ initialDataList, sortOption }: Params<T>): T[] => {
  const [sortedDataList, setSortedDataList] = useState<T[]>([]);

  useEffect(() => {
    setSortedDataList(
      initialDataList.toSorted((a, b) => {
        const { key, order, type } = sortOption;

        if (type === 'number' && order === 'asc') return +a[key] - +b[key];
        if (type === 'number' && order === 'desc') return +b[key] - +a[key];
        if (type === 'date' && order === 'asc') return +new Date(a[key] as string) - +new Date(b[key] as string);
        if (type === 'date' && order === 'desc') return +new Date(b[key] as string) - +new Date(a[key] as string);

        return 0;
      }),
    );
  }, [initialDataList, sortOption]);

  return sortedDataList;
};

export default useSortedDataList;
