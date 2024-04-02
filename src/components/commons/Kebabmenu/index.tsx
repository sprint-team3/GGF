import { LegacyRef, MouseEvent, RefObject } from 'react';

import classNames from 'classnames/bind';

import { MoreButton } from '@/components/commons/buttons';
import useTogglePopup from '@/hooks/useTogglePopup';

import styles from './Kebabmenu.module.scss';

const cx = classNames.bind(styles);

type KebabmenuProps = {
  onClick: (action: string) => void;
};

type ButtonRef = RefObject<HTMLDivElement>;
type PopupRef = LegacyRef<HTMLUListElement> | undefined;

const Kebabmenu = ({ onClick }: KebabmenuProps) => {
  const { isOpen, popupRef, buttonRef, togglePopup } = useTogglePopup();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onClick(event.currentTarget.textContent ?? '');
  };

  return (
    <div className={cx('kebabmenu')}>
      <div className={cx('kebabmenu-more-btn')} ref={buttonRef as unknown as ButtonRef}>
        <MoreButton isActive={isOpen} onClick={togglePopup} />
      </div>
      {isOpen && (
        <ul className={cx('kebabmenu-dropdown-list')} ref={popupRef as unknown as PopupRef}>
          <li className={cx('kebabmenu-dropdown-list-item')}>
            <button className={cx('kebabmenu-dropdown-list-item-btn')} onClick={handleClick}>
              수정
            </button>
          </li>
          <li className={cx('kebabmenu-dropdown-list-item')}>
            <button className={cx('kebabmenu-dropdown-list-item-btn', 'delete')} onClick={handleClick}>
              삭제
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Kebabmenu;
