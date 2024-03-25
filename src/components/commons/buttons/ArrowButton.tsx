import Image from 'next/image';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './ArrowButton.module.scss';

const cx = classNames.bind(styles);

const { url: leftArrowUrl, alt: leftArrowAlt } = SVGS.button.leftArrow;
const { url: lrightArrowUrl, alt: lrightArrowAlt } = SVGS.button.rightArrow;

type ArrowButtonProps = {
  onClick: (addNumber: number) => void;
};

export const ArrowButton = ({ onClick }: ArrowButtonProps) => {
  const handleLeftButtonClick = () => onClick(-1);
  const handleRightButtonClick = () => onClick(1);

  return (
    <div>
      <button className={cx('btn-arrow-left')} onClick={handleLeftButtonClick}>
        <div className={cx('btn-arrow-icon')}>
          <Image src={leftArrowUrl} alt={leftArrowAlt} fill />
        </div>
      </button>
      <button className={cx('btn-arrow-right')} onClick={handleRightButtonClick}>
        <div className={cx('btn-arrow-icon')}>
          <Image src={lrightArrowUrl} alt={lrightArrowAlt} fill />
        </div>
      </button>
    </div>
  );
};
