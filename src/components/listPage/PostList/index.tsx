import { useRouter } from 'next/router';

import { useState } from 'react';

import classNames from 'classnames/bind';

import {
  INITIAL_SELECT_FILTER,
  initialSortOption,
  POST_TYPES_FOR_LISTPAGE,
  PRICE_TO_POST_TYPES,
  SORT_OPTIONS,
} from '@/constants';
import { splitTitleByDelimiter, getPostPageSize, getProcessedDataList } from '@/utils';

import { BaseButton } from '@/components/commons/buttons/BaseButton';
import { CardSkeleton } from '@/components/commons/cards/CardSkeleton';
import { CommonCard } from '@/components/commons/cards/CommonCard';
import Dropdown from '@/components/commons/Dropdown';
import { SearchBar } from '@/components/commons/inputs/SearchBar';
import Pagination from '@/components/commons/Pagination';
import Tab from '@/components/commons/Tab';
import EmptyCard from '@/components/layout/empty/EmptyCard';
import { useDeviceType } from '@/hooks/useDeviceType';

import { MyActivitiesResponse, Order, SearchFilter, SelectFilter } from '@/types';

import styles from './PostList.module.scss';

const cx = classNames.bind(styles);

type PostListProps = {
  isLoggedIn: boolean;
  isLoading: boolean;
  activitiesData: MyActivitiesResponse[];
};

const PostList = ({ isLoggedIn, activitiesData: initialDataList, isLoading }: PostListProps) => {
  const router = useRouter();
  const { game } = router.query;

  const [page, setPage] = useState(1);
  const [selectFilter, setSelectFilter] = useState<SelectFilter>(INITIAL_SELECT_FILTER);
  const [searchFilter, setSearchFilter] = useState<SearchFilter>();
  const [sortOption, setSortOption] = useState(initialSortOption);

  const currentDeviceType = useDeviceType();
  const pageSize = getPostPageSize(currentDeviceType);

  const { pagedDataList, totalCount } = getProcessedDataList({
    initialDataList,
    selectFilter,
    searchFilter,
    sortOption,
    page,
    postsPerPage: pageSize,
  });

  const isEmptyPost = !isLoading && totalCount === 0;

  const handleTabChange = (selectedId: number | string) => {
    setSelectFilter({ price: selectedId });
    router.push({
      pathname: router.pathname,
      query: { ...router.query, postType: selectedId },
    });
  };

  const handleOptionChange = (value: string | number) => setSortOption((prev) => ({ ...prev, order: value as Order }));

  const handlePageChange = (pageNumber: number) => setPage(pageNumber);

  const handleCreateButtonClick = () => {
    router.push({
      pathname: `/${game}/create`,
      query: { postType: selectFilter.price },
    });
  };

  return (
    <section className={cx('post-list')}>
      <div className={cx('post-list-container')}>
        <div className={cx('post-list-container-header')}>
          <h1>모집 게시판</h1>
          <div className={cx('searchbar')}>
            <SearchBar placeholder='검색어를 입력해 주세요' setState={setSearchFilter} />
          </div>
        </div>
        <Tab
          size='medium'
          items={POST_TYPES_FOR_LISTPAGE}
          selectedTabId={selectFilter.price ?? 'all'}
          onClick={handleTabChange}
        />
        <div className={cx('post-list-container-inner')}>
          <div className={cx('type-count')}>
            <div className={cx('post-type')}>{POST_TYPES_FOR_LISTPAGE[0].text}</div>
            <div className={cx('total-count')}>{totalCount}</div>
          </div>
          <div className={cx('buttons')}>
            <BaseButton
              theme='fill'
              size='medium'
              color='yellow'
              type='button'
              onClick={handleCreateButtonClick}
              isDisabled={!isLoggedIn}
            >
              등록하기
            </BaseButton>
            <div className={cx('dropdown')}>
              <Dropdown options={SORT_OPTIONS} onChange={handleOptionChange} isSmall color='yellow' />
            </div>
          </div>
        </div>
        {isLoading &&
          Array(15)
            .fill(0)
            .map((_, index) => <CardSkeleton key={`card-${index}`} />)}

        {isEmptyPost ? (
          <EmptyCard text='No Post' />
        ) : (
          <ul className={cx('post-list-container-card-list')}>
            {pagedDataList.map((data) => {
              const { title } = splitTitleByDelimiter(data.title);

              return (
                <li className={cx('card')} key={data.id}>
                  <CommonCard
                    path={`/${game}/${data.id}`}
                    postType={PRICE_TO_POST_TYPES[data.price]}
                    title={title}
                    address={data.address}
                    rating={data.rating}
                    reviewCount={data.reviewCount}
                    createdAt={data.createdAt}
                  />
                </li>
              );
            })}
          </ul>
        )}
        <Pagination totalCount={totalCount} postPerPage={pageSize} pageState={page} onClick={handlePageChange} />
      </div>
    </section>
  );
};

export default PostList;
