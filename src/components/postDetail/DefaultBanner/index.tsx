import Image from 'next/image';

import classNames from 'classnames/bind';

import { PRICE_TO_MATCH_TYPE } from '@/constants';

import { GameNameEN } from '@/types';

import styles from './DefaultBanner.module.scss';

const cx = classNames.bind(styles);

type DefaultBannerProps = {
  url: string;
  price: number;
  gameName: GameNameEN;
};

const DefaultBanner = ({ url, price, gameName }: DefaultBannerProps) => {
  return (
    <div className={cx('default-banner')}>
      <div className={cx('img-container')}>
        <Image className={cx('img')} src={url} alt='배너 이미지' fill sizes='100%' />
        <div className={cx('text-container')}>
          <span className={cx('match-name')}>{PRICE_TO_MATCH_TYPE[price]}</span>
          <span className={cx('game-name')}>{gameName}</span>
        </div>
      </div>
    </div>
  );
};

export default DefaultBanner;
