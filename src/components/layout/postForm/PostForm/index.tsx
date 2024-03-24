import { useEffect, useState } from 'react';

import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames/bind';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { FormProvider, useForm } from 'react-hook-form';

import {
  DEFAULT_API_DATA,
  PostSchema,
  SCRIPT_URL,
  VALID_IMAGE_URL,
  addressCustomTheme,
  headcountOptions,
  priceRadioList,
} from '@/constants';
import { convertTimeStringToNumber, joinTitleByDelimiter, redirectToPage } from '@/utils';

import Schedule from '../Schedule';
import SelectedSchedule from '../SelectedSchedule';

import { BaseButton } from '@/components/commons/buttons';
import { FormDropdown, ImageField, InputField, InputRadio, TextField } from '@/components/commons/inputs';
import { ConfirmModal, ModalButton } from '@/components/commons/modals';
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
    mode: 'onSubmit',
    resolver: zodResolver(PostSchema[price]),
  });

  const { handleSubmit, setValue, getValues, watch } = methods;

  //등록 모달 관련
  const { isVisible, handleToggleClick } = useToggleButton();

  // 주소 관련
  const openAddressPopup = useDaumPostcodePopup(SCRIPT_URL);

  const handleComplete = (data: { address: string }) => {
    setValue('address', data.address);
  };

  const handleAddressButtonClick = () => {
    openAddressPopup({
      onComplete: handleComplete,
      left: window.screen.width / 2 - 500 / 2,
      top: window.screen.height / 2 - 600 / 2,
      theme: addressCustomTheme,
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
    const { title, price, address, headcount, description } = getValues();
    const newBannerImageUrl =
      imageArray.length === 0 ? VALID_IMAGE_URL.unusual + DEFAULT_API_DATA.bannerImageUrl : imageArray[0];
    const newAddress = address === '' ? DEFAULT_API_DATA.address : address;
    const titleArray = [category, title, price, newAddress, headcount];
    const editedTitle = joinTitleByDelimiter(titleArray);

    const editedRequestBody = {
      title: editedTitle,
      category: category,
      description: description,
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
              <form>
                <div className={cx('post-form-input-content')}>
                  <div className={cx('post-form-input-content-price')}>
                    <InputRadio name='price' label='모집 유형' radioList={priceRadioList} onClick={handlePriceClick} />
                  </div>
                  <div className={cx('post-form-input-content-container')}>
                    <div className={cx('post-form-input-content-title')}>
                      <InputField
                        name='title'
                        label='제목'
                        placeholder='제목을 입력해 주세요 (20자 이내)'
                        isLimited
                        maxLength={20}
                      />
                    </div>
                    {price < 2 && (
                      <div className={cx('post-form-input-content-headcount')}>
                        <FormDropdown name='headcount' label='참여 인원' options={headcountOptions[category]} />
                      </div>
                    )}
                  </div>
                  {price === 0 && (
                    <div className={cx('post-form-input-content-address')}>
                      <div className={cx('post-form-input-content-address-input')}>
                        <InputField
                          name='address'
                          label='오프라인 위치'
                          placeholder='주소 찾기를 통해 주소를 입력해 주세요'
                          readOnly={true}
                        />
                      </div>
                      <div className={cx('post-form-input-content-address-button')}>
                        <BaseButton theme='fill' size='large' color='purple' onClick={handleAddressButtonClick}>
                          주소 찾기
                        </BaseButton>
                      </div>
                    </div>
                  )}
                  {price !== 3 && (
                    <div className={cx('post-form-input-content-discord')}>
                      <InputField name='discord' label='디스코드 링크' placeholder='https://discord.gg/초대코드' />
                    </div>
                  )}
                  <div className={cx('post-form-input-content-description')}>
                    <TextField name='description' label='설명' placeholder='내용을 입력해 주세요' />
                  </div>
                  {price < 2 && <Schedule onClick={handleAddSchedules} isScheduleSelected={isScheduleSelected} />}
                  <hr className={cx('post-form-input-content-line')} />
                  {scheduleArray &&
                    scheduleArray.map((value, index) => (
                      <SelectedSchedule
                        key={`selectedSchedule-${index}`}
                        value={value}
                        onClick={() => handleRemoveSchedules(index)}
                      />
                    ))}
                  {price !== 1 && (
                    <div className={cx('post-form-input-content-images')}>
                      <ImageField label='이미지 첨부' onFilesUpdate={handleFilesAdd} />
                    </div>
                  )}
                </div>
              </form>
              <DevTool control={methods.control} />
            </FormProvider>
          </div>
          <div className={cx('post-form-button')}>
            <div className={cx('post-form-button-container')}>
              <div className={cx('post-form-button-base')}>
                <BaseButton theme='outline' size='large' onClick={() => redirectToPage('/landing')}>
                  취소
                </BaseButton>
              </div>
              <div className={cx('post-form-button-base')}>
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
