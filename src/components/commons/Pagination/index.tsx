import Image from 'next/image';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import usePagination from '@/hooks/usePagination';

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);
const { left, right } = SVGS.pagination;

type PaginationProps = {
  totalCount: number;
  onClick: (pageNumber: number) => void;
};

const Pagination = ({ totalCount, onClick }: PaginationProps) => {
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
  } = usePagination(totalCount, onClick);

  return (
    <div className={cx('pagination')}>
      <button onClick={handleFirstPageClick}>
        <Image
          className={cx({ 'pagination-arrow-active': currentPageGroupIndex })}
          src={left.double.url}
          alt={left.double.alt}
          width={24}
          height={24}
        />
      </button>
      <button onClick={handlePrevButtonClick}>
        <Image
          className={cx({ 'pagination-arrow-active': currentPageGroupIndex })}
          src={left.single.url}
          alt={left.single.alt}
          width={20}
          height={20}
        />
      </button>
      {currentPageGroup.map((pageNumber, index) => (
        <button
          className={cx('pagination-page', { 'pagination-page-active': pageNumber === activePage })}
          key={index}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button onClick={handleNextButtonClick}>
        <Image
          className={cx({
            'pagination-arrow-active': currentPageGroupIndex !== pagesArray.length - 1,
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
            'pagination-arrow-active': currentPageGroupIndex !== pagesArray.length - 1,
          })}
          src={right.double.url}
          alt={right.double.alt}
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default Pagination;
