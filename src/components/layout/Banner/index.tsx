import classNames from 'classnames/bind';

import { PNGS } from '@/constants';

import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

type BannerProps = {
  gameName: keyof typeof PNGS.banner;
};

const Banner = ({ gameName }: BannerProps) => {
  const { url } = PNGS.banner[gameName];

  return (
    <section className={cx('banner')} style={{ backgroundImage: `url(${url})` }}>
      <div className={cx('banner-game')}>
        <h1 className={cx('banner-game-name')}>{gameName}</h1>
      </div>
    </section>
  );
};

export default Banner;
