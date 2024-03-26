import Image from 'next/image';

import classNames from 'classnames/bind';

import { GameNameEN } from '@/types';

import styles from './DefaultBanner.module.scss';

const cx = classNames.bind(styles);

type DefaultBannerProps = {
  url: string;
  gameName: GameNameEN;
};

const DefaultBanner = ({ url, gameName }: DefaultBannerProps) => {
  return (
    <div className={cx('default-banner')}>
      <div className={cx('img-container')}>
        <Image className={cx('img')} src={url} alt='배너 이미지' fill sizes='100%' />
        <span className={cx('game-name')}>{gameName}</span>
      </div>
    </div>
  );
};

export default DefaultBanner;
