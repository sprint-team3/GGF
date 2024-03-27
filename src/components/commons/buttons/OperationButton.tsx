import Image from 'next/image';

import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import useToggleButton from '@/hooks/useToggleButton';

import styles from './OperationButton.module.scss';

const cx = classNames.bind(styles);

type OperationButtonProps = {
  type: 'add' | 'remove';
  isDisabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const OperationButton = ({ type, isDisabled, onClick }: OperationButtonProps) => {
  const { isVisible: isHovering, handleToggleClick: toggleHovering } = useToggleButton();

  const isButtonActive = (type === 'add' && !isDisabled) || isHovering;

  const { default: defaultButton, active: activeButton } = SVGS.button[type];
  const { url, alt } = isButtonActive ? activeButton : defaultButton;

  const handleToggleHovering = () => {
    if (isDisabled) return;

    toggleHovering();
  };

  return (
    <button
      className={cx(`btn-operation-${type}`)}
      disabled={isDisabled}
      type='button'
      onClick={onClick}
      onMouseEnter={handleToggleHovering}
      onMouseLeave={handleToggleHovering}
    >
      <Image src={url} alt={alt} width={24} height={24} />
    </button>
  );
};
