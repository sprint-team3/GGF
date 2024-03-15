import Image from 'next/image';

import { useState } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './StarRating.module.scss';

const cx = classNames.bind(styles);
const { star } = SVGS;

type StarRatingProps = {
  size: 'small' | 'medium' | 'large';
  rating: number;
  readonly?: boolean;
};

const StarRating = ({ size, rating, readonly = false }: StarRatingProps) => {
  const TOTAL_RATING = 5;
  const OFFSET = 1;

  const [selectedRating, setSelectedRating] = useState(rating);

  const handleStarClick = (starId: number) => {
    setSelectedRating(starId + OFFSET);
  };

  return (
    <ul className={cx('star-rating')} aria-label={`${rating} out of 5`}>
      {Array(TOTAL_RATING)
        .fill(0)
        .map((_, index) => {
          const filled = index < selectedRating;
          const { url, alt } = filled ? star.filled : star.empty;

          return (
            <li key={`key-star-${index}`}>
              {readonly ? (
                <div className={cx(`star-size-${size}`)}>
                  <Image src={url} alt={alt} className={cx('star-icon')} fill></Image>
                </div>
              ) : (
                <button onClick={() => handleStarClick(index)} className={cx(`star-size-${size}`)}>
                  <Image src={url} alt={alt} className={cx('star-icon')} fill></Image>
                </button>
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default StarRating;
