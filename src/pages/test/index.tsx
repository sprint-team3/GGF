import classNames from 'classnames/bind';

import { Alram } from '@/components/commons/Alram';
import { Avatar } from '@/components/commons/Avatar';
import { HeaderProfile } from '@/components/commons/HeaderProfile';

import styles from './Test.module.scss';

const cx = classNames.bind(styles);

const Test = () => {
  return (
    <div className={cx('container')}>
      <Alram />
      <HeaderProfile />
      <Avatar type='header' profileImageUrl='' />
      <Avatar type='review' profileImageUrl='' />
      <Avatar type='popup' profileImageUrl='' />
    </div>
  );
};

export default Test;
