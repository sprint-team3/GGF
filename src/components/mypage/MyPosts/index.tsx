import { useState } from 'react';

import classNames from 'classnames/bind';

import { GAME_FILTERS, PRICE_TO_POST_TYPES, SORT_OPTIONS } from '@/constants';
import { formatCategoryToGameNameKR } from '@/utils';
import { getPostPageSize } from '@/utils/getPageSize';

import { RegisteredCard } from '@/components/commons/cards';
import Dropdown from '@/components/commons/Dropdown';
import Filter from '@/components/commons/Filter';
import Pagination from '@/components/commons/Pagination';
import EmptyCard from '@/components/layout/empty/EmptyCard';
import MockActivityDatas from '@/constants/mockData/myActivitiesMockData.json';
import { useDeviceType } from '@/hooks/useDeviceType';
import useProcessedDataList from '@/hooks/useProcessedDataList';

import { ActivityResponse, MyActivitiesResponse, Order, SortOption } from '@/types';

import styles from './MyPosts.module.scss';

const cx = classNames.bind(styles);

const MockApiResponse: MyActivitiesResponse = {
  cursorId: 0,
  totalCount: 0,
  activities: MockActivityDatas,
};

const initialFilter = {
  category: GAME_FILTERS[0].id,
};

const initialSortOption: SortOption<ActivityResponse> = {
  key: 'createdAt',
  type: 'date',
  order: 'desc',
};

const MyPosts = () => {
  const [page, setPage] = useState(1);
  const [selectFilter, setSelectFilter] = useState(initialFilter);
  const [sortOption, setSortOption] = useState(initialSortOption);

  const currentDeviceType = useDeviceType();
  const pageSize = getPostPageSize(currentDeviceType);

  const { pagedDataList, totalCount } = useProcessedDataList({
    initialDataList: MockApiResponse.activities,
    selectFilter,
    sortOption,
    page,
    setPage,
    postsPerPage: pageSize,
  });

  const handleClickPage = (pageNumber: number) => setPage(pageNumber);

  const handleSelectFilter = (selectedId: string) => setSelectFilter({ category: selectedId });

  const handleOptionChange = (value: string | number) => setSortOption((prev) => ({ ...prev, order: value as Order }));

  return (
    <div className={cx('mypost-container')}>
      <h2 className={cx('selected-game')}>
        <span className={cx('selected-game-title')}>{formatCategoryToGameNameKR(selectFilter.category) ?? '전체'}</span>
        <span className={cx('selected-game-count')}>{totalCount}</span>
      </h2>
      <div className={cx('card-area')}>
        <div className={cx('filter-sort')}>
          <Filter items={GAME_FILTERS} selectedFilterId={selectFilter.category} onChange={handleSelectFilter} />
          <div className={cx('dropdown')}>
            <Dropdown options={SORT_OPTIONS} onChange={handleOptionChange} isSmall color='yellow' />
          </div>
        </div>
        {totalCount ? (
          <ul className={cx('card-list')}>
            {pagedDataList.map((data) => (
              <li key={data.id}>
                <RegisteredCard
                  path={''}
                  postType={PRICE_TO_POST_TYPES[data.price]}
                  title={data.title}
                  address={data.address}
                  category={formatCategoryToGameNameKR(data.category)}
                  createdAt={data.createdAt}
                />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyCard text='No Post' />
        )}
      </div>
      <Pagination totalCount={totalCount} pageState={page} postPerPage={pageSize} onClick={handleClickPage} />
    </div>
  );
};

export default MyPosts;
