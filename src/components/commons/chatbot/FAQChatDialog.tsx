import { Fragment, useState } from 'react';

import classNames from 'classnames/bind';

import { FAQ } from '@/components/commons/chatbot/FAQ';

import { FaqChat } from '@/types';

import styles from './FAQChatDialog.module.scss';

const cx = classNames.bind(styles);

type FAQChatDialogProps = {
  faqChat: FaqChat[];
  onClick: (action: number) => void;
};

export const FAQChatDialog = ({ faqChat, onClick }: FAQChatDialogProps) => {
  const faqOpenList = Array.from({ length: faqChat.length }, () => false);

  const [openFaq, setOpenFaq] = useState(faqOpenList);

  const handleFaqOpen = (index: number) => {
    setOpenFaq((prev) => {
      const updatedOpenFAQ = [...prev];
      updatedOpenFAQ[index] = true;
      return updatedOpenFAQ;
    });
  };

  return (
    <div>
      {faqChat.map((faq, index) => (
        <div key={`faq-${index}`} className={cx('faq-chat-dialog-list')}>
          <ul className={cx('faq-chat-list')}>
            <li className={cx('faq-chat-list-question')}>
              <p className={cx('faq-chat-list-question-description')}>{faq.title}</p>
            </li>
            <li className={cx('faq-chat-list-answer')}>
              <p className={cx('faq-chat-list-answer-description')}>
                {faq.description.split('\n').map((answer, index) => (
                  <Fragment key={`answer-${index}`}>
                    {answer}
                    <br />
                  </Fragment>
                ))}
              </p>
            </li>
            <button className={cx('faq-visibility-button')} onClick={() => handleFaqOpen(index)}>
              FAQ 불러오기
            </button>
            {openFaq[index] && <FAQ onClick={onClick} />}
          </ul>
        </div>
      ))}
    </div>
  );
};
