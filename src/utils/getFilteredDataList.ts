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

export const getFilteredDataList = <T>({ initialDataList, selectFilter, searchFilter }: Params<T>): Returns<T> => {
  if (!initialDataList) return { filteredDataList: [], totalCount: 0 };

  let filteredDataList = [...initialDataList];

  for (const selectKey in selectFilter) {
    if (selectFilter[selectKey] !== 'all') {
      filteredDataList = filteredDataList.filter((data) => data[selectKey] === selectFilter[selectKey]);
    }
  }

  for (const searchKey in searchFilter) {
    filteredDataList = filteredDataList.filter((data) =>
      String(data[searchKey]).includes(String(searchFilter[searchKey])),
    );
  }

  return {
    filteredDataList,
    totalCount: filteredDataList.length,
  };
};
