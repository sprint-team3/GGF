import Image from 'next/image';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import useToggleButton from '@/hooks/useToggleButton';

import styles from './ArrowButton.module.scss';

const cx = classNames.bind(styles);

const { default: leftDefault, active: leftActive } = SVGS.arrow.left;
const { default: rightDefault, active: rightActive } = SVGS.arrow.right;

type ArrowButtonProps = {
  onClick: (addNumber: number) => void;
};

const ArrowButton = ({ onClick }: ArrowButtonProps) => {
  const { isVisible: isLeftHovering, handleToggleClick: handleHoverLeft } = useToggleButton();
  const { isVisible: isRightHovering, handleToggleClick: handleHoverRight } = useToggleButton();

  const { url: leftUrl, alt: leftAlt } = isLeftHovering ? leftActive : leftDefault;
  const { url: rightUrl, alt: rightAlt } = isRightHovering ? rightActive : rightDefault;

  const handleLeftButtonClick = () => onClick(-1);
  const handleRightButtonClick = () => onClick(1);

  return (
    <div>
      <button
        className={cx('btn-arrow-left')}
        onMouseEnter={handleHoverLeft}
        onMouseLeave={handleHoverLeft}
        onClick={handleLeftButtonClick}
      >
        <div className={cx('btn-arrow-icon')}>
          <Image src={leftUrl} alt={leftAlt} fill />
        </div>
      </button>
      <button
        className={cx('btn-arrow-right')}
        onMouseEnter={handleHoverRight}
        onMouseLeave={handleHoverRight}
        onClick={handleRightButtonClick}
      >
        <div className={cx('btn-arrow-icon')}>
          <Image src={rightUrl} alt={rightAlt} fill />
        </div>
      </button>
    </div>
  );
};

export default ArrowButton;
