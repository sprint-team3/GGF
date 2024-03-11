import Image from 'next/image';

import { Dispatch, SetStateAction } from 'react';

import classNames from 'classnames/bind';

import { MIN_PLAY_MEMBER, SVGS } from '@/constants';

import styles from './CountButton.module.scss';

const cx = classNames.bind(styles);

type CountButtonProps = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

export const CountButton = ({ count, setCount }: CountButtonProps) => {
  const { url: addUrl, alt: addAlt } = SVGS.button.add;
  const { url: removeUrl, alt: removeAlt } = SVGS.button.remove;

  const handleAddClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleRemoveClick = () => {
    if (count > MIN_PLAY_MEMBER) setCount((prevCount) => prevCount - 1);
  };

  return (
    <div className={cx('btn-area')}>
      <button className={cx('btn-remove')} onClick={handleRemoveClick}>
        <div className={cx('btn-icon')}>
          <Image src={removeUrl} alt={removeAlt} fill />
        </div>
      </button>
      <div className={cx('count')}>{count}</div>
      <button className={cx('btn-add')} onClick={handleAddClick}>
        <div className={cx('btn-icon')}>
          <Image src={addUrl} alt={addAlt} fill />
        </div>
      </button>
    </div>
  );
};
