import classNames from 'classnames/bind';

import styles from './CardSkeleton.module.scss';

const cx = classNames.bind(styles);

export const CardSkeleton = () => {
  return (
    <article className={cx('card')}>
      <div className={cx('card-header')}></div>
      <div className={cx('card-title')}></div>
      <div className={cx('card-footer')}></div>
    </article>
  );
};
