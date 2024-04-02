import Image from 'next/image';

import { ReactNode, MouseEventHandler, useState, useEffect } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import styles from './CommonModal.module.scss';

const cx = classNames.bind(styles);

const { url, alt } = SVGS.arrow.chevron;

type CustomCommonModalProps = {
  openModal: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  title: string;
  renderContent: ReactNode;
  isCalendar: boolean;
};

export const CustomCommonModal = ({ openModal, onClose, title, renderContent, isCalendar }: CustomCommonModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (openModal) {
      setIsOpen(true);
    }
  }, [openModal]);

  const handleAnimationEnd = () => {
    if (!openModal) {
      setIsOpen(false);
    }
  };

  return (
    isOpen && (
      <div className={cx('overlay', { calendar: isCalendar })}>
        <div className={cx('modal', 'calendar', { open: openModal })} onAnimationEnd={handleAnimationEnd}>
          <div className={cx('modal-inner')}>
            <header className={cx('modal-header')}>
              <div className={cx('lg-hidden')}>
                <nav className={cx('modal-mobile-nav')}>
                  <button onClick={onClose}>
                    <Image src={url} alt={alt} width={48} height={48} />
                  </button>
                </nav>
              </div>
              <h2 className={cx('modal-header-title')}>{title}</h2>
            </header>
            <div className={cx('modal-content')}>{renderContent}</div>
          </div>
        </div>
      </div>
    )
  );
};
