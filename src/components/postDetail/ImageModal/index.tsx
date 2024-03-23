import { MouseEventHandler } from 'react';

import classNames from 'classnames/bind';
import ReactModal from 'react-modal';

import styles from './ImageModal.module.scss';

const cx = classNames.bind(styles);

type ImageModalProps = {
  isOpen: boolean;
  imageSrc: string;
  onClose: MouseEventHandler<HTMLButtonElement>;
};

const ImageModal = ({ isOpen, imageSrc, onClose }: ImageModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc={true}
      className={cx('image-modal')}
      overlayClassName={cx('overlay')}
      contentLabel='image-modal'
    >
      <div className={cx('image-modal-img')}>
        <img className={cx('image-modal-img-item')} src={imageSrc} alt='이미지 확대' />
      </div>
    </ReactModal>
  );
};

export default ImageModal;
