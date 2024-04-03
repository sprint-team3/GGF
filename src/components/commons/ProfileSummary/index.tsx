import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import Avatar from '@/components/commons/Avatar';

import styles from './profileSummary.module.scss';

const cx = classNames.bind(styles);
const { url, alt } = SVGS.button.setting;

type ProfileSummaryProps = {
  nickname: string;
  email: string;
  profileImageUrl: string | null;
  recruitmentTotalCount: number;
  reservationTotalCount: number;
};

const ProfileSummary = ({
  nickname,
  email,
  profileImageUrl,
  recruitmentTotalCount,
  reservationTotalCount,
}: ProfileSummaryProps) => {
  return (
    <div className={cx('summary')}>
      <div className={cx('profile-summary')}>
        <Avatar size='medium' profileImageUrl={profileImageUrl} />
        <div className={cx('profile-summary-info')}>
          <div className={cx('profile-summary-info-profile')}>
            <span className={cx('profile-summary-info-nickname')}>{nickname}</span>
            <Link href={'/account'}>
              <Image src={url} alt={alt} width={18} height={18} />
            </Link>
          </div>
          <span className={cx('profile-summary-info-email')}>{email}</span>
        </div>
      </div>
      <div className={cx('recruitment-reservation-summary')}>
        <div className={cx('recruitment-summary')}>
          <span className={cx('recruitment-summary-title')}>등록한 게시글</span>
          <span className={cx('recruitment-summary-count')}>{recruitmentTotalCount}</span>
        </div>
        <div className={cx('reservation-summary')}>
          <span className={cx('reservation-summary-title')}>신청한 예약</span>
          <span className={cx('reservation-summary-count')}>{reservationTotalCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
