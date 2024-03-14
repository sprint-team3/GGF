import Image from 'next/image';

import { ChangeEvent, MouseEvent, useState, useRef, useEffect } from 'react';

import axios from 'axios';
import classNames from 'classnames/bind';
import { PulseLoader } from 'react-spinners';

import { SVGS } from '@/constants';
import { getCurrentTime } from '@/utils';

import useTogglePopup from '@/hooks/useTogglePopup';

import styles from './Chatbot.module.scss';
import { ChatbotButton } from './ChatbotButton';
import { ChatHeader } from './ChatHeader';
import { FAQ } from './FAQ';
const cx = classNames.bind(styles);
const { url, alt } = SVGS.send;

type Chat = {
  question: string;
  answer: string | null;
  questionDate: string;
  answerDate: string | null;
};

export const Chatbot = () => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [question, setQuestion] = useState('');
  const [chatStore, setChatStore] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, popupRef: chatbotRef, buttonRef, togglePopup: toggleChatbot } = useTogglePopup();
  const isFocus = question.length > 0;

  const handleUserInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmitUserInput = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!question.trim()) {
      return;
    }
    setChatStore((prev) => [...prev, { question, questionDate: getCurrentTime(), answer: null, answerDate: null }]);
    setQuestion('');

    try {
      setLoading(true);
      const res = await axios.post('/api/generate', { question });
      setChatStore((prev) => {
        const updatedChatStore = [...prev];
        const index = updatedChatStore.findIndex((chat) => chat.question === question);
        if (index !== -1) {
          updatedChatStore[index].answer = res.data.answer;
          updatedChatStore[index].answerDate = getCurrentTime();
        }
        return updatedChatStore;
      });
    } catch (e) {
      console.error('Error submitting user input:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatStore]);

  return (
    <div className={cx('chatbot-container')}>
      <article className={cx('chatbot', { open: isOpen })} ref={chatbotRef}>
        <div className={cx('chat')}>
          <ChatHeader />

          <main className={cx('chat-inner')}>
            <div className={cx('chat-content')}>
              <FAQ />
              <ul>
                {chatStore.map((chat, index) => (
                  <li key={`chat-key-${index}`} className={cx('chat-list')}>
                    <div className={cx('chat-list-question')}>
                      <span className={cx('chat-list-date')}>{chat.questionDate}</span>
                      <p className={cx('chat-list-question-description')}>{chat.question}</p>
                    </div>
                    {chat.answer !== null && (
                      <div className={cx('chat-list-answer')}>
                        <p className={cx('chat-list-answer-description')}>{chat.answer}</p>
                        <span className={cx('chat-list-date')}>{chat.answerDate}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              {loading && (
                <div className={cx('chat-list-answer-loading')}>
                  <PulseLoader color='#ADFF00' size={6} speedMultiplier={0.7} />
                </div>
              )}
              <div ref={messageEndRef}></div>
            </div>

            <form className={cx('chat-form', { focus: isFocus })}>
              <legend>챗봇 질문하기</legend>
              <textarea
                className={cx('chat-form-text-field')}
                value={question}
                onChange={handleUserInput}
                placeholder='QWER에게 질문해 주세요'
              ></textarea>
              <button className={cx('chat-form-btn-submit')} onClick={handleSubmitUserInput}>
                <Image src={url} alt={alt} width={24} height={24}></Image>
              </button>
            </form>
          </main>
        </div>
      </article>

      <ChatbotButton isActive={isOpen} buttonRef={buttonRef} toggleChatbot={toggleChatbot} />
    </div>
  );
};
