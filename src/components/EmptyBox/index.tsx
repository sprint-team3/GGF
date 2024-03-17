import Image from 'next/image';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './EmptyBox.module.scss';

const cx = classNames.bind(styles);

type EmptyBoxProps = {
  text: string;
};

const EmptyBox = ({ text }: EmptyBoxProps) => {
  const { url, alt } = SVGS.empty;
  return (
    <div className={cx('empty-box')}>
      <Image src={url} alt={alt} width={32} height={32} />
      <div>{text}</div>
    </div>
  );
};

export default EmptyBox;
