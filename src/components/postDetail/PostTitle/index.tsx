import classNames from 'classnames/bind';

import { formatPriceToPostType } from '@/utils';

import Tag from '@/components/commons/Tag';

import styles from './PostTitle.module.scss';

const cx = classNames.bind(styles);

type PostTitleProps = {
  price: number;
  title: string;
};

const PostTitle = ({ price = 0, title }: PostTitleProps) => {
  return (
    <div className={cx('post-title')}>
      <Tag postType={formatPriceToPostType(price)} />
      <span className={cx('title')}>{title}</span>
    </div>
  );
};

export default PostTitle;
