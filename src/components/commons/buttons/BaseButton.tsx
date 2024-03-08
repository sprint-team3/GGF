import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import styles from './BaseButton.module.scss';

const cx = classNames.bind(styles);

type BaseButtonProps = {
  theme: 'fill' | 'ghost' | 'outline';
  size: 'small' | 'medium' | 'large';
  children: string;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  color?: 'yellow' | 'purple' | 'red';
};

export const BaseButton = ({ theme, size, children, disabled, onClick, color = 'yellow' }: BaseButtonProps) => {
  const buttonTheme = theme === 'outline' ? 'btn-outline' : `btn-${theme}-${color}`;

  return (
    <button className={cx(size, buttonTheme, { disabled: disabled })} disabled={disabled} onClick={onClick}>
      <span>{children}</span>
    </button>
  );
};
