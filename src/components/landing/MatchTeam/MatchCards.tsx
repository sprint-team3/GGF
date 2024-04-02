import Image from 'next/image';
import Link from 'next/link';

import { Dispatch, useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import { GAME_NAME_KR_TO_PATH_NAME, GAME_NAME_LIST_EN, WEBPS } from '@/constants';

import { GameClassName } from '@/components/landing/MatchTeam/MatchTeam';
import { useDeviceType } from '@/hooks/useDeviceType';

import styles from './MatchCards.module.scss';

const cx = classNames.bind(styles);

const { lol, bg, ow, mc } = WEBPS.match;

type MatchCardsProps = {
  hoveredCard: GameClassName;
  setHoveredCard: Dispatch<React.SetStateAction<GameClassName>>;
};

const MatchCards = ({ hoveredCard, setHoveredCard }: MatchCardsProps) => {
  const currentDeviceType = useDeviceType();

  const [isAllActive, setIsAllActive] = useState(false);

  const isLOLHovered = hoveredCard === 'lol';
  const isBGHovered = hoveredCard === 'bg';
  const isOWHovered = hoveredCard === 'ow';
  const isMCHovered = hoveredCard === 'mc';

  useEffect(() => {
    if (currentDeviceType === 'PC') {
      setIsAllActive(false);
    } else if (currentDeviceType === 'Mobile' || currentDeviceType === 'Tablet') {
      setIsAllActive(true);
    }
  }, [currentDeviceType]);

  return (
    <div className={cx('match-cards')}>
      <Link href={GAME_NAME_KR_TO_PATH_NAME['리그오브레전드']}>
        <button
          className={cx('card', { active: isLOLHovered || isAllActive })}
          onMouseEnter={() => setHoveredCard('lol')}
        >
          <div className={cx('card-inner', { active: isLOLHovered || isAllActive })}></div>
          <div className={cx('card-default-inner', { active: isLOLHovered || isAllActive })}></div>
          <div className={cx('card-default-outer', { active: isLOLHovered || isAllActive })}></div>
          <Image
            className={cx('img')}
            src={isLOLHovered || isAllActive ? lol.active : lol.default}
            alt={lol.alt}
            fill
            sizes='100%'
            priority
          />
          <span className={cx('title', { active: isLOLHovered || isAllActive })}>{GAME_NAME_LIST_EN[0]}</span>
        </button>
      </Link>

      <Link href={GAME_NAME_KR_TO_PATH_NAME['배틀그라운드']}>
        <button
          className={cx('card', { active: isBGHovered || isAllActive })}
          onMouseEnter={() => setHoveredCard('bg')}
        >
          <div className={cx('card-inner', { active: isBGHovered || isAllActive })}></div>
          <div className={cx('card-default-inner', { active: isBGHovered || isAllActive })}></div>
          <div className={cx('card-default-outer', { active: isBGHovered || isAllActive })}></div>
          <Image
            className={cx('img', 'bg')}
            src={isBGHovered || isAllActive ? bg.active : bg.default}
            alt={bg.alt}
            fill
            sizes='100%'
            priority
          />
          <span className={cx('title', { active: isBGHovered || isAllActive })}>{GAME_NAME_LIST_EN[1]}</span>
        </button>
      </Link>

      <Link href={GAME_NAME_KR_TO_PATH_NAME['오버워치 2']}>
        <button
          className={cx('card', { active: isOWHovered || isAllActive })}
          onMouseEnter={() => setHoveredCard('ow')}
        >
          <div className={cx('card-inner', { active: isOWHovered || isAllActive })}></div>
          <div className={cx('card-default-inner', { active: isOWHovered || isAllActive })}></div>
          <div className={cx('card-default-outer', { active: isOWHovered || isAllActive })}></div>
          <Image
            className={cx('img', 'ow')}
            src={isOWHovered || isAllActive ? ow.active : ow.default}
            alt={ow.alt}
            fill
            sizes='100%'
            priority
          />
          <span className={cx('title', { active: isOWHovered || isAllActive })}>{GAME_NAME_LIST_EN[2]}</span>
        </button>
      </Link>

      <Link href={GAME_NAME_KR_TO_PATH_NAME['마인크래프트']}>
        <button
          className={cx('card', { active: isMCHovered || isAllActive })}
          onMouseEnter={() => setHoveredCard('mc')}
        >
          <div className={cx('card-inner', { active: isMCHovered || isAllActive })}></div>
          <div className={cx('card-default-inner', { active: isMCHovered || isAllActive })}></div>
          <div className={cx('card-default-outer', { active: isMCHovered || isAllActive })}></div>
          <Image
            className={cx('img', 'mc')}
            src={isMCHovered || isAllActive ? mc.active : mc.default}
            alt={mc.alt}
            fill
            sizes='100%'
          />
          <span className={cx('title', { active: isMCHovered || isAllActive })}>{GAME_NAME_LIST_EN[3]}</span>
        </button>
      </Link>
    </div>
  );
};

export default MatchCards;
