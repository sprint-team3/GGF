import classNames from 'classnames/bind';

import styles from './Echo.module.scss';

const cx = classNames.bind(styles);

const Echo = () => {
  return <section className={cx('container')}></section>;
};

export default Echo;
