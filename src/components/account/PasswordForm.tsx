import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { FormProvider, useForm } from 'react-hook-form';

import { Users } from '@/apis/users';
import { PasswordSchema } from '@/apis/users/schema';
import { ERROR_MESSAGE, INPUT_NAMES } from '@/constants';

import { BaseButton } from '@/components/commons/buttons';
import { InputField } from '@/components/commons/inputs';
import { ConfirmModal, ModalButton } from '@/components/commons/modals';
import useToggleButton from '@/hooks/useToggleButton';

import styles from './PasswordForm.module.scss';

const cx = classNames.bind(styles);

const { password, passwordConfirm } = INPUT_NAMES;

const PasswordForm = () => {
  const passwordMethods = useForm({
    mode: 'all',
    resolver: zodResolver(PasswordSchema),
  });

  const { watch: passwordWatch } = passwordMethods;

  const watchPassword = passwordWatch(password);

  const { isVisible, handleToggleClick } = useToggleButton();

  const { mutate: passwordMutation } = useMutation({
    mutationFn: Users.edit,
    onSuccess() {
      handleToggleClick();
    },
  });

  const handlePasswordSubmit = (data: object) => {
    if ('passwordConfirm' in data) {
      delete data?.passwordConfirm;
    }
    passwordMutation(data);
  };

  return (
    <>
      <FormProvider {...passwordMethods}>
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
      <ConfirmModal
        openModal={isVisible}
        onClose={handleToggleClick}
        state='CONFIRM'
        title='비밀번호 변경 성공'
        desc='비밀번호가 성공적으로 변경되었습니다'
        renderButton={
          <ModalButton variant='success' onClick={handleToggleClick}>
            확인
          </ModalButton>
        }
      />
    </>
  );
};

export default PasswordForm;
