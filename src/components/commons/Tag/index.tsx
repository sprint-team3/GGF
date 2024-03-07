import classNames from 'classnames/bind';

import styles from './Tag.module.scss';

const cx = classNames.bind(styles);

type TagProps = {
  price: number;
};

const Tag = ({ price }: TagProps) => {
  const recruitmentType = price === 0 ? 'offline' : 'online';

  return <div className={cx(`tag-${recruitmentType}`)}>{recruitmentType}</div>;
};

export default Tag;
