import Image from 'next/image';

import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import { SearchFilter } from '@/types';

import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

const { url, alt } = SVGS.search;

type SearchBarType = {
  placeholder: string;
  setState: Dispatch<SetStateAction<SearchFilter | undefined>>;
  maxLength?: number;
};

export const SearchBar = ({ placeholder, setState, maxLength = 20 }: SearchBarType) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ title: event.target.value });
  };

  return (
    <div className={cx('searchbar')}>
      <input
        className={cx('searchbar-input')}
        type='text'
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(event) => handleChange(event)}
      />
      <div className={cx('searchbar-search-icon')}>
        <Image src={url} alt={alt} width={16} height={16} />
      </div>
    </div>
  );
};
