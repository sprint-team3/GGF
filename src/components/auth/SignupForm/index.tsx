import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames/bind';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ERROR_MESSAGE, REGEX } from '@/constants';

import AuthInputField from '@/components/auth/AuthInputField';
import { BaseButton } from '@/components/commons/buttons';

import styles from './SignupForm.module.scss';

const cx = classNames.bind(styles);

const SignupForm = () => {
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
      message: '비밀번호가 일치하지 않습니다.',
    });

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(SignupSchema),
  });

  const {
    formState: { isValid },
  } = methods;

  return (
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
          <form className={cx('signup-form')}>
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
              <BaseButton theme='fill' size='large' isDisabled={!isValid} isQuantico>
                Match Now
              </BaseButton>
            </fieldset>
          </form>
        </FormProvider>
        <footer className={cx('signup-footer')}>
          <span className={cx('signup-footer-question')}>회원이신가요?</span>
          <Link className={cx('signup-footer-link')} href={'/signin'}>
            로그인하기
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default SignupForm;
