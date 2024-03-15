import Image from 'next/image';
import Link from 'next/link';

import { MouseEventHandler, RefObject } from 'react';

import classNames from 'classnames/bind';

import { GAME_LIST, SVGS } from '@/constants';
import { formatGameToLink } from '@/utils';

import styles from './DrawerMenu.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.close;

type DrawerMenuProps = {
  drawerMenuRef: RefObject<HTMLDivElement>;
  handleToggleDrawerMenu: MouseEventHandler<HTMLButtonElement>;
};

export const DrawerMenu = ({ drawerMenuRef, handleToggleDrawerMenu }: DrawerMenuProps) => {
  return (
    <div className={cx('container')} ref={drawerMenuRef}>
      <button className={cx('close-button')} onClick={handleToggleDrawerMenu}>
        <Image src={url} alt={alt} width={24} height={24} />
      </button>
      <nav>
        <ul className={cx('container-game-list')}>
          {GAME_LIST.map((game, index) => (
            <li className={cx('container-game')} key={`game-${index}`}>
              <Link className={cx('game')} href={formatGameToLink(game)}>
                {game}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
