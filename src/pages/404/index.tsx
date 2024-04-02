import Image from 'next/image';

import classNames from 'classnames/bind';

import { PNGS } from '@/constants';

import styles from './404.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = PNGS.errorPage.error404;

const Error404 = () => {
  return (
    <div className={cx('error')}>
      <div className={cx('container')}>
        <div className={cx('error-title')}>
          <div className={cx('error-title-image')}>
            <Image src={url} alt={alt} fill />
          </div>
          <h1 className={cx('error-title-text')}>Page Not Found!</h1>
        </div>
        <p className={cx('error-description')}>
          <span>서비스 이용에 불편을 드려 죄송합니다</span>
          <span>요청하신 페이지를 찾을 수 없거나 현재 이용할 수 없는 페이지입니다</span>
        </p>
      </div>
    </div>
  );
};

export default Error404;
