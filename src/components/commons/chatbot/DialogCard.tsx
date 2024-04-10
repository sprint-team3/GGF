import classNames from 'classnames/bind';

import styles from './DialogCard.module.scss';

const cx = classNames.bind(styles);

export type DialogCardProps = {
  messageType: 'question' | 'answer';
  message: string | null;
  createdAt: string | null;
};

export const DialogCard = ({ messageType, message, createdAt }: DialogCardProps) => {
  const isQuestion = messageType === 'question';

  if (!message) return;

  return (
    <div className={cx(`${messageType}`)}>
      {isQuestion ? (
        <>
          <span className={cx('date')}>{createdAt}</span>
          <p className={cx(`${messageType}-description`)}>{message}</p>
        </>
      ) : (
        <>
          <p className={cx(`${messageType}-description`)}>{message}</p>
          <span className={cx('date')}>{createdAt}</span>
        </>
      )}
    </div>
  );
};
