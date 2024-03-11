import Link from 'next/link';

import { useState } from 'react';

import classNames from 'classnames/bind';

import { GAME_LIST } from '@/constants';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

export const Menu = () => {
  const [activatedGame, setActivatedGame] = useState(0);

  const handleActivateGame = (number: number) => {
    setActivatedGame(number);
  };

  const formatGameTypeToLink = (game: string) => {
    return game.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <nav>
      <ul className={cx('container')}>
        {GAME_LIST.map((game, index) => (
          <li key={`menu-${index}`}>
            <Link
              href={formatGameTypeToLink(game)}
              className={cx('game', { activated: activatedGame === index })}
              onClick={() => handleActivateGame(index)}
            >
              {game}
              {activatedGame === index && <p className={cx('under-line')}></p>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
