import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx('footer')}>
      <div className={cx('footer-title')}>GGF</div>
      <div className={cx('footer-description')}>©2024. GGF All rights reserved.</div>
    </footer>
  );
};

export default Footer;
