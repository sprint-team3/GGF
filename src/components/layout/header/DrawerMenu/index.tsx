import Image from 'next/image';
import Link from 'next/link';

import { MouseEventHandler, RefObject } from 'react';

import classNames from 'classnames/bind';

import { GAME_KEY_LIST, SVGS } from '@/constants';
import { formatGameToLink } from '@/utils';

import styles from './DrawerMenu.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.close.active;

type DrawerMenuProps = {
  drawerMenuRef: RefObject<HTMLDivElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const DrawerMenu = ({ drawerMenuRef, onClick }: DrawerMenuProps) => {
  return (
    <aside className={cx('drawer-menu')} ref={drawerMenuRef}>
      <button className={cx('drawer-menu-close-button')} onClick={onClick}>
        <Image src={url} alt={alt} width={24} height={24} />
      </button>
      <nav>
        <ul className={cx('drawer-menu-game')}>
          {GAME_KEY_LIST.map((game, index) => (
            <li className={cx('drawer-menu-game-item')} key={`game-${index}`}>
              <Link className={cx('drawer-menu-game-link')} href={formatGameToLink(game)}>
                {game}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
