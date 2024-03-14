import Image from 'next/image';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './ChatHeader.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.chatbot;

export const ChatHeader = () => {
  return (
    <header className={cx('chat-header')}>
      <div className={cx('chat-header-icon')}>
        <Image src={url} alt={alt} fill></Image>
      </div>
      <div className={cx('chat-header-status')}>
        <span className={cx('chat-header-status-online')}>Online</span>
        <p className={cx('chat-header-status-greeting')}>Hello! I&apos;m QWER</p>
      </div>
    </header>
  );
};
