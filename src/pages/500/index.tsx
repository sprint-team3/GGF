import Image from 'next/image';

import classNames from 'classnames/bind';

import { WEBPS } from '@/constants';

import styles from './500.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = WEBPS.errorPage.error500;

const Error404 = () => {
  return (
    <div className={cx('error')}>
      <div className={cx('container')}>
        <div className={cx('error-title')}>
          <div className={cx('error-title-image')}>
            <Image src={url} alt={alt} fill />
          </div>
          <h1 className={cx('error-title-text')}>Internal Server Error</h1>
        </div>
        <p className={cx('error-description')}>
          <span>서비스 이용에 불편을 드려 죄송합니다</span>
          <span>접속하려는 페이지에 문제가 있어 페이지를 표시할 수 없습니다</span>
        </p>
      </div>
    </div>
  );
};

export default Error404;
