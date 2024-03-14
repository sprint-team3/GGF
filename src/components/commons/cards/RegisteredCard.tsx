import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames/bind';

import { SVGS } from '@/constants';
import { getFormatDate } from '@/utils';

import Kebabmenu from '@/components/commons/Kebabmenu';
import { ConfirmModal } from '@/components/commons/modals';
import { ModalButton } from '@/components/commons/modals/ModalButton';
import Tag from '@/components/commons/Tag';
import useMultiState from '@/hooks/useMultiState';

import { GameCategory, PostTypes } from '@/types';

import styles from './CardCommonStyle.module.scss';

const cx = classNames.bind(styles);
const { location, calendar } = SVGS;

export type RegisteredCardProps = {
  path: string;
  postType: PostTypes;
  title: string;
  address?: string;
  category: GameCategory;
  createdAt: string;
};

const RegisteredCard = ({ path, postType, title, address, category, createdAt }: RegisteredCardProps) => {
  const { multiState, toggleClick } = useMultiState(['cancelReservationModal']);
  const isOffline = postType === 'offline';

  const handleCommonModal = (modalKey: string) => {
    toggleClick(modalKey);
  };

  const handleSelectMenuClick = (value: string) => {
    if (value === '삭제') {
      handleCommonModal('cancelReservationModal');
    } else {
      window.location.href = '/minecraft';
    }
  };

  return (
    <>
      <article className={cx('card')}>
        <Link href={path} className={cx('card-inner')}>
          <main className={cx('card-content')}>
            <header className={cx('card-content-header')}>
              <div className={cx('card-content-header-category')}>
                <Tag postType={postType} />
                <span className={cx('card-content-header-category-game')}>{category}</span>
              </div>
              <div className={cx('card-content-header-kebab')}>
                <Kebabmenu onClick={handleSelectMenuClick} />
              </div>
            </header>
            <h1 className={cx('card-content-title')}>{title}</h1>
            {isOffline && (
              <div className={cx('card-content-location')}>
                <Image src={location.default.url} alt={location.default.alt} width={18} height={18} />
                <span className={cx('card-content-location-address')}>{address}</span>
              </div>
            )}
          </main>
          <footer className={cx('card-footer')}>
            <div className={cx('card-footer-calendar')}>
              <Image src={calendar.default.url} alt={calendar.default.alt} width={20} height={20} />
              <span className={cx('card-footer-calendar-date')}>{getFormatDate(createdAt)}</span>
            </div>
          </footer>
        </Link>
      </article>

      <ConfirmModal
        warning
        openModal={multiState.cancelReservationModal}
        onClose={() => handleCommonModal('cancelReservationModal')}
        state='STOP'
        title='예약을 취소하시겠습니까?'
        desc='한 번 취소한 예약은 되돌릴 수 없습니다'
      >
        <ModalButton variant='warning' onClick={() => handleCommonModal('cancelReservationModal')}>
          예약 취소
        </ModalButton>
        <ModalButton onClick={() => handleCommonModal('cancelReservationModal')}>닫기</ModalButton>
      </ConfirmModal>
    </>
  );
};

export default RegisteredCard;
