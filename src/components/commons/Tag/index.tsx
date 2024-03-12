import classNames from 'classnames/bind';

import { formatRecruitTypeToKR } from '@/utils';

import { RecruitTypes } from '@/types';

import styles from './Tag.module.scss';

const cx = classNames.bind(styles);

type TagProps = {
  recruitType: RecruitTypes;
};

const Tag = ({ recruitType }: TagProps) => {
  return <div className={cx(`tag-${recruitType}`)}>{formatRecruitTypeToKR(recruitType)}</div>;
};

export default Tag;
