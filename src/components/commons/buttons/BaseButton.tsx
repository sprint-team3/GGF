import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import styles from './BaseButton.module.scss';

const cx = classNames.bind(styles);

type BaseButtonProps = {
  theme: 'fill' | 'ghost' | 'outline';
  size: 'small' | 'medium' | 'large';
  children: string;
  isDisabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  color?: 'yellow' | 'purple' | 'red';
  type?: 'button' | 'submit';
};

export const BaseButton = ({
  theme,
  size,
  children,
  isDisabled,
  onClick,
  color = 'yellow',
  type = 'button',
}: BaseButtonProps) => {
  const buttonTheme = theme === 'outline' ? 'btn-theme-outline' : `btn-theme-${theme}-${color}`;

  return (
    <button className={cx(`btn-size-${size}`, buttonTheme)} disabled={isDisabled} onClick={onClick} type={type}>
      <span>{children}</span>
    </button>
  );
};
