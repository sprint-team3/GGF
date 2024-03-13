/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChangeEvent, useState } from 'react';

import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';

import styles from './TextField.module.scss';

const cx = classNames.bind(styles);

type TextFieldProps = {
  label: string;
  name: string;
  maxLength?: number;
  placeholder?: string;
  autocomplete?: boolean;
};

export const TextField = ({ label, name, maxLength = 700, ...props }: TextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [textCount, setTextCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

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
      <label className={cx('text-field-label')}>{label}</label>
      <div
        className={cx('text-field-text-group', { error: isError }, { focused: isFocused })}
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
          {...props}
        />
        <div className={cx('text-field-text-group-footer')}>
          <span className={cx('text-field-text-group-footer-current-num', { active: textCount > 0 })}>{textCount}</span>
          <span className={cx('text-field-text-group-footer-total-num')}>/{maxLength}</span>
        </div>
      </div>
    </div>
  );
};
