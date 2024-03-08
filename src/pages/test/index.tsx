import classNames from 'classnames/bind';

import { Alarm } from '@/components/commons/Alarm';
import { Avatar } from '@/components/commons/Avatar';
import { HeaderProfile } from '@/components/HeaderProfile';

import styles from './Test.module.scss';

const cx = classNames.bind(styles);

const Test = () => {
  return (
    <div className={cx('container')}>
      <Alarm />
      <HeaderProfile nickname='테스트' profileImageUrl='' />
      <Avatar size='small' profileImageUrl='' />
      <Avatar size='medium' profileImageUrl='' />
      <Avatar size='large' profileImageUrl='' />
    </div>
  );
};

export default Test;
