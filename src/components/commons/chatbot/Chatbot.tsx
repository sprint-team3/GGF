import Image from 'next/image';

import { ChangeEvent, MouseEvent, useState, useRef, useEffect } from 'react';

import classNames from 'classnames/bind';

import { SVGS, FAQ_LIST } from '@/constants';
import { getCurrentTime } from '@/utils';

import { ChatbotButton, ChatHeader, FAQ, Loading, FAQChatDialog, ChatbotDialog } from '@/components/commons/chatbot';
import { useRequestAnswer } from '@/components/commons/chatbot/data-access/useRequestAnswer';
import useTogglePopup from '@/hooks/useTogglePopup';

import { Chat, FaqChat } from '@/types';

import styles from './Chatbot.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.send;

export const Chatbot = () => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, popupRef: chatbotRef, buttonRef, togglePopup: toggleChatbot } = useTogglePopup();
  const [faqChat, setFaqChat] = useState<FaqChat[]>([]);
  const [question, setQuestion] = useState('');
  const [chatStore, setChatStore] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const isQuestionFocused = question.length > 0;

  const handleAddAnswerToFaq = (id: number) => setFaqChat((prevFaqChat) => [...prevFaqChat, FAQ_LIST[id]]);

  const handleUserInput = (event: ChangeEvent<HTMLTextAreaElement>) => setQuestion(event.target.value);

  const { chatbotAnswerMutation } = useRequestAnswer({ setChatStore, setLoading });

  const handleSubmitUserInput = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!question) return;

    const currentQuestion = question;

    setChatStore((prev) => [...prev, { question, questionDate: getCurrentTime(), answer: '', answerDate: '' }]);

    chatbotAnswerMutation(currentQuestion);
    setQuestion('');
  };

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [faqChat, chatStore]);

  return (
    <div className={cx('chatbot-container')}>
      <article className={cx('chatbot', { open: isOpen })} ref={chatbotRef}>
        <div className={cx('chat')}>
          <ChatHeader />
          <main className={cx('chat-inner')}>
            <div className={cx('chat-content')}>
              <FAQ onClick={handleAddAnswerToFaq} />
              <div className={cx('chat-container')}>
                <div className={cx('faq-chat-dialog')}>
                  <FAQChatDialog faqChat={faqChat} onClick={handleAddAnswerToFaq} />
                </div>
                <div className={cx('chat-dialog')}>
                  <ChatbotDialog chatStore={chatStore} />
                  {loading && <Loading />}
                </div>
              </div>
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
