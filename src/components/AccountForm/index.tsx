import { useState } from 'react';

import classNames from 'classnames/bind';

import PasswordForm from '@/components/account/PasswordForm';
import ProfileForm from '@/components/account/ProfileForm';
import ProfileImageForm from '@/components/account/ProfileImageForm';
import useUserStore from '@/stores/useUserStore';

import styles from './AccountForm.module.scss';

const cx = classNames.bind(styles);

const AccountForm = () => {
  const { userData } = useUserStore();

  const userEmail = userData?.email;
  const userNickname = userData?.nickname;
  const userProfileImageUrl = userData?.profileImageUrl;
  const userId = userData?.id;

  const [newImageUrl, setNewImageUrl] = useState(userProfileImageUrl || null);

  return (
    <section className={cx('container')}>
      <div className={cx('mypage')}>
        <h1 className={cx('visually-hidden')}>계정 수정</h1>
        <h2 className={cx('mypage-main-title')}>프로필 수정</h2>

        <ProfileImageForm newImageUrl={newImageUrl} setNewImageUrl={setNewImageUrl} />
        <ProfileForm
          userEmail={userEmail}
          userId={userId}
          userNickname={userNickname}
          userProfileImageUrl={userProfileImageUrl}
          newImageUrl={newImageUrl}
          setNewImageUrl={setNewImageUrl}
        />
        <h2 className={cx('mypage-main-title')}>비밀번호 수정</h2>
        <PasswordForm />
      </div>
    </section>
  );
};

export default AccountForm;
