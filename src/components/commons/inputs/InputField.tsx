import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';

import { PASSWORD_SHOW_MODE } from '@/constants/passwordMode';
import useToggleButton from '@/hooks/useToggleButton';

import styles from './InputField.module.scss';

const cx = classNames.bind(styles);

type InputFieldProps = {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password';
  isErrorVisible?: boolean;
  isLimited?: boolean;
  isDisabled?: boolean;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  readOnly?: boolean;
};

export const InputField = ({
  name,
  label,
  type = 'text',
  isErrorVisible = false,
  isLimited = false,
  isDisabled = false,
  maxLength = 10,
  minLength = 1,
  readOnly = false,
  ...props
}: InputFieldProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const isError = !!errors[name]?.message;
  const { isVisible, handleToggleClick } = useToggleButton();
  const { iconEye, inputType, showMode } = isVisible ? PASSWORD_SHOW_MODE.on : PASSWORD_SHOW_MODE.off;
  const isPassword = type === 'password';
  const textLength = watch(name)?.length || 0;

  const isBelowMinLength = textLength < minLength;
  const isValidLength = textLength >= minLength;

  return (
    <div className={cx('input-field')}>
      <label htmlFor={`input-field-${name}`} className={cx('input-field-label', { 'non-label': !label })}>
        {label}
      </label>
      <div className={cx('input-field-input-group')}>
        {isDisabled ? (
          <input id={`input-field-${name}`} className={cx('input-field-input-group-input')} disabled {...props} />
        ) : (
          <input
            id={`input-field-${name}`}
            className={cx(
              'input-field-input-group-input',
              { error: isError },
              { 'is-password': isPassword },
              { 'is-limited': isLimited && !isPassword },
            )}
            type={type === 'password' ? inputType : type}
            autoComplete='on'
            readOnly={readOnly}
            {...register(name)}
            maxLength={maxLength}
            minLength={minLength}
            {...props}
          />
        )}
        {type === 'password' && (
          <button
            type='button'
            role='switch'
            aria-label={showMode}
            aria-checked={isVisible}
            onClick={handleToggleClick}
            className={cx('input-field-input-group-eye-btn')}
          >
            <img src={iconEye} alt={showMode} />
          </button>
        )}
        {isLimited && !isPassword && (
          <div className={cx('input-field-input-group-footer')}>
            <span className={cx('current-num', { active: isValidLength }, { error: isBelowMinLength })}>
              {textLength}
            </span>
            <span className={cx('total-num')}>/{maxLength}</span>
          </div>
        )}
      </div>
      {isErrorVisible && !isDisabled && (
        <span className={cx('input-field-err-msg')}>
          <ErrorMessage errors={errors} name={name} render={({ message }) => <p>{message}</p>} />
        </span>
      )}
    </div>
  );
};
