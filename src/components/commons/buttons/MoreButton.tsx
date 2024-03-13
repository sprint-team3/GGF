import Image from 'next/image';

import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './MoreButton.module.scss';

const cx = classNames.bind(styles);

type MoreButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  isActive: boolean;
};

export const MoreButton = ({ onClick, isActive }: MoreButtonProps) => {
  const { url, alt } = SVGS.button.more;

  return (
    <button className={cx('btn-more')} aria-label='메뉴 더보기 버튼' aria-pressed={isActive} onClick={onClick}>
      <div className={cx('btn-more-icon')}>
        <Image src={url} alt={alt} fill />
      </div>
    </button>
  );
};
