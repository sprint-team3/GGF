import { useState } from 'react';

import { POSTS_PER_PAGE } from '@/constants';

import Pagination from '@/components/commons/Pagination';
import MockData from '@/constants/mockData/myActivitiesMockData.json';
import useFilteredDataList from '@/hooks/useFilteredDataList';
import usePaginatedDataList from '@/hooks/usePaginatedDataList';
import useSortedDataList from '@/hooks/useSortedDataList';

import { ActivityResponse, MyActivitiesResponse } from '@/types';

const MockApiResponse: MyActivitiesResponse = {
  cursorId: null,
  totalCount: 200,
  activities: MockData,
};

const { totalCount: initialTotalCount, activities: initialActivities } = MockApiResponse;

type Filter = {
  category?: string;
  title?: string;
};

type FilterType = {
  [K in keyof Filter]?: 'select' | 'input';
};

const filterType: FilterType = {
  category: 'select',
  title: 'input',
};

type Sort = {
  key: keyof ActivityResponse;
  order: 'asc' | 'desc';
  type: 'number' | 'date';
};

const MyPage = () => {
  const [filter, setFilter] = useState<Filter>();
  const [sort, setSort] = useState<Sort>({
    key: 'reviewCount',
    order: 'asc',
    type: 'number',
  });
  const [page, setPage] = useState(1);

  const { filteredDataList, totalCount } = useFilteredDataList({
    initialDataList: initialActivities,
    initialTotalCount,
    filter,
    filterType,
  });

  const sortedDataList = useSortedDataList({
    initialDataList: filteredDataList,
    sortOption: sort,
  });

  const pagedDataList = usePaginatedDataList({
    initialDataList: sortedDataList,
    page,
    setPage,
    postsPerPage: POSTS_PER_PAGE,
  });

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        {pagedDataList.map((data, index) => (
          <div key={data.id} style={{ display: 'flex', gap: '10px', borderBottom: '1px solid gray' }}>
            <div>{totalCount - (page - 1) * POSTS_PER_PAGE - index}</div>
            <div>{data.title}</div>
            <div>{data.category}</div>
            <div>{data.reviewCount}</div>
            <div>{data.createdAt}</div>
          </div>
        ))}
      </div>
      <button style={{ marginRight: '10px' }} onClick={() => setFilter({})}>
        전체보기
      </button>
      <button style={{ marginRight: '10px' }} onClick={() => setFilter((prev) => ({ ...prev, category: '관광' }))}>
        관광만 보기
      </button>
      <button style={{ marginRight: '10px' }} onClick={() => setFilter((prev) => ({ ...prev, category: '투어' }))}>
        투어만 보기
      </button>
      <br />
      <br />
      <button
        style={{ marginRight: '10px' }}
        onClick={() => setSort({ key: 'reviewCount', order: 'asc', type: 'number' })}
      >
        별점 오름차순 정렬
      </button>
      <button
        style={{ marginRight: '10px' }}
        onClick={() => setSort({ key: 'reviewCount', order: 'desc', type: 'number' })}
      >
        별점 내림차순 정렬
      </button>
      <button style={{ marginRight: '10px' }} onClick={() => setSort({ key: 'createdAt', order: 'asc', type: 'date' })}>
        날짜 오름차순 정렬
      </button>
      <button
        style={{ marginRight: '10px' }}
        onClick={() => setSort({ key: 'createdAt', order: 'desc', type: 'date' })}
      >
        날짜 내림름차순 정렬
      </button>
      <br />
      <br />
      <input
        type='text'
        placeholder='검색어'
        style={{ color: 'white', border: '1px solid gray' }}
        value={filter?.title ?? ''}
        onChange={(e) => setFilter((prev) => ({ ...prev, title: e.target.value }))}
      />
      <br />
      <br />
      <Pagination
        totalCount={totalCount}
        pageState={page}
        postPerPage={POSTS_PER_PAGE}
        onClick={(pageNumber) => setPage(pageNumber)}
      />
    </div>
  );
};

export default MyPage;
