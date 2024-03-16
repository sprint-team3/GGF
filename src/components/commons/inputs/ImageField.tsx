import Image from 'next/image';

import { useCallback, useState } from 'react';

import classNames from 'classnames/bind';
import { FileRejection, useDropzone } from 'react-dropzone';

import { SVGS } from '@/constants';
import { bytesToKilobytes } from '@/utils';

import { ConfirmModal, ModalButton } from '../modals';

import useMultiState from '@/hooks/useMultiState';

import styles from './ImageField.module.scss';

const cx = classNames.bind(styles);

const { url: deafultUrl, alt: defaultAlt } = SVGS.upload.default;
const { url: activeUrl, alt: activeAlt } = SVGS.upload.active;
const { url: fileUrl, alt: fileAlt } = SVGS.upload.file;
const { url: closeDefaultUrl, alt: closeDefaultAlt } = SVGS.close.default;
const { url: closeActiveUrl, alt: closeActiveAlt } = SVGS.close.active;

const FIFTY_MB = 1024 * 1024 * 50;
const MAX_FILES = 5;

type ImageFiledProps = {
  onFilesUpdate: (updatedFiles: File[]) => void;
};

export const ImageField = ({ onFilesUpdate }: ImageFiledProps) => {
  const { multiState, toggleClick } = useMultiState(['fileExceededModal']);
  const [files, setFiles] = useState<{ file: File; isCloseActive: boolean }[]>([]);

  const onDrop = useCallback(
    (uploadedFiles: File[]) => {
      const newFiles = uploadedFiles.map((file) => ({ file, isCloseActive: false }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
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
    maxFiles: MAX_FILES,
    maxSize: FIFTY_MB,
  });

  const handleDelete = (fileIndex: string) => {
    const updatedFiles = files.filter((_, index) => index !== Number(fileIndex));
    setFiles(updatedFiles);
  };

  const handleMouseHover = (buttonIndex: number) => {
    setFiles((prevFiles) =>
      prevFiles.map((item, index) => (index === buttonIndex ? { ...item, isCloseActive: !item.isCloseActive } : item)),
    );
  };

  return (
    <>
      <div className={cx('image-field')}>
        <button
          className={cx('image-field-group')}
          onMouseEnter={() => toggleClick('isUploadActive')}
          onMouseLeave={() => toggleClick('isUploadActive')}
          {...getRootProps()}
        >
          <input className={cx('image-field-group-input')} {...getInputProps()} />
          <div className={cx('image-field-group-icon')}>
            <Image
              src={multiState.isUploadActive ? activeUrl : deafultUrl}
              alt={multiState.isUploadActive ? activeAlt : defaultAlt}
              width={32}
              height={32}
            />
          </div>
          <p className={cx('image-field-group-title', { active: multiState.isUploadActive })}>Drag files to upload</p>
        </button>

        <ul className={cx('image-field-name-list')}>
          {files.map((item, index) => (
            <li className={cx('image-field-name-list-item')} key={`filename-${index}`}>
              <div className={cx('item-group')}>
                <div className={cx('image-group')}>
                  <div className={cx('file-upload-image')}>
                    <Image src={fileUrl} alt={fileAlt} width={16} height={16} />
                  </div>
                  <span>{item?.file?.name}</span>
                </div>
                <span className={cx('file-size')}>{bytesToKilobytes(item?.file?.size)}KB</span>
              </div>
              <button
                value={index}
                onClick={(event) => handleDelete(event.currentTarget.value)}
                onMouseEnter={() => handleMouseHover(index)}
                onMouseLeave={() => handleMouseHover(index)}
              >
                <Image
                  src={item.isCloseActive ? closeActiveUrl : closeDefaultUrl}
                  alt={item.isCloseActive ? closeActiveAlt : closeDefaultAlt}
                  width={16}
                  height={16}
                />
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
