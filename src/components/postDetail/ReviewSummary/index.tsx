import classNames from 'classnames/bind';

import Avatar from '@/components/commons/Avatar';
import StarRating from '@/components/commons/StarRating';
import { USER_DATA } from '@/constants/mockData/headerMockData';

import styles from './ReviewSummary.module.scss';

const cx = classNames.bind(styles);

type ReviewSummary = {
  rating: number;
};

const ReviewSummary = ({ rating }: ReviewSummary) => {
  return (
    <div className={cx('review-summary')}>
      <div className={cx('review-summary-profile')}>
        <Avatar size='medium' profileImageUrl={USER_DATA.profileImageUrl} />
        <div className={cx('review-summary-profile-info')}>
          <span className={cx('nickname')}>닉네임</span>
          <span className={cx('email')}>계정이메일</span>
        </div>
      </div>
      <div className={cx('review-summary-star')}>
        <StarRating size='medium' rating={rating} readonly />
        <span className={cx('rating')}>{rating}.0</span>
      </div>
    </div>
  );
};

export default ReviewSummary;
