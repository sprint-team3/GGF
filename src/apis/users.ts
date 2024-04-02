import { IMAGE_API, ME_API, USERS_API } from '@/constants';

import { UsersEditParams, SignupParams } from '@/types';

import instance from './axios';

export const Users = {
  signup: (value: SignupParams) => instance.post(USERS_API, value),

  get: () => instance.get(`${USERS_API}${ME_API}`),

  /**
   * 내 정보 수정
   */
  edit: (value: UsersEditParams) => instance.patch(`${USERS_API}${ME_API}`, value),

  /**
   * 프로필 이미지 url 생성
   * @param image
   * @returns
   */
  createImageUrl: async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    const response = await instance.post(`${USERS_API}${ME_API}${IMAGE_API}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },
};
