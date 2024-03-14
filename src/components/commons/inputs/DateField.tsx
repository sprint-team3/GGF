import Image from 'next/image';

import { useState } from 'react';

import classNames from 'classnames/bind';
import { format } from 'date-fns';
import { DayPicker, DateFormatter } from 'react-day-picker';
import { useFormContext } from 'react-hook-form';

import { SVGS } from '@/constants';

import useTogglePopup from '@/hooks/useTogglePopup';

import styles from './DateField.module.scss';
import dayPickerStyle from './DayPicker.module.scss';

const cx = classNames.bind(styles);

const { url, alt } = SVGS.calendar.active;

type DateFieldProps = {
  label: string;
  name: string;
};

export const DateField = ({ label, name }: DateFieldProps) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { isOpen, popupRef, buttonRef, togglePopup } = useTogglePopup();
  const formatWeekdayName: DateFormatter = (date, options) => format(date, 'EEE', { locale: options?.locale });

  const isError = !!errors[name]?.message;
  const [selected, setSelected] = useState<Date | undefined>();

  const formatDate = (originalDate: Date) => {
    return originalDate
      ?.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\s/g, '')
      .replace(/\.$/, '')
      .replace(/\./g, '-')
      .split('T')[0];
  };

  const formattedDate = selected ? formatDate(selected) : '';

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const disabledDays = [{ from: new Date(1990, 1, 20), to: yesterday }];

  const handleSelectDate = (date: Date | undefined) => {
    setSelected(date);
    if (date) {
      const formattedDateString = formatDate(date);
      setValue(name, formattedDateString);
    } else {
      setSelected(undefined);
      setValue(name, '');
    }
  };

  return (
    <div className={cx('datefield')}>
      <span className={cx('datefield-label')}>{label}</span>
      <button type='button' className={cx('datefield-group')} ref={buttonRef} onClick={togglePopup}>
        <input
          className={cx('datefield-group-input', { error: isError })}
          placeholder='YYYY-MM-DD'
          {...(register(name),
          {
            value: formattedDate || '',
            readOnly: true,
          })}
        />
        <div className={cx('datefield-group-calendar-icon')}>
          <Image src={url} alt={alt} width={24} height={24} />
        </div>
      </button>

      <div className={cx('datefield-day-picker', { opened: isOpen })} ref={popupRef}>
        <DayPicker
          classNames={dayPickerStyle}
          selected={selected}
          onSelect={handleSelectDate}
          mode='single'
          showOutsideDays
          weekStartsOn={1}
          disabled={disabledDays}
          formatters={{ formatWeekdayName }}
        />
      </div>
    </div>
  );
};
