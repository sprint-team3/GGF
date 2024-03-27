import Image from 'next/image';

import { Dispatch, SetStateAction } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import useToggleButton from '@/hooks/useToggleButton';

import styles from './CountButton.module.scss';

const cx = classNames.bind(styles);
const { add, remove } = SVGS.button;

const MIN_PLAY_MEMBER = 1;

type CountButtonProps = {
  label: string;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  maxPlayMember: number;
  isNoSchedule: boolean;
  isDisabled?: boolean;
};

export const CountButton = ({
  label,
  count,
  setCount,
  maxPlayMember,
  isNoSchedule,
  isDisabled = false,
}: CountButtonProps) => {
  const { isVisible: isHoverAddButton, handleToggleClick: handleAddButtonState } = useToggleButton();
  const { isVisible: isHoverRemoveButton, handleToggleClick: handleRemoveButtonState } = useToggleButton();

  const { url: addUrl, alt: addAlt } = !isDisabled && isHoverAddButton ? add.active : add.default;
  const { url: removeUrl, alt: removeAlt } = !isDisabled && isHoverRemoveButton ? remove.active : remove.default;

  const handleAddClick = () => {
    if (count < maxPlayMember) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handleRemoveClick = () => {
    if (count > MIN_PLAY_MEMBER) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div className={cx('count-btn-field')}>
      <div className={cx('label-area')}>
        <span className={cx('label-area-text')}>{label}</span>
        <span className={cx('label-area-info')}>
          (참여할 수 있는 최대 인원은 {isNoSchedule ? 0 : maxPlayMember}명 입니다)
        </span>
      </div>

      <div className={cx('btn-area')}>
        <button
          type='button'
          className={cx('btn-area-remove')}
          onClick={handleRemoveClick}
          onMouseEnter={handleRemoveButtonState}
          onMouseLeave={handleRemoveButtonState}
          disabled={isDisabled}
        >
          <Image src={removeUrl} alt={removeAlt} width={24} height={24} />
        </button>
        <div className={cx('btn-area-count')}>{count}</div>
        <button
          type='button'
          className={cx('btn-area-add')}
          onClick={handleAddClick}
          onMouseEnter={handleAddButtonState}
          onMouseLeave={handleAddButtonState}
          disabled={isDisabled}
        >
          <Image src={addUrl} alt={addAlt} width={24} height={24} />
        </button>
      </div>
    </div>
  );
};
