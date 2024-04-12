import { Fragment } from 'react';

import classNames from 'classnames/bind';

import { Chat } from '@/types';

import styles from './ChatbotDialog.module.scss';
import { DialogCard } from './DialogCard';

const cx = classNames.bind(styles);

type ChatbotDialogProps = {
  chatStore: Chat[];
};

export const ChatbotDialog = ({ chatStore }: ChatbotDialogProps) => {
  if (!chatStore) return;

  return (
    <div className={cx('dialog')}>
      {chatStore.map((chat, index) => (
        <Fragment key={`chat-dialog-${index}`}>
          <DialogCard messageType='question' message={chat.question} createdAt={chat.questionDate} />
          <DialogCard messageType='answer' message={chat.answer} createdAt={chat.answerDate} />
        </Fragment>
      ))}
    </div>
  );
};
