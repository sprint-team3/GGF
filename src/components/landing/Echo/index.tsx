import classNames from 'classnames/bind';

import { GAME_NAME_LIST_EN } from '@/constants';

import useMouseMoveEffect from '@/hooks/useMouseMoveEffect';

import styles from './Echo.module.scss';

const cx = classNames.bind(styles);

const Echo = () => {
  const { containerRef, elementRef } = useMouseMoveEffect(8);
  return (
    <section ref={containerRef} className={cx('container')}>
      <div ref={elementRef} className={cx('echo-shadow')}></div>
      <div ref={elementRef} className={cx('echo')}></div>
      <div className={cx('side-scroll', 'left')}>
        <ul className={cx('scroll-content', 'left')}>
          {GAME_NAME_LIST_EN.map((gameName, index) => (
            <li key={`game-left-${index}`}>{gameName}</li>
          ))}
          {GAME_NAME_LIST_EN.map((gameName, index) => (
            <li key={`game-left-clone-${index}`}>{gameName}</li>
          ))}
        </ul>
      </div>
      <div className={cx('side-scroll', 'right')}>
        <ul className={cx('scroll-content', 'right')}>
          {GAME_NAME_LIST_EN.map((gameName, index) => (
            <li key={`game-right-${index}`}>{gameName}</li>
          ))}
          {GAME_NAME_LIST_EN.map((gameName, index) => (
            <li key={`game-right-clone-${index}`}>{gameName}</li>
          ))}
        </ul>
      </div>
      <h2 className={cx('landing-text', 'main')}>BEST TEAMWORK</h2>
      <h2 className={cx('landing-text', 'sub-main')}>IT&apos;s UP TO YOU</h2>
      <button className={cx('button-start')} type='button'>
        Get Started
      </button>
    </section>
  );
};

export default Echo;
