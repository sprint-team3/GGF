import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Params<T> = {
  initialDataList: T[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  postsPerPage: number;
};

const usePaginatedDataList = <T>({ initialDataList, page, setPage, postsPerPage }: Params<T>): T[] => {
  const [pagedDataList, setPagedDataList] = useState<T[]>([]);

  const startIndex = (page - 1) * postsPerPage;
  const endIndex = page * postsPerPage;

  useEffect(() => {
    setPage(1);
  }, [initialDataList, postsPerPage, setPage]);

  useEffect(() => {
    setPagedDataList(initialDataList.filter((data, index) => index >= startIndex && index < endIndex));
  }, [startIndex, endIndex, initialDataList]);

  return pagedDataList;
};

export default usePaginatedDataList;
