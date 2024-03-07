import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import styles from './BaseButton.module.scss';

const cx = classNames.bind(styles);

type BaseButtonProps = {
  size: 'small' | 'middle' | 'large';
  theme?: 'fill' | 'ghost';
  color?: 'yellow' | 'purple' | 'red';
  text: string;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const BaseButton = ({ theme, color = 'yellow', size, text, disabled, onClick }: BaseButtonProps) => {
  return (
    <button
      className={cx(size, theme ? `${theme}-${color}` : 'outline', disabled && 'disabled')}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
};
