import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';
import { getFormatDate } from '@/utils';

import Tag from '@/components/commons/Tag';

import { GameCategory, PostTypes } from '@/types';

import styles from './CardCommonStyle.module.scss';

const cx = classNames.bind(styles);
const { location, calendar } = SVGS;

export type RegisteredCardProps = {
  path: string;
  postType: PostTypes;
  title: string;
  address: string;
  category: GameCategory;
  createdAt: string;
};

const RegisteredCard = ({ path, postType, title, address, category, createdAt }: RegisteredCardProps) => {
  const isOffline = postType === 'offline';

  return (
    <article className={cx('card')}>
      <Link href={`${path}`} className={cx('card-inner')}>
        <main className={cx('card-content')}>
          <header className={cx('card-content-header')}>
            <div className={cx('card-content-header-category')}>
              <Tag postType={postType} />
              <span className={cx('card-content-header-category-game')}>{category}</span>
            </div>
            <button className={cx('card-content-header-kebab')}>kebab</button>
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
        </footer>
      </Link>
    </article>
  );
};

export default RegisteredCard;
