import { useState } from 'react';

import classNames from 'classnames/bind';

import MatchCards from '@/components/landing/MatchCards';
import { useDeviceType } from '@/hooks/useDeviceType';

import styles from './LandingMatch.module.scss';

const cx = classNames.bind(styles);

export type GameClassName = 'lol' | 'bg' | 'ow' | 'mc';

const LandingMatch = () => {
  const [hoveredCard, setHoveredCard] = useState<GameClassName>('lol');
  const currentDeviceType = useDeviceType();

  return (
    <section className={cx('landing-match', hoveredCard, currentDeviceType)}>
      <header className={cx('title-group')}>
        <span className={cx('main')}>Match your team</span>
        <p className={cx('paragraph')}>
          <span className={cx('white')}>원하는 게임</span>과 <span className={cx('white')}>원하는 시간</span>으로 <br />
          <span className={cx('hilight')}>온라인/오프라인</span>에서 함께할 <span className={cx('white')}>동료</span>를
          찾아보세요
        </p>
      </header>
      <MatchCards hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} />
    </section>
  );
};

export default LandingMatch;
