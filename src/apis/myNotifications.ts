import { MY_NOTIFICATIONS_API, PAGE_SIZE } from '@/constants';

import instance from './axios';

export const MyNotifications = {
  get: () =>
    instance.get(MY_NOTIFICATIONS_API, {
      params: {
        size: PAGE_SIZE,
      },
    }),

  delete: (notificationId: number) => instance.delete(`${MY_NOTIFICATIONS_API}/${notificationId}`),
};
