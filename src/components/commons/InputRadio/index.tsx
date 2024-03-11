import { useEffect, useRef } from 'react';

import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';

import { RecruitTypes } from '@/constants';

import styles from './InputRadio.module.scss';

const cx = classNames.bind(styles);

type InputRadioProps = {
  legend: string;
  name: string;
};

const InputRadio = ({ legend, name }: InputRadioProps) => {
  const { register } = useFormContext();

  const firstInputRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.click();
    }
  }, []);

  return (
    <fieldset className={cx('input-radio')}>
      <legend className={cx('input-radio-legend')}>{legend}</legend>
      {RecruitTypes.map((option, index) => (
        <div className={cx('input-radio-option-container')} key={option.id}>
          <input className={cx('radio')} type='radio' id={option.id} value={option.value} {...register(name)} />
          <label className={cx('label')} htmlFor={option.id} ref={index === 0 ? firstInputRef : null}>
            {option.label}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default InputRadio;
