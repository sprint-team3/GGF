import Image from 'next/image';

import { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { FileRejection, useDropzone } from 'react-dropzone';

import { SVGS } from '@/constants';
import { bytesToKilobytes } from '@/utils';

import { ConfirmModal, ModalButton } from '@/components/commons/modals';
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
  label: string;
  onFilesUpdate: (updatedFiles: File[]) => void;
};

export const ImageField = ({ label, onFilesUpdate }: ImageFiledProps) => {
  const [files, setFiles] = useState<{ file: File; isCloseActive: boolean }[]>([]);
  const [finalFiles, setFinalFiles] = useState<File[]>([]);

  const { multiState, toggleClick } = useMultiState(['fileExceededModal', 'isUploadActive']);

  const onDrop = useCallback((uploadedFiles: File[]) => {
    const newFiles = uploadedFiles.map((file) => ({ file, isCloseActive: false }));
    setFiles([...newFiles]);
    setFinalFiles(uploadedFiles);
  }, []);

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

  useEffect(() => {
    onFilesUpdate(finalFiles);
  }, [finalFiles]);

  const handleDelete = (fileIndex: string) => {
    const updatedFiles = files.filter((_, index) => index !== Number(fileIndex));
    const filteredFiles = finalFiles.filter((_, index) => index !== Number(fileIndex));
    setFiles(updatedFiles);
    setFinalFiles(filteredFiles);
  };

  const handleMouseEvent = () => toggleClick('isUploadActive');

  const handleMouseEnter = (buttonIndex: number) =>
    setFiles((prevFiles) =>
      prevFiles.map((item, index) => (index === buttonIndex ? { ...item, isCloseActive: true } : item)),
    );

  const handleMouseLeave = (buttonIndex: number) =>
    setFiles((prevFiles) =>
      prevFiles.map((item, index) => (index === buttonIndex ? { ...item, isCloseActive: false } : item)),
    );

  const handleClickModal = () => toggleClick('fileExceededModal');

  return (
    <div className={cx('image-field')}>
      <span className={cx('image-field-label')}>{label}</span>
      <div className={cx('image-field-container')}>
        <button
          className={cx('image-field-container-group')}
          onMouseEnter={handleMouseEvent}
          onMouseLeave={handleMouseEvent}
          {...getRootProps()}
        >
          <input className={cx('image-field-container-group-input')} {...getInputProps()} />
          <div className={cx('image-field-container-group-icon')}>
            <Image
              src={multiState.isUploadActive ? activeUrl : deafultUrl}
              alt={multiState.isUploadActive ? activeAlt : defaultAlt}
              width={32}
              height={32}
            />
          </div>
          <p className={cx('image-field-container-group-title', { active: multiState.isUploadActive })}>
            Drag files to upload
          </p>
        </button>

        <ul className={cx('image-field-container-name-list')}>
          {files.map((item, index) => (
            <li className={cx('image-field-container-name-list-item')} key={`filename-${index}`}>
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
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
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
        onClose={handleClickModal}
        title='파일 초과'
        state='ALERT'
        desc='이미지는 5개까지 업로드할 수 있습니다'
        warning
        renderButton={
          <ModalButton variant='warning' onClick={handleClickModal}>
            확인
          </ModalButton>
        }
      />
    </div>
  );
};
