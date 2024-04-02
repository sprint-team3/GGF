import { useRouter } from 'next/router';

import classNames from 'classnames/bind';

import { GAME_PATH_NAME_TO_GAME_NAME_EN, PNGS } from '@/constants';

import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

const Banner = () => {
  const router = useRouter();
  const { game } = router.query;
  if (!game) return;
  const gameName = GAME_PATH_NAME_TO_GAME_NAME_EN[game as keyof typeof GAME_PATH_NAME_TO_GAME_NAME_EN];
  const { url } = PNGS.banner[gameName as keyof typeof PNGS.banner];

  return (
    <section className={cx('banner')} style={{ backgroundImage: `url(${url})` }}>
      <div className={cx('banner-game')}>
        <h1 className={cx('banner-game-name')}>{gameName}</h1>
      </div>
    </section>
  );
};

export default Banner;
