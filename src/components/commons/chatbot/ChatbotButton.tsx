import Image from 'next/image';

import React, { RefObject } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './ChatbotButton.module.scss';

const cx = classNames.bind(styles);
const { chatbot, chat } = SVGS;

type ChatbotButtonProps = {
  isActive: boolean;
  buttonRef: RefObject<HTMLButtonElement>;
  toggleChatbot: () => void;
};

export const ChatbotButton = ({ isActive, buttonRef, toggleChatbot }: ChatbotButtonProps) => {
  return (
    <div className={cx('chatbot-toggle-btn')}>
      <div className={cx('chatbot-toggle-btn-icon')}>
        <Image
          className={cx('chatbot-toggle-btn-icon-img', { activated: isActive })}
          src={chatbot.url}
          alt={chat.alt}
          aria-pressed={isActive}
          aria-label='챗봇 토글 버튼'
          fill
        ></Image>
      </div>
      <button className={cx('chatbot-toggle-btn-qwer')} ref={buttonRef} onClick={toggleChatbot}>
        QWER
      </button>
    </div>
  );
};
