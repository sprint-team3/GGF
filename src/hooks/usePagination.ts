import { useEffect, useState } from 'react';

import { PAGINATION_LIMIT } from '@/constants';

const usePagination = (
  totalCount: number,
  pageState: number,
  postPerPage: number,
  onClick: (pageNumber: number) => void,
) => {
  const totalPageCount = Math.ceil(totalCount / postPerPage);
  const [activePage, setActivePage] = useState(1);
  const [currentPageGroupIndex, setCurrentPageGroupIndex] = useState(0);

  const pagesArray: number[][] = [];
  for (let i = 0; i < totalPageCount; i += PAGINATION_LIMIT) {
    const pageGroup = [];
    for (let j = i; j < i + PAGINATION_LIMIT && j < totalPageCount; j++) {
      pageGroup.push(j + 1);
    }
    pagesArray.push(pageGroup);
  }

  const currentPageGroup = pagesArray[currentPageGroupIndex] || [];

  const handlePageClick = (pageNumber: number) => {
    if (activePage !== pageNumber) {
      setActivePage(pageNumber);
      onClick(pageNumber);
    }
  };

  const handlePageGroupChange = (newPageGroupIndex: number) => {
    setActivePage(pagesArray[newPageGroupIndex][0]);
    setCurrentPageGroupIndex(newPageGroupIndex);
    onClick(pagesArray[newPageGroupIndex][0]);
  };

  const handlePrevButtonClick = () => {
    if (currentPageGroupIndex > 0) {
      handlePageGroupChange(currentPageGroupIndex - 1);
    }
  };

  const handleNextButtonClick = () => {
    if (currentPageGroupIndex < pagesArray.length - 1) {
      handlePageGroupChange(currentPageGroupIndex + 1);
    }
  };

  const handleFirstPageClick = () => {
    if (currentPageGroupIndex > 0) {
      handlePageGroupChange(0);
    }
  };

  const handleLastPageClick = () => {
    if (currentPageGroupIndex < pagesArray.length - 1) {
      handlePageGroupChange(pagesArray.length - 1);
    }
  };

  useEffect(() => {
    if (pageState === 1) {
      setActivePage(1);
      setCurrentPageGroupIndex(0);
    }
  }, [pageState]);

  return {
    activePage,
    currentPageGroupIndex,
    currentPageGroup,
    pagesArray,
    handlePageClick,
    handlePrevButtonClick,
    handleNextButtonClick,
    handleFirstPageClick,
    handleLastPageClick,
  };
};

export default usePagination;
