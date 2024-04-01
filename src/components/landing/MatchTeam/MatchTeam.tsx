import { useState } from 'react';

import classNames from 'classnames/bind';

import MatchCards from '@/components/landing/MatchTeam/MatchCards';
import { useDeviceType } from '@/hooks/useDeviceType';

import styles from './MatchTeam.module.scss';

export type GameClassName = 'lol' | 'bg' | 'ow' | 'mc';

const cx = classNames.bind(styles);

const MatchTeam = () => {
  const [hoveredCard, setHoveredCard] = useState<GameClassName>('lol');
  const currentDeviceType = useDeviceType();

  return (
    <section className={cx('landing-match', hoveredCard, currentDeviceType)}>
      <h1 className={cx('visually-hidden')}>게임 카테고리 소개</h1>
      <div className={cx('container')}>
        <header className={cx('match-header')}>
          <span className={cx('match-header-title')}>Match your team</span>
          <p className={cx('match-header-paragraph')}>
            <span className={cx('highlight-white')}>원하는 게임</span>과{' '}
            <span className={cx('highlight-white')}>원하는 시간</span>으로 <br />
            <span className={cx('highlight-yellow')}>온라인/오프라인</span>에서 함께할{' '}
            <span className={cx('highlight-white')}>동료</span>를 찾아보세요
          </p>
        </header>
        <MatchCards hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} />
      </div>
    </section>
  );
};

export default MatchTeam;
