import Image from 'next/image';

import { useCallback, useState } from 'react';

import classNames from 'classnames/bind';
import { FileRejection, useDropzone } from 'react-dropzone';

import { SVGS } from '@/constants';
import { bytesToKilobytes } from '@/utils';

import { ConfirmModal, ModalButton } from '../modals';

import useMultiState from '@/hooks/useMultiState';
import useToggleButton from '@/hooks/useToggleButton';

import styles from './ImageField.module.scss';

const cx = classNames.bind(styles);

const { url: deafultUrl, alt: defaultAlt } = SVGS.upload.default;
const { url: activeUrl, alt: activeAlt } = SVGS.upload.active;
const { url: fileUrl, alt: fileAlt } = SVGS.upload.file;
const { url: closeUrl, alt: closeAlt } = SVGS.close.default;

const FIFTY_MB = 1024 * 1024 * 50;

type ImageFiledProps = {
  onFilesUpdate: (updatedFiles: File[]) => void;
};

export const ImageField = ({ onFilesUpdate }: ImageFiledProps) => {
  const { isVisible, handleToggleClick } = useToggleButton();
  const { multiState, toggleClick } = useMultiState(['fileExceededModal']);
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (uploadedFiles: File[]) => {
      setFiles(uploadedFiles);
      onFilesUpdate(uploadedFiles);
    },
    [onFilesUpdate],
  );

  const onDropRejected = useCallback(
    (rejectedFiles: FileRejection[]) => {
      if (!rejectedFiles) return;
      toggleClick('fileExceededModal');
    },
    [toggleClick],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 5,
    maxSize: FIFTY_MB,
  });

  const handleDelete = (fileIndex: string) => {
    const updatedFiles = files.filter((_, index) => index !== Number(fileIndex));
    setFiles(updatedFiles);
  };

  return (
    <>
      <div className={cx('image-field')}>
        <button
          className={cx('image-field-group')}
          onMouseEnter={handleToggleClick}
          onMouseLeave={handleToggleClick}
          {...getRootProps()}
        >
          <input className={cx('image-field-group-input')} {...getInputProps()} />
          <div className={cx('image-field-group-icon')}>
            <Image
              src={isVisible ? activeUrl : deafultUrl}
              alt={isVisible ? activeAlt : defaultAlt}
              width={32}
              height={32}
            />
          </div>
          <p className={cx('image-field-group-title', { active: isVisible })}>Drag files to upload</p>
        </button>

        <ul className={cx('image-field-name-list')}>
          {files.map((item, index) => (
            <li className={cx('image-field-name-list-item')} key={`filename-${index}`}>
              <div className={cx('item-group')}>
                <div className={cx('image-group')}>
                  <div className={cx('file-upload-image')}>
                    <Image src={fileUrl} alt={fileAlt} width={16} height={16} />
                  </div>
                  <span className={cx('file-name')}>{item.name}</span>
                </div>
                <span className={cx('file-size')}>{bytesToKilobytes(item.size)}KB</span>
              </div>
              <button
                className={cx('delete-button')}
                onClick={(event) => handleDelete(event.currentTarget.value)}
                value={index}
              >
                <Image src={closeUrl} alt={closeAlt} width={16} height={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ConfirmModal
        openModal={multiState.fileExceededModal}
        onClose={() => toggleClick('fileExceededModal')}
        title='파일 초과'
        state='ALERT'
        desc='이미지는 5장까지 업로드할 수 있습니다'
        warning
      >
        <ModalButton variant='warning' onClick={() => toggleClick('fileExceededModal')}>
          확인
        </ModalButton>
      </ConfirmModal>
    </>
  );
};
