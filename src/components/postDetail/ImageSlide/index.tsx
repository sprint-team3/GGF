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
const SCROLL_WIDTH = 950;

type ImageSlideProps = {
  imageList?: string[];
};

const ImageSlide = ({ imageList = IMAGE_LIST }: ImageSlideProps) => {
  const [selectedImageSrc, setSelectedImageSrc] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const { isVisible, handleToggleClick } = useToggleButton();

  const handleClickPrev = () => {
    if (ref.current) {
      ref.current.scrollLeft += SCROLL_WIDTH;
    }
  };

  const handleClickNext = () => {
    if (ref.current) {
      ref.current.scrollLeft += -SCROLL_WIDTH;
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageSrc(imageList[index]);
    handleToggleClick();
  };

  return (
    <div className={cx('image-slide')}>
      <button className={cx('image-slide-right-btn', 'sm-hidden')} onClick={handleClickPrev}>
        <Image src={rightArrow.url} alt={rightArrow.alt} width={20} height={20} />
      </button>
      <button className={cx('image-slide-left-btn', 'sm-hidden')} onClick={handleClickNext}>
        <Image src={leftArrow.url} alt={leftArrow.alt} width={20} height={20} />
      </button>
      <div className={cx('container')} ref={ref}>
        <div className={cx('container-slider')}>
          {imageList.map((item, index) => (
            <button
              className={cx('container-slider-banner')}
              key={`image-slide-${index}`}
              onClick={() => handleImageClick(index)}
            >
              <img className={cx('image')} src={item} alt={`배너 이미지-${index}`} />
            </button>
          ))}
        </div>
      </div>
      <ImageModal imageSrc={selectedImageSrc} isOpen={isVisible} onClose={handleToggleClick} />
    </div>
  );
};

export default ImageSlide;
