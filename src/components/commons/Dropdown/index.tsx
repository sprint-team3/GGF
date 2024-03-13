/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';

import React, { useState } from 'react';

import classNames from 'classnames/bind';
import { useFormContext } from 'react-hook-form';

import { SVGS } from '@/constants';

import useTogglePopup from '@/hooks/useTogglePopup';

import styles from './Dropdown.module.scss';

const cx = classNames.bind(styles);

const { url: defaultUrl, alt: defaultAlt } = SVGS.arrow.down.default;
const { url: activeUrl, alt: activeAlt } = SVGS.arrow.down.active;

type DropdownProps = {
  name: string;
  options: (number | string)[] | { id: number; title: string }[];
  label?: string;
  isSmall?: boolean;
  isDisabled?: boolean;
  setState?: (value: number) => void;
};

const Dropdown = ({
  name,
  label = '',
  options,
  isSmall = false,
  isDisabled = false,
  setState = undefined,
}: DropdownProps) => {
  const { register, setValue } = useFormContext();
  const { isOpen, popupRef, buttonRef, togglePopup } = useTogglePopup();
  const [currentOption, setCurrentOption] = useState(typeof options[0] === 'object' ? options[0].title : options[0]);

  const handleOptionChange = (value: number | string, title: string) => {
    if (setState && typeof value == 'number') {
      setState(value);
    }
    setValue(name, value);
    setCurrentOption(title || value);
    togglePopup();
  };

  return (
    <div className={cx('dropdown')} ref={popupRef}>
      <span className={cx('label')}>{label}</span>
      <div className={cx('select-group')}>
        <select
          className={cx('select-group-select')}
          {...register(name, {
            value: typeof options[0] === 'object' ? options[0].id : options[0],
          })}
        >
          {options.map((option, index) => (
            <option key={`dropdown-${index}`} value={typeof option === 'object' ? option.id : option}>
              {typeof option === 'object' ? option.id : option}
            </option>
          ))}
        </select>
        <div className={cx('select-group-input-group')}>
          <input
            className={cx('input', { sm: isSmall }, { opened: isOpen })}
            type='text'
            value={currentOption}
            disabled={isDisabled}
            onClick={togglePopup}
            readOnly
          />
          <button
            className={cx('arrow-btn', { rotate: isOpen })}
            ref={buttonRef}
            type='button'
            disabled={isDisabled}
            onClick={togglePopup}
          >
            {isOpen ? (
              <Image src={activeUrl} alt={activeAlt} width={24} height={24} />
            ) : (
              <Image src={defaultUrl} alt={defaultAlt} width={24} height={24} />
            )}
          </button>
        </div>
        {isOpen && (
          <ul className={cx('select-group-list', { sm: isSmall }, { show: isOpen })}>
            {options.map((option, index) => (
              <li
                className={cx('select-group-list-item', { sm: isSmall })}
                key={index}
                onClick={() =>
                  handleOptionChange(
                    typeof option === 'object' ? option.id : option,
                    typeof option === 'object' ? option.title : typeof option === 'string' ? option : '',
                  )
                }
              >
                <label>{typeof option === 'object' ? option.title : option}</label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
