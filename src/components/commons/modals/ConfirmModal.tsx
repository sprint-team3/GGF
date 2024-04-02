import { ReactNode, MouseEventHandler } from 'react';

import classNames from 'classnames/bind';
import ReactModal from 'react-modal';

import styles from './ConfirmModal.module.scss';

const cx = classNames.bind(styles);

type ConfirmModalProps = {
  openModal: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  warning?: boolean;
  state: string;
  title: string;
  desc?: string;
  renderButton: ReactNode;
};

export const ConfirmModal = ({
  openModal,
  onClose,
  state,
  title,
  desc,
  renderButton,
  warning = false,
}: ConfirmModalProps) => {
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
            <h2 className={cx('modal-header-state')} data-text={state}>
              {state}
            </h2>
            <div className={cx('modal-rec-1')}></div>
            <div className={cx('modal-rec-2')}></div>
            <div className={cx('modal-rec-3')}></div>
            <div className={cx('modal-rec-4')}></div>
            <div className={cx('modal-rec-5')}></div>
          </header>
          <div className={cx('modal-info')}>
            <h3 className={cx('modal-info-title')}>{title}</h3>
            <span className={cx('modal-info-desc')}>{desc}</span>
          </div>
          <footer className={cx('modal-btn-area')}>{renderButton}</footer>
        </div>
      </ReactModal>
    </>
  );
};
