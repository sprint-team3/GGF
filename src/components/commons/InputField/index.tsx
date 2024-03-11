import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';

import { PASSWORD_SHOW_MODE } from '@/constants/passwordMode';
import useToggleButton from '@/hooks/useToggleButton';

import styles from './InputField.module.scss';

const cx = classNames.bind(styles);

type InputFieldProps = {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  isErrorVisible?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
};

const InputField = ({
  label,
  name,
  type = 'text',
  isErrorVisible = false,
  isDisabled = false,
  ...props
}: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const isError = !!errors[name]?.message;
  const { isVisible, handleToggleClick } = useToggleButton();
  const { iconEye, inputType, showMode } = isVisible ? PASSWORD_SHOW_MODE.on : PASSWORD_SHOW_MODE.off;

  return (
    <div className={cx('input-field')}>
      <label htmlFor={name} className={cx('input-field-label')}>
        {label}
      </label>
      <div className={cx('input-field-input-group')}>
        {isDisabled ? (
          <input className={cx('input-field-input-group-input', { disabled: isDisabled })} disabled {...props} />
        ) : (
          <input
            className={cx('input-field-input-group-input', { error: isError })}
            type={type === 'password' ? inputType : type}
            autoComplete='on'
            {...register(name)}
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
      </div>
      {isErrorVisible && !isDisabled && (
        <span className={cx('input-field-err-msg')}>
          <ErrorMessage errors={errors} name={name} render={({ message }) => <p>{message}</p>} />
        </span>
      )}
    </div>
  );
};

export default InputField;
