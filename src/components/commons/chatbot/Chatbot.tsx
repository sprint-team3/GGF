import Image from 'next/image';

import { ChangeEvent, MouseEvent, useState, useRef, useEffect } from 'react';

import axios from 'axios';
import classNames from 'classnames/bind';

import { SVGS, FAQ_LIST } from '@/constants';
import { getCurrentTime } from '@/utils';

import { ChatbotButton } from '@/components/commons/chatbot/ChatbotButton';
import { ChatbotDialog } from '@/components/commons/chatbot/ChatbotDialog';
import { ChatHeader } from '@/components/commons/chatbot/ChatHeader';
import { FAQ } from '@/components/commons/chatbot/FAQ';
import { FAQChatDialog } from '@/components/commons/chatbot/FAQChatDialog';
import { Loading } from '@/components/commons/chatbot/Loading';
import useTogglePopup from '@/hooks/useTogglePopup';

import styles from './Chatbot.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.send;

type FaqChat = {
  id: number;
  title: string;
  description: string;
};

type Chat = {
  question: string;
  answer: string | null;
  questionDate: string;
  answerDate: string | null;
};

export const Chatbot = () => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, popupRef: chatbotRef, buttonRef, togglePopup: toggleChatbot } = useTogglePopup();
  const [faqChat, setFaqChat] = useState<FaqChat[]>([]);
  const [question, setQuestion] = useState('');
  const [chatStore, setChatStore] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const isQuestionFocused = question.length > 0;

  const handleAddFaq = (id: number) => {
    setFaqChat((prevFaqChat) => [...prevFaqChat, FAQ_LIST[id]]);
  };

  const handleUserInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };

  const handleSubmitUserInput = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!question.trim()) {
      return;
    }
    setChatStore((prev) => [...prev, { question, questionDate: getCurrentTime(), answer: null, answerDate: null }]);
    setQuestion('');

    try {
      setLoading(true);
      const response = await axios.post('/api/generate', { question });
      setChatStore((prev) => {
        const updatedChatStore = [...prev];
        const index = updatedChatStore.findIndex((chat) => chat.question === question);
        if (index !== -1) {
          updatedChatStore[index].answer = response.data.answer;
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
  }, [faqChat, chatStore]);

  return (
    <div className={cx('chatbot-container')}>
      <article className={cx('chatbot', { open: isOpen })} ref={chatbotRef}>
        <div className={cx('chat')}>
          <ChatHeader />
          <main className={cx('chat-inner')}>
            <div className={cx('chat-content')}>
              <FAQ onClick={handleAddFaq} />
              <ul className={cx('faq-chat-dialog')}>
                {faqChat.map((faq, index) => (
                  <li key={`faq-${index}`} className={cx('faq-chat-dialog-list')}>
                    <FAQChatDialog title={faq.title} description={faq.description} onClick={handleAddFaq} />
                  </li>
                ))}
              </ul>
              <ul className={cx('chat-dialog')}>
                {chatStore.map((chat, index) => (
                  <li key={`chat-${index}`} className={cx('chat-list')}>
                    <ChatbotDialog
                      questionDate={chat.questionDate}
                      question={chat.question}
                      answer={chat.answer}
                      answerDate={chat.answerDate}
                    />
                  </li>
                ))}
              </ul>
              {loading && <Loading />}
              <div ref={messageEndRef}></div>
            </div>

            <form className={cx('chat-form', { focus: isQuestionFocused })}>
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
