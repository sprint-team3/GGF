/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChangeEvent, useState } from 'react';

import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';

import { REGEX } from '@/constants';

import styles from './TextField.module.scss';

const cx = classNames.bind(styles);

const MIN_LENGTH_TEXTAREA = 5;

type TextFieldProps = {
  name: string;
  label?: string;
  maxLength?: number;
  placeholder?: string;
};

export const TextField = ({ name, label, maxLength = 700, ...props }: TextFieldProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const [textCount, setTextCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const contentValue = watch('content');
  const textLength = contentValue ? contentValue.replace(REGEX.textarea, '').length : 0;
  const minLengthError = textLength < MIN_LENGTH_TEXTAREA;
  const isError = !!errors[name]?.message;

  const handleClick = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextCount(event.target.textLength);
  };

  return (
    <div className={cx('text-field')}>
      <label className={cx('text-field-label', { 'non-label': !label })}>{label}</label>
      <div
        className={cx('text-field-text-group', { error: isError }, { focused: isFocused }, { 'non-label': !label })}
        role='textbox'
        tabIndex={0}
        onClick={handleClick}
        onBlur={handleBlur}
      >
        <textarea
          className={cx('text-field-text-group-textarea')}
          {...register(name, {
            onChange: (event) => handleChange(event),
          })}
          maxLength={maxLength}
          {...props}
        />
        <div className={cx('text-field-text-group-footer')}>
          <span
            className={cx(
              'text-field-text-group-footer-current-num',
              { active: textCount > 4 },
              { 'text-length-error': minLengthError },
            )}
          >
            {textLength}
          </span>
          <span className={cx('text-field-text-group-footer-total-num')}>/{maxLength}</span>
        </div>
      </div>
    </div>
  );
};
