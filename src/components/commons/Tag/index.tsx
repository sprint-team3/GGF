import classNames from 'classnames/bind';

import { formatRecruitTypeToKR } from '@/utils';

import { PostTypes } from '@/types';

import styles from './Tag.module.scss';

const cx = classNames.bind(styles);

type TagProps = {
  postType: PostTypes;
};

const Tag = ({ postType }: TagProps) => {
  return <div className={cx(`tag-${postType}`)}>{formatRecruitTypeToKR(postType)}</div>;
};

export default Tag;
