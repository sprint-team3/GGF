import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import classNames from 'classnames/bind';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Auth } from '@/apis/auth';
import { API_ERROR_MESSAGE, ERROR_MESSAGE, PAGE_PATHS, REGEX } from '@/constants';
import { redirectToPage, setAuthCookie } from '@/utils';

import AuthInputField from '@/components/auth/AuthInputField';
import { BaseButton } from '@/components/commons/buttons';
import { ConfirmModal, ModalButton } from '@/components/commons/modals';
import useToggleButton from '@/hooks/useToggleButton';
import useUserStore from '@/stores/useUserStore';

import { Account } from '@/types';

import styles from './SigninForm.module.scss';

const cx = classNames.bind(styles);

const SigninSchema = z.object({
  email: z.string().min(1, { message: ERROR_MESSAGE.email.min }).email({
    message: ERROR_MESSAGE.email.regex,
  }),
  password: z
    .string()
    .min(8, { message: ERROR_MESSAGE.password.min })
    .regex(REGEX.password, ERROR_MESSAGE.password.regex),
});

const SigninForm = () => {
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(SigninSchema),
  });

  const {
    formState: { isValid },
  } = methods;

  const { isVisible: is404Visible, handleToggleClick: toggle404Click } = useToggleButton();
  const { isVisible: is400Visible, handleToggleClick: toggle400Click } = useToggleButton();

  const { mutate: signinMutation } = useMutation({
    mutationFn: (value: Account) => Auth.signin(value),
    onSuccess(data) {
      const { accessToken, refreshToken, user } = data.data;
      setAuthCookie(null, accessToken, refreshToken);
      useUserStore.setState({ user: user });
      redirectToPage(PAGE_PATHS.mainList);
    },
    onError: (error) => {
      if ((error as AxiosError)?.response?.status === 404) {
        toggle404Click();
      } else if ((error as AxiosError)?.response?.status === 400) {
        toggle400Click();
      }
    },
  });

  const handleSigninSubmit = (formData: object) => {
    signinMutation(formData as Account);
  };

  return (
    <section className={cx('container')}>
      <div className={cx('signin')}>
        <header className={cx('signin-header')}>
          <p className={cx('signin-header-main-title')}>GGF</p>
          <div className={cx('signin-header-sub-container')}>
            <span className={cx('sub-title')}>BEST TEAMWORK</span>
            <span className={cx('sub-title')}>IT&apos;s UP TO YOU</span>
          </div>
        </header>
        <FormProvider {...methods}>
          <form className={cx('signin-form')} onSubmit={methods.handleSubmit(handleSigninSubmit)}>
            <fieldset className={cx('fieldset')}>
              <legend>회원가입 정보 등록</legend>
              <AuthInputField label='Email' name='email' type='email' placeholder='Type your email' />
              <AuthInputField
                label='Password'
                name='password'
                type='password'
                maxLength={15}
                placeholder='Type your password'
              />
              <BaseButton type='submit' theme='fill' size='large' isDisabled={!isValid} isQuantico>
                Match Now
              </BaseButton>
            </fieldset>
          </form>
        </FormProvider>
        <footer className={cx('signin-footer')}>
          <span className={cx('signin-footer-question')}>회원이 아니신가요?</span>
          <Link className={cx('signin-footer-link')} href={PAGE_PATHS.signup}>
            회원가입하기
          </Link>
        </footer>
      </div>
      <ConfirmModal
        openModal={is404Visible}
        onClose={toggle404Click}
        state='ALERT'
        title='로그인 실패'
        desc={API_ERROR_MESSAGE.signin[404]}
        renderButton={
          <ModalButton onClick={toggle404Click} variant='warning'>
            확인
          </ModalButton>
        }
        warning
      />
      <ConfirmModal
        openModal={is400Visible}
        onClose={toggle400Click}
        state='ALERT'
        title='로그인 실패'
        desc={API_ERROR_MESSAGE.signin[400]}
        renderButton={
          <ModalButton onClick={toggle400Click} variant='warning'>
            확인
          </ModalButton>
        }
        warning
      />
    </section>
  );
};

export default SigninForm;
