import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import styles from './ModalButton.module.scss';

const cx = classNames.bind(styles);

type ModalButtonProps = {
  variant?: 'success' | 'warning';
  children: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const ModalButton = ({ variant, children, onClick }: ModalButtonProps) => {
  return (
    <button className={cx('btn', { [`btn-state-${variant}`]: variant })} onClick={onClick}>
      {children}
    </button>
  );
};
