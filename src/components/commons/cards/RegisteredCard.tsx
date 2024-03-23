import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';
import { getFormatDate } from '@/utils';

import Kebabmenu from '@/components/commons/Kebabmenu';
import { ConfirmModal } from '@/components/commons/modals';
import { ModalButton } from '@/components/commons/modals/ModalButton';
import Tag from '@/components/commons/Tag';
import useToggleButton from '@/hooks/useToggleButton';

import { GameNameKR, PostTypesEN } from '@/types';

import styles from './CardCommonStyle.module.scss';

const cx = classNames.bind(styles);
const { location, calendar } = SVGS;

export type RegisteredCardProps = {
  path: string;
  postType: PostTypesEN;
  title: string;
  address: string;
  category: GameNameKR;
  createdAt: string;
};

export const RegisteredCard = ({ path, postType, title, address, category, createdAt }: RegisteredCardProps) => {
  const { isVisible, handleToggleClick } = useToggleButton();
  const isOffline = postType === 'offline';

  const handleSelectMenuClick = (value: string) => {
    if (value === '삭제') {
      handleToggleClick();
    } else {
      window.location.href = '/minecraft';
    }
  };

  const handleRemoveCard = () => {
    handleToggleClick();
  };

  return (
    <>
      <article className={cx('card')}>
        <Link href={path} className={cx('card-inner')}>
          <div className={cx('card-content')}>
            <header className={cx('card-content-header')}>
              <div className={cx('card-content-header-category')}>
                <Tag postType={postType} />
                <span className={cx('card-content-header-category-game')}>{category}</span>
              </div>
              <div className={cx('card-content-header-kebab')}>
                <Kebabmenu onClick={handleSelectMenuClick} />
              </div>
            </header>
            <h2 className={cx('card-content-register-title')}>{title}</h2>
          </div>
          <footer className={cx('card-footer')}>
            {isOffline && (
              <div className={cx('card-content-location')}>
                <Image src={location.default.url} alt={location.default.alt} width={18} height={18} />
                <span className={cx('card-content-location-address')}>{address}</span>
              </div>
            )}
            <div className={cx('card-footer-calendar')}>
              <Image src={calendar.default.url} alt={calendar.default.alt} width={20} height={20} />
              <span className={cx('card-footer-calendar-date')}>{getFormatDate(createdAt)}</span>
            </div>
          </footer>
        </Link>
      </article>

      <ConfirmModal
        warning
        openModal={isVisible}
        onClose={handleToggleClick}
        state='STOP'
        title='등록한 모집을 삭제하시겠습니까?'
        desc='한 번 삭제한 게시물은 되돌릴 수 없습니다'
        renderButton={
          <>
            <ModalButton variant='warning' onClick={handleRemoveCard}>
              모집 삭제
            </ModalButton>
            <ModalButton onClick={handleToggleClick}>닫기</ModalButton>
          </>
        }
      ></ConfirmModal>
    </>
  );
};
