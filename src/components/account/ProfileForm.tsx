import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { FormProvider, useForm } from 'react-hook-form';

import { QUERY_KEYS } from '@/apis/queryKeys';
import { Users } from '@/apis/users';
import { ProfileSchema } from '@/apis/users/schema';
import { INPUT_NAMES } from '@/constants';

import { BaseButton } from '@/components/commons/buttons';
import { InputField } from '@/components/commons/inputs';
import { ConfirmModal, ModalButton } from '@/components/commons/modals';
import useToggleButton from '@/hooks/useToggleButton';
import useUserStore from '@/stores/useUserStore';

import styles from './ProfileForm.module.scss';

const cx = classNames.bind(styles);

const { profileImageUrl, email, nickname } = INPUT_NAMES;

type ProfileFormProps = {
  userEmail: string;
  userId: number;
  userNickname: string;
  userProfileImageUrl: string | null;
  newImageUrl: string | null;
  setNewImageUrl: Dispatch<SetStateAction<string | null>>;
};

const ProfileForm = ({
  userEmail,
  userId,
  userNickname,
  userProfileImageUrl,
  newImageUrl,
  setNewImageUrl,
}: ProfileFormProps) => {
  const profileMethods = useForm({
    mode: 'all',
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      [email]: userEmail,
      [nickname]: userNickname,
      [profileImageUrl]: userProfileImageUrl,
    },
  });

  const {
    setValue: setProfileFormValue,
    formState: { dirtyFields: profileFormDirtyFields },
    watch: profileWatch,
  } = profileMethods;

  const { setUserData } = useUserStore();
  const queryClient = useQueryClient();

  const { isVisible, handleToggleClick } = useToggleButton();

  const { mutate: profileMutation } = useMutation({
    mutationFn: Users.edit,
    mutationKey: [QUERY_KEYS.users.edit, userId],
    onSuccess(data) {
      const { profileImageUrl } = data.data;
      setNewImageUrl(profileImageUrl);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.users.get] });
      setUserData(data.data);
      handleToggleClick();
    },
  });

  const handleProfileSubmit = (data: object) => {
    profileMutation(data);
  };

  useEffect(() => {
    setProfileFormValue(`${nickname}`, userNickname);
    setProfileFormValue(`${profileImageUrl}`, userProfileImageUrl);
    setNewImageUrl(userProfileImageUrl || '');
  }, [userNickname, userProfileImageUrl]);

  const [isProfileFormDirty, setIsProfileFormDirty] = useState(false);

  useEffect(() => {
    if (userNickname === profileWatch(nickname) && newImageUrl === userProfileImageUrl) {
      setIsProfileFormDirty(false);
    } else if (profileFormDirtyFields.nickname || newImageUrl !== userProfileImageUrl) {
      setIsProfileFormDirty(true);
    }
  }, [profileFormDirtyFields.nickname, newImageUrl, userProfileImageUrl, userNickname, profileWatch(nickname)]);

  useEffect(() => {
    setProfileFormValue(profileImageUrl, newImageUrl);
  }, [newImageUrl]);

  return (
    <>
      <FormProvider {...profileMethods}>
        <form onSubmit={profileMethods.handleSubmit(handleProfileSubmit)} className={cx('profile-form')}>
          <fieldset>
            <legend>닉네임 변경</legend>
            <div className={cx('input-group')}>
              <div className={cx('hidden')}>
                <InputField name='profileImageUrl' />
              </div>
              <div className={cx('inner-group')}>
                <span className={cx('title')}>이메일</span>
                <div className={cx('input-field')}>
                  <InputField name={email} type='email' placeholder={userEmail} isErrorVisible isDisabled />
                </div>
              </div>
              <div className={cx('inner-group')}>
                <span className={cx('title')}>닉네임</span>
                <div className={cx('input-field')}>
                  <InputField name={nickname} isErrorVisible maxLength={10} />
                </div>
              </div>
            </div>
            <div className={cx('btn-group')}>
              <div className={cx('sm-btn', 'sm-hidden')}>
                <BaseButton type='submit' theme='fill' size='medium' color='purple' isDisabled={!isProfileFormDirty}>
                  저장
                </BaseButton>
              </div>
              <div className={cx('lg-btn', 'sm-only')}>
                <BaseButton type='submit' theme='fill' size='large' color='purple' isDisabled={!isProfileFormDirty}>
                  저장
                </BaseButton>
              </div>
            </div>
          </fieldset>
        </form>
      </FormProvider>
      <ConfirmModal
        openModal={isVisible}
        onClose={handleToggleClick}
        state='CONFIRM'
        title='닉네임 변경 성공'
        desc='닉네임이 성공적으로 변경되었습니다'
        renderButton={
          <ModalButton variant='success' onClick={handleToggleClick}>
            확인
          </ModalButton>
        }
      />
    </>
  );
};

export default ProfileForm;
