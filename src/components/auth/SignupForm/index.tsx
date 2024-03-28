import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import classNames from 'classnames/bind';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { API_ERROR_MESSAGE, ERROR_MESSAGE, PAGE_PATHS, REGEX } from '@/constants';
import { redirectToPage } from '@/utils';

import AuthInputField from '@/components/auth/AuthInputField';
import { BaseButton } from '@/components/commons/buttons';
import { ConfirmModal, ModalButton } from '@/components/commons/modals';
import { useSignup } from '@/hooks/useAuth';
import useToggleButton from '@/hooks/useToggleButton';

import { SignupParams } from '@/types';

import styles from './SignupForm.module.scss';

const cx = classNames.bind(styles);

const SignupSchema = z
  .object({
    email: z.string().min(1, { message: ERROR_MESSAGE.email.min }).email({
      message: ERROR_MESSAGE.email.regex,
    }),
    nickname: z.string().min(1, { message: ERROR_MESSAGE.nickname.min }),
    password: z
      .string()
      .min(8, { message: ERROR_MESSAGE.password.min })
      .regex(REGEX.password, ERROR_MESSAGE.password.regex),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: ERROR_MESSAGE.password.refine,
  });

const SignupForm = () => {
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(SignupSchema),
  });

  const {
    formState: { isValid },
  } = methods;

  const { isVisible: isSuccessVisible, handleToggleClick: toggleSuccessClick } = useToggleButton();
  const { isVisible: is400Visible, handleToggleClick: toggle400Click } = useToggleButton();
  const { isVisible: is409Visible, handleToggleClick: toggle409Click } = useToggleButton();

  const { mutate } = useSignup();

  const onSubmit = (formData: object) => {
    mutate(formData as SignupParams, {
      onSuccess: () => {
        toggleSuccessClick();
      },
      onError: (error) => {
        if ((error as AxiosError)?.response?.status === 400) {
          toggle400Click();
        } else if ((error as AxiosError)?.response?.status === 409) {
          toggle409Click();
        }
      },
    });
  };

  const handleOnSuccessClose = () => {
    toggleSuccessClick();
    redirectToPage(PAGE_PATHS.signin);
  };

  return (
    <>
      <section className={cx('container')}>
        <div className={cx('signup')}>
          <header className={cx('signup-header')}>
            <p className={cx('signup-header-main-title')}>GGF</p>
            <div className={cx('signup-header-sub-container')}>
              <span className={cx('sub-title')}>BEST TEAMWORK</span>
              <span className={cx('sub-title')}>IT&apos;s UP TO YOU</span>
            </div>
          </header>
          <FormProvider {...methods}>
            <form className={cx('signup-form')} onSubmit={methods.handleSubmit(onSubmit)}>
              <fieldset className={cx('fieldset')}>
                <legend>회원가입 정보 등록</legend>
                <AuthInputField label='Email' name='email' type='email' placeholder='Type your email' />
                <AuthInputField label='Nickname' name='nickname' maxLength={10} placeholder='Type your nickname' />
                <AuthInputField
                  label='Password'
                  name='password'
                  type='password'
                  maxLength={15}
                  placeholder='Type your password'
                />
                <AuthInputField
                  label='Confirm password'
                  name='passwordConfirm'
                  type='password'
                  maxLength={15}
                  placeholder='Confirm your password'
                />
                <BaseButton type='submit' theme='fill' size='large' isDisabled={!isValid} isQuantico>
                  Match Now
                </BaseButton>
              </fieldset>
            </form>
          </FormProvider>
          <footer className={cx('signup-footer')}>
            <span className={cx('signup-footer-question')}>회원이신가요?</span>
            <Link className={cx('signup-footer-link')} href={PAGE_PATHS.signin}>
              로그인하기
            </Link>
          </footer>
        </div>
      </section>
      <ConfirmModal
        openModal={isSuccessVisible}
        onClose={toggleSuccessClick}
        state='SUCCESS'
        title='회원가입 성공'
        renderButton={
          <ModalButton onClick={handleOnSuccessClose} variant='success'>
            로그인하러 가기
          </ModalButton>
        }
      />
      <ConfirmModal
        openModal={is400Visible}
        onClose={toggle400Click}
        state='FAIL'
        title='회원가입 실패'
        desc={API_ERROR_MESSAGE.signup[400]}
        renderButton={
          <ModalButton onClick={toggle400Click} variant='warning'>
            확인
          </ModalButton>
        }
        warning
      />
      <ConfirmModal
        openModal={is409Visible}
        onClose={toggle409Click}
        state='FAIL'
        title='회원가입 실패'
        desc={API_ERROR_MESSAGE.signup[409]}
        renderButton={
          <ModalButton onClick={toggle409Click} variant='warning'>
            확인
          </ModalButton>
        }
        warning
      />
    </>
  );
};

export default SignupForm;
