type Params<T> = {
  initialDataList: T[];
  page: number;
  postsPerPage: number;
};

export const getPaginatedDataList = <T>({ initialDataList, page, postsPerPage }: Params<T>): T[] => {
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = page * postsPerPage;

  return initialDataList.filter((_, index) => index >= startIndex && index < endIndex);
};
