import Image from 'next/image';

import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './ArrowButton.module.scss';

const cx = classNames.bind(styles);

type ArrowButtonProps = {
  direction: 'left' | 'right';
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const ArrowButton = ({ direction, onClick }: ArrowButtonProps) => {
  const { url, alt } = SVGS.button[`${direction}Arrow`];

  return (
    <button className={cx('btn')} onClick={onClick}>
      <Image src={url} alt={alt} width={20} height={20} />
    </button>
  );
};
