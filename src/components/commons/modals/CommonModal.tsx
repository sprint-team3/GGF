import Image from 'next/image';

import { ReactNode, MouseEventHandler } from 'react';

import classNames from 'classnames/bind';
import ReactModal from 'react-modal';

import { SVGS } from '@/constants';

import styles from './CommonModal.module.scss';

const cx = classNames.bind(styles);

const { url, alt } = SVGS.arrow.chevron;

type CommonModalProps = {
  openModal: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  title: string;
  renderContent: ReactNode;
  isResponsive?: boolean;
};

export const CommonModal = ({ openModal, onClose, title, renderContent, isResponsive }: CommonModalProps) => {
  return (
    <ReactModal
      isOpen={openModal}
      onRequestClose={onClose}
      closeTimeoutMS={250}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      className={cx('modal', { responsive: isResponsive })}
      overlayClassName={cx('overlay')}
      bodyOpenClassName={cx('body-open')}
      contentLabel='modal-common'
    >
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
    </ReactModal>
  );
};
