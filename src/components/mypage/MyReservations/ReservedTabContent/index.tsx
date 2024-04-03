import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getMyReservations } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { GAME_NAME_KR_TO_PATH_NAME, MY_RESERVATIONS_STATUS_FILTERS, SORT_OPTIONS } from '@/constants';
import { formatStatusToKR, splitTitleByDelimiter } from '@/utils';
import { getPostPageSize } from '@/utils/getPageSize';

import { ReservedCard } from '@/components/commons/cards';
import { CardSkeleton } from '@/components/commons/cards/CardSkeleton';
import Dropdown from '@/components/commons/Dropdown';
import Filter from '@/components/commons/Filter';
import Pagination from '@/components/commons/Pagination';
import EmptyCard from '@/components/layout/empty/EmptyCard';
import { useDeviceType } from '@/hooks/useDeviceType';
import useProcessedDataList from '@/hooks/useProcessedDataList';

import { ReservationResponse, SortOption, Order } from '@/types';

import styles from './ReservedTabContent.module.scss';

const cx = classNames.bind(styles);

const initialFilter = {
  status: MY_RESERVATIONS_STATUS_FILTERS[0].id,
};

const initialSortOption: SortOption<ReservationResponse> = {
  key: 'createdAt',
  type: 'date',
  order: 'desc',
};

const ReservedTabContent = () => {
  const { data: initialDataList, isLoading } = useQuery({
    queryKey: QUERY_KEYS.myReservations.get,
    queryFn: getMyReservations,
  });

  const [page, setPage] = useState(1);
  const [selectFilter, setSelectFilter] = useState(initialFilter);
  const [sortOption, setSortOption] = useState(initialSortOption);

  const currentDeviceType = useDeviceType();
  const pageSize = getPostPageSize(currentDeviceType);

  const { pagedDataList: reservationData, totalCount } = useProcessedDataList({
    initialDataList,
    selectFilter,
    sortOption,
    page,
    setPage,
    postsPerPage: pageSize,
  });

  const isEmptyReserved = !isLoading && totalCount === 0;

  const handleSelectedFilter = (selectedId: string) => setSelectFilter((prev) => ({ ...prev, status: selectedId }));

  const handleDropdownClick = (value: number | string) => setSortOption((prev) => ({ ...prev, order: value as Order }));

  const handleClickPage = (pageNumber: number) => setPage(pageNumber);

  return (
    <div className={cx('reserved')}>
      <div className={cx('reserved-total')}>
        <span className={cx('reserved-total-title')}>{formatStatusToKR(selectFilter.status) ?? '전체'}</span>
        <span className={cx('reserved-total-count')}>{reservationData.length}</span>
      </div>
      <div className={cx('reserved-filter-sort')}>
        <Filter
          items={MY_RESERVATIONS_STATUS_FILTERS}
          selectedFilterId={selectFilter.status}
          onChange={handleSelectedFilter}
        />
        <div className={cx('reserved-sort')}>
          <Dropdown options={SORT_OPTIONS} onChange={handleDropdownClick} isSmall color='yellow' />
        </div>
      </div>
      {isLoading &&
        Array(15)
          .fill(0)
          .map((_, index) => <CardSkeleton key={`card-${index}`} />)}

      {isEmptyReserved ? (
        <EmptyCard text='No Reservations' />
      ) : (
        <ul className={cx('reserved-card-list')}>
          {reservationData.map((card) => {
            const { category, title, postType, address } = splitTitleByDelimiter(card.activity.title);
            return (
              <li key={card.id}>
                <ReservedCard
                  reservationId={card.id}
                  path={`/${GAME_NAME_KR_TO_PATH_NAME[category]}/${card.activity.id}`}
                  status={card.status}
                  reviewSubmitted={card.reviewSubmitted}
                  postType={postType}
                  title={title}
                  address={address}
                  category={category}
                  date={card.date}
                  startTime={card.startTime}
                  endTime={card.endTime}
                />
              </li>
            );
          })}
        </ul>
      )}
      <Pagination totalCount={totalCount} pageState={page} postPerPage={pageSize} onClick={handleClickPage} />
    </div>
  );
};

export default ReservedTabContent;
