import classNames from 'classnames/bind';

import { toFixedOneDecimal } from '@/utils';

import Avatar from '@/components/commons/Avatar';
import StarRating from '@/components/commons/StarRating';

import styles from './ReviewSummary.module.scss';

const cx = classNames.bind(styles);

type ReviewSummaryProps = {
  profileImageUrl: string;
  rating: number;
  nickname: string;
  email: string;
};

const ReviewSummary = ({ profileImageUrl, nickname, email, rating }: ReviewSummaryProps) => {
  return (
    <div className={cx('review-summary')}>
      <div className={cx('review-summary-profile')}>
        <Avatar size='medium' profileImageUrl={profileImageUrl} />
        <div className={cx('review-summary-profile-info')}>
          <span className={cx('nickname')}>{nickname}</span>
          <span className={cx('email')}>{email}</span>
        </div>
      </div>
      <div className={cx('review-summary-star')}>
        <StarRating size='medium' rating={rating} readonly />
        <span className={cx('rating')}>{toFixedOneDecimal(rating)}</span>
      </div>
    </div>
  );
};

export default ReviewSummary;
