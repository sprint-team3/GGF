import classNames from 'classnames/bind';

import styles from './Filter.module.scss';

const cx = classNames.bind(styles);

type FilterItem = {
  id: string;
  text: string;
};

type FilterProps = {
  items: FilterItem[];
  selectedFilterId: string;
  onChange: (selectedId: string) => void;
};

const Filter = ({ items, selectedFilterId, onChange }: FilterProps) => {
  const isActivated = (id: string) => id === selectedFilterId;

  const handleClickFilterItem = (clickedItemId: string) => {
    if (isActivated(clickedItemId)) return;

    onChange(clickedItemId);
  };

  return (
    <ul className={cx('filter')}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            className={cx('filter-item', { activated: isActivated(item.id) })}
            onClick={() => handleClickFilterItem(item.id)}
          >
            <span>{item.text}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Filter;
