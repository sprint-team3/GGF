import { useState } from 'react';

import classNames from 'classnames/bind';

import { REVIEW_SORT_OPTIONS } from '@/constants';
import { getSortedDataList, getReviewPageSize, getPaginatedDataList } from '@/utils';

import Dropdown from '@/components/commons/Dropdown';
import Pagination from '@/components/commons/Pagination';
import ReviewCard from '@/components/commons/ReviewCard';
import ReviewSummary from '@/components/postDetail/ReviewSummary';
import { useDeviceType } from '@/hooks/useDeviceType';

import { Order, Review, ReviewResponse, SortOption } from '@/types';

import styles from './ReviewList.module.scss';

const cx = classNames.bind(styles);

type ReviewListProps = {
  list: ReviewResponse;
  profileImageUrl: string;
  nickname: string;
  email: string;
};

const ReviewList = ({ list, profileImageUrl, nickname, email }: ReviewListProps) => {
  const [page, setPage] = useState(1);

  const currentDeviceType = useDeviceType();
  const pageSize = getReviewPageSize(currentDeviceType);

  const { totalCount, averageRating, reviews: initialDataList }: ReviewResponse = list;
  const initialSortOption: SortOption<Review> = {
    key: 'rating',
    order: 'desc',
    type: 'number',
  };

  const [sortOption, setSortOption] = useState(initialSortOption);

  const sortedDataList = getSortedDataList({
    initialDataList,
    sortOption,
  });

  const pagedDataList = getPaginatedDataList({
    initialDataList: sortedDataList,
    page,
    postsPerPage: pageSize,
  });

  const handleOptionChange = (value: string | number) => {
    setSortOption((prev) => ({ ...prev, order: value as Order }));
  };

  const handleClickPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <article className={cx('review-list')}>
      <header className={cx('review-list-header')}>
        <div className={cx('review-list-header-count-group')}>
          <div className={cx('summary')}>
            <span className={cx('title')}>리뷰</span>
            <span className={cx('count')}>{totalCount}</span>
          </div>
          <div className={cx('dropdown')}>
            <Dropdown options={REVIEW_SORT_OPTIONS} onChange={handleOptionChange} isSmall color='yellow' />
          </div>
        </div>
        <ReviewSummary profileImageUrl={profileImageUrl} nickname={nickname} email={email} rating={averageRating} />
      </header>
      <div className={cx('review-list-review-group')}>
        <ul className={cx('item-list')}>
          {pagedDataList.map((item) => (
            <li className={cx('item')} key={item.id}>
              <ReviewCard user={item.user} rating={item.rating} createdAt={item.createdAt} content={item.content} />
            </li>
          ))}
        </ul>
        <Pagination totalCount={totalCount} pageState={page} postPerPage={pageSize} onClick={handleClickPage} />
      </div>
    </article>
  );
};

export default ReviewList;
