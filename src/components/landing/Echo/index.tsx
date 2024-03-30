import classNames from 'classnames/bind';

import styles from './Echo.module.scss';

const cx = classNames.bind(styles);

const Echo = () => {
  return (
    <section className={cx('container')}>
      <div className={cx('echo-shadow')}></div>
      <div className={cx('echo')}></div>
    </section>
  );
};

export default Echo;
