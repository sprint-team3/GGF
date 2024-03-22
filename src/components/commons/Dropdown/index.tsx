import Image from 'next/image';

import { useState } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import useTogglePopup from '@/hooks/useTogglePopup';

import styles from './Dropdown.module.scss';

const cx = classNames.bind(styles);

const { url: defaultUrl, alt: defaultAlt } = SVGS.arrow.down.default;
const { url: activeUrl, alt: activeAlt } = SVGS.arrow.down.active;

type DropdownProps = {
  options: { title: string; value: number | string }[];
  onChange: (value: number | string) => void;
  label?: string;
  isSmall?: boolean;
  isDisabled?: boolean;
  color?: 'purple' | 'yellow';
};

const Dropdown = ({
  options,
  onChange,
  label = '',
  isSmall = false,
  isDisabled = false,
  color = 'purple',
}: DropdownProps) => {
  const { isOpen, popupRef, buttonRef, togglePopup } = useTogglePopup();
  const [currentOptionTitle, setCurrentOptionTitle] = useState(options[0].title);

  const handleOptionChange = (title: string, value: number | string) => {
    onChange(value);
    setCurrentOptionTitle(title);
    togglePopup();
  };

  return (
    <div className={cx('dropdown')} ref={popupRef}>
      <span className={cx('label')}>{label}</span>
      <div className={cx('select-group')}>
        <div className={cx('select-group-input-group')}>
          <input
            className={cx('input', { sm: isSmall }, { opened: isOpen }, { yellow: color === 'yellow' })}
            type='text'
            value={currentOptionTitle}
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

        <div className={cx('select-group-list-group', { sm: isSmall }, { show: isOpen })}>
          {isOpen && (
            <ul className={cx('select-group-list-group-list')}>
              {options.map((option, index) => (
                <button
                  key={`dropdown-item-${index}`}
                  className={cx('select-group-list-group-list-btn', { sm: isSmall })}
                  onClick={() => handleOptionChange(option.title, option.value)}
                >
                  <li>
                    <label>{option.title}</label>
                  </li>
                </button>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
