import Image from 'next/image';

import React, { MouseEventHandler, RefObject } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './ChatbotButton.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.chatbot.default;

type ChatbotButtonProps = {
  isActive: boolean;
  buttonRef: RefObject<HTMLButtonElement>;
  toggleChatbot: MouseEventHandler<HTMLButtonElement>;
};

export const ChatbotButton = ({ isActive, buttonRef, toggleChatbot }: ChatbotButtonProps) => {
  return (
    <div
      className={cx('chatbot-toggle-btn')}
      role='button'
      aria-label='챗봇 토글 버튼'
      aria-pressed={isActive}
      tabIndex={0}
    >
      <div className={cx('chatbot-toggle-btn-icon')}>
        <Image className={cx('chatbot-toggle-btn-icon-img')} src={url} alt={alt} fill></Image>
      </div>
      <button className={cx('chatbot-toggle-btn-qwer')} ref={buttonRef} onClick={toggleChatbot}>
        QWER
      </button>
    </div>
  );
};
