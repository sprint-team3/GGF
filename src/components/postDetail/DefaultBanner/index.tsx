import Image from 'next/image';

import classNames from 'classnames/bind';

import { PRICE_TO_MATCH_TYPE } from '@/constants';

import ImageModal from '../ImageModal';

import useToggleButton from '@/hooks/useToggleButton';

import { GameNameEN } from '@/types';

import styles from './DefaultBanner.module.scss';

const cx = classNames.bind(styles);

type DefaultBannerProps = {
  url: string;
  price: number;
  gameName: GameNameEN;
  isDefaultBannerImage: boolean;
};

const DefaultBanner = ({ url, price, gameName, isDefaultBannerImage }: DefaultBannerProps) => {
  const { isVisible, handleToggleClick } = useToggleButton();

  return (
    <>
      <div className={cx('default-banner')}>
        <button
          className={cx('img-container', { disabled: isDefaultBannerImage })}
          onClick={handleToggleClick}
          disabled={isDefaultBannerImage}
        >
          <Image className={cx('img')} src={url} alt='배너 이미지' fill sizes='100%' priority />
          {isDefaultBannerImage && (
            <div className={cx('text-container')}>
              <span className={cx('match-name')}>{PRICE_TO_MATCH_TYPE[price]}</span>
              <span className={cx('game-name')}>{gameName}</span>
            </div>
          )}
        </button>
      </div>
      <ImageModal imageSrc={url} isOpen={isVisible} onClose={handleToggleClick} />
    </>
  );
};

export default DefaultBanner;
