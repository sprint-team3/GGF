import { Fragment, useState } from 'react';

import classNames from 'classnames/bind';

import { FAQ } from '@/components/commons/chatbot/FAQ';

import styles from './FAQChatDialog.module.scss';

const cx = classNames.bind(styles);

type FAQChatDialogProps = {
  title: string;
  description: string;
  onClick: (action: number) => void;
};

export const FAQChatDialog = ({ title, description, onClick }: FAQChatDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFaqOpen = () => {
    setIsOpen(true);
  };

  return (
    <ul className={cx('faq-chat-list')}>
      <li className={cx('faq-chat-list-question')}>
        <p className={cx('faq-chat-list-question-description')}>{title}</p>
      </li>
      <li className={cx('faq-chat-list-answer')}>
        <p className={cx('faq-chat-list-answer-description')}>
          {description.split('\n').map((answer, index) => (
            <Fragment key={`answer-${index}`}>
              {answer}
              <br />
            </Fragment>
          ))}
        </p>
      </li>
      <button className={cx('faq-visibility-button')} onClick={handleFaqOpen}>
        FAQ 불러오기
      </button>
      {isOpen && <FAQ onClick={onClick} />}
    </ul>
  );
};
