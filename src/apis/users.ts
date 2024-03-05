import { IMAGE_API, ME_API, USERS_API } from '@/constants';

import { UsersEditParams, UsersSignupParams } from '@/types/users';

import instance from './axios';

export const Users = {
  signup: (value: UsersSignupParams) => instance.post(USERS_API, value),

  get: () => instance.get(`${USERS_API}${ME_API}`),

  edit: (value: UsersEditParams) =>
    instance.patch(`${USERS_API}${ME_API}`, value),

  createImageUrl: (image: string) => {
    const formData = new FormData();
    formData.append('image', image);

    instance.post(`${USERS_API}${ME_API}${IMAGE_API}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
