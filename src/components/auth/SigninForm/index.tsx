import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames/bind';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ERROR_MESSAGE, REGEX } from '@/constants';

import AuthInputField from '@/components/auth/AuthInputField';
import { BaseButton } from '@/components/commons/buttons';

import styles from './SigninForm.module.scss';

const cx = classNames.bind(styles);

const SigninForm = () => {
  const SigninSchema = z.object({
    email: z.string().min(1, { message: ERROR_MESSAGE.email.min }).email({
      message: ERROR_MESSAGE.email.regex,
    }),
    password: z
      .string()
      .min(8, { message: ERROR_MESSAGE.password.min })
      .regex(REGEX.password, ERROR_MESSAGE.password.regex),
  });

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(SigninSchema),
  });

  const {
    formState: { isValid },
  } = methods;

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
          <form className={cx('signin-form')}>
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
              <BaseButton theme='fill' size='large' isDisabled={!isValid} isQuantico>
                Match Now
              </BaseButton>
            </fieldset>
          </form>
        </FormProvider>
        <footer className={cx('signin-footer')}>
          <span className={cx('signin-footer-question')}>회원이 아니신가요?</span>
          <Link className={cx('signin-footer-link')} href={'/signup'}>
            회원가입하기
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default SigninForm;
