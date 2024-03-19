import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames/bind';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import InputField from '@/components/auth/InputField';
import { BaseButton } from '@/components/commons/buttons';

import styles from './SigninForm.module.scss';

const cx = classNames.bind(styles);

const SigninForm = () => {
  const SigninSchema = z.object({
    email: z.string().min(1, { message: '이메일을 입력해주세요' }).email({
      message: '이메일 형식에 맞게 입력해주세요',
    }),
    password: z
      .string()
      .min(8, { message: '8자 이상 입력해주세요' })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/, '영문과 숫자를 합해 8자이상 15자 이내로 입력해주세요'),
  });

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(SigninSchema),
  });

  const {
    formState: { isValid },
  } = methods;

  const onSubmit = (data: object) => {
    console.log(data);
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
          <form onSubmit={methods.handleSubmit(onSubmit)} className={cx('signin-form')}>
            <InputField label='Email' name='email' type='email' placeholder='Type your email' />
            <InputField
              label='Password'
              name='password'
              type='password'
              maxLength={15}
              placeholder='Type your password'
            />
            <BaseButton theme='fill' size='large' isDisabled={!isValid} isQuantico>
              Match Now
            </BaseButton>
          </form>
        </FormProvider>
        <footer className={cx('signin-footer')}>
          <span className={cx('signin-footer-question')}>회원이 아니신가요?</span>
          <Link className={cx('signin-footer-link')} href={'/signup'}>
            로그인하기
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default SigninForm;
