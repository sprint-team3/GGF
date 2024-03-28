import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames/bind';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { FormProvider, useForm } from 'react-hook-form';

import {
  ADDRESS_CUSTOM_THEME,
  ADDRESS_POPUP_SIZE,
  DEFAULT_API_DATA,
  PRICE_RADIO_LIST,
  PostSchema,
  SCRIPT_URL,
  VALID_IMAGE_URL,
  recruitmentTypes,
} from '@/constants';
import { convertTimeStringToNumber, createHeadcountOptions, joinTitleByDelimiter, navigateBack } from '@/utils';

import { BaseButton } from '@/components/commons/buttons';
import { ImageField, InputField, InputRadio, PostFormDropdown, TextField } from '@/components/commons/inputs';
import { ConfirmModal, ModalButton } from '@/components/commons/modals';
import Schedule from '@/components/createPage/Schedule';
import SelectedSchedule from '@/components/createPage/SelectedSchedule';
import useToggleButton from '@/hooks/useToggleButton';

import styles from './PostForm.module.scss';

const cx = classNames.bind(styles);

type PostFormProps = {
  type: '등록' | '수정';
  category: '스포츠' | '투어' | '관광' | '웰빙';
};

const PostForm = ({ type, category }: PostFormProps) => {
  // 모집 유형 관련
  const [price, setPrice] = useState(0);

  const handlePriceClick = (value: number) => {
    setPrice(value);
  };

  // 리액트 훅 폼 관련
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(PostSchema[price]),
  });

  const { handleSubmit, setValue, getValues, watch } = methods;

  //등록 모달 관련
  const { isVisible, handleToggleClick } = useToggleButton();

  // 참여 인원 관련
  const HEADCOUNT_OPTIONS = {
    ['스포츠']: createHeadcountOptions(1, 4),
    ['투어']: createHeadcountOptions(1, 3),
    ['관광']: createHeadcountOptions(1, 9),
    ['웰빙']: createHeadcountOptions(1, 10),
  };

  // 주소 관련
  const openAddressPopup = useDaumPostcodePopup(SCRIPT_URL);

  const handleComplete = (data: { address: string }) => {
    setValue('address', data.address);
  };

  const handleAddressButtonClick = () => {
    openAddressPopup({
      onComplete: handleComplete,
      left: window.screen.width / 2 - ADDRESS_POPUP_SIZE.width / 2,
      top: window.screen.height / 2 - ADDRESS_POPUP_SIZE.height / 2,
      theme: ADDRESS_CUSTOM_THEME,
    });
  };

  // 스케줄 관련
  const [scheduleArray, setScheduleArray] = useState<{ date: string; startTime: string; endTime: string }[]>([]);
  const [isScheduleSelected, setIsScheduleSelected] = useState(false);
  const selectedScheduleArray = getValues(['date', 'startTime', 'endTime']);
  const watchDateField = watch('date');
  const watchStartTimeField = watch('startTime');
  const watchEndTimeField = watch('endTime');

  useEffect(() => {
    const convertedStartTime = convertTimeStringToNumber(watchStartTimeField);
    const convertedEndTime = convertTimeStringToNumber(watchEndTimeField);
    if (convertedStartTime !== undefined && convertedEndTime !== undefined) {
      setIsScheduleSelected(watchDateField && convertedStartTime < convertedEndTime);
    }
  }, [watchDateField, watchStartTimeField, watchEndTimeField]);

  const handleAddSchedules = () => {
    const newSchedule = {
      date: selectedScheduleArray[0],
      startTime: selectedScheduleArray[1],
      endTime: selectedScheduleArray[2],
    };

    const isDuplicatedSchedule = scheduleArray.some(
      (schedule) =>
        schedule.date === newSchedule.date &&
        schedule.startTime === newSchedule.startTime &&
        schedule.endTime === newSchedule.endTime,
    );

    if (!isDuplicatedSchedule && scheduleArray.length < 5) {
      setScheduleArray([...scheduleArray, newSchedule]);
    }
  };

  const handleRemoveSchedules = (index: number) => {
    const newScheduleArray = [...scheduleArray];
    newScheduleArray.splice(index, 1);
    setScheduleArray(newScheduleArray);
  };

  // 이미지 관련
  const imageArray: string[] = [];

  const handleFilesAdd = (uploadedFiles: File[]) => {
    const newImageArray: string[] = [];
    uploadedFiles.forEach((file) => {
      newImageArray.push(VALID_IMAGE_URL.usual + file.name);
    });

    imageArray.length = 0;
    imageArray.push(...newImageArray);
  };

  // 등록 버튼 클릭 후 데이터 가공 관련
  const handleEditFormData = () => {
    const { title, price, address, headcount, description, discord } = getValues();
    const newBannerImageUrl =
      imageArray.length === 0 ? VALID_IMAGE_URL.unusual + DEFAULT_API_DATA.bannerImageUrl : imageArray[0];
    const newAddress = address === '' ? DEFAULT_API_DATA.address : address;
    const titleArray = [category, title, price, newAddress, headcount];
    const descriptionArray = [description, discord];
    const editedTitle = joinTitleByDelimiter(titleArray);
    const editedDescription = joinTitleByDelimiter(descriptionArray);

    const editedRequestBody = {
      title: editedTitle,
      category,
      description: editedDescription,
      address: newAddress,
      price: Number(price),
      schedules: scheduleArray,
      bannerImageUrl: newBannerImageUrl,
      subImageUrls: imageArray.slice(1),
    };

    // 추후 api 연결할 부분
    console.log(editedRequestBody);
    handleToggleClick();
  };

  return (
    <>
      <section className={cx('post-form')}>
        <div className={cx('post-form-container')}>
          <div className={cx('post-form-recruitment')}>
            <h1 className={cx('post-form-recruitment-type')}>{`모집 ${type}`}</h1>
            <hr className={cx('post-form-recruitment-line')} />
          </div>
          <div className={cx('post-form-input')}>
            <FormProvider {...methods}>
              <form className={cx('post-form-input-content')}>
                <fieldset className={cx('post-form-input-content-price')}>
                  <legend>모집 유형</legend>
                  <InputRadio name='price' label='모집 유형' radioList={PRICE_RADIO_LIST} onClick={handlePriceClick} />
                </fieldset>
                <div className={cx('post-form-input-content-container')}>
                  <fieldset className={cx('post-form-input-content-title')}>
                    <legend>제목</legend>
                    <InputField
                      name='title'
                      label='제목'
                      placeholder='제목을 입력해 주세요 (20자 이내)'
                      isLimited
                      maxLength={20}
                    />
                  </fieldset>
                  {recruitmentTypes.isOfflineOrOnline(price) && (
                    <fieldset className={cx('post-form-input-content-headcount')}>
                      <legend>참여 인원</legend>
                      <PostFormDropdown name='headcount' label='참여 인원' options={HEADCOUNT_OPTIONS[category]} />
                    </fieldset>
                  )}
                </div>
                {recruitmentTypes.isOffline(price) && (
                  <div className={cx('post-form-input-content-address')}>
                    <fieldset className={cx('post-form-input-content-address-input')}>
                      <legend>오프라인 위치</legend>
                      <InputField
                        name='address'
                        label='오프라인 위치'
                        placeholder='주소 찾기를 통해 주소를 입력해 주세요'
                        readOnly={true}
                      />
                    </fieldset>
                    <div className={cx('post-form-input-content-address-button')}>
                      <BaseButton theme='fill' size='large' color='purple' onClick={handleAddressButtonClick}>
                        주소 찾기
                      </BaseButton>
                    </div>
                  </div>
                )}
                {recruitmentTypes.isNotGameStrategy(price) && (
                  <fieldset className={cx('post-form-input-content-discord')}>
                    <legend>디스코드 링크</legend>
                    <InputField name='discord' label='디스코드 링크' placeholder='https://discord.gg/초대코드' />
                  </fieldset>
                )}
                <fieldset className={cx('post-form-input-content-description')}>
                  <legend>설명</legend>
                  <TextField name='description' label='설명' placeholder='내용을 입력해 주세요' />
                </fieldset>
                {recruitmentTypes.isOfflineOrOnline(price) && (
                  <fieldset className={cx('post-form-input-content-schedules')}>
                    <legend>예약 날짜 및 시간</legend>
                    <Schedule onClick={handleAddSchedules} isScheduleSelected={isScheduleSelected} />
                  </fieldset>
                )}
                <hr className={cx('post-form-input-content-line')} />
                {scheduleArray &&
                  scheduleArray.map((value, index) => (
                    <SelectedSchedule
                      key={`selectedSchedule-${index}`}
                      value={value}
                      onClick={() => handleRemoveSchedules(index)}
                    />
                  ))}
                {recruitmentTypes.isNotOnline(price) && (
                  <fieldset className={cx('post-form-input-content-images')}>
                    <legend>이미지 첨부</legend>
                    <ImageField label='이미지 첨부' onFilesUpdate={handleFilesAdd} />
                  </fieldset>
                )}
              </form>
            </FormProvider>
          </div>
          <div className={cx('post-form-button')}>
            <div className={cx('post-form-button-container')}>
              <div className={cx('sm-hidden')}>
                <BaseButton theme='outline' size='medium' onClick={navigateBack}>
                  취소
                </BaseButton>
              </div>
              <div className={cx('sm-hidden')}>
                <BaseButton
                  type='submit'
                  theme='fill'
                  size='medium'
                  color='purple'
                  onClick={handleSubmit(handleEditFormData)}
                >
                  등록
                </BaseButton>
              </div>
              <div className={cx('sm-only', 'post-form-button-base')}>
                <BaseButton theme='outline' size='large' onClick={navigateBack}>
                  취소
                </BaseButton>
              </div>
              <div className={cx('sm-only', 'post-form-button-base')}>
                <BaseButton
                  type='submit'
                  theme='fill'
                  size='large'
                  color='purple'
                  onClick={handleSubmit(handleEditFormData)}
                >
                  등록
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ConfirmModal
        openModal={isVisible}
        onClose={handleToggleClick}
        title='모집 등록 완료'
        state='SUCCESS'
        desc='정상적으로 등록되었습니다'
        renderButton={
          <ModalButton variant='success' onClick={handleToggleClick}>
            확인
          </ModalButton>
        }
      />
    </>
  );
};

export default PostForm;
