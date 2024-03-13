import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';
import { getFormatDate, toFixedOneDecimal } from '@/utils';

import StarRating from '@/components/commons/StarRating';
import Tag from '@/components/commons/Tag';

import { PostTypes } from '@/types';

import styles from './CardCommonStyle.module.scss';

const cx = classNames.bind(styles);
const { location, calendar } = SVGS;

export type CommonCardProps = {
  path: string;
  postType: PostTypes;
  title: string;
  address?: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
};

const CommonCard = ({ path, postType, title, address, rating, reviewCount, createdAt }: CommonCardProps) => {
  const isOffline = postType === 'offline';

  return (
    <article className={cx('card')}>
      <Link href={path} className={cx('card-inner')}>
        <main className={cx('card-content')}>
          <header className={cx('card-content-header')}>
            <div className={cx('card-content-header-category')}>
              <Tag postType={postType} />
            </div>
          </header>
          <h1 className={cx('card-content-title')}>{title}</h1>
          {isOffline && (
            <div className={cx('card-content-location')}>
              <Image src={location.default.url} alt={location.default.alt} width={18} height={18} />
              <span className={cx('card-content-location-address')}>{address}</span>
            </div>
          )}
        </main>
        <footer className={cx('card-footer')}>
          <div className={cx('card-footer-review')}>
            <StarRating size='small' rating={rating} />
            <p className={cx('card-footer-review-count')}>
              {toFixedOneDecimal(rating)} <span>({reviewCount})</span>
            </p>
          </div>
          <div className={cx('card-footer-calendar')}>
            <Image src={calendar.default.url} alt={calendar.default.alt} width={20} height={20} />
            <span className={cx('card-footer-calendar-date')}>{getFormatDate(createdAt)}</span>
          </div>
        </footer>
      </Link>
    </article>
  );
};

export default CommonCard;
