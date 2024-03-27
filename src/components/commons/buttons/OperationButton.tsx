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
  let icon = SVGS.button.disabled;

  if (buttonType !== 'disabled') {
    icon = SVGS.button[buttonType].active;
  }

  const { url, alt } = icon;

  return (
    <button className={cx(`btn-operation-${type}`)} disabled={isDisabled} type='button' onClick={onClick}>
      <Image src={url} alt={alt} width={24} height={24} />
    </button>
  );
};
