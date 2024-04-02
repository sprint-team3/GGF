import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';
import { getFormatDate, toFixedOneDecimal } from '@/utils';

import StarRating from '@/components/commons/StarRating';
import Tag from '@/components/commons/Tag';

import { PostTypesEN } from '@/types';

import styles from './CardCommonStyle.module.scss';

const cx = classNames.bind(styles);
const { location, calendar } = SVGS;

export type CommonCardProps = {
  path: string;
  postType: PostTypesEN;
  title: string;
  address: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
};

export const CommonCard = ({ path, postType, title, address, rating, reviewCount, createdAt }: CommonCardProps) => {
  const isOffline = postType === 'offline';

  return (
    <article className={cx('card')}>
      <Link href={path} className={cx('card-inner')}>
        <div className={cx('card-content')}>
          <header className={cx('card-content-header')}>
            <div className={cx('card-content-header-category')}>
              <Tag postType={postType} />
            </div>
          </header>
          <h2 className={cx('card-content-title')}>{title}</h2>
          {isOffline && (
            <div className={cx('card-content-location')}>
              <Image src={location.default.url} alt={location.default.alt} width={18} height={18} />
              <span className={cx('card-content-location-address')}>{address}</span>
            </div>
          )}
        </div>
        <footer className={cx('card-footer')}>
          <div className={cx('card-footer-review')}>
            <StarRating size='small' rating={rating} readonly />
            <span className={cx('card-footer-review-rating')}>
              {toFixedOneDecimal(rating)} ({reviewCount})
            </span>
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
