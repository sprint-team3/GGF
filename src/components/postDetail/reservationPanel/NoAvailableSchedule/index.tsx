import Image from 'next/image';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './NoAvailableSchedule.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.chatbot.sad;

const NoAvailableSchedule = () => {
  return (
    <div className={cx('empty')}>
      <div className={cx('empty-content')}>
        <div className={cx('empty-content-icon')}>
          <Image src={url} alt={alt} width={48} height={48}></Image>
        </div>
        <div className={cx('empty-content-info')}>
          <span className={cx('empty-content-info-title')}>SORRY</span>
          <span className={cx('empty-content-info-message')}>No available schedules found</span>
        </div>
      </div>
    </div>
  );
};

export default NoAvailableSchedule;
