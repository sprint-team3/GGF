import React from 'react';

import classNames from 'classnames/bind';

import styles from './ModalButton.module.scss';

type ModalButtonProps = {
  variant?: 'success' | 'warning';
  children: string;
  onClick: () => void;
};

const cx = classNames.bind(styles);

const ModalButton = ({ variant, children, onClick }: ModalButtonProps) => {
  return (
    <button className={cx('btn', { [`btn-state-${variant}`]: variant })} onClick={onClick}>
      {children}
    </button>
  );
};

export default ModalButton;
