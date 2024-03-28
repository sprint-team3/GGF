import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import styles from './CardButton.module.scss';

const cx = classNames.bind(styles);

type CardButton = {
  children: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color?: 'yellow' | 'red' | 'gray';
};

export const CardButton = ({ children, onClick, color = 'yellow' }: CardButton) => {
  return (
    <button type='button' className={cx('btn-card', `btn-color-${color}`)} onClick={onClick}>
      <span>{children}</span>
    </button>
  );
};
