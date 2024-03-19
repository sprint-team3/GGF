import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

type BannerProps = {
  gameName: keyof typeof SVGS.banner;
};

const Banner = ({ gameName }: BannerProps) => {
  const { url } = SVGS.banner[gameName];

  return (
    <section className={cx('banner')} style={{ backgroundImage: `url(${url})` }}>
      <div className={cx('banner-game')}>
        <h1 className={cx('banner-game-name')}>{gameName}</h1>
        <hr className={cx('banner-game-line')} />
      </div>
    </section>
  );
};

export default Banner;
