import { Dispatch, MouseEvent, SetStateAction } from 'react';

import classNames from 'classnames/bind';

import { MoreButton } from '@/components/commons/buttons';
import useToggleButton from '@/hooks/useToggleButton';

import styles from './Kebabmenu.module.scss';

const cx = classNames.bind(styles);

type KebabmenuProps = {
  setState: Dispatch<SetStateAction<string>>;
};

const Kebabmenu = ({ setState }: KebabmenuProps) => {
  const { isVisible, handleToggleClick } = useToggleButton();

  const handleSetState = (event: MouseEvent<HTMLButtonElement>) => {
    setState(event.currentTarget.textContent ?? '');
  };

  return (
    <div className={cx('kebabmenu')}>
      <div className={cx('kebabmenu-more-btn')}>
        <MoreButton isActive={isVisible} onClick={handleToggleClick} />
      </div>
      {isVisible && (
        <ul className={cx('kebabmenu-dropdown-list')}>
          <li className={cx('kebabmenu-dropdown-list-item')}>
            <button className={cx('kebabmenu-dropdown-list-item-btn')} onClick={(event) => handleSetState(event)}>
              수정
            </button>
          </li>
          <li className={cx('kebabmenu-dropdown-list-item')}>
            <button
              className={cx('kebabmenu-dropdown-list-item-btn', 'delete')}
              onClick={(event) => handleSetState(event)}
            >
              삭제
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Kebabmenu;
