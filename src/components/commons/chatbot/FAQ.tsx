import Image from 'next/image';

import { useState } from 'react';

import classNames from 'classnames/bind';

import { SVGS, FAQ_LIST } from '@/constants';

import styles from './FAQ.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.chat;

type FaqAnswer = {
  title: string;
  description: string;
};

export const FAQ = () => {
  const [faqAnswer, setfaqAnswer] = useState<FaqAnswer[]>([]);

  const handleAddFaq = (id: number) => {
    setfaqAnswer((prev) => [...prev, FAQ_LIST[id]]);
  };

  return (
    <div className={cx('faq')}>
      <div className={cx('faq-menu')}>
        <p className={cx('faq-menu-title')}>자주 물어보는 질문이에요</p>
        <ul className={cx('faq-question')}>
          {FAQ_LIST.map(({ id, title }) => (
            <li className={cx('faq-question-list')} key={id}>
              <button className={cx('faq-question-list-item')} onClick={() => handleAddFaq(id)}>
                <Image src={url} alt={alt} width={16} height={16}></Image>
                <span className={cx('faq-question-list-item-text')}>{title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ul className={cx('faq-chat')}>
        {faqAnswer.map((answer, idx) => (
          <li className={cx('faq-chat-list')} key={idx}>
            <div className={cx('faq-chat-list-question')}>
              <p className={cx('faq-chat-list-question-description')}>{answer.title}</p>
            </div>
            <div className={cx('faq-chat-list-answer')}>
              <p className={cx('faq-chat-list-answer-description')}>{answer.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
