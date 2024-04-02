import React from 'react';

import classNames from 'classnames/bind';

import styles from './ChatbotDialog.module.scss';

const cx = classNames.bind(styles);

type ChatbotDialog = {
  questionDate: string;
  question: string;
  answer: string | null;
  answerDate: string | null;
};

export const ChatbotDialog = ({ questionDate, question, answer, answerDate }: ChatbotDialog) => {
  return (
    <ul className={cx('chat-list')}>
      <li className={cx('chat-list-question')}>
        <span className={cx('chat-list-date')}>{questionDate}</span>
        <p className={cx('chat-list-question-description')}>{question}</p>
      </li>
      {answer !== null && (
        <li className={cx('chat-list-answer')}>
          <p className={cx('chat-list-answer-description')}>{answer}</p>
          <span className={cx('chat-list-date')}>{answerDate}</span>
        </li>
      )}
    </ul>
  );
};
