import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';

import { Users } from '@/apis/users';
import { ImageSchema } from '@/apis/users/schema';
import { INPUT_NAMES } from '@/constants';

import Avatar from '@/components/commons/Avatar';
import { BaseButton } from '@/components/commons/buttons';
import { ConfirmModal, ModalButton } from '@/components/commons/modals';
import useToggleButton from '@/hooks/useToggleButton';

import styles from './ProfileImageForm.module.scss';

const cx = classNames.bind(styles);

const { image } = INPUT_NAMES;

type ProfileImageFormType = {
  newImageUrl: string | null;
  setNewImageUrl: Dispatch<SetStateAction<string | null>>;
};

const ProfileImageForm = ({ newImageUrl, setNewImageUrl }: ProfileImageFormType) => {
  const profileImageMethods = useForm({
    mode: 'all',
    resolver: zodResolver(ImageSchema),
  });
  const { register, setValue, getValues } = profileImageMethods;

  const { mutate: profileImageMutation } = useMutation({
    mutationFn: Users.createImageUrl,
    onSuccess(data) {
      const { profileImageUrl: newProfileImageUrl } = data.data;
      setNewImageUrl(newProfileImageUrl);
    },
  });

  const handleProfileImageSubmit = () => {
    profileImageMutation(getValues(image));
  };

  const buttonRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef(null);

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

  const handleAttach = () => {
    if (fileInputRef.current !== null) {
      const input = fileInputRef.current as HTMLInputElement;
      input.click();
    }
  };

  const { isVisible, handleToggleClick } = useToggleButton();

  const handleClickReset = () => {
    setValue(image, '');
    setNewImageUrl(null);
    handleToggleClick();
  };

  return (
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
            <button ref={buttonRef} type='submit' aria-label='이미지 등록 버튼'></button>
            <BaseButton theme='ghost' size='medium' onClick={handleAttach}>
              이미지 등록
            </BaseButton>
            <BaseButton theme='ghost' size='medium' color='red' onClick={handleToggleClick}>
              초기화
            </BaseButton>
          </fieldset>
        </form>
      </div>

      <ConfirmModal
        openModal={isVisible}
        onClose={handleToggleClick}
        state='ALEART'
        title='프로필 이미지를 초기화하시겠습니까?'
        warning
        renderButton={
          <>
            <ModalButton variant='warning' onClick={handleClickReset}>
              초기화
            </ModalButton>
            <ModalButton onClick={handleToggleClick}>닫기</ModalButton>
          </>
        }
      />
    </div>
  );
};

export default ProfileImageForm;
