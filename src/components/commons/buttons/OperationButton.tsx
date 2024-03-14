import Image from 'next/image';

import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './OperationButton.module.scss';

const cx = classNames.bind(styles);

type OperationButtonProps = {
  type: 'add' | 'remove';
  isDisabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const OperationButton = ({ type, isDisabled, onClick }: OperationButtonProps) => {
  const buttonType = type === 'add' && isDisabled ? 'disabled' : type;
  const { url, alt } = SVGS.button[buttonType];

  return (
    <button className={cx(`btn-operation-${type}`)} disabled={isDisabled} onClick={onClick}>
      <Image src={url} alt={alt} width={24} height={24} />
    </button>
  );
};
