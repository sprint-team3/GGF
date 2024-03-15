import { Fragment } from 'react';

import classNames from 'classnames/bind';

import { getFormatDate } from '@/utils';

import { Avatar } from '@/components/commons/Avatar';
import StarRating from '@/components/commons/StarRating';

import { Reviewer } from '@/types';

import styles from './ReviewCard.module.scss';

const cx = classNames.bind(styles);

type ReviewCardProps = {
  user: Reviewer;
  rating: number;
  createdAt: string;
  content: string;
};

const ReviewCard = ({ user, rating, createdAt, content }: ReviewCardProps) => {
  return (
    <article className={cx('review-card')}>
      <div className={cx('review-card-profile')}>
        <Avatar size='small' profileImageUrl={user.profileImageUrl} />
        <div className={cx('review-card-info')}>
          <h1 className={cx('review-card-info-reviewer')}>{user.nickname}</h1>
          <div className={cx('review-card-info-rating')}>
            <StarRating size='small' rating={rating} />
            <span className={cx('review-card-info-date')}>{getFormatDate(createdAt)}</span>
          </div>
        </div>
      </div>
      <div className={cx('review-card-comment')}>
        {content.split('\n').map((comment, index) => (
          <Fragment key={`key-content-${index}`}>
            {comment}
            <br />
          </Fragment>
        ))}
      </div>
    </article>
  );
};

export default ReviewCard;
