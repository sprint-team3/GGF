import Link from 'next/link';
import { useRouter } from 'next/router';

import classNames from 'classnames/bind';

import { GAME_NAME_LIST_EN, GAME_PATH_NAME_TO_GAME_NAME_EN } from '@/constants';
import { formatGameToLink } from '@/utils';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const Menu = () => {
  const router = useRouter();
  const { game: gameName } = router.query;

  const isGameActivated = (index: number) => {
    return (
      GAME_PATH_NAME_TO_GAME_NAME_EN[gameName as keyof typeof GAME_PATH_NAME_TO_GAME_NAME_EN] ===
      GAME_NAME_LIST_EN[index]
    );
  };

  return (
    <nav>
      <ul className={cx('menu')}>
        {GAME_NAME_LIST_EN.map((game, index) => (
          <li key={`menu-${index}`}>
            <Link
              href={`/${formatGameToLink(game)}`}
              className={cx('menu-game', {
                'menu-game-activated': isGameActivated(index),
              })}
            >
              {game}
              {isGameActivated(index) && <p className={cx('menu-under-line')}></p>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
