import classNames from 'classnames/bind';

import useMouseMoveEffect from '@/hooks/useMouseMoveEffect';

import styles from './Echo.module.scss';

const cx = classNames.bind(styles);

const Echo = () => {
  const { containerRef, elementRef } = useMouseMoveEffect(8);
  return (
    <section ref={containerRef} className={cx('container')}>
      <div ref={elementRef} className={cx('echo-shadow')}></div>
      <div ref={elementRef} className={cx('echo')}></div>
    </section>
  );
};

export default Echo;
