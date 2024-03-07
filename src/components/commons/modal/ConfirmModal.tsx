import { ReactNode } from 'react';

import classNames from 'classnames/bind';
import ReactModal from 'react-modal';

import styles from './ConfirmModal.module.scss';

const cx = classNames.bind(styles);

type ConfirmModalProps = {
  openModal: boolean;
  onClose: () => void;
  warning?: boolean;
  state: string;
  title: string;
  desc?: string;
  children: ReactNode;
};

const ConfirmModal = ({ openModal, onClose, state, title, desc, children, warning = false }: ConfirmModalProps) => {
  return (
    <>
      <ReactModal
        isOpen={openModal}
        onRequestClose={onClose}
        closeTimeoutMS={250}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        className={cx('modal', { warning: warning })}
        overlayClassName={cx('overlay')}
        bodyOpenClassName={cx('body-open')}
        contentLabel='modal-confirm'
      >
        <div className={cx('modal-inner')}>
          <header className={cx('modal-header')}>
            <h1 className={cx('modal-header-state')} data-text={state}>
              {state}
            </h1>
            <div className={cx('modal-rec-1')}></div>
            <div className={cx('modal-rec-2')}></div>
            <div className={cx('modal-rec-3')}></div>
            <div className={cx('modal-rec-4')}></div>
            <div className={cx('modal-rec-5')}></div>
          </header>
          <main className={cx('modal-info')}>
            <h2 className={cx('modal-info-title')}>{title}</h2>
            <p className={cx('modal-info-desc')}>{desc}</p>
          </main>
          <footer className={cx('modal-btn-area')}>{children}</footer>
        </div>
      </ReactModal>
    </>
  );
};

export default ConfirmModal;
