import Image from 'next/image';

import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './OperationButton.module.scss';

const cx = classNames.bind(styles);

type OperationButtonProps = {
  type: 'add' | 'remove';
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const OperationButton = ({ type, disabled, onClick }: OperationButtonProps) => {
  const buttonType = type === 'add' && disabled ? 'disabled' : type;
  const { url, alt } = SVGS.button[buttonType];

  return (
    <button className={cx(`btn-${type}`)} disabled={disabled} onClick={onClick}>
      <div className={cx('btn-icon')}>
        <Image src={url} alt={alt} fill />
      </div>
    </button>
  );
};
