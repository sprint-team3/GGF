import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';
import { getExpirationDate, getFormatDate } from '@/utils';

import Badge from '@/components/commons/Badge';
import Tag from '@/components/commons/Tag';

import { MyReservationsStatus, GameCategory, PostTypes } from '@/types';

import styles from './CardCommonStyle.module.scss';

const cx = classNames.bind(styles);
const { location, calendar } = SVGS;

export type ReservedCardProps = {
  path: string;
  status: MyReservationsStatus;
  postType: PostTypes;
  title: string;
  address: string;
  createdAt: string;
  category: GameCategory;
  date: string;
  endTime: string;
};

const ReservedCard = ({
  path,
  status,
  postType,
  title,
  address,
  category,
  createdAt,
  date,
  endTime,
}: ReservedCardProps) => {
  const isOffline = postType === 'offline';
  const isPending = status === 'pending';
  const isExpirationDate = getExpirationDate(date, endTime);

  return (
    <article className={cx('card')}>
      <Link href={`${path}`} className={cx('card-inner')}>
        <main className={cx('card-content')}>
          <header className={cx('card-content-header')}>
            <div className={cx('card-content-header-category')}>
              <Badge status={status} />
              <Tag postType={postType} />
              <span className={cx('card-content-header-category-game')}>{category}</span>
            </div>
          </header>
          <h1 className={cx('card-content-title')}>{title}</h1>
          {isOffline && (
            <div className={cx('card-content-location')}>
              <Image src={location.default.url} alt={location.default.alt} width={18} height={18} sizes='100%' />
              <span className={cx('card-content-location-address')}>{address}</span>
            </div>
          )}
        </main>
        <footer className={cx('card-footer')}>
          <div className={cx('card-footer-calendar')}>
            <Image src={calendar.default.url} alt={calendar.default.alt} width={20} height={20} sizes='100%' />
            <span className={cx('card-footer-calendar-date')}>{getFormatDate(createdAt)}</span>
          </div>

          {isPending && <button>취소</button>}
          {isExpirationDate && <button>리뷰</button>}
        </footer>
      </Link>
    </article>
  );
};

export default ReservedCard;
