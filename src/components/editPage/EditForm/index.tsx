import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import classNames from 'classnames/bind';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { FormProvider, useForm } from 'react-hook-form';

import Activities from '@/apis/activities';
import { MyActivities } from '@/apis/myActivities';
import {
  ADDRESS_CUSTOM_THEME,
  ADDRESS_POPUP_SIZE,
  DEFAULT_API_DATA_ADDRESS,
  DEFAULT_API_DATA_BANNER_IMAGE,
  PAGE_PATHS,
  PRICE_RADIO_LIST,
  PostSchema,
  SCRIPT_URL,
  recruitmentTypes,
} from '@/constants';
import {
  convertTimeStringToNumber,
  createHeadcountOptions,
  joinTitleByDelimiter,
  normalizeEndTimes,
  splitDescByDelimiter,
  splitTitleByDelimiterForEditForm,
} from '@/utils';

import { BaseButton } from '@/components/commons/buttons';
import { ImageField, InputField, InputRadio, PostFormDropdown, TextField } from '@/components/commons/inputs';
import { ConfirmModal, ModalButton } from '@/components/commons/modals';
import styles from '@/components/createPage/PostForm/PostForm.module.scss';
import Schedule from '@/components/createPage/Schedule';
import SelectedSchedule from '@/components/createPage/SelectedSchedule';
import useMultiState from '@/hooks/useMultiState';
import useRouteToPage from '@/hooks/useRouteToPage';

import { ActivityDetailResponse, Category, MyActivitiesBody } from '@/types';

const cx = classNames.bind(styles);

type EditFormProps = {
  category: Category;
  activityDetailData: ActivityDetailResponse;
};

const EditForm = ({ category, activityDetailData }: EditFormProps) => {
  const { redirectToPage, navigateBack } = useRouteToPage();

  // 받아온 초기 데이터 분해
  const {
    title: defaultTitle,
    postType: defaultPostType,
    address: defaultAddress,
    headcount: defaultHeadcount,
  } = splitTitleByDelimiterForEditForm(activityDetailData.title);

  const {
    description: defaultDescription,
    profileImageUrl,
    nickname,
    email,
    discordLink: defaultDiscordLink,
  } = splitDescByDelimiter(activityDetailData.description);

  const defaultScheduleArray = activityDetailData.schedules;

  const defaultSubImagesIdArray = activityDetailData.subImages.map((subImage) => subImage.id);

  // 수정 모달 관련
  const { multiState, toggleClick } = useMultiState([
    'successModal',
    'requiredScheduleModal',
    '400error',
    '401error',
    '403error',
    '404error',
    '500error',
    'failModal',
  ]);

  const handleSuccessModalConfirmButtonClick = () => {
    toggleClick('successModal');
    redirectToPage(PAGE_PATHS.mypage);
  };

  const handle401errorModalConfirmButtonClick = () => {
    toggleClick('401error');
    redirectToPage(PAGE_PATHS.signin);
  };

  const handle403And404errorModalConfirmButtonClick = () => {
    toggleClick('403error');
    redirectToPage(PAGE_PATHS.mypage);
  };

  // 수정 API
  const { mutate: editFormMutation } = useMutation({
    mutationFn: (value: MyActivitiesBody) => MyActivities.edit(activityDetailData.id, value),
    onSuccess: () => {
      toggleClick('successModal');
    },
    onError: (error) => {
      if ((error as AxiosError)?.response?.status === 400) {
        toggleClick('400error');
      } else if ((error as AxiosError)?.response?.status === 401) {
        toggleClick('401error');
      } else if ((error as AxiosError)?.response?.status === 403) {
        toggleClick('403error');
      } else if ((error as AxiosError)?.response?.status === 404) {
        toggleClick('404error');
      } else if ((error as AxiosError)?.response?.status === 500) {
        toggleClick('500error');
      } else {
        toggleClick('failModal');
      }
    },
  });

  // 모집 유형 관련
  const [price, setPrice] = useState(defaultPostType);

  const handlePriceClick = (value: number) => {
    setPrice(value);
  };

  // 리액트 훅 폼 관련
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(PostSchema[price]),
    defaultValues: {
      price: String(defaultPostType),
      title: defaultTitle,
      headcount: String(defaultHeadcount),
      address: defaultAddress,
      discord: defaultDiscordLink,
      description: defaultDescription,
      date: '0000:00:00',
      startTime: '00:00',
      endTime: '01:00',
    },
  });

  const { handleSubmit, setValue, getValues, watch } = methods;

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
  const [scheduleArray, setScheduleArray] =
    useState<{ id: number; date: string; startTime: string; endTime: string }[]>(defaultScheduleArray);
  const [removedSchedulesIdArray, serRemovedSchedulesIdArray] = useState<number[]>([]);
  const [isScheduleSelected, setIsScheduleSelected] = useState(false);
  const selectedScheduleArray = getValues(['date', 'startTime', 'endTime']);
  const watchDateField = watch('date');
  const watchStartTimeField = watch('startTime');
  const watchEndTimeField = watch('endTime');

  useEffect(() => {
    const convertedDate = convertTimeStringToNumber(watchDateField);
    const convertedStartTime = convertTimeStringToNumber(watchStartTimeField);
    const convertedEndTime = convertTimeStringToNumber(watchEndTimeField);

    if (convertedStartTime !== undefined && convertedEndTime !== undefined) {
      setIsScheduleSelected(convertedDate !== 0 && convertedStartTime < convertedEndTime);
    }
  }, [watchDateField, watchStartTimeField, watchEndTimeField]);

  const handleAddSchedules = () => {
    const newSchedule = {
      id: 0,
      date: selectedScheduleArray[0],
      startTime: selectedScheduleArray[1],
      endTime: selectedScheduleArray[2],
    };

    const isDuplicatedSchedule = scheduleArray.some((schedule) => {
      if (schedule.date !== newSchedule.date) {
        return false;
      } else if (schedule.endTime <= newSchedule.startTime || schedule.startTime >= newSchedule.endTime) {
        return false;
      } else {
        return true;
      }
    });

    if (!isDuplicatedSchedule && scheduleArray.length < 5) {
      setScheduleArray([...scheduleArray, newSchedule]);
    }
  };

  const handleRemoveSchedules = (index: number) => {
    const newRemovedScheduleIdArray = [...removedSchedulesIdArray];
    if (scheduleArray[index].id !== 0) {
      newRemovedScheduleIdArray.push(scheduleArray[index].id);
    }

    serRemovedSchedulesIdArray(newRemovedScheduleIdArray);

    const newScheduleArray = [...scheduleArray];
    newScheduleArray.splice(index, 1);
    setScheduleArray(newScheduleArray);
  };

  // 이미지 관련
  const [imageUrlsArray, setImageUrlsArray] = useState<{ activityImageUrl: string }[]>([]);
  const [isImageUploadSuccess, setIsImageUploadSuccess] = useState(false);

  const { mutate: postFormImageMutation } = useMutation({
    mutationFn: (uploadedFiles: File[]) => Activities.createImage(uploadedFiles),
    onSuccess: (uploadedImageUrls) => {
      setImageUrlsArray(uploadedImageUrls);
      setIsImageUploadSuccess(false);
    },
  });

  const handleUpdateFiles = (uploadedFiles: File[]) => {
    postFormImageMutation(uploadedFiles);
    setIsImageUploadSuccess(true);
  };

  // 수정 버튼 클릭 후 데이터 가공 관련
  const handleEditFormData = () => {
    const { title, price, address, headcount, description, discord } = getValues();
    const editedBannerImageUrl =
      imageUrlsArray.length === 0 ? DEFAULT_API_DATA_BANNER_IMAGE[category] : imageUrlsArray[0].activityImageUrl;
    const editedSubImageUrls = imageUrlsArray.slice(1).map((item) => item.activityImageUrl);
    const newAddress = address === '' ? DEFAULT_API_DATA_ADDRESS : address;
    const titleArray = [category, title, price, newAddress, headcount];
    const descriptionArray = [description, profileImageUrl, nickname, email, discord];
    const editedTitle = joinTitleByDelimiter(titleArray);
    const editedDescription = joinTitleByDelimiter(descriptionArray);
    const filteredScheduleArray = scheduleArray.filter((schedule) => schedule.id === 0);
    const editedScheduleArray = normalizeEndTimes(filteredScheduleArray);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const finalEditedScheduleArray = editedScheduleArray.map(({ id, ...rest }) => rest);

    const hasNoSchedule =
      defaultScheduleArray.length - removedSchedulesIdArray.length + finalEditedScheduleArray.length === 0;

    if (recruitmentTypes.isOfflineOrOnline(Number(price)) && hasNoSchedule) {
      toggleClick('requiredScheduleModal');
      return;
    }

    const editedRequestBody = {
      title: editedTitle,
      category,
      description: editedDescription,
      price: Number(price),
      address: newAddress,
      bannerImageUrl: editedBannerImageUrl,
      subImageIdsToRemove: defaultSubImagesIdArray,
      subImageUrlsToAdd: editedSubImageUrls,
      scheduleIdsToRemove: removedSchedulesIdArray,
      schedulesToAdd: finalEditedScheduleArray,
    };

    editFormMutation(editedRequestBody);
  };

  return (
    <>
      <section className={cx('post-form')}>
        <div className={cx('post-form-container')}>
          <div className={cx('post-form-recruitment')}>
            <h1 className={cx('post-form-recruitment-type')}>모집 수정</h1>
            <hr className={cx('post-form-recruitment-line')} />
          </div>
          <div className={cx('post-form-input')}>
            <FormProvider {...methods}>
              <form className={cx('post-form-input-content')}>
                <fieldset className={cx('post-form-input-content-price')}>
                  <legend>모집 유형</legend>
                  <InputRadio
                    name='price'
                    label='모집 유형'
                    radioList={[PRICE_RADIO_LIST[defaultPostType]]}
                    onClick={handlePriceClick}
                    defaultPostType={defaultPostType}
                  />
                </fieldset>
                <div className={cx('post-form-input-content-container')}>
                  <fieldset className={cx('post-form-input-content-title')}>
                    <legend>제목</legend>
                    <InputField
                      name='title'
                      label='제목'
                      placeholder='제목을 입력해 주세요 (50자 이내)'
                      isLimited
                      maxLength={50}
                    />
                  </fieldset>
                  {recruitmentTypes.isOfflineOrOnline(price) && (
                    <fieldset className={cx('post-form-input-content-headcount')}>
                      <legend>참여 인원</legend>
                      <PostFormDropdown
                        name='headcount'
                        label='참여 인원'
                        options={HEADCOUNT_OPTIONS[category]}
                        defaultHeadcount={defaultHeadcount}
                      />
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
                    <InputField
                      name='discord'
                      label='디스코드 링크'
                      placeholder='https://discord.gg/초대코드'
                      maxLength={50}
                    />
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
                    <ImageField label='이미지 첨부' onFilesUpdate={handleUpdateFiles} />
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
                  isDisabled={isImageUploadSuccess}
                  onClick={handleSubmit(handleEditFormData)}
                >
                  수정
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
                  isDisabled={isImageUploadSuccess}
                  onClick={handleSubmit(handleEditFormData)}
                >
                  수정
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConfirmModal
        openModal={multiState.successModal}
        onClose={() => toggleClick('successModal')}
        title='모집 수정 완료'
        state='SUCCESS'
        desc='정상적으로 수정되었습니다'
        renderButton={
          <ModalButton variant='success' onClick={handleSuccessModalConfirmButtonClick}>
            확인
          </ModalButton>
        }
      />
      <ConfirmModal
        openModal={multiState.requiredScheduleModal}
        onClose={() => toggleClick('requiredScheduleModal')}
        title='모집 수정 실패'
        state='Fail'
        desc='예약 시간을 하나 이상 추가해 주세요'
        warning
        renderButton={
          <ModalButton variant='warning' onClick={() => toggleClick('requiredScheduleModal')}>
            확인
          </ModalButton>
        }
      />
      <ConfirmModal
        openModal={multiState['400error']}
        onClose={() => toggleClick('400error')}
        title='모집 수정 실패'
        state='Fail'
        desc='예약이 있는 예약 시간대는 수정할 수 없습니다'
        warning
        renderButton={
          <ModalButton variant='warning' onClick={() => toggleClick('400error')}>
            확인
          </ModalButton>
        }
      />
      <ConfirmModal
        openModal={multiState['401error']}
        onClose={() => toggleClick('401error')}
        title='모집 수정 실패'
        state='Fail'
        desc='다시 로그인해 주세요'
        warning
        renderButton={
          <ModalButton variant='warning' onClick={handle401errorModalConfirmButtonClick}>
            로그인 페이지로 이동
          </ModalButton>
        }
      />
      <ConfirmModal
        openModal={multiState['403error']}
        onClose={() => toggleClick('403error')}
        title='모집 수정 실패'
        state='Fail'
        desc='본인의 체험만 수정할 수 있습니다'
        warning
        renderButton={
          <ModalButton variant='warning' onClick={handle403And404errorModalConfirmButtonClick}>
            마이 페이지로 이동
          </ModalButton>
        }
      />
      <ConfirmModal
        openModal={multiState['404error']}
        onClose={() => toggleClick('404error')}
        title='모집 수정 실패'
        state='Fail'
        desc='존재하지 않는 게시글입니다'
        warning
        renderButton={
          <ModalButton variant='warning' onClick={handle403And404errorModalConfirmButtonClick}>
            마이 페이지로 이동
          </ModalButton>
        }
      />
      <ConfirmModal
        openModal={multiState['500error']}
        onClose={() => toggleClick('500error')}
        title='모집 수정 실패'
        state='Fail'
        desc='서버가 불안정합니다'
        warning
        renderButton={
          <ModalButton variant='warning' onClick={() => toggleClick('500error')}>
            확인
          </ModalButton>
        }
      />
      <ConfirmModal
        openModal={multiState.failModal}
        onClose={() => toggleClick('failModal')}
        title='모집 수정 실패'
        state='Fail'
        desc='다시 한 번 확인해 주세요'
        warning
        renderButton={
          <ModalButton variant='warning' onClick={() => toggleClick('failModal')}>
            확인
          </ModalButton>
        }
      />
    </>
  );
};

export default EditForm;
