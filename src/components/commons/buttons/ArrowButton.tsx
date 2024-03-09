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
  return (
    <button className={cx('btn')} onClick={onClick}>
      <div className={cx('btn-icon')}>
        <Image src={SVGS.button[`${direction}Arrow`].url} alt={SVGS.button[`${direction}Arrow`].alt} fill />
      </div>
    </button>
  );
};
