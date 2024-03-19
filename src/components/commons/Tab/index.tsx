import { Dispatch, SetStateAction } from 'react';

import classNames from 'classnames/bind';

import styles from './Tab.module.scss';

const cx = classNames.bind(styles);

type TabItem = {
  id: string;
  text: string;
  count?: number;
};

type TabProps = {
  items: TabItem[];
  size: 'small' | 'medium';
  selectedTabId: string;
  setSelectedTabId: Dispatch<SetStateAction<string>>;
};

const Tab = ({ items, size, selectedTabId, setSelectedTabId }: TabProps) => {
  const isActivated = (id: string) => id === selectedTabId;
  const hasCount = (item: TabItem) => item.count !== undefined;

  const handleClickTabItem = (clickedItemId: string) => {
    if (!isActivated(clickedItemId)) {
      setSelectedTabId(clickedItemId);
    }
  };

  return (
    <ul className={cx('tab')}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            className={cx(`tab-item-${size}`, { activated: isActivated(item.id) })}
            onClick={() => handleClickTabItem(item.id)}
          >
            <span>{item.text}</span>
            {hasCount(item) && <span className={cx('tab-item-count')}>{item.count}</span>}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tab;
