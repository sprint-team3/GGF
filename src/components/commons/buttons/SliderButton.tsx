import Image from 'next/image';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './SliderButton.module.scss';

const cx = classNames.bind(styles);

type SliderButtonProps = {
  type: 'left' | 'right';
  onClick: () => void;
};

const SliderButton = ({ type, onClick }: SliderButtonProps) => {
  const { active } = type === 'left' ? SVGS.arrow.left : SVGS.arrow.right;

  return (
    <div className={cx('lg-only')}>
      <button className={cx('clan-slider-btn', `btn-${type}`)} onClick={onClick}>
        <Image src={active.url} alt={active.alt} width={20} height={20} />
      </button>
    </div>
  );
};

export default SliderButton;
