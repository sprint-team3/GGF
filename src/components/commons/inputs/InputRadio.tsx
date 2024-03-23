import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';

import styles from './InputRadio.module.scss';

const cx = classNames.bind(styles);

type InputRadioProps = {
  label: string;
  name: string;
  radioList: { id: string; value: number; label: string }[];
  onClick: (value: number) => void;
};

export const InputRadio = ({ label, name, radioList, onClick }: InputRadioProps) => {
  const { register } = useFormContext();

  return (
    <div className={cx('input-radio')}>
      <label className={cx('input-radio-label')}>{label}</label>
      <div className={cx('input-radio-group')}>
        {radioList.map((option, index) => (
          <button
            className={cx('option-container')}
            key={option.id}
            type='button'
            onClick={() => onClick(option.value)}
          >
            <input
              className={cx('radio')}
              type='radio'
              id={option.id}
              value={option.value}
              defaultChecked={index === 0}
              {...register(name)}
            />
            <label className={cx('label')} htmlFor={option.id}>
              {option.label}
            </label>
          </button>
        ))}
      </div>
    </div>
  );
};
