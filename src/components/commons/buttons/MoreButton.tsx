import Image from 'next/image';

import { MouseEvent } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './MoreButton.module.scss';

const cx = classNames.bind(styles);

type MoreButtonProps = {
  onClick: () => void;
  isActive: boolean;
};

export const MoreButton = ({ onClick, isActive }: MoreButtonProps) => {
  const { url, alt } = SVGS.button.more;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onClick();
  };

  return (
    <button className={cx('btn-more')} aria-label='메뉴 더보기 버튼' aria-pressed={isActive} onClick={handleClick}>
      <Image src={url} alt={alt} width={24} height={24} />
    </button>
  );
};
