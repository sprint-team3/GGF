import Image from 'next/image';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { MyReservations } from '@/apis/myReservations';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { SVGS, ERROR_MESSAGE, REGEX } from '@/constants';

import { BaseButton } from '@/components/commons/buttons';
import { TextField } from '@/components/commons/inputs';
import StarRating from '@/components/commons/StarRating';

import styles from './ReviewModalContent.module.scss';

const cx = classNames.bind(styles);

const { url, alt } = SVGS.calendar.default;
const { review, rating } = ERROR_MESSAGE;
const MIN_LENGTH_TEXTAREA = 5;

type ReviewModalContentProps = {
  reservationId: number;
  title: string;
  date: string;
  handleModalClose: (modalKey: string) => void;
};

const ReviewModalSchema = z.object({
  rating: z.number().min(1, { message: rating.min }),
  content: z
    .string()
    .refine((content) => content.replace(REGEX.textarea, '').length >= MIN_LENGTH_TEXTAREA, { message: review.min }),
});

const ReviewModalContent = ({ reservationId, title, date, handleModalClose }: ReviewModalContentProps) => {
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(ReviewModalSchema),
  });

  const { handleSubmit, setValue, watch } = methods;
  const selectedRating = watch('rating');
  const [currentRating, setCurrentRating] = useState(0);

  const queryClient = useQueryClient();
  const { mutate: createReviewMutation } = useMutation({
    mutationFn: MyReservations.createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myReservations.get });
    },
  });

  const handleCurrentRating = () => setCurrentRating(selectedRating);

  const handleStarClick = (rating: number) => {
    setValue('rating', rating);
    setCurrentRating(rating);
  };

  const handleReviewSubmit = (data: object) => {
    createReviewMutation({ reservationId: reservationId, value: data });
    handleModalClose('submitReviewModal');
  };

  return (
    <FormProvider {...methods}>
      <form className={cx('review-form')} onSubmit={handleSubmit(handleReviewSubmit)}>
        <header className={cx('review-form-header')}>
          <h2 className={cx('review-form-title')}>{title}</h2>
          <div className={cx('review-form-date')}>
            <Image src={url} alt={alt} width={20} height={20} />
            <span className={cx('review-form-date-text')}>{date}</span>
          </div>
        </header>

        <fieldset>
          <legend>별점 및 리뷰 등록</legend>
          <div className={cx('review-form-rating')}>
            <StarRating size='large' rating={selectedRating} onChange={handleStarClick} currentRating={currentRating} />
          </div>
          <div className={cx('review-form-content')}>
            <TextField name='content' maxLength={200} placeholder={review.placeholder} />
          </div>
        </fieldset>

        <footer className={cx('review-form-buttons')}>
          <BaseButton type='button' theme='outline' size='medium' onClick={() => handleModalClose('submitReviewModal')}>
            취소
          </BaseButton>
          <BaseButton type='submit' theme='fill' size='medium' onClick={handleCurrentRating}>
            등록
          </BaseButton>
        </footer>
      </form>
    </FormProvider>
  );
};

export default ReviewModalContent;
