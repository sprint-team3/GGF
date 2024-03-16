import Link from 'next/link';

import { useState } from 'react';

import classNames from 'classnames/bind';

import { GAME_KEY_LIST } from '@/constants';
import { formatGameToLink } from '@/utils';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

export const Menu = () => {
  const [activatedGame, setActivatedGame] = useState(0);

  const handleActivateGame = (number: number) => {
    setActivatedGame(number);
  };

  return (
    <nav>
      <ul className={cx('container')}>
        {GAME_KEY_LIST.map((game, index) => (
          <li key={`menu-${index}`}>
            <Link
              href={formatGameToLink(game)}
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
