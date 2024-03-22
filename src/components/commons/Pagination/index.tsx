import Image from 'next/image';

import classNames from 'classnames/bind';

import { DEFAULT_PAGE_SIZE, SVGS } from '@/constants';

import usePagination from '@/hooks/usePagination';

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);
const { left, right } = SVGS.pagination;

type PaginationProps = {
  totalCount: number;
  pageState: number;
  postPerPage: number;
  onClick: (pageNumber: number) => void;
};

const Pagination = ({ totalCount, pageState, postPerPage, onClick }: PaginationProps) => {
  const {
    activePage,
    currentPageGroupIndex,
    currentPageGroup,
    pagesArray,
    handlePageClick,
    handlePrevButtonClick,
    handleNextButtonClick,
    handleFirstPageClick,
    handleLastPageClick,
  } = usePagination(totalCount, pageState, postPerPage, onClick);

  const isArrowActivated = currentPageGroupIndex !== pagesArray.length - 1;
  const showPagination = !!totalCount && postPerPage !== DEFAULT_PAGE_SIZE;

  return (
    showPagination && (
      <nav aria-label='Page Navigation'>
        <ul className={cx('pagination')}>
          <button onClick={handleFirstPageClick}>
            <Image
              className={cx({ 'pagination-arrow-activated': currentPageGroupIndex })}
              src={left.double.url}
              alt={left.double.alt}
              width={24}
              height={24}
            />
          </button>
          <button onClick={handlePrevButtonClick}>
            <Image
              className={cx({ 'pagination-arrow-activated': currentPageGroupIndex })}
              src={left.single.url}
              alt={left.single.alt}
              width={20}
              height={20}
            />
          </button>
          {currentPageGroup.map((pageNumber, index) => (
            <li key={`page-${index}`}>
              <button
                className={cx('pagination-page', { 'pagination-page-activated': pageNumber === activePage })}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          <button onClick={handleNextButtonClick}>
            <Image
              className={cx({
                'pagination-arrow-activated': isArrowActivated,
              })}
              src={right.single.url}
              alt={right.single.alt}
              width={20}
              height={20}
            />
          </button>
          <button onClick={handleLastPageClick}>
            <Image
              className={cx({
                'pagination-arrow-activated': isArrowActivated,
              })}
              src={right.double.url}
              alt={right.double.alt}
              width={24}
              height={24}
            />
          </button>
        </ul>
      </nav>
    )
  );
};

export default Pagination;
