import Image from 'next/image';
import Link from 'next/link';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { deleteMyActivities } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { SVGS } from '@/constants';
import { getFormatDate, redirectToPage } from '@/utils';

import Kebabmenu from '@/components/commons/Kebabmenu';
import { ConfirmModal } from '@/components/commons/modals';
import { ModalButton } from '@/components/commons/modals/ModalButton';
import Tag from '@/components/commons/Tag';
import useMultiState from '@/hooks/useMultiState';

import { GameNameKR, PostTypesEN } from '@/types';

import styles from './CardCommonStyle.module.scss';

const cx = classNames.bind(styles);
const { location, calendar } = SVGS;

export type RegisteredCardProps = {
  postId: number;
  path: string;
  editPath: string;
  postType: PostTypesEN;
  title: string;
  address: string;
  category: GameNameKR;
  createdAt: string;
};

export const RegisteredCard = ({
  postId,
  path,
  editPath,
  postType,
  title,
  address,
  category,
  createdAt,
}: RegisteredCardProps) => {
  const { multiState, toggleClick } = useMultiState(['warningModal', 'errorModal']);
  const isOffline = postType === 'offline';

  const queryClient = useQueryClient();
  const { mutate: deleteActivityMutation } = useMutation({
    mutationFn: deleteMyActivities,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myActivities.getList });
    },
    onError: () => toggleClick('errorModal'),
  });

  const handleSelectMenuClick = (value: string) => {
    if (value === '삭제') {
      toggleClick('warningModal');
    } else {
      redirectToPage(editPath);
    }
  };

  const handleRemoveCard = () => {
    deleteActivityMutation(postId);
    toggleClick('warningModal');
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
        openModal={multiState.warningModal}
        onClose={() => toggleClick('warningModal')}
        state='STOP'
        title='등록한 모집을 삭제하시겠습니까?'
        desc='한 번 삭제한 게시물은 되돌릴 수 없습니다'
        renderButton={
          <>
            <ModalButton variant='warning' onClick={handleRemoveCard}>
              모집 삭제
            </ModalButton>
            <ModalButton onClick={() => toggleClick('warningModal')}>닫기</ModalButton>
          </>
        }
      ></ConfirmModal>
      <ConfirmModal
        warning
        openModal={multiState.errorModal}
        onClose={() => toggleClick('errorModal')}
        state='ERROR'
        title='신청 예약이 있는 체험은 삭제할 수 없습니다.'
        renderButton={<ModalButton onClick={() => toggleClick('errorModal')}>닫기</ModalButton>}
      ></ConfirmModal>
    </>
  );
};
