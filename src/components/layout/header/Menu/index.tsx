import Link from 'next/link';

import { useState } from 'react';

import classNames from 'classnames/bind';

import { GAME_NAME_LIST_EN } from '@/constants';
import { formatGameToLink } from '@/utils';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const Menu = () => {
  const [activatedGame, setActivatedGame] = useState<number>();

  const handleActivateGame = (number: number) => {
    setActivatedGame(number);
  };

  return (
    <nav>
      <ul className={cx('menu')}>
        {GAME_NAME_LIST_EN.map((game, index) => (
          <li key={`menu-${index}`}>
            <Link
              href={formatGameToLink(game)}
              className={cx('menu-game', { 'menu-game-activated': activatedGame === index })}
              onClick={() => handleActivateGame(index)}
            >
              {game}
              {activatedGame === index && <p className={cx('menu-under-line')}></p>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
