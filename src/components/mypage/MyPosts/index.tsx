import { useState } from 'react';

import classNames from 'classnames/bind';

import { GAME_FILTERS, POSTS_PER_PAGE, PRICE_TO_POST_TYPES } from '@/constants';
import { formatCategoryToGameNameKR } from '@/utils';

import { RegisteredCard } from '@/components/commons/cards';
import Dropdown from '@/components/commons/Dropdown';
import Filter from '@/components/commons/Filter';
import Pagination from '@/components/commons/Pagination';
import MockActivityDatas from '@/constants/mockData/myActivitiesMockData.json';
import useProcessedDataList from '@/hooks/useProcessedDataList';

import { ActivityResponse, MyActivitiesResponse, Order, SortOption } from '@/types';

const cx = classNames.bind(styles);

import styles from './MyPosts.module.scss';

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

const dropdownOptions: {
  title: string;
  orderType: Order;
}[] = [
  { title: '최신순', orderType: 'desc' },
  { title: '오래된순', orderType: 'asc' },
];

const MyPosts = () => {
  const [page, setPage] = useState(1);
  const [selectFilter, setSelectFilter] = useState(initialFilter);
  const [sortOption, setSortOption] = useState(initialSortOption);

  const { pagedDataList, totalCount } = useProcessedDataList({
    initialDataList: MockApiResponse.activities,
    selectFilter,
    sortOption,
    page,
    setPage,
    postsPerPage: POSTS_PER_PAGE,
  });

  return (
    <div className={cx('mypost-container')}>
      <h2 className={cx('selected-game')}>
        <span className={cx('selected-game-title')}>{formatCategoryToGameNameKR(selectFilter.category) ?? '전체'}</span>
        <span className={cx('selected-game-count')}>{totalCount}</span>
      </h2>
      <div className={cx('card-area')}>
        <div className={cx('filter-sort')}>
          <Filter
            items={GAME_FILTERS}
            selectedFilterId={selectFilter.category}
            onChange={(selectedId) => setSelectFilter({ category: selectedId })}
          />
          <div className={cx('dropdown')}>
            <Dropdown
              options={dropdownOptions}
              onChange={(orderType) => setSortOption((prev) => ({ ...prev, order: orderType }))}
              isSmall
            />
          </div>
        </div>
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
      </div>
      <Pagination
        totalCount={totalCount}
        pageState={page}
        postPerPage={POSTS_PER_PAGE}
        onClick={(pageNumber) => setPage(pageNumber)}
      />
    </div>
  );
};

export default MyPosts;
