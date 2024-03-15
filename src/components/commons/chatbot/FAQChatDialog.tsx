import React, { Fragment, useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';

import { FAQ_LIST } from '@/constants';

import { FAQ } from '@/components/commons/chatbot/FAQ';

import styles from './FAQChatDialog.module.scss';

const cx = classNames.bind(styles);

type FaqChat = {
  id: number;
  title: string;
  description: string;
};
export const FAQChatDialog = () => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [faqChat, setFaqChat] = useState<FaqChat[]>([]);

  const handleAddFaq = (id: number) => {
    setFaqChat((prev) => [...prev, FAQ_LIST[id]]);
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [faqChat]);

  return (
    <div>
      <FAQ onClick={handleAddFaq} />

      <ul className={cx('faq-chat')}>
        {faqChat.map((answer, index) => (
          <li className={cx('faq-chat-list')} key={index}>
            <div className={cx('faq-chat-list-question')}>
              <p className={cx('faq-chat-list-question-description')}>{answer.title}</p>
            </div>
            <div className={cx('faq-chat-list-answer')}>
              <p className={cx('faq-chat-list-answer-description')}>
                {answer.description.split('\n').map((answer, index) => (
                  <Fragment key={`answer-${index}`}>
                    {answer}
                    <br />
                  </Fragment>
                ))}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div ref={messageEndRef}></div>
    </div>
  );
};
