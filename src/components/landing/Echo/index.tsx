import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames/bind';

import { GAME_NAME_LIST_EN, PAGE_PATHS, WEBPS } from '@/constants';

import useMouseMoveEffect from '@/hooks/useMouseMoveEffect';

import styles from './Echo.module.scss';

const cx = classNames.bind(styles);

const Echo = () => {
  const { containerRef, mainTextRef, subTextRef, echoRef, echoShadowRef } = useMouseMoveEffect(8);

  return (
    <section ref={containerRef} className={cx('container')}>
      <Image
        src={WEBPS.landing.echoBackground.url}
        alt={WEBPS.landing.echoBackground.alt}
        fill
        priority
        sizes='100%'
        className={cx('container-image')}
        unoptimized
      />
      <div ref={echoShadowRef} className={cx('echo-shadow')}>
        <Image
          src={WEBPS.landing.echoShadow.url}
          alt={WEBPS.landing.echoShadow.alt}
          fill
          priority
          sizes='100%'
          className={cx('echo-shadow-image')}
          unoptimized
        />
      </div>
      <div ref={echoRef} className={cx('echo')}>
        <Image
          src={WEBPS.landing.echo.url}
          alt={WEBPS.landing.echo.alt}
          fill
          priority
          sizes='100%'
          className={cx('echo-image')}
          unoptimized
        />
      </div>
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
      <div>
        <h2 ref={mainTextRef} className={cx('landing-text', 'main')}>
          BEST TEAMWORK
        </h2>
        <h2 ref={subTextRef} className={cx('landing-text', 'sub')}>
          IT&apos;s UP TO YOU
        </h2>
      </div>
      <button className={cx('button-start')}>
        <Link href={PAGE_PATHS.mainList}>
          Get Started
          <div className={cx('button-line')}></div>
        </Link>
      </button>
      <div className={cx('frame')}></div>
      <div className={cx('frame-line')}></div>
    </section>
  );
};

export default Echo;
