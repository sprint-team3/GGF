import classNames from 'classnames/bind';

import { Alram } from '@/components/commons/Alram';
import { Avatar } from '@/components/commons/Avatar';
import { HeaderProfile } from '@/components/HeaderProfile';

import styles from './Test.module.scss';

const cx = classNames.bind(styles);

const Test = () => {
  return (
    <div className={cx('container')}>
      <Alram />
      <HeaderProfile />
      <Avatar size='small' profileImageUrl='' />
      <Avatar size='middle' profileImageUrl='' />
      <Avatar size='large' profileImageUrl='' />
    </div>
  );
};

export default Test;
