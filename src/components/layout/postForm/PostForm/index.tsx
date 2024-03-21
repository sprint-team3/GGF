import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames/bind';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { BaseButton, OperationButton } from '@/components/commons/buttons';
import { DateField, FormDropdown, ImageField, InputField, InputRadio, TextField } from '@/components/commons/inputs';

import styles from './PostForm.module.scss';

const cx = classNames.bind(styles);

type PostFormProps = {
  type: '등록' | '수정';
};

const PostForm = ({ type }: PostFormProps) => {
  const PostSchema = z.object({
    title: z.string().min(1).max(50),
    headcount: z.number(),
    price: z.number(),
  });

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(PostSchema),
  });

  const onSubmit = (data: object) => {
    console.log('전송된 데이터:', data);
  };

  const handleAdd = () => {};

  const handleFilesUpdate = (updatedFiles: File[]) => {
    console.log('Updated files:', updatedFiles);
  };

  return (
    <section className={cx('post-form')}>
      <div className={cx('post-form-container')}>
        <div className={cx('post-form-recruitment')}>
          <h1 className={cx('post-form-recruitment-type')}>{`모집 ${type}`}</h1>
          <hr className={cx('post-form-recruitment-line')} />
        </div>
        <div className={cx('post-form-input')}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className={cx('post-form-input-content')}>
                <div className={cx('post-form-input-content-container')}>
                  <div className={cx('post-form-input-content-title')}>
                    <InputField name='title' label='제목' placeholder='제목을 입력해 주세요 (20자 아내)' />
                  </div>
                  <div className={cx('post-form-input-content-headcount')}>
                    <FormDropdown
                      name='headcount'
                      label='참여 인원'
                      options={[
                        { title: '1', value: '1' },
                        { title: '2', value: 2 },
                        { title: '3', value: 3 },
                        { title: '4', value: 4 },
                      ]}
                    />
                  </div>
                </div>
                <div className={cx('post-form-input-content-price')}>
                  <InputRadio
                    name='price'
                    label='모집 유형'
                    radioList={[
                      { id: '오프라인', value: 0, label: '오프라인' },
                      { id: '온라인', value: 1, label: '온라인' },
                      { id: '클랜 모집', value: 2, label: '클랜 모집' },
                      { id: '게임 공략', value: 3, label: '게임 공략' },
                    ]}
                  />
                </div>
                <div className={cx('post-form-input-content-address')}>
                  <InputField name='address' label='오프라인 위치' placeholder='주소를 입력해 주세요' />
                </div>
                <div className={cx('post-form-input-content-discord')}>
                  <InputField name='discord' label='디스코드 링크' placeholder='디스코드 링크를 입력해 주세요' />
                </div>
                <div className={cx('post-form-input-content-description')}>
                  <TextField name='description' label='설명' placeholder='내용을 입력해 주세요' />
                </div>
                <div className={cx('post-form-input-content-schedules')}>
                  <div className={cx('post-form-input-content-schedules-group')}>
                    <div className={cx('post-form-input-content-schedules-date')}>
                      <DateField name='date' label='날짜' />
                    </div>
                    <div className={cx('post-form-input-content-schedules-time')}>
                      <div className={cx('post-form-input-content-schedules-time-start')}>
                        <FormDropdown
                          name='startTime'
                          label='시작 시간'
                          options={[
                            { title: '00:00', value: 0 },
                            { title: '01:00', value: 1 },
                            { title: '02:00', value: 2 },
                            { title: '03:00', value: 3 },
                            { title: '04:00', value: 4 },
                            { title: '05:00', value: 5 },
                            { title: '06:00', value: 6 },
                            { title: '07:00', value: 7 },
                            { title: '08:00', value: 8 },
                            { title: '09:00', value: 9 },
                            { title: '10:00', value: 10 },
                            { title: '11:00', value: 11 },
                            { title: '12:00', value: 12 },
                            { title: '13:00', value: 13 },
                            { title: '14:00', value: 14 },
                            { title: '15:00', value: 15 },
                            { title: '16:00', value: 16 },
                            { title: '17:00', value: 17 },
                            { title: '18:00', value: 18 },
                            { title: '19:00', value: 19 },
                            { title: '20:00', value: 20 },
                            { title: '21:00', value: 21 },
                            { title: '22:00', value: 22 },
                            { title: '23:00', value: 23 },
                          ]}
                        />
                      </div>
                      <div className={cx('post-form-input-content-schedules-time-hyphen')}>-</div>
                      <div className={cx('post-form-input-content-schedules-time-end')}>
                        <FormDropdown
                          name='endTime'
                          label='종료 시간'
                          options={[
                            { title: '01:00', value: 1 },
                            { title: '02:00', value: 2 },
                            { title: '03:00', value: 3 },
                            { title: '04:00', value: 4 },
                            { title: '05:00', value: 5 },
                            { title: '06:00', value: 6 },
                            { title: '07:00', value: 7 },
                            { title: '08:00', value: 8 },
                            { title: '09:00', value: 9 },
                            { title: '10:00', value: 10 },
                            { title: '11:00', value: 11 },
                            { title: '12:00', value: 12 },
                            { title: '13:00', value: 13 },
                            { title: '14:00', value: 14 },
                            { title: '15:00', value: 15 },
                            { title: '16:00', value: 16 },
                            { title: '17:00', value: 17 },
                            { title: '18:00', value: 18 },
                            { title: '19:00', value: 19 },
                            { title: '20:00', value: 20 },
                            { title: '21:00', value: 21 },
                            { title: '22:00', value: 22 },
                            { title: '23:00', value: 23 },
                            { title: '24:00', value: 24 },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx('post-form-input-content-schedules-button')}>
                    <OperationButton type='add' onClick={handleAdd} />
                  </div>
                </div>
                <hr className={cx('post-form-input-content-line')} />
                <div className={cx('post-form-input-content-images')}>
                  <span className={cx('post-form-input-content-images-label')}>이미지 첨부</span>
                  <ImageField onFilesUpdate={handleFilesUpdate} />
                </div>
              </div>
            </form>
            <DevTool control={methods.control} />
          </FormProvider>
        </div>
        <div className={cx('post-form-button')}>
          <div className={cx('post-form-button-container')}>
            <div className={cx('post-form-button-base')}>
              <BaseButton theme='outline' size='large'>
                취소
              </BaseButton>
            </div>
            <div className={cx('post-form-button-base')}>
              <BaseButton theme='fill' size='large' color='purple'>
                등록
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostForm;
