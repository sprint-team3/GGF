import { ChangeEvent, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames/bind';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ERROR_MESSAGE, INPUT_NAMES, REGEX } from '@/constants';

import Avatar from '@/components/commons/Avatar';
import { BaseButton } from '@/components/commons/buttons';
import { InputField } from '@/components/commons/inputs';
import { ConfirmModal, ModalButton } from '@/components/commons/modals';
import { USER_DATA } from '@/constants/mockData/headerMockData';
import useMultiState from '@/hooks/useMultiState';

import styles from './AccountForm.module.scss';

const cx = classNames.bind(styles);

const { profileImageUrl, nickname, password, passwordConfirm, image } = INPUT_NAMES;

const ImageSchema = z.object({
  [image]: z.instanceof(File),
});

const ProfileSchema = z.object({
  [profileImageUrl]: z.string().optional(),
  [nickname]: z.string().min(1, { message: ERROR_MESSAGE.nickname.min }),
});

const PasswordSchema = z
  .object({
    [password]: z
      .string()
      .min(8, { message: ERROR_MESSAGE.password.min })
      .regex(REGEX.password, ERROR_MESSAGE.password.regex),
    [passwordConfirm]: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: [passwordConfirm],
    message: ERROR_MESSAGE.password.refine,
  });

const AccountForm = () => {
  const { multiState, toggleClick } = useMultiState(['resetConfirmModal', 'saveAlertModal']);
  const [newImageUrl, setNewImageUrl] = useState(USER_DATA.profileImageUrl || '');
  const fileInputRef = useRef(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const Profilemethods = useForm({
    mode: 'all',
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      [nickname]: USER_DATA.nickname,
      [profileImageUrl]: USER_DATA.profileImageUrl,
    },
  });
  const subMethods = useForm({
    mode: 'all',
    resolver: zodResolver(ImageSchema),
  });
  const passwordMethods = useForm({
    mode: 'all',
    resolver: zodResolver(PasswordSchema),
  });

  const { setValue: setFormValue } = Profilemethods;
  const { register, setValue } = subMethods;

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
      setValue(image, file);
      setFormValue(profileImageUrl, imagePreviewUrl);
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }
  };

  const handleClickReset = () => {
    setFormValue(profileImageUrl, '');
    setValue(image, '');
    setNewImageUrl('');
    toggleClick('resetConfirmModal');
  };

  const onSubmit = (data: object) => {
    console.log(data);
    toggleClick('saveAlertModal');
  };

  const fileOnSubmit = (data: object) => {
    console.log('fileOnSubmit', data);
  };

  return (
    <>
      <section className={cx('container')}>
        <div className={cx('mypage')}>
          <h2 className={cx('mypage-main-title')}>프로필 수정</h2>

          <div className={cx('mypage-profile-group')}>
            <h3 className={cx('title')}>프로필 이미지</h3>
            <div className={cx('btn-outer-group')}>
              <Avatar size='large' profileImageUrl={newImageUrl} />
              <form onSubmit={subMethods.handleSubmit(fileOnSubmit)} className={cx('image-form')}>
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

          <FormProvider {...Profilemethods}>
            <form onSubmit={Profilemethods.handleSubmit(onSubmit)} className={cx('profile-form')}>
              <fieldset>
                <legend>닉네임 변경</legend>
                <div className={cx('input-group')}>
                  <div className={cx('hidden')}>
                    <InputField name={profileImageUrl} />
                  </div>
                  <div className={cx('inner-group')}>
                    <span className={cx('title')}>이메일</span>
                    <div className={cx('input-field')}>
                      <InputField name='email' type='email' placeholder={USER_DATA.email} isErrorVisible isDisabled />
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
                    <BaseButton type='submit' theme='fill' size='medium' color='purple'>
                      저장
                    </BaseButton>
                  </div>
                  <div className={cx('lg-btn', 'sm-only')}>
                    <BaseButton type='submit' theme='fill' size='large' color='purple'>
                      저장
                    </BaseButton>
                  </div>
                </div>
              </fieldset>
            </form>
          </FormProvider>

          <FormProvider {...passwordMethods}>
            <h2 className={cx('mypage-main-title')}>비밀번호 수정</h2>
            <form className={cx('password-form')} onSubmit={passwordMethods.handleSubmit(onSubmit)}>
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
                    <BaseButton type='submit' theme='fill' size='medium' color='purple'>
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
        onClose={() => toggleClick('resetConfirmModal')}
        state='ALEART'
        title='프로필 이미지를 초기화하시겠습니까?'
        renderButton={
          <>
            <ModalButton variant='warning' onClick={handleClickReset}>
              초기화
            </ModalButton>
            <ModalButton onClick={() => toggleClick('resetConfirmModal')}>닫기</ModalButton>
          </>
        }
        warning
      />
      <ConfirmModal
        openModal={multiState.saveAlertModal}
        onClose={() => toggleClick('saveAlertModal')}
        state='CONFIRM'
        title='정보가 저장되었습니다'
        renderButton={<ModalButton onClick={() => toggleClick('saveAlertModal')}>확인</ModalButton>}
      />
    </>
  );
};

export default AccountForm;
