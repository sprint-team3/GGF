import Image from 'next/image';

import { useRef, useState } from 'react';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';

import ImageModal from '@/components/postDetail/ImageModal';
import { IMAGE_LIST } from '@/constants/mockData/imageList';
import useToggleButton from '@/hooks/useToggleButton';

import styles from './ImageSlide.module.scss';

const cx = classNames.bind(styles);

const { leftArrow, rightArrow } = SVGS.button;

type ImageSlideProps = {
  imageList?: string[];
};

const ImageSlide = ({ imageList = IMAGE_LIST }: ImageSlideProps) => {
  const { isVisible, handleToggleClick } = useToggleButton();
  const [selectedImageSrc, setSelectedImageSrc] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const handleClickPrev = () => {
    if (ref.current) {
      ref.current.scrollLeft += 945;
    }
  };

  const handleClickNext = () => {
    if (ref.current) {
      ref.current.scrollLeft += -945;
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageSrc(imageList[index]);
    handleToggleClick();
  };

  const handleCloseModal = () => handleToggleClick();

  return (
    <div className={cx('image-slide')}>
      <button className={cx('image-slide-right-btn', 'sm-hidden')} onClick={handleClickPrev}>
        <Image src={rightArrow.url} alt={rightArrow.alt} width={20} height={20} />
      </button>
      <button className={cx('image-slide-left-btn', 'sm-hidden')} onClick={handleClickNext}>
        <Image src={leftArrow.url} alt={leftArrow.alt} width={20} height={20} />
      </button>
      <div className={cx('image-slide-container')} ref={ref}>
        <div className={cx('image-slide-container-img-container')}>
          <div className={cx('image-slide-container-img-container-slider')}>
            {imageList.map((item, index) => (
              <button
                className={cx('image-slide-container-img-container-slider-btn')}
                key={`image-slide-${index}`}
                onClick={() => handleImageClick(index)}
              >
                <img className={cx('image')} src={item} alt={`${item}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <ImageModal imageSrc={selectedImageSrc} isOpen={isVisible} onClose={handleCloseModal} />
    </div>
  );
};

export default ImageSlide;
