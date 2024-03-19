import { useState } from 'react';

import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';

import { PASSWORD_SHOW_MODE } from '@/constants';

import useToggleButton from '@/hooks/useToggleButton';

import styles from './InputField.module.scss';

const cx = classNames.bind(styles);

type InputFieldProps = {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  maxLength?: number;
};

const InputField = ({ label, name, type = 'text', ...props }: InputFieldProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const { isVisible, handleToggleClick } = useToggleButton();
  const { iconEye, inputType, showMode } = isVisible ? PASSWORD_SHOW_MODE.on : PASSWORD_SHOW_MODE.off;
  const [isFocused, setIsFocused] = useState(false);
  const isError = !!errors[name]?.message;

  const handleToggleFocus = () => {
    setIsFocused((prev) => !prev);
  };

  return (
    <div className={cx('input-field')}>
      <div className={cx('input-field-group', { filled: watch(name)?.length > 0 })}>
        <span className={cx('input-field-group-label', { focused: isFocused })}>{label}</span>
        <div className={cx('input-field-group-container', { filled: watch(name)?.length > 0 })}>
          <input
            className={cx('input-field-group-container-input')}
            type={type === 'password' ? inputType : type}
            autoComplete='on'
            onFocus={handleToggleFocus}
            {...register(name, {
              onBlur: handleToggleFocus,
            })}
            {...props}
          />
          {type === 'password' && (
            <button
              type='button'
              role='switch'
              aria-label={showMode}
              aria-checked={isVisible}
              onClick={handleToggleClick}
              className={cx('input-field-group-container-eye-btn')}
            >
              <img src={iconEye} alt={showMode} />
            </button>
          )}
        </div>
      </div>
      {isError && (
        <span className={cx('input-field-err-msg')}>
          <ErrorMessage errors={errors} name={name} render={({ message }) => <p>{message}</p>} />
        </span>
      )}
    </div>
  );
};

export default InputField;
