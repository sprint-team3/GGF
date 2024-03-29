import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { FormProvider, useForm } from 'react-hook-form';

import { QUERY_KEYS } from '@/apis/queryKeys';
import { Users } from '@/apis/users';
import { ImageSchema, PasswordSchema, ProfileSchema } from '@/apis/users/schema';
import { ERROR_MESSAGE, INPUT_NAMES } from '@/constants';

import Avatar from '@/components/commons/Avatar';
import { BaseButton } from '@/components/commons/buttons';
import { InputField } from '@/components/commons/inputs';
import { ConfirmModal, ModalButton } from '@/components/commons/modals';
import useMultiState from '@/hooks/useMultiState';
import useUserStore from '@/stores/useUserStore';

import styles from './AccountForm.module.scss';

const cx = classNames.bind(styles);

const { profileImageUrl, nickname, password, passwordConfirm, image } = INPUT_NAMES;

const AccountForm = () => {
  const { multiState, toggleClick } = useMultiState(['resetConfirmModal', 'saveAlertModal']);
  const { userData } = useUserStore();

  const userEmail = userData?.email;
  const userNickname = userData?.nickname;
  const userProfileImageUrl = userData?.profileImageUrl;
  const userId = userData?.id;

  const [newImageUrl, setNewImageUrl] = useState(userProfileImageUrl || '');
  const [isProfileFormDirty, setIsProfileFormDirty] = useState(false);
  const fileInputRef = useRef(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const profileImageMethods = useForm({
    mode: 'all',
    resolver: zodResolver(ImageSchema),
  });

  const profileMethods = useForm({
    mode: 'all',
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      email: userEmail,
      [nickname]: userNickname,
      [profileImageUrl]: userProfileImageUrl,
    },
  });

  const passwordMethods = useForm({
    mode: 'all',
    resolver: zodResolver(PasswordSchema),
  });

  const { register, setValue, getValues } = profileImageMethods;
  const {
    setValue: setProfileFormValue,
    formState: { dirtyFields: profileFormDirtyFields },
    watch: profileWatch,
  } = profileMethods;
  const { watch: passwordWatch } = passwordMethods;

  const watchPassword = passwordWatch(password);

  useEffect(() => {
    setProfileFormValue(`${nickname}`, userNickname);
    setProfileFormValue(`${profileImageUrl}`, userProfileImageUrl);
    setNewImageUrl(userProfileImageUrl || '');
  }, [userNickname, userProfileImageUrl]);

  useEffect(() => {
    if (userNickname === profileWatch(nickname) && newImageUrl === userProfileImageUrl) {
      setIsProfileFormDirty(false);
    } else if (profileFormDirtyFields.nickname || newImageUrl !== userProfileImageUrl) {
      setIsProfileFormDirty(true);
    }
  }, [profileFormDirtyFields.nickname, newImageUrl, userProfileImageUrl, userNickname, profileWatch(nickname)]);

  const handleAttach = () => {
    if (fileInputRef.current !== null) {
      const input = fileInputRef.current as HTMLInputElement;
      input.click();
    }
  };

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
      setNewImageUrl(imagePreviewUrl);
      setValue('image', file);
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }
  };

  const handleClickReset = () => {
    setProfileFormValue('profileImageUrl', null);
    setValue('image', '');
    setNewImageUrl('');
    toggleClick('resetConfirmModal');
  };

  const handleCloseReset = () => {
    toggleClick('resetConfirmModal');
  };

  const handleCloseSave = () => {
    toggleClick('saveAlertModal');
  };

  const { mutate: profileImageMutation } = useMutation({
    mutationFn: (value: File) => Users.createImageUrl(value),
    onSuccess(data) {
      const { profileImageUrl } = data.data;
      setProfileFormValue('profileImageUrl', profileImageUrl);
    },
  });

  const { setUserData } = useUserStore();

  const { mutate: profileMutation } = useMutation({
    mutationFn: Users.edit,
    mutationKey: [QUERY_KEYS.users.edit, userId],
    onSuccess(data) {
      const { profileImageUrl } = data.data;
      setNewImageUrl(profileImageUrl);
      setUserData(data.data);
      toggleClick('saveAlertModal');
    },
  });

  const { mutate: passwordMutation } = useMutation({
    mutationFn: Users.edit,
    onSuccess() {
      toggleClick('saveAlertModal');
    },
  });

  const handleProfileImageSubmit = () => {
    profileImageMutation(getValues(image));
  };

  const handleProfileSubmit = (data: object) => {
    profileMutation(data);
  };

  const handlePasswordSubmit = (data: object) => {
    if ('passwordConfirm' in data) {
      delete data?.passwordConfirm;
    }
    passwordMutation(data);
  };

  return (
    <>
      <section className={cx('container')}>
        <div className={cx('mypage')}>
          <h1 className={cx('visually-hidden')}>계정 수정</h1>
          <h2 className={cx('mypage-main-title')}>프로필 수정</h2>

          <div className={cx('mypage-profile-group')}>
            <h3 className={cx('title')}>프로필 이미지</h3>
            <div className={cx('btn-outer-group')}>
              <Avatar size='large' profileImageUrl={newImageUrl} />
              <form onSubmit={profileImageMethods.handleSubmit(handleProfileImageSubmit)} className={cx('image-form')}>
                <fieldset className={cx('fieldset')}>
                  <legend>프로필 이미지 등록</legend>
                  <input
                    {...register(image)}
                    ref={fileInputRef}
                    className={cx('image-field')}
                    type='file'
                    accept='.jpg, .png, .jpeg,'
                    onChange={handleChangeImage}
                  />
                  <button ref={buttonRef} />
                  <BaseButton theme='ghost' size='medium' onClick={handleAttach}>
                    파일 첨부
                  </BaseButton>
                  <BaseButton theme='ghost' size='medium' color='red' onClick={() => toggleClick('resetConfirmModal')}>
                    초기화
                  </BaseButton>
                </fieldset>
              </form>
            </div>
          </div>

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
                      <InputField name='email' type='email' placeholder={userEmail} isErrorVisible isDisabled />
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
                    <BaseButton
                      type='submit'
                      theme='fill'
                      size='medium'
                      color='purple'
                      isDisabled={!isProfileFormDirty}
                    >
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

          <FormProvider {...passwordMethods}>
            <h2 className={cx('mypage-main-title')}>비밀번호 수정</h2>
            <form className={cx('password-form')} onSubmit={passwordMethods.handleSubmit(handlePasswordSubmit)}>
              <fieldset className={cx('fieldset')}>
                <legend>비밀번호 변경</legend>
                <div className={cx('input-group')}>
                  <div className={cx('inner-group')}>
                    <span className={cx('title')}>비밀번호</span>
                    <div className={cx('input-field')}>
                      <InputField
                        name={password}
                        placeholder={ERROR_MESSAGE.password.placeholder}
                        type={'password'}
                        isErrorVisible
                      />
                    </div>
                  </div>
                  <div className={cx('inner-group')}>
                    <span className={cx('title')}>비밀번호 확인</span>
                    <div className={cx('input-field')}>
                      <InputField
                        name={passwordConfirm}
                        type={'password'}
                        placeholder={ERROR_MESSAGE.password.placeholder}
                        isErrorVisible
                      />
                    </div>
                  </div>
                </div>
                <div className={cx('btn-group')}>
                  <div className={cx('sm-btn', 'sm-hidden')}>
                    <BaseButton type='submit' theme='fill' size='medium' color='purple' isDisabled={!watchPassword}>
                      저장
                    </BaseButton>
                  </div>
                  <div className={cx('sm-only')}>
                    <BaseButton type='submit' theme='fill' size='large' color='purple'>
                      저장
                    </BaseButton>
                  </div>
                </div>
              </fieldset>
            </form>
          </FormProvider>
        </div>
      </section>

      <ConfirmModal
        openModal={multiState.resetConfirmModal}
        onClose={handleCloseReset}
        state='ALEART'
        title='프로필 이미지를 초기화하시겠습니까?'
        warning
        renderButton={
          <>
            <ModalButton variant='warning' onClick={handleClickReset}>
              초기화
            </ModalButton>
            <ModalButton onClick={handleCloseReset}>닫기</ModalButton>
          </>
        }
      />
      <ConfirmModal
        openModal={multiState.saveAlertModal}
        onClose={handleCloseSave}
        state='CONFIRM'
        title='정보가 저장되었습니다'
        renderButton={
          <ModalButton variant='success' onClick={handleCloseSave}>
            확인
          </ModalButton>
        }
      />
    </>
  );
};

export default AccountForm;
