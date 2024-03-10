import Link from 'next/link';

import { useState } from 'react';

import classNames from 'classnames/bind';

import { GAME_LIST } from '@/constants';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

export const Menu = () => {
  const [activatedGameType, setActivatedGameType] = useState<number>(0);

  const handleActivateGameType = (number: number) => {
    setActivatedGameType(number);
  };

  const formatGameTypeToLink = (type: string) => {
    return type.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <nav>
      <ul className={cx('container')}>
        {GAME_LIST.map((type, index) => (
          <li key={`menu-${index}`}>
            <Link
              href={formatGameTypeToLink(type)}
              className={cx('game', { activated: activatedGameType === index })}
              onClick={() => handleActivateGameType(index)}
            >
              {type}
              {activatedGameType === index && <p className={cx('under-line')}></p>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
