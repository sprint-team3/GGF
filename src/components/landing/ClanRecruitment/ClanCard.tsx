import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';
import { getFormatDate } from '@/utils';

import Tag from '@/components/commons/Tag';

import styles from './ClanCard.module.scss';

const cx = classNames.bind(styles);

const { url, alt } = SVGS.calendar.active;

export type ClanCardProps = {
  id: number;
  gameName: string;
  clanTitle: string;
  createdAt: string;
};

const ClanCard = ({ id, gameName, clanTitle, createdAt }: ClanCardProps) => {
  return (
    <Link href={`/${gameName}/${id}`} className={cx('slider-banner-item-content')}>
      <div className={cx('slider-banner-item-tag')}>
        <Tag postType='clan-recruitment' />
      </div>
      <div className={cx('slider-banner-item-info')}>
        <h3 className={cx('slider-banner-item-info-title')}>{clanTitle}</h3>
        <div className={cx('slider-banner-item-info-createdAt')}>
          <Image src={url} alt={alt} width={20} height={20} />
          <span>{getFormatDate(createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ClanCard;
