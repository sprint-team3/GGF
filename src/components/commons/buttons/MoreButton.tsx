import Image from 'next/image';

import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './ArrowButton.module.scss';

const cx = classNames.bind(styles);

type MoreButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const MoreButton = ({ onClick }: MoreButtonProps) => {
  const { url, alt } = SVGS.button.more;

  return (
    <button className={cx('btn')} onClick={onClick}>
      <div className={cx('btn-icon')}>
        <Image src={url} alt={alt} fill />
      </div>
    </button>
  );
};
