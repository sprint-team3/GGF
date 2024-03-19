import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames/bind';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import InputField from '@/components/auth/InputField';
import { BaseButton } from '@/components/commons/buttons';

import styles from './SignupForm.module.scss';

const cx = classNames.bind(styles);

const SignupForm = () => {
  const SignupSchema = z
    .object({
      email: z.string().min(1, { message: '이메일을 입력해주세요' }).email({
        message: '이메일 형식에 맞게 입력해주세요',
      }),
      nickname: z.string().min(1, { message: '닉네임을 10자 이내로 입력해주세요' }),
      password: z
        .string()
        .min(8, { message: '8자 이상 입력해주세요' })
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/, '영문과 숫자를 합해 8자이상 15자 이내로 입력해주세요'),
      passwordConfirm: z
        .string()
        .min(8, { message: '8자 이상 입력해주세요' })
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/, '영문과 숫자를 합해 8자이상 15자 이내로 입력해주세요'),
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

  const onSubmit = (data: object) => {
    console.log(data);
  };

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
          <form onSubmit={methods.handleSubmit(onSubmit)} className={cx('signup-form')}>
            <InputField label='Email' name='email' type='email' placeholder='Type your email' />
            <InputField label='Nickname' name='nickname' maxLength={10} placeholder='Type your nickname' />
            <InputField
              label='Password'
              name='password'
              type='password'
              maxLength={15}
              placeholder='Type your password'
            />
            <InputField
              label='Confirm password'
              name='passwordConfirm'
              type='password'
              maxLength={15}
              placeholder='Confirm your password'
            />
            <BaseButton theme='fill' size='large' isDisabled={!isValid} isQuantico>
              Match Now
            </BaseButton>
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
